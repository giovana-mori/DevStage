import Empresa from "../models/Empresa.js";
import Vaga from "../models/Vaga.js";
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";

export default class VagaController {
  static async createVaga(req, res) {
    try {
      // Verifica se a empresa existe
      const empresa = await Empresa.findById(req.body.empresa);
      if (!empresa) {
        return res.status(404).json({ message: "Empresa não encontrada" });
      }

      // Cria a vaga
      const vaga = new Vaga(req.body);
      const savedVaga = await vaga.save();

      // Atualiza a empresa com a nova vaga
      await Empresa.findByIdAndUpdate(
        req.body.empresa,
        { $push: { vagas: savedVaga._id } },
        { new: true }
      );

      res.status(201).json(savedVaga);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getVagas(req, res) {
    try {
      const vagas = await Vaga.find().populate("empresa"); // Note o 'empresa' minúsculo
      res.status(200).json(vagas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
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
    const id = req.params.id;
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
      const listaCandidatos = await Vaga.findById(vaga).select("candidatos");
      return res.status(200).json({ listaCandidatos });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao obter candidatos da vaga" });
    }
  }
}
