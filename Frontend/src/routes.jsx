import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/index.jsx";
import Login from "./pages/Auth/Login/index.jsx";
import Register from "./pages/Auth/Register/index.jsx";
import Footer from "./Component/Footer/index.jsx";
import Container from "./Component/Container/index.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import Message from "./Component/Message/index.jsx";
import FAQ from "./pages/Faq/index.jsx";
import Sobre from "./pages/Sobre/index.jsx";
import Vagas from "./pages/Vagas/index.jsx";
import Blog from "./pages/Blog/index.jsx";
import BlogPost from "./pages/Blog/[id]/index.jsx";
import AdminDashboard from "./pages/Admin/dashboard/index.jsx";
import AdminVagas from "./pages/Admin/vagas/index.jsx";
import AdminVagasForm from "./pages/Admin/vagas/[id]/index.jsx";
import AdminEmpresas from "./pages/Admin/empresas/index.jsx";
import AdminEmpresaForm from "./pages/Admin/empresas/[id]/index.jsx";
import AdminUsuarios from "./pages/Admin/usuarios/index.jsx";
import AdminUsuarioForm from "./pages/Admin/usuarios/[id]/index.jsx";
import AdminBlog from "./pages/Admin/blog/index.jsx";
import AdminBlogPostForm from "./pages/Admin/blog/[id]/index.jsx";
import Perfil from "./pages/Perfil/index.jsx";
import DetalhesVaga from "./pages/Vagas/[titulo]/index.jsx";
function AppRoutes() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Message />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/vagas" element={<Vagas />} />
            <Route path="/vagas/:titulo" element={<DetalhesVaga />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registrar" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/vagas" element={<AdminVagas />} />
            <Route path="/admin/vagas/nova" element={<AdminVagasForm />} />
            <Route path="/admin/vagas/:id" element={<AdminVagasForm />} />
            <Route path="/admin/empresas" element={<AdminEmpresas />} />
            <Route path="/admin/empresas/nova" element={<AdminEmpresaForm />} />
            <Route path="/admin/empresas/:id" element={<AdminEmpresaForm />} />
            <Route path="/admin/usuarios" element={<AdminUsuarios />} />
            <Route path="/admin/usuarios/novo" element={<AdminUsuarioForm />} />
            <Route path="/admin/usuarios/:id" element={<AdminUsuarioForm />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            <Route path="/admin/blog/novo" element={<AdminBlogPostForm />} />
            <Route path="/admin/blog/:id" element={<AdminBlogPostForm />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
}
export default AppRoutes;
