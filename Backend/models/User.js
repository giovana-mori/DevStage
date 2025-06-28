import mongoose from '../db/conn.js';

const { Schema } = mongoose;
const userSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    telefone: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    curso: { //averiguar dps se entra pois 
        type: String,
        required: true
    },
    instituicao_ensino: {
        type: String,
        required: true
    },
    github: {
        type: String
    },
    linkedin: {
        type: String
    },
    sobre: {
        type: String
    },
    portifolio: {
        type: String
    },
    curriculo:{
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});
const User = mongoose.model('User', userSchema);
export default User;
