import { Router } from 'express';
import UserController from '../../controllers/UserController.js';

const routesUser = Router();

routesUser.post('/Register', UserController.register);
routesUser.post('/Login', UserController.login);
routesUser.post('/Update', UserController.update);
routesUser.get('/', UserController.getUsers);
routesUser.get('/:id', UserController.getUserByID);
routesUser.post('/Update/:id', UserController.updateByID);


export default routesUser;