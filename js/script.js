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
});
