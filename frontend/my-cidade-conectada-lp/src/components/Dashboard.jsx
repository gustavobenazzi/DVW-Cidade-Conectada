import React, { useEffect, useState } from "react";
import { getLeads, deleteLead, updateLead } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ nome: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const fetchLeads = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const data = await getLeads(token, search);
      setLeads(data);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [search]); 

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await deleteLead(id, token);
    fetchLeads();
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    await updateLead(editing.id, form, token);
    setEditing(null);
    fetchLeads();
  };

  const handleDownloadCSV = () => {
    if (leads.length === 0) {
      alert("Não há leads para exportar.");
      return;
    }

    const headers = ['"Nome"', '"Email"'];
    const csvHeader = headers.join(',') + '\n';

    const csvRows = leads.map(lead => {
      const nome = `"${lead.nome.replace(/"/g, '""')}"`; 
      const email = `"${lead.email.replace(/"/g, '""')}"`;
      return [nome, email].join(',');
    }).join('\n');

    const csvString = csvHeader + csvRows;
    const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' });
    
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);

    const date = new Date().toISOString().slice(0, 10);
    link.setAttribute("download", `leads_${date}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard de Leads</h2>
        <button className="btn btn-download" onClick={handleDownloadCSV}>
          Baixar CSV
        </button>
      </div>
      
      <input
        className="search-input"
        placeholder="Buscar por nome ou email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="leads-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.nome}</td>
              <td>{lead.email}</td>
              <td className="actions-cell">
                <button
                  className="btn btn-edit"
                  onClick={() => {
                    setEditing(lead);
                    setForm({ nome: lead.nome, email: lead.email });
                  }}
                >
                  Editar
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDelete(lead.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <div className="edit-form">
          <h3>Editando: {editing.nome}</h3>
          <input
            placeholder="Nome"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <div>
            <button className="btn btn-save" onClick={handleUpdate}>
              Salvar
            </button>
            <button className="btn btn-cancel" onClick={() => setEditing(null)}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;