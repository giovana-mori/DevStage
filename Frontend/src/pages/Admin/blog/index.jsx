"use client"

import { useState } from "react"
import AdminHeader from "../../../Component/AdminHeader"
import { Link } from "react-router-dom"

// Dados de exemplo para a tabela de posts do blog
const blogPostsExemplo = [
  {
    id: 1,
    titulo: "Como se preparar para entrevistas técnicas de estágio",
    categoria: "Carreira",
    autor: "Ana Rodrigues",
    data: "15/05/2023",
    status: "Publicado",
    visualizacoes: 1245,
  },
  {
    id: 2,
    titulo: "Tecnologias mais requisitadas para estágios em 2023",
    categoria: "Tecnologia",
    autor: "Carlos Mendes",
    data: "02/05/2023",
    status: "Publicado",
    visualizacoes: 987,
  },
  {
    id: 3,
    titulo: "Como montar um portfólio de projetos para estágio",
    categoria: "Portfólio",
    autor: "Mariana Costa",
    data: "25/04/2023",
    status: "Publicado",
    visualizacoes: 756,
  },
  {
    id: 4,
    titulo: "Dicas para equilibrar estágio e faculdade",
    categoria: "Produtividade",
    autor: "Pedro Alves",
    data: "18/04/2023",
    status: "Publicado",
    visualizacoes: 543,
  },
  {
    id: 5,
    titulo: "O que as empresas buscam em estagiários de desenvolvimento?",
    categoria: "Carreira",
    autor: "Juliana Martins",
    data: "10/04/2023",
    status: "Publicado",
    visualizacoes: 890,
  },
  {
    id: 6,
    titulo: "Como criar um currículo eficiente para vagas de estágio",
    categoria: "Currículo",
    autor: "Roberto Almeida",
    data: "05/04/2023",
    status: "Publicado",
    visualizacoes: 678,
  },
  {
    id: 7,
    titulo: "Frameworks JavaScript para aprender em 2023",
    categoria: "Tecnologia",
    autor: "Carlos Mendes",
    data: "28/03/2023",
    status: "Rascunho",
    visualizacoes: 0,
  },
  {
    id: 8,
    titulo: "Como se destacar em processos seletivos para estágio",
    categoria: "Carreira",
    autor: "Ana Rodrigues",
    data: "20/03/2023",
    status: "Agendado",
    visualizacoes: 0,
  },
]

export default function AdminBlog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoriaFilter, setCategoriaFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filtrar posts com base na pesquisa e nos filtros
  const filteredPosts = blogPostsExemplo.filter(
    (post) =>
      (post.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.autor.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (categoriaFilter === "" || post.categoria === categoriaFilter) &&
      (statusFilter === "" || post.status === statusFilter),
  )

  // Paginação
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredPosts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // Obter categorias únicas para o filtro
  const categorias = [...new Set(blogPostsExemplo.map((post) => post.categoria))]

  return (
    <div className="min-h-screen bg-gray-light">
      <AdminHeader activeTab="blog" />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-dark">Gerenciamento do Blog</h1>
          <p className="text-gray-dark">Gerencie todos os artigos do blog da plataforma DevStage.</p>
        </div>

        {/* Filtros e busca */}
        <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Buscar por título ou autor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <select
                className="block w-full sm:w-auto px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                value={categoriaFilter}
                onChange={(e) => setCategoriaFilter(e.target.value)}
              >
                <option value="">Todas as categorias</option>
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>

              <select
                className="block w-full sm:w-auto px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Todos os status</option>
                <option value="Publicado">Publicado</option>
                <option value="Rascunho">Rascunho</option>
                <option value="Agendado">Agendado</option>
              </select>

              <Link
                to="/admin/blog/novo"
                className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Novo Artigo
              </Link>
            </div>
          </div>
        </div>

        {/* Tabela de posts */}
        <div className="bg-white rounded-xl shadow-soft overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-medium">
              <thead className="bg-gray-light">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-dark uppercase tracking-wider"
                  >
                    Título
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-dark uppercase tracking-wider"
                  >
                    Categoria
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-dark uppercase tracking-wider"
                  >
                    Autor
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-dark uppercase tracking-wider"
                  >
                    Data
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-dark uppercase tracking-wider"
                  >
                    Visualizações
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-dark uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-dark uppercase tracking-wider"
                  >
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-medium">
                {currentItems.length > 0 ? (
                  currentItems.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-light">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-dark">{post.titulo}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary/10 text-primary">
                          {post.categoria}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-dark">{post.autor}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-dark">{post.data}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-dark">{post.visualizacoes.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            post.status === "Publicado"
                              ? "bg-green-100 text-green-800"
                              : post.status === "Rascunho"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link to={`/admin/blog/${post.id}`} className="text-primary hover:text-primary-dark">
                            <svg
                              className="w-5 h-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </Link>
                          <Link to={`/blog/${post.id}`} target="_blank" className="text-blue-500 hover:text-blue-700">
                            <svg
                              className="w-5 h-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path
                                fillRule="evenodd"
                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </Link>
                          <button className="text-red-500 hover:text-red-700">
                            <svg
                              className="w-5 h-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-dark">
                      Nenhum artigo encontrado com os filtros aplicados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Paginação */}
          <div className="px-6 py-4 flex justify-between items-center border-t border-gray-medium">
            <div className="text-sm text-gray-dark">
              Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a{" "}
              <span className="font-medium">
                {indexOfLastItem > filteredPosts.length ? filteredPosts.length : indexOfLastItem}
              </span>{" "}
              de <span className="font-medium">{filteredPosts.length}</span> resultados
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 border border-gray-medium rounded-md text-sm ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-dark hover:bg-gray-light cursor-pointer"
                }`}
              >
                Anterior
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 border rounded-md text-sm ${
                    currentPage === i + 1
                      ? "bg-primary text-white border-primary"
                      : "text-gray-dark border-gray-medium hover:bg-gray-light"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border border-gray-medium rounded-md text-sm ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-dark hover:bg-gray-light cursor-pointer"
                }`}
              >
                Próxima
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
