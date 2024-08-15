import {request,getCookie,convert_time_string_fromInt,requestPromise,uuidv4,states} from './functions.js';
import {createSmallCardAppointment} from './appointments.js';
import { crearElemento } from './factory.js';
import * as Scheduler from './Vet/Scheduler/Constructor.js';
import * as Events from './Vet/Scheduler/Events.js';
import * as LocalStorage from './LocalStorage.js'
import * as NextAppointments from './Vet/NextAppoinments/Constructor.js'
import * as PriceRates from './Vet/PricesRates/Constructor.js'
import * as RegistrationEvents from './VetsRegistration/Events.js'
import * as GeneralEvents from './Vet/GeneralEvents.js'

const Info_items = document.getElementById("Info")
const menuPrincipal = document.getElementById("menuPrincipal")
const TabNextAppointments = document.getElementById("TabNextAppointments")
const TabAvailability = document.getElementById("TabAvailability")
const TabPriceRates = document.getElementById("TabPriceRates")
const toast_agenda = document.getElementById("toast_agenda")
const toast_newAppointment = document.getElementById("toast_newAppointment")
const side_menu = document.getElementById("side-menu")
const menu_expand_btn = document.getElementById("menu_expand_btn")
const nav_asistant = document.getElementById('nav-asistant') 
const registration_next = document.getElementById('registration-next')
const btnTimeBreaker_5 = document.getElementById("btnTimeBreaker_5")
const btnTimeBreaker_10 = document.getElementById("btnTimeBreaker_10")
const btnTimeBreaker_15 = document.getElementById("btnTimeBreaker_15")
const AsistantModal_carousel_prev = document.getElementById("AsistantModal_carousel_prev")
const registration_proTitle = document.getElementById("registration_proTitle")
const registration_step_1 = document.getElementById("registration_step_1")
const registration_step_2 = document.getElementById("registration_step_2")
const registration_step_3 = document.getElementById("registration_step_3")
const registration_step_4 = document.getElementById("registration_step_4")
const registration_step_5 = document.getElementById("registration_step_5")
const registration_address_state_1 = document.getElementById("registration_address_state_1")
const registration_address_state_2 = document.getElementById("registration_address_state_2")
const registration_certificate_name = document.getElementById('registration_certificate_name_1')
const btn_registration_certificate_add = document.getElementById("btn_registration_certificate_add")
const registration_saveAndExit = document.getElementById("registration-saveAndExit")
const registration_menu_item = document.getElementById("registration_menu_item")

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

setInterval(function(){ 
    let check_new_appointments_num = check_new_appointments()
    if(check_new_appointments_num) {
        var obj_toast_newAppointment = new bootstrap.Toast(toast_newAppointment)
        obj_toast_newAppointment.show()
    }    
}, 10000); //Función para revisar cada 10 segundos si hay nuevas citas

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
    
    states.forEach(state => {
        let keys = Object.keys(state)        
        let option = crearElemento("option","",["form-select"],state[keys])
        option.addAttributes([{"value":keys[0]}])
        let option_1 = option.elemento().cloneNode(true)
        registration_address_state_1.append(option.elemento())
        registration_address_state_2.append(option_1)
    })
    
    
    let dialog = bootbox.dialog({
        message: '<p class="text-center mb-0"><i class="fas fa-spin fa-cog"></i> Cargando información. Espere unos segundos...</p>',
        closeButton: false
        });
        setTimeout(() => {
            load(dialog,LoggedVetId)    
        }, 600);
        
    control_events()       

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

function load(dialog,LoggedVetId){
    const promiseGetVetById = getVetById(LoggedVetId) //Creo la promesa del request 
    const promisegetAppointmentsByVet = getAppointmentsByVet(LoggedVetId)//Creo la promesa del request
    const promisegetVetAvailabilityById = getVetAvailabilityById(LoggedVetId)//Creo la promesa del request
    const promisegetPriceTypes = getPriceTypes()
    const promisegetProfesionalTitles = getProfesionalTitles()
    const promisegetSpecialties = getSpecialties()

    Promise.all([promiseGetVetById,promisegetAppointmentsByVet,promisegetVetAvailabilityById,promisegetPriceTypes,promisegetProfesionalTitles,promisegetSpecialties]) //Ejecuto las 4 promesas al mismo tiempo
    .then(([GetVetByIdData,AppointmentsByVetData,VetAvailabilityData,PriceTypesData,ProfesionalTitlesData,SpecialtiesData]) => { //Obtengo los resultados de los 4 request, Uno en cada variable                
        PostGetAppointments(AppointmentsByVetData) //Carga las citas y guarda los datos en LocalStorage
        PostGetAvailability(VetAvailabilityData) //Carga las disponibilidades y guarda en LocalStorage
        PostGetPriceTypes(PriceTypesData)//Carga los tipos de precios y guarda en LocalStorage
        PostGetProfesionalTitles(ProfesionalTitlesData)
        PostGetSpecialties(SpecialtiesData)
        PostGetVetData(GetVetByIdData) //Carga la información del Vet en pantalla y guarda los datos en LocalStorage
        NextAppointments.Init() //Carga la información en "Próximas citas"
        PriceRates.Init() //Carga la información en "Tarifas y precios"
        dialog.modal('hide')
    })
    .catch((error) => {
        console.log('Alguno de los requests falló')
        console.log(error)
    })
}

async function getVetById(LoggedVetId){
    return await requestPromise('getVetById',LoggedVetId)
}
async function getAppointmentsByVet(LoggedVetId){
    return await requestPromise('getAppointmentsByVet',LoggedVetId)
}
async function getVetAvailabilityById(LoggedVetId){
    return await requestPromise('getVetAvailabilityById',LoggedVetId)
}
async function getPriceTypes(){
    return await requestPromise('getPriceTypes','')
}
async function getProfesionalTitles(){
    return await requestPromise('getProfesionalTitles','')
}
async function getSpecialties(){
    return await requestPromise('getSpecialties','')
}
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

    main_card_fill(data)

    fillRegistationForm(data)

    LocalStorage.Save('Availability',data.availability) //Guarda la disponibilidad en Local Storage
    LocalStorage.Save('PriceRates',data.price_rates) //Guarda la disponibilidad en Local Storage
    if(data.registryComplete == "N") $('#AsistantModal').modal('show')
    if(data.registryComplete == "Y") registration_menu_item.classList.add('no-show')
    fillAvailabilityDays(data.availability) //Aquí se llena la diponibilidad        
}
function PostGetAppointments(response,params){
    let appointments = response
    LocalStorage.Save('Appointments',appointments) //Guarda la disponibilidad en Local Storage    
    let div_app = document.getElementById("Appointments");        
    appointments.forEach((appointment) => {                   
    let row = createSmallCardAppointment(appointment,true);                  
    div_app.append(row);        
    })
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
const PostGetPriceTypes = (response,params) => {
    let data = response
    LocalStorage.Save('PriceTypes',data) //Guarda la disponibilidad en Local Storage
}
const PostGetProfesionalTitles = (response,params) => {
    let data = response
    LocalStorage.Save('ProfesionalTitles',data)
    data.forEach(ProfesionalTitle => {
        let option = crearElemento("option","",[],ProfesionalTitle.name)
        option.addAttributes([{"value":ProfesionalTitle.id}])
        registration_proTitle.append(option.elemento())        
    })
}
const PostGetSpecialties = (response,params) => {
    let data = response
    LocalStorage.Save('Specialties',data)
    LocalStorage.Save('CurrentSpecialties',[])
    let specialties_badges = document.querySelector('.specialties-badges')
    data.forEach(specialty => { //Crear los badges de especialidades
        let uid = uuidv4()
        let specialty_control = crearElemento("button",uid,["btn","btn-secondary","specialties-badge"],specialty.name)   
        specialty_control.addAttributes([{"sp_id":specialty.id}])
        let parametersArray = [uid]
        specialty_control.addEvent('click',RegistrationEvents.event_specialty_selected_onclick,parametersArray)
        specialties_badges.append(specialty_control.elemento())
    })
}

//Main-card
const main_card_fill = (data) => {
    $("#main-card-name").html(data.name)    
    $("#main-card-title").html(data.titleDesc)
    $("#main-card-city").html(`${data.city}, ${data.state_desc}`)    
}

//Element construction
function card_general(data){
    let pet_file_general = crearElemento("div","pet_file_general",["overflow-auto"],"","","","")
    let candidate = crearElemento("div","",["candidate-list-box","card","mt-4"],"","","","")
    let card_body = crearElemento("div","",["p-4","card-body"],"","","","")

    let card_general_img = card_img('Esta foto aparecerá para identificarlo',data.img_src)
    let hr = crearElemento("hr","",[],"","","","")
    let name_card_row = card_row('Nombre:',data.name)
    let cedula_card_row = card_row('No. de cédula profesional:',data.federalProffessionNumber)

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
    let street_card_row = card_row('Calle y número:',`${address.street}`)
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
    let upload_form = crearElemento("form","form_submit_pic",[])
    upload_form.addAttributes([{"action":"/api"},{"method":"post"},{"enctype":"multipart/form-data"}])
    let parametersArray = []
    upload_form.addEvent('submit',GeneralEvents.event_submit_pic,parametersArray)
    let upload_input = crearElemento("input","vet-pic-input",[],"","file")        
    let upload_button = crearElemento("button","",["btn","btn-ouline-primary"],"Cambiar foto","","","")
    
    upload_form.addBelow(upload_input.elemento())
    upload_form.addBelow(upload_button.elemento())
    

    let col_auto = crearElemento("div","",["col-lg-auto"],"","","","") 
    let a_col_auto = crearElemento("a","",[],"","","","")

    col_4_img.addBelow(img.elemento())
    col_6.addBelow(col_6_span.elemento())
    col_6.addBelow(br_col_6.elemento())

    col_6.addBelow(upload_form.elemento())
    
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

    btnTimeBreaker_5.addEventListener('click',() => {
        Events.event_add_extra_time_onclick(5)
    })
    btnTimeBreaker_10.addEventListener('click',() => {
        Events.event_add_extra_time_onclick(10)
    })
    btnTimeBreaker_15.addEventListener('click',() => {
        Events.event_add_extra_time_onclick(15)
    })
    AsistantModal_carousel_prev.addEventListener('click',() => {
        RegistrationEvents.event_AsistantModal_carousel_prev_onclick()
    })
    registration_step_1.addEventListener('click',() => {
        RegistrationEvents.event_registration_step_onclick(0)
    })
    registration_step_2.addEventListener('click',() => {
        RegistrationEvents.event_registration_step_onclick(1)
    })
    registration_step_3.addEventListener('click',() => {
        RegistrationEvents.event_registration_step_onclick(2)
    })
    registration_step_4.addEventListener('click',() => {
        RegistrationEvents.event_registration_step_onclick(3)
    })
    registration_step_5.addEventListener('click',() => {
        RegistrationEvents.event_registration_step_onclick(4)
    })
    registration_certificate_name.addEventListener('input',() => {
        RegistrationEvents.event_registration_certificate_name_oninput(1,'registration_certificate_name_1')
    })
    btn_registration_certificate_add.addEventListener('click',() => {
        RegistrationEvents.event_registration_certificate_add()
    })

    registration_saveAndExit.addEventListener('click',() => {
        RegistrationEvents.registration_saveAndExit_onClick()
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
const fillRegistationForm = (vet) => {
    //console.log(vet)
    $("#registration_Name").val(vet.names)
    $("#registration_LastName_1").val(vet.lastName1)
    $("#registration_LastName_2").val(vet.lastName2)    
    $("#registration_proTitle").val(vet.title)
    $("#registration_fedRegistration").val(vet.federalProffessionNumber)
    let specialties_badges = document.querySelectorAll('.specialties-badge')    
    let specialties_badges_list = []
    specialties_badges.forEach(control => {
        specialties_badges_list.push({"id": control.id,"sp_id" : control.getAttribute('sp_id')})
    })    
    vet.specialties.forEach(specialty => {        
        let control = specialties_badges_list.filter(element => element.sp_id == specialty.id)        
        RegistrationEvents.event_specialty_selected_onclick(control[0].id)
    })
    let address_index = 1
    vet.address.forEach(adress => {        
        $(`#registration_address_city_${address_index}`).val(adress.city)
        $(`#registration_address_block_${address_index}`).val(adress.block)        
        $(`#registration_address_zipcode_${address_index}`).val(adress.zipcode)
        $(`#registration_address_state_${address_index}`).val(adress.state)
        $(`#registration_address_street_${address_index}`).val(adress.street)
        address_index++
    })

    let education_index = 1
    vet.education.forEach(certificate => {
        if(education_index > 1) RegistrationEvents.event_registration_certificate_add()
        $(`#registration_certificate_id_${education_index}`).text(certificate.name)
        $(`#registration_certificate_name_${education_index}`).val(certificate.name)
        $(`#registration_certificate_emiter_${education_index}`).val(certificate.emiter)
        $(`#registration_certificate_expeditionDate_${education_index}`).val(certificate.expeditionDate)
        $(`#registration_certificate_dueDate_${education_index}`).val(certificate.dueDate)
        $(`#registration_certificate_url_${education_index}`).val(certificate.url)
        education_index++
    })

    $("#registration_aboutYou").val(vet.aboutYou)

    RegistrationEvents.registration_validate_status_steps()
}

//Limpiar Availability
export const clear_availability = () => {
    days.forEach(day => {
        document.getElementById(`scheduler_${day.day}`).innerHTML=''
    })
}

//Check for new Appointments
function check_new_appointments(){
    let appointments = LocalStorage.Get('Appointments')
    if(appointments.length == 0) {
        return false
    }
    let appointments_pending = appointments.filter(appointment => appointment.status == 'N')

    if(appointments_pending.length > 0) {
        appointments.forEach(appointment => {
            appointment.status = 'P'
        })
        LocalStorage.Save('Appointments',appointments)
        return true
    }

    return false
}