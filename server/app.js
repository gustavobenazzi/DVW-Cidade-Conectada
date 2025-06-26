require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authenticateToken = require("./middleware/authenticateToken");

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API está funcionando!");
});


app.post("/api/leads", async (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ error: "Nome e e-mail são obrigatórios." });
  }

  try {
    const newLead = await prisma.lead.create({
      data: {
        nome,
        email,
      },
    });
    res.status(201).json(newLead);
  } catch (error) {
    console.error(error);
    if (error.code === "P2002" && error.meta && error.meta.target.includes("email")) {
      return res.status(409).json({ error: "Este e-mail já está cadastrado." });
    }
    res.status(500).json({ error: "Erro ao criar lead." });
  }
});

// Rota de Login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Usuário e senha são obrigatórios." });
  }

  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login bem-sucedido!", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no servidor ao tentar fazer login." });
  }
});

// Rotas administrativas:
// Rota para listar e buscar leads
app.get("/api/leads", authenticateToken, async (req, res) => {
  const { search } = req.query;

  try {
    let leads;
    if (search) {
      leads = await prisma.lead.findMany({
        where: {
          OR: [
            {
              nome: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              email: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        },
      });
    } else {
      leads = await prisma.lead.findMany();
    }
    res.status(200).json(leads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar leads." });
  }
});

// Rota para atualizar um lead por ID (nome e email são necessários)
app.put("/api/leads/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ error: "Nome e e-mail são obrigatórios para atualização." });
  }

  try {
    const updatedLead = await prisma.lead.update({
      where: { id: parseInt(id) },
      data: {
        nome,
        email,
      },
    });
    res.status(200).json(updatedLead);
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Lead não encontrado." });
    }
    if (error.code === "P2002" && error.meta && error.meta.target.includes("email")) {
      return res.status(409).json({ error: "Este e-mail já está cadastrado para outro lead." });
    }
    res.status(500).json({ error: "Erro ao atualizar lead." });
  }
});

// Rota para deletar um lead por ID
app.delete("/api/leads/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.lead.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Lead não encontrado para exclusão." });
    }
    res.status(500).json({ error: "Erro ao deletar lead." });
  }
});

const { stringify } = require("csv-stringify");

// Rota para exportar leads para CSV
app.get("/api/leads/export/csv", authenticateToken, async (req, res) => {
  try {
    const leads = await prisma.lead.findMany();

    const columns = [
      { key: "id", header: "ID" },
      { key: "nome", header: "Nome" },
      { key: "email", header: "Email" },
      { key: "createdAt", header: "Data de Cadastro" },
    ];

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=\"leads.csv\"");

    stringify(leads, { header: true, columns: columns }, (err, output) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao gerar CSV." });
      }
      res.send(output);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao exportar leads para CSV." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}` );
});
