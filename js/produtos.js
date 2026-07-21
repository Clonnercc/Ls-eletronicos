// ==============================
// LS ELETRÔNICOS
// Banco de Produtos
// ==============================

const produtos = [

{
    id:1,
    nome:"iPhone 16 Pro Max 256GB",
    categoria:"Celulares",
    marca:"Apple",
    preco:8999.90,
    precoAntigo:9599.90,
    desconto:6,
    estoque:18,
    destaque:true,
    maisVendido:true,
    imagem:"assets/produtos/iphone16promax.jpg",
    descricao:"iPhone 16 Pro Max com tela Super Retina XDR, chip A18 Pro e câmera profissional."
},

{
    id:2,
    nome:"Samsung Galaxy S25 Ultra",
    categoria:"Celulares",
    marca:"Samsung",
    preco:7399.90,
    precoAntigo:8199.90,
    desconto:10,
    estoque:22,
    destaque:true,
    maisVendido:true,
    imagem:"assets/produtos/s25ultra.jpg",
    descricao:"Galaxy S25 Ultra com inteligência artificial, câmera de alta resolução e bateria de longa duração."
},

{
    id:3,
    nome:"Xiaomi 15 Ultra",
    categoria:"Celulares",
    marca:"Xiaomi",
    preco:5499.90,
    precoAntigo:5999.90,
    desconto:8,
    estoque:30,
    destaque:true,
    maisVendido:false,
    imagem:"assets/produtos/xiaomi15ultra.jpg",
    descricao:"Smartphone premium Xiaomi com câmera Leica e carregamento ultrarrápido."
},

{
    id:4,
    nome:"Motorola Edge 60 Pro",
    categoria:"Celulares",
    marca:"Motorola",
    preco:3899.90,
    precoAntigo:4299.90,
    desconto:9,
    estoque:17,
    destaque:false,
    maisVendido:true,
    imagem:"assets/produtos/edge60pro.jpg",
    descricao:"Motorola Edge com tela OLED 144Hz e excelente desempenho."
},

{
    id:5,
    nome:"MacBook Air M4",
    categoria:"Notebooks",
    marca:"Apple",
    preco:9999.90,
    precoAntigo:10999.90,
    desconto:9,
    estoque:10,
    destaque:true,
    maisVendido:true,
    imagem:"assets/produtos/macbookm4.jpg",
    descricao:"Notebook Apple com chip M4, extremamente leve e potente."
},

{
    id:6,
    nome:"Notebook Gamer ASUS TUF",
    categoria:"Notebooks",
    marca:"Asus",
    preco:6799.90,
    precoAntigo:7399.90,
    desconto:8,
    estoque:15,
    destaque:true,
    maisVendido:false,
    imagem:"assets/produtos/asustuf.jpg",
    descricao:"Notebook gamer equipado com RTX e processador Intel Core i7."
},

{
    id:7,
    nome:"Lenovo IdeaPad 5",
    categoria:"Notebooks",
    marca:"Lenovo",
    preco:3999.90,
    precoAntigo:4599.90,
    desconto:13,
    estoque:28,
    destaque:false,
    maisVendido:true,
    imagem:"assets/produtos/ideapad5.jpg",
    descricao:"Ideal para estudos, trabalho e uso diário."
},

{
    id:8,
    nome:"Apple Watch Series 11",
    categoria:"Smartwatch",
    marca:"Apple",
    preco:3299.90,
    precoAntigo:3599.90,
    desconto:8,
    estoque:35,
    destaque:true,
    maisVendido:true,
    imagem:"assets/produtos/applewatch11.jpg",
    descricao:"Relógio inteligente com monitoramento completo de saúde."
},

{
    id:9,
    nome:"Galaxy Watch Ultra",
    categoria:"Smartwatch",
    marca:"Samsung",
    preco:2399.90,
    precoAntigo:2699.90,
    desconto:11,
    estoque:27,
    destaque:false,
    maisVendido:true,
    imagem:"assets/produtos/watchultra.jpg",
    descricao:"Smartwatch premium Samsung com GPS e resistência à água."
},

{
    id:10,
    nome:"AirPods Pro 2",
    categoria:"Fones",
    marca:"Apple",
    preco:1899.90,
    precoAntigo:2199.90,
    desconto:14,
    estoque:50,
    destaque:true,
    maisVendido:true,
    imagem:"assets/produtos/airpods2.jpg",
    descricao:"Fones sem fio com cancelamento ativo de ruído."
}
  // ==============================
// Continuação do catálogo
// ==============================

produtos.push(

{
    id:11,
    nome:"PlayStation 5 Slim 1TB",
    categoria:"Videogames",
    marca:"Sony",
    preco:3799.90,
    precoAntigo:4199.90,
    desconto:10,
    estoque:20,
    destaque:true,
    maisVendido:true,
    imagem:"assets/produtos/ps5slim.jpg",
    descricao:"Console PlayStation 5 Slim SSD 1TB."
},

{
    id:12,
    nome:"Xbox Series X 1TB",
    categoria:"Videogames",
    marca:"Microsoft",
    preco:4099.90,
    precoAntigo:4499.90,
    desconto:9,
    estoque:14,
    destaque:true,
    maisVendido:true,
    imagem:"assets/produtos/xboxseriesx.jpg",
    descricao:"Console Xbox Series X com SSD de alta velocidade."
},

{
    id:13,
    nome:"Nintendo Switch OLED",
    categoria:"Videogames",
    marca:"Nintendo",
    preco:2299.90,
    precoAntigo:2499.90,
    desconto:8,
    estoque:22,
    destaque:false,
    maisVendido:true,
    imagem:"assets/produtos/switcholed.jpg",
    descricao:"Nintendo Switch OLED com tela de 7 polegadas."
},

{
    id:14,
    nome:"Smart TV Samsung 55\" 4K",
    categoria:"TVs",
    marca:"Samsung",
    preco:2999.90,
    precoAntigo:3499.90,
    desconto:14,
    estoque:18,
    destaque:true,
    maisVendido:true,
    imagem:"assets/produtos/tvsamsung55.jpg",
    descricao:"Smart TV Crystal UHD 4K."
},

{
    id:15,
    nome:"Smart TV LG 65\" NanoCell",
    categoria:"TVs",
    marca:"LG",
    preco:4399.90,
    precoAntigo:4999.90,
    desconto:12,
    estoque:10,
    destaque:false,
    maisVendido:true,
    imagem:"assets/produtos/lg65nano.jpg",
    descricao:"TV NanoCell 4K HDR."
},

{
    id:16,
    nome:"Echo Dot 5ª Geração",
    categoria:"Casa Inteligente",
    marca:"Amazon",
    preco:349.90,
    precoAntigo:449.90,
    desconto:22,
    estoque:60,
    destaque:true,
    maisVendido:true,
    imagem:"assets/produtos/echodot5.jpg",
    descricao:"Assistente virtual Alexa."
},

{
    id:17,
    nome:"Caixa JBL Charge 6",
    categoria:"Caixas de Som",
    marca:"JBL",
    preco:999.90,
    precoAntigo:1199.90,
    desconto:17,
    estoque:26,
    destaque:true,
    maisVendido:true,
    imagem:"assets/produtos/jblcharge6.jpg",
    descricao:"Caixa Bluetooth resistente à água."
},

{
    id:18,
    nome:"Monitor Gamer LG 27\" 165Hz",
    categoria:"Monitores",
    marca:"LG",
    preco:1499.90,
    precoAntigo:1799.90,
    desconto:16,
    estoque:15,
    destaque:false,
    maisVendido:true,
    imagem:"assets/produtos/monitorlg27.jpg",
    descricao:"Monitor Full HD 165Hz."
},

{
    id:19,
    nome:"Mouse Gamer Logitech G502 X",
    categoria:"Periféricos",
    marca:"Logitech",
    preco:399.90,
    precoAntigo:499.90,
    desconto:20,
    estoque:48,
    destaque:false,
    maisVendido:true,
    imagem:"assets/produtos/g502x.jpg",
    descricao:"Mouse gamer de alta precisão."
},

{
    id:20,
    nome:"Teclado Mecânico Redragon Kumara",
    categoria:"Periféricos",
    marca:"Redragon",
    preco:259.90,
    precoAntigo:319.90,
    desconto:19,
    estoque:42,
    destaque:false,
    maisVendido:true,
    imagem:"assets/produtos/kumara.jpg",
    descricao:"Teclado mecânico RGB."
},

{
    id:21,
    nome:"iPad Air M3",
    categoria:"Tablets",
    marca:"Apple",
    preco:5999.90,
    precoAntigo:6499.90,
    desconto:8,
    estoque:16,
    destaque:true,
    maisVendido:true,
    imagem:"assets/produtos/ipadairm3.jpg",
    descricao:"Tablet Apple com chip M3."
},

{
    id:22,
    nome:"Galaxy Tab S10",
    categoria:"Tablets",
    marca:"Samsung",
    preco:4599.90,
    precoAntigo:4999.90,
    desconto:8,
    estoque:19,
    destaque:false,
    maisVendido:true,
    imagem:"assets/produtos/tabs10.jpg",
    descricao:"Tablet Samsung premium."
},

{
    id:23,
    nome:"Carregador Turbo USB-C 65W",
    categoria:"Acessórios",
    marca:"Baseus",
    preco:149.90,
    precoAntigo:199.90,
    desconto:25,
    estoque:80,
    destaque:false,
    maisVendido:true,
    imagem:"assets/produtos/carregador65w.jpg",
    descricao:"Carregamento rápido para celulares e notebooks."
},

{
    id:24,
    nome:"Power Bank 20.000mAh",
    categoria:"Acessórios",
    marca:"Xiaomi",
    preco:229.90,
    precoAntigo:279.90,
    desconto:18,
    estoque:55,
    destaque:true,
    maisVendido:true,
    imagem:"assets/produtos/powerbank.jpg",
    descricao:"Bateria portátil de alta capacidade."
},

{
    id:25,
    nome:"SSD Kingston NVMe 1TB",
    categoria:"Armazenamento",
    marca:"Kingston",
    preco:449.90,
    precoAntigo:549.90,
    desconto:18,
    estoque:35,
    destaque:true,
    maisVendido:true,
    imagem:"assets/produtos/ssd1tb.jpg",
    descricao:"SSD NVMe de alto desempenho."
}

);

// ==============================
// Exportação do catálogo
// ==============================

if (typeof module !== "undefined") {
    module.exports = produtos;
  }
];
