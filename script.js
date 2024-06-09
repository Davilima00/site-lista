const container = document.getElementById("conteiner");
const saida = document.getElementById("respotas");

let contador_casa = 1;
let contador_estudos = 1;
let contador_trabalho = 1;
let contador_compras = 1;

function add_input_button_div(novadiv, tipo) {
    const novotitulo = document.createElement('h6');
    const input_tarefa = document.createElement('input');
    const input_data = document.createElement('input');
    const button_adicionar = document.createElement('button');
    const ul = document.createElement('ul'); // Contêiner para os lembretes

    novotitulo.textContent = 'Adicionar lembrete';
    novotitulo.classList.add('titulo');

    input_tarefa.placeholder = 'Digite a tarefa';
    input_tarefa.classList.add('input-tarefa');

    input_data.type = 'date';
    input_data.classList.add('input-data');

    button_adicionar.textContent = 'Adicionar';
    button_adicionar.classList.add('botao-adicionar');

    novadiv.classList.add('lembrete-div');
    novadiv.appendChild(novotitulo);
    novadiv.appendChild(input_tarefa);
    novadiv.appendChild(input_data);
    novadiv.appendChild(button_adicionar);

    button_adicionar.addEventListener('click', function () {
        const tarefa = input_tarefa.value;
        const data = input_data.value;
        if (tarefa && data) {
            const pTarefa = document.createElement('p');
            const pData = document.createElement('p');

            pTarefa.textContent = `Tarefa: ${tarefa}`;
            pData.textContent = `Data: ${data}`;

            // Cria um bloco principal e adiciona a tarefa e data
            const bloco_principal = document.createElement('div');
            bloco_principal.classList.add('bloco-principal', tipo);

            bloco_principal.appendChild(pTarefa);
            bloco_principal.appendChild(pData);
            saida.appendChild(bloco_principal);

            // Armazena a tarefa e a data no localStorage
            const lembrete = { tarefa, data, tipo };
            const lembretes = JSON.parse(localStorage.getItem('lembretes')) || [];
            lembretes.push(lembrete);
            localStorage.setItem('lembretes', JSON.stringify(lembretes));

            novadiv.remove();
        
            contador_casa = 1;
            contador_estudos = 1;
            contador_trabalho = 1;
            contador_compras = 1;

            
            

            input_tarefa.value = ''; // Limpa o campo de tarefa
            input_data.value = ''; // Limpa o campo de data

            return novadiv
        } else {
            alert('Por favor, preencha ambos os campos.');
            novadiv.remove();
            contador_casa = 1;
            contador_estudos = 1;
            contador_trabalho = 1;
            contador_compras = 1;

        }
    });

    container.appendChild(novadiv);
}

// Funções para adicionar listas de lembretes específicas
function add_list_casa() {
    if (contador_casa === 1) {
        const novadiv = document.createElement('div');
        novadiv.classList.add('lista-domestica');

        add_input_button_div(novadiv, 'casa');
        container.appendChild(novadiv);

        contador_casa = 2;
        contador_estudos = 1;
        contador_trabalho = 1;
        contador_compras = 1;
    } else {
        alert("Você já criou uma caixa de texto");
    }
}

function add_list_estudos() {
    if (contador_estudos === 1) {
        const novadiv = document.createElement('div');
        novadiv.classList.add('lista-estudos');

        add_input_button_div(novadiv, 'estudos');
        container.appendChild(novadiv);

        contador_casa = 1;
        contador_estudos = 2;
        contador_trabalho = 1;
        contador_compras = 1;
    } else {
        alert("Você já criou uma caixa de texto");
    }
}

function add_list_trabalho() {
    if (contador_trabalho === 1) {
        const novadiv = document.createElement('div');
        novadiv.classList.add('lista-trabalho');

        add_input_button_div(novadiv, 'trabalho');
        container.appendChild(novadiv);

        contador_casa = 1;
        contador_estudos = 1;
        contador_trabalho = 2;
        contador_compras = 1;
    } else {
        alert("Você já criou uma caixa de texto");
    }
}

function add_list_compras() {
    if (contador_compras === 1) {
        const novadiv = document.createElement('div');
        novadiv.classList.add('lista-compras');

        add_input_button_div(novadiv, 'compras');
        container.appendChild(novadiv);

        contador_casa = 1;
        contador_estudos = 1;
        contador_trabalho = 1;
        contador_compras = 2;
    } else {
        alert("Você já criou uma caixa de texto");
    }
}

// Função para carregar lembretes do localStorage ao carregar a página
function carregarLembretes() {
    const lembretes = JSON.parse(localStorage.getItem('lembretes')) || [];
    lembretes.forEach(lembrete => {
        const pTarefa = document.createElement('p');
        const pData = document.createElement('p');

        pTarefa.textContent = `Tarefa: ${lembrete.tarefa}`;
        pData.textContent = `Data: ${lembrete.data}`;

        const bloco_principal = document.createElement('div');
        bloco_principal.classList.add('bloco-principal', lembrete.tipo);

        bloco_principal.appendChild(pTarefa);
        bloco_principal.appendChild(pData);
        saida.appendChild(bloco_principal);
    });
}

// Carrega os lembretes ao carregar a página
document.addEventListener('DOMContentLoaded', carregarLembretes);

document.getElementById("limparLocalStorage").addEventListener("click", function() {
    localStorage.removeItem("lembretes");
    novadiv.remove();
    saida.innerHTML = ""; // Limpa a saída na página
});

