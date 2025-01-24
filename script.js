const janela = document.querySelector('.janela-confirmacao')
const containerDasColunas = document.querySelector('.colunas')
const colunas = containerDasColunas.querySelector('.coluna')


const adicionar = (event) => {
    const tarefasEl = event.target.closest(".coluna").lastElementChild
    const input = criarInputDeTarefa()
    tarefasEl.appendChild(input);

}


const criarTarefa = (conteudo) => {
    const tarefa = document.createElement('div')
    tarefa.className = 'tarefa'
    tarefa.draggable = true
    tarefa.innerHTML = `
    <div>${conteudo}</div>
    <menu>
    <button data-editar><i class="bi bi-pencil-square"></i></button>
    <button data-editar><i class="bi bi-trash"></i></button>
    </menu>
    `
    return tarefa
}

const criarInputDeTarefa = (Texto = "") => {
    const input = document.createElement("div")
    input.className = "tarefa-input"
    input.dataset.placeholder = "Nome da Tarefa"
    input.innerText = Texto
    return input
}

containerDasColunas.addEventListener('click', (event) => {
    if(event.target.closest('button[data-adicionar]')){
        adicionar(event)
    }
})