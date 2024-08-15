import {getCookie,async_request_put} from '../functions.js';
import * as LocalStorage from '../LocalStorage.js'
import {Address} from '../Models/Address.js'
import {Certificate} from '../Models/Certificates.js'


const LoggedVetId = getCookie('LoggedVetId');

export function save_vet_registration_specialties(specialty) {
    let specialties = LocalStorage.Get('CurrentSpecialties')
    if(specialties == undefined) specialties =[]
    if(specialties.length > 5) return false //Si ya van 6 propiedades regresa false para no seguir agregado más
    specialties.push(specialty)
    LocalStorage.Save('CurrentSpecialties',specialties)
    
    return true //Regresa true si es que sí logró guardar
}
export const save_vet_registration = () => {
    console.log('Guardando info')
    //Generales
    let registration_Name = $("#registration_Name").val()
    let registration_lastName_1 = $("#registration_LastName_1").val()
    let registration_lastName_2 = $("#registration_LastName_2").val()
    let registration_proTitle = $("#registration_proTitle").val()
    let registration_fedRegistration = $("#registration_fedRegistration").val()
     
    //Especialidades
     const specialties = LocalStorage.Get('CurrentSpecialties')    

     //Domicilio 1 y 2
    let registration_address_state_1 = $("#registration_address_state_1").val()
    let registration_address_city_1 = $("#registration_address_city_1").val()
    let registration_address_municipality_1 = $("#registration_address_municipality_1").val()
    let registration_address_block_1 = $("#registration_address_block_1").val()
    let registration_address_zipcode_1 = $("#registration_address_zipcode_1").val()
    let registration_address_street_1 = $("#registration_address_street_1").val()
    let registration_address_maps_1 = $("#registration_address_maps_1").val()
    

    let vet = LocalStorage.Get(`VetData_${LoggedVetId}`)
    vet.names = registration_Name
    vet.lastName1 = registration_lastName_1
    vet.lastName2 = registration_lastName_2
    vet.title = registration_proTitle
    vet.federalProffessionNumber = registration_fedRegistration
    vet.specialties = specialties
    vet.city = registration_address_city_1
    vet.municipality = registration_address_municipality_1
    vet.state = registration_address_state_1
    vet.state_desc = document.getElementById("registration_address_state_1").options[document.getElementById("registration_address_state_1").selectedIndex].text
    vet.zipcode = registration_address_zipcode_1    
    let address1 = new Address('Domicilio 1','MEX','México',registration_address_state_1,vet.state_desc,vet.zipcode,registration_address_block_1,registration_address_city_1,registration_address_street_1,registration_address_maps_1)
    let address = []
    address.push(address1)
    vet.address = address
    
    vet.specialties = LocalStorage.Get('CurrentSpecialties') //Especialidades
    let certificate_controls = document.querySelectorAll('[name="registration_certificate"]')
    
    let certifiacte_index = 1
    let certificates = []
    certificate_controls.forEach(certificate_control => {
        //Certificados
        let registration_certificate_name = $(`#registration_certificate_name_${certifiacte_index}`).val()
        let registration_certificate_emiter = $(`#registration_certificate_emiter_${certifiacte_index}`).val()
        let registration_certificate_expeditionDate = $(`#registration_certificate_expeditionDate_${certifiacte_index}`).val()
        let registration_certificate_dueDate = $(`#registration_certificate_dueDate_${certifiacte_index}`).val()
        let registration_certificate_url = $(`#registration_certificate_url_${certifiacte_index}`).val()

        let certificate = new Certificate(registration_certificate_name,registration_certificate_emiter,registration_certificate_expeditionDate,registration_certificate_dueDate,registration_certificate_url)    
        certificates.push(certificate)
        certifiacte_index++
    })
    vet.education = certificates //Certificados y educación
    vet.aboutYou = $("#registration_aboutYou").val()
    async_request_put('putVetsById',LoggedVetId,JSON.stringify(vet),PostPutVetData,PostErrorRequest); //Obtiene la información completa del vet
}
const PostPutVetData = (response,params) => {
    console.log('Guardado')
}
function PostErrorRequest(response,params){
    console.log(params);
    bootbox.alert('Se ha producido un error al intentar guardar la información');    
}