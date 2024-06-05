"use strict";

const btnNovoJogo = document.querySelector(".btn-novo-jogo");
const ecraInicial = document.querySelector(".ecra-inicial");
const dificuldade = document.querySelector(".dificuldade");
const btnTerminarJogo = document.querySelector(".btn-terminar-jogo");
const mensagemVitoriaEl = document.querySelector(".mensagem-vitoria");
const btnNovoJogoVitoria = mensagemVitoriaEl.querySelector("button");
const mensagemDerrotaEl = document.querySelector(".mensagem-derrota");
const btnNovoJogoDerrota = mensagemDerrotaEl.querySelector("button");
let cartas;

// ECRÃ INICIAL
btnNovoJogo.addEventListener("click", () => {
  ecraInicial.classList.add("hide");
  dificuldade.classList.remove("hide");
});

// ESCOLHA DA DIFICULDADE
const btnVoltar = document.querySelector(".btn-voltar");
btnVoltar.addEventListener("click", () => {
  dificuldade.classList.add("hide");
  ecraInicial.classList.remove("hide");
});

const jogo = document.querySelector(".jogo");
const gridJogoFacil = document.querySelector(".grid-jogo-facil");
const gridJogoDificil = document.querySelector(".grid-jogo-dificil");
const timer = document.querySelector(".timer");
let pairsFound = 0;
let primeiraCarta;
let secundaCarta;
let timeLeft;
let countDown;

// Facil
const btnFacil = document.querySelector(".btn-facil");
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
      // if (timeLeft <= 0) {
      //   return;
      // }

      carta.addEventListener(
        "click",
        (event) => {
          event.stopPropagation();

          if (carta.classList.contains("flip")) {
            return;
          }

          if (!!primeiraCarta && !!secundaCarta) {
            return;
          }

          if (carta.classList.contains("matched")) {
            console.log("CONTAINS `MATCHED`!!!");
            return;
          }

          carta.classList.toggle("flip");

          if (!primeiraCarta) {
            primeiraCarta = carta;
            return;
          }

          secundaCarta = carta;

          if (carta.classList.value === primeiraCarta.classList.value) {
            primeiraCarta.classList.add("matched");
            carta.classList.add("matched");
            pairsFound++;

            const timeoutMatched = setTimeout(() => {
              primeiraCarta = null;
              secundaCarta = null;

              clearTimeout(timeoutMatched);
            }, 100);

            if (pairsFound === 3) {
              clearTimer();
              console.log(`WIN! pairs found: ${pairsFound}`);
              //WIN!

              //TODO: flip cards and hide timer and
              // clearInterval(countDown);
              const timeoutWin = setTimeout(() => {
                console.log("WIN!");
                // gridJogoFacil.classList.toggle("hide");
                mensagemVitoriaEl.classList.remove("hide");
                btnTerminarJogo.classList.add("hide");
                timer.classList.add("hide");
                // clear game
                cartas.forEach((carta) => {
                  carta.classList.remove("flip");
                  carta.classList.remove("matched");
                });
                clearTimeout(timeoutWin);
              }, 2000);
            }
            return;
          }

          const timeoutFlip = setTimeout(() => {
            console.log("this is the third message");
            primeiraCarta.classList.remove("flip");
            carta.classList.remove("flip");
            primeiraCarta = null;
            secundaCarta = null;

            clearTimeout(timeoutFlip);
          }, 1200);

          console.log("FLIP!");
        },
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
  // TODO: Maybe just target the latest game mode
  // const cartas = document.querySelectorAll(".carta");
  cartas.forEach((carta) => {
    carta.classList.remove("flip");
    carta.classList.remove("matched");
  });
});

// MENSAGEM VITÓRIA
btnNovoJogoVitoria.addEventListener("click", () => {
  primeiraCarta = null;
  secundaCarta = null;
  pairsFound = 0;
  jogo.classList.add("hide");
  jogo.style["display"] = "none";
  mensagemVitoriaEl.classList.add("hide");
  dificuldade.classList.remove("hide");
  btnTerminarJogo.classList.remove("hide");
  timer.classList.remove("hide");
});

// MENSAGEM DERROTA
btnNovoJogoDerrota.addEventListener("click", () => {
  primeiraCarta = null;
  secundaCarta = null;
  pairsFound = 0;
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
  console.log("TIMER!!!");
  if (timeLeft <= 0) {
    if (pairsFound < 3) {
      // LOSE
      // if ()
      // const btnNovoJogo = mensagemDerrotaEl.querySelector("button");
      // btnNovoJogo.addEventListener("click", () => {
      //   // clear game
      //   pairsFound = 0;

      // TODO: flip all cards, remove clock and btn
      btnTerminarJogo.classList.add("hide");
      timer.classList.add("hide");
      mensagemDerrotaEl.classList.remove("hide");
      cartas.forEach((carta) => {
        carta.classList.remove("flip");
        carta.classList.remove("matched");
      });

      //   dificuldade.classList.toggle("hide");
      // });
      // }
    }
    clearTimer();
    return;
  }
  timeLeft--;
  timer.textContent = timeLeft;
};

const clearTimer = () => {
  clearInterval(countDown);
  countDown = null;
};
