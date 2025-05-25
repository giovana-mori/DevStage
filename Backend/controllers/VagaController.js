import Vaga from '../models/Vaga.js';
import Empresa from '../models/Empresa.js';

export default class VagaController {
    static async createVaga(req,res){
        const {titulo, descricao, requisitos, modalidade, localizacao, email_contato, link_candidatura} = req.body;
        //const empresa = req.params.id;
        if(!titulo || !descricao || !requisitos || !modalidade || !localizacao || !email_contato || !link_candidatura) {
            return res.status(422).json({message: "Todos os campos são obrigatórios"});
        }
        /*if(!empresa) {
            return res.status(422).json({message: "Empresa é obrigatória"});
        }*/
        const vaga = new Vaga({
            titulo,
            descricao,
            requisitos:[],
            modalidade,
            localizacao,
            email_contato,
            link_candidatura,
            empresa:{
                
                /*_id: empresa,
                nome: req.body.nome,
                localizacao: req.body.localizacao,
                email_contato: req.body.email_contato,
                descricao: req.body.descricao,
                setor: req.body.setor,
                site: req.body.site,
                telefone: req.body.telefone,
                logo: req.body.logo,
                status: req.body.status*/
            }
        });
        try {
            const newVaga = await vaga.save();
            return res.status(201).json({message: "Vaga criada com sucesso", vaga: newVaga});
        } catch (error) {
            return res.status(500).json({message: "Erro ao criar vaga"});
        }
    }

    static async getVagas(req,res){
        const {vagas} = await Vaga.find().sort("-createdAt");
        if(!vagas) {
            return res.status(422).json({message: "Nenhuma vaga encontrada"});
        }
        res.status(200).json({vagas});
    }

    static async getVagaByTitulo(req,res){
        const {titulo} = req.body;
        if(!titulo) {
            return res.status(422).json({message: "Nome da vaga obrigatório"});
        }
        const vaga = await Vaga.find({"titulo": titulo}).sort("-createdAt");
        if(!vaga || vaga.length === 0) {
            return res.status(422).json({message: "Vaga não encontrada"});
        }
        res.status(200).json({vaga});
    }

    static async updateVaga(req,res){
        const {id} = req.params;
        const {titulo, descricao, requisitos, modalidade, localizacao, email_contato, link_candidatura} = req.body;
        if(!id) {
            return res.status(422).json({message: "ID da vaga obrigatório"});
        }

        const vaga = await Vaga.findById(id);
        if(!vaga) {
            return res.status(422).json({message: "Vaga não encontrada"});
        }

        try {
            const updatedVaga = await Vaga.findByIdAndUpdate(id, {
            titulo,
            descricao,
            requisitos,
            modalidade,
            localizacao,
            email_contato,
            link_candidatura
            }, {new: true});
            await updatedVaga.save();
            return res.status(200).json({message: "Vaga atualizada com sucesso", vaga: updatedVaga});
        } catch (error) {
            return res.status(500).json({message: "Erro ao atualizar vaga"});
        }
    }

    static async deleteVaga(req,res){
        const {id} = req.params;
        if(!id) {
            return res.status(422).json({message: "ID da vaga obrigatório"});
        }
        const vaga = await Vaga.findById(id);
        if(!vaga) {
            return res.status(422).json({message: "Vaga não encontrada"});
        }
        try {
            await vaga.remove();
            return res.status(200).json({message: "Vaga removida com sucesso"});
        } catch (error) {
            return res.status(500).json({message: "Erro ao remover vaga"});
        }
    }
}