// Todo o conteúdo editável do site fica em src/data. Itens marcados como PROVISÓRIO são EXEMPLOS e devem
// ser confirmados com o profissional antes de publicar (a página mostra um aviso visível ao lado de cada um).

export const site = {
  nome: "Everton Castro",
  titulo: "Cirurgião-dentista",
  /** PROVISÓRIO: informar o número de inscrição real no Conselho Regional (CRO) e a sigla do estado. */
  cro: "CRO-UF 00000",
  formacao: "Universidade de Ribeirão Preto (UNAERP)",
  /** PROVISÓRIO: informar o ano de formatura e confirmar o texto. */
  anoFormatura: "ano a confirmar",
  /** PROVISÓRIO: somente dígitos, com DDI e DDD. */
  whatsapp: "5500000000000",
  whatsappExibicao: "(00) 00000-0000",
  email: "contato@exemplo.com.br",
  /** PROVISÓRIO: cidade, endereço e horários. */
  cidade: "Cidade a confirmar",
  atendimento: "Atendimento com hora marcada",
  dominio: "https://casadigitalrp-create.github.io/everton-castro-previa/",
  descricao:
    "Cirurgião-dentista formado pela UNAERP. Atendimento acolhedor, explicação em palavras simples e plano combinado antes de começar. Conteúdo informativo, sem promessa de resultado.",
} as const;

export const whatsappLink = (
  mensagem = "Olá, Dr. Everton! Gostaria de agendar uma conversa sobre o meu atendimento.",
) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensagem)}`;

export const menu = [
  { href: "#cuidado", rotulo: "Cuidado" },
  { href: "#consulta", rotulo: "A consulta" },
  { href: "#preparar", rotulo: "Prepare-se" },
  { href: "#glossario", rotulo: "Glossário" },
  { href: "#areas", rotulo: "Atendimento" },
  { href: "#faq", rotulo: "Dúvidas" },
] as const;

/** Compromissos que passam na faixa abaixo da Hero. São o modelo de atendimento, a confirmar com o profissional. */
export const compromissos = [
  "Acolhimento sem pressa",
  "Explicação em palavras simples",
  "Plano e orçamento antes de começar",
  "Conforto no atendimento",
  "Sem promessa de resultado",
] as const;
