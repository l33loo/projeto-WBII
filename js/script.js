"use strict";

document.addEventListener("DOMContentLoaded", () => {
  console.log("HELLO <3");
  const btnNovoJogo = document.querySelector(".btn-novo-jogo");
  const ecraInicial = document.querySelector(".ecra-inicial");
  const dificuldade = document.querySelector(".dificuldade");
  const btnTerminarJogo = document.querySelector(".btn-terminar-jogo");
  const mensagemVictoriaEl = document.querySelector(".mensagem-vitoria");
  const btnNovoJogoVictoria = mensagemVictoriaEl.querySelector("button");
  const mensagemDerrotaEl = document.querySelector(".mensagem-derrota");
  const btnNovoJogoDerrota = mensagemDerrotaEl.querySelector("button");

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
  let pairsFound = 0;
  let primeiraCarta;
  let secundaCarta;

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
    const countDown = setInterval(() => {
      console.log("TIMER!!!");
      if (timeLeft <= 0) {
        clearInterval(countDown);
        // LOSE
        if (pairsFound < 3) {
          gridJogoFacil.classList.add("hide");
          mensagemDerrotaEl.classList.remove("hide");
          // const btnNovoJogo = mensagemDerrotaEl.querySelector("button");
          // btnNovoJogo.addEventListener("click", () => {
          //   // clear game
          //   pairsFound = 0;
          jogo.classList.remove("hide");
          jogo.style["display"] = "none";

          //   dificuldade.classList.toggle("hide");
          // });
        }
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
            //WIN!
            clearInterval(countDown);
            const timeoutWin = setTimeout(() => {
              console.log("WIN!");
              jogo.classList.add("hide");
              jogo.style["display"] = "none";
              // gridJogoFacil.classList.toggle("hide");
              mensagemVictoriaEl.classList.remove("hide");
              // clear game
              pairsFound = 0;
              cartas.forEach((carta) => {
                carta.classList.remove("flip");
                carta.classList.remove("matched");
              });
              primeiraCarta = null;
              secundaCarta = null;
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

  // TERMINAR JOGO
  btnTerminarJogo.addEventListener("click", () => {
    jogo.classList.add("hide");
    jogo.style["display"] = "none";
    gridJogoFacil.classList.remove("hide");
    gridJogoFacil.style["display"] = "grid";
    gridJogoDificil.classList.add("hide");
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
  btnNovoJogoVictoria.addEventListener("click", () => {
    mensagemVictoriaEl.classList.add("hide");
    dificuldade.classList.remove("hide");
  });

  // MENSAGEM DERROTA
  btnNovoJogoDerrota.addEventListener("click", () => {
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
