import mongoose from 'mongoose';

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
    telefone: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ['admin', 'estudante', 'recrutador']
    },
    status:{
        type: Boolean,
        required: true
    },
    curso: { //averiguar dps se entra pois 
        type: String,
        required: function() { //obrigatorio para estudante
            return this.tipo === 'estudante';
        }
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
    }
}, {timestamps: true});
const User = mongoose.model('User', userSchema);
export default User;
