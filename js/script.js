"use strict";

document.addEventListener("DOMContentLoaded", () => {
  console.log("HELLO <3");
  const btnNovoJogo = document.querySelector(".btn-novo-jogo");
  const ecraInicial = document.querySelector(".ecra-inicial");
  const dificuldade = document.querySelector(".dificuldade");
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

  // Facil
  const btnFacil = document.querySelector(".btn-facil");
  btnFacil.addEventListener("click", () => {
    const cartas = gridJogoFacil.querySelectorAll(".carta");
    gridJogoFacil.append(...shuffleArray(cartas));
    const cartasShuffled = gridJogoFacil.querySelectorAll(".carta");
    dificuldade.classList.add("hide");
    jogo.classList.remove("hide");
    jogo.style["display"] = "flex";
    gridJogoFacil.style["display"] = "grid";
    gridJogoFacil.classList.remove("hide");
    gridJogoDificil.style["display"] = "none";
    // let timeLeft = 60;
    let timeLeft = 15;
    timer.textContent = timeLeft;
    const countDown = setInterval(() => {
      console.log("TIMER!!!");
      if (timeLeft <= 0) {
        // LOSE
        if (pairsFound < 3) {
          // const btnNovoJogo = mensagemDerrotaEl.querySelector("button");
          // btnNovoJogo.addEventListener("click", () => {
          //   // clear game
          //   pairsFound = 0;

          // TODO: flip all cards, remove clock and btn
          btnTerminarJogo.classList.add("hide");
          timer.classList.add("hide");
          mensagemDerrotaEl.classList.remove("hide");

          //   dificuldade.classList.toggle("hide");
          // });
        }
        clearInterval(countDown);
        return;
      }
      timeLeft--;
      timer.textContent = timeLeft;
    }, 1000);

    cartasShuffled.forEach((carta) => {
      // if (timeLeft <= 0) {
      //   return;
      // }

      carta.addEventListener("click", () => {
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
            console.log(`WIN! pairs found: ${pairsFound}`);
            //WIN!

            //TODO: flip cards and hide timer and
            clearInterval(countDown);
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
        }, 2000);

        console.log("FLIP!");
      });
    });
  });

  // TERMINAR JOGO
  btnTerminarJogo.addEventListener("click", () => {
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
    const cartas = document.querySelectorAll(".carta");
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
  });
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
