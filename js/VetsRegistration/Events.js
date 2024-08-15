import * as LocalStorage from '../LocalStorage.js'
import { crearElemento } from "../factory.js"
import {save_vet_registration_specialties,save_vet_registration} from './Save.js'
import * as Constructor from './Constructor.js'

const Registration_carousel = document.getElementById('Registration_carousel')
const title_AsistantModal = document.getElementById('title_AsistantModal')

const registration_step_1 = document.getElementById('registration_step_1')
const registration_step_2 = document.getElementById('registration_step_2')
const registration_step_3 = document.getElementById('registration_step_3')
const registration_step_4 = document.getElementById('registration_step_4')
const registration_step_5 = document.getElementById('registration_step_5')

const tabListCertificates = document.getElementById("tabListCertificates")
const tab_certificates_add_item = document.getElementById("tab-certificates-add-item")
const registration_certificate_panes  = document.getElementById("registration_certificate_panes")

export const registration_next_onclick = () => {
    $('#Registration_carousel').carousel('next')   
    registration_steps_onchange()
}

const registration_steps_onchange = () => {
    setTimeout(() => {
        let step = get_carousel_current_step() 
        let booking_step = document.querySelectorAll('.step-wizard-item')
        booking_step.forEach(step => step.classList.remove('current-item'))

        switch(step){
            case '0':
                registration_step_1.classList.add('current-item')
                title_AsistantModal.innerHTML = 'Registro - Generales'
                break
            case '1':
                registration_step_2.classList.add('current-item')
                title_AsistantModal.innerHTML = 'Registro - Especialidades'
                break
            case '2':
                registration_step_3.classList.add('current-item')
                title_AsistantModal.innerHTML = 'Registro - Domicilio'
                break
            case '3':
                registration_step_4.classList.add('current-item')
                title_AsistantModal.innerHTML = 'Registro - Certificados'
                break
            case '4':
                registration_step_5.classList.add('current-item')
                title_AsistantModal.innerHTML = 'Registro - Cuéntanos sobre ti'
                break

        }
        registration_validate_status_steps()
    }, 800);
}
export const registration_validate_status_steps = () => {
    //Generales
    if($("#registration_Name").val() != '' && $("#registration_proTitle").val() != '-1' && $("#registration_fedRegistration").val() != '')
        {
            registration_validate_status_steps_validated(1)
        }
    else {
        registration_validate_status_steps_not_validated(1)
    }
    //Especialidades
    let specialties_cat = LocalStorage.Get('CurrentSpecialties')            
    if(specialties_cat.length > 0) {        
        registration_validate_status_steps_validated(2)
    }
    else{
        registration_validate_status_steps_not_validated(2)
    }
    //Domicilio
    if($("#registration_address_state_1").val() != '' && ($("#registration_address_city_1").val() != '' || $("#registration_address_municipality_1").val() != '') && $("#registration_address_block_1").val() != '' && $("#registration_address_street_1").val() != '' )
        {
            registration_validate_status_steps_validated(3)
        }
    else{
            registration_validate_status_steps_not_validated(3)
        }
    //Certificados
    if($("#registration_certificate_name_1").val() != '' && $("#registration_certificate_emiter_1").val() != '' && $("#registration_certificate_expeditionDate_1").val() != '' && $("#registration_certificate_dueDate_1").val() != '')
        {            
            registration_validate_status_steps_validated(4)
        }
    else{        
            registration_validate_status_steps_not_validated(4)
        }
    if($("#registration_aboutYou").val() != '')
        {
            registration_validate_status_steps_validated(5)
        }
    else{
            registration_validate_status_steps_not_validated(5)
        }
}
const registration_validate_status_steps_validated = (id) => {    
    if(!document.getElementById(`registration_step_${id}_redBall`).classList.contains('no-show')) {        
        document.getElementById(`registration_step_${id}_redBall`).classList.add('no-show')
    }
}
const registration_validate_status_steps_not_validated = (id) => {    
    if(document.getElementById(`registration_step_${id}_redBall`).classList.contains('no-show')) document.getElementById(`registration_step_${id}_redBall`).classList.remove('no-show')
}

export const event_registration_step_onclick = (step) => {
    $('#Registration_carousel').carousel(step)
    registration_steps_onchange()
}
const get_carousel_current_step = () => {
    let carousel_items = Registration_carousel.querySelectorAll('.carousel-item')
    let step =''
    carousel_items.forEach((node) => {
        if(node.classList.contains('active')){            
            step = node.getAttribute('step')            
            return
        }
    })
    return step    
}
export const event_AsistantModal_carousel_prev_onclick = () => {
    $('#Registration_carousel').carousel('prev')
    registration_steps_onchange() 
}

//Especialidades
export const event_specialty_selected_onclick = (id) => {    
    let badge = document.getElementById(id)
    $(`#${id}`).attr("disabled",true) //Deshabilito el control para evitar un doble click

    let sp_id = badge.getAttribute("sp_id")
    let specialties = LocalStorage.Get('Specialties') //Obtengo el catálogo desde Local Storage
    let specialty = specialties.filter(element => element.id == sp_id) //Filtro para obtener la especialidad seleccionada    

    let response = save_vet_registration_specialties(specialty[0])    
    if (response)
        {
            let Specialties_own_badges = document.querySelector('.Specialties-own-badges')
            
            let new_badge = crearElemento("button","",["btn","btn-outline-secondary","specialties-badge-added"])
            let new_badge_remove = crearElemento("i","",["fa-solid","fa-xmark"])
            let new_badge_span = crearElemento("span","",[],` ${badge.innerHTML}`)
            new_badge.addBelow(new_badge_remove.elemento())
            new_badge.addBelow(new_badge_span.elemento())

            Specialties_own_badges.append(new_badge.elemento())

            badge.classList.remove('Specialties-badges')
            badge.classList.add('Specialties-badges-selected')
            setTimeout(() => {
                badge.remove()
            }, 500);
        }
        else 
        {
            $(`#${id}`).removeAttr("disabled") //Vuelvo a habilitar el control
        }
}

//Certificados
export const event_registration_certificate_name_oninput = (cert_id, name_id) => {    
    $(`#registration_certificate_id_${cert_id}`).text(document.getElementById(name_id).value)
}
export const event_registration_certificate_new_name_oninput = (parametersArray) => {
    let cert_id = parametersArray[0]
    let name_id = parametersArray[1]        
    $(`#registration_certificate_id_${cert_id}`).text(document.getElementById(`${name_id}_${cert_id}`).value)
}
export const event_registration_certificate_add = () => {
    event_registration_certificate_add_helper()
}
const event_registration_certificate_add_helper = () => {
    let certificate_controls = document.querySelectorAll('[name="registration_certificate"]')    
    let data_id = certificate_controls.length + 1
    let new_tab_li = Constructor.create_registration_certificade_link(data_id)

    let nav_tabs = tabListCertificates.querySelectorAll(".nav-link") //Con esto, inserto el elemento justo antes del botón de "Añadir"
    nav_tabs.forEach(nav_tab => {
        if(nav_tab.classList.contains("active"))  {
            nav_tab.classList.remove("active")
            nav_tab.setAttribute("aria-selected","false")
        }
    })
    
    tabListCertificates.insertBefore(new_tab_li.elemento(),tab_certificates_add_item) //Con esto, inserto el elemento justo antes del botón de "Añadir"

    let tab_panes =  registration_certificate_panes.querySelectorAll(".tab-pane") //Obtengo todos los "Pane" para remover el "Activo"
    tab_panes.forEach(pane => {
        if(pane.classList.contains("active")) pane.classList.remove("active")
    })
    
    let new_pane = crearElemento("div",`registration_certificate_${data_id}`,["tab-pane","active"]) //Creo un nuevo tab como "Activo"         
    new_pane.addBelow(Constructor.create_registration_certificate_name(data_id).elemento()) //Añado el control para el nombre
    new_pane.addBelow(Constructor.create_registration_certificate_emiter(data_id).elemento()) //Añado el control para el emisor
    new_pane.addBelow(Constructor.create_registration_certificate_expeditionDate(data_id).elemento()) //Añado el control para la fecha de expedición
    new_pane.addBelow(Constructor.create_registration_certificate_dueDate(data_id).elemento()) //Añado el control para la fecha de caducidad
    new_pane.addBelow(Constructor.create_registration_certificate_url(data_id).elemento()) //Añado el control para la url del certificado
    registration_certificate_panes.appendChild(new_pane.elemento())
}
export const registration_saveAndExit_onClick = () => {
    save_vet_registration()
}