/*
averiguar quais informações vao ser registradas na hora do register


*/

import User from "../models/User.js";
import Argon2 from "argon2";
import createUserToken from "../helpers/create-token.js";
export default class UserController{
    static async register(req,res)
    {
        //res.json({message:"Olá"});
        const{nome, email, telefone, password, confirmpassword, instituicao_ensino} = req.body;
        //validar
        if(!nome || !email || !telefone || !password || !confirmpassword || !instituicao_ensino)
        {
            res.status(422).json({message:"Preencha todos os campos"});
            return;
        }
        if(password !== confirmpassword)
        {
            res.status(422).json({message:"Senhas não são iguais"});
            return;
        }
        try {
            //verificar se já tem um usuário com o mesmo email
            const userExist = await User.findOne({email:email});
            if(userExist)
            {
                return res.status(422).json({message:"E-mail já cadastrado"});
            }
            //criptografar a senha antes de salvar
            const passwordhash = await Argon2.hash(password,{
                type:Argon2.argon2id,
                memoryCost:2**16,
                parallelism:1
            });
            //salvar o usuário
            const user = new User({
                nome,
                email,
                telefone,
                password:passwordhash,
                instituicao_ensino
            });
            try {
                const newUser = await user.save();
                //token se for logar após o registro do usuário descomentar a linha de baixo
                //await createUserToken(userExist, req, res);

                return res.status(201).json({message:"Usuário inserido com sucesso",newUser})
            } catch (error) {
                return res.status(500).json({message:"Problema ao cadastrar o usuário"});
            }
        } catch (error) {
            return res.status(500).json({message:"Tente mais tarde novamente"});
        }
    }

    static async login(req,res)
    {
        const {email, password} = req.body;
        if(!email)
        {
            res.status(422).json({message:"O e-mail é obrigatório"});
            return;
        } 
        if(!password)
        {
            res.status(422).json({message:"A senha é obrigatória"});
            return;
        } 
        const userExist = await User.findOne({email:email});
        if(!userExist)
        {
            return res.status(422).json({message:"Credenciais inválidas"});
        }
        //verificar a senha
        const checkPassword = await Argon2.verify(userExist.password, password);
        if(!checkPassword)
        {
            return res.status(422).json({message:"Credenciais inválidas"});
        }
        //gerar token
        await createUserToken(userExist, req, res);
    }
}