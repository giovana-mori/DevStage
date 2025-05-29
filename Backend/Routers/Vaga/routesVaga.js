import {Router} from 'express';
import VagaController from '../../controllers/VagaController.js';

const routesVaga = Router();

routesVaga.post('/CadastrarVaga', VagaController.createVaga);
routesVaga.get('/', VagaController.getVagas);
routesVaga.get('/:titulo', VagaController.getVagaByTitulo);
routesVaga.post('/EditarVaga/:id', VagaController.updateVaga);
routesVaga.delete('/ExcluirVaga/:id', VagaController.deleteVaga);

export default routesVaga;