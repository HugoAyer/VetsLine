import { crearElemento } from '../../factory.js';
import { dayOfWeekEN, getCookie,convert_time_int_fromString,convert_time_string_fromInt } from '../../functions.js';
import * as LocalStorage from '../../LocalStorage.js'
import {Day} from '../../Models/Availability.js'
import * as Save from './Save.js'
import {scheduler_row_sub_details} from './Constructor.js'
import * as Vets from '../../vet.js'

const LoggedVetId = getCookie('LoggedVetId');

//Events
export function event_availability_onChange(parametersArray) {    
    let name = parametersArray[0]
    let weekDay = parametersArray[1]
    let row_number = parametersArray[2]
    let availability_check = document.getElementById(`availability_${name}`)    
        if (availability_check.checked == true) {
            let new_timeSet = new Day(800,1900)
            const availability = LocalStorage.Get('Availability')
            availability[weekDay.day].push(new_timeSet)

            LocalStorage.Save('Availability', availability) //Guarda los cambios en el array
            Save.save_vet_availability(availability) //Guarda los cambios en la BD

            //document.getElementById(`availability_${name}_na`).style.display = 'none'  //La etiqueta que dice "No disponible"
            document.getElementById(`options_${name}`).style.display = 'block'
            event_visible_controls(weekDay, name, 'block')
        }
        if (availability_check.checked == false) {
            const availability = LocalStorage.Get('Availability')
            availability[weekDay.day]=[]
            LocalStorage.Save('Availability', availability) //Guarda los cambios en el array
            Save.save_vet_availability(availability) //Guarda los cambios en la BD
            event_visible_controls(weekDay, name, 'none')
        }    
}
export function event_visible_controls(weekDay, name, visible) {
    //document.getElementById(`availability_${name}_na`).style.display = (visible == 'block') ? 'none' : 'block'  //La etiqueta que dice "No disponible"
    event_visible_controls_details(name, visible) //Cambia a visibles todos los controles adicionales
    let inputs = document.getElementById(`availability_${name}_controls`) //Obtiene los inputs de horario inicial y final
    if (visible == 'block') {
        inputs.classList.remove("tab-noselection") //Remueve la clase que le da el efecto al aparecer
        inputs.classList.add("schedule-input-selected") //Agrega la clase que le da el efecto al aparecer               
    }
    else {
        inputs.classList.remove("schedule-input-selected") //Remover la clase que le da el efecto al aparecer
        inputs.classList.add("tab-noselection")
        remove_rows_per_day(weekDay.day)
    }
}
export function event_visible_controls_details(name, display) {
    document.getElementById(`time_start_${name}`).style.display = display
    document.getElementById(`time_end_${name}`).style.display = display    
    document.getElementById(`type_${name}_videocall`).style.display = display    
    document.getElementById(`type_${name}_present`).style.display = display    
    // if(document.getElementById(`type_${name}_onSite`) != undefined) document.getElementById(`type_${name}_onSite`).style.display = display
    document.getElementById(`select_control_${name}_videocall`).style.display = display
    document.getElementById(`select_control_${name}_present`).style.display = display
    // if(document.getElementById(`select_control_${name}_onSite`) != undefined) document.getElementById(`select_control_${name}_onSite`).style.display = display
    document.getElementById(`options_${name}`).style.display = display    
}
export function remove_rows_per_day(name) {
    let rows_per_day = scheduler_rows.querySelectorAll('[name="availability_' + name + '"]')
    rows_per_day.forEach((element) => {
        if (element.getAttribute("row") != `${name}_1`) element.remove()
    })
}
export function event_add_time(weekDay) {    //Agrega el evento click al botón "Añadir línea"
    const name = `${weekDay.day}_1`
    let day_div = document.getElementById(`scheduler_${weekDay.day}`)
    const add_btn = document.getElementById(`add_${name}`)
    let end_time = 0
    if (add_btn != null) add_btn.addEventListener('click', function () {        
        let Availability = LocalStorage.Get('Availability')
        let rows_per_day = Availability[weekDay.day]
        let maxEnd = Math.max.apply(null,rows_per_day.map(function(r) {return r.end}))                

        let new_row_number = rows_per_day.length + 1

        let availability = document.getElementById(`availability_${name}`)
        if (availability.checked === true) {
            let start_time_str = convert_time_string_fromInt(maxEnd)
            let end_time_str = time_add_hours(start_time_str, 1)
            let start_time_int = convert_time_int_fromString(start_time_str)
            let end_time_int = convert_time_int_fromString(end_time_str)
            
            let new_timeSet = new Day(start_time_int,end_time_int)
            const availability = LocalStorage.Get('Availability')
            availability[weekDay.day].push(new_timeSet)

            LocalStorage.Save('Availability', availability) //Guarda los cambios en el array
            Save.save_vet_availability(availability) //Guarda los cambios en la BD

            let br = crearElemento("br", "", [])
            day_div.append(br.elemento())
            console.log(new_timeSet)
            let row_sub = scheduler_row_sub_details(weekDay, new_row_number, start_time_str, end_time_str,new_timeSet)
            day_div.append(row_sub.elemento())                                     
        }
    })
}

//Events availability
export const event_availability_type_click = (parametersArray) => {
    let name = parametersArray[0]
    let day = parametersArray[1].day
    let type = parametersArray[2]
    let row_number = parametersArray[3]     
      
    const availability = LocalStorage.Get('Availability')
    let button = document.getElementById(name)
    console.log(row_number - 1)
    
    switch (type) {        
        case 'videocall':
            if (availability[day][row_number - 1].videocall == "Y") {
                availability[day][row_number - 1].videocall = "N"
                button.className = ''
                event_availability_type_click_Off(button,'warning')
            }
            else {
                availability[day][row_number - 1].videocall = "Y"
                button.className = ''
                event_availability_type_click_On(button,'warning')
            }
            break
        case 'present':
            if (availability[day][row_number - 1].present == "Y") {
                availability[day][row_number - 1].present = "N"
                button.className = ''
                event_availability_type_click_Off(button,'danger')
            }
            else {
                availability[day][row_number - 1].present = "Y"
                button.className = ''
                event_availability_type_click_On(button,'danger')
            }
            break
        case 'onSite':
                if (availability[day][row_number - 1].onSite == "Y") {
                    availability[day][row_number - 1].onSite = "N"
                    button.className = ''
                    event_availability_type_click_Off(button,'secondary')
                }
                else {
                    availability[day][row_number - 1].onSite = "Y"
                    button.className = ''
                    event_availability_type_click_On(button,'secondary')
                }
                break
            
    }
    LocalStorage.Save('Availability', availability)        
    Save.save_vet_availability(availability)
}
export const event_availability_type_click_Off = (button,btnType) => {
    console.log('Sí entró aquí')
    button.classList.add("btn")
    button.classList.add(`btn-outline-${btnType}`)
    button.classList.add("type-of-call-button")
}
export const event_availability_type_click_On = (button,btnType) => {    
    button.classList.add("btn")
    button.classList.add(`btn-${btnType}`)
    button.classList.add("type-of-call-button")
}

//Events input time
export const event_time_start_onChange = (parametersArray) => {    
    let name = parametersArray[0]
    let day = parametersArray[1]    
    let row_number = parametersArray[2] 
    

    const input_start = document.getElementById(name)
    
    if(input_start.value != '') {
        const availability = LocalStorage.Get('Availability')            
        availability[day][row_number - 1].start  = convert_time_int_fromString(input_start.value)
        LocalStorage.Save('Availability', availability)        
        Save.save_vet_availability(availability)
    }
}
export const event_time_end_onChange = (parametersArray) => {    
    let name = parametersArray[0]
    let day = parametersArray[1]    
    let row_number = parametersArray[2] 

    const input_end = document.getElementById(name)
    
    if(input_end.value != '') {
        const availability = LocalStorage.Get('Availability')    
        let input_end = document.getElementById(name)
        availability[day][row_number - 1].end  = convert_time_int_fromString(input_end.value)
        LocalStorage.Save('Availability', availability)        
        Save.save_vet_availability(availability)
    }        
}

//Event add time
export const event_add_click = (parametersArray) =>
{
    let weekDay = parametersArray[0]
    const name = `${weekDay.day}_1`
    let day_div = document.getElementById(`scheduler_${weekDay.day}`)
    let Availability = LocalStorage.Get('Availability') //Obtiene la agenda de disponibilidad    
        let rows_per_day = Availability[weekDay.day]        
        let maxEnd = Math.max.apply(null,rows_per_day.map(function(r) {return r.end})) //Obtiene el máximo horario de fin
        let new_row_number = rows_per_day.length + 1
        let availability = document.getElementById(`availability_${name}`)
        if (availability.checked === true) {
            let start_time_str = convert_time_string_fromInt(maxEnd)
            let end_time_str = time_add_hours(start_time_str, 1)
            let start_time_int = convert_time_int_fromString(start_time_str)
            let end_time_int = convert_time_int_fromString(end_time_str)
            
            let new_timeSet = new Day(start_time_int,end_time_int)
            const availability = LocalStorage.Get('Availability')
            availability[weekDay.day].push(new_timeSet)

            LocalStorage.Save('Availability', availability) //Guarda los cambios en el array
            Save.save_vet_availability(availability) //Guarda los cambios en la BD

            let br = crearElemento("br", "", [])
            day_div.append(br.elemento())
            let row_sub = scheduler_row_sub_details(weekDay, new_row_number, start_time_str, end_time_str,new_timeSet)
            day_div.append(row_sub.elemento())                                     
        }
}
//Event remove
export const event_remove_click = (parametersArray) => {
    let name = `${parametersArray[0]}_timeSet`
    let weekDay = parametersArray[1]    
    let row_number = parametersArray[2]     
    let row = document.getElementById(name) 
    
    if(row_number > 1) { //La línea 1 se trata diferente
    
        const availability = LocalStorage.Get('Availability')    
        
        availability[weekDay.day].splice(row_number - 1,1) //Remueve la fila del array
        
        LocalStorage.Save('Availability', availability) //Guarda los cambios en el array
        Save.save_vet_availability(availability) //Guarda los cambios en la BD

        row.classList.remove("opacity-fade-animation")
        row.classList.add("opacity-fade-animation-removed") //Inserta la clase para darle el efecto de desvanecer
        setTimeout(() => {
        row.remove() 
        }, 500);

    }
    if(row_number == 1){
        name = `${weekDay.day}_${row_number}`
        const availability = LocalStorage.Get('Availability')    
        
        availability[weekDay.day].splice(row_number - 1,1)
        
        LocalStorage.Save('Availability', availability)        
        Save.save_vet_availability(availability)

        let check = document.getElementById(`availability_${name}`)
        check.checked = false
        event_visible_controls(weekDay, name, 'none')
    }
    
}
export function time_add_hours(num, addedTime) {
    let time_span = parseFloat(num.replace(':', ''))
    let hours = (time_span < 60) ? 0 : parseInt(time_span / 100)
    let new_hours = hours + parseFloat(addedTime)
    if (new_hours == 24) new_hours = 0
    let minutes = (time_span < 60) ? time_span : parseFloat(time_span - (hours * 100))
    return `${(new_hours < 10) ? '0' + new_hours : new_hours}:${(parseFloat(minutes) < 10) ? '0' + minutes : minutes}`
}
export const event_copy_click = (parametersArray) => {
    console.log(parametersArray)
    let options = []
    let weekDay = parametersArray[1]
    let sunday_opt = {text: 'Domingo',value: 'sunday'}
    let monday_opt = {text: 'Lunes',value: 'monday'}
    let tuesday_opt = {text: 'Martes',value: 'tuesday'}
    let wednesday_opt = {text: 'Miércoles',value: 'wednesday'}
    let thrusday_opt = {text: 'Jueves',value: 'thursday'}
    let friday_opt = {text: 'Viernes',value: 'friday'}
    let saturday_opt = {text: 'Sábado',value: 'saturday'}
    
    switch (weekDay.day){
        case 'sunday':
            options.push(monday_opt,tuesday_opt,wednesday_opt,thrusday_opt,friday_opt,saturday_opt)
            break
        case 'monday':
            options.push(sunday_opt,tuesday_opt,wednesday_opt,thrusday_opt,friday_opt,saturday_opt)
            break
        case 'tuesday':
            options.push(sunday_opt,monday_opt,wednesday_opt,thrusday_opt,friday_opt,saturday_opt)
            break
        case 'wednesday':
            options.push(sunday_opt,monday_op,tuesday_opt,thrusday_opt,friday_opt,saturday_opt)
            break
        case 'thursday':
            options.push(sunday_opt,monday_op,tuesday_opt,wednesday_opt,friday_opt,saturday_opt)
            break
        case 'friday':
            options.push(sunday_opt,monday_op,tuesday_opt,wednesday_opt,thrusday_opt,saturday_opt)
            break
        case 'saturday':
            options.push(sunday_opt,monday_op,tuesday_opt,wednesday_opt,thrusday_opt,friday_opt)
            break
    }    
    bootbox.prompt({
        title: 'Copiar el horario en los siguientes días:',
        inputType:'checkbox',
        inputOptions: options,
        callback: function(result) {
            let checkeds = result
            console.log(checkeds)
            if(checkeds.length > 0) {
                bootbox.confirm('¿Desea reemplazar las configuraciones existentes?',
                    function (result) {
                        if (result) {
                            
                            checkeds.forEach(day => {
                                event_copy_click_replace(weekDay.day,day)
                            })                            
                        }
                    }
                );
            }
        }
    })
}

//Event select price change
export const event_select_price_onChange = (parametersArray) => {
    let name = parametersArray[0]
    let day = parametersArray[1]    
    let row_number = parametersArray[2]    
    let type = parametersArray[3] 
    const availability = LocalStorage.Get('Availability')    
    const select_control = document.getElementById(name)
    console.log(select_control)
    console.log(select_control.value)
    availability[day][row_number - 1][`idPrice_${type}`] = select_control.value
    LocalStorage.Save('Availability', availability)        
        Save.save_vet_availability(availability)
    
}

//Reemplazar la programación de un día
const event_copy_click_replace = (source,day) => {
    let Availabilities = LocalStorage.Get('Availability')
    Availabilities[day] = Availabilities[source]
    LocalStorage.Save('Availability',Availabilities)
    Save.save_vet_availability(Availabilities)
    Vets.clear_availability()
    Vets.fillAvailabilityDays(Availabilities)
}