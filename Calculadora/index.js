const buttonsNumber=document.getElementsByName(`button_number`);
const buttonsOpera=document.getElementsByName(`button_opera`);
const buttonIgual=document.getElementsByName(`button_igual`);
const buttonBorrado=document.getElementsByName(`button_borrado`);

var resultado = document.getElementById(`resultado`)
var operacionAct="" //operacion actual
var operacionAnt="" //operacion anterior
var operacion= undefined

buttonsNumber.forEach(function(boton){
    boton.addEventListener('click', function(){
        agregarNumero(boton.innerText)
    })
})

buttonsOpera.forEach(function(boton){
    boton.addEventListener('click', function(){
        operacionNumeros(boton.innerText)
    })
})

buttonIgual.forEach(function(boton){
    boton.addEventListener('click', function(){
        calcular()
       
    })
})

buttonBorrado.forEach(function(boton){
    boton.addEventListener('click', function(){
        clear()
    })
})

function operacionNumeros(op){
    if(operacionAct == "") return;
    if(operacionAnt !== ""){
        calcular()
    }
    operacion = op.toString();
    operacionAnt = operacionAct;
    operacionAct= "";
}

function agregarNumero(boton) {
    if (resultado.innerHTML === "0" || operacionAct === "") {
        resultado.innerHTML = boton; 
    } else {
        resultado.innerHTML += boton; 
    }
    operacionAct += boton; 
}

function calcular(){
    var calculo;
    const anterior = parseFloat(operacionAnt);
    const actual = parseFloat(operacionAct);
    if(isNaN(anterior) || isNaN(actual)){
        return;
    }
    switch(operacion){
        case '+': calculo= anterior + actual;break;
        case '-': calculo= anterior - actual;break;
        case '/': calculo= anterior / actual;break;
        case 'x': calculo= anterior * actual;break;
        default: return;
    }
    operacionAct= calculo
    operacion= undefined;
    operacionAnt= "";
    resultado.innerHTML=operacionAct;
}

function clear(){
    operacionAct="" //operacion actual
    operacionAnt="" //operacion anterior
    operacion= undefined
    resultado.innerHTML="0"
}