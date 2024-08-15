import * as Save  from './Save.js'

export const appointments_onmouseenter = (parametersArray) => {    //Cuando se posiciona el mouse dentro de la cita en la agenda
    let controlId = parametersArray[0]        
    appointments_onmouseenter_helper(controlId)
}
export const appointments_onload = (parametersArray) => {
    let controlId = parametersArray[0]        
    appointments_onmouseenter_helper(controlId)
}
export const appointments_onmouseleave = (parametersArray) => {    
    let controlId = parametersArray[0]    
    let appointment_tooltip = document.getElementById(`tooltip-${controlId}`)
    setTimeout(() => {
        appointment_tooltip.classList.remove('activo')        
    }, 500);
    
}

const appointments_onmouseenter_helper = (controlId) => {
    let appointment_tooltip = document.getElementById(`tooltip-${controlId}`)
    appointment_tooltip.classList.add('activo')

    let control = document.getElementById(`appId_${controlId}`).parentElement
    const x = control.offsetLeft
    const y = control.offsetTop
        
    const leftTooltip = control.clientLeft
    let topTooltip = control.clientHeight

    const top = y  - (appointment_tooltip.clientHeight)
    const left = x
    
    appointment_tooltip.style.setProperty("left",`${left}px`)
    appointment_tooltip.style.setProperty("top",`${top}px`)    
}

//Aceptar una cita
export const appointments_acceptance = (parametersArray) => {
    console.log(`appointments_acceptance: ${parametersArray[0]}`)
    Save.save_acceptance(parametersArray[0])
}