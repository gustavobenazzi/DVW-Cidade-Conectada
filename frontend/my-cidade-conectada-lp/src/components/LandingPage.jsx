// src/components/LandingPage.jsx (ou onde você preferir criar o componente)

import React, { useState } from 'react';

const LandingPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        city: '',
    });
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(false); // Reset before new submission

        try {
            // **IMPORTANTE:** Substitua esta URL pela URL da sua API de leads
            const response = await fetch('SUA_URL_DA_API_DE_LEADS', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormSubmitted(true);
                setFormData({ name: '', email: '', city: '' }); // Limpar formulário
                // Opcional: Adicionar alguma lógica de sucesso, como um alert ou modal
            } else {
                console.error('Erro ao enviar dados do lead:', response.statusText);
                // Opcional: Mostrar mensagem de erro para o usuário
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            // Opcional: Mostrar mensagem de erro de rede
        }
    };

    return (
        <div className="min-h-screen bg-black bg-gradient-to-br from-blue-100 to-green-100 p-4 sm:p-8 flex items-center justify-center font-sans">
            {/* Contêiner principal com o fundo ondulado/abstrato */}
            <div className="relative bg-white bg-opacity-90 rounded-3xl shadow-xl p-6 sm:p-10 w-full max-w-4xl overflow-hidden">

                {/* Efeito de fundo abstrato (exemplo simples, pode ser mais complexo com SVGs ou CSS de verdade) */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-blue-50 to-purple-50 opacity-50 rounded-3xl -z-10"></div>
                <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-bl from-green-50 to-cyan-50 opacity-50 rounded-3xl -z-10 transform translate-x-1/4 translate-y-1/4"></div>

                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <div className="flex items-center space-x-2">
                        {/* Logo "Cidade Conectada" */}
                        <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM13.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM10 12a4 4 0 100-8 4 4 0 000 8zm-2 2h4a1 1 0 000-2H8a1 1 0 000 2z" clipRule="evenodd"></path>
                        </svg>
                        <span className="text-xl font-bold text-gray-800">Cidade Conectada</span>
                    </div>
                    {/* Ícones de navegação (Lupa e Menu Hamburguer) */}
                    <div className="flex items-center space-x-4 text-gray-600">
                        <button className="p-2 hover:text-blue-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </button>
                        <button className="p-2 hover:text-blue-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </button>
                    </div>
                </header>

                {/* Conteúdo principal: Título, Botão e Formulário */}
                <main className="flex flex-col md:flex-row gap-8 items-center justify-between">
                    {/* Seção Esquerda: Título e CTA */}
                    <div className="flex-1 text-center md:text-left mb-8 md:mb-0">
                        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
                            Cidade <br className="hidden sm:inline"/>Conectada
                        </h1>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            DOWNLOAD NOW
                        </button>
                    </div>

                    {/* Seção Direita: Ícones e Formulário de Lead Capture */}
                    <div className="flex-1 w-full max-w-sm">
                        {/* Ícones de Recurso (adapte os ícones e textos conforme sua necessidade) */}
                        <div className="grid grid-cols-2 gap-4 text-center mb-8">
                            <div className="flex flex-col items-center p-3 rounded-lg">
                                <svg className="w-12 h-12 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                <span className="text-sm text-gray-600 font-medium">Location based services</span>
                            </div>
                            <div className="flex flex-col items-center p-3 rounded-lg">
                                <svg className="w-12 h-12 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                                <span className="text-sm text-gray-600 font-medium">Community chat</span>
                            </div>
                            <div className="flex flex-col items-center p-3 rounded-lg">
                                <svg className="w-12 h-12 text-purple-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                                <span className="text-sm text-gray-600 font-medium">Easy use</span>
                            </div>
                            <div className="flex flex-col items-center p-3 rounded-lg">
                                <svg className="w-12 h-12 text-red-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                                <span className="text-sm text-gray-600 font-medium">Easy use</span> {/* Duplicado, mas mantém o layout da imagem */}
                            </div>
                        </div>

                        {/* Formulário de Captura de Lead */}
                        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-5 text-center">Sign up Lead Capture</h3>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div className="mb-6 flex items-center"> {/* Campo Cidade com botão no final */}
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-r-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </button>
                            </div>
                            {formSubmitted && (
                                <p className="text-green-600 font-semibold text-center mt-4">Thank you for your interest!</p>
                            )}
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default LandingPage;