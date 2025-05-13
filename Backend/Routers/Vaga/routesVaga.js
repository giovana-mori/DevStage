import {Router} from 'express';
import VagaController from '../../controllers/VagaController.js';

const routesVaga = Router();

routesVaga.post('/CadastrarVaga', VagaController.createVaga);
routesVaga.get('/Vagas', VagaController.getVagas);
routesVaga.get('/VagaByTitulo', VagaController.getVagaByTitulo);
routesVaga.post('/EditarVaga/:id', VagaController.updateVaga);
routesVaga.post('/ExcluirVaga/:id', VagaController.deleteVaga);

export default routesVaga;