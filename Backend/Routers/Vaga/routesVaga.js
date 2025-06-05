import {Router} from 'express';
import verifyToken from '../../helpers/verify-token.js'
import VagaController from '../../controllers/VagaController.js';

const routesVaga = Router();

routesVaga.post('/CadastrarVaga', VagaController.createVaga);
routesVaga.get('/', VagaController.getVagas);
routesVaga.get('/:titulo', VagaController.getVagaByTitulo);
routesVaga.post('/EditarVaga/:id', VagaController.updateVaga);
routesVaga.delete('/ExcluirVaga/:id', VagaController.deleteVaga);
routesVaga.post('/CandidatarVaga/:id', VagaController.addCandidato);
routesVaga.get('/Candidatos/:id', verifyToken, VagaController.getCandidatos);

export default routesVaga;