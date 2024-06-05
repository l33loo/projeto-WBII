"use strict";

const btnNovoJogo = document.querySelector(".btn-novo-jogo");
const ecraInicial = document.querySelector(".ecra-inicial");
const dificuldade = document.querySelector(".dificuldade");
const btnVoltar = document.querySelector(".btn-voltar");
const btnFacil = document.querySelector(".btn-facil");
const jogo = document.querySelector(".jogo");
const gridJogoFacil = document.querySelector(".grid-jogo-facil");
const gridJogoDificil = document.querySelector(".grid-jogo-dificil");
const timer = document.querySelector(".timer");
let cartas;
let pairsFound = 0;
let primeiraCarta;
let secundaCarta;
let timeLeft;
let countDown;
const btnTerminarJogo = document.querySelector(".btn-terminar-jogo");
const mensagemVitoriaEl = document.querySelector(".mensagem-vitoria");
const btnNovoJogoVitoria = mensagemVitoriaEl.querySelector("button");
const mensagemDerrotaEl = document.querySelector(".mensagem-derrota");
const btnNovoJogoDerrota = mensagemDerrotaEl.querySelector("button");

// ECRÃ INICIAL
btnNovoJogo.addEventListener("click", () => {
  ecraInicial.classList.add("hide");
  dificuldade.classList.remove("hide");
});

// ESCOLHA DA DIFICULDADE
btnVoltar.addEventListener("click", () => {
  dificuldade.classList.add("hide");
  ecraInicial.classList.remove("hide");
});

// Facil
btnFacil.addEventListener(
  "click",
  () => {
    cartas = gridJogoFacil.querySelectorAll(".carta");
    gridJogoFacil.append(...shuffleArray(cartas));
    dificuldade.classList.add("hide");
    jogo.classList.remove("hide");
    jogo.style["display"] = "flex";
    gridJogoFacil.style["display"] = "grid";
    gridJogoFacil.classList.remove("hide");
    gridJogoDificil.style["display"] = "none";
    // let timeLeft = 60;
    timeLeft = 15;
    timer.textContent = timeLeft;
    countDown = setInterval(timerInterval, 1000);

    cartas.forEach((carta) => {
      carta.addEventListener(
        "click",
        (event) => {
          // Get other event listener in HTML file to be ignored
          event.stopPropagation();

          // Cannot unflip a card
          if (carta.classList.contains("flip")) {
            return;
          }

          // Cannot flip other cards when two are already flipped
          if (!!primeiraCarta && !!secundaCarta) {
            return;
          }

          // Cannot unflip a card that is part of a matched pair
          if (carta.classList.contains("matched")) {
            return;
          }

          carta.classList.toggle("flip");

          // First card is being flipped
          if (!primeiraCarta) {
            primeiraCarta = carta;
            return;
          }

          // Second card is being flipped
          secundaCarta = carta;

          // The two cards are a match
          if (carta.classList.value === primeiraCarta.classList.value) {
            primeiraCarta.classList.add("matched");
            carta.classList.add("matched");
            pairsFound++;

            // Don't let players flip new cards right away
            const timeoutMatched = setTimeout(() => {
              primeiraCarta = null;
              secundaCarta = null;

              clearTimeout(timeoutMatched);
            }, 100);

            // WIN
            if (pairsFound === 3) {
              clearTimer();

              const timeoutWin = setTimeout(() => {
                mensagemVitoriaEl.classList.remove("hide");
                btnTerminarJogo.classList.add("hide");
                timer.classList.add("hide");
                // clear cards
                cartas.forEach((carta) => {
                  carta.classList.remove("flip");
                  carta.classList.remove("matched");
                });
                clearTimeout(timeoutWin);
              }, 2000);
            }
            return;
          }

          // Cards are not a match
          const timeoutFlip = setTimeout(() => {
            primeiraCarta.classList.remove("flip");
            carta.classList.remove("flip");
            primeiraCarta = null;
            secundaCarta = null;

            clearTimeout(timeoutFlip);
          }, 1200);
        },
        // Get other event listener in HTML file to be ignored
        true
      );
    });
  },
  true
);

// TERMINAR JOGO
btnTerminarJogo.addEventListener("click", () => {
  clearTimer();
  jogo.classList.add("hide");
  jogo.style["display"] = "none";
  gridJogoFacil.classList.remove("hide");
  gridJogoFacil.style["display"] = "grid";
  gridJogoDificil.classList.add("hide");
  gridJogoDificil.style["display"] = "none";
  ecraInicial.classList.remove("hide");

  // clear game
  pairsFound = 0;
  primeiraCarta = null;
  secundaCarta = null;
  timeLeft = null;
  cartas.forEach((carta) => {
    carta.classList.remove("flip");
    carta.classList.remove("matched");
  });
});

// MENSAGEM VITÓRIA
btnNovoJogoVitoria.addEventListener("click", () => {
  // clear game
  pairsFound = 0;
  primeiraCarta = null;
  secundaCarta = null;
  timeLeft = null;
  jogo.classList.add("hide");
  jogo.style["display"] = "none";
  mensagemVitoriaEl.classList.add("hide");
  dificuldade.classList.remove("hide");
  btnTerminarJogo.classList.remove("hide");
  timer.classList.remove("hide");
});

// MENSAGEM DERROTA
btnNovoJogoDerrota.addEventListener("click", () => {
  // clear game
  pairsFound = 0;
  primeiraCarta = null;
  secundaCarta = null;
  timeLeft = null;
  jogo.classList.add("hide");
  jogo.style["display"] = "none";
  gridJogoFacil.classList.add("hide");
  gridJogoFacil.style["display"] = "none";
  mensagemDerrotaEl.classList.add("hide");
  dificuldade.classList.remove("hide");
  btnTerminarJogo.classList.remove("hide");
  timer.classList.remove("hide");
});

// Durstenfeld shuffle
const shuffleArray = (array) => {
  const newArray = new Array();
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    newArray.push(array[j]);
  }
  return newArray;
};

const timerInterval = () => {
  if (timeLeft <= 0) {
    // LOSE
    if (pairsFound < 3) {
      btnTerminarJogo.classList.add("hide");
      timer.classList.add("hide");
      mensagemDerrotaEl.classList.remove("hide");
      cartas.forEach((carta) => {
        carta.classList.remove("flip");
        carta.classList.remove("matched");
      });
    }
    clearTimer();
    return;
  }
  timeLeft--;
  timer.textContent = timeLeft;
};

const clearTimer = () => {
  clearInterval(countDown);
  // countDown = null;
};
