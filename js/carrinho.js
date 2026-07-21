// ======================================
// LS ELETRÔNICOS
// carrinho.js
// ======================================

// Carrinho salvo no navegador
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// Salva o carrinho
function salvarCarrinho() {
    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

    atualizarContador();
}

// Atualiza o contador do carrinho
function atualizarContador() {

    const contador = document.getElementById("contadorCarrinho");

    if (contador) {
        contador.innerText = carrinho.length;
    }

}

// Adiciona um produto ao carrinho
function adicionarAoCarrinho(id) {

    const produto = produtos.find(p => p.id == id);

    if (!produto) {
        return;
    }

    const existente = carrinho.find(item => item.id == id);

    if (existente) {

        existente.quantidade++;

    } else {

        carrinho.push({

            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagem,
            quantidade: 1

        });

    }

    salvarCarrinho();

    alert("Produto adicionado ao carrinho.");

}

// Remove um produto
function removerProduto(id){

    carrinho = carrinho.filter(item=>item.id != id);

    salvarCarrinho();

    carregarCarrinho();

}

// Aumenta quantidade
function aumentarQuantidade(id){

    const item = carrinho.find(p=>p.id==id);

    if(item){

        item.quantidade++;

    }

    salvarCarrinho();

    carregarCarrinho();

}

// Diminui quantidade
function diminuirQuantidade(id){

    const item = carrinho.find(p=>p.id==id);

    if(!item) return;

    item.quantidade--;

    if(item.quantidade<=0){

        removerProduto(id);

        return;

    }

    salvarCarrinho();

    carregarCarrinho();

}

// Calcula subtotal
function subtotal(){

    let total=0;

    carrinho.forEach(item=>{

        total += item.preco * item.quantidade;

    });

    return total;

} // ======================================
// CONTINUAÇÃO DO CARRINHO
// ======================================

// Frete padrão
function calcularFrete() {

    if (subtotal() >= 500) {
        return 0;
    }

    return 29.90;
}

// Cupom de desconto
function calcularDesconto() {

    const cupom = localStorage.getItem("cupom");

    if (cupom === "LS10") {
        return subtotal() * 0.10;
    }

    return 0;
}

// Total da compra
function totalCompra() {

    return subtotal() + calcularFrete() - calcularDesconto();

}

// Exibe os produtos do carrinho
function carregarCarrinho() {

    const lista = document.getElementById("listaCarrinho");

    if (!lista) return;

    lista.innerHTML = "";

    if (carrinho.length === 0) {

        lista.innerHTML = `
            <div class="carrinho-vazio">
                <h2>Seu carrinho está vazio.</h2>
                <a href="produtos.html" class="btnComprar">
                    Continuar Comprando
                </a>
            </div>
        `;

        atualizarResumo();

        return;
    }

    carrinho.forEach(item => {

        lista.innerHTML += `

        <div class="itemCarrinho">

            <img src="${item.imagem}" alt="${item.nome}">

            <div class="dados">

                <h3>${item.nome}</h3>

                <p>
                    ${formatarPreco(item.preco)}
                </p>

                <div class="quantidade">

                    <button onclick="diminuirQuantidade(${item.id})">-</button>

                    <span>${item.quantidade}</span>

                    <button onclick="aumentarQuantidade(${item.id})">+</button>

                </div>

            </div>

            <button
                class="remover"
                onclick="removerProduto(${item.id})">

                Remover

            </button>

        </div>

        `;

    });

    atualizarResumo();

}

// Atualiza os valores do resumo
function atualizarResumo() {

    const subtotalEl = document.getElementById("subtotal");
    const freteEl = document.getElementById("frete");
    const descontoEl = document.getElementById("desconto");
    const totalEl = document.getElementById("total");

    if (subtotalEl)
        subtotalEl.innerText = formatarPreco(subtotal());

    if (freteEl)
        freteEl.innerText = formatarPreco(calcularFrete());

    if (descontoEl)
        descontoEl.innerText = "-" + formatarPreco(calcularDesconto());

    if (totalEl)
        totalEl.innerText = formatarPreco(totalCompra());

}

// Aplicar cupom
function aplicarCupom() {

    const campo = document.getElementById("cupom");

    if (!campo) return;

    if (campo.value.trim() === "LS10") {

        localStorage.setItem("cupom", "LS10");

        alert("Cupom aplicado com sucesso!");

    } else {

        localStorage.removeItem("cupom");

        alert("Cupom inválido.");

    }

    atualizarResumo();

}

// Ir para o checkout
function finalizarCompra() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio.");

        return;

    }

    window.location.href = "checkout.html";

}

// Limpar carrinho
function limparCarrinho() {

    if (!confirm("Deseja realmente limpar o carrinho?")) {
        return;
    }

    carrinho = [];

    localStorage.removeItem("carrinho");

    salvarCarrinho();

    carregarCarrinho();

}

// Inicialização
document.addEvent
