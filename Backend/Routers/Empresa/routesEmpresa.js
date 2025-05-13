import { Router } from "express";
import EmpresaController from "../../controllers/EmpresaController.js";

const routesEmpresa = Router();
routesEmpresa.post('/CadastrarEmpresa', EmpresaController.createEmpresa);
routesEmpresa.get('/Empresas', EmpresaController.getEmpresas);
routesEmpresa.get('/EmpresaByNome', EmpresaController.getEmpresaByNome);
routesEmpresa.post('/EditarEmpresa/:id', EmpresaController.updateEmpresa);
routesEmpresa.post('/ExcluirEmpresa/:id', EmpresaController.deleteEmpresa);

export default routesEmpresa;