import User from "../models/User.js";
import Argon2 from "argon2";
import createUserToken from "../helpers/create-token.js";
export default class UserController {
  static async register(req, res) {
    const {
      nome,
      email,
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
}
