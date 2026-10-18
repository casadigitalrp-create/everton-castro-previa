/*
 * Comportamentos dos efeitos visuais da V2. Os estilos estão em src/styles/efeitos.css.
 * Tudo aqui é opcional: sem JavaScript o site continua completo, só sem estes detalhes.
 */

const mouseFino = matchMedia("(hover: hover) and (pointer: fine)");
const movimentoReduzido = matchMedia("(prefers-reduced-motion: reduce)");

// ---------- Escalonamento: numera os filhos para o atraso da entrada ----------
document.querySelectorAll<HTMLElement>("[data-escalonar]").forEach((pai) => {
  [...pai.children].forEach((filho, i) => {
    (filho as HTMLElement).style.setProperty("--i", String(i));
  });
});

// ---------- Brilho que segue o cursor (um único ouvinte para todos os cartões) ----------
if (mouseFino.matches) {
  let quadro = 0;
  document.addEventListener(
    "pointermove",
    (evento) => {
      if (evento.pointerType !== "mouse") return;
      const alvo = (evento.target as Element | null)?.closest<HTMLElement>("[data-spotlight]");
      if (!alvo) return;
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(() => {
        const caixa = alvo.getBoundingClientRect();
        alvo.style.setProperty("--x", `${evento.clientX - caixa.left}px`);
        alvo.style.setProperty("--y", `${evento.clientY - caixa.top}px`);
      });
    },
    { passive: true },
  );
}

// ---------- Inclinação 3D leve ----------
if (mouseFino.matches && !movimentoReduzido.matches) {
  const MAXIMO = 5; // graus
  document.querySelectorAll<HTMLElement>("[data-inclinar]").forEach((el) => {
    let quadro = 0;
    el.addEventListener(
      "pointermove",
      (evento) => {
        if (evento.pointerType !== "mouse") return;
        cancelAnimationFrame(quadro);
        quadro = requestAnimationFrame(() => {
          const caixa = el.getBoundingClientRect();
          const nx = (evento.clientX - caixa.left) / caixa.width - 0.5;
          const ny = (evento.clientY - caixa.top) / caixa.height - 0.5;
          el.dataset.inclinando = "";
          el.style.transform = `perspective(1000px) rotateX(${(-ny * MAXIMO * 2).toFixed(2)}deg) rotateY(${(nx * MAXIMO * 2).toFixed(2)}deg)`;
        });
      },
      { passive: true },
    );
    el.addEventListener("pointerleave", () => {
      cancelAnimationFrame(quadro);
      delete el.dataset.inclinando;
      el.style.transform = "";
    });
  });
}

// ---------- Botão magnético: puxa levemente em direção ao cursor ----------
if (mouseFino.matches && !movimentoReduzido.matches) {
  const botoes = [...document.querySelectorAll<HTMLElement>("[data-magnetico]")];
  const RAIO = 90; // px ao redor do botão em que o efeito começa
  const FORCA = 0.28;
  const LIMITE = 9; // px de deslocamento máximo
  let quadro = 0;
  const limitar = (v: number) => Math.max(-LIMITE, Math.min(LIMITE, v));
  if (botoes.length > 0) {
    window.addEventListener(
      "pointermove",
      (evento) => {
        if (evento.pointerType !== "mouse") return;
        cancelAnimationFrame(quadro);
        quadro = requestAnimationFrame(() => {
          for (const botao of botoes) {
            const caixa = botao.getBoundingClientRect();
            const dx = evento.clientX - (caixa.left + caixa.width / 2);
            const dy = evento.clientY - (caixa.top + caixa.height / 2);
            const perto =
              Math.abs(dx) < caixa.width / 2 + RAIO && Math.abs(dy) < caixa.height / 2 + RAIO;
            if (perto) {
              botao.dataset.puxando = "";
              botao.style.transform = `translate(${limitar(dx * FORCA).toFixed(1)}px, ${limitar(dy * FORCA).toFixed(1)}px)`;
            } else if (botao.dataset.puxando !== undefined) {
              delete botao.dataset.puxando;
              botao.style.transform = "";
            }
          }
        });
      },
      { passive: true },
    );
  }
}

// ---------- Números que contam até o valor medido ao aparecerem ----------
const contadores = [...document.querySelectorAll<HTMLElement>("[data-contar]")];
if (contadores.length > 0 && "IntersectionObserver" in window && !movimentoReduzido.matches) {
  const DURACAO = 1200;
  const animar = (el: HTMLElement) => {
    const fim = Number(el.dataset.contar);
    if (!Number.isFinite(fim)) return;
    const inicio = performance.now();
    const passo = (agora: number) => {
      const progresso = Math.min((agora - inicio) / DURACAO, 1);
      el.textContent = String(Math.round(fim * (1 - (1 - progresso) ** 3)));
      if (progresso < 1) requestAnimationFrame(passo);
      else el.textContent = String(fim);
    };
    requestAnimationFrame(passo);
  };
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        animar(entrada.target as HTMLElement);
        observador.unobserve(entrada.target);
      }
    },
    { threshold: 0.6 },
  );
  contadores.forEach((el) => {
    // O valor final fica no HTML (para quem não tem JavaScript); aqui só zeramos antes da contagem.
    el.textContent = "0";
    observador.observe(el);
  });
}
