const contato_nome = document.querySelector("#nome-contato");
const contato_num = document.querySelector("#numero-contato");
const contato_div = document.querySelector("#div-contato");
const contato_ligar = document.querySelector("#contato-ligar");
const contato_adicionar = document.querySelector("#adicionar-contato");

const contato = {
  id: 1,
  nome: "Bombeiros",
  numero: 193,
};

const contato2 = {
  id: 2,
  nome: "SAMU",
  numero: 192,
};

localStorage.setItem(`Contato1`, JSON.stringify(contato));

localStorage.setItem(`Contato2`, JSON.stringify(contato2));

function multiplyNode(node, deep) {
  let count = 1;
  do {
    copy = node.cloneNode(deep);
    node.parentNode.insertBefore(copy, node);

    let dado = JSON.parse(localStorage.getItem(`Contato${count}`));
    contato_ligar.setAttribute("href", `tel:+55${dado.numero}`);

    contato_nome.innerHTML = dado.nome;
    contato_num.innerHTML = dado.numero;

    count++;
  } while (count <= localStorage.length);
}

multiplyNode(contato_div, localStorage.length, true);
