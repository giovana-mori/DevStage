import mongoose from 'mongoose';

const { Schema } = mongoose;
const empresaSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    localizacao: {
        type: String,
        required: true
    },
    email_contato: {
        type: String,
        required: true,
        unique: true
    },
    descricao: {
        type: String
    },
    setor: {
        type: String,
        required: true
    },
    site: {
        type: String
    },
    telefone: {
        type: String
    },
    logo: {
        type: String
    },
    status:{
        type: Boolean,
        required: true
    },
    vagas: {
        type: [Object],
        required: true
    }
}, {timestamps:true});

const Empresa = mongoose.model('Empresa', empresaSchema);
export default Empresa;


/*
    password: {
        type: String,
        required: true
    },
*/