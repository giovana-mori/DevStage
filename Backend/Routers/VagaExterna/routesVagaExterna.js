import {Router} from 'express';
import VagaExternaController from '../../controllers/VagaExternaController.js';

const routesVagaExterna = Router();

routesVagaExterna.post('/ImportarVagas', VagaExternaController.importarVagas);
routesVagaExterna.get('/', VagaExternaController.getVagasExternas);


export default routesVagaExterna;