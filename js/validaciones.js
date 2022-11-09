export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoDeInput, input)
    }

}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacio"
    },
    email: {
        valueMissing: "El campo correo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, debe contener al menos una letra, un número y un carácter especial"
    },
    nacimento: {
        valueMissing: "Fecha de nacimiento no puede estar vacio",
        customError: "Debes tener al menor 18 años de edad"
    },
    numero: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es xxxx-xxxxxx"
    },
    direccion:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La direccion debe contener entre 10 y 40 caractereres"
    },
    ciudad:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La ciudad debe contener entre 10 y 40 caractereres"
    },
    estado:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El estado debe contener entre 10 y 40 caractereres"
    }
};

const validadores = {
    nacimento: (input) => validarNacimiento(input),
};

function mostrarMensajeError(tipoDeInput,input){
    let mensaje = ""
    tipoDeErrores.forEach(error => {
        if(input.validity[error]){
            console.log(tipoDeInput,error)
            console.log(input.validity[error])
            console.log(mensajeError[tipoDeInput][error]);
            mensaje = mensajeError[tipoDeInput][error];
        }
    })
    return mensaje
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!mayorDeEdad(fechaCliente)){
    mensaje = "Debes tener al menor 18 años de edad"
    }
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
        );
    return diferenciaFechas <= fechaActual;
}