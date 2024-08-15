import {request,getVetById,requestPromise,getCookie} from './functions.js';
import {createCardAppointment,createSmallCardAppointment} from './appointments.js';
import {createBuildPetCard} from './pets.js';
import * as Events from './user/Events.js'
import * as LocalStorage from './LocalStorage.js'
import * as Constructor from './user/Constructor.js'
import { crearElemento } from './factory.js';

const book_appointment_to_step2 = document.getElementById("book_appointment_to_step2")
const book_appointment_pet_row = document.getElementById('book_appointment_pet_row')
const book_appointment_to_confirm = document.getElementById('book_appointment_to_confirm')

const NewPet_species_buttons = document.getElementById("NewPet_species_buttons")

$(document).ready(function () {
    let LoggedUserId = getCookie('LoggedUserId');
    let LoggedUserName = getCookie('LoggedUserName');
    let LoggedUserMail = getCookie('LoggedUserMail');
    let LoggedUserNameControl = document.getElementById('LoggedUserName');    
    let UserSpan = document.getElementById('UserSpan');
    let EmailSpan = document.getElementById('EmailSpan');
    LoggedUserNameControl.innerHTML = `Bienvenido: ${LoggedUserName}`;
    UserSpan.innerHTML = LoggedUserName;
    EmailSpan.innerHTML = LoggedUserMail;

    var ModalPet = document.getElementById('ModalPet');
        ModalPet.addEventListener('shown.bs.modal', function () {
                Load_Pet_Apointments(LoggedUserId);
            });
        ModalPet.addEventListener('hide.bs.modal', function () {
                let div_app = document.getElementById("modal_pets_content");
                div_app.innerHTML='';
            });      

    GetMyPets(LoggedUserId);    

    GetMyAppointments(LoggedUserId);    
    
    Events.general_events()

    fillNewPet()

    // book_appointment_to_step2.addEventListener('click',function() {
    //     VetModalEvents.event_book_appointment_to_step2()
    // })

});


function GetMyPets(ownerId){    
    let OnErrorCallBack = function(response,data){        
    };
    request("getPetsById",ownerId,null,OnGetMyPets,OnErrorCallBack);
}
function EventsPetButtons(){    
    let pet_files = document.querySelectorAll(".pet-file");
    pet_files.forEach(pet_file => {
        let title = pet_file.getAttribute("title");
        if(title == 'Citas'){        
            let click = () => {            
                ClickPetButton(pet_file.getAttribute("pet-id"));
            }
            pet_file.addEventListener("click",click);        
        }
    });    
}
function ClickPetButton(id){    
    let LoggedUserId = getCookie('LoggedUserId');
    document.cookie = 'LoggedPetId = ' + id;    
    $('#ModalPet').modal('show');
}

function GetMyAppointments(ownerId){
    let callBack= function(response,params){           
        let appointments = response;
        let div_app = document.getElementById("Appointments");
        //div_app.innerHTML='';
        appointments.forEach((appointment) => {                   
            let row = createSmallCardAppointment(appointment,true);            
            div_app.append(row);
        });
    };
    let OnErrorCallBack = function(response,data){};
    request("getAppointmentsByOwner",ownerId,null,callBack,OnErrorCallBack);
}
function Load_Pet_Apointments(){
    let LoggedUserId = getCookie('LoggedUserId');
    let LoggedPetId = getCookie('LoggedPetId');    
    let params = `${LoggedUserId}/${LoggedPetId}`;
    let callBack= function(response,params){           
        let appointments = response;
        let div_app = document.getElementById("modal_pets_content");
        div_app.innerHTML='';
        appointments.forEach((appointment) => {  
            console.log(appointment);                 
            let row = createSmallCardAppointment(appointment,false);
            console.log(row);
            div_app.append(row);
        });
    };
    let OnErrorCallBack = function(response,data){};
    request("getAppointmentsByOwnerByPet",params,null,callBack,OnErrorCallBack);
}

//Callback
const OnGetMyPets = (response, params) => {
    const pets_div = document.getElementById("pets_div");    
    pets_div.innerHTML='';    
    LocalStorage.Save('MyPetsCatalog',response)

    response.forEach(element => {   
        try
        {                     
        let pet_card = createBuildPetCard(element);
        pets_div.append(pet_card.elemento());    //Creo las cards de mascotas en la pantalla principal
        let book_appointment_pet_item = Constructor.create_book_appointment_pet(element)        
        book_appointment_pet_row.append(book_appointment_pet_item.elemento()) //Creo las cards de las mascotas a seleccionar en las citas        
        }
        catch(error){
            console.log(error)
        }
    });
    EventsPetButtons();        
}

//Fill New Pet
const fillNewPet = () => {
    let h5 = crearElemento("h5","",[],"Prueba")
    NewPet_species_buttons.append(h5.elemento())
}