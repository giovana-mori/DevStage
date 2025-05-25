import mongoose from '../db/conn.js';

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
        type: String,
        required: true
    },
    vagas: {
<<<<<<< HEAD
        type: [String],
        required: true
=======
        type: [Object],
>>>>>>> origin/routers
    }
});

const Empresa = mongoose.model('Empresa', empresaSchema);
export default Empresa;


/*
    password: {
        type: String,
        required: true
    },
*/