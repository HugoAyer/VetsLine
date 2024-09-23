import { crearElemento,startsDiv } from '../factory.js';
import * as LocalStorage from '../LocalStorage.js'
import {get_date_as_short_desc,next_day_date, get_date_as_description,get_date_as_string_short,convert_time_string_fromInt,get_am_pm,get_month_as_desc_from_date,get_year_month_from_date,capitalLetter} from '../functions.js'
import {VetCard_OnClick,vet_schedule_tab_day_bar_click,schedule_box_onClick,Appointment_pet_onClick,Appointment_reazon_onClick,myAppointments_cards_appointment_onClick} from './Events.js'
import {freeCalls_card_constructor,credit_card_constructor,appointment_type_results} from '../appointments.js'

const vet_content_slots_days = document.getElementById('vet-content-slots-days')
// const AppointmentModal = document.getElementById('AppointmentModal')

export const CreateVetCard = (vet) => {
    let search_vets_vet = crearElemento('div','',["search-vets-vet"])
    let a = crearElemento('a','',[],'','button')
    //a.addAttributes([{"data-bs-toggle":"modal"},{"data-bs-target":"#VetModal"}])    
    let parametersArray = [vet]
    a.addEvent('click',VetCard_OnClick,parametersArray)
    let a_description = crearElemento('div','',["description","col-8"])
    let a_description_name = crearElemento('h6','',[],vet.name)
    let a_description_specialty = crearElemento('span','',[],vet.titleDesc)
    let a_description_others = crearElemento('small','',[],concatSpecialties(vet.specialties))
    let a_description_stars = startsDiv(vet.currentRate)
    a_description.addBelow(a_description_name.elemento())
    a_description.addBelow(a_description_specialty.elemento())
    a_description.addBelow(a_description_others.elemento())
    a_description.addBelow(a_description_stars.elemento())

    let a_picture = crearElemento('div','',["picture","col-4"])
    let a_picture_img = crearElemento('div','',["img"])
    let a_picture_img_img = crearElemento('img','',[])
    a_picture_img_img.addAttributes([{"src":vet.img_src}])
    a_picture_img.addBelow(a_picture_img_img.elemento())
    a_picture.addBelow(a_picture_img.elemento())
    let a_picture_text = crearElemento('p','',["picture-text"],'205 opiniones')
    a_picture.addBelow(a_picture_text.elemento())    
    a.addBelow(a_description.elemento())
    a.addBelow(a_picture.elemento())
    search_vets_vet.addBelow(a.elemento())

    return search_vets_vet
}
export function concatSpecialties(specialties){
    let _longChain = ''
    specialties.forEach(specialty => {
        _longChain = `${_longChain} ${specialty.name} |`
    })
    return _longChain
}
export const vet_content_address = (address)=> {
    const vet_content_address = crearElemento('div','',["vet-content-address"])
    const span_name = crearElemento('span','',[],address.name)
    const small_address = crearElemento('small','',[],`${address.street} Col. ${address.block} C.P. ${address.zipCode}`)
    const small_city = crearElemento('small','',[],`${address.city}, ${address.state_desc}`)
    let div_address_phone = crearElemento('div','',["address-phone"])
    let i_phone = crearElemento('i','',["fa-solid","fa-phone"])
    let small_address_phone = crearElemento('small','',[],` ${address.phone}`)
    div_address_phone.addBelow(i_phone.elemento())
    div_address_phone.addBelow(small_address_phone.elemento())
    vet_content_address.addBelow(span_name.elemento())
    vet_content_address.addBelow(small_address.elemento())
    vet_content_address.addBelow(small_city.elemento())
    vet_content_address.addBelow(div_address_phone.elemento())
    return vet_content_address
}
export const vet_content_ranking_generals = (ranking) => {
    const row = crearElemento('div','',["row","vet-content-review"])
    const col_5_desc = crearElemento('div','',["col-5"],ranking.desc)
    const col_5_rate = crearElemento('div','',["col-5"])    
    const col_5_rate_bar = crearElemento('div','',["vet-content-review-bar"])
    col_5_rate_bar.addAttributes([{"data":ranking.rate.toFixed(1)}])
    col_5_rate.addBelow(col_5_rate_bar.elemento())
    const col_1 = crearElemento('div','',["col-1","text-right"],ranking.rate.toFixed(1))
    row.addBelow(col_5_desc.elemento())
    row.addBelow(col_5_rate.elemento())
    row.addBelow(col_1.elemento())
    return row
}
export const vet_content_review = (review) => {
    const content_opinion = crearElemento('div','',["content-opinion"])
    const user = crearElemento('div','',["user"])
    const user_img = crearElemento('div','',["img"])
    const user_img_img = crearElemento('img','',[])
    user_img_img.addAttributes([{"src":review.user.image}])
    user_img.addBelow(user_img_img.elemento())
    user.addBelow(user_img.elemento())
    const user_name = crearElemento('div','',["name"])    
    const user_name_h6 = crearElemento('h6','',[],review.user.name)    
    const user_name_small = crearElemento('small','',[],get_date_as_short_desc(new Date(review.reviewDate)))
    user_name.addBelow(user_name_h6.elemento())
    user_name.addBelow(user_name_small.elemento())
    user.addBelow(user_img.elemento())
    user.addBelow(user_name.elemento())
    const text = crearElemento('div','',["text"])
    const text_p = crearElemento('p','',[],review.review)
    text.addBelow(text_p.elemento())
    const ranking = crearElemento('div','',["ranking"])
    let _totalRanking = 0.0
    review.rates.forEach(rate => {
        _totalRanking = _totalRanking + parseFloat(rate.rate)
    })    
    const ranking_stars = startsDiv(Math.trunc(_totalRanking / review.rates.length))
    ranking.addBelow(ranking_stars.elemento())    
    content_opinion.addBelow(user.elemento())    
    content_opinion.addBelow(text.elemento())
    content_opinion.addBelow(ranking.elemento())
    return content_opinion
}
export const schedule_days_accordion = () => { //Obtiene las siguientes fechas para el acordión
    const vet_schedule_tabs_accrodion_days = document.querySelector('.vet-content-tabs.accordion-days')
    let VetAvailableSlots = LocalStorage.Get('VetAvailableSlots') //Obtengo la disponibilidad del LocalStorage
    vet_schedule_tabs_accrodion_days.innerHTML = ''
    vet_content_slots_days.innerHTML=''
    const today = new Date()
    for(let d = 0; d < 7; d++){        
        let data_date = next_day_date(today,d) //Obtiene el siguiente día en formato de fecha, sumando lo que tenga la variable d            
        let slotsByDay = VetAvailableSlots.filter(element => element.date == get_date_as_string_short(data_date))    //Filtra los slots disponibles por día        
        let control = vet_schedule_tab_day(data_date,d)    
        vet_schedule_tabs_accrodion_days.append(control.elemento())
        if(slotsByDay.length > 0) vet_schedule_tab_day_slots(slotsByDay[0],get_date_as_string_short(data_date))
    }
}
//vet_schedule_tab_day
const vet_schedule_tab_day = (date,r) => {
    let a = crearElemento('a','',["vet-content-link","content-tab"])
    let small = crearElemento('small','',["content-tab"],get_date_as_description(date))
    let classes = []
    classes.push("vet-schedule-tab-day-bar")    
    if(r == 0) classes.push("active")        
    let div = crearElemento('div','',classes)
    div.addAttributes([{"data":get_date_as_string_short(date)}])
    a.addBelow(small.elemento())
    a.addBelow(div.elemento())
    let parametersArray = [get_date_as_string_short(date)]
    a.addEvent('click',vet_schedule_tab_day_bar_click,parametersArray) //Work in progress
    return a
}
const vet_schedule_tab_day_slots = (slotsByDay,date) => {    
        vet_content_slots_days.append(vet_schedule_tab_day_slots_content(slotsByDay,date).elemento())    
}
const vet_schedule_tab_day_slots_content = (slots,date)=> { //Función para crear las capas que contendrán los slots
    let vet_contents_info_schedule = crearElemento('div','',["vet-contents-info","schedule","inactive"])
    vet_contents_info_schedule.addAttributes([{"data":date}])    
    slots.data.forEach(slot => {
        let button = vet_schedule_tab_day_slots_content_button(slot,date)
        vet_contents_info_schedule.addBelow(button.elemento())
    })
    return vet_contents_info_schedule
}
const vet_schedule_tab_day_slots_content_button = (slot,date) => { //Función para crear el botón/slot de disponibilidad
    let classess_button = []
    classess_button.push("schedule-box")
    let appType = vet_schedule_tab_day_slots_content_appType(slot) //Obtiene el código del tipo de slot 1 = videollamada, 2 = presencial, 3 = en sítio
    if(appType == 2) classess_button.push("inperson") //Sí el tipo de cita es presencial, se agrega otra clase
    let button = crearElemento('button','',classess_button)        
        button.addAttributes([{"data":date},{"from":slot.start},{"to":slot.end},{"appType":appType}])
        let button_i = crearElemento('i','',["fa-solid",vet_schedule_tab_day_slots_content_appType_ico(slot)])//Crea el ícono del botón
        let leyend = `${convert_time_string_fromInt(slot.start)}${get_am_pm(slot.start)} - ${convert_time_string_fromInt(slot.end)}${get_am_pm(slot.end)} MXN ${parseFloat(vet_schedule_tab_day_slots_content_price(slot))}`
        let button_small = crearElemento('small','',[],leyend)
        button.addBelow(button_i.elemento())
        button.addBelow(button_small.elemento())
        let parametersArray = []
        button.addEvent('click',schedule_box_onClick,parametersArray)
        return button
}
const vet_schedule_tab_day_slots_content_appType = (slot) => {    
    if(slot.videocall == 'Y') return 1
    if(slot.present == 'Y') return 2
    if(slot.onSite == 'Y') return 3
}
const vet_schedule_tab_day_slots_content_appType_ico = (slot) => {    
    if(slot.videocall == 'Y') return 'fa-video'
    if(slot.present == 'Y') return 'fa-house'
    if(slot.onSite == 'Y') return 'fa-point'
}
const vet_schedule_tab_day_slots_content_price = (slot) => {    
    if(slot.videocall == 'Y') return slot.price_videocall
    if(slot.present == 'Y') return slot.price_present
    if(slot.onSite == 'Y') return slot.price_onSite
}
//Crear sección de mascotas al agendar una cita
export const vet_schedule_pets = () => { //Obtengo el catálogo de mascotas para agregarlo a la pantalla de selección de la cita
    let MyPetsCatalog = LocalStorage.Get('MyPetsCatalog')   
    let SchedulePets = document.querySelector('.SchedulePets')
    SchedulePets.innerHTML=''
    MyPetsCatalog.forEach(pet => {
        SchedulePets.append(control_pet(pet).elemento())
    })
}
const control_pet = (pet) => { //Creo el control de la mascota
    let schedule_pet = crearElemento('div','',["schedule-pet"])
    let schedule_pet_a = crearElemento('a','',["Appointment-pet"])
    schedule_pet_a.addAttributes([{"data":pet.idPet}])
    let schedule_pet_a_img = crearElemento('img','',[])
    schedule_pet_a_img.addAttributes([{"src":pet.image}])
    let schedule_pet_a_div = crearElemento('div','',["Appointment-pet-text"])
    let schedule_pet_a_div_span = crearElemento('span','',[],`${pet.name} | ${pet.race}`)
    schedule_pet_a_div.addBelow(schedule_pet_a_div_span.elemento())
    schedule_pet_a.addBelow(schedule_pet_a_img.elemento())
    schedule_pet_a.addBelow(schedule_pet_a_div.elemento())
    let parametersArray = []
    schedule_pet_a.addEvent('click',Appointment_pet_onClick,parametersArray) //Agrego el evento click
    schedule_pet.addBelow(schedule_pet_a.elemento())
    return schedule_pet
}
//Crear sección de sintomas
export const vet_appointment_reazon = (idPet) => {
    let MyPetsCatalog = LocalStorage.Get('MyPetsCatalog')   //Primero obtengo el catálogo de mascotas
    let pet_filter = MyPetsCatalog.filter(element => element.idPet == idPet) //Luego, filtro para obtener los datos de la mascota seleccionada
    let pet = pet_filter[0] 
    let synthoms = pet.species.Synthoms //Obtengo el listado de síntomas
    let vet_appointment_reazon = document.querySelector('.vet-appointment-reazon')
    vet_appointment_reazon.innerHTML='' //Limpio el control padre para borrar los botones existentes
    vet_appointment_reazon.append(vet_appointment_reazon_button_following().elemento())
    synthoms.forEach(synthom => {
        vet_appointment_reazon.append(vet_appointment_reazon_button(synthom.Synthom).elemento())
    })
    vet_appointment_reazon.append(vet_appointment_reazon_button_other().elemento())
}
const vet_appointment_reazon_button = (synthom) => {    //Crea el botón del síntoma
    let reazon_box = crearElemento('a','',["reazon-box","following",synthom.layer])
    let parametersArray = []
    reazon_box.addEvent('click',Appointment_reazon_onClick,parametersArray)
    reazon_box.addAttributes([{"data":synthom.idSynthom}])
    let reazon_box_i = crearElemento('i','',["fa-solid",synthom.icon])
    let reazon_box_small = crearElemento('small','',[],synthom.name)
    reazon_box.addBelow(reazon_box_i.elemento())
    reazon_box.addBelow(reazon_box_small.elemento())
    return reazon_box
}
const vet_appointment_reazon_button_following = () => { //Crea el botón para seguimiento
    let reazon_box = crearElemento('a','',["reazon-box","following","following"])
    let parametersArray = []
    reazon_box.addEvent('click',Appointment_reazon_onClick,parametersArray)
    reazon_box.addAttributes([{"data":"-1"}])
    let reazon_box_i = crearElemento('i','',["fa-solid","fa-arrows-rotate"])
    let reazon_box_small = crearElemento('small','',[],'Seguimiento')
    reazon_box.addBelow(reazon_box_i.elemento())
    reazon_box.addBelow(reazon_box_small.elemento())
    return reazon_box
}
const vet_appointment_reazon_button_other = () => { //Crea el botón del "Otros síntomas"
    let reazon_box = crearElemento('a','',["reazon-box","following","unknown"])
    let parametersArray = []
    reazon_box.addEvent('click',Appointment_reazon_onClick,parametersArray)
    reazon_box.addAttributes([{"data":"0"}])
    let reazon_box_i = crearElemento('i','',["fa-solid","fa-question"])
    let reazon_box_small = crearElemento('small','',[],'Otro')
    reazon_box.addBelow(reazon_box_i.elemento())
    reazon_box.addBelow(reazon_box_small.elemento())
    return reazon_box
}
//Crear sección de medios de pago
export const vet_appointment_paymmentMethod = () => {
    let LoggedUser = LocalStorage.Get('LoggedUser') 
    let freeCalls = LoggedUser.freeCalls
    let cards = LoggedUser.cards
    let schedule_payment_methods = document.querySelector('.schedule-payment-methods')
    schedule_payment_methods.innerHTML = ''
    if(freeCalls.length > 0){        
        schedule_payment_methods.append(freeCalls_card_constructor(LoggedUser.plan,freeCalls).elemento())
    }
    if(cards.length > 0){
        cards.forEach(card => {
            schedule_payment_methods.append(credit_card_constructor(card).elemento())
        })        
    }
}
//Crear cards de appointments en la pantalla principal
export const myAppointments_cards_month = (appointment) => {
    let month_row = crearElemento('div','',["month-row"])
    month_row.addAttributes([{"data":get_year_month_from_date(new Date(appointment.fullDate))}])
    let month_row_title = crearElemento('small','',["month-row-title"],capitalLetter(get_month_as_desc_from_date(new Date(appointment.fullDate))))
    month_row.addBelow(month_row_title.elemento())
    return month_row
}
export const myAppointments_cards_appointment = (appointment) => {
    let appointment_card = crearElemento('a','',["appointment-card",appointment_type_results(appointment.type).backColorClass]) 
    let parametersArray = [appointment.idTransaction]
    appointment_card.addEvent('click',myAppointments_cards_appointment_onClick,parametersArray) 
    let appointment_card_month_day = crearElemento('h1','',["month-day"],new Date(appointment.fullDate).getDate())
    let appointment_card_text = crearElemento('div','',["appointment-card-text"])
    let appointment_card_text_div = crearElemento('div','',["d-flex","align-middle"])
    let appointment_card_text_small = crearElemento('small','',[])    
    let appointment_card_text_small_i = crearElemento('i','',["fa-solid",appointment_type_results(appointment.type).ico])    
        
    appointment_card_text_small.addText(`${convert_time_string_fromInt(appointment.startTime)} ${get_am_pm(appointment.startTime)} - ${convert_time_string_fromInt(appointment.endTime)} ${get_am_pm(appointment.startTime)} `)
    appointment_card_text_small.addBelow(appointment_card_text_small_i.elemento())
    appointment_card_text_div.addBelow(appointment_card_text_small.elemento())
        
    let appointment_card_text_reazon = crearElemento('small','',[],appointment.subject)
    appointment_card_text.addBelow(appointment_card_text_div.elemento())
    appointment_card_text.addBelow(appointment_card_text_reazon.elemento())
    appointment_card.addBelow(appointment_card_month_day.elemento())
    appointment_card.addBelow(appointment_card_text.elemento())
    return appointment_card
}
// const myAppointments_cards_appointment_appType_ico = (appointment) => {    
//     if(appointment.type == 1) return 'fa-video'
//     if(appointment.type == 2) return 'fa-house'
//     if(appointment.type == 3) return 'fa-point'
// }
// export const myAppointments_cards_appointment_appType_back = (appointment) => {    
//     if(appointment.type == 1) return 'videocall'
//     if(appointment.type == 2) return 'following'
//     if(appointment.type == 3) return 'onSite'
// }