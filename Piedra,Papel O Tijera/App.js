const piedra = "piedra";
const papel = "papel";
const tijera = "tijera"; 


const empate = 0;
const ganador = 1;
const perdedor = 2;


const piedraBtn = document.getElementById("piedra");
const papelBtn = document.getElementById("papel");
const tijeraBtn = document.getElementById("tijera");
const resultext = document.getElementById("text")
const machineimg = document.getElementById("machine-img")
const userimg = document.getElementById("user-img")


piedraBtn.addEventListener("click", ()=>{
    play(piedra);
});
papelBtn.addEventListener("click", ()=>{
    play(papel);
});
tijeraBtn.addEventListener("click", ()=>{
    play(tijera);
});


function play(userOption){

    userimg.src = "IMG/"+userOption+".png";
    resultext.innerHTML = "Piedra, Papel o Tijera.";

    setTimeout(function(){

        const machineOption = calcMachineOption();
        const result = calcResult (userOption, machineOption);

        machineimg.src = "IMG/"+machineOption+".png";
        
        switch(result){
            case empate:
                resultext.innerHTML = " muy suave empataste.";
               break;
            case ganador:
                resultext.innerHTML = " Ganaste.";
                break;
            case perdedor:
                resultext.innerHTML = " Perdiste.";
                break;
        }

    },1500 );
   
}


function calcMachineOption (){
   const number = Math.floor(Math.random() *3);
   switch (number){
        case 0:
            return piedra;
        case 1:
            return papel;
        case 2:
            return tijera;

   }   

}


function calcResult(userOption, machineOption){
    if(userOption === machineOption){ 
        return empate;

    }else if(userOption === piedra){
        
        if(machineOption === papel) return perdedor;
        if(machineOption === tijera) return ganador;

    }else if(userOption === papel  ){

        if(machineOption === piedra) return ganador;
        if(machineOption === tijera) return perdedor;

    }else if(userOption === tijera){
        if(machineOption === piedra) return perdedor;
        if(machineOption === papel) return ganador;
    }
}