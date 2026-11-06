// Configuração do Ira Shopping.
// TESTE: usa o projeto Firebase da Luary (as coleções do Ira começam com "ira_", sem tocar nos dados da loja).
// Para produção, troque por um projeto Firebase próprio do Ira Shopping.
export const firebaseConfig = { apiKey: "AIzaSyCanlMwdfuD9gmVt62nJYYetj4K2-BfWEc", authDomain: "luary-system.firebaseapp.com", projectId: "luary-system", storageBucket: "luary-system.firebasestorage.app", messagingSenderId: "996287172742", appId: "1:996287172742:web:4ff8c22a01cabe4015c107" };

export const CIDADE = { nome: "Iracemápolis", uf: "SP" };

// Coleções no Firestore (prefixo evita misturar com a loja Luary).
export const COLECOES = { negocios: "ira_negocios", categorias: "ira_categorias", contatos: "ira_contatos", cadastros: "ira_cadastros" };

// Onde ficam as fotos: images/<id-do-negocio>/01.webp ... 10.webp e logo.webp
// Para usar o GitHub/jsDelivr, suba a pasta "ira" no repositório de imagens e troque por:
//   "https://cdn.jsdelivr.net/gh/luaryshop/luary-cdn@main/ira/"
export const IMAGE_BASE = "images/";

// Onde o painel publica as fotos (repositório GitHub). Para o teste, o mesmo repositório do site.
// O token (com permissão de escrita em "Contents") é digitado no painel e não fica salvo.
export const GITHUB = { user: "luaryshop", repo: "ira-shopping", branch: "main", pasta: "images" };

// Valores mensais usados só para estimar a receita no painel.
export const PRECOS = { gratis: 0, destaque: 79, premium: 149 };
