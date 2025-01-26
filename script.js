const janela = document.querySelector('.janela-confirmacao')
const containerDasColunas = document.querySelector('.colunas')
const colunas = containerDasColunas.querySelectorAll('.coluna')

let tarefaAtual = null

const arrastarSoltou = (event) =>{
    event.target.classList.remove ("dragging")
}

const arrastarIniciou = (event) => {
    requestAnimationFrame(() => event.target.classList.add("dragging"))
}

const arrastando = (event) => {
    event.preventDefault()
    const tarefaArrastada = document.querySelector(".dragging")
    const local = event.target.closest('.tarefa .tarefas')

    if (!local || local === tarefaArrastada) return


if (local.classList.contains("tarefas")){
    local.appendChild(tarefaArrastada)
} else{

}
}

const arrastarAcabou = (event) => {
    event.preventDefault()

}







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
    tarefa.addEventListener('dragstart', arrastarIniciou)
    tarefa.addEventListener('dragend', arrastarSoltou)

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

const contadorDeTarefas = (coluna) => {
    const tarefas = coluna.querySelector('.tarefas').children
    const contarTarefas = tarefas.length
    coluna.querySelector('.titulo-coluna h3').dataset.tarefas = contarTarefas
}

const olhaAlteracaoTarefa = () => {
    for (const coluna of colunas){
        const observar = new MutationObserver(() => contadorDeTarefas(coluna))
        observar.observe(coluna.querySelector(".tarefas"), { childList: true })
    }
}

olhaAlteracaoTarefa()



janela.addEventListener('submit', () => tarefaAtual && tarefaAtual.remove()) /*Isso significa que, antes de tentar chamar o método remove() na tarefaAtual, você verifica se ela existe e não é null ou undefined. Se tarefaAtual for null ou undefined, a expressão inteira tarefaAtual && tarefaAtual.remove() irá retornar null e a função remove() não será chamada, evitando possíveis erros de tentativa de chamada de método em null ou undefined.*/

janela.querySelector("#cancelar").addEventListener('click', () => janela.close())
//assim que fechar a janela, ele identifica o close e seta a variavel para null, pra limpar
janela.addEventListener("close", () => (tarefaAtual = null))

