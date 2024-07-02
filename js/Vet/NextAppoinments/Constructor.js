import { crearElemento } from '../../factory.js';
import { async_request_put, getCookie,get_date_as_string_short,convert_time_string_fromInt, i_type_appointment } from '../../functions.js';
import * as LocalStorage from '../../LocalStorage.js'
import * as Events  from './Events.js'

const dayOfWeek = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"]
const dayOfWeekEng = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]
const monthName = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']

const LoggedVetId = getCookie('LoggedVetId');

const NextAppointments_1 = document.getElementById("NextAppointments_next_1")
const NextAppointments_2 = document.getElementById("NextAppointments_next_2")
const NextAppointments_3 = document.getElementById("NextAppointments_next_3")
const NextAppointments_4 = document.getElementById("NextAppointments_next_4")
const NextAppointments_5 = document.getElementById("NextAppointments_next_5")
const NextAppointments_6 = document.getElementById("NextAppointments_next_6")
const NextAppointments_7 = document.getElementById("NextAppointments_next_7")

const NextAppointments_body = document.getElementById("NextAppointments_body")
const appointments_tooltip = document.getElementById('appointments-tooltip')

export const Init = () => {    
    const d = new Date()        
    let next_day_1 = next_day_date(d,0)       
    NextAppointments_1.append(next_day_control(next_day_1).elemento()) //Obtiene el siguiente día en formato string    
    let next_day_2 = next_day_date(d,1)    
    NextAppointments_2.append(next_day_control(next_day_2).elemento()) //Obtiene el siguiente día en formato string
    let next_day_3 = next_day_date(d,2)    
    NextAppointments_3.append(next_day_control(next_day_3).elemento()) //Obtiene el siguiente día en formato string
    let next_day_4 = next_day_date(d,3)    
    NextAppointments_4.append(next_day_control(next_day_4).elemento()) //Obtiene el siguiente día en formato string
    let next_day_5 = next_day_date(d,4)    
    NextAppointments_5.append(next_day_control(next_day_5).elemento()) //Obtiene el siguiente día en formato string
    let next_day_6 = next_day_date(d,5)    
    NextAppointments_6.append(next_day_control(next_day_6).elemento()) //Obtiene el siguiente día en formato string
    let next_day_7 = next_day_date(d,6)    
    NextAppointments_7.append(next_day_control(next_day_7).elemento()) //Obtiene el siguiente día en formato string

    let h = 0
    for(let i = 0; i < 2400; i = i + 100){        
        let half_time = i + 30
        let row_hour = crearElemento("tr","",["appointments-hour"])
        let hour = create_slot_hour(h)
        row_hour.addBelow(hour.elemento())
        let dummy_1 = create_slot_dummy(`slot_${get_date_as_string_short(next_day_1)}_${h}`)
        let dummy_2 = create_slot_dummy(`slot_${get_date_as_string_short(next_day_2)}_${h}`)
        let dummy_3 = create_slot_dummy(`slot_${get_date_as_string_short(next_day_3)}_${h}`)
        let dummy_4 = create_slot_dummy(`slot_${get_date_as_string_short(next_day_4)}_${h}`)
        let dummy_5 = create_slot_dummy(`slot_${get_date_as_string_short(next_day_5)}_${h}`)
        let dummy_6 = create_slot_dummy(`slot_${get_date_as_string_short(next_day_6)}_${h}`)
        let dummy_7 = create_slot_dummy(`slot_${get_date_as_string_short(next_day_7)}_${h}`)
        row_hour.addBelow(dummy_1.elemento())
        row_hour.addBelow(dummy_2.elemento())
        row_hour.addBelow(dummy_3.elemento())
        row_hour.addBelow(dummy_4.elemento())
        row_hour.addBelow(dummy_5.elemento())
        row_hour.addBelow(dummy_6.elemento())
        row_hour.addBelow(dummy_7.elemento())
        let row_half = crearElemento("tr","",["appointments-half-hour"])
        let half = create_slot_hour_dummy(`slot_${h + 30}`)        
        row_half.addBelow(half.elemento())
        let dummy_a_1 = create_slot_dummy(`slot_${get_date_as_string_short(next_day_1)}_${h + 30}`)
        let dummy_a_2 = create_slot_dummy(`slot_${get_date_as_string_short(next_day_2)}_${h + 30}`)
        let dummy_a_3 = create_slot_dummy(`slot_${get_date_as_string_short(next_day_3)}_${h + 30}`)
        let dummy_a_4 = create_slot_dummy(`slot_${get_date_as_string_short(next_day_4)}_${h + 30}`)
        let dummy_a_5 = create_slot_dummy(`slot_${get_date_as_string_short(next_day_5)}_${h + 30}`)
        let dummy_a_6 = create_slot_dummy(`slot_${get_date_as_string_short(next_day_6)}_${h + 30}`)
        let dummy_a_7 = create_slot_dummy(`slot_${get_date_as_string_short(next_day_7)}_${h + 30}`)
        row_half.addBelow(dummy_a_1.elemento())
        row_half.addBelow(dummy_a_2.elemento())
        row_half.addBelow(dummy_a_3.elemento())
        row_half.addBelow(dummy_a_4.elemento())
        row_half.addBelow(dummy_a_5.elemento())
        row_half.addBelow(dummy_a_6.elemento())
        row_half.addBelow(dummy_a_7.elemento())
        
        NextAppointments_body.append(row_hour.elemento())
        NextAppointments_body.append(row_half.elemento())
        h = h + 100
    }

    let Availability = LocalStorage.Get('Availability') //Calendario: Primero llena todos los cajones con disponibilidad
    let today = new Date()    

    for(let i = 0; i <= 6; i++ ) { //Aquí se llenan los días de disponibilidad        
        let tomorrow = add_day(today,i)        
        Fill_availability_day(Availability[dayOfWeekEng[tomorrow.getDay()]],tomorrow)
    }

    let Appointments = LocalStorage.Get('Appointments') //Obtiene la agenda de citas    

    Appointments.forEach((appointment) => { //Aquí se llena el calendario
        let slots = (appointment.endTime - appointment.startTime) / 50        
        let time = appointment.startTime               
            let time_start = fill_availability_day_helper(time)  
            let appDate = new Date(appointment.fullDate)
            appDate = add_day(appDate,1)            
            let idParent = `slot_${get_date_as_string_short(appDate)}_${time_start}`                             
            let parentControl = document.getElementById(idParent)
            let appointment_item = create_div_appointment(appointment,time,appointment.endTime,0)
                                    
            parentControl.append(appointment_item.elemento())  
            
            let control = document.getElementById(`appId_${appointment.idTransaction}`).parentElement       
            
            appointments_tooltip.append(create_div_appointment_tooltip(appointment).elemento())

            let appointment_tooltip = document.getElementById(`tooltip-${appointment.idTransaction}`)
            let timer            
            appointment_item.elemento().addEventListener('mouseleave', () => {
                timer = setTimeout(() => {
                    appointment_tooltip.classList.remove('activo')
                },500)
            })

            appointment_tooltip.addEventListener('mouseenter',() => clearTimeout(timer))
            appointment_tooltip.addEventListener('mouseleave',() => appointment_tooltip.classList.remove('activo'))
    })        
    
}
const get_date_as_string = (d) => {    
    let day = d.getDay()    
    let dayOfMonth = d.getDate()        
    return `${dayOfWeek[day]} ${dayOfMonth} de ${monthName[d.getMonth()]}`
}
const get_day_as_string_short = (d) => {    
    let day = d.getDay()    
    let dayOfMonth = d.getDate()        
    return `${dayOfWeek[day]} ${dayOfMonth}`
}

const get_today = (d) => {
    let strDate = get_date_as_string(d)
    let dateControl = crearElemento("h1","",[],strDate)
    return dateControl
}
const add_day = (actual,days) => {
    let newDate = new Date(actual)    
    newDate.setDate(actual.getDate() + days)
    return newDate
}
const next_day_date = (actual,days) => {
    let newDate = add_day(actual,days)    
    return newDate
}
const next_day_control = (actual) => {    
    let strDate = get_day_as_string_short(actual)
    let dateControl = crearElemento("span","",["text-secondary"],strDate)    
    return dateControl
}

//Llenado de espacios
const Fill_availability_day = (availabilities,date) => {
    let Availability = LocalStorage.Get('Availability') //Obtiene las citas       
    let Availability_atDay = Availability[dayOfWeekEng[date.getDay()]]    
     availabilities.forEach((availability) => {                        
        let slots = (availability.end - availability.start) / 50        
        let time = availability.start

        for(let s = 0; s < slots; s++){
            let parentId = `slot_${get_date_as_string_short(date)}_${fill_availability_day_helper(time)}`            
            let parentControl = document.getElementById(parentId)
            parentControl.innerHTML=''
            parentControl.classList.add("slot-available")            
            time = time + 50
        }           
     })

}
const fill_availability_day_helper = (start) => {    
    let timeId = ''
    switch(start){
        case start < 30:
            timeId = '0'
            break
        case start <= 100:
            timeId= '30'
            break
        default:
            let onlyHour = parseInt((start / 100)) * 100
            let onlyMinutes = start - (parseInt((start / 100)) * 100)
            timeId = onlyHour + ((onlyMinutes < 50)? 0 : 30)
            break            
    }

    return timeId
}

//Construcción de los controles
const create_div_appointment = (appointment,timeStart, timeEnd,slot) => {        
    let div_row_a = crearElemento("a",`appId_${appointment.idTransaction}`,["btn","btn-warning","appoinments"])    
    let parametersArray = [appointment.idTransaction]    

    let div_row = crearElemento("div","row",["row","w-100"])

    let div_row_col_2 = crearElemento("div","",["col-auto","text-start"])
    if(slot == 0)div_row_col_2.addBelow(i_type_appointment(appointment.type).elemento())
    let time_leyend = ` ${convert_time_string_fromInt(timeStart)} - ${convert_time_string_fromInt(timeEnd)}`
    let div_rov_a_pet_span = crearElemento("small","",[],(slot == 0)? ` ${appointment.pet.name}` : '&nbsp;')        
    let div_rov_a_time_span = crearElemento("small","",[],(slot == 0)? time_leyend : '&nbsp;')        
    
        div_row_col_2.addBelow(div_rov_a_pet_span.elemento())    
        div_row_col_2.addBelow(div_rov_a_time_span.elemento())                    
        div_row.addBelow(div_row_col_2.elemento())

        
        div_row_a.addEvent('mouseenter',Events.appointments_onmouseenter,parametersArray)        

        div_row_a.addBelow(div_row.elemento())

    return div_row_a
}
const create_slot_hour = (time) => {
    let td = crearElemento("td",`slot_${time}`,["appointments-hour-block"])
    let span = crearElemento("small","",[],`${ parseInt(convert_time_string_fromInt(time)) } ${(time >= 1200) ? ' PM' : ' AM'}`)    
    td.addBelow(span.elemento())
    return td
}
const create_slot_hour_dummy = (id) => {
    let td = crearElemento("td",id,["appointments-hour-block"])
    let br = crearElemento("br","",[])    
    td.addBelow(br.elemento())
    return td
}
const create_slot_dummy = (id) => {
    let td = crearElemento("td",id,["appointments-td"])
    let br = crearElemento("br","",[])    
    td.addBelow(br.elemento())
    return td
}


//Construcción de los tooltips
const create_div_appointment_tooltip = (appointment) => {
    let div_appointment_tooltip = crearElemento("div",`tooltip-${appointment.idTransaction}`,["appointment-tooltip"])
    let div_appointment_tooltip_img = crearElemento("img","",["img-fluid","rounded-circle","mb-3","img-thumbnail-smaller","shadow-sm"])
    div_appointment_tooltip_img.addAttributes([{"src":appointment.pet.image}])
    let div_appointment_tooltip_section = crearElemento("section","",["tooltip-section"])
    let div_appointment_tooltip_section_tooltip_species = crearElemento("p","",["tooltip-species"])    
    let div_appointment_tooltip_section_tooltip_species_i = crearElemento("i","",["fa-solid",appointment.pet.species.icon])
    let div_appointment_tooltip_section_tooltip_species_span = crearElemento("span","",["tooltip-name"],` ${appointment.pet.name}`)
    let div_appointment_tooltip_section_tooltip_synthom = crearElemento("p","",["tooltip-synthom"])
    let div_appointment_tooltip_section_tooltip_synthom_i = crearElemento("i","",["fa-solid",appointment.Synthom.icon])
    let div_appointment_tooltip_section_tooltip_synthom_span = crearElemento("span","",["tooltip-name"],` ${appointment.subject}`)

    let div_appointment_tooltip_section_tooltip_button = crearElemento("button","",[],"Abrir cita")

    div_appointment_tooltip_section_tooltip_species.addBelow(div_appointment_tooltip_section_tooltip_species_i.elemento())
    div_appointment_tooltip_section_tooltip_species.addBelow(div_appointment_tooltip_section_tooltip_species_span.elemento())

    div_appointment_tooltip_section_tooltip_synthom.addBelow(div_appointment_tooltip_section_tooltip_synthom_i.elemento())
    div_appointment_tooltip_section_tooltip_synthom.addBelow(div_appointment_tooltip_section_tooltip_synthom_span.elemento())

    div_appointment_tooltip_section.addBelow(div_appointment_tooltip_section_tooltip_species.elemento())
    div_appointment_tooltip_section.addBelow(div_appointment_tooltip_section_tooltip_synthom.elemento())
    div_appointment_tooltip_section.addBelow(div_appointment_tooltip_section_tooltip_button.elemento())

    div_appointment_tooltip.addBelow(div_appointment_tooltip_img.elemento())
    div_appointment_tooltip.addBelow(div_appointment_tooltip_section.elemento())

    let parametersArray = [appointment.idTransaction]
    div_appointment_tooltip.addEvent('load',Events.appointments_onload,parametersArray)

    return div_appointment_tooltip

}