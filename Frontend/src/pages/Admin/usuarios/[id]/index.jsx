"use client"

import { useState, useEffect } from "react"
import AdminHeader from "../../../../Component/AdminHeader"
import { Link } from "react-router-dom"

export default function AdminUsuarioForm({ id }) {
  const isEditing = id !== "novo"

  // Estado inicial do formulário
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    tipo: "Estudante",
    curso: "",
    instituicao: "",
    empresa: "",
    cargo: "",
    telefone: "",
    linkedin: "",
    github: "",
    portfolio: "",
    sobre: "",
    status: "Ativo",
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  // Simular carregamento de dados para edição
  useEffect(() => {
    if (isEditing) {
      setIsLoading(true)
      // Simulação de chamada à API para buscar dados do usuário
      setTimeout(() => {
        setFormData({
          nome: "João Silva",
          email: "joao.silva@email.com",
          tipo: "Estudante",
          curso: "Ciência da Computação",
          instituicao: "USP",
          empresa: "",
          cargo: "",
          telefone: "(11) 98765-4321",
          linkedin: "linkedin.com/in/joaosilva",
          github: "github.com/joaosilva",
          portfolio: "joaosilva.dev",
          sobre: "Estudante de Ciência da Computação com interesse em desenvolvimento web e inteligência artificial.",
          status: "Ativo",
        })
        setIsLoading(false)
      }, 800)
    }
  }, [isEditing])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpar erro do campo quando o usuário começa a digitar
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório"
    if (!formData.email.trim()) newErrors.email = "E-mail é obrigatório"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "E-mail inválido"

    if (formData.tipo === "Estudante") {
      if (!formData.curso.trim()) newErrors.curso = "Curso é obrigatório"
      if (!formData.instituicao.trim()) newErrors.instituicao = "Instituição é obrigatória"
    } else if (formData.tipo === "Recrutador") {
      if (!formData.empresa.trim()) newErrors.empresa = "Empresa é obrigatória"
      if (!formData.cargo.trim()) newErrors.cargo = "Cargo é obrigatório"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setSuccessMessage("")

    // Simulação de envio para API
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccessMessage(isEditing ? "Usuário atualizado com sucesso!" : "Usuário cadastrado com sucesso!")

      if (!isEditing) {
        // Limpar formulário após cadastro bem-sucedido
        setFormData({
          nome: "",
          email: "",
          tipo: "Estudante",
          curso: "",
          instituicao: "",
          empresa: "",
          cargo: "",
          telefone: "",
          linkedin: "",
          github: "",
          portfolio: "",
          sobre: "",
          status: "Ativo",
        })
      }
    } catch (error) {
      console.error("Erro ao salvar usuário:", error)
      setErrors({ submit: "Ocorreu um erro ao salvar. Tente novamente." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-light">
      <AdminHeader activeTab="usuarios" />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center">
            <Link to="/admin/usuarios" className="text-primary hover:text-primary-dark mr-2">
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <h1 className="text-2xl font-bold text-gray-dark">
              {isEditing ? "Editar Usuário" : "Cadastrar Novo Usuário"}
            </h1>
          </div>
          <p className="text-gray-dark mt-1">
            {isEditing
              ? "Atualize as informações do usuário conforme necessário."
              : "Preencha o formulário abaixo para cadastrar um novo usuário."}
          </p>
        </div>

        {isLoading && !formData.nome ? (
          <div className="bg-white rounded-xl shadow-soft p-8 flex justify-center">
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-8 w-8 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span className="text-gray-dark">Carregando informações...</span>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-soft overflow-hidden">
            {successMessage && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm">{successMessage}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Informações básicas */}
                <div className="col-span-1 md:col-span-2">
                  <h2 className="text-lg font-semibold text-gray-dark mb-4">Informações Básicas</h2>
                </div>

                {/* Nome */}
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-dark mb-1">
                    Nome completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border ${
                      errors.nome ? "border-red-500" : "border-gray-medium"
                    } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                    placeholder="Ex: João Silva"
                  />
                  {errors.nome && <p className="mt-1 text-sm text-red-500">{errors.nome}</p>}
                </div>

                {/* E-mail */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-dark mb-1">
                    E-mail <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border ${
                      errors.email ? "border-red-500" : "border-gray-medium"
                    } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                    placeholder="Ex: usuario@email.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                {/* Tipo de usuário */}
                <div>
                  <label htmlFor="tipo" className="block text-sm font-medium text-gray-dark mb-1">
                    Tipo de usuário <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="tipo"
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="Estudante">Estudante</option>
                    <option value="Recrutador">Recrutador</option>
                  </select>
                </div>

                {/* Telefone */}
                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium text-gray-dark mb-1">
                    Telefone
                  </label>
                  <input
                    type="text"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Ex: (11) 98765-4321"
                  />
                </div>

                {/* Status */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-dark mb-1">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                    <option value="Pendente">Pendente</option>
                  </select>
                </div>

                {/* Campos específicos para Estudante */}
                {formData.tipo === "Estudante" && (
                  <>
                    <div className="col-span-1 md:col-span-2">
                      <h2 className="text-lg font-semibold text-gray-dark mb-4 mt-4">Informações Acadêmicas</h2>
                    </div>

                    {/* Curso */}
                    <div>
                      <label htmlFor="curso" className="block text-sm font-medium text-gray-dark mb-1">
                        Curso <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="curso"
                        name="curso"
                        value={formData.curso}
                        onChange={handleChange}
                        className={`block w-full px-3 py-2 border ${
                          errors.curso ? "border-red-500" : "border-gray-medium"
                        } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                        placeholder="Ex: Ciência da Computação"
                      />
                      {errors.curso && <p className="mt-1 text-sm text-red-500">{errors.curso}</p>}
                    </div>

                    {/* Instituição */}
                    <div>
                      <label htmlFor="instituicao" className="block text-sm font-medium text-gray-dark mb-1">
                        Instituição de Ensino <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="instituicao"
                        name="instituicao"
                        value={formData.instituicao}
                        onChange={handleChange}
                        className={`block w-full px-3 py-2 border ${
                          errors.instituicao ? "border-red-500" : "border-gray-medium"
                        } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                        placeholder="Ex: USP, UNICAMP, FATEC"
                      />
                      {errors.instituicao && <p className="mt-1 text-sm text-red-500">{errors.instituicao}</p>}
                    </div>

                    {/* GitHub */}
                    <div>
                      <label htmlFor="github" className="block text-sm font-medium text-gray-dark mb-1">
                        GitHub
                      </label>
                      <input
                        type="text"
                        id="github"
                        name="github"
                        value={formData.github}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Ex: github.com/usuario"
                      />
                    </div>

                    {/* Portfolio */}
                    <div>
                      <label htmlFor="portfolio" className="block text-sm font-medium text-gray-dark mb-1">
                        Portfolio/Site
                      </label>
                      <input
                        type="text"
                        id="portfolio"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Ex: meuportfolio.com"
                      />
                    </div>
                  </>
                )}

                {/* Campos específicos para Recrutador */}
                {formData.tipo === "Recrutador" && (
                  <>
                    <div className="col-span-1 md:col-span-2">
                      <h2 className="text-lg font-semibold text-gray-dark mb-4 mt-4">Informações Profissionais</h2>
                    </div>

                    {/* Empresa */}
                    <div>
                      <label htmlFor="empresa" className="block text-sm font-medium text-gray-dark mb-1">
                        Empresa <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="empresa"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        className={`block w-full px-3 py-2 border ${
                          errors.empresa ? "border-red-500" : "border-gray-medium"
                        } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                        placeholder="Ex: Acme Brasil"
                      />
                      {errors.empresa && <p className="mt-1 text-sm text-red-500">{errors.empresa}</p>}
                    </div>

                    {/* Cargo */}
                    <div>
                      <label htmlFor="cargo" className="block text-sm font-medium text-gray-dark mb-1">
                        Cargo <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="cargo"
                        name="cargo"
                        value={formData.cargo}
                        onChange={handleChange}
                        className={`block w-full px-3 py-2 border ${
                          errors.cargo ? "border-red-500" : "border-gray-medium"
                        } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                        placeholder="Ex: Recrutador, Gerente de RH"
                      />
                      {errors.cargo && <p className="mt-1 text-sm text-red-500">{errors.cargo}</p>}
                    </div>
                  </>
                )}

                {/* LinkedIn */}
                <div>
                  <label htmlFor="linkedin" className="block text-sm font-medium text-gray-dark mb-1">
                    LinkedIn
                  </label>
                  <input
                    type="text"
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Ex: linkedin.com/in/usuario"
                  />
                </div>

                {/* Sobre */}
                <div className="col-span-1 md:col-span-2">
                  <label htmlFor="sobre" className="block text-sm font-medium text-gray-dark mb-1">
                    Sobre
                  </label>
                  <textarea
                    id="sobre"
                    name="sobre"
                    rows="4"
                    value={formData.sobre}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Descreva brevemente o usuário..."
                  ></textarea>
                </div>
              </div>

              {errors.submit && (
                <div className="mt-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p>{errors.submit}</p>
                </div>
              )}

              <div className="mt-8 flex justify-end space-x-4">
                <Link
                  to="/admin/usuarios"
                  className="px-4 py-2 border border-gray-medium rounded-lg text-gray-dark hover:bg-gray-light transition-colors"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isLoading && (
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                  {isEditing ? "Atualizar Usuário" : "Cadastrar Usuário"}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}
