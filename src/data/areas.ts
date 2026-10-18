/**
 * Atendimento. PROVISÓRIO: confirmar com o profissional o que será divulgado. Pelo Código de Ética Odontológica,
 * áreas e técnicas só podem ser anunciadas com especialidade registrada no CRO ou com a qualificação de clínico
 * geral. O site usa "clínico geral" e não cita nenhuma especialidade.
 */
export const areas = [
  {
    nome: "Prevenção e limpeza",
    texto: "Check-up, limpeza profissional e orientação de higiene para o dia a dia.",
    icone: "M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3ZM9 12l2 2 4-4",
  },
  {
    nome: "Restaurações",
    texto: "Tratamento de cáries e reconstrução de dentes fraturados.",
    icone:
      "M7 4c2-1 3 1 5 1s3-2 5-1c2 1 2 5 1 8-.7 2.2-.8 6-2 8-1 1.500-2 .5-2-1.500 0-1.500-.5-3-2-3s-2 1.500-2 3c0 2-1 3-2 1.500-1.200-2-1.300-5.800-2-8-1-3-1-7 1-8Z",
  },
  {
    nome: "Estética do sorriso",
    texto: "Clareamento e outras opções para a cor e a forma dos dentes, após avaliação.",
    icone:
      "M12 3l1.8 5.200L19 10l-5.200 1.800L12 17l-1.800-5.200L5 10l5.200-1.800L12 3ZM18 16l.8 2.200L21 19l-2.200.8L18 22l-.8-2.200L15 19l2.200-.8L18 16Z",
  },
  {
    nome: "Aparelho e alinhamento",
    texto: "Avaliação e encaminhamento quando o caso pedir um especialista.",
    icone: "M3 12h18M6 8v8M10 7v10M14 7v10M18 8v8",
  },
  {
    nome: "Dentes perdidos",
    texto:
      "Avaliação das opções para repor dentes, como próteses, com encaminhamento quando necessário.",
    icone: "M12 21s-7-4.400-7-10a4 4 0 0 1 7-2.600A4 4 0 0 1 19 11c0 5.600-7 10-7 10Z",
  },
  {
    nome: "Atendimento de urgência",
    texto:
      "Orientação e cuidado inicial para dor e outros problemas que não podem esperar (a confirmar).",
    icone:
      "M12 8v5M12 16.500h.01M10.300 3.900 2.500 17.500A2 2 0 0 0 4.200 20.500h15.600a2 2 0 0 0 1.700-3L13.700 3.900a2 2 0 0 0-3.400 0Z",
  },
] as const;
