var nombre
var ciudad

const formulario= document.getElementById(`formulario`);

const contMaq= document.getElementById(`spanContMaq`);
const contUsu= document.getElementById(`spanContUsu`);

var contM=0;
var contU=0;

formulario.addEventListener("submit",function(event){
    event.preventDefault();

    nombre= document.getElementById(`inputNombre`).value;
    document.getElementById(`spanNombre`).innerHTML= nombre + ":";
    contUsu.innerHTML= contU;

    document.getElementById(`spanMaquina`).innerHTML= "Maquina" + ":";
    contMaq.innerHTML= contM;

    formulario.reset();

});


function Ruleta(){

    const Disparo=document.getElementById("audio");

    const Num_usu= Math.floor(Math.random()*(6-1)+1);
    const Num_maquina= Math.floor(Math.random()*(6-1)+1);



    Disparo.currentTime= 8;
    Disparo.play()

    setTimeout(() => {
        if(Num_usu !=1 && Num_maquina !=1){
            document.getElementById(`result`).innerHTML="Empate"
            Disparo.pause()
        } else if(Num_usu != 1){
           document.getElementById(`result`).innerHTML="Ganaste "
           Disparo.pause()
           contU++;
           contUsu.innerHTML= contU;
        } else if(Num_maquina != 1){
            document.getElementById(`result`).innerHTML="Perdiste"
            Disparo.pause()
            contM++;
            contMaq.innerHTML= contM;
        }
    }, 5300);
    document.getElementById(`result`).innerHTML="Gatillando"

}
