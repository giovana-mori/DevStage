import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/index.jsx";
import Login from "./pages/Auth/Login/index.jsx";
import Register from "./pages/Auth/Register/index.jsx";
import Header from "./Component/Header/index.jsx";
import Footer from "./Component/Footer/index.jsx";
import Container from "./Component/Container/index.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import Message from "./Component/Message/index.jsx";
import FAQ from "./pages/Faq/index.jsx";
import Sobre from "./pages/Sobre/index.jsx";
import Vagas from "./pages/Vagas/index.jsx";
import Blog from "./pages/Blog/index.jsx";
import BlogPost from "./pages/Blog/[id]/index.jsx";
function AppRoutes(){
    return(
        <BrowserRouter>
         <UserProvider>
            <Header/>
            <Message/>
            <Container>
                <Routes>                   
                    <Route path="/" element={<Home/>}/>
                    <Route path="/faq" element={<FAQ/>}/>
                    <Route path="/sobre" element={<Sobre/>}/>
                    <Route path="/vagas" element={<Vagas/>}/>
                    <Route path="/vagas/:id" element={<Vagas/>}/>
                    <Route path="/blog" element={<Blog/>}/>
                    <Route path="/blog/:id" element={<BlogPost/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </Container>
            <Footer/>
            </UserProvider>
        </BrowserRouter>
    )
}
export default AppRoutes;
