import {getCookie,get_date_as_string_short,convert_time_string_fromInt,uuidv4,formatter,monthName,dayOfWeek,requestPromise} from '../functions.js';
import * as LocalStorage from '../LocalStorage.js'
import { crearElemento } from '../factory.js';
import * as Events from './Events.js'

//Arrays constantes del documento

const dayOfWeekEng = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]

////////////////////////////////////////////////////////////

const availability_slots = document.getElementById("availability_slots")
const videocall_layer = document.getElementById("videocall-layer")
const VetModal_carousel = document.getElementById("VetModal_carousel")

const carousel_agenda = document.getElementById("carousel_agenda")
const VetModal_carousel_prev = document.getElementById('VetModal_carousel_prev')
const payment_details = document.getElementById('payment_details')
const booking_appointment_payment_methods = document.getElementById('booking_appointment_payment_methods')
const book_appointment_pet_row = document.getElementById('book_appointment_pet_row')
const book_appointment_to_step4 = document.getElementById("book_appointment_to_step4")
const carousel_prev = document.getElementById("carousel_prev")
const carousel_next = document.getElementById("carousel_next")

const LoggedUserId = getCookie('LoggedUserId');

export const Init = () => {        
    fill_carrousel()

    let carousel_items = document.querySelectorAll('.carousel-dates')
    carousel_items.forEach((node) => {        
        if(node.classList.contains('active')){            
            load_available_slots(get_carousel_current_date())
            return            
        }
    })    

    VetModal_carousel_prev.addEventListener('click', function() {
        Events.event_appointment_step_change()
    })

    book_appointment_to_confirm.addEventListener('click',function() {
        Events.event_book_appointment_to_confirmation()        
    })

    let promiseGetPetsById = getPetsById(LoggedUserId) //Obtengo las mascotas del usuario
    promiseGetPetsById.then(data => {
        data.forEach(pet => {
            let book_appointment_pet_item = create_book_appointment_pet(pet)        
            book_appointment_pet_row.append(book_appointment_pet_item.elemento()) //Creo las cards de las mascotas a seleccionar en las citas        
        })
    })

    book_appointment_to_step4.addEventListener('click',function() {
        Events.event_book_appointment_toPayment()
    })

    carousel_prev.addEventListener('click',() => {    //Evento cuando se presiona el botón de "previo" en el carrusel de disponibilidad del Vet
        Events.event_load_available_slots()
    })
    carousel_next.addEventListener('click',() => {    //Evento cuando se presiona el botón de "previo" en el carrusel
        Events.event_load_available_slots()
    })

//     carousel_miniAgenda_next.addEventListener('click',function(){
//         Events.event_carousel_miniAgenda_change()
//     })
//     carousel_miniAgenda_prev.addEventListener('click',function(){
//         Events.event_carousel_miniAgenda_change()
//     })
}

export const get_carousel_current_date = () => {
    let carousel_items = carousel_agenda.querySelectorAll('.carousel-item')
    let date = ''
    carousel_items.forEach((node) => {        
        if(node.classList.contains('active')){
            date = node.getAttribute('date')
            return date
        }
    })

    return date
}
//Los botones con los horarios de las citas disponibles
const create_available_slot = (type,slot) =>{
    let uuid = uuidv4()    
    let button = crearElemento("button",uuid,["available-slot","available_slot_button","mt-2"],"","button")
    let paramsArray = [uuid,type,slot]    
    button.addEvent('click',Events.event_appointment_selected,paramsArray)
    let button_i = crearElemento("i","",["fa-solid",`fa-${create_available_slot_helper(type)}`])
    let leyend = ` ${convert_time_string_fromInt(slot.start)} ${(slot.start < 1200)? 'am' : 'pm'} - ${convert_time_string_fromInt(slot.end)} ${(slot.end < 1200)? 'am' : 'pm'}`    

    let small = crearElemento("small","",["align-items-start"],leyend)
    let price = crearElemento("small","",["d-block"],formatter.format(create_available_slot_helper_price(type,slot)).replace("$", "MXN "))    
    
    button.addBelow(button_i.elemento())    
    button.addBelow(small.elemento())
    
    button.addBelow(price.elemento())

    return button
}
const create_available_slot_helper = (type) => {    
    switch (type){
        case 'videocall':
            return 'video'
            break
        case 'present':
            return 'location-dot'
            break
        case 'onSite':
            return 'house-user'
    }
}
const create_available_slot_helper_price = (type,slot) => {
    switch (type) {
        case 'videocall':
            return slot.price_videocall
        case 'present':
            return slot.price_present
        case 'onSite':
            return slot.price_onSite
    }
}
const create_carousel_date = (date) => {    
    let div = crearElemento("div","",["carousel-item","carousel-dates",date.active])
    let span = crearElemento("span","",["pet-file-value","d-block","text-center"],date.weekDay)
    let small = crearElemento("small","",["d-block","text-center"],date.day)

    div.addBelow(span.elemento())
    div.addBelow(small.elemento())

    div.addAttributes([{'date': date.date}])

    return div
}

//Se crean los botones de las mascotas
export const create_book_appointment_pet = (pet) => {    
    let col_auto = crearElemento("div","",["col-auto","mb-5"]) 
    let uuid = uuidv4()
    let col_auto_a = crearElemento("a",uuid,["btn","btn-light","booking-pet-selection"])
    let parametersArray = [pet,uuid]
    col_auto_a.addEvent('click',Events.event_book_appointment_pet_selected,parametersArray)

    let col_auto_a_div = crearElemento("div","",["bg-white","rounded","shadow-sm","py-5","px-4","book-appointment-pet-card","justify-content-center"])
    let col_auto_a_div_img = crearElemento("img","",["img-fluid","rounded-circle","mb-3","img-thumbnail","shadow-sm"])
    col_auto_a_div_img.addAttributes([{"src":pet.image}])
    let col_auto_a_div_h5 = crearElemento("h5","",["mb-0","d-flex","justify-content-center","align-items-center"])    
    let col_auto_a_div_h5_i = crearElemento("i","",["fa-solid",pet.species.icon,"d-block"])
    col_auto_a_div_h5.addBelow(col_auto_a_div_h5_i.elemento())    
    
    let col_auto_a_div_h5_name = crearElemento("h5","",["mb-0","d-flex","justify-content-center","align-items-center"])
    let col_auto_a_div_h5_name_span = crearElemento("span","",["d-block"],pet.name)
    col_auto_a_div_h5_name.addBelow(col_auto_a_div_h5_name_span.elemento())

    col_auto_a_div.addBelow(col_auto_a_div_img.elemento())
    col_auto_a_div.addBelow(col_auto_a_div_h5.elemento())
    col_auto_a_div.addBelow(col_auto_a_div_h5_name.elemento())
    
    col_auto_a.addBelow(col_auto_a_div.elemento())
    col_auto.addBelow(col_auto_a.elemento())

    return col_auto

}

//Se crean los botones de síntomas
export const create_booking_pet_synthoms = (synthom) => {    
    let uuid = uuidv4()
    let div_col = crearElemento("div","",["col-auto","mb-5"])
    let div_col_a = crearElemento("a",uuid,["btn","btn-light","booking-synthom-selection"])
    let parametersArray = [synthom,uuid]
    div_col_a.addEvent('click',Events.event_book_appointment_synthom_selected,parametersArray)
    let div_col_a_div = crearElemento("div","",["bg-white","rounded","shadow-sm","py-5","px-4","book-appointment-pet-card"])
    let div_col_a_div_h1 = crearElemento("h1","",["mb-0","d-flex","justify-content-center"])    
    let div_col_a_div_h1_i = crearElemento("i","",["fa-solid",synthom.icon])
    let div_col_a_div_h5 = crearElemento("h5","",["mb-0","d-flex","justify-content-center"])
    let div_col_a_div_h5_span = crearElemento("span","",["mb-0","d-flex","justify-content-center"],synthom.name)
    
    div_col_a_div_h1.addBelow(div_col_a_div_h1_i.elemento())

    div_col_a_div_h5.addBelow(div_col_a_div_h5_span.elemento())

    div_col_a_div.addBelow(div_col_a_div_h1.elemento())
    div_col_a_div.addBelow(div_col_a_div_h5.elemento())

    div_col_a.addBelow(div_col_a_div.elemento())
    div_col.addBelow(div_col_a.elemento())

    return div_col

}

//Se crean las opciones de pago
export const create_booking_payment_methods = () => {
    const LoggedUser = LocalStorage.Get('LoggedUser')
    if(LoggedUser.plan == 'plus'){

        const freCalls = LoggedUser.freeCalls.reduce((freeCalls, item) => {            
            let i = (item.status === 'A') ? 1 : 0
            return freeCalls + i
        },0)
        let plus_freeCalls = create_booking_payment_methods_freeCalls(freCalls) //Se crea el botón para las llamadas gratis por plan plus
        booking_appointment_payment_methods.append(plus_freeCalls.elemento())

        LoggedUser.cards.forEach(card => {
            let card_box = create_booking_payment_methods_card(card)
            booking_appointment_payment_methods.append(card_box.elemento())
        })

    }
}

//Fill
const fill_carrousel = () => {
    let d = new Date()
    for(let i = 0; i < 7; i++){
        let thisDate = new Date(d)
        thisDate.setDate(thisDate.getDate() + i)
        let day = thisDate.getDate()
        let month = thisDate.getMonth()        
        let data = {
            'active':(i == 0)? 'active' : "",
            'weekDay': (i == 0)? 'Hoy' : dayOfWeek[thisDate.getDay()],
            'day': `${day} ${monthName[month]}`,
            'date': get_date_as_string_short(thisDate)
        }                
        let carousel_item = create_carousel_date(data)// today_slot_small_1.innerHTML = `${day} ${monthName[month]}`
        carousel_agenda.append(carousel_item.elemento())
    }
    
}

export const load_available_slots = (date) => {    

    let availableSlots = LocalStorage.Get('VetAvailableSlots') //Obtengo el array de slots del loca storage    
    if(availableSlots != undefined && availableSlots != null){    
        console.log()              
        let daySlots = availableSlots.find(item => item.date == date) //Filtro para obtener los horarios del día del carrusel                        
        console.log(date)
        //Aquí se debe poner el ciclo para recorrer todos los slots e ir creando los botones de las citas
        videocall_layer.innerHTML = ''
        let col_number = 0
        let col_1 = crearElemento("div","",["col","slot"])
        let col_2 = crearElemento("div","",["col","slot"])
        if(daySlots != undefined){
            daySlots.data.forEach((slot) =>{
                if(col_number == 0){
                    let row = crearElemento("div","",["row","available-row"])
                    row.addBelow(create_available_slot('videocall',slot).elemento())
                    col_1.addBelow(row.elemento())
                    col_number = 1
                }            
                else {
                    let row = crearElemento("div","",["row"])
                    row.addBelow(create_available_slot('videocall',slot).elemento())
                    col_2.addBelow(row.elemento())
                    col_number = 0
                }
            })
        }

        videocall_layer.append(col_1.elemento())
        videocall_layer.append(col_2.elemento())
    }
}

//Appointments
export const get_carousel_current_step = () => {
    
        let carousel_items = VetModal_carousel.querySelectorAll('.carousel-item')
    let step =''
    carousel_items.forEach((node) => {
        if(node.classList.contains('active')){            
            step = node.getAttribute('step')            
            return
        }
    })
    return step    
}

//Payment
const create_booking_payment_methods_freeCalls = (freeCalls) => {    
    let credit_card_plan = crearElemento("div","",["credit-card-plan"])
    let credit_card_plan_a = crearElemento("a","",["credit-card-link"])    
    let credit_card_plan_a_h3 = crearElemento("h3","",["credit-card-title"])
    let parametersArray = [freeCalls]
    credit_card_plan_a_h3.addEvent('click',create_booking_payment_freeCalls_display,parametersArray)
    let credit_card_plan_a_h3_span = crearElemento("span","",[],"Plan premium")
    let credit_card_plan_a_h3_i = crearElemento("i","",["fa-solid","fa-crown"])
    credit_card_plan_a_h3.addBelow(credit_card_plan_a_h3_span.elemento())
    credit_card_plan_a_h3.addBelow(credit_card_plan_a_h3_i.elemento())

    let credit_card_plan_a_h5 = crearElemento("h5","",["credit-card-description"])
    let credit_card_plan_a_h5_span_1 = crearElemento("span","",[],"Disponibles")
    let credit_card_plan_a_h5_span_2 = crearElemento("span","",["text-danger"],` ${freeCalls} `)
    let credit_card_plan_a_h5_span_3 = crearElemento("span","",[],"llamadas")
    credit_card_plan_a_h5.addBelow(credit_card_plan_a_h5_span_1.elemento())
    credit_card_plan_a_h5.addBelow(credit_card_plan_a_h5_span_2.elemento())
    credit_card_plan_a_h5.addBelow(credit_card_plan_a_h5_span_3.elemento())

    credit_card_plan_a.addBelow(credit_card_plan_a_h3.elemento())
    credit_card_plan_a.addBelow(credit_card_plan_a_h5.elemento())

    credit_card_plan.addBelow(credit_card_plan_a.elemento())
    
    return credit_card_plan

}
const create_booking_payment_methods_card = (card) => {
    let credit_card_plan = crearElemento("div","",["credit-card"])
    let credit_card_plan_a = crearElemento("a","",["credit-card-link"])    
    let parametersArray=[card]
    credit_card_plan_a.addEvent('click',Events.event_booking_payment_card_display,parametersArray)
    let credit_card_plan_a_h3 = crearElemento("h3","",["credit-card-title"],card.supplier)
    let credit_card_plan_a_h5 = crearElemento("h5","",["credit-card-title"],`Tarjeta de ${(card.type) == 'debit' ? 'débito' : 'crédito'} \"${card.name}\" con terminación ${card.termination}`)
    credit_card_plan_a.addBelow(credit_card_plan_a_h3.elemento())
    credit_card_plan_a.addBelow(credit_card_plan_a_h5.elemento())

    credit_card_plan.addBelow(credit_card_plan_a.elemento())

    return credit_card_plan

}
export const create_booking_payment_freeCalls_display = () => {    
    payment_details.innerHTML= ''
    let h3 = crearElemento("h3","",["text-center"],"¿Estás seguro de utilizar una de tus llamadas gratis?")
    let h1 = crearElemento("h1","",["d-flex","justify-content-center"])
    let h1_button = crearElemento("button","",["btn","btn-primary","btn-lg"],"Aplicar","button")
    h1.addBelow(h1_button.elemento())

    let small = crearElemento("small","",["d-flex","justify-content-center","text-center"],"Al hacer click en el botón se aplicará la llamada gratis como parte del plan premium")

    payment_details.append(h3.elemento())
    payment_details.append(h1.elemento())
    payment_details.append(small.elemento())    

}
export const create_booking_payment_card_display = (card) => {    
    let row = crearElemento("div","",["row"])    
    let row_col_8 = crearElemento("div","",["col-8"])
    let row_col_8_img = crearElemento("img","",[])
    row_col_8_img.addAttributes([{'src':card.img}])
    row_col_8.addBelow(row_col_8_img.elemento())

    let row_div_4 = crearElemento("div","",["col-4"])
    let row_div_4_h50_1 = crearElemento("div","",["row","h-50","d-flex","justify-content-center","align-items-center"])
    let row_div_4_h50_1_input_group = crearElemento("div","",["input-group","d-flex","justify-content-center"])
    let row_div_4_h50_1_input_group_input = crearElemento("input","",["form-control"],"","text")
    row_div_4_h50_1_input_group.addBelow(row_div_4_h50_1_input_group_input.elemento())
    row_div_4_h50_1.addBelow(row_div_4_h50_1_input_group.elemento())

    row_div_4_h50_1_input_group_input.addAttributes([{"placeholder":'CCV'}])
    let row_div_4_h50_2 = crearElemento("div","",["row","h-50","d-flex","justify-content-center","align-items-center"])
    let row_div_4_h50_2_button = crearElemento("button","",["btn","btn-primary"],"Pagar")
    let parametersArray = [card]
    row_div_4_h50_2_button.addEvent('click',Events.event_booking_payment_card_apply,parametersArray)
    
    row_div_4_h50_2.addBelow(row_div_4_h50_2_button.elemento())

    row_div_4.addBelow(row_div_4_h50_1.elemento())
    row_div_4.addBelow(row_div_4_h50_2.elemento())

    row.addBelow(row_col_8.elemento())
    row.addBelow(row_div_4.elemento())

    return row

}

//Async functions
async function getPetsById(ownerId){
    return await requestPromise('getPetsById',ownerId)
}
