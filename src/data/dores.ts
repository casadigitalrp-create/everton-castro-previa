/**
 * Dores comuns de quem precisa ir ao dentista, na voz do paciente, e como o atendimento responde a cada uma.
 * Base: pesquisas e artigos sobre ansiedade e medo odontológico, custo como motivo de adiar o tratamento,
 * confiança e comunicação com o profissional, e adiar a consulta até a dor aparecer.
 * Veja docs/pesquisa-dores-e-regras.md. As respostas descrevem o MODELO DE ATENDIMENTO e precisam ser
 * confirmadas com o profissional. Nada aqui promete resultado, prazo ou valor.
 */
export interface Dor {
  id: string;
  frase: string;
  solucaoTitulo: string;
  solucao: string;
  link?: { href: string; rotulo: string };
  /** Caminho SVG (traço 24×24) do ícone. */
  icone: string;
}

export const dores: readonly Dor[] = [
  {
    id: "dor",
    frase: "Tenho medo de sentir dor.",
    solucaoTitulo: "Conforto em primeiro lugar",
    solucao:
      "Explico cada passo antes de fazer, combinamos um sinal para pausar a qualquer momento e uso anestesia quando indicada.",
    icone: "M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10Z",
  },
  {
    id: "vergonha",
    frase: "Faz tempo que não vou ao dentista e tenho vergonha.",
    solucaoTitulo: "Sem julgamento",
    solucao:
      "Ninguém precisa justificar o tempo que ficou longe. Começamos pelo que você precisa, no seu ritmo, e seguimos juntos.",
    icone:
      "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM8 14.5c1 1.2 2.4 1.8 4 1.8s3-.6 4-1.8M9 10h.01M15 10h.01",
  },
  {
    id: "custo",
    frase: "Tenho medo de o tratamento custar mais do que eu espero.",
    solucaoTitulo: "Plano e orçamento antes",
    solucao:
      "Depois do exame, explico o que precisa ser feito e apresento o orçamento por escrito, antes de começar. Nada é feito sem a sua concordância.",
    icone: "M6 3h9l4 4v14H6zM14 3v5h5M9 13h6M9 17h6",
  },
  {
    id: "necessidade",
    frase: "Não sei se preciso mesmo de tudo isso.",
    solucaoTitulo: "Prioridades e alternativas",
    solucao:
      "Mostro o que é urgente, o que pode esperar e quais são as opções, para você decidir bem informado.",
    icone: "M12 3v18M5 7h14M5 7l-2.5 7a3.5 3.5 0 0 0 7 0L7 7M19 7l-2.5 7a3.5 3.5 0 0 0 7 0L21 7",
  },
  {
    id: "juridiques",
    frase: "Não entendo o que o dentista fala.",
    solucaoTitulo: "Palavras simples",
    solucao:
      "Explico os termos com exemplos do dia a dia. Se algo ficar confuso, pode perguntar de novo, sem pressa.",
    link: { href: "#glossario", rotulo: "Ver o glossário" },
    icone: "M4 5.5h16v10H12l-4.5 3.5V15.5H4zM8 9.5h8M8 12h5",
  },
  {
    id: "comeco",
    frase: "Não sei o que levar nem como é a primeira consulta.",
    solucaoTitulo: "Prepare sua consulta",
    solucao:
      "Escolha o motivo da visita e veja uma lista geral do que levar e de perguntas para fazer. Você chega mais tranquilo.",
    link: { href: "#preparar", rotulo: "Abrir a ferramenta" },
    icone: "M9 4h6l1 2h3v14H5V6h3zM9 13l2 2 4-4",
  },
];
