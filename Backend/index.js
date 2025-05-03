import express from "express";
import cors from "cors";
//importar os routes como no ex abaixo
//import routes from "./Routers/User/routes.js";

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

//usar os routes como no ex abaixo
//app.use("/users", routes);

app.listen(5000);