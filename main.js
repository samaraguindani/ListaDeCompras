const alimentoAdicionado = document.querySelector(".input-comida");
const botaoAdd = document.getElementById("botao-add");
const botaoRemove = document.getElementById("botao-remove");
const botaoLimpa = document.getElementById("botao-limpa");
const categoriaSelecionada = document.querySelector("#categoria");
const listaCompra = document.querySelector(".lista-compra");

let alimento = '';
let categoria = '';
let indexRemove = '';

let alimentosPorCategoria = {
    frutas: [],
    laticinios: [],
    congelados: [],
    doces: [],
    bebidas: []
};

exibirListaCompra();

botaoAdd.addEventListener('click', () => {
    if(naoRepetirAlimento()){
        alert(`O alimento ${alimento} ja foi adicionado em ${categoria}`);
    }else{
        adicionarAlimento();
    }    
});

botaoRemove.addEventListener('click', excluirAlimento);

botaoLimpa.addEventListener('click', excluirTudo);

function receberAlimentoECategoria() {
    alimento = alimentoAdicionado.value.toLowerCase();
    categoria = categoriaSelecionada.value;
}

function getListaDeCompras() {
    return JSON.parse(localStorage.getItem('listaDeCompras')) || [];
}

function saveToLocalStorage(alimentosPorCategoria) {
    const lista = getListaDeCompras() || []; // Obter a lista atual do LocalStorage ou uma lista vazia se não existir
    const index = lista.findIndex(item => isEqual(item, alimentosPorCategoria)); // Verificar se já existe uma entrada com os mesmos dados

    if (index !== -1) { // Se já existir, atualize os dados
        lista[index] = alimentosPorCategoria;
    } else { // Caso contrário, adicione à lista
        lista.push(alimentosPorCategoria);
    }

    localStorage.setItem('listaDeCompras', JSON.stringify(lista)); // Salvar a lista atualizada no LocalStorage
    console.log(lista);
}


// Função auxiliar para verificar igualdade entre objetos
function isEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}


function adicionarAlimento() {
    receberAlimentoECategoria();

    if (alimento == '' || alimento == 'insira seu alimento aqui') {
        return alert("Preencha o campo")
    } else {
        switch (categoria) {
            case 'frutas':
                alimentosPorCategoria.frutas.push(alimento);
                break;
            case 'laticinios':
                alimentosPorCategoria.laticinios.push(alimento);
                break;
            case 'congelados':
                alimentosPorCategoria.congelados.push(alimento);
                break;
            case 'doces':
                alimentosPorCategoria.doces.push(alimento);
                break;
            case 'bebidas':
                alimentosPorCategoria.bebidas.push(alimento);
            break;
            default:
                alert("Categoria inválida!");
        }
        listaCompra.innerHTML = formatarListaCompra(alimentosPorCategoria);
        saveToLocalStorage(alimentosPorCategoria);
    }
}

function excluirAlimento() {
    receberAlimentoECategoria();
    
    if (alimento == '' || alimento == 'insira seu alimento aqui') {
        return alert("Preencha o campo")
    } else {
        if (alimentosPorCategoria.frutas.includes(alimento) && categoria == 'frutas') {
            indexRemove = alimentosPorCategoria.frutas.indexOf(alimento);
            alimentosPorCategoria.frutas.splice(indexRemove, 1);
        }
        else if (alimentosPorCategoria.laticinios.includes(alimento) && categoria == 'laticinios') {
            indexRemove = alimentosPorCategoria.laticinios.indexOf(alimento);
            alimentosPorCategoria.laticinios.splice(indexRemove, 1);
        }
        else if (alimentosPorCategoria.congelados.includes(alimento) && categoria == 'congelados') {
            indexRemove = alimentosPorCategoria.congelados.indexOf(alimento);
            alimentosPorCategoria.congelados.splice(indexRemove, 1);
        }
        else if (alimentosPorCategoria.doces.includes(alimento) && categoria == 'doces') {
            indexRemove = alimentosPorCategoria.doces.indexOf(alimento);
            alimentosPorCategoria.doces.splice(indexRemove, 1);
        }
        else if (alimentosPorCategoria.bebidas.includes(alimento) && categoria == 'bebidas') {
            indexRemove = alimentosPorCategoria.bebidas.indexOf(alimento);
            alimentosPorCategoria.bebidas.splice(indexRemove, 1);
        }
        else{
            alert("O alimento não está na lista de compras");
        }

        listaCompra.innerHTML = formatarListaCompra(alimentosPorCategoria);
    }
}

function excluirTudo() {
    receberAlimentoECategoria();
    
    if (alimentosPorCategoria.frutas.includes(alimento) && categoria == 'frutas') {
        alimentosPorCategoria.frutas.splice(0, alimentosPorCategoria.frutas.length);
    }
    else if (alimentosPorCategoria.laticinios.includes(alimento) && categoria == 'laticinios') {
        alimentosPorCategoria.laticinios.splice(0, alimentosPorCategoria.laticinios.length);
    }
    else if (alimentosPorCategoria.congelados.includes(alimento) && categoria == 'congelados') {
        alimentosPorCategoria.congelados.splice(0, alimentosPorCategoria.congelados.length);
    }
    else if (alimentosPorCategoria.doces.includes(alimento) && categoria == 'doces') {
        alimentosPorCategoria.doces.splice(0, alimentosPorCategoria.doces.length);
    }
    else if (alimentosPorCategoria.bebidas.includes(alimento) && categoria == 'bebidas') {
        alimentosPorCategoria.bebidas.splice(0, alimentosPorCategoria.bebidas.length);
    }

    listaCompra.innerHTML = "Sua lista está vazia!";
}

function formatarListaCompra(alimentosPorCategoria) {

    let listaFormatada = "";
    listaFormatada += "Frutas:<br> - ";
    listaFormatada += alimentosPorCategoria.frutas.join("<br> - ");
    listaFormatada += "<br><br>";
    listaFormatada += "Laticínios:<br> - ";
    listaFormatada += alimentosPorCategoria.laticinios.join("<br> - ");
    listaFormatada += "<br><br>";
    listaFormatada += "Congelados:<br> - ";
    listaFormatada += alimentosPorCategoria.congelados.join("<br> - ");
    listaFormatada += "<br><br>";
    listaFormatada += "Doces:<br> - ";
    listaFormatada += alimentosPorCategoria.doces.join("<br> - ");
    listaFormatada += "<br><br>";
    listaFormatada += "Bebidas:<br> - ";
    listaFormatada += alimentosPorCategoria.bebidas.join("<br> - ");
    return listaFormatada;

}

function naoRepetirAlimento() {
    receberAlimentoECategoria();

   if ((alimentosPorCategoria.frutas.includes(alimento) && categoria == 'frutas') || 
        (alimentosPorCategoria.laticinios.includes(alimento) && categoria == 'laticinios') ||
        (alimentosPorCategoria.congelados.includes(alimento) && categoria == 'congelados') || 
        (alimentosPorCategoria.doces.includes(alimento) && categoria == 'doces') || 
        (alimentosPorCategoria.bebidas.includes(alimento) && categoria == 'bebidas')) {
        return true;
    } 
}

function exibirListaCompra() {
    const lista = getListaDeCompras();
    if (lista.length > 0) {
        const listaFormatada = lista.map(alimentosPorCategoria => formatarListaCompra(alimentosPorCategoria)).join('<br><br>');
        listaCompra.innerHTML = listaFormatada;
    } else {
        listaCompra.innerHTML = "Sua lista está vazia!";
    }
}

