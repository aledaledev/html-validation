import { validating } from "./validaciones.js";

const inputs = document.querySelectorAll('input')      //existen muchos inputs
inputs.forEach(input => {
    input.addEventListener('blur', (event) => {     //se activa cuando salimos del input                    
        validating(event.target)                //pasa el evento para asi a traves de este descubrimos el target
        console.log(input.validity);
    })

});