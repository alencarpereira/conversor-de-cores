import cores from './cores.js'; // Importando as cores

const input = document.getElementById('corInput');
const botao = document.getElementById('botaoTraduzir');
const resultado = document.getElementById('resultado');
const botaoReset = document.getElementById('reset');

// Função para calcular o brilho da cor
function calcularBrilho(corHex) {
    const rgb = corHex.slice(1).match(/.{2}/g).map(x => parseInt(x, 16));
    const [r, g, b] = rgb;

    // Fórmula de luminosidade para calcular o brilho
    const brilho = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return brilho;
}

// Função para falar a cor
function falarCor(cor) {
    const msg = new SpeechSynthesisUtterance(cor);
    msg.lang = 'en-US';
    window.speechSynthesis.speak(msg);
}

botao.addEventListener('click', function () {
    const corDigitada = input.value.toLowerCase().trim(); // Remover espaços extras
    const corIngles = Object.values(cores).find(cor => cor.pt === corDigitada || cor.en === corDigitada);

    // Verifica se o input está vazio
    if (!corDigitada) {
        if (!document.querySelector("#mensagemErro")) {
            const mensagemErro = document.createElement('div');
            mensagemErro.id = 'mensagemErro';
            mensagemErro.innerHTML = 'Por favor, digite uma cor!';
            resultado.appendChild(mensagemErro);
        }
        return;
    }

    if (corIngles) {
        const caixinha = document.createElement('div');
        caixinha.classList.add('caixinha');
        caixinha.style.backgroundColor = corIngles.hex; // Usa a cor hexadecimal
        caixinha.textContent = corIngles.en; // Mostra o nome da cor em inglês

        // Verifica se a cor de fundo é preta
        if (corIngles.hex === '#000000') {
            caixinha.style.color = 'white'; // Texto branco se a cor for preta
        } else {
            // Verifica a luminosidade da cor de fundo
            const brilho = calcularBrilho(corIngles.hex); // Calcula o brilho com base na cor hexadecimal

            // Ajusta a cor do texto baseado no brilho
            if (brilho < 128) {
                caixinha.style.color = 'white'; // Texto branco se a cor for escura
            } else {
                caixinha.style.color = 'black'; // Texto preto se a cor for clara
            }
        }

        // Adiciona a funcionalidade de voz ao clicar na palavra
        caixinha.addEventListener('click', function () {
            falarCor(caixinha.textContent); // Fala a palavra em inglês
        });

        resultado.appendChild(caixinha);
        input.value = ''; // Limpa o input após a cor ser adicionada
        const mensagemErro = document.querySelector("#mensagemErro");
        if (mensagemErro) {
            mensagemErro.remove(); // Remove a mensagem de erro, se existir
        }

    } else {
        if (!document.querySelector("#mensagemErro")) {
            const mensagemErro = document.createElement('div');
            mensagemErro.id = 'mensagemErro';
            mensagemErro.innerHTML = 'Cor não encontrada. Tente outra!';
            resultado.appendChild(mensagemErro);
        }
    }
});

botaoReset.addEventListener('click', function () {
    // Limpa o input
    input.value = '';

    // Remove todas as caixinhas de cor
    resultado.innerHTML = '';

    // Remove a mensagem de erro, se houver
    const mensagemErro = document.querySelector("#mensagemErro");
    if (mensagemErro) {
        mensagemErro.remove();
    }

    // Exibe a mensagem inicial após o reset
    if (!document.querySelector("#mensagem")) {
        const mensagem = document.createElement('div');
        mensagem.id = 'mensagem';
        mensagem.innerHTML = 'Digite o nome de uma cor!';
        resultado.appendChild(mensagem);
    }
});










