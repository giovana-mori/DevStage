import { Router } from "express";
import EmpresaController from "../../controllers/EmpresaController.js";

const routesEmpresa = Router();
routesEmpresa.post('/CadastrarEmpresa', EmpresaController.createEmpresa);
routesEmpresa.get('/', EmpresaController.getEmpresas);
routesEmpresa.get('/:nome', EmpresaController.getEmpresaByNome);
routesEmpresa.post('/EditarEmpresa/:id', EmpresaController.updateEmpresa);
routesEmpresa.delete('/ExcluirEmpresa/:id', EmpresaController.deleteEmpresa);

export default routesEmpresa;