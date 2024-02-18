
// Este codigo foi substituido pela função exibirTextoNaTela
// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Tenta a Sorte';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativa = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, `Brazilian Portuguese Female`, {rate:1.2})
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Numero Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial ();


function verificarChute() {
    let chute = document.querySelector('input').value; // o .value garante que ele pegue somente o valor do campo
    
    if (chute == numeroSecreto) {
        let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você acertou com ${tentativa} ${palavraTentativa}` ;
        exibirTextoNaTela ('h1', 'Acertou !');
        exibirTextoNaTela ('p', mensagemTentativas);

        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela ('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela ('p', 'O número secreto é maior');
        }
        tentativa ++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
   let numeroEscolhido = parseInt (Math.random() * numeroLimite + 1);
   let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

   if (quantidadeDeElementosNaLista == numeroLimite){// Verifica a qtd de elementos no array e zera quando chega ao max
      listaDeNumerosSorteados = [];
   }

   if (listaDeNumerosSorteados.includes(numeroEscolhido)) { //Verifica se o numero esta na lista de sorteado e retorna um true or false
       return gerarNumeroAleatorio(); //Se o numero já esta sorteado, ele vai gerar um novo numero aleatorio
   } else {
    listaDeNumerosSorteados.push(numeroEscolhido); //vai add o item ao final da lista
    console.log(listaDeNumerosSorteados)
    return numeroEscolhido;
   }
}

function limparCampo () {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo () {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo ();
    tentativa = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

