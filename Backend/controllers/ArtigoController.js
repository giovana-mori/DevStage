import Artigo from "../models/Artigo.js";

export default class ArtigoController {
    static async createArtigo(req, res) {
        const {titulo, slug, resumo, conteudo, categoria, autor, tags, cargo_autor, status} = req.body;
        const imagem_capa = req.file;

        if(!titulo || !slug || !resumo || !conteudo || !categoria || !autor  || !status) {
            return res.status(422).json({message: "Preencha os campos obrigatórios"});
        }

        const artigo = new Artigo({
            titulo,
            slug,
            resumo,
            conteudo,
            categoria,
            autor,
            imagem_capa,
            tags:[],
            cargo_autor,
            status
        });
        
        try{
            const newArtigo = await artigo.save();
            return res.status(201).json({message: "Artigo criado com sucesso", artigo: newArtigo}); //retirar o artigo quando incrementar ao front
        }
        catch (error) {
            return res.status(500).json({message: "Erro ao criar artigo"});
        }
    }

    static async getArtigos(req, res) {
        const artigos = await Artigo.find().sort("-createdAt");
        res.status(200).json({ artigos });
    }

    static async getArtigoByTitulo(req, res) {
        const {titulo} = req.body;
        if(!titulo) {
            return res.status(422).json({message: "Titulo do artigo obrigatório na busca"});
        }
        const artigo = await Artigo.find({"titulo": titulo}).sort("-createdAt");
        if(!artigo || artigo.length === 0) {
            return res.status(422).json({message: "Artigo não encontrado"});
        }
        res.status(200).json({artigo});
        
    }

    static async updateArtigo(req, res) {
        const {_id} = req.params;
        const {titulo, slug, resumo, conteudo, categoria, autor, tags, cargo_autor, status} = req.body;
        const imagem_capa = req.file;
        if(!_id) {
            return res.status(422).json({message: "ID do artigo é obvrigatório"});
        }
        const artigo = await Artigo.findById(_id);
        if(!artigo) {
            return res.status(422).json({message: "Artigo não encontrado"});
        }

        try {
            const updatedArtigo = await Artigo.findByIdAndUpdate(id, {
                titulo,
                slug,
                resumo,
                conteudo,
                categoria,
                autor,
                imagem_capa: imagem_capa.path,
                tags:[],
                cargo_autor,
                status
            }, {new: true});
            return res.status(200).json({message: "Artigo atualizado com sucesso", artigo: updatedArtigo}); //retirar o artigo quando incrementar ao front
        }
        catch (error) {
            return res.status(500).json({message: "Erro ao atualizar artigo"});
        }
    }

    static async deleteArtigo(req, res) {
        const {_id} = req.params;
        if(!_id) {
            return res.status(422).json({message: "ID do artigo obrigatório"});
        }
        const artigo = await Artigo.findById(_id);
        if(!artigo) {
            return res.status(422).json({message: "Artigo não encontrado"});
        }
        try {
            await Artigo.findByIdAndDelete(_id);
            return res.status(200).json({message: "Artigo deletado com sucesso"});
        }
        catch (error) {
            return res.status(500).json({message: "Erro ao deletar artigo"});
        }
    }
};