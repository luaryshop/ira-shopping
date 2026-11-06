# Ira Shopping — projeto de teste

App de comércios e serviços de Iracemápolis-SP (protótipo funcional com dados fictícios).
Site estático + Firebase, no mesmo estilo da Luary.

## Testar agora (sem Firebase)
Os arquivos precisam ser abertos por servidor (não dá para dar duplo clique em `index.html`):

    cd ira-shopping
    python3 -m http.server 8080      # abra http://localhost:8080

Sem nenhuma configuração, o app lê `data/negocios.json` e mostra as 6 empresas de exemplo, com fotos de `images/`.
No rodapé aparece "Fonte dos dados: …" para você saber de onde vieram.

## Ligar ao Firebase da Luary (opcional, para testar painel e contagem de contatos)
1. Firebase → Firestore → **Regras**: cole o conteúdo de `firestore.rules.ira-ADICIONAR.txt` junto das regras existentes e publique.
   As coleções do Ira começam com `ira_`: nada da loja Luary é alterado.
2. Abra `admin.html`, entre com o administrador da Luary e clique em **Carregar dados de exemplo no Firestore**.
3. Volte ao app: a fonte passa a ser "Firestore". Cada toque em WhatsApp/Ligar vira um contato, e o painel mostra a contagem por empresa. Também dá para **Pausar** uma empresa.

`config.js` já está com a configuração do Firebase da Luary. Para o projeto real, crie um projeto Firebase próprio e troque ali.

## Fotos
`images/<id-da-empresa>/01.webp … 10.webp` e `logo.webp`. As empresas do plano Gratuito usam só 3 fotos.
O mesmo conteúdo está no zip de imagens (`ira/…`) para subir no repositório de imagens (CDN). Depois, troque `IMAGE_BASE` em `config.js`.
As fotos são ilustrações de exemplo; telefones e endereços são fictícios.

## Estrutura
- `index.html` app · `admin.html` painel · `config.js` configuração · `ira-data.js` leitura/gravação de dados
- `data/negocios.json` dados de exemplo · `images/` fotos de exemplo
