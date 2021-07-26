/* Elemento HTML referente a categoria.Armazena a categoria/grupo da palavra escondida */
const categoria = document.querySelector("#category");
/* Elemento HTML referente a lista das letras erradas. Guarda as letras informadas pelo jogador, mas que não fazem parte da palavra corrente.*/
const letrasErradas = document.querySelector(".wrongLetters");
/* Elemento HTML referente a palavra oculta
   Utilizaremos esse mesmo elemento para exibir as mensagens do jogo*/
const palavraInterface = document.querySelector(".dashes");
/* Array com elementos HTML referentes aos olhos do personagem, vão aparecer na interface, caso o jogador erre a tentativa */
const olhos = Array.from(document.querySelectorAll(".eyes"));
/* Array com elementos HTML referentes as partes do corpo, vão aparecer na interface, caso o jogador erre a tentativa */
let partesBoneco = Array.from(document.querySelectorAll("#person div"));
partesBoneco = partesBoneco.slice(2, partesBoneco.length);
/* Palavra corrente */
let palavraProposta;
/* Lista das letras erradas */
let letrasErradasArray = [];
/* Index da parte do corpo corrente */
let indiceBoneco;
/* Numero de chances do jogador */
const numTentativas = 7;
/* Valor para opacidade dos olhos */
const opacidadeOlhos = 0.3;

/* Categoria/grupo das palavras */
const categorias = {
    frutas: ["banana", "melancia", "abacate", "laranja", "morango", "pessego", "jabuticaba"],
    objetos: ["mesa", "cadeira", "espelho", "caderno", "computador", "escada", "travesseiro"],
    animais: ["cavalo", "girafa", "arara", "galinha", "cachorro", "coruja", "elefante"],
    cores: ["amarelo", "vermelho", "azul", "verde", "preto", "lilas", "dourado"],
    profissão: ["professor", "dentista", "engenheiro", "motorista", "analista", "pescador", "taxista"]
}

/* Mapeia as propriedades do objeto categorias(ou seja, retorna um array das categorias)*/
function retornaArrayCategorias() {
    return Object.keys(categorias)
}

/*Seleciona uma categoria de forma aleatória */
function retornaCategorias() {
    const arrayCategorias = retornaArrayCategorias()
        //gera um índice aleatório
    var indiceCategorias = retornaNumAleatorio(arrayCategorias.length)
    return arrayCategorias[indiceCategorias]
}

/* Faz a conexão com o HTML, mostra a categoria na interface do jogo*/
function exibeCategorias() {
    categoria.innerHTML = retornaCategorias()
}

//Retorna numero aleatorio
function retornaNumAleatorio(max) {
    return Math.floor(Math.random() * max)
}

/*Seleciona um dos valores da propriedade do objeto categoria de forma aleatória */
function definePalavraProposta() {
    const arrayPalavras = categorias[categoria.innerHTML]
    var indicePalavras = retornaNumAleatorio(arrayPalavras.length)
    palavraProposta = arrayPalavras[indicePalavras]
    ocultaPalavra()
}

/*Oculta a palavra escolhida anteriormente*/
function ocultaPalavra() {
    var palavraOculta = ""
    for (var i = 0; i < palavraProposta.length; i++) {
        palavraOculta += "-"
    }
    exibePalavraInterface(palavraOculta)
}
//exibe palavra já oculta na interface do jogo
function exibePalavraInterface(palavra) {
    palavraInterface.innerHTML = palavra
}

//Verifica se a letra está presente na palavra oculta
function tentativa(letra) {
    if (palavraProposta.includes(letra)) {
        atualizaPalavraInterface(letra)
    } else {
        letrasErradasArray.push(letra)
        letrasErradas.innerHTML = "Letras erradas: " + letrasErradasArray
        if (partesBoneco.length > indiceBoneco) {
            desenhaBoneco()
        }
    }
    verificaFimDeJogo()
}

function verificaFimDeJogo() {
    if (!palavraInterface.innerHTML.includes("-")) {
        exibePalavraInterface("Você acertou!")
        window.removeEventListener("keypress", retornaLetra)
    } else if (letrasErradasArray.length >= numTentativas) {
        desenhaOlhos()
        exibePalavraInterface("Não foi dessa vez. Tente novamente.")
        window.removeEventListener("keypress", retornaLetra)
    }

}

function atualizaPalavraInterface(letra) {
    var palavraAux = ''
    for (let i = 0; i < palavraProposta.length; i++) {
        if (palavraProposta[i] === letra) {
            palavraAux += letra
        } else if (palavraInterface.innerHTML[i] != "-") {
            palavraAux += palavraInterface.innerHTML[i]
        } else {
            palavraAux += "-"
        }
    }
    exibePalavraInterface(palavraAux)
}

/* Recebe o evento do teclado e passa apenas o valor da letra para a função tentativa */
function retornaLetra(e) {
    tentativa(e.key);
}

/* Desenha a parte do corpo corrente */
function desenhaBoneco() {
    partesBoneco[indiceBoneco].classList.remove("hide");
    indiceBoneco++;
}

/* Desenha os olhos do personagem */
function desenhaOlhos() {
    olhos.forEach((olho => {
        olho.style.opacity = 1;
        olho.style.zIndex = 10;
    }));
}

/* Oculta as partes do corpo do personagem */
function ocultaBoneco() {
    olhos.forEach((olho => {
        olho.style.opacity = opacidadeOlhos;
    }));
    partesBoneco.forEach(parteBoneco => {
        parteBoneco.classList.add("hide");
    });
}

/* Inicia as configurações do jogo */
function iniciaJogo() {
    indiceBoneco = 0;
    letrasErradasArray = [];
    ocultaBoneco()
    exibeCategorias();
    definePalavraProposta()
    letrasErradas.innerHTML = "Letras erradas: ";
    window.addEventListener("keypress", retornaLetra);
}

window.addEventListener("load", iniciaJogo);