import { Router } from "express";
import verifyToken from '../../helpers/verify-token.js'
import UserController from "../../controllers/UserController.js";

const routesUser = Router();

routesUser.post("/Register", UserController.register);
routesUser.post("/Login", UserController.login);
routesUser.post("/Update", UserController.update);
routesUser.get("/", UserController.getUsers);
routesUser.get("/Perfil", UserController.perfilByToken);
routesUser.get("/:id", UserController.getUserByID);
routesUser.post("/Update/:id", UserController.updateByID);
routesUser.post('/upload-curriculo', UserController.uploadCurriculo);


export default routesUser;
