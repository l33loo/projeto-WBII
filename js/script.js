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

  // Facil
  const btnFacil = document.querySelector(".btn-facil");
  btnFacil.addEventListener("click", () => {
    dificuldade.classList.toggle("hide");
    jogo.classList.toggle("hide");
    jogo.style["display"] = "flex";
    gridJogoDificil.style["display"] = "none";
  });

  // Dificil
  const btnDificil = document.querySelector(".btn-dificil");
  btnDificil.addEventListener("click", () => {
    dificuldade.classList.toggle("hide");
    jogo.classList.toggle("hide");
    jogo.style["display"] = "flex";
    gridJogoFacil.classList.toggle("hide");
    gridJogoFacil.style["display"] = "none";
    gridJogoDificil.classList.toggle("hide");
  });
});
