import Empresa from "../models/Empresa.js";
import VagaExterna from "../models/VagaExterna.js";
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";
import axios from "axios";

export default class VagaExternaController {
  static async importarVagas(req,res) {
    try {
      const response = await axios.get("https://jsearch.p.rapidapi.com/search",{
        headers: {
          'x-rapidapi-key': JSEARCH_API_KEY,
          'x-rapidapi-host': 'jsearch.p.rapidapi.com'
        },
        params: {
          query: req.query.query || "desenvolvedor",
          page: req.query.page || "1",
          num_pages: req.query.num_pages || "1",
          country: req.query.country || "br",
          date_posted: 'all'
        },
      });

      const vagas = response.data.data;
      const vagasExternas = [];
      for (const vaga of vagas) {
        const novaVaga = new VagaExterna({
          titulo: vaga.job_title,
          descricao: vaga.job_description,
          //responsabilidades: vaga.job_responsibilities,
          requisitos: vaga.job_requirements,
          beneficios: vaga.job_benefits,
          modalidade: vaga.job_employment_type,
          tipoContrato: "Estágio",
          nivel: "Estagiário",
          salario: vaga.job_salary ? vaga.job_salary : "Não informado", // Verifica se o salário está disponível
          vagasDisponiveis: 1, // Definido como 1, pode ser ajustado conforme necessário
          localizacao: vaga.job_city + ", " + vaga.job_country,
          empresa: vaga.employer_name, // Pode ser necessário ajustar conforme o modelo de Empresa
          email_contato: vaga.job_apply_email, // Email de contato para a vaga
          link_candidatura: vaga.job_apply_link, // Link para candidatura
          url: vaga.employer_website, // Link para a aplicação
        });

        await novaVaga.save();
        vagasExternas.push(novaVaga);
      }
      res.status(200).json({ message:"Vagas importadas com sucesso", vagas: vagasExternas });
    } catch(error){
      res.status(500).json({ message: "Erro ao importar vagas", error: error.message });
    }
  }
  
  static async getVagas(req, res) {
    try {
      const {
        search,
        modalidade,
        tipoContrato,
        nivel,
        empresa,
        localizacao,
        sortBy = "-createdAt",
      } = req.query;

      // Construir query dinâmica
      const query = {};

      // Busca textual (case-insensitive)
      if (search) {
        const regex = new RegExp(search, "i");
        query.$or = [
          { titulo: { $regex: regex } },
          { descricao: { $regex: regex } },
          { responsabilidades: { $regex: regex } },
          { requisitos: { $regex: regex } },
          { beneficios: { $regex: regex } },
          { "empresa.nome": { $regex: regex } }, // Busca no nome da empresa populada
        ];
      }

      // Filtros exatos
      if (modalidade) query.modalidade = modalidade;
      if (tipoContrato) query.tipoContrato = tipoContrato;
      if (nivel) query.nivel = nivel;
      if (localizacao) {
        query.localizacao = new RegExp(localizacao, "i");
      }

      // Filtro por empresa (ID ou nome)
      if (empresa) {
        const isObjectId = /^[0-9a-fA-F]{24}$/.test(empresa);

        if (isObjectId) {
          query.empresa = empresa;
        } else {
          // Busca por nome da empresa usando lookup
          const empresas = await Empresa.find({
            nome: new RegExp(empresa, "i"),
          });
          query.empresa = { $in: empresas.map((e) => e._id) };
        }
      }

      // Executar query
      const vagas = await VagaExterna.find(query).populate("empresa").sort(sortBy);

      res.status(200).json({ vagas });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        details: "Erro ao buscar vagas",
      });
    }
  }

  static async getVagaByTitulo(req, res) {
    try {
      const { titulo } = req.params;
      console.log(titulo);
      if (!titulo) {
        return res.status(422).json({ message: "Nome da vaga obrigatório" });
      }
      const vaga = await VagaExterna.findOne({ titulo }).populate("empresa").sort("-createdAt");
      if (!vaga || vaga.length === 0) {
        return res.status(404).json({ message: "Vaga não encontrada" });
      }
      res.status(200).json({ vaga });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteVaga(req, res) {
    const id = req.params.id;
    try {
      const vaga = await VagaExterna.findByIdAndDelete(id);
      if (!vaga) {
        return res.status(404).json({ message: "Vaga não encontrada" });
      }
      return res.status(200).json({ message: "Vaga removida com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao remover vaga" });
    }
  }

  static async addCandidato(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);
    const vaga = req.params.id; //id da vaga
    if (!user) {
      return res.status(422).json({ message: "Usuário não logado" });
    }
    if (!vaga) {
      return res.status(422).json({ message: "Vaga não encontrada" });
    }
    try {
      const addingUser = await VagaExterna.findByIdAndUpdate(
        vaga,
        {
          $addToSet: {
            candidatos: {
              user: {
                // informações do usuário sem informações sensíveis
                _id: user._id,
                nome: user.nome,
                email: user.email,
                telefone: user.telefone,
                tipo: user.tipo,
                status: user.status,
                curso: user.curso,
                instituicao_ensino: user.instituicao_ensino,
                github: user.github,
                linkedin: user.linkedin,
                sobre: user.sobre,
                portifolio: user.portifolio,
              },
            },
          },
        },
        { new: true }
      );
      return res.status(200).json({
        message: "Usuário adicionado à vaga com sucesso",
        vaga: addingUser,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao adicionar usuário à vaga" });
    }
  }

  static async getCandidatos(req, res) {
    const vaga = req.params.id;
    if (!vaga) {
      return res.status(422).json({ message: "Vaga não encontrada" });
    }
    try {
      const listaCandidatos = await VagaExterna.findById(vaga).select("candidatos");
      return res.status(200).json({ listaCandidatos });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao obter candidatos da vaga" });
    }
  }
}
