import Empresa from "../models/Empresa.js";
import Vaga from "../models/Vaga.js";
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";

export default class VagaController {
  static async createVaga(req, res) {
    const vaga = new Vaga({
      ...req.body,
      requisitos: req.body.requisitos || [],
      empresa: req.body.empresa || {}, // caso você deseje ajustar isso depois
    });

    const empresa = req.body.empresa;

    try {
      const newVaga = await vaga.save();
      const addVagaToEmpresa = await Empresa.findByIdAndUpdate(empresa._id, {
        $addToSet: { vagas: newVaga }
      }, { new: true }
      );

      return res.status(201).json({ message: "Vaga criada com sucesso", vaga: newVaga, empresa: addVagaToEmpresa });
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors = Object.keys(error.errors).map((field) => ({
          field,
          message: error.errors[field].message,
        }));
        return res.status(400).json({ message: "Erro de validação", errors });
      }
      return res.status(500).json({ message: "Erro ao criar vaga" });
    }
  }

  static async getVagas(req, res) {
    const vagas = await Vaga.find().sort("-createdAt");
    res.status(200).json({ vagas });
  }

  static async getVagaByTitulo(req, res) {
    const { titulo } = req.params;
    if (!titulo) {
      return res.status(422).json({ message: "Nome da vaga obrigatório" });
    }
    const vaga = await Vaga.find({ titulo }).sort("-createdAt");
    if (!vaga || vaga.length === 0) {
      return res.status(404).json({ message: "Vaga não encontrada" });
    }
    res.status(200).json({ vaga });
  }

  static async updateVaga(req, res) {
    const id = req.params.id;

    try {
      const vaga = await Vaga.findById(id);
      if (!vaga) {
        return res.status(404).json({ message: "Vaga não encontrada" });
      }

      const updatedVaga = await Vaga.findByIdAndUpdate(
        id,
        {
          ...req.body,
        },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "Vaga atualizada com sucesso", vaga: updatedVaga });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao atualizar vaga" });
    }
  }

  static async deleteVaga(req, res) {
    const id  = req.params.id;
    try {
      const vaga = await Vaga.findByIdAndDelete(id);
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
      const addingUser = await Vaga.findByIdAndUpdate(
        vaga,
        {
          $addToSet: {
            candidatos: {
              user: { // informações do usuário sem informações sensíveis
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
                portifolio: user.portifolio
              }
            }
          },
        },
        { new: true }
      );
      return res.status(200).json({ message: "Usuário adicionado à vaga com sucesso", vaga: addingUser });
    }
    catch (error) {
      return res.status(500).json({ message: "Erro ao adicionar usuário à vaga" });
    }
  }

  static async getCandidatos(req, res) {
    const vaga = req.params.id;
    if (!vaga) {
      return res.status(422).json({ message: "Vaga não encontrada" });
    }
    try {
      const listaCandidatos = await Vaga.findById(vaga).select('candidatos');
      return res.status(200).json({ listaCandidatos });
    }
    catch (error) {
      return res.status(500).json({ message: "Erro ao obter candidatos da vaga" });
    }
  }
}
