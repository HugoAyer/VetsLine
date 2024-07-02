import {request,getCookie,convert_time_string_fromInt} from '../functions.js';
import * as LocalStorage from '../LocalStorage.js'
import * as VetModal from '../VetModal/Constructor.js'
import * as Constructor from '../VetModal/Constructor.js'
import * as ModalVetEvents from '../VetModal/Events.js'

const book_appointment_to_confirm = document.getElementById('book_appointment_to_confirm')
const book_appointment_subject = document.getElementById('book_appointment_subject')
const book_appointment_comments = document.getElementById('book_appointment_comments')
const book_appointment_subject_confirm = document.getElementById('book_appointment_subject_confirm')
const booking_steps = document.getElementById('booking_steps')
const book_appointment_to_step4 = document.getElementById('book_appointment_to_step4')
const credit_free_calls = document.getElementById('credit_free_calls')

const booking_appointment_type_videocall = document.getElementById("booking_appointment_type_videocall")
const booking_appointment_type_present = document.getElementById("booking_appointment_type_present")


const videocall_layer = document.getElementById("videocall-layer")
const present_layer = document.getElementById('present-layer')

//Eventos de controles ya creados
export const general_events = () => {
    let carousel_prev = document.getElementById("carousel_prev")
    let carousel_next = document.getElementById("carousel_next")
    
    let VetFileModal = document.getElementById('VetFileModal');

    booking_appointment_type_videocall.addEventListener('click',function(){
        booking_appointment_type_present.classList.remove('active')
        booking_appointment_type_videocall.classList.add('active')
        present_layer.classList.remove('active')
        videocall_layer.classList.add('active')        
    })
    booking_appointment_type_present.addEventListener('click',function(){
        booking_appointment_type_videocall.classList.remove('active')
        booking_appointment_type_present.classList.add('active')
        videocall_layer.classList.remove('active')
        present_layer.classList.add('active')
    })

    carousel_prev.addEventListener('click',() => {    //Evento cuando se presiona el botón de "previo" en el carrusel
        load_available_slots()
    })
    carousel_next.addEventListener('click',() => {    //Evento cuando se presiona el botón de "previo" en el carrusel
        load_available_slots()
    })

    VetFileModal.addEventListener('shown.bs.modal',function() {
        booking_steps.style.display='none'
        
        VetFileModal_shown()
        let CurrentVetId = getCookie('CurrentVetId');

        

        request('getVetById',CurrentVetId,CurrentVetId,PostGetVetData,PostErrorRequest); //Obtiene la información completa del vet 
        request('getVetAvailabilitySlotsById',CurrentVetId,CurrentVetId,PostAvailabilitySlots,PostErrorRequest); //Obtiene la información completa del vet       
    })

    book_appointment_to_confirm.addEventListener('click',function() {
        ModalVetEvents.event_book_appointment_confirm()
    })

    book_appointment_to_step4.addEventListener('click',function() {
        ModalVetEvents.event_book_appointment_toPayment()
    })
}

//Callbacks
const PostGetVetData = (response,params) => {
    let vets = response
    if(vets.length == 0) bootbox.alert('Ocurrió un error al recuperar la información del veterinario')
    else LocalStorage.Save('CurrentVet',vets[0])
}
const PostAvailabilitySlots = (request, params) => {
    let data = request
    LocalStorage.Save('VetAvailableSlots',data) //Guarda la disponibilidad en Local Storage
}
const PostErrorRequest = (response,params) => {    
    bootbox.alert('Se ha producido un error al intentar obtener la información');    
}

//Eventos
const VetFileModal_shown = () => {
    VetModal.Init()
}
const load_available_slots = () => {
    videocall_layer.classList.add("availability-fade-out")
    setTimeout(() => {
        videocall_layer.innerHTML = ''
        videocall_layer.classList.remove("availability-fade-out")
        let date = Constructor.get_carousel_current_date()        
        Constructor.load_available_slots(date)
    }, 800); //Es importante no bajar de 800 ya que el carrusel tarda esto en cambiar y, si bajo el tiempo, obtendrá la misma fecha antes de cambiarse
}