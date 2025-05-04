"use client"

import { useState } from "react"
import { Link } from "react-router-dom";
import SearchBar from "../../Component/lib/SearchBar";

// Dados de exemplo para as vagas
const vagasExemplo = [
    {
        id: 1,
        titulo: "Estágio em Desenvolvimento Front-end",
        empresa: "Acme Brasil",
        logo: "/placeholder.svg?height=80&width=80",
        localizacao: "São Paulo, SP (Remoto)",
        tipo: "Estágio",
        data: "10/05/2023",
        tags: ["React", "JavaScript", "Tailwind"],
        descricao:
            "Estamos buscando um estagiário para atuar no desenvolvimento de interfaces web utilizando React e Tailwind CSS.",
    },
    {
        id: 2,
        titulo: "Estágio em Desenvolvimento Back-end",
        empresa: "Tech Solutions",
        logo: "/placeholder.svg?height=80&width=80",
        localizacao: "Rio de Janeiro, RJ (Presencial)",
        tipo: "Estágio",
        data: "08/05/2023",
        tags: ["Node.js", "Express", "MongoDB"],
        descricao:
            "Oportunidade para estudantes de TI para atuar no desenvolvimento de APIs e serviços utilizando Node.js e MongoDB.",
    },
    {
        id: 3,
        titulo: "Estágio em Desenvolvimento Mobile",
        empresa: "Digital Innovations",
        logo: "/placeholder.svg?height=80&width=80",
        localizacao: "Belo Horizonte, MG (Híbrido)",
        tipo: "Estágio",
        data: "05/05/2023",
        tags: ["React Native", "Flutter", "Firebase"],
        descricao:
            "Buscamos estudante para atuar no desenvolvimento de aplicativos móveis utilizando React Native e Firebase.",
    },
    {
        id: 4,
        titulo: "Estágio em UX/UI Design",
        empresa: "Creative Labs",
        logo: "/placeholder.svg?height=80&width=80",
        localizacao: "Curitiba, PR (Remoto)",
        tipo: "Estágio",
        data: "03/05/2023",
        tags: ["Figma", "Adobe XD", "UI/UX"],
        descricao:
            "Oportunidade para estudantes de Design ou áreas correlatas para atuar na criação de interfaces de usuário.",
    },
    {
        id: 5,
        titulo: "Estágio em DevOps",
        empresa: "Cloud Systems",
        logo: "/placeholder.svg?height=80&width=80",
        localizacao: "Porto Alegre, RS (Presencial)",
        tipo: "Estágio",
        data: "01/05/2023",
        tags: ["Docker", "Kubernetes", "AWS"],
        descricao:
            "Estamos buscando um estagiário para atuar na área de DevOps, com foco em automação e infraestrutura como código.",
    },
    {
        id: 6,
        titulo: "Estágio em Análise de Dados",
        empresa: "Data Analytics",
        logo: "/placeholder.svg?height=80&width=80",
        localizacao: "Brasília, DF (Híbrido)",
        tipo: "Estágio",
        data: "28/04/2023",
        tags: ["Python", "SQL", "Power BI"],
        descricao:
            "Oportunidade para estudantes de TI, Estatística ou áreas correlatas para atuar na análise de dados e criação de dashboards.",
    },
    {
        id: 7,
        titulo: "Estágio em Segurança da Informação",
        empresa: "Security Plus",
        logo: "/placeholder.svg?height=80&width=80",
        localizacao: "São Paulo, SP (Presencial)",
        tipo: "Estágio",
        data: "25/04/2023",
        tags: ["Segurança", "Pentest", "Redes"],
        descricao:
            "Buscamos estudante para atuar na área de segurança da informação, realizando testes de penetração e análise de vulnerabilidades.",
    },
    {
        id: 8,
        titulo: "Estágio em Desenvolvimento Full Stack",
        empresa: "Web Solutions",
        logo: "/placeholder.svg?height=80&width=80",
        localizacao: "Recife, PE (Remoto)",
        tipo: "Estágio",
        data: "22/04/2023",
        tags: ["JavaScript", "React", "Node.js"],
        descricao:
            "Oportunidade para estudantes de TI para atuar no desenvolvimento full stack utilizando JavaScript, React e Node.js.",
    },
]

// Componente para exibir um card de vaga
function VagaCard({ vaga }) {
    return (
        <div className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-shadow p-6 border border-gray-200">
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-light rounded-lg flex items-center justify-center mr-4 overflow-hidden">
                    <img
                        src={vaga.logo || "/placeholder.svg"}
                        alt={vaga.empresa}
                        width={48}
                        height={48}
                        className="object-cover"
                    />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-dark">{vaga.titulo}</h3>
                    <p className="text-sm text-gray-dark">{vaga.empresa}</p>
                </div>
            </div>
            <div className="mb-4">
                <div className="flex items-center text-sm text-gray-dark mb-2">
                    <svg
                        className="w-4 h-4 mr-2 text-primary"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {vaga.localizacao}
                </div>
                <div className="flex items-center text-sm text-gray-dark">
                    <svg
                        className="w-4 h-4 mr-2 text-primary"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    Publicada em {vaga.data}
                </div>
            </div>
            <p className="text-sm text-gray-dark mb-4 line-clamp-2">{vaga.descricao}</p>
            <div className="flex flex-wrap gap-2 mb-4">
                {vaga.tags.map((tag) => (
                    <span key={tag} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-md">
                        {tag}
                    </span>
                ))}
            </div>
            <Link
                href={`/vagas/${vaga.id}`}
                className="block text-center bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
                Ver Detalhes
            </Link>
        </div>
    )
}

export default function Vagas() {
    const [filtroModalidade, setFiltroModalidade] = useState("")
    const [filtroTipo, setFiltroTipo] = useState("")
    const [filtroArea, setFiltroArea] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6

    // Filtrar vagas com base nos filtros selecionados
    const filteredVagas = vagasExemplo.filter(
        (vaga) =>
            (filtroModalidade === "" || vaga.localizacao.includes(filtroModalidade)) &&
            (filtroTipo === "" || vaga.tipo === filtroTipo) &&
            (filtroArea === "" || vaga.tags.includes(filtroArea)),
    )

    // Paginação
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredVagas.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(filteredVagas.length / itemsPerPage)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <main className="flex-grow">
            {/* Hero Section com SearchBar */}
            <SearchBar />

            {/* Conteúdo Principal */}
            <section className="py-12 bg-gray-light">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Filtros Laterais */}
                        <div className="w-full md:w-64 shrink-0">
                            <div className="bg-white rounded-xl shadow-soft p-6 sticky top-24">
                                <h2 className="text-lg font-bold text-gray-dark mb-4">Filtros</h2>

                                {/* Filtro de Modalidade */}
                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold text-gray-dark mb-2">Modalidade</h3>
                                    <div className="space-y-2">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="modalidade"
                                                value=""
                                                checked={filtroModalidade === ""}
                                                onChange={() => setFiltroModalidade("")}
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-medium rounded"
                                            />
                                            <span className="ml-2 text-sm text-gray-dark">Todas</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="modalidade"
                                                value="Remoto"
                                                checked={filtroModalidade === "Remoto"}
                                                onChange={() => setFiltroModalidade("Remoto")}
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-medium rounded"
                                            />
                                            <span className="ml-2 text-sm text-gray-dark">Remoto</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="modalidade"
                                                value="Presencial"
                                                checked={filtroModalidade === "Presencial"}
                                                onChange={() => setFiltroModalidade("Presencial")}
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-medium rounded"
                                            />
                                            <span className="ml-2 text-sm text-gray-dark">Presencial</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="modalidade"
                                                value="Híbrido"
                                                checked={filtroModalidade === "Híbrido"}
                                                onChange={() => setFiltroModalidade("Híbrido")}
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-medium rounded"
                                            />
                                            <span className="ml-2 text-sm text-gray-dark">Híbrido</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Filtro de Tipo */}
                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold text-gray-dark mb-2">Tipo</h3>
                                    <div className="space-y-2">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="tipo"
                                                value=""
                                                checked={filtroTipo === ""}
                                                onChange={() => setFiltroTipo("")}
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-medium rounded"
                                            />
                                            <span className="ml-2 text-sm text-gray-dark">Todos</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="tipo"
                                                value="Estágio"
                                                checked={filtroTipo === "Estágio"}
                                                onChange={() => setFiltroTipo("Estágio")}
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-medium rounded"
                                            />
                                            <span className="ml-2 text-sm text-gray-dark">Estágio</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="tipo"
                                                value="Trainee"
                                                checked={filtroTipo === "Trainee"}
                                                onChange={() => setFiltroTipo("Trainee")}
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-medium rounded"
                                            />
                                            <span className="ml-2 text-sm text-gray-dark">Trainee</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Filtro de Área */}
                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold text-gray-dark mb-2">Área</h3>
                                    <select
                                        value={filtroArea}
                                        onChange={(e) => setFiltroArea(e.target.value)}
                                        className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                                    >
                                        <option value="">Todas as áreas</option>
                                        <option value="React">Front-end (React)</option>
                                        <option value="Node.js">Back-end (Node.js)</option>
                                        <option value="React Native">Mobile</option>
                                        <option value="UI/UX">UI/UX Design</option>
                                        <option value="Docker">DevOps</option>
                                        <option value="Python">Análise de Dados</option>
                                        <option value="Segurança">Segurança da Informação</option>
                                    </select>
                                </div>

                                {/* Botão para limpar filtros */}
                                <button
                                    onClick={() => {
                                        setFiltroModalidade("")
                                        setFiltroTipo("")
                                        setFiltroArea("")
                                    }}
                                    className="w-full py-2 px-4 border border-gray-medium rounded-lg text-gray-dark hover:bg-gray-light transition-colors text-sm"
                                >
                                    Limpar Filtros
                                </button>
                            </div>
                        </div>

                        {/* Lista de Vagas */}
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold text-gray-dark">
                                    Vagas Disponíveis{" "}
                                    <span className="text-sm font-normal text-gray-500">({filteredVagas.length} encontradas)</span>
                                </h1>
                                <div className="hidden md:block">
                                    <select className="px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm">
                                        <option value="recentes">Mais recentes</option>
                                        <option value="antigas">Mais antigas</option>
                                    </select>
                                </div>
                            </div>

                            {filteredVagas.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {currentItems.map((vaga) => (
                                            <VagaCard key={vaga.id} vaga={vaga} />
                                        ))}
                                    </div>

                                    {/* Paginação */}
                                    {totalPages > 1 && (
                                        <div className="mt-8 flex justify-center">
                                            <nav className="inline-flex rounded-md shadow-sm">
                                                <button
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                    disabled={currentPage === 1}
                                                    className={`px-3 py-2 rounded-l-md border border-gray-medium ${currentPage === 1
                                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                        : "bg-white text-gray-dark hover:bg-gray-light"
                                                        }`}
                                                >
                                                    Anterior
                                                </button>
                                                {Array.from({ length: totalPages }, (_, i) => (
                                                    <button
                                                        key={i + 1}
                                                        onClick={() => handlePageChange(i + 1)}
                                                        className={`px-3 py-2 border-t border-b border-gray-medium ${currentPage === i + 1
                                                            ? "bg-primary text-white"
                                                            : "bg-white text-gray-dark hover:bg-gray-light"
                                                            }`}
                                                    >
                                                        {i + 1}
                                                    </button>
                                                ))}
                                                <button
                                                    onClick={() => handlePageChange(currentPage + 1)}
                                                    disabled={currentPage === totalPages}
                                                    className={`px-3 py-2 rounded-r-md border border-gray-medium ${currentPage === totalPages
                                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                        : "bg-white text-gray-dark hover:bg-gray-light"
                                                        }`}
                                                >
                                                    Próxima
                                                </button>
                                            </nav>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="bg-white rounded-xl shadow-soft p-8 text-center">
                                    <svg
                                        className="w-16 h-16 text-gray-300 mx-auto mb-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <h3 className="text-lg font-semibold text-gray-dark mb-2">Nenhuma vaga encontrada</h3>
                                    <p className="text-gray-dark mb-4">
                                        Não encontramos vagas com os filtros selecionados. Tente ajustar seus critérios de busca.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setFiltroModalidade("")
                                            setFiltroTipo("")
                                            setFiltroArea("")
                                        }}
                                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    >
                                        Limpar Filtros
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-primary text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Não encontrou a vaga ideal?</h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto">
                        Cadastre-se para receber alertas de novas vagas que correspondam ao seu perfil e interesses.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/cadastro"
                            className="bg-white text-primary hover:bg-gray-100 font-bold py-3 px-6 rounded-full transition-colors"
                        >
                            Cadastre-se Gratuitamente
                        </Link>
                        <Link
                            href="/contato"
                            className="bg-secondary hover:bg-secondary-dark text-white font-bold py-3 px-6 rounded-full transition-colors"
                        >
                            Fale Conosco
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
