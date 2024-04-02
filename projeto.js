const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sFuncao = document.querySelector('#m-funcao');
const sSalario = document.querySelector('#m-salario');
const btnSalvar = document.querySelector('#btnSalvar');

let itens;
let id;

function openModal(edit = false, index = 0) {
  modal.classList.add('active');

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      closeModal();
    }
  };

  if (edit) {
    sNome.value = itens[index].nome;
    sFuncao.value = itens[index].funcao;
    sSalario.value = itens[index].salario;
    id = index;
  } else {
    sNome.value = '';
    sFuncao.value = '';
    sSalario.value = '';
  }
}

function closeModal() {
  modal.classList.remove('active');
  id = undefined;
}

function editItem(index) {
  openModal(true, index);
}

function deleteItem(index) {
  itens.splice(index, 1);
  setItensBD();
  loadItens();
}

function insertItem(item, index) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.funcao}</td>
    <td>R$ ${item.salario}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit'></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `;
  tbody.appendChild(tr);
}

btnSalvar.onclick = e => {
  e.preventDefault();

  const nome = sNome.value.trim();
  const funcao = sFuncao.value.trim();
  const salario = sSalario.value.trim();

  if (!nome || !funcao || !salario) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  const novoItem = { nome, funcao, salario };

  if (id !== undefined) {
    itens[id] = novoItem;
  } else {
    itens.push(novoItem);
  }

  setItensBD();
  closeModal();
  loadItens();
};

function loadItens() {
  itens = getItensBD() || [];
  tbody.innerHTML = '';
  itens.forEach((item, index) => {
    insertItem(item, index);
  });
}

function initialize() {
  loadItens();
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) || [];
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens));

initialize();
