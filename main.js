let listaDeintens = []

const form = document.getElementById("form-itens")
const itensInput = document.getElementById("receber-item")
const ulItens = document.getElementById("lista-de-itens")
const ulItensComprados = document.getElementById("itens-comprados")

form.addEventListener("submit" , function(evento) {
    evento.preventDefault()
    salvarItem()
    mostrarItem()
    itensInput.focus()
})

function salvarItem() {
    const comprasItem = itensInput.value 
    const checarDuplicado = listaDeintens.some((elemento) => elemento.valor.toUpperCase() === comprasItem.toUpperCase())

    if(checarDuplicado){
        alert("Item ja existe")
    } else {

    listaDeintens.push({
        valor: comprasItem,
        checar: false
    })
}
    itensInput.value =''
}
function mostrarItem(){
    ulItens.innerHTML = ''
    ulItensComprados.innerHTML = ''

    listaDeintens.forEach((elemento, index) => {
        if(elemento.checar) {
            ulItensComprados.innerHTML += `
        <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
            <div>
                <input type="checkbox" checked class="is-clickable" />  
                <span class="itens-comprados is-size-5">${elemento.valor}</span>
            </div>
            <div>
                <i class="fa-solid fa-trash is-clickable deletar"></i>
            </div>
        </li>
            `

        } else {
       ulItens.innerHTML +=  `
       <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" class="is-clickable" />
            <input type="text" class="is-size-5" value="${elemento.valor}"></input>
        </div>
        <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li>
    `

    }
    })


    const inputCheck = document.querySelectorAll('input[type ="checkbox"]')

    inputCheck.forEach(i => {
        i.addEventListener('click', (evento) => {
            const valorDoElemento =  evento.target.parentElement.parentElement.getAttribute('data-value')
            listaDeintens[valorDoElemento].checar = evento.target.checked
            mostrarItem()
        })

    })

    const deletarObjetos = document.querySelectorAll(".deletar")

    deletarObjetos.forEach(i => {
        i.addEventListener('click', (evento) => {
            const valorDoElemento =  evento.target.parentElement.parentElement.getAttribute('data-value')
            listaDeintens.splice(valorDoElemento,1)
            mostrarItem()
        })

    })

}


