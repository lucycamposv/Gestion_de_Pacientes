//Objetos
class Paciente{
    constructor(nombre,apellido,edad,DNI,sexo){
        this.nombre=nombre
        this.apellido=apellido
        this.edad=edad
        this.DNI=DNI
        this.sexo=sexo
    }
    aviso(div){
        document.getElementById(div).innerHTML += `Ha añadido al paciente ${this.nombre} ${this.apellido} <br><br>`
    }
}

class Cita{
    constructor(fecha,hora,motivo,nombrePaciente,apellidoPaciente){
        this.fecha=fecha
        this.hora=hora
        this.motivo=motivo
        this.nombrePaciente=nombrePaciente
        this.apellidoPaciente=apellidoPaciente
    }
    aviso(div){
        document.getElementById(div).innerHTML += `Ha programado una cita con ${this.nombrePaciente} ${this.apellidoPaciente}: <br>Fecha: ${this.fecha} | Hora: ${this.hora} | Motivo: ${this.motivo} <br><br>`
    }
}

//Funciones
function botonOcultar(){
    divMain.innerHTML+=`
        <div><br></div>
        <div>
            <button type="button" class="btn btn-outline-secondary btn-sm" id="ocultar">Ocultar</button>
        </div>
    `
}

function botonAtras(){
    divMain.innerHTML+=`
        <div><br></div>
        <div>
            <button type="button" class="btn btn-outline-secondary btn-sm" id="atras">↲ Atras</button>
        </div>
    `
}

function botonOcultarAccion(boton,div){
    document.getElementById(boton).addEventListener('click',()=>{
        let divMensaje = document.getElementById(div)
        divMain.innerHTML=""
        divTitulo.innerHTML = "<h5 style='color:#309e93' class='tituloInicio'>Inicio</h5>"
        divBotones.innerHTML="<p class='tituloBarra'>Seleccione una acción</p>"
        divMensaje.innerHTML=""
    })
}

function calculoNumeroIMC(alturaPac,pesoPac){
    let altura = parseFloat(alturaPac)
    let peso = parseFloat(pesoPac) 
    
    let IMC = peso/(altura**2)
    IMC = IMC.toFixed(1)

    return IMC
}

function calculoIMC(boton){
    document.getElementById(boton).addEventListener('click',()=>{
        let nombres = []
        //Se crea una lista con los nombres de los pacientes para añadirlos al formulario
        listadoPac.forEach((paciente)=>{
            nombres.push(`<option>${paciente.nombre} ${paciente.apellido}</option>`) //Se añade el nombre y apellido de los pacientes al desplegable del formulario
        })

        divTitulo.innerHTML =`<h5 style='color:#309e93' class='tituloSecundario'>Cálculo del IMC</h5>`
        divBotones.innerHTML="<p class='tituloBarra'> Rellene los campos</p>"
        divMain.innerHTML = ""
        //Formulario para calcular el IMC
        divMain.innerHTML +=`
        <form id=formIMC class="row">
            <div class="col-md-2">
            <label for="pacSeleccionado" class="form-label">Paciente</label>
                <select id="pacSeleccionado" name="pacSeleccionado" class="form-select" required>
                    <option selected disabled value="">Seleccione un paciente</option>
                    ${nombres}
                </select>
            </div>
            <div class="col-md-2">
                <label for="altura" class="form-label">Altura (m)</label>
                <input class="form-control" id="alturaPac" name="altura" required>
            </div>
            <div class="col-md-2">
                <label for="peso" class="form-label">Peso (kg)</label>
                <input class="form-control" id="pesoPac" name="peso" required>
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="submit" class="btn btn-primary" id="aceptarIMC">Aceptar</button>
            </div>
        </form>
        `
        botonAtras()

        let numeroIMC = 0
        let nombre = ""
    
        let formularioPac = document.getElementById('formIMC')
        formularioPac.addEventListener('submit',(e)=>{
            e.preventDefault()
            let datForm = new FormData(e.target)
            numeroIMC = calculoNumeroIMC(datForm.get('altura'),datForm.get('peso')) //Se utilizan los valores del formulario para calcular el IMC
            nombre = datForm.get('pacSeleccionado')

            formularioPac.reset() //Se reinicia el formulario

            mostrarPac('atras')
        })

        document.getElementById('aceptarIMC').addEventListener('click',()=>{
            fetch('./IMC.json')
            .then(promise=>promise.json())
            .then(data=>{
                //Si los valores del IMC coinciden con los del json, se mostrará el rango
                data.forEach(lista => {
                    if(numeroIMC>=lista.limiteInferior&&numeroIMC<lista.limiteSup){
                        divMain.innerHTML +=`
                        <div>
                            <p>El paciente ${nombre} tiene un IMC de ${numeroIMC}. <strong>Índice: ${lista.nombre}</strong></p>
                        </div>
                        `
                    }
                })
                mostrarPac('atras')
            })
        })

        mostrarPac('atras')

    })
}

function nuevoPaciente(boton){
    document.getElementById(boton).addEventListener('click',()=>{
        divTitulo.innerHTML = "<h5 style='color:#309e93' class='tituloSecundario'>Nuevo paciente</h5>" 
        divBotones.innerHTML="<p class='tituloBarra'> Rellene todos los campos</p>"
        divMain.innerHTML = "<div id=mensaje></div>" 
        //Formulario para añadir datos del paciente
        divMain.innerHTML += 
        `<form id=formPaciente class="row">
            <div class="col-md-4">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="nombre" name="nombre" required>
            </div>
            <div class="col-md-4">
                <label for="apellido" class="form-label">Apellido</label>
                <input type="text" class="form-control" id="apellido" name="apellido" required>
            </div>
            <div class="col-md-4">
                <label for="edad" class="form-label">Edad</label>
                <input type="number" class="form-control" id="edad" name="edad" required>
            </div>
            <div class="col-md-3">
                <label for="DNI" class="form-label">DNI</label>
                <input type="text" class="form-control" id="DNI" name="DNI" required>
            </div>
            <div class="col-md-2">
            <label for="sexo" class="form-label">Sexo</label>
                <select id="sexo" name="sexo" class="form-select" required>
                    <option selected disabled value="">Seleccione un valor</option>
                    <option>H</option>
                    <option>M</option>
                </select>
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="submit" class="btn btn-primary">Agregar Paciente</button>
            </div>
        </form>`
        
        botonAtras()
    
        let formularioPac = document.getElementById('formPaciente')
        formularioPac.addEventListener('submit',(e)=>{
            e.preventDefault()
            console.log(e)
            //Creación del paciente
            let datForm = new FormData(e.target)
            let paciente = new Paciente(datForm.get("nombre"),datForm.get("apellido"),datForm.get("edad"),datForm.get("DNI"),datForm.get("sexo"))
            listadoPac.push(paciente)
            //Se actualiza la información en el localStorage
            localStorage.setItem('pacientes', JSON.stringify(listadoPac))
            formularioPac.reset() //Se reinicia el formulario
            paciente.aviso('mensaje')
        })
        mostrarPac('atras')
    })
}

function nuevaCita(boton){
    document.getElementById(boton).addEventListener('click',()=>{
        let nombres = []
        listadoPac.forEach((paciente)=>{
            nombres.push(`<option>${paciente.nombre} ${paciente.apellido}</option>`) //Se añade el nombre y apellido de los pacientes al desplegable del formulario
        })
        divTitulo.innerHTML = "<h5 style='color:#309e93' class='tituloSecundario'>Nueva cita</h5>"
        divBotones.innerHTML="<p class='tituloBarra'> Rellene todos los campos</p>"
        divMain.innerHTML="<div id=mensaje></div>"
        //Formulario para crear Cita
        divMain.innerHTML += 
        `<form id=formCita class="row">
            <div class="col-md-2">
            <label for="pacSeleccionado" class="form-label">Paciente</label>
                <select id="pacSeleccionado" name="pacSeleccionado" class="form-select" required>
                    <option selected disabled value="">Seleccione un paciente</option>
                    ${nombres}
                </select>
            </div>
            <div class="col-md-4">
                <label for="fecha" class="form-label">Fecha</label>
                <input type="date" class="form-control" id="fecha" name="fecha" required>
            </div>
            <div class="col-md-4">
                <label for="hora" class="form-label">Hora</label>
                <input type="time" class="form-control" id="hora" name="hora" required>
            </div>
            <div class="col-md-3">
                <label for="motivo" class="form-label">Motivo</label>
                <input type="text" class="form-control" id="motivo" name="motivo" required>
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="submit" class="btn btn-primary">Aceptar</button>
            </div>
        </form>`
        
        botonAtras()
    
        let formularioCita = document.getElementById('formCita')
        formularioCita.addEventListener('submit',(e)=>{
            e.preventDefault()
            console.log(e)
    
            let datForm = new FormData(e.target)
            let nombreApellido = datForm.get("pacSeleccionado").split(" ") //Separamos el nombre del apellido
            let cita = new Cita(datForm.get("fecha"),datForm.get("hora"),datForm.get("motivo"),nombreApellido[0],nombreApellido[1])
            listadoCitas.push(cita)
            localStorage.setItem('citas',JSON.stringify(listadoCitas))
            formularioCita.reset()
            cita.aviso('mensaje')
        })
    
        mostrarCita('atras')
    })
}

function mostrarPac(boton){
    document.getElementById(boton).addEventListener('click',()=>{
        let pacientesParseados = JSON.parse(localStorage.getItem('pacientes'))
        divTitulo.innerHTML = "<h5 style='color:#309e93' class='tituloSecundario'>Pacientes asignados</h5>"
        divBotones.innerHTML=`
            <div>
                <button type="button" class="btn btn-light btn-sm" id="b_NuevoPaciente">+ Nuevo Paciente</button>
            </div>
        `
        nuevoPaciente('b_NuevoPaciente')     

        divMain.innerHTML="<div id=mensaje></div><div><br></div>"  //Los mensajes aparecerán en primera línea
          
        pacientesParseados.forEach((paciente,indice)=>{
            divMain.innerHTML += `
            <div class="lista_pacientes" id="paciente${indice+1}" class="row">
                <p>&nbsp;&nbsp;&nbsp;${indice+1}. &nbsp;&nbsp;&nbsp;${paciente.nombre} ${paciente.apellido}</p>
                <div align="right"><button type="button" id="botonInfo${indice+1}" class="btn btn-outline-success btn-sm">+ Información</button></div>
            </div>`
        })

        botonOcultar()

        pacientesParseados.forEach((paciente,indice)=>{
            document.getElementById(`botonInfo${indice+1}`).addEventListener('click',()=>{
                divTitulo.innerHTML =`<h5 style='color:#309e93' class='tituloSecundario'>${paciente.nombre} ${paciente.apellido}</h5>`
                divBotones.innerHTML=`
                    <div>
                        <button type="button" class="btn btn-light btn-sm" id="IMC">Calculo del IMC</button>
                    </div>
                `
                divMain.innerHTML =`
                    <div align="right">
                        <button type="button" class="btn btn-outline-danger" id="botonEliminarPac">Eliminar paciente</button>
                    </div>
                    <p>&nbsp;&nbsp;&nbsp;Edad: ${paciente.edad}</p>
                    <p>&nbsp;&nbsp;&nbsp;DNI: ${paciente.DNI}</p>
                    <p>&nbsp;&nbsp;&nbsp;Sexo: ${paciente.sexo}</p>
                `
                botonAtras()
                mostrarPac('atras')

                calculoIMC('IMC')
            
                
            document.getElementById('botonEliminarPac').addEventListener('click',()=>{
                //Se elimina al paciente del array de pacientes
                listadoPac.splice(indice,1)
                //Se actualiza el local storage (Se envia el array modificado)
                localStorage.setItem('pacientes',JSON.stringify(listadoPac))
                
                //Se eliminan las citas del paciente eliminado
                let citasPac = listadoCitas.filter(array => (array.nombrePaciente!=paciente.nombre)&&(array.apellidoPaciente!=paciente.apellido))
                listadoCitas = citasPac //La lista sin las citas del paciente se actualiza
                localStorage.setItem('citas',JSON.stringify(listadoCitas))
            })
            //Se muestra en el html el paciente eliminado
            mostrarPac('botonEliminarPac')//Se muestran nuevamente los pacientes
        })
    })
        botonOcultarAccion('ocultar','mensaje')
    })
}

function mostrarCita(boton){
    document.getElementById(boton).addEventListener('click',()=>{
        let citasParseadas = JSON.parse(localStorage.getItem('citas'))
        divTitulo.innerHTML = "<h5 style='color:#309e93' class='tituloSecundario'>Citas programadas</h5>"
        divBotones.innerHTML=`
            <div>
                <button type="button" class="btn btn-light btn-sm" id="b_NuevaCita">+ Nueva Cita</button>
            </div>
        `
        nuevaCita('b_NuevaCita')

        divMain.innerHTML="<div id=mensaje></div><div><br></div>"
          
        citasParseadas.forEach((cita,indice)=>{
            divMain.innerHTML += `
            <div class="lista_citas" id="cita${indice+1}" class="row">
                <p> &nbsp;&nbsp;&nbsp;Fecha: ${cita.fecha} | Hora: ${cita.hora} | Paciente: ${cita.nombrePaciente} ${cita.apellidoPaciente} | Motivo: ${cita.motivo}</p>
                <i class="bi bi-trash-fill" id="botonCita${indice+1}" style='color:#e74d4d' align="right"></i>
            </div>`
        })

        botonOcultar()

        citasParseadas.forEach((cita,indice)=>{
            document.getElementById(`botonCita${indice+1}`).addEventListener('click',()=>{
                divMain.removeChild(document.getElementById(`cita${indice+1}`))
                listadoCitas.splice(indice,1)
                localStorage.setItem('citas',JSON.stringify(listadoCitas))
                document.getElementById('mensaje').innerHTML += `&nbsp;&nbsp;&nbsp;La cita del ${cita.fecha} a las ${cita.hora} se ha cancelado <br>`
            })
        })

        botonOcultarAccion('ocultar','mensaje')
    })
}

//Pacientes creados
let pac1 = new Paciente("Fernando","García",38,"147258J","H")
let pac2 = new Paciente("Laura","Martínez",57,"248615X","M")
let pac3 = new Paciente("Juan","Gomez",80,"369258F","H")
//Citas creadas
let cita1 = new Cita("2021-11-18","12:20","Pre-operatorio","Juan","Gomez")
let cita2 = new Cita("2021-11-19","11:30","Control diabetes","Fernando","García")
let cita3 = new Cita("2021-11-30","13:05","Cribado cáncer de mama","Laura","Martínez")
let cita4 = new Cita("2021-12-02","10:15","Revisión post-operatorio","Juan","Gomez")
let cita5 = new Cita("2021-12-17","12:00","Ecografía cardiaca","Fernando","García")
//Listas
let listadoPac = [pac1,pac2,pac3]
let listadoCitas = [cita1,cita2,cita3,cita4,cita5]

let divMain = document.getElementById('main')
let divTitulo = document.getElementById('nav_titulo')
let divBotones = document.getElementById('botones')

//Almacenamos la informacion en el localStorage
localStorage.setItem('pacientes', JSON.stringify(listadoPac))
localStorage.setItem('citas',JSON.stringify(listadoCitas))

//jQuery para animar y resturar el inicio de sesión
$(()=>{
    $('#pagPrincipal').hide();
    $('#btnInicio').prepend(`
    <div class="imagen" >
        <img src="img/icono_med.png" alt="" width="300" height="300">
    </div>
    <div class="d-grid gap-2 col-6 mx-auto">
        <button class="btn btn-outline-secondary" type="button" id="btnEntrar">Iniciar sesión</button>
    </div>
    `);
    $('#btnInicio').click(()=>{
        $('#pagPrincipal').fadeIn(1000)
        $('#btnInicio').hide();
        $('.card').remove();
        $('#formCita').remove();
        $('#formPaciente').remove();
        $('#ocultar').remove();
        $('#atras').remove();
        $('#b_NuevoPaciente').remove();
        $('#b_NuevaCita').remove();
        $('#botones').prepend(`<p class="tituloInicio">Seleccione una acción</p>`);
        $('.tituloSecundario').remove();
        $('.tituloBarra').remove();
        $('#nav_titulo').prepend(`<h5 style='color:#309e93' class="tituloPrincipal">Bienvenido/a</h5>`);
    });
    $('#b_salir').click(()=>{
        $('#pagPrincipal').hide();
        $('#btnInicio').fadeIn(1000);
        $('.tituloPrincipal').remove();
        $('.tituloInicio').remove();
    })
    $('.nav_salir').click(()=>{
        $('#pagPrincipal').hide();
        $('#btnInicio').fadeIn(1000);
        $('.tituloPrincipal').remove();
        $('.tituloInicio').remove();
    })
})

mostrarPac('b_pacientes')
mostrarCita('b_agenda')