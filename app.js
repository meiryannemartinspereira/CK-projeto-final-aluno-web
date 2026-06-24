let input = document.getElementById("receberNome");
let enviar = document.getElementById("enviar");
let iniciar = document.getElementById("iniciar");

let lista = [];
let listaAcertos = [];

let contador = 0;

let segundos = 0;
let minutos = 0;
let cronometro = null;

async function carregarEstados() {
    try {
        const response = await fetch("http://localhost:3000/estados");

        if (!response.ok) {
            throw new Error("Erro ao buscar estados");
        }

        const estados = await response.json();

        lista = estados.map(estado =>
            estado.nome
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
        );

        console.log("Estados carregados:", lista);

    } catch (error) {
        console.error("Erro ao carregar estados:", error);
    }
}

carregarEstados();

enviar.onclick = function () {

    let mensagem = input.value
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    verificarEstado(mensagem);

    input.value = "";
};

document.getElementById("receberNome")
    .addEventListener("keypress", function (e) {

        if (e.key === "Enter") {

            let mensagem = input.value
                .toLowerCase()
                .trim()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

            verificarEstado(mensagem);

            input.value = "";
        }
    });

function verificarEstado(mensagem) {

    if (
        lista.includes(mensagem) &&
        !listaAcertos.includes(mensagem)
    ) {

        const estadosSvg = document.querySelectorAll("svg path");

        listaAcertos.push(mensagem);

        criarTabela(mensagem);

        contadorEstados();

        estadosSvg.forEach(estado => {

            let nomeEstado = estado
                .getAttribute("title")
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

            if (nomeEstado === mensagem) {
                estado.classList.add("acertou");
            }
        });

        return true;
    }

    return false;
}

function contadorEstados() {

    contador++;

    document.getElementById("contador")
        .innerText = `${contador}/27`;
}

function criarTabela(mensagem) {

    const tabela = document.getElementById("tabela");

    const novaLinha = tabela.insertRow();

    const novaCelula = novaLinha.insertCell();

    novaCelula.textContent = mensagem;
}

function popUpFunction() {

    const popup = document.getElementById("mypopup");

    popup.classList.toggle("show");
}


iniciar.onclick = function () {

    if (cronometro !== null) {
        return;
    }

    cronometro = setInterval(() => {

        segundos++;

        if (segundos === 60) {
            segundos = 0;
            minutos++;
        }

        iniciar.innerText =
            (minutos < 10 ? "0" + minutos : minutos)
            + ":"
            + (segundos < 10 ? "0" + segundos : segundos);

    }, 1000);
};