import { Router } from "express";
import ArtigoController from "../../controllers/ArtigoController.js";

const routesArtigo = Router();
routesArtigo.post('/CadastrarArtigo', ArtigoController.createArtigo);
routesArtigo.get('/Artigos', ArtigoController.getArtigos);
routesArtigo.get('/ArtigoByTitulo', ArtigoController.getArtigoByTitulo);
routesArtigo.post('/EditarArtigo', ArtigoController.updateArtigo);
routesArtigo.post('/ExcluirArtigo', ArtigoController.deleteArtigo);

export default routesArtigo;