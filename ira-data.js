// Camada de dados: lê do Firestore (coleção ira_negocios); se estiver vazio, bloqueado ou offline, usa data/negocios.json.
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { firebaseConfig, COLECOES, IMAGE_BASE } from "./config.js";

export const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export { COLECOES, IMAGE_BASE };

const comTempo = (p, ms) => Promise.race([p, new Promise((_, r) => setTimeout(() => r(new Error("tempo esgotado")), ms))]);

// Converte o documento (em português) para o formato interno do app.
export function normalizar(n, i = 0, hoje = new Date()) {
  const h = n.horarios;
  // Plano vencido volta a valer como Gratuito (3 fotos, sem selo) até ser renovado.
  const vencido = n.plano && n.plano !== "gratis" && n.planoAte && new Date(n.planoAte + "T23:59:59") < hoje;
  const plano = vencido ? "gratis" : n.plano || "gratis";
  return {
    id: n.id, name: n.nome, cat: n.categoria, sub: n.subcategoria || "", tags: n.servicos || [], desc: n.descricao || "",
    bairro: n.bairro || "", end: n.endereco || "—", t24: h === "24h",
    h: h === "24h" ? { wk: [0, 24], sat: [0, 24], sun: [0, 24] } : { wk: h?.seg_sex ?? null, sat: h?.sab ?? null, sun: h?.dom ?? null },
    phone: n.telefone || "", wa: n.whatsapp || "", plan: plano, ver: n.fotosVersao || "",
    n: [Number(n.nota?.media) || 0, Number(n.nota?.qtd) || 0],
    t: n.entrega?.tempo || "", f: n.entrega ? Number(n.entrega.frete) || 0 : undefined,
    ret: !!n.retirada, orc: !!n.orcamento, photos: Math.min(plano === "gratis" ? 3 : 10, Math.max(1, Number(n.fotos) || 1)),
    ativo: n.ativo !== false, ordem: n.ordem ?? i, i,
  };
}

export async function carregarNegocios() {
  let fonte = "arquivo local (data/negocios.json)", docs = [];
  try {
    const snap = await comTempo(getDocs(collection(db, COLECOES.negocios)), 5000);
    docs = snap.docs.map((d) => ({ ...d.data(), id: d.id }));
    if (docs.length) fonte = "Firestore";
  } catch (e) { console.warn("Firestore indisponível, usando arquivo local:", e.message); }
  if (!docs.length) {
    const r = await fetch("data/negocios.json", { cache: "no-store" });
    docs = (await r.json()).negocios;
  }
  const lista = docs.filter((n) => n.ativo !== false).sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0)).map(normalizar);
  return { lista, fonte };
}

const v = (ver) => (ver ? `?v=${ver}` : "");
export const urlFoto = (id, i, ver = "") => `${IMAGE_BASE}${id}/${String(i + 1).padStart(2, "0")}.webp${v(ver)}`;
export const urlLogo = (id, ver = "") => `${IMAGE_BASE}${id}/logo.webp${v(ver)}`;

// Conta o contato (WhatsApp ou ligação). Falha em silêncio: nunca atrapalha o clique.
export async function registrarContato(negocioId, tipo, origem = "app") {
  try {
    await addDoc(collection(db, COLECOES.contatos), { negocioId, tipo, origem, criadoEm: serverTimestamp() });
  } catch (e) { /* regras ainda não publicadas ou offline */ }
}

// Cadastro enviado pela própria empresa ("Cadastre sua empresa"). Fica pendente até o painel aprovar.
export async function enviarCadastro({ nome, categoria, whatsapp }) {
  await addDoc(collection(db, COLECOES.cadastros), { nome: String(nome).slice(0, 80), categoria: String(categoria).slice(0, 30), whatsapp: String(whatsapp).slice(0, 25), status: "novo", criadoEm: serverTimestamp() });
}
