import { Router } from 'express';
import UserController from '../../controllers/UserController.js';

const routesUser = Router();

routesUser.post('/Register', UserController.register);
routesUser.post('/Login', UserController.login);


export default routesUser;