import type { ImageMetadata } from "astro";
import anfora from "../assets/fundos/fundo_anfora_dourada.jpg";
import colunasJonicas from "../assets/fundos/fundo_colunas_jonicas.jpg";
import dente from "../assets/fundos/fundo_dente_marmore.jpg";
import louro from "../assets/fundos/fundo_louro_dourado.jpg";
import sorriso from "../assets/fundos/fundo_sorriso_louro.jpg";
import templo from "../assets/fundos/fundo_templo_colunas.jpg";
import retrato from "../assets/fundos/retrato_provisorio.jpg";

/**
 * Imagens do site (src/assets/fundos/). Hoje são PROVISÓRIAS, geradas por scripts/gerar-imagens.mjs.
 * Para trocar pelas finais, salve os arquivos por cima com os mesmos nomes (veja docs/prompts-imagens.md).
 * São ilustrações conceituais: nenhuma mostra paciente, tratamento ou resultado real.
 */
export const fundos = {
  templo,
  dente,
  louro,
  anfora,
  colunasJonicas,
  sorriso,
  retrato,
} as const satisfies Record<string, ImageMetadata>;

/** Fundos que se alternam na Hero, na ordem de exibição. */
export const fundosHero = [
  { imagem: fundos.templo, titulo: "Clareza" },
  { imagem: fundos.dente, titulo: "Cuidado" },
  { imagem: fundos.louro, titulo: "Acolhimento" },
  { imagem: fundos.anfora, titulo: "Tradição" },
  { imagem: fundos.colunasJonicas, titulo: "Equilíbrio" },
] as const;
