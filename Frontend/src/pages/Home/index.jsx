import api from "../../utils/api";
import FeatureCard from "../../Component/lib/FeatureCard.jsx";
import SearchBar from "../../Component/lib/SearchBar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Home() {
    const [pets, setPets] = useState([]);
    // useEffect(()=>{
    //     api.get("/pets/getAll").then ((response)=>{
    //         setPets(response.data.pets);
    //         //console.log(response.data.pet);

    //     })
    // },[])
    return (
        <main className="flex-grow">
            {/* Hero Section */}
            <section className="relative bg-purple-light overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-10 left-10 w-16 h-16 text-primary/20">
                        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 3L4 14H15L11 21L20 10H9L13 3Z" />
                        </svg>
                    </div>
                    <div className="absolute bottom-10 left-1/4 w-12 h-12 text-primary/20">
                        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                        </svg>
                    </div>
                    <div className="absolute top-1/3 right-10 w-20 h-20 text-secondary/20">
                        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z" />
                        </svg>
                    </div>
                    <div className="absolute bottom-20 right-1/4 w-16 h-16 text-secondary/20">
                        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                        </svg>
                    </div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-10 md:mb-0">
                            <h1 className="text-5xl md:text-6xl font-bold mb-4">
                                <span className="text-primary">Encontre seu</span>
                                <br />
                                <span className="text-secondary">Estágio</span> <span className="text-primary">ideal!</span>
                            </h1>
                            <p className="text-lg mb-8 text-purple-dark">
                                Conecte-se com as melhores oportunidades de estágio em desenvolvimento de software
                            </p>
                            <Link
                                to="/cadastro"
                                className="inline-flex items-center bg-purple-medium hover:bg-primary text-white font-bold py-3 px-8 rounded-full transition-colors"
                            >
                                Cadastre-se Agora!
                                <svg
                                    className="ml-2 h-5 w-5"
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
                        <div className="md:w-1/2 flex justify-center md:justify-end relative">
                            <div className="relative w-full max-w-md">
                                <img
                                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KrONq46Y99fwnSTQqQVFOO3UWA07Hq.png"
                                    alt="Pessoa com notebook"
                                    className="rounded-2xl w-"
                                />
                            </div>

                            <div className="absolute top-10 right-0 md:right-10">
                                <FeatureCard
                                    icon={
                                        <svg
                                            className="w-6 h-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                                        </svg>
                                    }
                                    title="Encontre vagas relevantes rapidamente com filtros avançados."
                                    className="max-w-xs"
                                />
                            </div>

                            <div className="absolute top-1/3 right-0 md:right-20 mt-16">
                                <FeatureCard
                                    icon={
                                        <svg
                                            className="w-6 h-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
                                        </svg>
                                    }
                                    title="Aprenda com artigos exclusivos para seu sucesso."
                                    className="max-w-xs"
                                />
                            </div>

                            <div className="absolute bottom-10 right-0 md:right-10">
                                <FeatureCard
                                    icon={
                                        <svg
                                            className="w-6 h-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
                                        </svg>
                                    }
                                    title="Receba alertas personalizados de novas oportunidades."
                                    className="max-w-xs"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Search Section */}
            <SearchBar />

            {/* Recent Jobs Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-primary">Vagas Recentes</h2>
                        <p className="mt-4 text-lg text-gray-dark">
                            Confira as últimas oportunidades adicionadas à nossa plataforma
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Job Card 1 */}
                        <div className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-shadow p-6 border border-gray-200">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-gray-light rounded-lg flex items-center justify-center mr-4">
                                    <span className="text-primary font-bold">AB</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-dark">Estágio em Desenvolvimento Front-end</h3>
                                    <p className="text-sm text-gray-dark">Acme Brasil</p>
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
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    São Paulo, SP (Remoto)
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
                                    Publicada há 2 dias
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-md">React</span>
                                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-md">JavaScript</span>
                                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-md">Tailwind</span>
                            </div>
                            <Link
                                to="/vagas/1"
                                className="block text-center bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors"
                            >
                                Ver Detalhes
                            </Link>
                        </div>

                        {/* Job Card 2 */}
                        <div className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-shadow p-6 border border-gray-200">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-gray-light rounded-lg flex items-center justify-center mr-4">
                                    <span className="text-primary font-bold">TS</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-dark">Estágio em Desenvolvimento Back-end</h3>
                                    <p className="text-sm text-gray-dark">Tech Solutions</p>
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
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    Rio de Janeiro, RJ (Presencial)
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
                                    Publicada há 3 dias
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-md">Node.js</span>
                                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-md">Express</span>
                                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-md">MongoDB</span>
                            </div>
                            <Link
                                to="/vagas/2"
                                className="block text-center bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors"
                            >
                                Ver Detalhes
                            </Link>
                        </div>

                        {/* Job Card 3 */}
                        <div className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-shadow p-6 border border-gray-200">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-gray-light rounded-lg flex items-center justify-center mr-4">
                                    <span className="text-primary font-bold">DI</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-dark">Estágio em Desenvolvimento Mobile</h3>
                                    <p className="text-sm text-gray-dark">Digital Innovations</p>
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
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    Belo Horizonte, MG (Híbrido)
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
                                    Publicada há 5 dias
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-md">React Native</span>
                                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-md">Flutter</span>
                                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-md">Firebase</span>
                            </div>
                            <Link
                                to="/vagas/3"
                                className="block text-center bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors"
                            >
                                Ver Detalhes
                            </Link>
                        </div>
                    </div>

                    <div className="mt-10 text-center">
                        <Link to="/vagas" className="inline-flex items-center text-primary hover:text-primary-dark font-medium">
                            Ver todas as vagas
                            <svg
                                className="ml-2 h-5 w-5"
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
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-primary text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Pronto para encontrar seu estágio ideal?</h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto">
                        Junte-se a milhares de estudantes que já encontraram oportunidades incríveis através do DevStage.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/cadastro"
                            className="bg-white text-primary hover:bg-gray-100 font-bold py-3 px-6 rounded-full transition-colors"
                        >
                            Cadastre-se Gratuitamente
                        </Link>
                        <Link
                            to="/vagas"
                            className="bg-secondary hover:bg-secondary-dark text-white font-bold py-3 px-6 rounded-full transition-colors"
                        >
                            Explorar Vagas
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
export default Home;