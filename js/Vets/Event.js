import {requestPromise} from '../functions.js';
import * as VetModal from '../VetModal/Constructor.js'
import * as LocalStorage from '../LocalStorage.js'

export const event_vetLink_onclick = (parametersArray) => {
    console.log(parametersArray[0])
    let promiseGetVetById = getVetByIdAsync(parametersArray[0])
    promiseGetVetById.then(data => {
        if(data.length > 0){
            LocalStorage.Save('CurrentVet',data[0])
            document.cookie = 'CurrentVetId = ' + data[0].idVet
            vetModal_fill(data[0])
            VetModal.Init()
            $('#VetFileModal').modal('show')
        }
    })
}

//Async functions
async function getVetByIdAsync(vetId){
    return await requestPromise('getVetById',vetId)
}

//fill VetModal
async function fillVetModal(vet) {

}

export const event_carousel_miniAgenda_next = () => {
    console.log('Next')
}

export const event_carousel_miniAgenda_prev = () => {
    
}

const main_card_fill = (data) => {
    $("#main-card-name").html(data.name)
    $("#main-card-title").html(data.titleDesc)
    $("#main-card-city").html(`${data.city}, ${data.state_desc}`)    
}

const vetModal_fill = (data) => {
    console.log(data)
    $("#VetFileModalLabel").html(data.name)
    $("#modal-general-name").html(data.name)
    $("#modal-general-fedProfNum").html(data.federalProffessionNumber)
    $("#modal-general-title").html(data.titleDesc)
    $("#modal-general-specialties").html(vetModal_fill_specialties(data.specialties))
    $("#modal-general-location").html(`${data.city}, ${data.state_desc}`)
    main_card_fill(data)
}

const vetModal_fill_specialties = (specialties) => {
    let fullString = ''
    specialties.forEach(specialty => {
        fullString = fullString  + specialty.name + ' | '
    })
    return fullString
}