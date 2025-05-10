import Empresa from "../models/Empresa";

export default class EmpresaController {
    static async createEmpresa(req, res) {
        const {nome, localizacao, email_contato, descricao, setor, site, telefone, status, vagas} = req.body;
        const logo = req.file;
        if(!nome || !localizacao || !email_contato || !setor || !status || !vagas) {
            return res.status(422).json({message: "Todos os campos são obrigatórios"});
        }
        const empresa = new Empresa({
            nome,
            localizacao,
            email_contato,
            descricao,
            setor,
            site,
            telefone,
            logo: logo.path,
            status,
            vagas:[
                {
                    titulo: "",
                    descricao: "",
                    requisitos: [],
                    modalidade: "",
                    localizacao: "",
                    email_contato: "",
                    link_candidatura: ""
                }
            ]
        });
        try {
            const newEmpresa = await empresa.save();
            return res.status(201).json({message: "Empresa criada com sucesso", empresa: newEmpresa});
        } catch (error) {
            return res.status(500).json({message: "Erro ao criar empresa"});
        }
    }

    static async getEmpresas(req, res) {
        const empresas = await Empresa.find().sort({createdAt: -1});
        if(!empresas) {
            return res.status(422).json({message: "Nenhuma empresa encontrada"});
        }
        try {
            return res.status(200).json({empresas});
        } catch (error) {
            return res.status(500).json({message: "Erro ao buscar empresas"});
        }
    }

    static async getEmpresaById(req, res) {
        const {id} = req.params;
        if(!id) {
            return res.status(422).json({message: "ID da empresa obrigatório"});
        }
        const empresa = await Empresa.findById(id);
        if(!empresa) {
            return res.status(422).json({message: "Empresa não encontrada"});
        }
        try {
            return res.status(200).json({empresa});
        } catch (error) {
            return res.status(500).json({message: "Erro ao buscar empresa"});
        }
    }

    static async updateEmpresa(req, res) {
        const {id} = req.params;
        const {nome, localizacao, email_contato, descricao, setor, site, telefone, status} = req.body;
        const logo = req.file;
        if(!id) {
            return res.status(422).json({message: "ID da empresa obrigatório"});
        }
        const empresa = await Empresa.findById(id);
        if(!empresa) {
            return res.status(422).json({message: "Empresa não encontrada"});
        }
        if(logo) {
            empresa.logo = logo.path;
        }
        try {
            const updatedEmpresa = await Empresa.findByIdAndUpdate(id, {
            nome,
            localizacao,
            email_contato,
            descricao,
            setor,
            site,
            telefone,
            logo: logo.path,
            status
            }, {new: true});
            await updatedEmpresa.save();
            return res.status(200).json({message: "Empresa atualizada com sucesso", empresa: updatedEmpresa});
        } catch (error) {
            return res.status(500).json({message: "Erro ao atualizar empresa"});
        }
    }

    static async deleteEmpresa(req, res) {
        const {id} = req.params;
        if(!id) {
            return res.status(422).json({message: "ID da empresa obrigatório"});
        }
        const empresa = await Empresa.findById(id);
        if(!empresa) {
            return res.status(422).json({message: "Empresa não encontrada"});
        }
        try {
            await empresa.remove();
            return res.status(200).json({message: "Empresa removida com sucesso"});
        } catch (error) {
            return res.status(500).json({message: "Erro ao remover empresa"});
        }
    }
}