/**
 * Listas GERAIS para a ferramenta "Prepare sua consulta". São informativas: cada pessoa tem particularidades e o
 * profissional pode pedir outros dados ou exames. Não é diagnóstico nem orientação de tratamento.
 */
export interface Motivo {
  id: string;
  nome: string;
  exemplo: string;
  itens: readonly string[];
  perguntas: readonly string[];
  /** Aviso de segurança exibido no topo da lista, quando faz sentido. */
  aviso?: string;
}

const perguntasGerais = [
  "O que é urgente e o que pode esperar?",
  "Quais são as opções e o que muda entre elas?",
  "Como serão as etapas e o orçamento?",
] as const;

export const motivos: readonly Motivo[] = [
  {
    id: "dor",
    nome: "Dor ou urgência",
    exemplo: "Dor de dente, dente quebrado, sangramento",
    aviso:
      "Se houver inchaço no rosto, febre, dificuldade para engolir ou para respirar, procure imediatamente um serviço de urgência médica.",
    itens: [
      "Documento de identificação com foto",
      "Quando a dor começou e o que a piora ou alivia",
      "Lista de medicamentos que você usa, inclusive os tomados para a dor",
      "Alergias conhecidas (anestésicos, antibióticos, látex)",
      "Exames ou radiografias anteriores, se tiver",
    ],
    perguntas: [
      "Qual é a causa provável e o que precisa ser feito primeiro?",
      "Existe algo para aliviar agora e outra solução para resolver de vez?",
      "O que devo evitar até o retorno?",
      "Como e quando devo voltar?",
    ],
  },
  {
    id: "prevencao",
    nome: "Prevenção e limpeza",
    exemplo: "Check-up, limpeza, orientação de higiene",
    itens: [
      "Documento de identificação com foto",
      "Lista de medicamentos e doenças que você tem",
      "Radiografias ou exames anteriores, se tiver",
      "Escova, fio dental e enxaguante que usa hoje (nomes ou fotos)",
    ],
    perguntas: [
      "Minha escovação e o uso do fio dental estão adequados?",
      "Com que frequência devo voltar?",
      "Há algum ponto que merece atenção especial?",
    ],
  },
  {
    id: "estetica",
    nome: "Estética do sorriso",
    exemplo: "Cor, forma, clareamento, facetas",
    itens: [
      "Fotos de sorrisos de que você gosta, como referência",
      "Lista de medicamentos e doenças que você tem",
      "Radiografias ou exames anteriores, se tiver",
      "Histórico de tratamentos estéticos que já fez",
    ],
    perguntas: [
      "Meus dentes e gengivas estão saudáveis para este tipo de tratamento?",
      "Quais são as opções, as vantagens e as limitações de cada uma?",
      "Que cuidados terei depois?",
    ],
  },
  {
    id: "aparelho",
    nome: "Aparelho e alinhamento",
    exemplo: "Dentes tortos, mordida, aparelho",
    itens: [
      "Fotos, modelos ou radiografias anteriores, se tiver",
      "Histórico de aparelho usado antes",
      "Lista de medicamentos e doenças que você tem",
      "Nome do dentista anterior, se quiser que eu peça informações",
    ],
    perguntas: [
      "Que opções de aparelho existem para o meu caso?",
      "Como funcionam os retornos e a higiene durante o tratamento?",
      "Será necessário encaminhamento a um especialista?",
    ],
  },
  {
    id: "falta",
    nome: "Dente faltando ou prótese",
    exemplo: "Perda de dente, prótese, implante",
    itens: [
      "Radiografias, tomografias ou exames anteriores",
      "Documentos de tratamentos anteriores (prótese, implante)",
      "Lista de medicamentos e doenças (diabetes, osteoporose, uso de anticoagulantes)",
      "Informação sobre hábito de fumar",
    ],
    perguntas: [
      "Que opções existem para repor o dente e em que elas diferem?",
      "É preciso tratar algo antes (gengiva, cárie)?",
      ...perguntasGerais.slice(2),
    ],
  },
];
