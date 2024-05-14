"use strict";

document.addEventListener("DOMContentLoaded", () => {
  console.log("HELLO <3");
  const btnNovoJogo = document.querySelector(".btn-novo-jogo");
  const ecraInicial = document.querySelector(".ecra-inicial");
  const dificuldade = document.querySelector(".dificuldade");

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
        // win or lose
        return;
      }
      timeLeft--;
      timer.textContent = timeLeft;
    }, 1000);
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
        // win or lose
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
