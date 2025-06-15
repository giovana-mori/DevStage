import Artigo from "../models/Artigo.js";

export default class ArtigoController {
  static async createArtigo(req, res) {
    const imagem_capa = req.file?.path;

    const artigo = new Artigo({
      ...req.body,
      imagem_capa,
      tags: req.body.tags || [],
    });

    try {
      const newArtigo = await artigo.save();
      return res
        .status(201)
        .json({ message: "Artigo criado com sucesso", artigo: newArtigo });
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors = Object.keys(error.errors).map((field) => ({
          field,
          message: error.errors[field].message,
        }));
        return res.status(400).json({ message: "Erro de validação", errors });
      }
      return res.status(500).json({ message: "Erro ao criar artigo" });
    }
  }
  
  static async getArtigos(req, res) {
    try {
      const { search } = req.query;
      let query = {};

      if (search) {
        const regex = new RegExp(search, "i"); // Busca case-insensitive

        //Ele faz uma busca com OR, ele vai testando em cada coluna para ver se tem algo semelhante ao que foi digitado pelo usuario
        query.$or = [
          { titulo: { $regex: regex } },
          { conteudo: { $regex: regex } },
          { resumo: { $regex: regex } },
          { categoria: { $regex: regex } },
          { tags: { $regex: regex } },
        ];
      }

      const artigos = await Artigo.find(query).sort("-createdAt");

      res.status(200).json({ artigos });
    } catch (error) {
      res.status(500).json({
        error: error.message,
        details: "Erro ao buscar artigos",
      });
    }
  }

  static async getArtigoByTitulo(req, res) {
    const { titulo } = req.params;
    if (!titulo) {
      return res
        .status(422)
        .json({ message: "Titulo do artigo obrigatório na busca" });
    }
    const artigo = await Artigo.find({ titulo }).sort("-createdAt");
    if (!artigo || artigo.length === 0) {
      return res.status(404).json({ message: "Artigo não encontrado" });
    }
    res.status(200).json({ artigo });
  }

  static async updateArtigo(req, res) {
    const { _id } = req.params;
    const imagem_capa = req.file?.path;

    try {
      const artigo = await Artigo.findById(_id);
      if (!artigo) {
        return res.status(404).json({ message: "Artigo não encontrado" });
      }

      const updatedArtigo = await Artigo.findByIdAndUpdate(
        _id,
        {
          ...req.body,
          imagem_capa,
        },
        { new: true }
      );

      return res.status(200).json({
        message: "Artigo atualizado com sucesso",
        artigo: updatedArtigo,
      });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao atualizar artigo" });
    }
  }

  static async deleteArtigo(req, res) {
    const { _id } = req.params;
    try {
      const artigo = await Artigo.findByIdAndDelete(_id);
      if (!artigo) {
        return res.status(404).json({ message: "Artigo não encontrado" });
      }
      return res.status(200).json({ message: "Artigo deletado com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao deletar artigo" });
    }
  }
}
