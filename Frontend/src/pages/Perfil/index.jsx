"use client";

import { useState, useEffect, useContext, use } from "react";
import {
  User,
  MapPin,
  Calendar,
  GraduationCap,
  FileText,
  Upload,
  Edit3,
  Save,
  X,
  Eye,
  Download,
  Trash2,
  Briefcase,
  ExternalLink,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import Header from "../../Component/Header";
import { Navigate } from "react-router-dom";
import { Context } from "../../context/UserContext";

export default function Perfil() {
  const { authenticated, user } = useContext(Context);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [abaSelecionada, setAbaSelecionada] = useState("perfil");
  const [candidaturas, setCandidaturas] = useState([]);
  const [formUser, setFormUser] = useState(null);

  useEffect(() => {
    const carregarDados = async () => {
      setLoading(true);
      /*
      {
          "_id": "685df3f05a906bc77acaa7f6",
          "nome": "Giovana",
          "email": "giovana@email.com",
          "cpf": "123123123",
          "telefone": "122323232323",
          "tipo": "admin",
          "status": "Ativo",
          "curso": "DSM",
          "instituicao_ensino": "Fatec",
          "createdAt": "2025-06-27T01:29:20.464Z",
          "updatedAt": "2025-06-27T01:29:20.464Z",
          "__v": 0
      }
      */
      setFormUser(user);

      const dadosUsuario = {
        id: 1,
        nome: "Ana Silva Santos",
        email: "ana.silva@email.com",
        telefone: "(11) 99999-9999",
        localizacao: "São Paulo, SP",
        dataNascimento: "1995-03-15",
        tipo: "estudante", // ou 'profissional'
        foto: "https://placehold.co/120x120/EEE/31343C",

        // Dados acadêmicos (para estudantes)
        instituicao: "Universidade de São Paulo",
        curso: "Ciência da Computação",
        semestre: "7º semestre",
        previsaoFormatura: "2024-12",

        // Dados profissionais (para profissionais)
        empresa: null,
        cargo: null,
        experiencia: null,

        // Perfil profissional
        resumo:
          "Estudante de Ciência da Computação apaixonada por desenvolvimento web e tecnologias emergentes. Experiência em projetos acadêmicos e estágios, com foco em React, Node.js e Python.",

        habilidades: [
          "JavaScript",
          "React",
          "Node.js",
          "Python",
          "SQL",
          "Git",
          "HTML/CSS",
          "TypeScript",
        ],

        idiomas: [
          { idioma: "Português", nivel: "Nativo" },
          { idioma: "Inglês", nivel: "Avançado" },
          { idioma: "Espanhol", nivel: "Intermediário" },
        ],

        experiencias: [
          {
            id: 1,
            cargo: "Estagiária de Desenvolvimento",
            empresa: "TechStart Ltda",
            periodo: "Jan 2023 - Atual",
            descricao:
              "Desenvolvimento de aplicações web usando React e Node.js. Participação em projetos de automação e melhoria de processos.",
          },
          {
            id: 2,
            cargo: "Monitora de Programação",
            empresa: "Universidade de São Paulo",
            periodo: "Mar 2022 - Dez 2022",
            descricao:
              "Auxílio a estudantes em disciplinas de programação básica e estruturas de dados.",
          },
        ],

        educacao: [
          {
            id: 1,
            curso: "Bacharelado em Ciência da Computação",
            instituicao: "Universidade de São Paulo",
            periodo: "2021 - 2024",
            status: "Em andamento",
          },
        ],

        certificacoes: [
          {
            id: 1,
            nome: "React Developer Certificate",
            emissor: "Meta",
            data: "2023-08",
            credencial: "ABC123XYZ",
          },
        ],

        curriculo: {
          nome: "curriculo_ana_silva.pdf",
          tamanho: "245 KB",
          dataUpload: "2024-01-15",
        },
      };

      const dadosCandidaturas = [
        {
          id: 1,
          vaga: "Desenvolvedor Frontend Júnior",
          empresa: "TechCorp Solutions",
          dataAplicacao: "2024-01-10",
          status: "em_analise",
          salario: "R$ 4.500 - R$ 6.500",
          localizacao: "São Paulo, SP",
        },
        {
          id: 2,
          vaga: "Estagiário de Desenvolvimento",
          empresa: "StartupXYZ",
          dataAplicacao: "2024-01-08",
          status: "aprovado",
          salario: "R$ 1.800",
          localizacao: "Remote",
        },
        {
          id: 3,
          vaga: "Desenvolvedor Full Stack",
          empresa: "BigTech Inc",
          dataAplicacao: "2024-01-05",
          status: "rejeitado",
          salario: "R$ 8.000 - R$ 12.000",
          localizacao: "Rio de Janeiro, RJ",
        },
      ];

      setUsuario(dadosUsuario);
      setCandidaturas(dadosCandidaturas);
      setLoading(false);
    };

    carregarDados();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  const handleSalvar = async () => {
    // Simulação de salvamento
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "aprovado":
        return "bg-green-100 text-green-800";
      case "rejeitado":
        return "bg-red-100 text-red-800";
      case "em_analise":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "aprovado":
        return <CheckCircle className="w-4 h-4" />;
      case "rejeitado":
        return <XCircle className="w-4 h-4" />;
      case "em_analise":
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "aprovado":
        return "Aprovado";
      case "rejeitado":
        return "Rejeitado";
      case "em_analise":
        return "Em análise";
      default:
        return "Pendente";
    }
  };

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header do Perfil */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-start gap-6">
            <div className="relative">
              <img
                src={usuario.foto || "/placeholder.svg"}
                alt={formUser?.nome}
                className="w-24 h-24 rounded-full object-cover"
              />
              <button className="absolute -bottom-2 -right-2 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors">
                <Upload className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-1">
                    {formUser?.nome}
                  </h1>
                  <p className="text-gray-600 mb-2">{formUser?.email}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {usuario.localizacao}
                    </div>
                    {formUser?.tipo === "estudante" && (
                      <div className="flex items-center gap-1">
                        <GraduationCap className="w-4 h-4" />
                        {formUser.curso}
                      </div>
                    )}
                  </div>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <Edit3 className="w-4 h-4" />
                  Editar Perfil
                </button>
              </div>

              <p className="text-gray-600 leading-relaxed">{usuario.resumo}</p>
            </div>
          </div>
        </div>

        {/* Navegação por Abas */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "perfil", label: "Perfil", icon: User },
                { id: "candidaturas", label: "Candidaturas", icon: Briefcase },
                { id: "curriculo", label: "Currículo", icon: FileText },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setAbaSelecionada(id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    abaSelecionada === id
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Aba Perfil */}
            {abaSelecionada === "perfil" && (
              <div className="space-y-8">
                {/* Informações Pessoais */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Informações Pessoais
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome completo
                      </label>

                      <input
                        type="text"
                        value={formUser.nome}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formUser.email}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        value={formUser.telefone}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Localização
                      </label>
                      <input
                        type="text"
                        value={formUser.localizacao}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Resumo Profissional */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Resumo Profissional
                  </h2>
                  <textarea
                    value={formUser.resumo}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={4}
                  />
                </div>

                {/* Habilidades */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Habilidades
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {usuario.habilidades.map((habilidade, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                      >
                        {habilidade}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experiências */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Experiência Profissional
                  </h2>
                  <div className="space-y-4">
                    {usuario.experiencias.map((exp) => (
                      <div
                        key={exp.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {exp.cargo}
                            </h3>
                            <p className="text-purple-600 font-medium">
                              {exp.empresa}
                            </p>
                            <p className="text-sm text-gray-500">
                              {exp.periodo}
                            </p>
                          </div>
                          <Briefcase className="w-5 h-5 text-gray-400" />
                        </div>
                        <p className="text-gray-600 text-sm">{exp.descricao}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleSalvar}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Salvar alterações
                  </button>
                </div>
              </div>
            )}

            {/* Aba Candidaturas */}
            {abaSelecionada === "candidaturas" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    Minhas Candidaturas
                  </h2>
                  <div className="text-sm text-gray-600">
                    {candidaturas.length} candidatura
                    {candidaturas.length !== 1 ? "s" : ""}
                  </div>
                </div>

                <div className="space-y-4">
                  {candidaturas.map((candidatura) => (
                    <div
                      key={candidatura.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-1">
                            {candidatura.vaga}
                          </h3>
                          <p className="text-purple-600 font-medium mb-2">
                            {candidatura.empresa}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {candidatura.localizacao}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Aplicado em{" "}
                              {new Date(
                                candidatura.dataAplicacao
                              ).toLocaleDateString("pt-BR")}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              candidatura.status
                            )}`}
                          >
                            {getStatusIcon(candidatura.status)}
                            {getStatusText(candidatura.status)}
                          </span>
                          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="text-sm font-medium text-gray-800">
                          {candidatura.salario}
                        </div>
                        <button className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors">
                          Ver detalhes
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Aba Currículo */}
            {abaSelecionada === "curriculo" && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Gerenciar Currículo
                </h2>

                {usuario.curriculo ? (
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">
                          {usuario.curriculo.nome}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {usuario.curriculo.tamanho} • Enviado em{" "}
                          {new Date(
                            usuario.curriculo.dataUpload
                          ).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Download className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-red-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 hover:bg-purple-50 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 font-medium">
                        Atualizar currículo
                      </p>
                      <p className="text-sm text-gray-500">
                        Arraste um arquivo ou clique para selecionar
                      </p>
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Nenhum currículo enviado
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Faça upload do seu currículo para se candidatar às vagas
                    </p>
                    <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                      Enviar currículo
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
