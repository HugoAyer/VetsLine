import {request,getCookie,convert_time_string_fromInt} from './functions.js';
import {createSmallCardAppointment} from './appointments.js';
import { crearElemento } from './factory.js';
import * as Scheduler from './Vet/Scheduler/Constructor.js';
import * as Events from './Vet/Scheduler/Events.js';
import * as LocalStorage from './LocalStorage.js'
import * as NextAppointments from './Vet/NextAppoinments/Constructor.js'
import * as PriceRates from './Vet/PricesRates/Constructor.js'
import * as RegistrationEvents from './VetsRegistration/Events.js'

const Info_items = document.getElementById("Info")
const menuPrincipal = document.getElementById("menuPrincipal")
const TabNextAppointments = document.getElementById("TabNextAppointments")
const TabAvailability = document.getElementById("TabAvailability")
const TabPriceRates = document.getElementById("TabPriceRates")
const toast_agenda = document.getElementById("toast_agenda")
const side_menu = document.getElementById("side-menu")
const menu_expand_btn = document.getElementById("menu_expand_btn")
const nav_asistant = document.getElementById('nav-asistant') 
const registration_next = document.getElementById('registration-next')


const days = [{"day":"sunday", "dia":"Domingo"}, {"day":"monday", "dia": "Lunes"}, {"day":"tuesday","dia":"Martes"}, {"day":"wednesday","dia":"Miércoles"},{"day":"thursday","dia":"Jueves"},{"day":"friday","dia":"Viernes"},{"day":"saturday","dia":"Sábado"}]
const nav_items_selection = [
    {"tab": "item_info", "list": "ListGeneral"},
    {"tab": "item_speciality", "list": "ListSpecialties"},
    {"tab": "item_address", "list": "ListDomicilio"},
    {"tab": "item_appointments", "list": "Appointments"},
    {"tab": "item_experience", "list": "ListExperience"},
    {"tab": "item_opinions", "list": "ListOpinions"},
    {"tab": "item_questions", "list": "ListQuestions"},
    {"tab": "item_blog", "list": "ListBlog"},
]

const LoggedVetId = getCookie('LoggedVetId');

//Load DOM
$(document).ready(function () {    
    let LoggedUserName = getCookie('LoggedVetName');
    let LoggedUserMail = getCookie('LoggedVetMail');    
    let LoggedUserNameControl = document.getElementById('LoggedUserName');    
    let UserSpan = document.getElementById('UserSpan');
    let EmailSpan = document.getElementById('EmailSpan');
    LoggedUserNameControl.innerHTML = `Bienvenido: ${LoggedUserName}`;
    UserSpan.innerHTML = LoggedUserName;
    EmailSpan.innerHTML = LoggedUserMail;        
    
    control_events()
   
    request('getVetById',LoggedVetId,LoggedVetId,PostGetVetData,PostErrorRequest); //Obtiene la información completa del vet    

    request('getAppointmentsByVet',LoggedVetId,LoggedVetId,PostGetAppointments,PostErrorRequest); //Obtiene las citas del vet

    request('getVetAvailabilityById',LoggedVetId,LoggedVetId,PostGetAvailability,PostErrorRequest); //Obtiene la disponibilidad del vet
    
    NextAppointments.Init()

    request_get_appointments(LoggedVetId) //Carga las citas en la sección de citas
        
    PriceRates.Init()

    menu_expand_btn.addEventListener('click',() => {
        if(side_menu.classList.contains('side-menu-show')){        
            let menu_label = document.querySelectorAll('.menu-label')
            menu_label.forEach((label) => {
                label.style.display = 'none'
            })
            side_menu.classList.remove('side-menu-show')
            side_menu.classList.add('side-menu-hidden')
            menu_expand_btn.classList.remove('collapse-menu')
            menu_expand_btn.classList.add('expand-menu')
        }
        else {            
            side_menu.classList.add('side-menu-show')
            side_menu.classList.remove('side-menu-hidden')
            menu_expand_btn.classList.add('collapse-menu')
            menu_expand_btn.classList.remove('expand-menu')
            let menu_label = document.querySelectorAll('.menu-label')
            setTimeout(() => {
                menu_label.forEach((label) => {
                    label.style.display = 'grid'
                })
            }, 500);
            
        }
    })

});

//CallBacks
function PostGetVetData(response,params){    
    let ListGeneral = document.getElementById("ListGeneral")
    let data = response[0]            

    let card_general_div = card_general(data)
    ListGeneral.append(card_general_div.elemento())

    let ListSpecialties = document.getElementById("ListSpecialties")    
    data.specialties.forEach((specialty) => {
        let card = card_specialty(specialty)
        ListSpecialties.append(card.elemento())
    })
    
    let ListDomicilio = document.getElementById("ListDomicilio")
    data.address.forEach((adress) => {        
        let card = card_address(adress)            
        ListDomicilio.append(card.elemento())
    })

    LocalStorage.Save('Availability',data.availability) //Guarda la disponibilidad en Local Storage
    LocalStorage.Save('PriceRates',data.price_rates) //Guarda la disponibilidad en Local Storage

    fillAvailabilityDays(data.availability) //Aquí se llena la diponibilidad

}
function PostGetAppointments(response,params){
    let data = response
    LocalStorage.Save('Appointments',data) //Guarda la disponibilidad en Local Storage
}
function PostErrorRequest(response,params){    
    console.log(params)
    bootbox.alert('Se ha producido un error al intentar obtener la información');    
}
const PostGetAvailability = (response,params) => {
    let data = response
    LocalStorage.Save('Availability',data) //Guarda la disponibilidad en Local Storage
    let vet = LocalStorage.Get(`VetData_${LoggedVetId}`)
    vet.availability = data
    LocalStorage.Save(`VetData_${LoggedVetId}`,vet)
}

//Element construction
function card_general(data){
    let pet_file_general = crearElemento("div","pet_file_general",["overflow-auto"],"","","","")
    let candidate = crearElemento("div","",["candidate-list-box","card","mt-4"],"","","","")
    let card_body = crearElemento("div","",["p-4","card-body"],"","","","")

    let card_general_img = card_img('Esta foto aparecerá para identificarlo',data.img_src)
    let hr = crearElemento("hr","",[],"","","","")
    let name_card_row = card_row('Nombre:',data.name)
    let cedula_card_row = card_row('No. de cédula profesional:',data.federalProfessionNumber)

    card_body.addBelow(card_general_img.elemento())
    card_body.addBelow(hr.elemento())
    card_body.addBelow(name_card_row.elemento())
    card_body.addBelow(hr.elemento().cloneNode(true))
    card_body.addBelow(cedula_card_row.elemento())

    candidate.addBelow(card_body.elemento())
    pet_file_general.addBelow(candidate.elemento())

    return pet_file_general

}
function card_address(address){    
    let pet_file_general = crearElemento("div","pet_file_general",["overflow-auto"],"","","","")
    let candidate = crearElemento("div","",["candidate-list-box","card","mt-4"],"","","","")
    let card_body = crearElemento("div","",["p-4","card-body"],"","","","")
        
    let hr = crearElemento("hr","",[],"","","","")
    let name_card_row = card_row('Nombre:',address.name)    
    let street_card_row = card_row('Calle y número:',`${address.street} y ${address.streetNo}`)
    let zipcode_card_row = card_row('Código postal:',address.zipCode)
    let country_card_row = card_row('País:',address.country_desc)
    let state_card_row = card_row('Estado/Provincia/Región:',address.state_desc)
    let city_card_row = card_row('Ciudad:',address.town)
    let block_card_row = card_row('Colonia:',address.block)
    let phone_card_row = card_row('Teléfono:',address.phone)
    
    card_body.addBelow(name_card_row.elemento())
    card_body.addBelow(hr.elemento())
    card_body.addBelow(street_card_row.elemento())
    card_body.addBelow(hr.elemento().cloneNode(true))
    card_body.addBelow(zipcode_card_row.elemento())
    card_body.addBelow(hr.elemento().cloneNode(true))
    card_body.addBelow(country_card_row.elemento())
    card_body.addBelow(hr.elemento().cloneNode(true))
    card_body.addBelow(state_card_row.elemento())
    card_body.addBelow(hr.elemento().cloneNode(true))
    card_body.addBelow(city_card_row.elemento())
    card_body.addBelow(hr.elemento().cloneNode(true))
    card_body.addBelow(block_card_row.elemento())
    card_body.addBelow(hr.elemento().cloneNode(true))
    card_body.addBelow(phone_card_row.elemento())
    
    candidate.addBelow(card_body.elemento())
    pet_file_general.addBelow(candidate.elemento())

    return pet_file_general
}
function card_img(label,img_src){
    let img_div = crearElemento("div","",["align-items-center","mt-2","row"],"","","","")
    
    let col_4_img = crearElemento("div","",["col-4"],"","","","")
    let img = crearElemento("img","",["img-fluid","rounded-circle","mb-3","img-thumbnail-bigger","shadow-sm"],"","","","")
    img.addAttributes([{"src":img_src}])

    let col_6 = crearElemento("div","",["col-lg-6"],"","","","")
    let col_6_span = crearElemento("span","",["pet-file-value"],label,"","","")
    let br_col_6 = crearElemento("br","",[],"","","","")
    let btn_col_6 = crearElemento("button","",["btn","btn-ouline-primary"],"Cambiar foto","","","")
    
    let col_auto = crearElemento("div","",["col-lg-auto"],"","","","") 
    let a_col_auto = crearElemento("a","",[],"","","","")

    col_4_img.addBelow(img.elemento())
    col_6.addBelow(col_6_span.elemento())
    col_6.addBelow(br_col_6.elemento())
    col_6.addBelow(btn_col_6.elemento())
    col_auto.addBelow(a_col_auto.elemento())
    img_div.addBelow(col_4_img.elemento())
    img_div.addBelow(col_6.elemento())
    img_div.addBelow(col_auto.elemento())

    return img_div
}
function card_row (label,value){
    let img_div = crearElemento("div","",["align-items-center","mt-2","row"],"","","","")
    
    let col_5_img = crearElemento("div","",["col-5"],"","","","")
    let span_col_5 = crearElemento("span","",["pet-file-data"],label,"","","")

    let col_6 = crearElemento("div","",["col-lg-6"],"","","","")
    let col_6_span = crearElemento("span","",["pet-file-value"],value,"","","")        
    
    let col_auto = crearElemento("div","",["col-lg-1"],"","","","") 
    let a_col_auto = crearElemento("a","",[],">","","","") 

    col_5_img.addBelow(span_col_5.elemento())
    col_6.addBelow(col_6_span.elemento())
    col_auto.addBelow(a_col_auto.elemento())

    img_div.addBelow(col_5_img.elemento())
    img_div.addBelow(col_6.elemento())
    img_div.addBelow(col_auto.elemento())

    return img_div
}
function card_specialty(specialty){    
    let pet_file_general = crearElemento("div","pet_file_general",["overflow-auto"],"","","","")
    let candidate = crearElemento("div","",["candidate-list-box","card","mt-4"],"","","","")
    let card_body = crearElemento("div","",["p-4","card-body"],"","","","")

    let hr = crearElemento("hr","",[],"","","","")
    let name_card_row = card_row('Especialidad:',specialty.name)    
    let experience_card_row = card_row('Experiencia:',specialty.experience_years)    

    card_body.addBelow(name_card_row.elemento())
    card_body.addBelow(hr.elemento())
    card_body.addBelow(experience_card_row.elemento())

    candidate.addBelow(card_body.elemento())
    pet_file_general.addBelow(candidate.elemento())

    return pet_file_general
}


//Rest Calls
function request_get_appointments(vetId){    
    let callBack= function(response,params){                 
        let appointments = response;
        let div_app = document.getElementById("Appointments");        
        appointments.forEach((appointment) => {                   
            let row = createSmallCardAppointment(appointment,true);                  
            div_app.append(row);
        });
    };
    let OnErrorCallBack = function(response,data){};
    request("getAppointmentsByVet",vetId,null,callBack,OnErrorCallBack);
}

//events
function control_events(){

    Info_items.addEventListener('scroll', function() {      
        nav_items_selection.forEach((element) => {            
            checkIsVisible(document.getElementById(element.list),document.getElementById(element.tab))            
        })                      
    })
    
    let items = document.querySelectorAll(".pet-file-menu-item")

    items.forEach((item) => {        
        item.addEventListener('click',function() {
            nav_item_selection(item)
            if(item.id === "item_next_appointments"){
                if(!TabNextAppointments.classList.contains("show")) {
                    TabNextAppointments.classList.remove("no-show")
                    TabNextAppointments.classList.add("show")
                    TabAvailability.classList.remove("show")
                    TabPriceRates.classList.remove("show")
                    TabAvailability.classList.add("no-show")
                    TabPriceRates.classList.add("no-show")
                }
            }
            if(item.id === "item_availability"){
                if(!TabAvailability.classList.contains("show")) {
                    TabAvailability.classList.add("show")
                    TabAvailability.classList.remove("no-show")
                    TabNextAppointments.classList.remove("show")
                    TabNextAppointments.classList.add("no-show")
                    TabPriceRates.classList.remove("show")
                    TabPriceRates.classList.add("no-show")
                }
            }
            if(item.id === "item_prices"){
                if(!TabPriceRates.classList.contains("show")) {
                    TabPriceRates.classList.add("show")
                    TabPriceRates.classList.remove("no-show")
                    TabNextAppointments.classList.remove("show")
                    TabNextAppointments.classList.add("no-show")
                    TabAvailability.classList.remove("show")
                    TabAvailability.classList.add("no-show")
                }
            }
        })                         
    })

    let item_next_appointments = document.getElementById("item_next_appointments")
    item_next_appointments.addEventListener('click',function() {
        nav_item_selection(item_next_appointments)
    })    

    nav_asistant.addEventListener('click',() => {
        $('#AsistantModal').modal('show')
    })

    registration_next.addEventListener('click',() => {
        RegistrationEvents.registration_next_onclick()        
    })
}
function nav_item_selection(selected_item){    
    
    let items = document.querySelectorAll(".pet-file-menu-item")    
    items.forEach(item => {
        if(item.id != selected_item.id)
        {            
            let btn = document.getElementById(item.id + "_btn")            
            if(btn.classList.contains("tab-selected")) {                
                btn.classList.add("tab-unselected")            
                setTimeout(() => {
                    btn.classList.remove("tab-unselected")
                    btn.classList.add("tab-noselection")
                },450)
            }
            btn.classList.remove("tab-selected")
        }
    })    
    let btn_selected = document.getElementById(`${selected_item.id}_btn`)
    if(btn_selected.classList.contains("tab-noselection")) btn_selected.classList.remove("tab-noselection")
    btn_selected.classList.add("tab-selected")    
}
const checkIsVisible = (element,link_item) => {    
    const rect = element.getBoundingClientRect()
    const elementTop = rect.top
    const elementBottom = rect.bottom
//    let isVisible = (elementTop >= 0) && (elementBottom <= window.innerHeight)
    let isVisible = elementTop < (window.innerHeight / 2) && elementBottom >= 0 && elementTop >= 0
    //if(isVisible) console.log(`Top: ${elementTop}, Bottom: ${elementBottom}, window innerHeigh: ${window.innerHeight},  `)
    if(isVisible) nav_item_selection(link_item)
    //if(!isVisible) console.log(`Elemento: ${element.id} Top: ${elementTop}, Bottom: ${elementBottom}, window innerHeigh: ${window.innerHeight},  `)
    
}

//Fill

export const fillAvailabilityDays = (availability) => {    
    
    days.forEach((weekDay) => {        //Recorre el array de días para ir poblando uno por uno        
        switch (weekDay.day) {
            case 'monday':                
                fillAvailabilityDays_bundle(availability.monday,weekDay)
                break
            case 'tuesday':                
                fillAvailabilityDays_bundle(availability.tuesday,weekDay)            
                break
            case 'wednesday':                
                fillAvailabilityDays_bundle(availability.wednesday,weekDay)            
                break
            case 'thursday':                
                fillAvailabilityDays_bundle(availability.thursday,weekDay)            
                break
            case 'friday':                
                fillAvailabilityDays_bundle(availability.friday,weekDay)            
                break
            case 'saturday':                
                fillAvailabilityDays_bundle(availability.saturday,weekDay)            
                break
            case 'sunday':                
                fillAvailabilityDays_bundle(availability.sunday,weekDay)            
                break
        }       
    })
}
const fillAvailabilityDays_bundle = (dayArray,weekDay) => {        
    if(dayArray.length == 0){
        fillAvailabilityDays_unnavailable(weekDay,dayArray)
    }
    else {
        let i = 1
        dayArray.forEach((day) => {
            if(i == 1) { //Para el primer horario se crea una fila con opciones adicionales
                fillAvailabilityDays_initial_hours(day,weekDay,i)
            }
            else { //Las filas mayores a 1 son los horarios adicionales
                fillAvailabilityDays_additional_hours(day,weekDay,i)
            }                                                
            i++
        })
    }
}
const fillAvailabilityDays_unnavailable = (weekDay,dayArray) => {
    let sub_row = Scheduler.scheduler_row_sub(weekDay,1,'08:00','21:00',false,dayArray) //Genera la primer línea de disponibilidad
    let day_div = document.getElementById(`scheduler_${weekDay.day}`) //Instancea el div del día
    let name = `${weekDay.day}_1`
    day_div.append(sub_row.elemento())            
    Events.event_visible_controls(weekDay,name,'none')
    Events.event_add_time(weekDay,1)    
    
}
const fillAvailabilityDays_initial_hours = (dayArray,weekDay,row) => {         
    let sub_row = Scheduler.scheduler_row_sub(weekDay,row,convert_time_string_fromInt(dayArray.start),convert_time_string_fromInt(dayArray.end),true,dayArray) //Genera la primer línea de disponibilidad
    let day_div = document.getElementById(`scheduler_${weekDay.day}`) //Instancea el div del día                
    day_div.append(sub_row.elemento())     
    let name = `${weekDay.day}_${row}`
    Events.event_visible_controls(weekDay,name,'block') //Habilita los controles de hora de inicio y fin
    Events.event_add_time(weekDay) //Agrega el evento al botón "Añadir horario"
}
const fillAvailabilityDays_additional_hours = (dayArray, weekDay, row) => {
    let day_div = document.getElementById(`scheduler_${weekDay.day}`)
    let br = crearElemento("br", "", [])
    day_div.append(br.elemento())
    let row_sub = Scheduler.scheduler_row_sub_details(weekDay, row, convert_time_string_fromInt(dayArray.start), convert_time_string_fromInt(dayArray.end),dayArray)
    day_div.append(row_sub.elemento())
}

//Limpiar Availability
export const clear_availability = () => {
    days.forEach(day => {
        document.getElementById(`scheduler_${day.day}`).innerHTML=''
    })
}