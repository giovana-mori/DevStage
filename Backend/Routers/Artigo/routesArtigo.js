import { Router } from "express";
import ArtigoController from "../../controllers/ArtigoController.js";

const routesArtigo = Router();
routesArtigo.post('/CadastrarArtigo', ArtigoController.createArtigo);
routesArtigo.get('/', ArtigoController.getArtigos);
routesArtigo.get('/:titulo', ArtigoController.getArtigoByTitulo);
routesArtigo.post('/EditarArtigo/:id', ArtigoController.updateArtigo);
routesArtigo.delete('/:id', ArtigoController.deleteArtigo);

export default routesArtigo;