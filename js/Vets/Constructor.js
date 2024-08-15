import { crearElemento } from '../factory.js';
import {requestPromise,getCookie} from '../functions.js';
import {event_vetLink_onclick} from './Event.js'

const VetsCatalog = document.getElementById("VetsCatalog")

export const Init = () => {    
    let promiseGetVets = getVets()
    promiseGetVets.then(vets => {
        let row_indicator = 0
        vets.forEach(vet => {
            if(row_indicator == 0){
                VetsCatalog.append(vet_card_row_0(vet).elemento())
                row_indicator = 1
            }
            else {
                VetsCatalog.append(vet_card_row_1(vet).elemento())
                row_indicator = 0
            }
        })
    })
        
}

//Async functions
async function getVets(){
    return await requestPromise('getVets','')
}

//Vet Card
const vet_card_row_0 = (vet) => {
    let row = crearElemento("div","",["row"])
    let row_col_8 = crearElemento("div","",["col-8"])
    row_col_8.addBelow(vet_card(vet).elemento())
    let row_col_4 = crearElemento("div","",["col-4"])
    row.addBelow(row_col_8.elemento())
    row.addBelow(row_col_4.elemento())
    return row
}
const vet_card_row_1 = (vet) => {
    let row = crearElemento("div","",["row"])
    let row_col_4 = crearElemento("div","",["col-4"])
    let row_col_8 = crearElemento("div","",["col-8"])
    row_col_8.addBelow(vet_card(vet).elemento())
    row.addBelow(row_col_4.elemento())
    row.addBelow(row_col_8.elemento())
    return row
}
const vet_card = (vet) => {
    let main = crearElemento("div","",["candidate-list-box","card","mt-4"])
    let main_body = crearElemento("div","",["p-4","card-body"])
    let main_body_row = crearElemento("div","",["align-items-center","mt-2","row"])
    let main_body_row_3 = crearElemento("div","",["col-3"])
    let main_body_row_3_img = crearElemento("img","",["img-fluid","rounded-circle","mb-3","img-thumbnail-bigger","shadow-sm"])
    main_body_row_3_img.addAttributes([{"src":"https://bootdey.com/img/Content/avatar/avatar7.png"}])
    main_body_row_3.addBelow(main_body_row_3_img.elemento())

    let main_body_row_6 = crearElemento("div","",["col-lg-6"])
    let main_body_row_6_dblock_1 = crearElemento("div","",["d-block"])    
    let main_body_row_6_dblock_1_span = crearElemento("span","",["pet-file-data"],vet.name)    
    main_body_row_6_dblock_1.addBelow(main_body_row_6_dblock_1_span.elemento())
    
    let main_body_row_6_dblock_2 = crearElemento("div","",["d-block"])
    let main_body_row_6_dblock_2_span = crearElemento("span","",["pet-file-data"],vet.email)
    main_body_row_6_dblock_2.addBelow(main_body_row_6_dblock_2_span.elemento())
    let main_body_row_6_dblock_3 = crearElemento("div","",["d-block"])
    let main_body_row_6_dblock_3_span = crearElemento("span","",["pet-file-data"],`${vet.city}, ${vet.state_desc}`)
    main_body_row_6_dblock_3.addBelow(main_body_row_6_dblock_3_span.elemento())
    let main_body_row_6_dblock_4 = crearElemento("div","",["d-block"])
    let main_body_row_6_dblock_4_span = crearElemento("span","",["pet-file-data"],`Ranking actual: 4.7`)
    main_body_row_6_dblock_4.addBelow(main_body_row_6_dblock_4_span.elemento())
    let main_body_row_6_dblock_5 = crearElemento("div","",["d-block"])
    let main_body_row_6_dblock_5_star_1 = crearElemento("i","",["fa-solid","fa-star"])
    let main_body_row_6_dblock_5_star_2 = crearElemento("i","",["fa-solid","fa-star"])
    let main_body_row_6_dblock_5_star_3 = crearElemento("i","",["fa-solid","fa-star"])
    let main_body_row_6_dblock_5_star_4 = crearElemento("i","",["fa-solid","fa-star"])
    let main_body_row_6_dblock_5_star_5 = crearElemento("i","",["fa-regular","fa-star"])
    main_body_row_6_dblock_5.addBelow(main_body_row_6_dblock_5_star_1.elemento())
    main_body_row_6_dblock_5.addBelow(main_body_row_6_dblock_5_star_2.elemento())
    main_body_row_6_dblock_5.addBelow(main_body_row_6_dblock_5_star_3.elemento())
    main_body_row_6_dblock_5.addBelow(main_body_row_6_dblock_5_star_4.elemento())
    main_body_row_6_dblock_5.addBelow(main_body_row_6_dblock_5_star_5.elemento())  
    
    main_body_row_6.addBelow(main_body_row_6_dblock_1.elemento())
    main_body_row_6.addBelow(main_body_row_6_dblock_2.elemento())
    main_body_row_6.addBelow(main_body_row_6_dblock_3.elemento())
    main_body_row_6.addBelow(main_body_row_6_dblock_4.elemento())
    main_body_row_6.addBelow(main_body_row_6_dblock_5.elemento())
    
    let main_body_row_auto = crearElemento("div","",["col-lg-auto"])
    let main_body_row_auto_link = crearElemento("a","",["text-primary"],"Ver expediente")
    //main_body_row_auto_link.addAttributes([{"href":"#"},{"data-bs-toggle":"modal"},{"data-bs-target":"#VetFileModal"},{"Title":"Expediente"}])
    let parametersArray = [vet.idVet]
    main_body_row_auto_link.addEvent('click',event_vetLink_onclick,parametersArray)
    main_body_row_auto.addBelow(main_body_row_auto_link.elemento())

    main_body_row.addBelow(main_body_row_3.elemento())
    main_body_row.addBelow(main_body_row_6.elemento())
    main_body_row.addBelow(main_body_row_auto.elemento())
    main_body.addBelow(main_body_row.elemento())
    main.addBelow(main_body.elemento())
    return main

}