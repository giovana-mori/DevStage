import User from "../models/User.js";
import Argon2 from "argon2";
import createUserToken from "../helpers/create-token.js";
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";

export default class UserController {
  static async register(req, res) {
    const {
      nome,
      email,
      cpf,
      telefone,
      password,
      tipo,
      status,
      curso,
      instituicao_ensino,
      github,
      linkedin,
      sobre,
      portifolio,
    } = req.body;

    try {
      // Verifica se já existe um usuário com o mesmo e-mail
      const userExist = await User.findOne({ email });

      if (userExist) {
        return res.status(422).json({ message: "E-mail já cadastrado" });
      }

      // Criptografa a senha
      const passwordhash = await Argon2.hash(password, {
        type: Argon2.argon2id,
        memoryCost: 2 ** 16,
        parallelism: 1,
      });

      // Cria o novo usuário com os dados recebidos
      const user = new User({
        nome,
        email,
        cpf,
        telefone,
        password: passwordhash,
        tipo,
        status,
        curso,
        instituicao_ensino,
        github,
        linkedin,
        sobre,
        portifolio,
      });

      // Tenta salvar o usuário
      const newUser = await user.save();

      return res.status(201).json({
        message: "Usuário inserido com sucesso",
        newUser,
      });
    } catch (error) {
      // Se o erro for de validação do Mongoose
      if (error.name === "ValidationError") {
        const errors = Object.keys(error.errors).map((field) => ({
          field,
          message: error.errors[field].message,
        }));

        return res.status(400).json({
          message: "Erro de validação",
          errors,
        });
      }

      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro interno. Tente novamente mais tarde." });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(422).json({ message: "Preencha os campos obrigatórios" });
      return;
    }
    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      return res.status(422).json({ message: "Credenciais inválidas" });
    }
    //verificar a senha
    const checkPassword = await Argon2.verify(userExist.password, password);
    if (!checkPassword) {
      return res.status(422).json({ message: "Credenciais inválidas" });
    }
    //gerar token
    await createUserToken(userExist, req, res);
  }

  static async update(req, res) {
    try{
      const token = getToken(req);
      const user = await getUserByToken(token);
      const updatedData = req.body;
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      // Atualiza os campos do usuário com os dados recebidos
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        updatedData,
        { new: true }
      );
      return res.status(200).json({message: "Usuário atualizado com sucesso", updatedUser,});
    }catch(error){
      res.status(500).json({ message: "Erro ao atualizar usuário", error: error.message });
    }
  }
}
