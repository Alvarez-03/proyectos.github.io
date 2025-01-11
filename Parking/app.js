let Estacionamiento = [];
let spanPlaca=document.createElement("span")
function asignacion() {
    const bahias = document.getElementById("bahias_num").value;
    const name_zone = document.getElementById("name_zone").value;
    let contenedor = document.getElementById("plazasParking");
    
    let h2_zone = document.createElement("h2")
    h2_zone.id= 'name_zone' 
    h2_zone.innerHTML= `${name_zone}`
    contenedor.appendChild(h2_zone)

    let zone = document.createElement("div")
    zone.className= "placeParking" 
    contenedor.appendChild(zone)
    
    for (let i = 1; i <= bahias; i++) {
        const numBahias = i;

        let cardParking = document.createElement("div");
        cardParking.className = "card-parking";
        cardParking.id = `${name_zone}-${numBahias}`

        let numParking = document.createElement("h3");
        numParking.textContent = numBahias;

        let icoParking = document.createElement("i");
        icoParking.className = "fa-sharp fa-solid fa-square-parking fa-7x";
        icoParking.style.color = "#0dff00";
        icoParking.style.fontSize = "7em";

        let placatext= document.createElement("h4")
        placatext.id= `placa${name_zone}-${numBahias}`
        placatext.textContent= "----"
        placatext.style.textAlign= "center"

        let buttonPark = document.createElement("button");
        buttonPark.textContent = "Asignar";
        buttonPark.onclick = function () {
            plazaOcupada(icoParking,buttonPark, `parking-${numBahias}`, name_zone, `placa${name_zone}-${numBahias}` );
        };

        cardParking.appendChild(numParking);
        cardParking.appendChild(icoParking);
        cardParking.appendChild(placatext);
        cardParking.appendChild(buttonPark);

      

        zone.appendChild(cardParking);
    }
}

function plazaOcupada(icoParking, buttonPark, idbahia, name_zone, placaVeh) {
    document.body.appendChild(spanPlaca);
    let placatext = document.getElementById(`${placaVeh}`);
    spanPlaca.id = "card-pago";
    spanPlaca.className = "cardPago";

    let titulo = document.createElement("h2");
    titulo.textContent = "Parking";

    let inputPlaca = document.createElement("input");
    inputPlaca.type = "text";
    inputPlaca.placeholder = "Placa del vehiculo";
    inputPlaca.id = "placa";


    let buttonPlaca = document.createElement("button");
    buttonPlaca.textContent = "Ingresar";
    buttonPlaca.onclick = function () {
        let numPlaca = inputPlaca.value;

        // Validación de placa
        const vehiculoDuplicado = Estacionamiento.find(
            (vehiculo) => vehiculo.Placa === numPlaca && vehiculo.hora_salida === ""
        );

        if (vehiculoDuplicado) {
            alert("Vehículo ya en parking");
            clearSpan(spanPlaca);
            return;
        }

        // Agregar el vehículo al estacionamiento
        Estacionamiento.push({
            Placa: `${numPlaca}`,
            bahia: `${idbahia}`,
            zona: `${name_zone}`,
            hora_entrada: new Date().toLocaleTimeString(),
            hora_salida: "",
        });

        icoParking.style.color = "rgb(255, 0, 0)";
        buttonPark.textContent = "Pagar";
        buttonPark.onclick = function () {
            pagoParking(numPlaca, buttonPark, icoParking, placatext); 
        };

        placatext.textContent = `${numPlaca}`;
        clearSpan(spanPlaca);
    };

    spanPlaca.appendChild(titulo);
    spanPlaca.appendChild(inputPlaca);
    spanPlaca.appendChild(buttonPlaca);
}

function buscar_veh(){
    Bplaca= document.getElementById('buscador_veh').value;
     vehiculoEncontrado = Estacionamiento.find((vehiculo)=>vehiculo.Placa == Bplaca && vehiculo.hora_salida == "");
    if(vehiculoEncontrado){
        alert(`vehiculo Encontrado ${vehiculoEncontrado.Placa} ${vehiculoEncontrado.bahia} ${vehiculoEncontrado.zona}`)
    } 


}


function clearSpan (spanPlaca){

    console.table(Estacionamiento)
    spanPlaca.innerHTML='';
    spanPlaca.remove();
}


function pagoParking(numPlaca, buttonPark, icoParking, placatext) {
    // Encontrar el vehículo específico en el estacionamiento
    const vehiculo = Estacionamiento.find(
        (vehiculo) => vehiculo.Placa === numPlaca && vehiculo.hora_salida === ""
    );

    if (!vehiculo) {
        alert("Error: No se encontró el vehículo");
        return;
    }

    // Marcar la hora de salida
    vehiculo.hora_salida = new Date().toLocaleTimeString(); // Hora actual


    alert(`Placa: ${vehiculo.Placa}  Hora entrada: ${vehiculo.hora_entrada}  Hora salida: ${vehiculo.hora_salida} Estacionamiento: ${vehiculo.zona}`)

    // Liberar la plaza
    placatext.textContent = `----`;
    icoParking.style.color = "#0dff00";
    buttonPark.textContent = "Asignar";
    buttonPark.onclick = function () {
        plazaOcupada(icoParking, buttonPark, vehiculo.bahia, vehiculo.zona, placatext.id);
    };

    console.table(Estacionamiento);
}

function ComoFuncionoSpan(){

    document.body.appendChild(spanPlaca);
    spanPlaca.id = "card-pago";
    spanPlaca.className = "cardPago";

    let titulo = document.createElement("h2");
    titulo.textContent = "Como funciono.";

    let informacion = document.createElement("p");
    informacion.innerHTML= `Parking 24/7 cuenta con un encabezado, donde puedes crear tu estacionamiento con el numero 
    de bahias que deseas y un nombre, o puedes crear varios estacionamientos, Tambien puedes 
    buscar informacion sobre cualquier vehiculo. <br><br>
    
    Puedes Encontrar mucha mas informacion sobre todos los vehiculos en consola.`


    let buttonClose = document.createElement("button");
    buttonClose.textContent = "Cerrar";
    buttonClose.onclick= function(){
        spanPlaca.innerHTML= "";
        spanPlaca.remove();
    }

    spanPlaca.appendChild(titulo)
    spanPlaca.appendChild(informacion)
    spanPlaca.appendChild(buttonClose)

}