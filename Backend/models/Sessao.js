//Armazenamento de tokens de refresh
import mongoose from '../db/conn.js';

const { Schema } = mongoose;
const sessaoSchema = new Schema({
    user: {
        type: Object,
        required: true
    },
    token: {
        type: String,
        required: true
    }
}, {timestamps:true});

const Sessao = mongoose.model('Sessao', sessaoSchema);
export default Sessao;
