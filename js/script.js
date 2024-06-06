"use strict";

const btnNovoJogo = document.querySelector(".btn-novo-jogo");
const ecraInicial = document.querySelector(".ecra-inicial");
// Fix typo in img src
ecraInicial.querySelector(".logo-inicio").src = "img/Memodaw.png";
const dificuldade = document.querySelector(".dificuldade");
const btnVoltar = document.querySelector(".btn-voltar");
const btnFacil = document.querySelector(".btn-facil");
const btnDificil = document.querySelector(".btn-dificil");
const jogo = document.querySelector(".jogo");
const gridJogoFacil = document.querySelector(".grid-jogo-facil");
const cartasFacil = gridJogoFacil.querySelectorAll(".carta");
const gridJogoDificil = document.querySelector(".grid-jogo-dificil");
const cartasDificil = gridJogoDificil.querySelectorAll(".carta");
const timer = document.querySelector(".timer");
const btnTerminarJogo = document.querySelector(".btn-terminar-jogo");
const mensagemVitoriaEl = document.querySelector(".mensagem-vitoria");
const btnNovoJogoVitoria = mensagemVitoriaEl.querySelector("button");
const mensagemDerrotaEl = document.querySelector(".mensagem-derrota");
const btnNovoJogoDerrota = mensagemDerrotaEl.querySelector("button");
let cartas;
let pairsFound = 0;
let primeiraCarta;
let secundaCarta;
let timeLeft;
let countDown;

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

// JOGO FÁCIL
btnFacil.addEventListener("click", playGame, true);

// JOGO DIFÍCIL
btnDificil.addEventListener(
  "click",
  () => {
    playGame(false);
  },
  true
);

// TERMINAR JOGO
btnTerminarJogo.addEventListener("click", () => {
  clearTimer();
  resetCards();
  clearGameAndGoToNextStage(ecraInicial);
});

// MENSAGEM VITÓRIA
btnNovoJogoVitoria.addEventListener("click", () => {
  clearGameAndGoToNextStage(dificuldade);
  mensagemVitoriaEl.classList.add("hide");
});

// MENSAGEM DERROTA
btnNovoJogoDerrota.addEventListener("click", () => {
  clearGameAndGoToNextStage(dificuldade);
  mensagemDerrotaEl.classList.add("hide");
});

// Functions
function playGame($isGameModeFacil = true) {
  const gridJogo = $isGameModeFacil ? gridJogoFacil : gridJogoDificil;
  cartas = $isGameModeFacil ? cartasFacil : cartasDificil;
  gridJogo.append(...shuffleArray(cartas));
  dificuldade.classList.add("hide");
  jogo.classList.remove("hide");
  jogo.style["display"] = "flex";
  gridJogo.style["display"] = "grid";
  gridJogo.classList.remove("hide");
  btnTerminarJogo.classList.remove("hide");
  timer.classList.remove("hide");

  if ($isGameModeFacil) {
    gridJogoDificil.style["display"] = "none";
  } else {
    gridJogoFacil.style["display"] = "none";
  }

  timeLeft = $isGameModeFacil ? 60 : 30;
  timer.textContent = timeLeft;
  countDown = setInterval(() => {
    // LOSE
    if (timeLeft <= 0 && pairsFound < cartas.length / 2) {
      btnTerminarJogo.classList.add("hide");
      timer.classList.add("hide");
      mensagemDerrotaEl.classList.remove("hide");
      resetCards();
      clearTimer();
      return;
    }
    timeLeft--;
    timer.textContent = timeLeft;
  }, 1000);

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
          if (pairsFound === cartas.length / 2) {
            clearTimer();
            btnTerminarJogo.classList.add("hide");

            const timeoutWin = setTimeout(() => {
              mensagemVitoriaEl.classList.remove("hide");
              timer.classList.add("hide");
              resetCards();
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
}

function clearGameAndGoToNextStage(next) {
  countDown = null;
  pairsFound = 0;
  primeiraCarta = null;
  secundaCarta = null;

  jogo.classList.add("hide");
  jogo.style["display"] = "none";
  gridJogoFacil.classList.add("hide");
  gridJogoFacil.style["display"] = "none";
  gridJogoDificil.classList.add("hide");
  gridJogoDificil.style["display"] = "none";

  next.classList.remove("hide");
}

function resetCards() {
  cartas.forEach((carta) => {
    carta.classList.remove("flip");
    carta.classList.remove("matched");
  });
}

function clearTimer() {
  timeLeft = null;
  clearInterval(countDown);
}

// Durstenfeld shuffle
function shuffleArray(array) {
  const shuffledArray = new Array();
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    shuffledArray.push(array[j]);
  }
  return shuffledArray;
}
