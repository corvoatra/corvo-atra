# Blog Corvo Atra — publicação pelo GitHub

## O que já está pronto
- Página pública `/blog/` e páginas individuais para cada artigo.
- Layout responsivo seguindo o visual do Corvo Atra.
- Link Blog no menu e rodapé de todas as páginas.
- Configuração `.pages.yml` para editar artigos pelo Pages CMS.
- Pasta `_posts` para artigos e `assets/imagens/blog` para imagens.

## Publicação inicial
1. Crie um repositório no GitHub e envie **o conteúdo da pasta `corvo_atra_site` para a raiz** do repositório (inclusive `.pages.yml`, que é oculto em alguns sistemas).
2. Em Settings → Pages, selecione **Deploy from a branch**, branch `main`, pasta `/(root)`.
3. Aguarde a publicação. O GitHub Pages processará o Jekyll e gerará `/blog/`.
4. Acesse https://pagescms.org/ e faça login com GitHub. Autorize o repositório e abra a coleção **Publicações do blog**.
5. Crie um artigo com título, data e texto, e salve. O Pages CMS grava o arquivo Markdown em `_posts` no GitHub; o GitHub Pages gera o artigo automaticamente após o deploy.

## Repositório de projeto (`usuario.github.io/corvo-atra/`)
Se o site for publicado em um caminho com nome do repositório (em vez de na raiz de um domínio), os links estáticos originais relativos funcionam nas páginas HTML de raiz. As URLs geradas pelo Jekyll precisam do `baseurl` apropriado: adicione `baseurl: /corvo-atra` em `_config.yml` (substituindo pelo nome real do repositório). Em domínio próprio servido da raiz, deixe `baseurl` vazio.

## Segurança
Somente pessoas com permissão de escrita no repositório podem publicar. Ative 2FA no GitHub e confira os aplicativos autorizados. O link do painel não equivale a permissão de edição.

## Observações
- O blog público começa vazio de propósito: nenhum artigo fictício foi publicado.
- O painel é hospedado pelo Pages CMS, **não** dentro do GitHub Pages; o site público continua no Corvo Atra.
- O GitHub Pages não permite uma área privada com autenticação e escrita diretamente no site estático sem um serviço adicional.
- Para testar localmente a geração dos artigos é preciso rodar Jekyll; abrir `blog/index.html` diretamente como arquivo mostrará os marcadores Liquid.
- Os artigos são públicos após serem gravados em `_posts`. Para rascunhos privados, salve fora dessa pasta até publicar ou configure um fluxo editorial separado.
