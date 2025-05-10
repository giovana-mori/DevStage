import mongoose from 'mongoose';

const { Schema } = mongoose;
const vagaSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    requisitos: {
        type: [String],
        required: true
    },
    modalidade: {
        type: String,
        required: true
    },
    localizacao: {
        type: String,
        required: true
    },
    empresa:{
        type: Object,
        required:true
    },
    email_contato:{
        type:String,
        required:true
    },
    link_candidatura:{
        type:String,
        required:true
    }
}, {timestamps:true});

const Vaga = mongoose.model('Vaga', vagaSchema);
export default Vaga;