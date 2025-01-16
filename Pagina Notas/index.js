let list_tareas= JSON.parse(localStorage.getItem("tareas"))||[]
let list_secciones= JSON.parse(localStorage.getItem("secciones")) || []

//Crea las secciones y tareas con la informacion guardada del localStorage
function reloadpages(){
    
    console.log(list_secciones)
    console.log(list_tareas)

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

        btnelm= document.createElement("button")
        btnelm.innerHTML=`<i class="fa-solid fa-trash"></i></i>`
        btnelm.id='btnelm'
        btnelm.title="Eliminar seccion"
        btnelm.onclick=function(){
            elmSeccion(card)
        }

        content_btn.appendChild(btnelm)


        headerCard.appendChild(content_btn)

        card.appendChild(headerCard)

        main.appendChild(card)

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
                
                contentTarea.appendChild(mensaje)
                contentBTN.appendChild(btnCheck)
                contentBTN.appendChild(btnElm)
            
                contentTarea.appendChild(contentBTN)
            
                card.appendChild(contentTarea)

            }
        })
    });

    //obtener mensaje de notas generales
    textarea=document.getElementById("notaGen")
    mensajeGeneral=localStorage.getItem("notaGen")
    if(mensajeGeneral==null){
        console.log(mensajeGeneral)
        textarea.placeholder=`Tus notas aqui!`

    }else{
        mensajeGeneral=localStorage.getItem("notaGen")
        textarea.textContent=`${mensajeGeneral}`
    }

    localStorage.setItem("tareas",JSON.stringify(list_tareas))


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

            btnelm= document.createElement("button")
            btnelm.innerHTML=`<i class="fa-solid fa-trash"></i></i>`
            btnelm.id='btnelm'
            btnelm.title="Eliminar seccion"
            btnelm.onclick=function(){
                elmSeccion(card)
            }

            content_btn.appendChild(btnelm)


            headerCard.appendChild(content_btn)

            card.appendChild(headerCard)

            main.appendChild(card)

            list_secciones.push(name_seccion)
            console.table(list_secciones)
            localStorage.setItem("secciones",JSON.stringify(list_secciones))
            

        } 
    
    
}
//para eliminar una seccion
function elmSeccion(card){

    //eliminar la seccion 
    idcard=card.id
    list_secciones=list_secciones.filter((seccion)=> `seccion_${seccion}` !== idcard)
    localStorage.setItem("secciones",JSON.stringify(list_secciones))
    card.remove()

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

    const buttonAdd= document.createElement("button")
    buttonAdd.textContent="Crear"
    buttonAdd.onclick= function(){

        const tarea= inputTarea.value;

        if(tarea==""){
            alert("Ingrese una tarea")
            clearSpan(spanPlaca)
        }else{

            list_tareas.push({
                tarea:`${tarea}`,
                seccion:`${idcard}`,
                realizada:`False`
            })

            AddTarea(card,tarea)

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
function AddTarea(card,tarea){

    

    const contentTarea=document.createElement("div")
    contentTarea.className="content_tareas"

    const mensaje= document.createElement('p')
    mensaje.textContent=tarea;
    mensaje.style.textDecoration= "none";

    contentTarea.appendChild(mensaje)

    const contentBTN=document.createElement('div')
    contentBTN.className='content_buttons'

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

    contentBTN.appendChild(btnCheck)
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
    alert("Notas Generales Guardadas ✔")
}
//para activar la funcion de cargar los datos del localstorage
window.onload= function(){
    reloadpages();
}
