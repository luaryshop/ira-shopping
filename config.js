// Configuração do Ira Shopping.
// TESTE: usa o projeto Firebase da Luary (as coleções do Ira começam com "ira_", sem tocar nos dados da loja).
// Para produção, troque por um projeto Firebase próprio do Ira Shopping.
export const firebaseConfig = { apiKey: "AIzaSyCanlMwdfuD9gmVt62nJYYetj4K2-BfWEc", authDomain: "luary-system.firebaseapp.com", projectId: "luary-system", storageBucket: "luary-system.firebasestorage.app", messagingSenderId: "996287172742", appId: "1:996287172742:web:4ff8c22a01cabe4015c107" };

export const CIDADE = { nome: "Iracemápolis", uf: "SP" };

// Coleções no Firestore (prefixo evita misturar com a loja Luary).
export const COLECOES = { negocios: "ira_negocios", categorias: "ira_categorias", contatos: "ira_contatos" };

// Onde ficam as fotos: images/<id-do-negocio>/01.webp ... 10.webp e logo.webp
// Para usar o GitHub/jsDelivr, suba a pasta "ira" no repositório de imagens e troque por:
//   "https://cdn.jsdelivr.net/gh/luaryshop/luary-cdn@main/ira/"
export const IMAGE_BASE = "images/";
