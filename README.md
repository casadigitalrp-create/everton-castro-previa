# Site: Everton Castro | Cirurgião-dentista

Astro 7 (estático) + TypeScript estrito + Tailwind 4 + Biome. Node 24, pnpm. Mesmas tecnologias e mesmo esquema de
imagens dos outros sites, com identidade própria: **mármore claro, dourado e detalhes da Grécia clássica** (colunas,
louro, ânfora, meandro). Fontes: Cormorant Garamond (títulos) e Inter (texto). O site tem um único tema, claro.

## A ideia do site

Em vez de listar tratamentos, o site parte do que faz as pessoas adiarem o dentista (medo, vergonha, medo do custo, não
entender o que o dentista fala, não saber o que esperar) e mostra, ao lado de cada receio, como o atendimento responde.
Veja `docs/pesquisa-dores-e-regras.md`.

- **Cuidado com você:** pares "o que você sente" e "como eu cuido disso".
- **A consulta:** quatro passos, da conversa ao acompanhamento.
- **Prepare sua consulta:** ferramenta que lista o que levar e o que perguntar por motivo (dor, prevenção, estética,
  aparelho, dente faltando) e monta um resumo para o WhatsApp. Funciona só no navegador e não guarda dados. A lista de
  dor traz o aviso de urgência (inchaço no rosto, febre, dificuldade para engolir ou respirar).
- **Odontologia traduzida:** glossário com busca.
- Hero com fundos que se alternam (pausa, escolha direta), faixa de compromissos, brilho dourado que segue o cursor nos
  cartões, borda com luz, barra de progresso e entrada suave das seções. Tudo respeita movimento reduzido.

## Comandos

- `pnpm install`: instala as dependências.
- `pnpm dev`: prévia local em http://localhost:4321.
- `pnpm build`: checa tipos e gera `dist/`.
- `pnpm preview`: serve o `dist/`.
- `pnpm lint` e `pnpm format`: Biome.
- `node scripts/gerar-imagens.mjs`: regenera as imagens **provisórias** (aceita filtro, por exemplo `... templo dente`).

## Onde editar

| O quê | Arquivo |
|---|---|
| Nome, CRO, formação, WhatsApp, e-mail, cidade, domínio | `src/data/site.ts` |
| Receios e respostas | `src/data/dores.ts` |
| Passos da consulta | `src/data/etapas.ts` |
| Listas da ferramenta "Prepare sua consulta" | `src/data/preparar.ts` |
| Glossário | `src/data/glossario.ts` |
| Atendimento (serviços) | `src/data/areas.ts` |
| Perguntas frequentes | `src/data/faq.ts` |
| Imagens | `src/assets/fundos/` (prompts em `docs/prompts-imagens.md`) |
| Textura de mármore e imagem de compartilhamento | `public/marmore-a.jpg` e `public/og.jpg` |
| Cores e fontes | `src/styles/global.css` (bloco `@theme` e tokens `--ec-*`) |
| Efeitos | `src/styles/efeitos.css` e `src/scripts/efeitos.ts` |
| Domínio | `site` em `astro.config.mjs` e `public/robots.txt` |

## Antes de publicar (pendências)

Todo item abaixo aparece na página com o selo **Provisório**. Para achar todos: procure `<Provisorio` no projeto.

- [ ] CRO (com o estado), ano de formatura e confirmação do texto "formado pela UNAERP".
- [ ] WhatsApp, e-mail, cidade e endereço reais.
- [ ] Texto e foto reais em "Sobre".
- [ ] Confirmar os **serviços** divulgados. Pelo Código de Ética, só se anuncia área ou técnica com especialidade
      registrada no CRO ou como "clínico geral". O site usa "clínico geral".
- [ ] Confirmar o **modelo de atendimento** (plano e orçamento antes, sinal de pausa, urgência). São compromissos dele.
- [ ] Se for **clínica (pessoa jurídica)**, incluir nome e CRO do responsável técnico.
- [ ] Trocar as imagens provisórias pelas finais (`docs/prompts-imagens.md`).
- [ ] Domínio real em `astro.config.mjs`, `public/robots.txt` e `src/data/site.ts`.
- [ ] Revisar a Política de Privacidade (rascunho). Dados de saúde são dados sensíveis na LGPD.
- [ ] **Revisão final do profissional** conforme o Código de Ética Odontológica e a Resolução CFO-196/2019 (e, se
      necessário, consulta ao CRO). O site não tem preços, descontos, resultados, depoimentos nem imagens de pacientes
      de propósito.

## Cloudflare Pages

- Framework preset: Astro. Build command: `pnpm build`. Output directory: `dist`. Variável: `NODE_VERSION=24`.
- Publicar somente após aprovação do profissional.
