let list_tareas= JSON.parse(localStorage.getItem("tareas"))||[]
let list_secciones= JSON.parse(localStorage.getItem("secciones")) || []


//Crea las secciones y tareas con la informacion guardada del localStorage
function reloadpages(){
    
    console.log(list_secciones)
    console.log(list_tareas)

    //se agrega el boton para ver todas las secciones
    const aside= document.getElementById("content_buttons_section")
            const btnsection= document.createElement("button")
            btnsection.id='todas'
            btnsection.className='btnsection'
            btnsection.textContent= 'Todas las secciones'
            btnsection.addEventListener(`click`,()=>{
                mostrarPorSeccion('todas','')
            })

            aside.appendChild(btnsection)

    //cargar todas las secciones y tareas
    cargarSeccionesyTareas()

    //obtener mensaje de notas generales
    textarea=document.getElementById("notaGen")
    mensajeGeneral=localStorage.getItem("notaGen")
    textarea.addEventListener('keyup',()=>{
        saveNotasGen()
    })

    if(mensajeGeneral==null || mensajeGeneral=='' ){
        console.log(mensajeGeneral)
        textarea.placeholder=`Tus notas aqui!`

    }else{
        mensajeGeneral=localStorage.getItem("notaGen")
        textarea.textContent=`${mensajeGeneral}`
    }

    localStorage.setItem("tareas",JSON.stringify(list_tareas))



}

//cargar todas las secciones y tareas
function cargarSeccionesyTareas(){

    const main=document.getElementById('container')

    list_secciones.forEach((name_seccion) => {

        const card= document.createElement('section') // contenedor de la seccion
        card.className="seccion"
        const idcard= card.id=`seccion_${name_seccion}`

        headerCard= document.createElement('header') // encabezado donde va nombre de la seccion y botones
        headerCard.className="seccion_header"

        h2_header= document.createElement('h2')
        h2_header.textContent=`${name_seccion}`
        headerCard.appendChild(h2_header)

        content_btn= document.createElement("div") //contenedor de los botones

        btnadd=document.createElement('button')
        btnadd.innerHTML=`<i class="fa-solid fa-plus"></i>`
        btnadd.id="btnadd"
        btnadd.title="Crear tarea"
        btnadd.onclick=function(){
            SpanAddTarea(card,idcard)
        }
        content_btn.appendChild(btnadd)

        btnedt=document.createElement('button')
        btnedt.innerHTML='<i class="fa-solid fa-pen-to-square"></i>'
        btnedt.id='btnEdtSeccion'
        btnedt.title='Editar Seccion'
        btnedt.onclick=function(){
            edtSeccion(h2_header,name_seccion,btnsection)
        }
            
        content_btn.appendChild(btnedt)

        btnelm= document.createElement("button")
        btnelm.innerHTML=`<i class="fa-solid fa-trash"></i></i>`
        btnelm.id='btnelm'
        btnelm.title="Eliminar seccion"
        btnelm.onclick=function(){
            elmSeccion(card,btnsection)
        }

        content_btn.appendChild(btnelm)


        headerCard.appendChild(content_btn)

        card.appendChild(headerCard)

        main.appendChild(card)


        //Se buscan las tareas que vayan en esa seccion
        list_tareas.forEach((tarea)=>{

            if(`seccion_${name_seccion}` == tarea.seccion){
                

                const contentTarea=document.createElement("div")
                contentTarea.className="content_tareas"
            
                const mensaje= document.createElement('p')
                mensaje.textContent=tarea.tarea;
                if(tarea.realizada == "False"){
                    mensaje.style.textDecoration= "none";

                }else{
                    mensaje.style.textDecoration= "line-through";

                }

                if(tarea.fecha !=="" || tarea.hora !==""){
                    const fechah4= document.createElement('h4')
                    fechah4.innerHTML=`<i class="fa-regular fa-clock"></i> ${tarea.fecha} ${tarea.hora}`
                    fechah4.id='fecha-tarea'
                    contentTarea.appendChild(fechah4)
                }
                
            
                
            
                const contentBTN=document.createElement('div')
                contentBTN.className='content_buttons'
            
                const btnCheck=document.createElement("button")
                btnCheck.innerHTML=`<i class="fa-solid fa-check"></i>`
                btnCheck.id="check"
                btnCheck.title="Tarea realizada"
                btnCheck.onclick=function(){

                    if(tarea.realizada == "False"){
                        mensaje.style.textDecoration= "line-through";
                        tarea.realizada="True"
    
                        localStorage.setItem("tareas",JSON.stringify(list_tareas))
                    }else{
                        mensaje.style.textDecoration= "none";
                        tarea.realizada="False"

                        localStorage.setItem("tareas",JSON.stringify(list_tareas))
                    }
                    
                }
            
                const btnElm=document.createElement("button")
                btnElm.innerHTML=`<i class="fa-solid fa-trash-can"></i>`
                btnElm.id="trash"
                btnElm.title="Eliminar tarea"
                btnElm.onclick=function(){
                    elmTarea(mensaje)
                    contentTarea.textContent="";
                    contentTarea.remove()

                }
                const btnedt= document.createElement("button")
                btnedt.innerHTML=`<i class="fa-solid fa-pen-to-square"></i>`
                btnedt.id='btnedt'
                btnedt.title='Modificar'
                btnedt.onclick= function(){
                    SpanEdtTarea(contentTarea,tarea,card);
                }
                
                contentTarea.appendChild(mensaje)
                contentBTN.appendChild(btnCheck)
                contentBTN.appendChild(btnedt)
                contentBTN.appendChild(btnElm)
            
                contentTarea.appendChild(contentBTN)
            
                card.appendChild(contentTarea)

            }
        })

        //boton solo para mostrar las tareas de esa seccion
        const aside= document.getElementById("content_buttons_section")
            const btnsection= document.createElement("button")
            btnsection.id=name_seccion
            btnsection.className='btnsection'
            btnsection.textContent= name_seccion
            btnsection.addEventListener(`click`,(name_seccion)=>{
                mostrarPorSeccion(name_seccion,main,card)
            })

            aside.appendChild(btnsection)
    });

}

//span donde se digita la informacion para agregar una seccion
function spanAddSeccion(){

    
    spanPlaca= document.createElement("div")
    spanPlaca.id = "spanAddSeccion";
    spanPlaca.className = "Span";
    spanPlaca.style.zIndex=1000;

    headerSpan= document.createElement("header")
    

    Spanh3= document.createElement("h3")
    Spanh3.textContent="Crear nueva Seccion"

    headerSpan.appendChild(Spanh3)

    buttonClose = document.createElement("button");
    buttonClose.id="btn-close"
    buttonClose.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    buttonClose.onclick= function(){
        clearSpan(spanPlaca)
    }

    headerSpan.appendChild(buttonClose)

    let input=document.createElement("input")
    input.id="inputNote"
    input.placeholder="Nombre de la seccion"

    let buttonAdd= document.createElement("button")
    buttonAdd.textContent="Crear"
    buttonAdd.onclick= function(){
        newSeccion()

        clearSpan(spanPlaca)
    }

    
    spanPlaca.appendChild(headerSpan)
    spanPlaca.appendChild(input)
    spanPlaca.appendChild(buttonAdd)

    document.body.appendChild(spanPlaca);

}

//para crear una nueva seccion
function newSeccion (){
    //revisa que el input tenga contenido
    const inputs= document.getElementById('inputNote')
   
        if (inputs.value==="") {
            alert("Agrega el nombre de la seccion")
            inputLleno= false;
        }else{
            const main=document.getElementById('container')
            const name_seccion= document.getElementById("inputNote").value; //toma nombre de la seccion

            const card= document.createElement('section') //creamos el contenedor de la seccion
            card.className="seccion"
            const idcard= card.id=`seccion_${name_seccion}`

            headerCard= document.createElement('header') //creamos el encabezado donde va nombre de la seccion y botones
            headerCard.className="seccion_header"

            const h2_header= document.createElement('h2')
            h2_header.textContent=`${name_seccion}`
            headerCard.appendChild(h2_header)

            content_btn= document.createElement("div") //contenedor de los botones

            const btnadd=document.createElement('button')
            btnadd.innerHTML=`<i class="fa-solid fa-plus"></i>`
            btnadd.id="btnadd"
            btnadd.title="Crear tarea"
            btnadd.onclick=function(){
                SpanAddTarea(card,idcard)
            }
            
            content_btn.appendChild(btnadd)

            const btnedt=document.createElement('button')
            btnedt.innerHTML='<i class="fa-solid fa-pen-to-square"></i>'
            btnedt.id='btnEdtSeccion'
            btnedt.title='Editar Seccion'
            btnedt.onclick=function(){
                edtSeccion(h2_header,name_seccion,btnsection)
            }
                
            content_btn.appendChild(btnedt)

            const btnelm= document.createElement("button")
            btnelm.innerHTML=`<i class="fa-solid fa-trash"></i></i>`
            btnelm.id='btnelm'
            btnelm.title="Eliminar seccion"
            btnelm.onclick=function(){
                elmSeccion(card,btnsection)
            }

            content_btn.appendChild(btnelm)


            headerCard.appendChild(content_btn)

            card.appendChild(headerCard)

            main.appendChild(card)

           //boton solo para mostrar las tareas de esa seccion
            const aside= document.getElementById("content_buttons_section")
            const btnsection= document.createElement("button")
            btnsection.id=name_seccion
            btnsection.className='btnsection'
            btnsection.textContent= name_seccion
            btnsection.addEventListener(`click`,(name_seccion)=>{
                mostrarPorSeccion(name_seccion,main,card)
            })

            aside.appendChild(btnsection)

            list_secciones.push(name_seccion)
            console.table(list_secciones)
            localStorage.setItem("secciones",JSON.stringify(list_secciones))
            

        } 
    
    
}

//editar nombre de una seccion
function edtSeccion(h2,nombreSeccion,btnsection){

    spanPlaca= document.createElement("div")
    spanPlaca.id = "spanEdtSeccion";
    spanPlaca.className = "Span";
    spanPlaca.style.zIndex=1000;

    headerSpan= document.createElement("header")
    

    Spanh3= document.createElement("h3")
    Spanh3.textContent="Editar Seccion"

    headerSpan.appendChild(Spanh3)

    buttonClose = document.createElement("button");
    buttonClose.id="btn-close"
    buttonClose.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    buttonClose.onclick= function(){
        clearSpan(spanPlaca)
    }

    headerSpan.appendChild(buttonClose)

    let input=document.createElement("input")
    input.id="inputNote"
    input.placeholder="Nombre de la seccion"
    input.value=nombreSeccion

    let buttonAdd= document.createElement("button")
    buttonAdd.textContent="Crear"
    buttonAdd.onclick= function(){
        h2.textContent=input.value;

        list_secciones=list_secciones.map((seccion)=>{
            if(seccion === nombreSeccion){
                seccion=input.value

                //cambia el contenido del boton correspondiente del aside
                //nuevo nombre de la seccion
                console.log(seccion)
                btnsection.id=seccion
                btnsection.className='btnsection'
                btnsection.textContent= seccion

                return seccion
            }
        })
        console.log(list_secciones)

        list_tareas.forEach((tarea)=>{
            if(tarea.seccion === `seccion_${nombreSeccion}`){
                
                tarea.seccion=`seccion_${input.value}`
            }
        })


        console.log(list_tareas)
        localStorage.setItem("secciones",JSON.stringify(list_secciones))
        localStorage.setItem("tareas",JSON.stringify(list_tareas))
        clearSpan(spanPlaca)
    }

    
    spanPlaca.appendChild(headerSpan)
    spanPlaca.appendChild(input)
    spanPlaca.appendChild(buttonAdd)

    document.body.appendChild(spanPlaca);

}

//para eliminar una seccion
function elmSeccion(card,btnsection){
   

    //eliminar la seccion 
    idcard=card.id
    list_secciones=list_secciones.filter((seccion)=> `seccion_${seccion}` !== idcard)
    localStorage.setItem("secciones",JSON.stringify(list_secciones))
    card.remove()

    //eliminar boton de aside
    btnsection.remove()



    //eliminar las tareas de esa secciones
    console.log(idcard)
    list_tareas=list_tareas.filter((tarea)=>tarea.seccion!==idcard)
    console.log(list_tareas)
    localStorage.setItem("tareas",JSON.stringify(list_tareas))
    

}
//span donde se digita la informacion para agregar una tarea 
function SpanAddTarea(card,idcard){

    const spanPlaca= document.createElement("div")
    spanPlaca.id = "spanAddTarea";
    spanPlaca.className = "Span";
    spanPlaca.style.zIndex=1000;

    const headerSpan= document.createElement("header")
    

    const Spanh3= document.createElement("h3")
    Spanh3.textContent="Crear nueva tarea"

    headerSpan.appendChild(Spanh3)

    const buttonClose = document.createElement("button");
    buttonClose.id="btn-close"
    buttonClose.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    buttonClose.onclick= function(){
        clearSpan(spanPlaca)
    }

    headerSpan.appendChild(buttonClose)

    const inputTarea=document.createElement("input")
    inputTarea.id="inputNote"
    inputTarea.placeholder="Tarea"
    inputTarea.autocomplete='off'

    const inputfecha=document.createElement('input')
    inputfecha.type='date'
    inputfecha.id='fechaTarea'

    const inputHora=document.createElement('input')
    inputHora.type='time'
    inputHora.id='horaTarea'

    const buttonAdd= document.createElement("button")
    buttonAdd.textContent="Crear"
    buttonAdd.onclick= function(){

        const mensaje= inputTarea.value;
        const fecha=inputfecha.value;
        const hora=inputHora.value;

        console.log(fecha)

        if(mensaje==""){
            alert("Ingrese una tarea")
            clearSpan(spanPlaca)
        }else{

            tarea=list_tareas.push({
                tarea:`${mensaje}`,
                seccion:`${idcard}`,
                realizada:`False`,
                fecha:`${fecha}`,
                hora:`${hora}`
            })

            AddTarea(card,mensaje,fecha,hora)

            localStorage.setItem("tareas",JSON.stringify(list_tareas))
            console.table(list_tareas)
            clearSpan(spanPlaca)
        }
    }
    
    spanPlaca.appendChild(headerSpan)
    spanPlaca.appendChild(inputTarea)
    spanPlaca.appendChild(inputfecha)
    spanPlaca.appendChild(inputHora)
    spanPlaca.appendChild(buttonAdd)


   

    document.body.appendChild(spanPlaca);

    

}

//para editar una tarea
function SpanEdtTarea(contentTarea,tarea,card){

    const spanPlaca= document.createElement("div")
    spanPlaca.id = "spanAddTarea";
    spanPlaca.className = "Span";
    spanPlaca.style.zIndex=1000;

    const headerSpan= document.createElement("header")
    

    const Spanh3= document.createElement("h3")
    Spanh3.textContent="Crear nueva tarea"

    headerSpan.appendChild(Spanh3)

    const buttonClose = document.createElement("button");
    buttonClose.id="btn-close"
    buttonClose.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    buttonClose.onclick= function(){
        clearSpan(spanPlaca)
    }

    headerSpan.appendChild(buttonClose)

    const inputTarea=document.createElement("input")
    inputTarea.id="inputNote"
    inputTarea.value=tarea.tarea;

    const buttonAdd= document.createElement("button")
    buttonAdd.textContent="Crear"
    buttonAdd.onclick= function(){

        const mensaje= inputTarea.value;

        if(mensaje==""){
            alert("Ingrese una tarea")
            clearSpan(spanPlaca)
        }else{

            tarea.tarea= mensaje
            contentTarea.remove()


            AddTarea(card,mensaje)

            localStorage.setItem("tareas",JSON.stringify(list_tareas))
            console.table(list_tareas)
            clearSpan(spanPlaca)
        }
    }


    
    spanPlaca.appendChild(headerSpan)
    spanPlaca.appendChild(inputTarea)
    spanPlaca.appendChild(buttonAdd)


   

    document.body.appendChild(spanPlaca);

    

}
//para agregar una tarea 
function AddTarea(card,tarea,fecha,hora){

    const contentTarea=document.createElement("div")
    contentTarea.className="content_tareas"

    const mensaje= document.createElement('p')
    mensaje.textContent=tarea;
    mensaje.style.textDecoration= "none";

    contentTarea.appendChild(mensaje)

    const contentBTN=document.createElement('div')
    contentBTN.className='content_buttons'

    if(fecha !=="" || hora !==""){
        const fechah4= document.createElement('h4')
        fechah4.innerHTML=`<i class="fa-regular fa-clock"></i> ${fecha} ${hora}`
        fechah4.id='fecha-tarea'
        contentTarea.appendChild(fechah4)
    }
 


    const btnCheck=document.createElement("button")
    btnCheck.innerHTML=`<i class="fa-solid fa-check"></i>`
    btnCheck.id="check"
    btnCheck.title="Tarea realizada"
    btnCheck.onclick=function(){
        list_tareas.forEach((Tarea)=>{
            if(Tarea.tarea===tarea){

                if(mensaje.style.textDecoration === "none"){
                    mensaje.style.textDecoration= "line-through";
                    Tarea.realizada="True";
        
                    localStorage.setItem("tareas",JSON.stringify(list_tareas))
                }else{
                    mensaje.style.textDecoration= "none";
                    Tarea.realizada="False"
        
                    localStorage.setItem("tareas",JSON.stringify(list_tareas))
                }

            }
        })
        
    }

    const btnElm=document.createElement("button")
    btnElm.innerHTML=`<i class="fa-solid fa-trash-can"></i>`
    btnElm.id="trash"
    btnElm.title="Eliminar tarea"
    btnElm.onclick=function(){
        elmTarea(mensaje)
        contentTarea.textContent="";
        contentTarea.remove()
    }

    const btnEdt= document.createElement("button")
    btnEdt.id="btnedt"
    btnEdt.title="Modificar"
    btnEdt.innerHTML=`<i class="fa-solid fa-pen-to-square"></i>`
    btnEdt.onclick= function(){
        SpanEdtTarea(contentTarea,tarea,card);
    }


    contentBTN.appendChild(btnCheck)
    contentBTN.appendChild(btnEdt)
    contentBTN.appendChild(btnElm)

    contentTarea.appendChild(contentBTN)

    card.appendChild(contentTarea)

}
//para eliminar una tarea
function elmTarea(mensaje){
    list_tareas= list_tareas.filter((tarea)=> mensaje.textContent !== tarea.tarea)
    localStorage.setItem("tareas",JSON.stringify(list_tareas))
    console.log(`Tarea Borrada: ${mensaje.textContent}`)

    
}
//para eliminar el span
function clearSpan (spanPlaca){

    spanPlaca.innerHTML='';
    spanPlaca.remove();
}
//para guardar la informacion del textarea
function saveNotasGen(){
    textarea=document.getElementById("notaGen").value
    localStorage.setItem("notaGen",(textarea))
    
}
//mostrar tareas por seccion 
function mostrarPorSeccion(seccion,main){
    main.innerHTML=''
    let tareaEncontrada= false;
    if(seccion === 'todas'){
        const main=document.getElementById('container')
        const aside= document.getElementById("content_buttons_section")
        main.innerHTML=''
        aside.innerHTML=''
        reloadpages()
    }else{
        nombre=seccion.target.innerHTML;
        seccion=`seccion_${seccion.target.id}`;
        main.innerHTML=`<h2>${nombre}</h2>`;
        list_tareas.filter((tarea)=>{
           
            if(tarea.seccion === seccion){
                
                tareaEncontrada=true;

                const contentTarea=document.createElement("div")
                contentTarea.className="content_tareas"
                contentTarea.style.boxShadow='5px 10px 10px 1px rgba(0, 0, 0, 0.306)'
                
                const mensaje= document.createElement('p')
                mensaje.textContent=tarea.tarea;
                if(tarea.realizada == "False"){
                    mensaje.style.textDecoration= "none";

                }else{
                    mensaje.style.textDecoration= "line-through";

                }

                if(tarea.fecha !=="" || tarea.hora !==""){
                    const fechah4= document.createElement('h4')
                    fechah4.innerHTML=`<i class="fa-regular fa-clock"></i> ${tarea.fecha} ${tarea.hora}`
                    fechah4.id='fecha-tarea'
                    contentTarea.appendChild(fechah4)
                }
                    
                const contentBTN=document.createElement('div')
                contentBTN.className='content_buttons'
            
                const btnCheck=document.createElement("button")
                btnCheck.innerHTML=`<i class="fa-solid fa-check"></i>`                
                btnCheck.id="check"
                btnCheck.title="Tarea realizada"
                btnCheck.onclick=function(){

                    if(tarea.realizada == "False"){
                        mensaje.style.textDecoration= "line-through";
                        tarea.realizada="True"
            
                        localStorage.setItem("tareas",JSON.stringify(list_tareas))
                    }else{
                        mensaje.style.textDecoration= "none";
                        tarea.realizada="False"

                        localStorage.setItem("tareas",JSON.stringify(list_tareas))
                    }
                        
                }
                
                const btnElm=document.createElement("button")
                btnElm.innerHTML=`<i class="fa-solid fa-trash-can"></i>`
                btnElm.id="trash"
                btnElm.title="Eliminar tarea"
                btnElm.onclick=function(){
                    elmTarea(mensaje)
                    contentTarea.textContent="";
                    contentTarea.remove()

                }
                const btnedt= document.createElement("button")
                btnedt.innerHTML=`<i class="fa-solid fa-pen-to-square"></i>`
                btnedt.id='btnedt'
                btnedt.title='Modificar'
                btnedt.onclick= function(){
                    SpanEdtTarea(contentTarea,tarea,main);
                }
                    
                contentTarea.appendChild(mensaje)
                contentBTN.appendChild(btnCheck)
                contentBTN.appendChild(btnedt)
                contentBTN.appendChild(btnElm)
             

                contentTarea.appendChild(contentBTN)
                
                main.appendChild(contentTarea)

            }
        })
        if(tareaEncontrada === false){
            main.innerHTML+='<p>Crea tareas para esta seccion</p>';
        }
    }
}

//para activar la funcion de cargar los datos del localstorage
window.onload= function(){
    reloadpages();
}
