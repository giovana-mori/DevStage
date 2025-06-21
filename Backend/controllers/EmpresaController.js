import Empresa from "../models/Empresa.js";
import mongoose from "../db/conn.js";

export default class EmpresaController {
  static async createEmpresa(req, res) {
    const logo = req.file?.path;

    const empresa = new Empresa({
      ...req.body,
      logo,
      vagas: [],
    });

    try {
      const newEmpresa = await empresa.save();
      return res
        .status(201)
        .json({ message: "Empresa criada com sucesso", empresa: newEmpresa });
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors = Object.keys(error.errors).map((field) => ({
          field,
          message: error.errors[field].message,
        }));
        return res.status(400).json({ message: "Erro de validação", errors });
      }
      return res.status(500).json({ message: "Erro ao criar empresa" });
    }
  }
  static async getEmpresas(req, res) {
    try {
      const { search, sortBy = "-createdAt" } = req.query;
      const query = {};

      if (search) {
        // Verifica se a busca é um ObjectId válido
        if (mongoose.Types.ObjectId.isValid(search)) {
          // Busca EXCLUSIVAMENTE por ID se for válido
          query._id = search;
        } else {
          // Busca textual nos outros campos
          const regex = new RegExp(search, "i");
          query.$or = [
            { nome: { $regex: regex } },
            { localizacao: { $regex: regex } },
            { site: { $regex: regex } },
          ];
        }
      }

      const empresas = await Empresa.find(query)
        .populate("empresa")
        .sort(sortBy);

      res.status(200).json({ empresas });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        details: "Erro ao buscar Empresas",
      });
    }
  }

  static async getEmpresaByNome(req, res) {
    const { nome } = req.params;
    if (!nome) {
      return res
        .status(422)
        .json({ message: "Nome da empresa obrigatório na busca" });
    }
    const empresa = await Empresa.findOne({ nome }).sort("-createdAt");
    if (!empresa || empresa.length === 0) {
      return res.status(404).json({ message: "Empresa não encontrada" });
    }
    res.status(200).json({ empresa });
  }

  static async updateEmpresa(req, res) {
    const { id } = req.params;
    const logo = req.file?.path;

    try {
      const empresa = await Empresa.findById(id);
      if (!empresa) {
        return res.status(404).json({ message: "Empresa não encontrada" });
      }

      const updatedEmpresa = await Empresa.findByIdAndUpdate(
        id,
        {
          ...req.body,
          logo,
        },
        { new: true }
      );

      return res.status(200).json({
        message: "Empresa atualizada com sucesso",
        empresa: updatedEmpresa,
      });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao atualizar empresa" });
    }
  }

  static async deleteEmpresa(req, res) {
    const { id } = req.params;
    try {
      const empresa = await Empresa.findByIdAndDelete(id);
      if (!empresa) {
        return res.status(404).json({ message: "Empresa não encontrada" });
      }
      return res.status(200).json({ message: "Empresa removida com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao remover empresa" });
    }
  }
}
