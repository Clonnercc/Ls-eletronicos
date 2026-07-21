// ======================================
// LS ELETRÔNICOS
// admin.js - Parte 1
// ======================================

// Credenciais iniciais (troque em produção)
const ADMIN_USER = "admin";
const ADMIN_PASS = "123456";

// Produtos salvos
let produtosAdmin =
    JSON.parse(localStorage.getItem("produtos")) || [...produtos];

// Login
document.getElementById("formLogin")?.addEventListener("submit", function(e){

    e.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    if(usuario === ADMIN_USER && senha === ADMIN_PASS){

        localStorage.setItem("adminLogado","true");

        iniciarPainel();

    }else{

        alert("Usuário ou senha inválidos.");

    }

});

// Iniciar painel
function iniciarPainel(){

    document.getElementById("loginAdmin").style.display = "none";

    document.getElementById("painelAdmin").style.display = "block";

    renderizarProdutos();

}

// Verificar login salvo
if(localStorage.getItem("adminLogado")==="true"){

    iniciarPainel();

}

// Renderizar lista
function renderizarProdutos(){

    const lista =
        document.getElementById("listaAdminProdutos");

    if(!lista) return;

    lista.innerHTML="";

    produtosAdmin.forEach(produto=>{

        lista.innerHTML += `

        <div class="produto">

            <h3>${produto.nome}</h3>

            <p>${produto.categoria}</p>

            <p>R$ ${produto.preco}</p>

            <button
                class="btnComprar"
                onclick="editarProduto(${produto.id})">

                Editar

            </button>

            <button
                class="btnComprar"
                onclick="excluirProduto(${produto.id})">

                Excluir

            </button>

        </div>

        `;

    });

} // ======================================
// LS ELETRÔNICOS
// admin.js - Parte 2
// ======================================

// Cadastrar / Atualizar produto
document.getElementById("formProduto")?.addEventListener("submit", function(e){

    e.preventDefault();

    const id = document.getElementById("produtoId").value;

    const produto = {

        id: id ? Number(id) : Date.now(),

        nome: document.getElementById("nomeProduto").value,

        categoria: document.getElementById("categoriaProduto").value,

        marca: document.getElementById("marcaProduto").value,

        preco: Number(document.getElementById("precoProduto").value),

        estoque: Number(document.getElementById("estoqueProduto").value),

        imagem: "assets/produtos/sem-imagem.jpg"

    };

    if(id){

        const indice = produtosAdmin.findIndex(p => p.id == id);

        if(indice !== -1){

            produtosAdmin[indice] = produto;

        }

    }else{

        produtosAdmin.push(produto);

    }

    salvarProdutos();

    renderizarProdutos();

    this.reset();

    document.getElementById("produtoId").value = "";

    alert("Produto salvo com sucesso.");

});

// Editar produto
function editarProduto(id){

    const produto = produtosAdmin.find(p => p.id == id);

    if(!produto) return;

    document.getElementById("produtoId").value = produto.id;
    document.getElementById("nomeProduto").value = produto.nome;
    document.getElementById("categoriaProduto").value = produto.categoria;
    document.getElementById("marcaProduto").value = produto.marca;
    document.getElementById("precoProduto").value = produto.preco;
    document.getElementById("estoqueProduto").value = produto.estoque;

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}

// Excluir produto
function excluirProduto(id){

    if(!confirm("Deseja excluir este produto?")){
        return;
    }

    produtosAdmin = produtosAdmin.filter(p => p.id != id);

    salvarProdutos();

    renderizarProdutos();

}

// Logout
function logoutAdmin(){

    localStorage.removeItem("adminLogado");

    location.reload();

}

// Salvar configurações da Sigilo Pay
function salvarConfiguracoes(){

    const configuracao = {

        apiUrl: document.getElementById("sigiloApiUrl").value,

        publicKey: document.getElementById("sigiloPublicKey").value

    };

    localStorage.setItem(
        "sigilo_config",
        JSON.stringify(configuracao)
    );

    alert("Configurações salvas.");

}

// Carregar configurações
(function(){

    const config = JSON.parse(
        localStorage.getItem("sigilo_config")
    );

    if(!config) return;

    const api = document.getElementById("sigiloApiUrl");
    const key = document.getElementById("sigiloPublicKey");

    if(api) api.value = config.apiUrl || "";
    if(key) key.value = config.publicKey || "";

})();

// Pedidos
function carregarPedidos(){

    const pedidos = JSON.parse(
        localStorage.getItem("pedidos")
    ) || [];

    const tabela = document.getElementById("listaPedidos");

    if(!tabela) return;

    tabela.innerHTML = "";

    pedidos.forEach(pedido => {

        tabela.innerHTML += `

        <tr>

            <td>${pedido.id}</td>

            <td>${pedido.cliente}</td>

            <td>R$ ${pedido.total}</td>

            <td>${pedido.status}</td>

            <td>

                <button
                    class="btnComprar"
                    onclick="visualizarPedido('${pedido.id}')">

                    Ver

                </button>

            </td>

        </tr>

        `;

    });

}

function visualizarPedido(id){

    const pedidos = JSON.parse(
        localStorage.getItem("pedidos")
    ) || [];

    const pedido = pedidos.find(p => p.id == id);

    if(!pedido){

        alert("Pedido não encontrado.");

        return;

    }

    alert(
`Pedido: ${pedido.id}

Cliente: ${pedido.cliente}

Total: R$ ${pedido.total}

Status: ${pedido.status}`
    );

}

document.addEventListener("DOMContentLoaded", () => {

    carregarPedidos();

});

// Salvar produtos
function salvarProdutos(){

    localStorage.setItem(

        "produtos",

        JSON.stringify(produtosAdmin)

    );

}
