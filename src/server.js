// server.js
const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 3000;

const pool = new Pool({
  user: "Familia",
  host: "localhost",
  database: "habits_database",
  password: "1234",
  port: 5432,
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Funcionando!");
});

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao obter usuários:", error);
    res.status(500).send("Erro ao obter usuários");
  }
});

app.post("/users", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword || password.length < 6) {
    return res
      .status(400)
      .json({
        error:
          "Senha e confirmação de senha não correspondem ou têm menos de 6 caracteres.",
      });
  }

  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, password]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).send("Erro ao criar usuário");
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
