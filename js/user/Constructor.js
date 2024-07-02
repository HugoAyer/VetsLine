import { crearElemento } from "../factory.js"
import * as Events from '../VetModal/Events.js'
import {uuidv4} from '../functions.js';

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
