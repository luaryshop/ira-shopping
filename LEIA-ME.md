# Ira Shopping — projeto de teste

App de comércios e serviços de Iracemápolis-SP (protótipo funcional com dados fictícios).
Site estático + Firebase, no mesmo estilo da Luary.

## Testar agora (sem Firebase)
Os arquivos precisam ser abertos por servidor (não dá para dar duplo clique em `index.html`):

    cd ira-shopping
    python3 -m http.server 8080      # abra http://localhost:8080

Sem nenhuma configuração, o app lê `data/negocios.json` e mostra as 6 empresas de exemplo, com fotos de `images/`.
No rodapé aparece "Fonte dos dados: …" para você saber de onde vieram.

## Ligar ao Firebase da Luary (para usar o painel completo)
1. Firebase → Firestore → **Regras**: cole o conteúdo de `firestore.rules.ira-ADICIONAR.txt` junto das regras existentes e publique.
   (Inclui `ira_cadastros`, usada pelo formulário "Cadastre sua empresa". Se você já colou a versão antiga, cole de novo.)
   As coleções do Ira começam com `ira_`: nada da loja Luary é alterado.
2. Abra `admin.html` e entre com o administrador da Luary.
3. Aba **Empresas** → "Carregar dados de exemplo" grava as 6 empresas no Firestore. O app passa a mostrar "Fonte: Firestore".

## Painel administrativo (`admin.html`)
- **Resumo**: empresas ativas e pagantes, receita mensal estimada (valores em `PRECOS`, `config.js`), planos vencendo em 15 dias, mais procuradas.
- **Empresas**: buscar/filtrar, criar, editar (categoria, contatos, horários, plano e validade, entrega, avaliação), pausar e apagar.
  O WhatsApp é validado e gravado com 55 + DDD. Plano pago vencido volta sozinho para Gratuito no app.
- **Fotos**: dentro da empresa, informe um token do GitHub (permissão de escrita em `GITHUB.user/GITHUB.repo`, `config.js`).
  Dá para enviar, reordenar, remover e trocar o logo (até 3 fotos no Gratuito, 10 nos pagos). Tudo vira um único commit em `images/<id>/`.
  O token fica só na memória da página. O site leva 1 a 2 minutos para mostrar as novas fotos.
- **Cadastros**: pedidos feitos no app. "Aprovar e completar" abre o editor já preenchido. Confirme o WhatsApp com a empresa antes.
- **Contatos**: toques em WhatsApp/Ligar por empresa e por dia (7/30/90 dias), CSV e texto de relatório pronto para enviar à empresa.

`config.js` já está com a configuração do Firebase da Luary. Para o projeto real, crie um projeto Firebase próprio e troque ali.

## Fotos
`images/<id-da-empresa>/01.webp … 10.webp` e `logo.webp` (o painel mantém esse padrão). As empresas do plano Gratuito usam só 3 fotos.
O mesmo conteúdo está no zip de imagens (`ira/…`) para subir no repositório de imagens (CDN). Depois, troque `IMAGE_BASE` em `config.js`.
As fotos são ilustrações de exemplo; telefones e endereços são fictícios.

## Estrutura
- `index.html` app · `admin.html` painel · `config.js` configuração · `ira-data.js` leitura/gravação de dados · `ira-cdn.js` envio de fotos ao GitHub
- `data/negocios.json` dados de exemplo · `images/` fotos de exemplo
