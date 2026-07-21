// =======================================
// LS ELETRÔNICOS
// script.js
// =======================================

// Elementos da página
const listaProdutos = document.getElementById("listaProdutos");
const listaMaisVendidos = document.getElementById("maisVendidos");
const campoPesquisa = document.querySelector(".pesquisa input");

// Formata valores em Real
function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Cria um card de produto
function criarCard(produto) {

    return `
        <div class="produto">

            <img src="${produto.imagem}" alt="${produto.nome}">

            <div class="info">

                <h3>${produto.nome}</h3>

                <small>${produto.marca}</small>

                <p class="preco">
                    ${formatarPreco(produto.preco)}
                </p>

                <p class="parcelamento">
                    ou até 12x sem juros
                </p>

                <a
                    href="produto.html?id=${produto.id}"
                    class="btnComprar">

                    Ver Produto

                </a>

            </div>

        </div>
    `;

}

// Carrega produtos em destaque
function carregarDestaques() {

    if (!listaProdutos) return;

    const destaques = produtos.filter(p => p.destaque);

    listaProdutos.innerHTML = "";

    destaques.forEach(produto => {

        listaProdutos.innerHTML += criarCard(produto);

    });

}

// Carrega produtos mais vendidos
function carregarMaisVendidos() {

    if (!listaMaisVendidos) return;

    const vendidos = produtos.filter(p => p.maisVendido);

    listaMaisVendidos.innerHTML = "";

    vendidos.forEach(produto => {

        listaMaisVendidos.innerHTML += criarCard(produto);

    });

}

// Pesquisa de produtos
function pesquisarProduto(texto) {

    if (!listaProdutos) return;

    texto = texto.toLowerCase();

    const encontrados = produtos.filter(produto =>

        produto.nome.toLowerCase().includes(texto) ||

        produto.marca.toLowerCase().includes(texto) ||

        produto.categoria.toLowerCase().includes(texto)

    );

    listaProdutos.innerHTML = "";

    encontrados.forEach(produto => {

        listaProdutos.innerHTML += criarCard(produto);

    });

}

// Campo de pesquisa
if (campoPesquisa) {

    campoPesquisa.addEventListener("keyup", function () {

        pesquisarProduto(this.value);

    });

}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {

    carregarDestaques();

    carregarMaisVendidos();

});  // =======================================
// FILTROS E FUNCIONALIDADES EXTRAS
// =======================================

// Filtrar produtos por categoria
function filtrarCategoria(categoria) {

    if (!listaProdutos) return;

    if (categoria === "Todos") {
        carregarDestaques();
        return;
    }

    const resultado = produtos.filter(produto =>
        produto.categoria === categoria
    );

    listaProdutos.innerHTML = "";

    if (resultado.length === 0) {

        listaProdutos.innerHTML = `
            <div class="semProdutos">
                <h2>Nenhum produto encontrado.</h2>
            </div>
        `;

        return;
    }

    resultado.forEach(produto => {
        listaProdutos.innerHTML += criarCard(produto);
    });

}

// Ordenar produtos
function ordenarProdutos(tipo) {

    if (!listaProdutos) return;

    let lista = [...produtos];

    switch (tipo) {

        case "menorPreco":
            lista.sort((a,b)=>a.preco-b.preco);
            break;

        case "maiorPreco":
            lista.sort((a,b)=>b.preco-a.preco);
            break;

        case "nome":
            lista.sort((a,b)=>a.nome.localeCompare(b.nome));
            break;

        default:
            break;
    }

    listaProdutos.innerHTML = "";

    lista.forEach(produto=>{
        listaProdutos.innerHTML += criarCard(produto);
    });

}

// =======================================
// FAVORITOS
// =======================================

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

function adicionarFavorito(id){

    if(!favoritos.includes(id)){

        favoritos.push(id);

        localStorage.setItem(
            "favoritos",
            JSON.stringify(favoritos)
        );

        alert("Produto adicionado aos favoritos.");

    }else{

        alert("Este produto já está nos favoritos.");

    }

}

// =======================================
// PRODUTOS RELACIONADOS
// =======================================

function produtosRelacionados(categoria,idAtual){

    return produtos.filter(produto=>{

        return produto.categoria===categoria &&
               produto.id!==idAtual;

    }).slice(0,4);

}

// =======================================
// CARREGAR MAIS
// =======================================

let quantidadeExibida = 8;

function carregarMais(){

    if(!listaProdutos) return;

    listaProdutos.innerHTML="";

    produtos.slice(0,quantidadeExibida)
    .forEach(produto=>{

        listaProdutos.innerHTML+=criarCard(produto);

    });

}

function mostrarMais(){

    quantidadeExibida += 8;

    carregarMais();

}

// =======================================
// ANIMAÇÃO
// =======================================

const elementos = document.querySelectorAll(
".produto,.categoria,.oferta,.vantagem"
);

const observador = new IntersectionObserver((itens)=>{

    itens.forEach(item=>{

        if(item.isIntersecting){

            item.target.classList.add("mostrar");

        }

    });

});

elementos.forEach(item=>{

    observador.observe(item);

});

// =======================================
// MENU MOBILE
// =======================================

const menuBotao=document.querySelector(".menuMobile");

const menu=document.querySelector(".menu");

if(menuBotao){

menuBotao.addEventListener("click",()=>{

menu.classList.toggle("ativo");

});

}

// =======================================
// CONTADOR DO CARRINHO
// =======================================

function atualizarContadorCarrinho(){

    const carrinho=
    JSON.parse(localStorage.getItem("carrinho"))||[];

    const contador=
    document.getElementById("contadorCarrinho");

    if(contador){

        contador.innerText=carrinho.length;

    }

}

document.addEventListener(

"DOMContentLoaded",

()=>{

    atualizarContadorCarrinho();

    carregarMais();

}

);
