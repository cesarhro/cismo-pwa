const form = document.querySelector("#form-id");

function setId() {
  const tam = localStorage.length;

  if (tam == 0) {
    return 1;
  } else {
    return tam + 1;
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault;

  let num = 0;

  const nome_contato = document.querySelector("#nome-contato");
  const numero_contato = document.querySelector("#numero-contato");

  const contato = {
    id: setId(),
    nome: nome_contato.value,
    numero: numero_contato.value,
  };

  localStorage.setItem(`Contato${setId()}`, JSON.stringify(contato));
  alert("Contato cadastrado com sucesso");
});
