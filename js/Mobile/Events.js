import * as LocalStorage from '../LocalStorage.js'
import {concatSpecialties,vet_content_address,vet_content_ranking_generals,vet_content_review,schedule_days_accordion,vet_schedule_pets,vet_appointment_reazon,vet_appointment_paymmentMethod,myAppointments_cards_month,myAppointments_cards_appointment} from './Constructor.js'
import {getCookie,requestPromise,get_date_as_description,convert_time_string_fromInt,get_am_pm,convert_time_string_ampm_fromInt,capitalLetter} from '../functions.js';
import {vet_content_review_bar_filler} from './user.js'
import {Appointment_date} from '../Models/Appointments_date.js'
import { crearElemento } from '../factory.js';
import {Appointment} from '../Models/Appointments.js'
import {pet_items,pet_card_info,pet_card_badges,pets_card_pet_race,pets_card_pet_birth,pets_card_pet_colors,createGeneralCard} from '../pets.js'
import * as AppFunctions from '../appointments.js'
import {Appointment_vet} from '../vets.js'

const vet_step_tab_schedule_bar = document.getElementById('vet-step-tab-schedule-bar')
const vet_step_tab_pet_bar = document.getElementById('vet-step-tab-pet-bar')
const vet_step_tab_reason_bar = document.getElementById('vet-step-tab-reason-bar')
const vet_step_tab_desc_bar = document.getElementById('vet-step-tab-desc-bar')
const vet_step_tab_confirm_bar = document.getElementById('vet-step-tab-confirm-bar')
const vet_step_tab_payment_bar = document.getElementById('vet-step-tab-payment-bar')

const VetScheduleContent = document.getElementById('VetScheduleContent')
const VetScheduleStep1 = document.getElementById('VetScheduleStep1')
const VetScheduleStep2 = document.getElementById('VetScheduleStep2')
const VetScheduleStep3 = document.getElementById('VetScheduleStep3')
const VetScheduleStep4 = document.getElementById('VetScheduleStep4')
const VetScheduleStep5 = document.getElementById('VetScheduleStep5')
const scheduler_footer = document.getElementById('scheduler-footer')

const additional_desc_txt = document.getElementById('additional-desc-txt')
const additional_desc_validation = document.getElementById('additional-desc-validation')
// const confirm_desc = document.getElementById('confirm-desc')
const pet_modal_generals = document.getElementById('pet-modal-generals')
const pet_modal_badges = document.getElementById('pet-modal-badges')

const appointment_modal_link_attachments = document.getElementById('appointment-modal-link-attachments')
const appointment_modal_link_chat = document.getElementById('appointment-modal-link-chat')
const appointment_modal_link_following = document.getElementById('appointment-modal-link-following')

const inpVetFilter = document.getElementById("inpVetFilter")

export const User_VetModal_Load = () => {
    const vet = LocalStorage.Get('CurrentVet')
    const vetModal_background = document.getElementById('vetModal_background')
    const vetModal_smallPic = document.getElementById('vetModal_smallPic')
    const vetModal_name = document.getElementById('vetModal_name')
    const vetModal_title = document.getElementById('vetModal_title')
    const vetModal_specialties = document.getElementById('vetModal_specialties')
    const vetModal_aboutMe = document.getElementById('vetModal_aboutMe')
    const vet_content_addresses = document.getElementById('vet-content-addresses')
    const vet_ranking_value = document.getElementById('vet-ranking-value')
    const vet_content_reviews_general = document.getElementById('vet-content-reviews-general') 

    vetModal_background.setAttribute('src',vet.background) //Cambio el fondo de la venta asegún el vet
    vetModal_smallPic.setAttribute('src',vet.img_src) //La imagen del vet en el recuadro
    vetModal_name.innerHTML = vet.name
    vetModal_title.innerHTML = vet.titleDesc
    vetModal_specialties.innerHTML = concatSpecialties(vet.specialties)
    vetModal_aboutMe.innerHTML = vet.aboutYou
    vet_content_addresses.innerHTML = ''
    vet.address.forEach(address => {
        vet_content_addresses.append(vet_content_address(address).elemento()) //Aquí se crean las tarjetas de las direcciones
    })
    vet_ranking_value.innerHTML = vet.currentRate.toFixed(1)    
    vet_content_reviews_general.innerHTML = ''
    vet.currentRates.forEach(rate => {
        vet_content_reviews_general.append(vet_content_ranking_generals(rate).elemento()) //Aquí se crean los indicadores de Rates generales
    })
    vet_content_review_bar_filler()
    let promiseGetReviesByVet = getReviewsByVet(vet.idVet) //Obtiene los reviews desde el API
    promiseGetReviesByVet.then(data => {
        let vet_ranking_numOpinions = document.getElementById('vet-ranking-numOpinions')
        vet_ranking_numOpinions.innerHTML = data.length
        const content_opinions = document.querySelector('.content-opinions')
        content_opinions.innerHTML = ''
        data.forEach(opinion => {
            let controlReview = vet_content_review(opinion).elemento()            
            content_opinions.append(controlReview) //Aquí se crean las opiniones
        })
    })
    let promisegetVetAvailabilitySlotsById = getVetAvailabilitySlotsById(vet.idVet)
    promisegetVetAvailabilitySlotsById.then(data => { //Obtiene la disponibilidad del doctor
        LocalStorage.Save('VetAvailableSlots',data)
    })
    
    schedule_days_accordion()    //Agrega el acordion de días y los botones de disponibilidad
    vet_schedule_pets() //Agrega las mascotas    
    Appointment_confirming_vet() //Agrego el botón del vet en la ventana de confirmación
    vet_appointment_paymmentMethod() //Agrego los medios de pago
}

//Control events
export const VetCard_OnClick = (parametersArray) => {    
    LocalStorage.Save('CurrentVet',parametersArray[0])
    $('#VetModal').modal('show')
}
export const vet_schedule_tab_day_bar_click = (parametersArray) => {    
    let date = parametersArray[0]
    let vet_schedule_tab_day_bar = document.querySelectorAll('.vet-schedule-tab-day-bar')    
    vet_schedule_tab_day_bar.forEach(element => {     //Ciclo para recorrer todas las fechas del acordion           
        if(element.attributes.getNamedItem('data').value == date) element.classList.add('active') //Cuando encuentre la que corresponde a la fecha, le asigna la clase Active
        else element.classList.remove('active') //Si la fecha no corresponde, le quita la clase active
    })
    vet_schedule_content_day_activate(date)
}
const vet_schedule_content_day_activate = (date) => {
    let vet_contents_info_schedule = document.querySelectorAll('.vet-contents-info.schedule')    
    vet_contents_info_schedule.forEach(tab => {
        if(tab.attributes.getNamedItem('data').value == date) {
            tab.classList.remove('inactive')
            tab.classList.add('active')
        }
        else {
            tab.classList.remove('active')
            tab.classList.add('inactive')
        }
    })
}
export const schedule_box_onClick = (parametersArray,event,element) => {        
    let currentVet = LocalStorage.Get('CurrentVet') //Obtengo al vet seleccionado
    let active_button = document.querySelector('.vet-contents-info.schedule.active').querySelectorAll('.schedule-box.schedule-box-pressed')  //Obtiene todos los botones para luego quitar la clase Pressed           
                active_button.forEach(button => {
                    button.classList.remove('schedule-box-pressed')
                }) 
    element.classList.add('schedule-box-pressed')        
    
    let appointment_date = new Appointment_date(element.attributes.getNamedItem('apptype').value,element.attributes.getNamedItem('data').value,element.attributes.getNamedItem('from').value,element.attributes.getNamedItem('to').value) 
    let newAppointment = new Appointment(
        getCookie('LoggedUserId'),
        currentVet.idVet,
        element.attributes.getNamedItem('apptype').value,
        new Date(element.attributes.getNamedItem('data').value),
        null,
        null,
        element.attributes.getNamedItem('from').value,
        element.attributes.getNamedItem('to').value,
        convert_time_string_fromInt(element.attributes.getNamedItem('from').value),
        convert_time_string_fromInt(element.attributes.getNamedItem('to').value),
        null,
        null,
        null,
        null
    )
    let leyend = `${get_date_as_description(new Date(element.attributes.getNamedItem('data').value))} de ${convert_time_string_fromInt(element.attributes.getNamedItem('from').value)} ${get_am_pm(element.attributes.getNamedItem('from').value)} a ${convert_time_string_fromInt(element.attributes.getNamedItem('to').value)} ${get_am_pm(element.attributes.getNamedItem('to').value)}`
    let vet_step_tab_schedule_content = document.getElementById("vet-step-tab-schedule-content")    
    console.log(leyend)
    vet_step_tab_schedule_content.innerHTML = leyend
    LocalStorage.Save('NewAppointment',newAppointment) //Guardo la nueva cita en el LocalStorage
    Appointment_confirming_date(element.childNodes[0].cloneNode(true),appointment_date) //Clono el ícono de la cita y lo mando al control de confirmación
    setTimeout(() => {                
        inactive_div(VetScheduleContent,vet_step_tab_schedule_bar) //Desactiva la vista actual        
        active_div(VetScheduleStep1,vet_step_tab_pet_bar)     //Activa la nueva vista
        scheduler_footer.classList.remove('invisible')  //Remueve la clase que ejecutó la animación de salida
    }, 200);   
} 
export const appointment_steps_onClick = (node) => {        
    switch(node.id){
        case "VetScheduleContent":            
            $('#VetScheduleModal').modal('hide')
            $('#VetModal').modal('show')
            break
        case "VetScheduleStep1":            
            inactive_div(VetScheduleStep1,vet_step_tab_pet_bar)     
            active_div(VetScheduleContent,vet_step_tab_schedule_bar)
            //scheduler_footer.classList.add('invisible')
            break
        case "VetScheduleStep2":            
            inactive_div(VetScheduleStep2,vet_step_tab_reason_bar)     
            active_div(VetScheduleStep1,vet_step_tab_pet_bar)
            break
        case "VetScheduleStep3":            
            inactive_div(VetScheduleStep3,vet_step_tab_desc_bar)     
            active_div(VetScheduleStep2,vet_step_tab_reason_bar)
            break
        case "VetScheduleStep4":            
            inactive_div(VetScheduleStep4,vet_step_tab_confirm_bar)     
            active_div(VetScheduleStep3,vet_step_tab_desc_bar)
            break
        case "VetScheduleStep5":            
            inactive_div(VetScheduleStep5,vet_step_tab_payment_bar)     
            active_div(VetScheduleStep4,vet_step_tab_confirm_bar)
            break
    }    

}
export const Appointment_pet_onClick = (parametersArray,event,element) => {
    let active_button = document.querySelectorAll('.Appointment-pet.pressed') //Obtengo todos los controles de mascotas para des-presionarlos
            active_button.forEach(button => {
                button.classList.remove('pressed')
            })            
            Appointment_confirming_pet(element.cloneNode(true))
            element.classList.add('pressed') //Marco como presionado el control  
            
            let vet_step_tab_pet_content = document.getElementById("vet-step-tab-pet-content")    
            
            setTimeout(()=> {
                inactive_div(VetScheduleStep1,vet_step_tab_pet_bar)
                active_div(VetScheduleStep2,vet_step_tab_reason_bar)                
                vet_appointment_reazon(element.attributes.getNamedItem('data').value) //Agrega los síntomas
            },200)
}
export const Appointment_reazon_onClick = (parametersArray,event,element) => {
    let active_button = document.querySelectorAll('.reazon-box.pressed')
            active_button.forEach(button => {
                button.classList.remove('pressed')
            })
            
            Appointment_confirming_synthom(element.childNodes[0].cloneNode(true),element.attributes.getNamedItem('data').value) //Clono el ícono del síntoma y mando tmb el id
            element.classList.add('pressed')
            setTimeout(() => {
                inactive_div(VetScheduleStep2,vet_step_tab_reason_bar)
                active_div(VetScheduleStep3,vet_step_tab_desc_bar)
            }, 200);     
}
export const schedule_confirm_onClick = () => {
    if(additional_desc_txt.value == '') {
        additional_desc_validation.classList.remove('active')
        additional_desc_validation.classList.remove('inactive')
    }        
    else {
        let newAppointment = LocalStorage.Get('NewAppointment') //Obtengo los datos de la nueva cita desde el LocalStorage
        let confirm_synthom_additionalDesc = document.querySelector('.confirm-synthom-additionalDesc') //Obtengo el control para la confirmación - descripción adicional
        confirm_synthom_additionalDesc.innerHTML = additional_desc_txt.value
        newAppointment.Synthom.description = additional_desc_txt.value
        LocalStorage.Save('NewAppointment',newAppointment)
        inactive_div(VetScheduleStep3,vet_step_tab_desc_bar)
        active_div(VetScheduleStep4,vet_step_tab_confirm_bar)
    }  
}
export const schedule_toPay_button_onClick = () => {
    inactive_div(VetScheduleStep4,vet_step_tab_confirm_bar)
    active_div(VetScheduleStep5,vet_step_tab_payment_bar)
}
export const myPets_onClick = (parametersArray) => {
    let pet = parametersArray[0]    
    pet_modal_generals.innerHTML = ''
    pet_modal_generals.append(pet_items(pet).elemento())
    pet_modal_generals.append(pet_card_info(pet).elemento())
    pet_modal_badges.innerHTML = ''
    let badges = LocalStorage.Get('Badges')
    pet.badges.forEach(badge => {
        let badgeControl = pet_card_badges(badges,badge)
        pet_modal_badges.append(badgeControl.elemento())
    })
    let pets_card_pet_generals = document.querySelector('.pets-card.pet-generals')
    pets_card_pet_generals.innerHTML = ''
    pets_card_pet_generals.append(pets_card_pet_race(pet).elemento())
    pets_card_pet_generals.append(pets_card_pet_birth(pet).elemento())
    pets_card_pet_generals.append(pets_card_pet_colors(pet).elemento())
    
    $('#PetProfile').modal('show')
}
export const LoadAppointments = (appointments) => {
    let myAppointments_div = document.querySelector('.myAppointments')
    
    if(myAppointments_div == null) return
    myAppointments_div.innerHTML = ''
    let currentMonth = 0
    let month_row
    appointments.forEach(appointment => {
        let _month = new Date(appointment.fullDate).getMonth()
        if(currentMonth != _month){
            currentMonth = _month
            month_row = myAppointments_cards_month(appointment)
            myAppointments_div.append(month_row.elemento())
        }
        month_row.addBelow(myAppointments_cards_appointment(appointment).elemento())
    })
}
export const myAppointments_cards_appointment_onClick = (parametersArray) => {
    let idTransaction = parametersArray[0]
    myAppointment_load(idTransaction)
    document.getElementById('AppointmentSmallModal').classList.add('show')
}
export const appointment_modal_date_click = (parametersArray) => {
    let appointment = parametersArray[0]    
    
    appointment_modal_activate(true)
            
}
export const appointment_modal_link_attachments_click = () => {            
    if(!appointment_modal_link_attachments.classList.contains('active')) appointment_modal_link_attachments.classList.add('active')
    if(appointment_modal_link_chat.classList.contains('active')) inactivate(appointment_modal_link_chat)
    if(appointment_modal_link_following.classList.contains('active')) inactivate(appointment_modal_link_following)
}
export const appointment_modal_link_chat_click = () => {            
    if(!appointment_modal_link_chat.classList.contains('active')) appointment_modal_link_chat.classList.add('active')
    if(appointment_modal_link_attachments.classList.contains('active')) inactivate(appointment_modal_link_attachments)
    if(appointment_modal_link_following.classList.contains('active')) inactivate(appointment_modal_link_following)
}
export const appointment_modal_link_following_click = () => {        
    if(!appointment_modal_link_following.classList.contains('active')) appointment_modal_link_following.classList.add('active')
    if(appointment_modal_link_chat.classList.contains('active')) inactivate(appointment_modal_link_chat)
    if(appointment_modal_link_attachments.classList.contains('active')) inactivate(appointment_modal_link_attachments)
}
export const search_vets_keyDown = () => {
    let search_vets_vets = document.querySelectorAll('.search-vets-vet')
    search_vets_vets.forEach(element => {
        if(inpVetFilter.value != '')
        {            
            if(!element.attributes.getNamedItem('data-name').value.toUpperCase().includes(inpVetFilter.value.toUpperCase()))
            {
                element.classList.add('invisible-div')
            }
            else 
            {
                element.classList.remove('invisible-div')
            }
        }
        else 
            {
                element.classList.remove('invisible-div')
            }
    })
}
//Confirm process
const Appointment_confirming_vet = () => {
    let currentVet = LocalStorage.Get('CurrentVet')    
    let confirm_vet = document.querySelector('.confirm-vet')
    confirm_vet.innerHTML = ''
    
    confirm_vet.append(Appointment_confirming_vet_button(currentVet).elemento())

}
const Appointment_confirming_vet_button = (vet) => {
    let Appointment_vet = crearElemento('div','',["Appointment-vet"])
    let img = crearElemento('img','',[])
    img.addAttributes([{'src':vet.img_src}])
    let Appointment_vet_text = crearElemento('div','',["Appointment-vet-text"])
    let Appointment_vet_text_span = crearElemento('span','',[],vet.name)
    let Appointment_vet_text_title = crearElemento('small','',[],vet.titleDesc)
    Appointment_vet_text.addBelow(Appointment_vet_text_span.elemento())
    Appointment_vet_text.addBelow(Appointment_vet_text_title.elemento())
    Appointment_vet.addBelow(img.elemento())
    Appointment_vet.addBelow(Appointment_vet_text.elemento())
    return Appointment_vet
}
const Appointment_confirming_date = (icon,appointment_date) => { //Creo el recuadro para confirmar la fecha y hora de la cita
    let confirm_date_control = document.getElementById('confirm-date-control')
    let confirm_time_control = document.getElementById('confirm-time-control')
    confirm_date_control.innerHTML = ''
    confirm_time_control.innerHTML = ''
    let confirm_date_text = crearElemento('span','',[],` ${get_date_as_description(new Date(appointment_date.date))}`)
    confirm_date_control.append(icon)
    confirm_date_control.append(confirm_date_text.elemento())
    let confirm_time_icon = crearElemento('i','',["fa-solid","fa-clock"])
    let confirm_time_span = crearElemento('span','',[],` de ${convert_time_string_fromInt(appointment_date.from)}${get_am_pm(appointment_date.from)} - ${convert_time_string_fromInt(appointment_date.to)}${get_am_pm(appointment_date.to)}`)
    confirm_time_control.append(confirm_time_icon.elemento())
    confirm_time_control.append(confirm_time_span.elemento())
}
const Appointment_confirming_pet = (button) => {
    let newAppointment = LocalStorage.Get('NewAppointment') //Obtengo los datos de la nueva cita desde el LocalStorage
    let myPetsCatalog = LocalStorage.Get('MyPetsCatalog') //Obtengo los datos de la nueva cita desde el LocalStorage
    let myPetsCatalog_filter = myPetsCatalog.filter(element => element.idPet == button.attributes.getNamedItem('data').value) //Obtengo la mascota seleccionada
    newAppointment.pet = myPetsCatalog_filter[0]
    LocalStorage.Save('NewAppointment',newAppointment) //Actualizo los datos de la cita

    let confirm_pet = document.querySelector('.confirm-pet')
    confirm_pet.innerHTML = ''
    confirm_pet.append(button)
}
const Appointment_confirming_synthom = (icon,idSynthom) => {
    let newAppointment = LocalStorage.Get('NewAppointment') //Obtengo los datos de la nueva cita desde el LocalStorage
    let pet = newAppointment.pet //Obtengo los datos de la mascota seleccionada    
    let synthoms = pet.species.Synthoms.filter(element => element.idSynthom == idSynthom) //Filtro para obtener el síntoma seleccionado    
    newAppointment.Synthom = synthoms[0].Synthom
    LocalStorage.Save('NewAppointment',newAppointment) //Salvo los cambios en el LocalStorage
    let confirm_synthom = document.querySelector('.confirm-synthom') //Obtengo el control padre para confirmar el síntoma
    confirm_synthom.innerHTML = ''
    confirm_synthom.append(Appointment_confirming_synthom_button(icon,synthoms[0].Synthom).elemento()) //Creo el botón del síntoma
}
const Appointment_confirming_synthom_button = (icon,synthom) => {    
    let Appointment_vet = crearElemento('div','',["Appointment-vet"])
    let Appointment_vet_text = crearElemento('div','',["Appointment-vet-text"])
    let Appointment_vet_text_small = crearElemento('small','',[],synthom.name)
    let Appointment_vet_text_additional = crearElemento('span','',["confirm-synthom-additionalDesc"])
    Appointment_vet_text.addBelow(Appointment_vet_text_small.elemento())
    Appointment_vet_text.addBelow(Appointment_vet_text_additional.elemento())
    Appointment_vet.addBelow(icon)
    Appointment_vet.addBelow(Appointment_vet_text.elemento())
    return Appointment_vet
}
//Requests
async function getReviewsByVet(idVet){
    return await requestPromise('GetReviewsByVet',idVet)
}
async function getVetAvailabilitySlotsById(idVet){
    return await requestPromise('getVetAvailabilitySlotsById',idVet)
}

//Helpers
const inactive_div = (content,tab) => {
    content.classList.remove('active-div')
    content.classList.add('inactive-div')   
    tab.classList.remove('active')
    tab.classList.add('inactive')
}
const active_div = (content,tab) => {
    content.classList.add('active-div')
    content.classList.remove('inactive-div')        
    tab.classList.remove('inactive')
    tab.classList.add('active')
}
export const appointment_modal_activate = (active) => {
    let appointment_content_appointment_vet = document.querySelector('.appointment-modal-card.vet') //Sección de la cita
    let appointment_content_appointment_pet = document.querySelector('.appointment-modal-card.pet') //Sección de la cita
    let appointment_content_appointment_payment = document.querySelector('.appointment-modal-card.payment') //Sección de la cita
    let appointment_modal_card_inactive = document.querySelectorAll('.appointment-modal-card.inactive')
    
    if(active == true) {
        appointment_content_appointment_vet.classList.add('appointment-modal-card-hidding')
        appointment_content_appointment_pet.classList.add('appointment-modal-card-hidding')
        appointment_content_appointment_payment.classList.add('appointment-modal-card-hidding')
        appointment_modal_card_inactive.forEach(element => {
            element.classList.remove('inactive')
        })
        let modal_footer_inactive = document.querySelector('.modal-footer.inactive')
        modal_footer_inactive.classList.remove('inactive')
    }
    else {
        appointment_content_appointment_vet.classList.remove('appointment-modal-card-hidding')
        appointment_content_appointment_pet.classList.remove('appointment-modal-card-hidding')
        appointment_content_appointment_payment.classList.remove('appointment-modal-card-hidding')
        let appointment_modal_card_accordion = document.querySelector('.appointment-modal-card.accordion')
        let appointment_modal_card_chat = document.querySelector('.appointment-modal-card.chat')
        appointment_modal_card_accordion.classList.add('inactive')
        appointment_modal_card_chat.classList.add('inactive')
        let modal_footer_inactive = document.querySelector('.modal-footer.appointment-modal')
        modal_footer_inactive.classList.add('inactive')
    }
}
const inactivate = (control) => {
    control.classList.remove('active')
    control.classList.add('inactive')
        setTimeout(() => {
            control.classList.remove('inactive')
        }, 300);
}

//Load
const myAppointment_load = (idTransaction) => {
    let myAppointments = LocalStorage.Get('MyAppointments')
    let appoinments_filtered = myAppointments.filter(element => element.idTransaction === idTransaction)
    let appointment = appoinments_filtered[0]
    
    appointment_modal_load(appointment)

    let Appointment_small_modal_time = document.getElementById('Appointment-small-modal-time')
    let Appointment_small_modal_date = document.getElementById('Appointment-small-modal-date')
    let Appointment_small_pet = document.getElementById('Appointment-small-pet')
    let Appointment_small_vet = document.getElementById('Appointment-small-vet')
    
    let appointment_type_result = AppFunctions.appointment_type_results(appointment.type) //Obtengo las propiedades en un objeto, según el tipo de cita

    Appointment_small_modal_time.className = `Appointment-${appointment_type_result.backColorClass}`
    
    Appointment_small_modal_time.innerHTML = `${convert_time_string_ampm_fromInt(appointment.startTime)} - ${convert_time_string_ampm_fromInt(appointment.endTime)} | ${capitalLetter(appointment_type_result.description)}`
    Appointment_small_modal_date.innerHTML = get_date_as_description(new Date(appointment.fullDate))
    Appointment_small_pet.innerHTML = ''
    let pet_control = createGeneralCard(appointment.pet).elemento()        
    let pet_control_additional = crearElemento('small','',[],appointment.Synthom.description)
    
    pet_control.querySelector('.Appointment-pet-text').append(pet_control_additional.elemento())
    Appointment_small_vet.innerHTML=''
    let vet_control = Appointment_vet(appointment.vet)
    Appointment_small_vet.append(vet_control.elemento())
    Appointment_small_pet.append(pet_control)
}
const appointment_modal_load = (appointment) => { //Reemplaza la información en la ventana de la cita
    let appointment_modal_card_vet = document.querySelector('.appointment-modal-card.vet') //Sección del vet
    appointment_modal_card_vet.innerHTML = ''    
    let appointment_card_vet_card = AppFunctions.appointment_card_vet(appointment.vet)
    appointment_modal_card_vet.append(appointment_card_vet_card.elemento())

    let appointment_content_appointment = document.querySelector('.appointment-content.appointment') //Sección de la cita
    appointment_content_appointment.innerHTML = ''
    let appointment_card_content_card = AppFunctions.appointment_card_content(appointment)
    appointment_content_appointment.append(appointment_card_content_card.elemento())

    let appointment_content_pet = document.querySelector('.appointment-content.pet') //Sección de la mascota
    appointment_content_pet.innerHTML = ''
    let appointment_card_content_pet_card = AppFunctions.appointment_card_content_pet(appointment)    
    appointment_content_pet.append(appointment_card_content_pet_card.elemento())

    let appointment_content_payment = document.querySelector('.appointment-content.payment') //Sección del método de pago
    appointment_content_payment.innerHTML = ''
    let appointment_card_content_payment_card = AppFunctions.appointment_card_content_payment(appointment)
    appointment_content_payment.append(appointment_card_content_payment_card.elemento())

    AppFunctions.appointment_load_chat(appointment)//Carga el chat
}