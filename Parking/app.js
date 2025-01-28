let Estacionamiento = [];
let spanPlaca=document.createElement("span")

let tarifa_motocicleta= 0;
let tarifa_carro= 0;
let tarifa_bus= 0;
let tiempotarifa="";



let ganancias=0;

let cantBahias= 0;

function crear_zonas() {
    const bahias = parseInt(document.getElementById("bahias_num").value);
    const textbahiasdispo= document.getElementById('bahiasDispo')
    const name_zone = document.getElementById("name_zone").value;
    let contenedor = document.getElementById("plazasParking");

    cantBahias+=bahias
    textbahiasdispo.innerHTML=`<i class="fa-solid fa-square-parking"></i> Espacios Disponibles: ${cantBahias}`;
    
    let h2_zone = document.createElement("h2")
    h2_zone.id= 'namezone' 
    h2_zone.innerHTML= `${name_zone}`
    contenedor.appendChild(h2_zone);
    

    let zone = document.createElement("div")
    zone.className= "placeParking" 
    zone.id= `${name_zone}` 
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
        icoParking.style.color = "rgb(5, 90, 0)";

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

    let tipoVehiculo= document.createElement("select");
    
    let opcion1= document.createElement("option");
    opcion1.value= "Carro";
    opcion1.textContent= "Carro";

    let opcion2= document.createElement("option")
    opcion2.value= "Motocicleta";
    opcion2.textContent= "Motocicleta";

    let opcion3= document.createElement("option")
    opcion3.value= "Bus";
    opcion3.textContent= "Bus";

    tipoVehiculo.appendChild(opcion1)
    tipoVehiculo.appendChild(opcion2)
    tipoVehiculo.appendChild(opcion3)





    let buttonPlaca = document.createElement("button");
    buttonPlaca.textContent = "Ingresar";
    buttonPlaca.onclick = function () {
        let numPlaca = inputPlaca.value;
        let vehiculo = tipoVehiculo.value;

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
            tipo_Vehiculo: `${vehiculo}`,
            Placa: `${numPlaca}`,
            bahia: `${idbahia}`,
            zona: `${name_zone}`,
            hora_entrada: new Date().toLocaleTimeString(),
            hora_salida: "",
            entrada: Date.now(), //toma la entrada en milisegundos
            salida:``,
        });

        icoParking.style.color = "rgb(255, 0, 0)";
        buttonPark.textContent = "Pagar";
        buttonPark.onclick = function () {
            pagoParking(numPlaca, buttonPark, icoParking, placatext); 
        };

        const textbahiasdispo= document.getElementById('bahiasDispo');
        cantBahias= cantBahias-1;
        textbahiasdispo.innerHTML=`<i class="fa-solid fa-square-parking"></i> Espacios Disponibles: ${cantBahias}`;

        placatext.textContent = `${numPlaca}`;
        clearSpan(spanPlaca);
    };

    let buttonClose = document.createElement("button");
    buttonClose.textContent = "Cerrar";
    buttonClose.onclick= function(){
        spanPlaca.innerHTML= "";
        spanPlaca.remove();
    }

    spanPlaca.appendChild(titulo);
    spanPlaca.appendChild(inputPlaca);
    spanPlaca.appendChild(tipoVehiculo)
    spanPlaca.appendChild(buttonPlaca);
    spanPlaca.appendChild(buttonClose);
}

function buscar_veh(){
    Bplaca= document.getElementById('buscador_veh').value;
     vehiculoEncontrado = Estacionamiento.find((vehiculo)=>vehiculo.Placa == Bplaca && vehiculo.hora_salida == "");
    if(vehiculoEncontrado){
        alert(`vehiculo Encontrado ${vehiculoEncontrado.Placa} ${vehiculoEncontrado.bahia} ${vehiculoEncontrado.zona}`)
    }else{
        alert(`Vehiculo no encontrado en estacionamiento`)
    }



}


function pagoParking(numPlaca, buttonPark, icoParking, placatext) {
    let tarifa_pagar=0;

    // Encontrar el vehículo específico en el estacionamiento
    const vehiculo = Estacionamiento.find(
        (vehiculo) => vehiculo.Placa === numPlaca && vehiculo.hora_salida === ""
    );

    if (!vehiculo) {
        alert("Error: No se encontró el vehículo");
        return;
    }

    // Marcar la hora de salida
    vehiculo.hora_salida = new Date().toLocaleTimeString();
    vehiculo.salida= Date.now();

    if(vehiculo.tipo_Vehiculo == "Carro"){
        ganancias+= tarifa_carro;
        tarifa_pagar = tarifa_carro;
    }
    if(vehiculo.tipo_Vehiculo == "Motocicleta"){
        ganancias+= tarifa_motocicleta;
        tarifa_pagar = tarifa_motocicleta;
    }
    if(vehiculo.tipo_Vehiculo == "Bus"){
        ganancias+= tarifa_bus;
        tarifa_pagar = tarifa_bus;
    }

    textingresos=document.getElementById('ingresostext');
    textingresos.innerHTML=`<i class="fa-solid fa-money-bill-trend-up"></i> Ingresos: $${ganancias}`;

    //Span Factura del vehiculo
    spanFactura(vehiculo, tarifa_pagar)

    // Liberar la plaza

    const textbahiasdispo= document.getElementById('bahiasDispo');
    cantBahias+= 1;
    textbahiasdispo.innerHTML=`<i class="fa-solid fa-square-parking"></i> Espacios Disponibles: ${cantBahias}`;

    placatext.textContent = `----`;
    icoParking.style.color = "rgb(5, 90, 0)";
    buttonPark.textContent = "Asignar";
    buttonPark.onclick = function () {
        plazaOcupada(icoParking, buttonPark, vehiculo.bahia, vehiculo.zona, placatext.id);
    };

    console.table(Estacionamiento);
}

function spanFactura(vehiculo, tarifa_pagar){

    let total_pagar=0;
    
    document.body.appendChild(spanPlaca);
    spanPlaca.id = "card-pago";
    spanPlaca.className = "cardPago";
    spanPlaca.style.zIndex=1000;

    let titulo = document.createElement("h2");
    titulo.innerHTML = ` <i class="fa-solid fa-receipt"></i> Factura ${vehiculo.Placa}`;

    const diferencia = vehiculo.salida - vehiculo.entrada; // Diferencia en milisegundos
    const minutos = Math.floor((diferencia / 1000) / 60); // Convertir a minutos
    const horas = Math.floor(minutos / 60); // Convertir a horas
    const minutosRestantes = minutos % 60; // Minutos restantes de la hora
    const segundos = Math.floor((diferencia / 1000) % 60); // Segundos restantes

    //calcular total a pagar

    if(tiempotarifa == "fija"){
        total_pagar= tarifa_pagar;
    }else if(tiempotarifa == "30"){
        total_pagar= tarifa30min(total_pagar, tarifa_pagar, horas, minutosRestantes, segundos)
    }else if(tiempotarifa== "1"){
        total_pagar= tarifa1hr(total_pagar, tarifa_pagar,horas, segundos)
    }

    let informacion = document.createElement("p");
    informacion.innerHTML= `
       
        Hora Entrada: ${vehiculo.hora_entrada} <br>
        Hora Salida: ${vehiculo.hora_salida} <br>
        Estacionamiento: ${vehiculo.zona} <br>
        Bahia: ${vehiculo.bahia} <br> <br>
        Tiempo en estacionamiento <br>
        ${horas }h : ${minutosRestantes}m : ${segundos}s <br><br>

        Tarifa: $${tarifa_pagar}<br>
        Total a pagar: $${total_pagar}
    `


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

//calcular tarifa de 1hora
function tarifa1hr(total_pagar, tarifa_pagar, horas){
    if(horas == 0){
       total_pagar=tarifa_pagar;
    }else if(horas >= 1){
        total_pagar= horas*tarifa_pagar;
    }
    
    return total_pagar
    
}

//calcular tarifa de 30min
function tarifa30min(total_pagar, tarifa_pagar, horas, minutosRestantes, ){
    if(horas==0){
        return total_pagar=tarifa_pagar;
    }
    else if(horas >= 1){
        total_pagar= (horas * 2) * tarifa_pagar;
    }  
    if(minutosRestantes <= 30){
        total_pagar+= tarifa_pagar;
    }else if(minutosRestantes >= 40){
        total_pagar+= (tarifa_pagar * 2);
    }
    
    return total_pagar;
}

function addtarifas(){

    document.body.appendChild(spanPlaca);
    spanPlaca.id = "card-pago";
    spanPlaca.className = "cardPago";
    spanPlaca.style.zIndex=1000;

    let Tarifas= document.createElement('p');

    

    Tarifas.textContent= `Tarifa Carro: $${tarifa_carro} | Tarifa Moto: $${tarifa_motocicleta} | Tarifa Bus: $${tarifa_bus}`;


    let titulo = document.createElement("h2");
    titulo.textContent = "Tarifas Parking 24/7";

    let inputTBus= document.createElement("input")
    inputTBus.type= `number`
    inputTBus.placeholder=`Tarifa Bus`
    

    let inputTCarro= document.createElement("input")
    inputTCarro.type= `number`
    inputTCarro.placeholder=`Tarifa Carro`
   

    let inputTMotocicleta= document.createElement("input")
    inputTMotocicleta.type= `number`
    inputTMotocicleta.placeholder=`Tarifa Motocicleta`
    

    let text= document.createElement("p");
    text.innerHTML=`<i class="fa-solid fa-stopwatch"></i>  Cobro de tiempo de tarifa: `


    let tarifaXtiempo= document.createElement("select");
    
    let opcion1= document.createElement("option");
    opcion1.value= "30";
    opcion1.innerHTML= ` 30 Min`;
    opcion1.className="option"

    let opcion2= document.createElement("option")
    opcion2.value= "1";
    opcion2.innerHTML= ` 1 Hora`;
    opcion2.className="option";

    let opcion3= document.createElement("option")
    opcion3.value= "fija";
    opcion3.textContent= "Tarifa Fija";
    opcion3.className="option"

    tarifaXtiempo.appendChild(opcion1)
    tarifaXtiempo.appendChild(opcion2)
    tarifaXtiempo.appendChild(opcion3)

    let buttonmodf = document.createElement("button");
    buttonmodf.textContent = "Modificar Tarifas";
    buttonmodf.onclick= function(){

        let t_bus=parseInt(inputTBus.value); 

        if(!isNaN(t_bus)){
            tarifa_bus= t_bus
        }

        let t_carro=parseInt(inputTCarro.value);
        if(!isNaN(t_carro)){
            tarifa_carro= t_carro
        }

        let t_motocicleta=parseInt(inputTMotocicleta.value);
        if(!isNaN(t_motocicleta)){
            tarifa_motocicleta= t_motocicleta
        }

        spanPlaca.innerHTML= "";
        spanPlaca.remove();

        //se guartda el tiempo del cobro de la tarifa
        tiempotarifa= tarifaXtiempo.value
        let tarifatext= document.getElementById("tarifatext")
        tarifatext.innerHTML=`<i class="fa-solid fa-stopwatch"></i>  Cobro de tiempo de tarifa: ${tiempotarifa}`
        
    }

    let buttonClose = document.createElement("button");
    buttonClose.textContent = "Cerrar";
    buttonClose.onclick= function(){

        spanPlaca.innerHTML= "";
        spanPlaca.remove();
    }

    spanPlaca.appendChild(titulo)
    spanPlaca.appendChild(Tarifas)

    spanPlaca.appendChild(inputTCarro)
    spanPlaca.appendChild(inputTMotocicleta)
    spanPlaca.appendChild(inputTBus)

    spanPlaca.appendChild(text)
    spanPlaca.appendChild(tarifaXtiempo)

    spanPlaca.appendChild(buttonmodf)
    spanPlaca.appendChild(buttonClose)

}


function membresias(){
    document.body.appendChild(spanPlaca);
    spanPlaca.id = "card-pago";
    spanPlaca.className = "cardPago";
    spanPlaca.style.zIndex=1000;

    let titulo = document.createElement("h2");
    titulo.textContent = "Membresias Parking 24/7";

    let text= document.createElement("p");
    text.textContent= "Proximamente Membresias"

    let buttonClose = document.createElement("button");
    buttonClose.textContent = "Cerrar";
    buttonClose.onclick= function(){

        spanPlaca.innerHTML= "";
        spanPlaca.remove();
    }

    spanPlaca.appendChild(titulo)
    spanPlaca.appendChild(text)
    spanPlaca.appendChild(buttonClose)
}


function ComoFuncionoSpan(){

    document.body.appendChild(spanPlaca);
    spanPlaca.id = "card-pago";
    spanPlaca.className = "cardPago";
    spanPlaca.style.zIndex=1000;

    let titulo = document.createElement("h2");
    titulo.innerHTML = `<i class="fa-regular fa-circle-question"></i> Como funciono.`;

    let informacion = document.createElement("p");
    informacion.innerHTML= `

        <b>Parkin 24/7</b> cuenta con un encabezado intuitivo que te permite personalizar tu estacionamiento,
        desde asignar la cantidad de bahias y nombre a cada estacionamiento que desees crear. <br><br>

        Ademas cuentas con un buscador donde ingresas el numero de Placa y te arroja los siguientes datos:<br>
            1. Numero de bahia.<br>
            2. Estacionamiento donde se encuentra.<br><br>

        Cuando un vehiculo sale, puedes visualizar su Factura donde encontraras: <br>
            1. Hora de entrada del vehiculo. <br>
            2. Hora de salida del vehiculo. <br>
            3. Estacionamiento donde se encuentra. <br>
            4. Numero de bahia. <br>
            5. Tiempo en estacionamiento. <br>
            6. Tarifa correspondiente por tipo de vehiculo. <br>
            7. Total a pagar. <br> <br>

        Si desea informacion mas detallada sobre los vehiculos 
        que ingresan abre la consola del navegador  <br> <br>

        <b> RECUERDA </b>  <br>
        1. Configurar las tarifas que por defecto estan en $0. <br>
        2. Configurar el tipo de tarifa:  <br>
            - Aplicar la tarifa cada 30 minutos. <br>
            - Aplicar la tarifa cada 1 hora. <br>
            - Aplicar una tarifa fija. <br> <br>
   
    `
    informacion.style.overflow= "auto" ;
    informacion.style.height= "300px" ;


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


function clearSpan (spanPlaca){

    console.table(Estacionamiento)
    spanPlaca.innerHTML='';
    spanPlaca.remove();
}

document.addEventListener('DOMContentLoaded', () => {
    ComoFuncionoSpan();
  });