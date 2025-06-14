import express from "express";
import cors from "cors";
//importar os routes como no ex abaixo
import routesArtigo from "./Routers/Artigo/routesArtigo.js";
import routesEmpresa from "./Routers/Empresa/routesEmpresa.js";
//import routesSessao from "./Routers/Sessao/routesSessao.js";
import routesUser from "./Routers/User/routesUser.js";
import routesVaga from "./Routers/Vaga/routesVaga.js";
import cookieparser from "cookie-parser";

const app = new express();

app.use(cookieparser());
//mensagem json
app.use(express.json());
//cors frontend
app.use(cors({
    credentials:true, origin:"http://localhost:3000"
}))
app.use(express.static('public'));
app.use("/artigos", routesArtigo);
app.use("/empresas", routesEmpresa);
//app.use("/sessao", routesSessao);
app.use("/vagas", routesVaga);
app.use("/users", routesUser);
//usar os routes como no ex abaixo
//app.use("/users", routes);

app.listen(5000);