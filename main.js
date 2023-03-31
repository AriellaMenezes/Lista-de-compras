let listaDeintens = []
let itemAEditar

const form = document.getElementById("form-itens")
const itensInput = document.getElementById("receber-item")
const ulItens = document.getElementById("lista-de-itens")
const ulItensComprados = document.getElementById("itens-comprados")
const listaRecuperada = localStorage.getItem('listaDeItens')

function atulizaLocalStorage() {
    localStorage.setItem('listaDeItens', JSON.stringify(listaDeintens))
}

// (valores omitidos, 0, null, NaN, undefined, "", false) << retornam false

if(listaRecuperada) {
    listaDeintens = JSON.parse(listaRecuperada)
    mostrarItem()
} else {
    listaDeintens = []
}




form.addEventListener("submit" , function(evento) {
    evento.preventDefault()
    salvarItem()
    mostrarItem()
    itensInput.focus()
});

function salvarItem() {
    const comprasItem = itensInput.value 
    const checarDuplicado = listaDeintens.some((elemento) => elemento.valor.toUpperCase() === comprasItem.toUpperCase())

    if(checarDuplicado){
        alert("Item ja existe")
    } else {

    listaDeintens.push({
        valor: comprasItem,
        checar: false
    });
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
            <input type="text" class="is-size-5" value="${elemento.valor}" ${index !== Number (itemAEditar) ? 'disabled': ''}></input>
        </div>
       
        <div>
            ${index === Number (itemAEditar) ? '<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li>
    `

    }
    });


    const inputCheck = document.querySelectorAll('input[type ="checkbox"]')

    inputCheck.forEach(i => {
        i.addEventListener('click', (evento) => {
            const valorDoElemento =  evento.target.parentElement.parentElement.getAttribute('data-value')
            listaDeintens[valorDoElemento].checar = evento.target.checked
            mostrarItem()
        });

    });

    const deletarObjetos = document.querySelectorAll(".deletar")

    deletarObjetos.forEach(i => {
        i.addEventListener('click', (evento) => {
            const valorDoElemento =  evento.target.parentElement.parentElement.getAttribute('data-value')
            listaDeintens.splice(valorDoElemento,1)
            mostrarItem()
        });

    });


    const editarItens = document.querySelectorAll(".editar")

    editarItens.forEach(i => {
        i.addEventListener('click', (evento) => {
            itemAEditar =  evento.target.parentElement.parentElement.getAttribute('data-value')
            mostrarItem()
        });

    });


    atulizaLocalStorage()

}

function salvarEdicao() {
    const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`)
    //console.log(itemEditado.value)
    listaDeintens[itemAEditar].valor = itemEditado.value
    console.log(listaDeintens)
    itemAEditar = -1
    mostrarItem()
}


