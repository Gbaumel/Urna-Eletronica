const seuVotoPara = document.querySelector('.d1-1 span');
const cargo = document.querySelector('.d1-2 span');
const desc = document.querySelector('.d1-4');
const aviso = document.querySelector('.d-2');
const lateral = document.querySelector('.d1-right');
const numeros = document.querySelector('.d1-3');

var etapaAtual = 0;
var numero = '';
var votoBranco = false;

function comecarEtapa() {
    var etapa = etapas[etapaAtual];
    seuVotoPara.style.display = 'none';

    var numeroHtml = '';
    numero = '';
    votoBranco = false;

    for(let i=0;i<etapa.numeros;i++) {
        if(i === 0){
            numeroHtml += '<div class="numero pisca"></div>';            
        }else{
            numeroHtml += '<div class="numero"></div>';
        }
    }

    cargo.innerHTML = etapa.titulo;
    desc.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
    var etapa = etapas[etapaAtual];
    var candidato = etapa.candidatos.filter((item) =>{
        if(item.numero === numero) {
            return true;
        }else{
            return false;
        }
    });
    if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        desc.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;

        let fotosHtml = '';
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="d1-images small"><img src="./images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`
            }else{
                fotosHtml += `<div class="d1-images"><img src="./images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`
            }
        } 
        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        desc.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'
    }
}

function clicou(n) {
    const elNumero = document.querySelector('.numero.pisca')

    if(elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca');
        }else{
            atualizaInterface();
        }
    }
}

function branco() {
    if(numero === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        desc.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>'
    }
}
function corrige() {
    comecarEtapa();
}
function confirma() {
    var etapa = etapas[etapaAtual];

    var votoConfirmado = false;

    if(votoBranco === true){
        votoConfirmado = true;
    }else if(numero.length === etapa.numeros){
        votoConfirmado = true;
    }

    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        }else{
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>'
        }
    }

}

comecarEtapa();