export function validating(input) {
    const inputType = input.dataset.type;       //ingresa al valor de la data
    if (valitors[inputType]) (
        valitors[inputType](input)          //accede al metodo de el objeto seleccionado
    )
    if (input.validity.valid) {       //valid propiedad del objeto input
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = '';
    } else {
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = showErrMessages(inputType, input);
    }
}

const errType = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customErr"
]

const errMessages = {
    name: {
        valueMissing: 'Campo nombre no puede estar vacio',
    },
    email: {
        valueMissing: 'Campo email no puede estar vacio',
        typeMismatch: 'El correo no es valido',
    },
    password: {
        valueMissing: 'Campo contraseña no puede estar vacio',
        patternMismatch: '6 a 12 caracteres, al menos una letra mayuscula, una minuscula y un numero',
    },
    birthDay: {
        valueMissing: 'Campo nacimiento no puede estar vacio',
        customErr: 'No eres mayor de edad',
    },
    number: {
        valueMissing: 'Campo numero no puede estar vacio',
        patternMismatch: 'el formato requerido es xxxxxxxxxx (10 numeros)',
    },
    address:{
        valueMissing: 'Campo direccion no puede estar vacio',
        patternMismatch: 'la direccion debe contener de 2 a 40 caracteres',
    },
    city:{
        valueMissing: 'Campo ciudad no puede estar vacio',
        patternMismatch: 'la ciudad debe contener de 2 a 40 caracteres',
    },
    province:{
        valueMissing: 'Campo provincia no puede estar vacio',
        patternMismatch: 'la provicia debe contener de 2 a 40 caracteres',
    },
}

function showErrMessages(inputType, input) {
    let message = '';
    errType.forEach(error => {
        if (input.validity[error]) {
            message = errMessages[inputType][error];
        }
    })
    return message
}

const valitors = {
    birth: (input) => validateBirth(input),
}
const validateBirth = (input) => {
    const birthDay = new Date(input.value);
    let message = "";
    if (!adult(birthDay)) message = "No eres mayor de edad";     //(it works)
    input.setCustomValidity(message);
}

const adult = (birthDay) => {
    const currentDate = new Date();
    const dateDifference = new Date(birthDay.getUTCFullYear() + 18, birthDay.getUTCMonth(), birthDay.getUTCDate());
    return dateDifference <= currentDate
}