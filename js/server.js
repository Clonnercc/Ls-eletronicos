// ============================================
// LS ELETRÔNICOS
// server.js
// Backend Node.js + Express
// ============================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Servir os arquivos da loja
app.use(express.static(path.join(__dirname, "public")));

// Configurações
const PORT = process.env.PORT || 3000;

const SIGILO_API = process.env.SIGILO_API_URL;
const SIGILO_SECRET = process.env.SIGILO_SECRET_KEY;

// Página inicial
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Health Check
app.get("/api/status", (req, res) => {
    res.json({
        status: "online",
        loja: "LS Eletrônicos",
        versao: "1.0.0"
    });
});

// Criar cobrança PIX
app.post("/api/pix", async (req, res) => {

    try {

        const { cliente, produtos, valor } = req.body;

        const resposta = await axios.post(

            `${SIGILO_API}/pix`,

            {
                cliente,
                produtos,
                valor
            },

            {
                headers: {
                    Authorization: `Bearer ${SIGILO_SECRET}`,
                    "Content-Type": "application/json"
                }
            }

        );

        res.json(resposta.data);

    } catch (erro) {

        console.error(erro.response?.data || erro.message);

        res.status(500).json({
            erro: "Erro ao gerar cobrança PIX."
        });

    }

});

// Consultar status do pagamento
app.get("/api/pix/:id", async (req, res) => {

    try {

        const resposta = await axios.get(

            `${SIGILO_API}/pix/${req.params.id}`,

            {
                headers: {
                    Authorization: `Bearer ${SIGILO_SECRET}`
                }
            }

        );

        res.json(resposta.data);

    } catch (erro) {

        console.error(erro.response?.data || erro.message);

        res.status(500).json({
            erro: "Erro ao consultar pagamento."
        });

    }

}); // ============================================
// WEBHOOK E PEDIDOS
// ============================================

// Armazenamento temporário (substitua por um banco de dados em produção)
let pedidos = [];

// Criar pedido
app.post("/api/pedidos", (req, res) => {

    const pedido = {
        id: Date.now().toString(),
        cliente: req.body.cliente,
        produtos: req.body.produtos,
        total: req.body.total,
        status: "PENDENTE",
        criadoEm: new Date()
    };

    pedidos.push(pedido);

    res.status(201).json(pedido);

});

// Listar pedidos
app.get("/api/pedidos", (req, res) => {

    res.json(pedidos);

});

// Buscar pedido
app.get("/api/pedidos/:id", (req, res) => {

    const pedido = pedidos.find(
        p => p.id === req.params.id
    );

    if (!pedido) {
        return res.status(404).json({
            erro: "Pedido não encontrado."
        });
    }

    res.json(pedido);

});

// Webhook da Sigilo Pay
app.post("/api/webhook/sigilopay", (req, res) => {

    const { id, status } = req.body;

    const pedido = pedidos.find(p => p.id === id);

    if (pedido) {

        pedido.status = status;

        console.log(
            `Pedido ${id} atualizado para ${status}`
        );

    }

    res.sendStatus(200);

});

// Tratamento de rota inexistente
app.use((req, res) => {

    res.status(404).json({
        erro: "Rota não encontrada."
    });

});

// Tratamento de erros
app.use((err, req, res, next) => {

    console.error(err);

    res.status(500).json({
        erro: "Erro interno do servidor."
    });

});

// Inicializar servidor
app.listen(PORT, () => {

    console.log(`
========================================
 LS ELETRÔNICOS
========================================

Servidor iniciado!

URL:
http://localhost:${PORT}

Status:
Online

========================================
`);

});
