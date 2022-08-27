export function validating(input){
    const inputType = input.dataset.type;       //ingresa al valor de la data
    if(valitors[inputType])(
        valitors[inputType](input)          //accede al metodo de el objeto seleccionado
    )
    if(input.validity.valid){       //valid propiedad del objeto input
        input.parentElement.classList.remove('input-container--invalid');
    } else {
        input.parentElement.classList.add('input-container--invalid');
    }
}

const errMessages = {
     name:{
        valueMising:'Este campo no puede estar vacio',
     },
     email:{
        valueMising:'Este campo no puede estar vacio',
        typeMismatch:'El correo no es valido',
     },
     password: {
        valueMising:'Este campo no puede estar vacio',
        patternMismatch:'no te hagas, pone algo bien',
     },
     birthDay:{
        valueMising:'Este campo no puede estar vacio',
        customErr:'No eres mayor de edad',
     }
}

const valitors = {
    birth: (input) => validateBirth(input),
}
const validateBirth = (input)=>{
    const birthDay = new Date(input.value);
    let message = "";
    if(!adult(birthDay)) message = "No eres mayor de edad";     //(it works)
    input.setCustomValidity(message);
}

const adult = (birthDay)=>{ 
    const currentDate = new Date();      
    const dateDifference = new Date(birthDay.getUTCFullYear()+18,birthDay.getUTCMonth(),birthDay.getUTCDate());
    return dateDifference <= currentDate
}