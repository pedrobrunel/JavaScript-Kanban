const janela = document.querySelector('.janela-confirmacao')
const containerDasColunas = document.querySelector('.colunas')
const colunas = containerDasColunas.querySelector('.coluna')

let tarefaAtual = null

const handleBlur = (event) => {
    const input = event.target
    const conteudo = input.innerText.trim() || "Oii"
    const tarefa = criarTarefa(conteudo.replace(/\n/g, "<br>"))
    input.replaceWith(tarefa)
}

const editarTarefa = (event) => {
    const tarefa = event.target.closest('.tarefa')
    const input = criarInputDeTarefa(tarefa.innerText)
    tarefa.replaceWith(input)
    input.focus()
}

const deletarTarefa = (event) => {
    tarefaAtual = event.target.closest('.tarefa')

    janela.querySelector(".visualizarTarefa").innerText = tarefaAtual.innerText
    janela.showModal()

}

const adicionar = (event) => {
    const tarefasEl = event.target.closest(".coluna").lastElementChild
    const input = criarInputDeTarefa()
    tarefasEl.appendChild(input);
    input.focus()

}


const criarTarefa = (conteudo) => {
    const tarefa = document.createElement('div')
    tarefa.className = 'tarefa'
    tarefa.draggable = true
    tarefa.innerHTML = `
    <div>${conteudo}</div>
    <menu>
    <button data-editar><i class="bi bi-pencil-square"></i></button>
    <button data-deletar><i class="bi bi-trash"></i></button>
    </menu>
    `
    return tarefa
}

const criarInputDeTarefa = (Texto = "") => {
    const input = document.createElement("div")
    input.className = "tarefa-input"
    input.dataset.placeholder = "Nome da Tarefa"
    input.contentEditable = true
    input.innerText = Texto
    input.addEventListener('blur', handleBlur)
    return input
}

containerDasColunas.addEventListener('click', (event) => {
    if(event.target.closest('button[data-adicionar]')){
        adicionar(event)
    } else if(event.target.closest('button[data-editar]')){
        editarTarefa(event)
    } else if(event.target.closest('button[data-deletar]')){
        deletarTarefa(event)
    }
})


janela.addEventListener('submit', () => tarefaAtual && tarefaAtual.remove()) /*Isso significa que, antes de tentar chamar o método remove() na tarefaAtual, você verifica se ela existe e não é null ou undefined. Se tarefaAtual for null ou undefined, a expressão inteira tarefaAtual && tarefaAtual.remove() irá retornar null e a função remove() não será chamada, evitando possíveis erros de tentativa de chamada de método em null ou undefined.*/

janela.querySelector("#cancelar").addEventListener('click', () => janela.close())
