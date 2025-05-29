import Empresa from "../models/Empresa.js";
import Vaga from "../models/Vaga.js";

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
        $addToSet: { vagas: newVaga }}, { new: true }
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
    const { id } = req.params;

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
    const { id } = req.params;
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
}
