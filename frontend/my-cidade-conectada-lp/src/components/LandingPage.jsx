import React, { useState, useEffect } from "react";
import "./LandingPage.css";

const LandingPage = () => {
  const [formData, setFormData] = useState({ nome: "", email: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:3001/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setFormData({ nome: "", email: "" });
      } else {
        console.error("Erro ao enviar dados do lead:", response.statusText);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  useEffect(() => {
    if (formSubmitted) {
      const timer = setTimeout(() => {
        setFormSubmitted(false);
      }, 4000);
      return () => clearTimeout(timer); 
    }
  }, [formSubmitted]);

  return (
    <div className="landing-wrapper">
      <div className="landing-container">
        <header className="header">
          <div className="logo-container">
            <img src="/logo.png" alt="Logo Cidade Conectada" className="logo-img" />
            <span className="logo-text">Cidade Conectada</span>
          </div>
          <div className="nav-icons">
             <button className="icon-btn">
               <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
             </button>
             <button className="icon-btn">
               <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
          </div>
        </header>

        <main className="main-content">
          <div className="left-section">
            <h1 className="main-title">
              Participe da
              <br />
              Cidade Conectada
            </h1>
            <p className="description" style={{color: 'var(--text-light)', fontSize: '1.125rem', lineHeight: '1.6', maxWidth: '500px', margin: '0 auto 2rem', textAlign: 'inherit'}}>
              Uma plataforma para cidadãos reportarem problemas urbanos e colaborarem com a gestão da cidade de forma simples e direta.
            </p>
          </div>

          <div className="right-section">
            <div className="features">
                  <div className="feature">
                    <svg className="feature-icon blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    <span className="feature-text">Localização de Problemas</span>
                  </div>
                  <div className="feature">
                    <svg className="feature-icon green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                    <span className="feature-text">Comentários da Comunidade</span>
                  </div>
                  <div className="feature">
                    <svg className="feature-icon purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                    <span className="feature-text">Fácil de usar</span>
                  </div>
                  <div className="feature">
                    <svg className="feature-icon red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    <span className="feature-text">Uso em Multiplataforma</span>
                  </div>
            </div>

            <form onSubmit={handleSubmit} className="lead-form">
              <h3 className="form-title">Inscreva-se para ter acesso</h3>
              <input
                type="text"
                name="nome"
                placeholder="Seu nome completo"
                value={formData.nome}
                onChange={handleChange}
                required
                className="form-input"
              />
              <input
                type="email"
                name="email"
                placeholder="Seu melhor email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
              <button type="submit" className="submit-btn">
                <span>Quero Acesso</span>
                <svg className="submit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
              {formSubmitted && (
                <p className="success-msg">Obrigado! Inscrição recebida.</p>
              )}
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;