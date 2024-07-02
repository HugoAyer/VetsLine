import * as Constructor from './Constructor.js'
import * as LocalStorage from '../LocalStorage.js'
import { crearElemento } from '../factory.js'
import {Appointment} from '../Models/Appointments.js'
import {getCookie,convert_time_string_fromInt,monthName,dayOfWeek,get_date_as_description,i_type_appointment,get_am_pm,uuidv4} from '../functions.js'
import {createInfo} from '../pets.js'
import {payment_reception} from '../PaymentProcess.js'

const VetModal_carousel = document.getElementById("VetModal_carousel")
const videocall_layer = document.getElementById("videocall-layer")

const book_appointment = document.getElementById("book_appointment")
const VetFileModalLabel = document.getElementById("VetFileModalLabel")
const book_appointment_pet = document.getElementById("book_appointment_pet")
const carousel_main = document.getElementById("carousel_main")

const available_card = document.getElementById("available_card")
const book_appointment_type_selected_ico = document.getElementById('book_appointment_type_selected_ico')
const book_appointment_synthoms = document.getElementById('book_appointment_synthoms')
const book_appointment_pet_selected = document.getElementById('book_appointment_pet_selected')
const book_appointment_motive_confirm = document.getElementById('book_appointment_motive_confirm')
const book_appointment_subject_confirm = document.getElementById('book_appointment_subject_confirm')
const book_appointment_date_selected = document.getElementById('book_appointment_date_selected')
const book_appointment_time_selected = document.getElementById('book_appointment_time_selected')
const book_appointment_pet_selected_ico = document.getElementById('book_appointment_pet_selected_ico')
const book_appointment_synthom_selected_ico = document.getElementById('book_appointment_synthom_selected_ico')
const book_appointment_doctor_confirm = document.getElementById('book_appointment_doctor_confirm')
const payment_details = document.getElementById('payment_details')

const booking_steps = document.getElementById('booking_steps')
const booking_step_1 = document.getElementById('booking_step_1')
const booking_step_2 = document.getElementById('booking_step_2')
const booking_step_3 = document.getElementById('booking_step_3')
const booking_step_4 = document.getElementById('booking_step_4')
const booking_step_5 = document.getElementById('booking_step_5')



//Al seleccionar un slot de disponible
export const event_appointment_selected = (paramsArray) => {    
    
    let slot_selected = document.getElementById(paramsArray[0])
    let type = paramsArray[1]
    let slot = paramsArray[2]        
    new_appointment(type,slot.date,slot.start,slot.end,slot)
    let selected_items = videocall_layer.querySelectorAll('.available_slot_button.selected')
    
    selected_items.forEach(item => item.classList.remove('selected'))    
    slot_selected.classList.add('selected')
    setTimeout(() => {
        available_card.style.display='none'
        booking_steps.style.display =  'block'
        $('#VetModal_carousel').carousel('next')    
        event_appointment_step_change()   
    }, 200);
     
}

export const event_book_appointment_pet_selected = (parametersArray) => {
    let pet = parametersArray[0]    
    let NewAppointment = LocalStorage.Get('NewAppointment')
    NewAppointment.idPet = pet.idPet
    NewAppointment.pet = pet
    LocalStorage.Save('NewAppointment',NewAppointment)

    let booking_pet_selection = document.querySelectorAll(".booking-pet-selection.btn-warning")
    booking_pet_selection.forEach(card =>  {
        card.classList.remove('btn-warning')
        card.classList.add('btn-light')
    })

    let idCard = parametersArray[1]
    let card = document.getElementById(idCard)
    card.classList.remove('btn-light')
    card.classList.add('btn-warning')    
    event_book_appointment_pet_selected_helper(pet.idPet)
    $('#VetModal_carousel').carousel('next')    
    event_appointment_step_change()
}

export const event_book_appointment_synthom_selected = (parametersArray) => {
    let synthom = parametersArray[0]
    let NewAppointment = LocalStorage.Get('NewAppointment')
    NewAppointment.Synthom = synthom
    LocalStorage.Save('NewAppointment',NewAppointment)

    let booking_synthom_selection = document.querySelectorAll(".booking-synthom-selection.btn-warning")
    booking_synthom_selection.forEach(card => {
        card.classList.remove('btn-warning')
        card.classList.add('btn-light')
    })

    let idCard = parametersArray[1]
    let card = document.getElementById(idCard)
    card.classList.remove('btn-light')
    card.classList.add('btn-warning')
    $('#VetModal_carousel').carousel('next')    
    event_appointment_step_change()
}

export const event_book_appointment_to_confirmation = () => {    
    let NewAppointment = LocalStorage.Get('NewAppointment')
    NewAppointment.subject = book_appointment_subject.value
    LocalStorage.Save('NewAppointment',NewAppointment)
    $('#VetModal_carousel').carousel('next')        
    event_appointment_step_change()
    Constructor.create_booking_payment_methods()
}

export const event_booking_payment_card_display = (parametersArray) => {
    const card = parametersArray[0]    
    let row = Constructor.create_booking_payment_card_display(card)
    payment_details.innerHTML=''
    payment_details.append(row.elemento())
}

//Aplicación de pago
export const event_booking_payment_card_apply = (parametersArray) => {
    let card = parametersArray[0]
    let NewAppointment = LocalStorage.Get('NewAppointment')
     let uuid = uuidv4()    
     NewAppointment.idTransaction = uuid
     LocalStorage.Save('NewAppointment',NewAppointment)
     let paymentType = 1 //Identificador para pagos con tarjeta
     let chargeType = 1 //Identificador para cargo por cita
     
     let chargeTotal = event_booking_payment_card_apply_helper_chargeTotal(NewAppointment)
     let currentDate = new Date()
     let promisePayment_reception = payment_reception(uuid,paymentType,card,chargeType,chargeTotal,NewAppointment.availability,currentDate)

}

const event_booking_payment_card_apply_helper_chargeTotal = (NewAppointment) => {
    switch (NewAppointment.type){
        case 1:
            return NewAppointment.availability.price_videocall            
        case 2:
            return NewAppointment.availability.price_present
        default:
            return 0
    }
}

//Se muestran los datos de la cita para confirmar
export const event_book_appointment_confirm = () => {
    let NewAppointment = LocalStorage.Get('NewAppointment')
    let CurrentVet = LocalStorage.Get('CurrentVet')
    LocalStorage.Save('NewAppointment',NewAppointment)
    let fullDate = new Date(NewAppointment.fullDate)

    NewAppointment.subject = book_appointment_subject.value
    NewAppointment.description = book_appointment_comments.value
        
    book_appointment_type_selected_ico.innerHTML = ''    
    book_appointment_type_selected_ico.append(i_type_appointment(NewAppointment.type).elemento())

    book_appointment_date_selected.innerHTML = get_date_as_description(fullDate)
    book_appointment_time_selected.innerHTML = ` de ${NewAppointment.strStartTime} ${get_am_pm(NewAppointment.startTime)} a ${NewAppointment.strEndTime} ${get_am_pm(NewAppointment.startTime)}`

    book_appointment_pet_selected_ico.classList = ''
    book_appointment_pet_selected_ico.classList.add('fa-solid')
    book_appointment_pet_selected_ico.classList.add(NewAppointment.pet.species.icon)

    book_appointment_synthom_selected_ico.classList = ''
    book_appointment_synthom_selected_ico.classList.add('fa-solid')
    book_appointment_synthom_selected_ico.classList.add(NewAppointment.Synthom.icon)

    book_appointment_motive_confirm.innerHTML = NewAppointment.Synthom.name
    book_appointment_subject_confirm.innerHTML = NewAppointment.subject
    book_appointment_doctor_confirm.innerHTML = CurrentVet.displayName
}
//Se mostrarán las opciones de pago
export const event_book_appointment_toPayment =() => {
    $('#VetModal_carousel').carousel('next')    
    event_appointment_step_change()
}
export const event_appointment_step_change = () => {    
    setTimeout(() => {
        let step = Constructor.get_carousel_current_step() 
        let booking_step = document.querySelectorAll('.step-wizard-item')
        booking_step.forEach(step => step.classList.remove('current-item'))

        switch (step) {
            case '0':
                booking_steps.style.display =  'none'
                available_card.style.display='block'
                VetFileModalLabel.innerHTML = 'Med. Vet. Orlando Ramirez'
                break
            case '1':
                booking_steps.style.display='block'
                VetFileModalLabel.innerHTML = 'Paso 1 de 5 - Selecciona tu mascota'
                booking_step_1.classList.add('current-item')
                break
            case '2':
                booking_steps.style.display='block'
                VetFileModalLabel.innerHTML = 'Paso 2 de 5 - Selecciona el motivo de la consulta'
                booking_step_2.classList.add('current-item')
                break
            case '3':
                booking_steps.style.display='block'
                VetFileModalLabel.innerHTML = 'Paso 3 de 5 - Agrega una descripción'
                booking_step_3.classList.add('current-item')
                break
            case '4':
                booking_steps.style.display='block'
                VetFileModalLabel.innerHTML = 'Paso 4 de 5 - Confirma los datos de tu cita'
                booking_step_4.classList.add('current-item')
                break
            case '5':
                booking_steps.style.display='block'
                VetFileModalLabel.innerHTML = 'Paso 5 de 5 - Método de pago'
                booking_step_5.classList.add('current-item')
                break
        }        

    }, 800);
}

//Helpers
const event_book_appointment_pet_selected_helper = (idPet) => {
    // let MyPets = LocalStorage.Get('MyPetsCatalog')
    let NewAppointment = LocalStorage.Get('NewAppointment')
    book_appointment_synthoms.innerHTML = ''
    let book_appointment_synthoms_row = crearElemento("div","",["row","synthoms","d-flex","justify-content-center","align-items-center"])
    //let MyPets_filtered = MyPets.find(item => item.idPet == idPet)        
        NewAppointment.pet.species.Synthoms.forEach(item => {                
            let SynthomCard = Constructor.create_booking_pet_synthoms(item.Synthom)
            book_appointment_synthoms_row.addBelow(SynthomCard.elemento())
        })    
        book_appointment_synthoms.append(book_appointment_synthoms_row.elemento())
        book_appointment_pet_selected.innerHTML = ''
        let pet_card = createInfo(NewAppointment.pet)        
        book_appointment_pet_selected.append(pet_card.elemento())
}
const new_appointment = (type,date,startTime, endTime, availability) => {    
    let LoggedUserId = getCookie('LoggedUserId');
    let CurrentVetId = getCookie('CurrentVetId');
    let fullDate = new Date(date)
    let year = fullDate.getFullYear()
    let month = fullDate.getMonth()
    let strMonth = monthName[month]
    let weekDay = fullDate.getDay()
    let dayOfWeekStr = dayOfWeek[weekDay]
    let appointment = new Appointment(LoggedUserId,CurrentVetId,get_typeInt_fromType(type),fullDate,year,month,startTime,endTime,convert_time_string_fromInt(startTime),convert_time_string_fromInt(endTime),strMonth,weekDay,dayOfWeekStr,availability)
    LocalStorage.Save('NewAppointment',appointment)
}
const get_typeInt_fromType = (type) => {
    switch (type) {
        case 'videocall':
            return 1
        case 'present':
            return 2
        case 'onSite':
            return 3
    }
}