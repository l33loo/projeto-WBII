"use strict";

document.addEventListener("DOMContentLoaded", () => {
  console.log("HELLO <3");
  const btnNovoJogo = document.querySelector(".btn-novo-jogo");
  const ecraInicial = document.querySelector(".ecra-inicial");
  const dificuldade = document.querySelector(".dificuldade");
  const mensagemVitoria = document.querySelector(".mensagem-vitoria");

  // ECRÃ INICIAL
  btnNovoJogo.addEventListener("click", () => {
    ecraInicial.classList.toggle("hide");
    dificuldade.classList.toggle("hide");
  });

  // ESCOLHA DA DIFICULDADE
  const btnVoltar = document.querySelector(".btn-voltar");
  btnVoltar.addEventListener("click", () => {
    dificuldade.classList.toggle("hide");
    ecraInicial.classList.toggle("hide");
  });

  const jogo = document.querySelector(".jogo");
  const gridJogoFacil = document.querySelector(".grid-jogo-facil");
  const gridJogoDificil = document.querySelector(".grid-jogo-dificil");
  const timer = document.querySelector(".timer");

  // Facil
  const btnFacil = document.querySelector(".btn-facil");
  btnFacil.addEventListener("click", () => {
    const cartas = gridJogoFacil.querySelectorAll(".carta");
    gridJogoFacil.append(...shuffleArray(cartas));
    const cartasShuffled = gridJogoFacil.querySelectorAll(".carta");
    dificuldade.classList.toggle("hide");
    jogo.classList.toggle("hide");
    jogo.style["display"] = "flex";
    gridJogoDificil.style["display"] = "none";
    let timeLeft = 60;
    timer.textContent = timeLeft;
    let pairsFound = 0;
    const countDown = setInterval(() => {
      console.log("TIMER!!!");
      if (timeLeft <= 0) {
        clearInterval(countDown);
        if (pairsFound < 3) {
          gridJogoFacil.classList.toggle("hide");
          document.querySelector(".mensagem-derrota").classList.toggle("hide");
          return;
        }
        return;
      }
      timeLeft--;
      timer.textContent = timeLeft;
    }, 1000);

    let primeiraCarta;
    let secundaCarta;
    cartasShuffled.forEach((carta) => {
      if (timeLeft <= 0) {
        return;
      }

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

        if (!primeiraCarta) {
          carta.classList.toggle("flip");
          primeiraCarta = carta;
          return;
        }

        carta.classList.toggle("flip");
        secundaCarta = carta;

        if (carta.classList.value === primeiraCarta.classList.value) {
          primeiraCarta.classList.add("matched");
          carta.classList.add("matched");
          pairsFound++;
          primeiraCarta = null;
          secundaCarta = null;

          if (pairsFound === 3) {
            //WIN!
            clearInterval(countDown);
            const timeoutWin = setTimeout(() => {
              console.log("WIN!");
              gridJogoFacil.classList.toggle("hide");
              document
                .querySelector(".mensagem-vitoria")
                .classList.toggle("hide");
              clearTimeout(timeoutWin);
            }, 2000);
          }
          return;
        }

        const timeoutFlip = setTimeout(() => {
          console.log("this is the third message");
          primeiraCarta.classList.toggle("flip");
          carta.classList.toggle("flip");
          primeiraCarta = null;
          secundaCarta = null;

          clearTimeout(timeoutFlip);
        }, 2000);

        console.log("FLIP!");
      });
    });

    // while (timeLeft >= 0) {
    //   if (pairsFound === 3) {
    //     jogo.classList.toggle("hide");
    //     mensagemVitoria.classList.toggle("hide");
    //   }
    // }
  });

  // Dificil
  const btnDificil = document.querySelector(".btn-dificil");
  btnDificil.addEventListener("click", () => {
    const cartas = gridJogoDificil.querySelectorAll(".carta");
    gridJogoDificil.append(...shuffleArray(cartas));
    dificuldade.classList.toggle("hide");
    jogo.classList.toggle("hide");
    jogo.style["display"] = "flex";
    gridJogoFacil.classList.toggle("hide");
    gridJogoFacil.style["display"] = "none";
    gridJogoDificil.classList.toggle("hide");
    let timeLeft = 30;
    timer.textContent = timeLeft;
    const countDown = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(countDown);
        gridJogoFacil.classList.toggle("hide");
        document.querySelector(".mensagem-derrota").classList.toggle("hide");
        return;
      }
      timeLeft--;
      timer.textContent = timeLeft;
    }, 1000);
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
