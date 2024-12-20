let Estacionamiento = [];
let spanPlaca=document.createElement("span")
function asignacion() {
    const bahias = document.getElementById("bahias").value;
    let contenedor = document.getElementById("plazasParking"); 

    for (let i = 1; i <= bahias; i++) {
        const numBahias = i;

        let cardParking = document.createElement("div");
        cardParking.className = "card-parking";
        cardParking.id = `vehiculo-${numBahias}`

        let numParking = document.createElement("h2");
        numParking.textContent = numBahias;

        let icoParking = document.createElement("i");
        icoParking.className = "fa-sharp fa-solid fa-square-parking fa-7x";
        icoParking.style.color = "#0dff00";
        icoParking.style.fontSize = "7em";

        let buttonPark = document.createElement("button");
        buttonPark.textContent = "Asignar";
        buttonPark.onclick = function () {
            plazaOcupada(icoParking,buttonPark );
        };

        cardParking.appendChild(numParking);
        cardParking.appendChild(icoParking);
        cardParking.appendChild(buttonPark);

        contenedor.appendChild(cardParking);
    }
}

function plazaOcupada(icoParking, buttonPark) {

    document.body.appendChild(spanPlaca)


    spanPlaca.id = "card-pago" ;
    spanPlaca.className = "cardPago"
    let titulo = document.createElement("h2")
    titulo.textContent= "Parking" ;

    let inputPlaca = document.createElement("input")
    inputPlaca.type = "text";
    inputPlaca.placeholder = "Placa del vehiculo";
    inputPlaca.id = "placa";
    let numPlaca = inputPlaca.value;
   

    let buttonPlaca = document.createElement("button")
    buttonPlaca.textContent = "Ingresar"
    buttonPlaca.onclick= function(){
        clearSpan(spanPlaca)
    }

        icoParking.style.color = "rgb(255, 0, 0)";
        buttonPark.textContent = "Pagar";
        buttonPark.onclick= function(){
            pagoParking(buttonPark,icoParking)
        }
    spanPlaca.appendChild(titulo)
    spanPlaca.appendChild(inputPlaca)
    spanPlaca.appendChild(buttonPlaca)
    Estacionamiento.push(inputPlaca.value)


}

function mostrarVehiculo() {
    
    alert("Vehiculo no encontrado")
}
function clearSpan (spanPlaca){
    
    alert("Placa Registrada")
    console.log(Estacionamiento)
    spanPlaca.innerHTML='';
    spanPlaca.remove();
}
function pagoParking(buttonPark, icoParking){

    alert("pago")
    icoParking.style.color = "#0dff00";
    buttonPark.textContent = "Asignar";
        buttonPark.onclick = function () {
            plazaOcupada(icoParking,buttonPark );
        };
}