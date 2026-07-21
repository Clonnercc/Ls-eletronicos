// ======================================
// LS ELETRÔNICOS
// checkout.js
// ======================================

// Carrinho salvo
const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// Elementos da página
const produtosCheckout = document.getElementById("produtosCheckout");
const subtotalCheckout = document.getElementById("subtotalCheckout");
const freteCheckout = document.getElementById("freteCheckout");
const descontoCheckout = document.getElementById("descontoCheckout");
const totalCheckout = document.getElementById("totalCheckout");

// Formatar moeda
function moeda(valor){

    return valor.toLocaleString("pt-BR",{

        style:"currency",

        currency:"BRL"

    });

}

// Carregar resumo da compra
function carregarResumo(){

    if(!produtosCheckout) return;

    produtosCheckout.innerHTML="";

    let subtotal=0;

    carrinho.forEach(item=>{

        subtotal += item.preco * item.quantidade;

        produtosCheckout.innerHTML += `

        <div class="itemCheckout">

            <img src="${item.imagem}" alt="${item.nome}">

            <div>

                <h4>${item.nome}</h4>

                <p>Quantidade: ${item.quantidade}</p>

                <strong>${moeda(item.preco)}</strong>

            </div>

        </div>

        `;

    });

    let frete = subtotal >= 500 ? 0 : 29.90;

    let desconto = localStorage.getItem("cupom") === "LS10"
        ? subtotal * 0.10
        : 0;

    let total = subtotal + frete - desconto;

    subtotalCheckout.innerText = moeda(subtotal);
    freteCheckout.innerText = moeda(frete);
    descontoCheckout.innerText = "-" + moeda(desconto);
    totalCheckout.innerText = moeda(total);

}

// Dados do cliente
function obterCliente(){

    return{

        nome:document.getElementById("nome").value,

        email:document.getElementById("email").value,

        telefone:document.getElementById("telefone").value,

        cep:document.getElementById("cep").value,

        rua:document.getElementById("rua").value,

        numero:document.getElementById("numero").value,

        bairro:document.getElementById("bairro").value,

        cidade:document.getElementById("cidade").value,

        estado:document.getElementById("estado").value

    };

}

// Validar formulário
function validarFormulario(){

    const cliente = obterCliente();

    for(const campo in cliente){

        if(cliente[campo].trim()===""){

            alert("Preencha todos os campos.");

            return false;

        }

    }

    return true;

}

document.addEventListener("DOMContentLoaded",()=>{

    carregarResumo();

});// ======================================
// SIGILO PAY
// checkout.js - Parte 2
// ======================================

// CONFIGURAÇÃO DA API
const SIGILO_API_URL = "https://SUA_API_SIGILOPAY";
const SIGILO_PUBLIC_KEY = "SUA_CHAVE_PUBLICA";
const SIGILO_SECRET_KEY = "SUA_CHAVE_PRIVADA";

// Gerar PIX
async function gerarPix(){

    if(!validarFormulario()){
        return;
    }

    try{

        const cliente = obterCliente();

        const response = await fetch(
            SIGILO_API_URL + "/pix",
            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer " + SIGILO_SECRET_KEY
                },

                body:JSON.stringify({

                    cliente,

                    produtos:carrinho,

                    valor:totalCheckout.innerText

                })

            }
        );

        const dados = await response.json();

        document.getElementById("pixCopiaCola").value =
            dados.pix || "";

        document.getElementById("qrCodePix").src =
            dados.qrcode || "assets/img/qrcode-placeholder.png";

        localStorage.setItem(
            "pedido_id",
            dados.id
        );

        alert("PIX gerado com sucesso.");

    }catch(erro){

        console.error(erro);

        alert("Erro ao gerar o PIX.");

    }

}

// Copiar PIX
function copiarPix(){

    const campo =
        document.getElementById("pixCopiaCola");

    campo.select();

    document.execCommand("copy");

    alert("Código PIX copiado.");

}

// Consultar pagamento
async function consultarPagamento(){

    const pedido =
        localStorage.getItem("pedido_id");

    if(!pedido){
        return;
    }

    try{

        const resposta = await fetch(

            SIGILO_API_URL + "/pix/" + pedido,

            {

                headers:{

                    "Authorization":
                    "Bearer " + SIGILO_SECRET_KEY

                }

            }

        );

        const dados =
            await resposta.json();

        if(dados.status === "paid"){

            pagamentoAprovado();

        }

    }catch(e){

        console.log(e);

    }

}

// Pagamento aprovado
function pagamentoAprovado(){

    alert("Pagamento aprovado!");

    localStorage.removeItem("carrinho");
    localStorage.removeItem("cupom");
    localStorage.removeItem("pedido_id");

    window.location.href =
    "pedido-aprovado.html";

}

// Botão confirmar
function confirmarPagamento(){

    consultarPagamento();

}

// Consulta automática
setInterval(()=>{

    consultarPagamento();

},5000);
