const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

require("dotenv").config();

const BANCO = process.env.BANCO;

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const db = new sqlite3.Database(
    BANCO,
    (err) => {
        if (err) {
            console.log("Erro ao conectar:", err.message);
        } else {
            console.log("Conectado ao SQlite");
        }
    }
);

app.get("/estados", (req, res) => {
    const sql = "SELECT * FROM estados";

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({
                erro: err.message
            });
        }

        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});