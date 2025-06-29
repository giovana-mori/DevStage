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
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../../context/UserContext";
import api from "../../utils/api";
import Select from "react-select";
import useFlashMessage from "../../hooks/useFlashMessage";

export default function Perfil() {
  const { authenticated } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [abaSelecionada, setAbaSelecionada] = useState("perfil");
  const [candidaturas, setCandidaturas] = useState([]);
  const { setFlashMessage } = useFlashMessage();
  const [formUser, setFormUser] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const opcoesHabilidades = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "TypeScript", label: "TypeScript" },
    { value: "Python", label: "Python" },
    { value: "Java", label: "Java" },
    { value: "C#", label: "C#" },
    { value: "C++", label: "C++" },
    { value: "Go", label: "Go" },
    { value: "Ruby", label: "Ruby" },
    { value: "PHP", label: "PHP" },
    { value: "Swift", label: "Swift" },
    { value: "Kotlin", label: "Kotlin" },
    { value: "Rust", label: "Rust" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "Sass", label: "Sass" },
    { value: "Tailwind CSS", label: "Tailwind CSS" },
    { value: "Bootstrap", label: "Bootstrap" },
    { value: "React", label: "React" },
    { value: "Next.js", label: "Next.js" },
    { value: "Vue.js", label: "Vue.js" },
    { value: "Nuxt.js", label: "Nuxt.js" },
    { value: "Angular", label: "Angular" },
    { value: "jQuery", label: "jQuery" },
    { value: "Node.js", label: "Node.js" },
    { value: "Express", label: "Express" },
    { value: "NestJS", label: "NestJS" },
    { value: "Laravel", label: "Laravel" },
    { value: "Symfony", label: "Symfony" },
    { value: "Django", label: "Django" },
    { value: "Flask", label: "Flask" },
    { value: "Spring Boot", label: "Spring Boot" },
    { value: ".NET Core", label: ".NET Core" },
    { value: "RESTful API", label: "RESTful API" },
    { value: "GraphQL", label: "GraphQL" },
    { value: "MySQL", label: "MySQL" },
    { value: "PostgreSQL", label: "PostgreSQL" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "SQLite", label: "SQLite" },
    { value: "Firebase", label: "Firebase" },
    { value: "Redis", label: "Redis" },
    { value: "MariaDB", label: "MariaDB" },
    { value: "Docker", label: "Docker" },
    { value: "Kubernetes", label: "Kubernetes" },
    { value: "AWS", label: "AWS" },
    { value: "Azure", label: "Azure" },
    { value: "Google Cloud", label: "Google Cloud" },
    { value: "CI/CD", label: "CI/CD" },
    { value: "GitHub Actions", label: "GitHub Actions" },
    { value: "Terraform", label: "Terraform" },
    { value: "Jest", label: "Jest" },
    { value: "Mocha", label: "Mocha" },
    { value: "Cypress", label: "Cypress" },
    { value: "Selenium", label: "Selenium" },
    { value: "Playwright", label: "Playwright" },
    { value: "Testing Library", label: "Testing Library" },
    { value: "Git", label: "Git" },
    { value: "GitHub", label: "GitHub" },
    { value: "Figma", label: "Figma" },
    { value: "UX/UI Design", label: "UX/UI Design" },
    { value: "Scrum", label: "Scrum" },
    { value: "Kanban", label: "Kanban" },
    { value: "Trello", label: "Trello" },
    { value: "Notion", label: "Notion" },
    { value: "Linux", label: "Linux" },
    { value: "Shell Script", label: "Shell Script" },
    { value: "React Native", label: "React Native" },
    { value: "Flutter", label: "Flutter" },
    { value: "SwiftUI", label: "SwiftUI" },
    { value: "Kotlin Android", label: "Kotlin Android" },
  ];

  useEffect(() => {
    const carregarDados = async () => {
      if (authenticated) {
        try {
          api.get("/users/Perfil").then((response) => {
            debugger;
            const { user } = response.data;
            setFormUser(user);
            setLoading(false);
          });
        } catch (error) {
          console.error("Erro ao obter dados do usuário:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    carregarDados();
  }, [authenticated]);

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
    // Simulação de envio para API
    try {
      setIsLoading(true);
      api.post("/users/Update/", formUser);
      let msgText = "Cadastro atualizado com sucesso";
      let msgType = "success";
      setFlashMessage(msgText, msgType);
    } catch (error) {
      console.error("Erro ao salvar Usuario:", error);
      let msgText = "Erro ao atualizar o cadastro";
      let msgType = "error";
      setFlashMessage(msgText, msgType);
    } finally {
      setIsLoading(false);
    }
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

  const handleChange = (e) => {
    setFormUser({ ...formUser, [e.target.name]: e.target.value });
  };

  const handleAba = (id) => {
    setAbaSelecionada(id);
    if (id === "candidaturas") {
      api.get("vagas/Candidaturas").then((response) => {
        setCandidaturas(response.data.candidaturas);
      });
    }
  };

  const generatePercentage = () => {
    let count = 0;
    for (let key in formUser) {
      if (formUser[key] && formUser[key] !== "") {
        count++;
      }
    }
    return Math.round((count / Object.keys(formUser).length) * 100);
  };

  // Função para enviar o currículo
  const handleUploadCurriculo = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Verificar se é PDF
    if (file.type !== "application/pdf") {
      setFlashMessage("Por favor, selecione um arquivo PDF.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("curriculo", file);

    try {
      setIsUploading(true);
      const response = await api.post("/users/upload-curriculo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Atualiza o estado do usuário com o novo currículo
      setFormUser((prev) => ({
        ...prev,
        curriculo: response.data.curriculo,
      }));

      setFlashMessage("Currículo enviado com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao enviar currículo:", error);
      setFlashMessage("Erro ao enviar currículo. Tente novamente.", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const formatarTamanhoArquivo = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat(bytes / Math.pow(k, i)).toFixed(1) + " " + sizes[i];
  };

  // Função para remover o currículo
  const handleRemoverCurriculo = async () => {
    try {
      setIsUploading(true);
      await api.delete("/users/remover-curriculo");

      // Atualiza o estado removendo o currículo
      setFormUser((prev) => ({
        ...prev,
        curriculo: null,
      }));

      setFlashMessage("Currículo removido com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao remover currículo:", error);
      setFlashMessage("Erro ao remover currículo.", "error");
    } finally {
      setIsUploading(false);
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
                src={formUser?.foto || "/placeholder.svg"}
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
                      {formUser?.localizacao || "N/D"}
                    </div>
                    {formUser?.tipo === "estudante" && (
                      <div className="flex items-center gap-1">
                        <GraduationCap className="w-4 h-4" />
                        {formUser?.curso}
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative size-40">
                  <svg
                    className="size-full -rotate-90"
                    viewBox="0 0 36 36"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      className="stroke-current text-gray-200 "
                      strokeWidth="2"
                    ></circle>
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      className="stroke-current text-primary"
                      strokeWidth="2"
                      strokeDasharray="100"
                      strokeDashoffset="65"
                      strokeLinecap="round"
                    ></circle>
                  </svg>

                  <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <span className="text-center text-2xl font-bold text-blue-600">
                      {"35%"}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">{formUser?.sobre}</p>
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
                  onClick={() => handleAba(id)}
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
                        name="nome"
                        onChange={handleChange}
                        type="text"
                        value={formUser?.nome}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        name="email"
                        onChange={handleChange}
                        type="email"
                        value={formUser?.email}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefone
                      </label>
                      <input
                        name="telefone"
                        onChange={handleChange}
                        type="tel"
                        value={formUser?.telefone}
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
                    name="sobre"
                    onChange={handleChange}
                    value={formUser?.sobre}
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
                    <Select
                      isMulti
                      options={opcoesHabilidades}
                      value={opcoesHabilidades.filter((opt) =>
                        formUser?.habilidades?.includes(opt.value)
                      )}
                      onChange={(selectedOptions) => {
                        const habilidadesSelecionadas = selectedOptions.map(
                          (opt) => opt.value
                        );
                        setFormUser((prev) => ({
                          ...prev,
                          habilidades: habilidadesSelecionadas,
                        }));
                      }}
                      className="w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      classNamePrefix="select"
                    />
                  </div>
                </div>

                {/* Experiências */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Experiência Profissional
                  </h2>
                  <div className="space-y-4">
                    {formUser?.experiencias.map((exp) => (
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
                    disabled={isLoading}
                    className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
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
                      key={candidatura._id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-1">
                            {candidatura.titulo}
                          </h3>
                          <p className="text-purple-600 font-medium mb-2">
                            {candidatura.empresa.nome}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {candidatura.empresa.localizacao}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Aplicado em{" "}
                              {new Date(
                                candidatura.minhaCandidatura.dataCandidatura
                              ).toLocaleDateString("pt-BR")}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              candidatura.minhaCandidatura.status
                            )}`}
                          >
                            {getStatusIcon(candidatura.minhaCandidatura.status)}
                            {getStatusText(candidatura.minhaCandidatura.status)}
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

                <form method="post" encType="multipart/form-data">
                  <input
                    type="file"
                    id="curriculo-upload"
                    name="curriculo-upload"
                    accept="application/pdf"
                    onChange={handleUploadCurriculo}
                    className=""
                  />
                </form>

                {formUser?.curriculo ? (
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">
                          {formUser?.curriculo.nome}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {formatarTamanhoArquivo(formUser?.curriculo.tamanho)}{" "}
                          • Enviado em{" "}
                          {new Date(
                            formUser?.curriculo.dataUpload
                          ).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={formUser?.curriculo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <Eye className="w-5 h-5" />
                        </a>
                        <a
                          href={formUser?.curriculo.url}
                          download
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <Download className="w-5 h-5" />
                        </a>
                        <button
                          className="p-2 text-red-400 hover:text-red-600 transition-colors"
                          onClick={handleRemoverCurriculo}
                          disabled={isUploading}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <label
                      htmlFor="curriculo-upload"
                      className={`w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center ${
                        isUploading
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:border-purple-400 hover:bg-purple-50 cursor-pointer"
                      } transition-colors block`}
                      disabled={isUploading}
                    >
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 font-medium">
                        {isUploading ? "Enviando..." : "Atualizar currículo"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Arraste um arquivo ou clique para selecionar (PDF)
                      </p>
                    </label>
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
