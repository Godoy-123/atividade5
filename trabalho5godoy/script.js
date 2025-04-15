const inputNovaTarefa = document.getElementById('novaTarefa');
const botaoAdicionarTarefa = document.getElementById('adicionarTarefa');
const listaDeTarefas = document.getElementById('listaDeTarefas');
const botaoLimparLista = document.getElementById('limparLista');
const contadorTarefas = document.getElementById('contadorTarefas');
let tarefas = carregarTarefas();

function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem('tarefas');
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
}

function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    atualizarContador();
}

function adicionarTarefa() {
    const textoTarefa = inputNovaTarefa.value.trim();
    if (textoTarefa !== '') {
        tarefas.push({ texto: textoTarefa, concluida: false });
        inputNovaTarefa.value = '';
        renderizarTarefas();
        salvarTarefas();
    }
}

function removerTarefa(index) {
    tarefas.splice(index, 1);
    renderizarTarefas();
    salvarTarefas();
}

function toggleConcluida(index) {
    tarefas[index].concluida = !tarefas[index].concluida;
    renderizarTarefas();
    salvarTarefas();
}

function limparLista() {
    tarefas = [];
    renderizarTarefas();
    salvarTarefas();
}

function renderizarTarefas() {
    listaDeTarefas.innerHTML = '';
    tarefas.forEach((tarefa, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('task-item');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarefa.concluida;
        checkbox.addEventListener('change', () => toggleConcluida(index));

        const span = document.createElement('span');
        span.textContent = tarefa.texto;
        if (tarefa.concluida) {
            span.classList.add('completed');
        }

        const botaoRemover = document.createElement('button');
        botaoRemover.classList.add('remove-task');
        botaoRemover.textContent = 'Remover';
        botaoRemover.addEventListener('click', () => removerTarefa(index));

        listItem.appendChild(checkbox);
        listItem.appendChild(span);
        listItem.appendChild(botaoRemover);
        listaDeTarefas.appendChild(listItem);
    });
    atualizarContador();
}

function atualizarContador() {
    const totalTarefas = tarefas.length;
    const tarefasConcluidas = tarefas.filter(tarefa => tarefa.concluida).length;
    contadorTarefas.textContent = `${totalTarefas} total | ${tarefasConcluidas} concluídas`;
}

// Event Listeners
botaoAdicionarTarefa.addEventListener('click', adicionarTarefa);
botaoLimparLista.addEventListener('click', limparLista);

// Carregar tarefas iniciais
renderizarTarefas();