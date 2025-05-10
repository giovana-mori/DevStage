import Artigo from "../models/Artigo";

export default class ArtigoController {
    static async createArtigo() {
        const {titulo, slug, resumo, conteudo, categoria, autor, tags, cargo_autor, status} = req.body;
        const imagem_capa = req.file;

        if(!titulo || !slug || !resumo || !conteudo || !categoria || !autor  || !status) {
            return res.status(422).json({message: "Preencha os campos obrigatórios"});
        }
        if(!imagem_capa) {
            return res.status(422).json({message: "Imagem de capa obrigatória"});
        }

        const artigo = new Artigo({
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
        });
        
        try{
            const newArtigo = await artigo.save();
            return res.status(201).json({message: "Artigo criado com sucesso", artigo: newArtigo}); //retirar o artigo quando incrementar ao front
        }
        catch (error) {
            return res.status(500).json({message: "Erro ao criar artigo"});
        }
    }

    static async getArtigos(res) {
        const artigos = await Artigo.find().sort({createdAt: -1});
        if(!artigos) {
            res.status(422).json({message: "Nenhum artigo encontrado"});
        }
        try {
            return res.status(200).json({artigos});
        }
        catch (error) {
            return res.status(500).json({message: "Erro ao buscar artigos"});
        }
    }

    static async getArtigoById(req, res) {
        const {id} = req.params;
        if(!id) {
            return res.status(422).json({message: "ID do artigo obrigatório"});
        }
        const artigo = await Artigo.findById(id);
        if(!artigo) {
            return res.status(422).json({message: "Artigo não encontrado"});
        }
        try {
            return res.status(200).json({artigo});
        }
        catch (error) {
            return res.status(500).json({message: "Erro ao buscar artigo"});
        }
    }

    static async updateArtigo(req, res) {
        const {id} = req.params;
        const {titulo, slug, resumo, conteudo, categoria, autor, tags, cargo_autor, status} = req.body;
        const imagem_capa = req.file;
        if(!id) {
            return res.status(422).json({message: "ID do artigo é obvrigatório"});
        }
        const artigo = await Artigo.findById(id);
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
        const {id} = req.params;
        if(!id) {
            return res.status(422).json({message: "ID do artigo obrigatório"});
        }
        const artigo = await Artigo.findById(id);
        if(!artigo) {
            return res.status(422).json({message: "Artigo não encontrado"});
        }
        try {
            await Artigo.findByIdAndDelete(id);
            return res.status(200).json({message: "Artigo deletado com sucesso"});
        }
        catch (error) {
            return res.status(500).json({message: "Erro ao deletar artigo"});
        }
    }
};