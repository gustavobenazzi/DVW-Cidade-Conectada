import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import "./LoginPage.css"; 

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 500)); 

      const res = await login(form.username, form.password);
      if (res.token) {
        localStorage.setItem("token", res.token);
        navigate("/dashboard");
      } else {
        setError("Credenciais inválidas. Por favor, tente novamente.");
      }
    } catch (err) {
      setError("Erro ao conectar ao servidor. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <form onSubmit={handleSubmit}>
          <h2>Acessar Plataforma</h2>

          <div className="input-group">
            <input
              className="form-input"
              name="username"
              placeholder="Usuário"
              value={form.username}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </div>

          <div className="input-group">
            <input
              className="form-input"
              name="password"
              type="password"
              placeholder="Senha"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>
          
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>

          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;