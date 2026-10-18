# Prompts das imagens do site (Everton Castro | Cirurgião-dentista)

O site já funciona com imagens **provisórias** (geradas por `node scripts/gerar-imagens.mjs`). Para usar as finais,
gere cada uma com os prompts abaixo e salve em `src/assets/fundos/` **com o mesmo nome**, sobrescrevendo a provisória.
O Astro otimiza (AVIF e WebP, vários tamanhos) no build, então pode salvar o JPG grande.

## Configurações

- Proporção **16:9**, 2200 × 1228 px ou maior. JPG, qualidade alta.
- Gere 3 a 4 variações de cada e escolha a melhor.
- Descarte imagens com **letras, números ou logotipos**. Evite também fotos de pessoas, bocas, instrumentos, equipamentos
  ou tecidos: a Resolução CFO-196/2019 proíbe imagens que permitam identificar equipamentos, instrumentais, materiais e
  tecidos biológicos. As ilustrações abaixo usam dentes apenas como escultura de mármore, sem nada clínico.
- As imagens 1 a 5 são fundos: o assunto fica na **metade direita** e o lado esquerdo fica claro e calmo, onde entra o
  texto. A imagem 6 é uma ilustração central, usada em cartão.

## Prompt base (cole no início de cada um)

```
Premium elegant editorial illustration in the spirit of classical Greece, bright ivory and white Carrara marble with delicate warm-gold veining, polished brushed gold accents (#B8893A, #E3C98C), soft natural light, airy and calm mood, light cream background (#FBF9F4), subtle shadows, wide 16:9 format, ultra detailed, high key. Composition: main subject placed in the right 60% of the frame, the left 40% left bright, calm and mostly empty for headline text overlay. No text, no letters, no numbers, no logos, no watermark, no people, no mouths, no dental instruments, no medical equipment.
```

## 1. Templo de colunas dóricas — `fundo_templo_colunas.jpg` · Hero e imagem de compartilhamento

```
[PROMPT BASE]. Scene: a small classical Greek temple front in white marble with four fluted Doric columns, a triangular pediment outlined in gold, a frieze with triglyphs, and three wide steps, bathed in soft golden morning light.
```

## 2. Dente em mármore — `fundo_dente_marmore.jpg` · Hero

```
[PROMPT BASE]. Scene: a smooth sculpture of a molar tooth carved from white marble with fine gold veins, resting on a low marble pedestal with gold trim, small golden laurel branches at its base, like a museum statue. Pure sculpture, no clinical details.
```

## 3. Coroa de louro — `fundo_louro_dourado.jpg` · Hero

```
[PROMPT BASE]. Scene: a golden laurel wreath around a polished marble disc with a thin Greek key (meander) band across it and a small marble tooth emblem at the center, soft glow behind it, like a classical medal.
```

## 4. Ânfora dourada — `fundo_anfora_dourada.jpg` · Hero

```
[PROMPT BASE]. Scene: an elegant Greek amphora in ivory marble with two gold handles and gold Greek key meander bands around the belly and the foot, soft highlight on its surface, standing on a pale marble floor.
```

## 5. Colunas jônicas — `fundo_colunas_jonicas.jpg` · Hero e seção "A consulta"

```
[PROMPT BASE]. Scene: two tall white marble Ionic columns with gold-edged volute capitals standing on wide steps, with warm golden light glowing between them, suggesting calm and balance.
```

## 6. Sorriso em louro — `fundo_sorriso_louro.jpg` · cartão de contato (ilustração central)

```
[PROMPT BASE, but center the subject]. Scene: a golden laurel wreath enclosing a smile-shaped arc made of eight rounded white marble tiles, like stylized teeth, with a thin gold curve beneath. Symbolic and decorative, not realistic.
```

## 7. Foto do dentista — `retrato_provisorio.jpg`

Não gere por IA. Use uma **foto real** do Everton, em formato retrato (proporção 5:6, mínimo 1000 × 1200 px), com
fundo claro e neutro, jaleco ou roupa sóbria. Evite mostrar instrumentos ou pacientes. Salve com o mesmo nome
(`retrato_provisorio.jpg`) e ajuste o texto alternativo em `src/components/Sobre.astro`.

## Textura de mármore e imagem de compartilhamento

- `public/marmore-a.jpg` é a textura usada como fundo das seções em mármore (classe `.fundo-marmore`). Pode ser trocada
  por uma foto de mármore claro (1800 × 1000 px), de preferência com veios discretos para não competir com o texto.
- `public/og.jpg` (1200 × 630 px) é a imagem de compartilhamento. Recorte-a da imagem 1.

## Depois de gerar

1. Salve os arquivos em `src/assets/fundos/` (e em `public/` quando for textura ou compartilhamento).
2. Rode `pnpm build` e confira com `pnpm preview`.
3. Ajuste os textos alternativos (`alt`) se a imagem final mostrar algo diferente do descrito.
