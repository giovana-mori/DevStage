"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../Component/Header/index.jsx";

// Dados de exemplo para os posts do blog
const blogPosts = [
  {
    id: 1,
    title: "Como se preparar para entrevistas técnicas de estágio",
    excerpt:
      "Dicas práticas para se destacar em entrevistas técnicas e conquistar a vaga de estágio dos seus sonhos.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
    author: "Ana Rodrigues",
    authorRole: "Recrutadora Senior",
    date: "15 de Maio, 2023",
    category: "Carreira",
    readTime: "5 min de leitura",
    image: "https://placehold.co/600x400/EEE/31343C",
    tags: ["Entrevista", "Estágio", "Carreira"],
  },
  {
    id: 2,
    title: "Tecnologias mais requisitadas para estágios em 2023",
    excerpt:
      "Conheça as tecnologias e habilidades mais valorizadas pelas empresas para vagas de estágio em desenvolvimento.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
    author: "Carlos Mendes",
    authorRole: "Tech Lead",
    date: "02 de Maio, 2023",
    category: "Tecnologia",
    readTime: "7 min de leitura",
    image: "https://placehold.co/600x400/EEE/31343C",
    tags: ["JavaScript", "React", "Node.js", "Tecnologia"],
  },
  {
    id: 3,
    title: "Como montar um portfólio de projetos para estágio",
    excerpt:
      "Aprenda a criar um portfólio de projetos que chame a atenção dos recrutadores, mesmo sem experiência profissional.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
    author: "Mariana Costa",
    authorRole: "UX Designer",
    date: "25 de Abril, 2023",
    category: "Portfólio",
    readTime: "6 min de leitura",
    image: "https://placehold.co/600x400/EEE/31343C",
    tags: ["Portfólio", "Projetos", "GitHub"],
  },
  {
    id: 4,
    title: "Dicas para equilibrar estágio e faculdade",
    excerpt:
      "Estratégias para gerenciar seu tempo e manter um bom desempenho tanto no estágio quanto nos estudos.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
    author: "Pedro Alves",
    authorRole: "Estudante e Estagiário",
    date: "18 de Abril, 2023",
    category: "Produtividade",
    readTime: "4 min de leitura",
    image: "https://placehold.co/600x400/EEE/31343C",
    tags: ["Produtividade", "Estudo", "Equilíbrio"],
  },
  {
    id: 5,
    title: "O que as empresas buscam em estagiários de desenvolvimento?",
    excerpt:
      "Descubra quais são as habilidades técnicas e comportamentais mais valorizadas pelos recrutadores.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
    author: "Juliana Martins",
    authorRole: "Gerente de RH",
    date: "10 de Abril, 2023",
    category: "Carreira",
    readTime: "8 min de leitura",
    image: "https://placehold.co/600x400/EEE/31343C",
    tags: ["Soft Skills", "Recrutamento", "Carreira"],
  },
  {
    id: 6,
    title: "Como criar um currículo eficiente para vagas de estágio",
    excerpt:
      "Aprenda a destacar suas habilidades e experiências acadêmicas para criar um currículo que chame a atenção.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
    author: "Roberto Almeida",
    authorRole: "Consultor de Carreira",
    date: "05 de Abril, 2023",
    category: "Currículo",
    readTime: "5 min de leitura",
    image: "https://placehold.co/600x400/EEE/31343C",
    tags: ["Currículo", "LinkedIn", "Carreira"],
  },
];

// Componente para exibir um card de post do blog
function BlogPostCard({ post }) {
  return (
    <div className="bg-white rounded-xl shadow-soft overflow-hidden hover:shadow-medium transition-shadow">
      <div className="relative flex h-48 w-full overflow-hidden">
        <img
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover w-full"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center mb-2">
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
            {post.category}
          </span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-xs text-gray-dark">{post.readTime}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-dark mb-2 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-dark mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-2">
              <span className="text-primary font-bold text-xs">
                {post.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2)
                  .toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-dark">
                {post.author}
              </p>
              <p className="text-xs text-gray-500">{post.date}</p>
            </div>
          </div>
          <Link
            to={`/blog/${post.id}`}
            className="text-primary hover:text-primary-dark text-sm font-medium flex items-center"
          >
            Ler mais
            <svg
              className="ml-1 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Componente para exibir um post em destaque
function FeaturedPost({ post }) {
  return (
    <div className="bg-white rounded-xl shadow-soft overflow-hidden mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-64 md:h-full w-full">
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover w-full"
          />
        </div>
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <div className="flex items-center mb-3">
            <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-sm text-gray-dark">{post.readTime}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-dark mb-4">
            {post.title}
          </h2>
          <p className="text-gray-dark mb-6">{post.excerpt}</p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                <span className="text-primary font-bold">
                  {post.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-dark">{post.author}</p>
                <p className="text-sm text-gray-500">{post.date}</p>
              </div>
            </div>
            <Link
              to={`/blog/${post.id}`}
              className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
            >
              Ler artigo
              <svg
                className="ml-2 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Blog() {
  const [categoryFilter, setCategoryFilter] = useState("");
  const featuredPost = blogPosts[0];

  // Filtrar posts por categoria
  const filteredPosts = categoryFilter
    ? blogPosts.filter((post) => post.category === categoryFilter)
    : blogPosts;

  // Obter categorias únicas para o filtro
  const categories = [...new Set(blogPosts.map((post) => post.category))];

  return (
    <div className="flex-grow bg-gray-light">
      <Header />
      {/* Hero Section */}
      <section className="bg-primary text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Blog DevStage
            </h1>
            <p className="text-lg mb-6">
              Dicas, tutoriais e insights para impulsionar sua carreira em
              desenvolvimento de software
            </p>
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Buscar artigos..."
                className="w-full py-3 px-4 pr-10 rounded-lg text-gray-dark focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-500"
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
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedPost post={featuredPost} />
        </div>
      </section>

      {/* Blog Posts */}
      <section className="pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setCategoryFilter("")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                categoryFilter === ""
                  ? "bg-primary text-white"
                  : "bg-white text-gray-dark hover:bg-gray-100"
              }`}
            >
              Todos
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  categoryFilter === category
                    ? "bg-primary text-white"
                    : "bg-white text-gray-dark hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.slice(1).map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="inline-flex rounded-md shadow-sm">
              <a
                to="#"
                className="px-3 py-2 rounded-l-md border border-gray-medium bg-white text-sm font-medium text-gray-dark hover:bg-gray-light"
              >
                Anterior
              </a>
              <a
                to="#"
                className="px-3 py-2 border-t border-b border-gray-medium bg-primary text-sm font-medium text-white"
              >
                1
              </a>
              <a
                to="#"
                className="px-3 py-2 border-t border-b border-gray-medium bg-white text-sm font-medium text-gray-dark hover:bg-gray-light"
              >
                2
              </a>
              <a
                to="#"
                className="px-3 py-2 border-t border-b border-gray-medium bg-white text-sm font-medium text-gray-dark hover:bg-gray-light"
              >
                3
              </a>
              <a
                to="#"
                className="px-3 py-2 rounded-r-md border border-gray-medium bg-white text-sm font-medium text-gray-dark hover:bg-gray-light"
              >
                Próxima
              </a>
            </nav>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Inscreva-se em nossa newsletter
            </h2>
            <p className="text-white/80 mb-8">
              Receba as últimas novidades, dicas e oportunidades de estágio
              diretamente no seu e-mail.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 rounded-lg text-gray-dark focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <button className="bg-secondary hover:bg-secondary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors">
                Inscrever-se
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
