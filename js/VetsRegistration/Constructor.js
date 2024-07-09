import * as LocalStorage from '../LocalStorage.js'
import { crearElemento } from "../factory.js"
import {event_registration_certificate_new_name_oninput} from './Events.js'

export function create_registration_certificade_link() {
    let new_tab_li = crearElemento("li","",["nav-item"]) //Creo un nuevo elemento TAB
    let new_tab_li_a = crearElemento("a","",["nav-link","active"])
    new_tab_li_a.addAttributes([{"href":"#registration_certificate_2"},{"data-bs-toggle":"tab"},{"aria-selected":"true"}])
    let new_tab_li_a_span = crearElemento("span","registration_certificate_id_2",[],"Nuevo domicilio")
    new_tab_li_a.addBelow(new_tab_li_a_span.elemento())
    new_tab_li.addBelow(new_tab_li_a.elemento())    

    return new_tab_li
}
export function create_registration_certificate_name() {
    let name_d_flex = crearElemento("div","",["d-flex","form-line"])
    let name_d_flex_label = crearElemento("label","",["form-label","registration-label"],"Nombre")
    name_d_flex_label.addAttributes([{"for":"registration_certificate_name_2"}])
    let name_d_flex_input = crearElemento("input","registration_certificate_name_2",["form-control"],"","text")
    name_d_flex_input.addAttributes([{"placeholder":"Nombre"}])
    let parametersArray = [2,'registration_certificate_name']
    name_d_flex_input.addEvent('input',event_registration_certificate_new_name_oninput,parametersArray)
    name_d_flex.addBelow(name_d_flex_label.elemento())
    name_d_flex.addBelow(name_d_flex_input.elemento())
    //Me falta añadirle la funcionalidad para el evento "input"
    return name_d_flex
}
export function create_registration_certificate_emiter() {
    let emiter_d_flex = crearElemento("div","",["d-flex","form-line"])
    let emiter_d_flex_label = crearElemento("label","",["form-label","registration-label"],"Empresa emisora")
    emiter_d_flex_label.addAttributes([{"for":"registration_certificate_emiter_2"}])
    let emiter_d_flex_input = crearElemento("input","registration_certificate_emiter_2",["form-control"],"","text")
    emiter_d_flex_input.addAttributes([{"placeholder":"Empresa emisora"}])
    emiter_d_flex.addBelow(emiter_d_flex_label.elemento())
    emiter_d_flex.addBelow(emiter_d_flex_input.elemento())
    //Me falta añadirle la funcionalidad para el evento "input"
    return emiter_d_flex 
}
export function create_registration_certificate_expeditionDate() {
    let expeditionDate_d_flex = crearElemento("div","",["d-flex","form-line"])
    let expeditionDate_d_flex_label = crearElemento("label","",["form-label","registration-label"],"Fecha de expedición")
    expeditionDate_d_flex_label.addAttributes([{"for":"registration_certificate_expeditionDate_2"}])
    let expeditionDate_d_flex_input = crearElemento("input","registration_certificate_expeditionDate_2",["form-control"],"","text")
    expeditionDate_d_flex_input.addAttributes([{"placeholder":"MM/YYYY"}])
    expeditionDate_d_flex.addBelow(expeditionDate_d_flex_label.elemento())
    expeditionDate_d_flex.addBelow(expeditionDate_d_flex_input.elemento())
    //Me falta añadirle la funcionalidad para el evento "input"
    return expeditionDate_d_flex 
}
export function create_registration_certificate_dueDate() {
    let dueDate_d_flex = crearElemento("div","",["d-flex","form-line"])
    let dueDate_d_flex_label = crearElemento("label","",["form-label","registration-label"],"Fecha de caducidad")
    dueDate_d_flex_label.addAttributes([{"for":"registration_certificate_dueDate_2"}])
    let dueDate_d_flex_input = crearElemento("input","registration_certificate_dueDate_2",["form-control"],"","text")
    dueDate_d_flex_input.addAttributes([{"placeholder":"MM/YYYY"}])
    dueDate_d_flex.addBelow(dueDate_d_flex_label.elemento())
    dueDate_d_flex.addBelow(dueDate_d_flex_input.elemento())
    //Me falta añadirle la funcionalidad para el evento "input"
    return dueDate_d_flex 
}
export function create_registration_certificate_url() {
    let url_d_flex = crearElemento("div","",["d-flex","form-line"])
    let url_d_flex_label = crearElemento("label","",["form-label","registration-label"],"URL del certificado")
    url_d_flex_label.addAttributes([{"for":"registration_certificate_url_2"}])
    let url_d_flex_input = crearElemento("input","registration_certificate_url_2",["form-control"],"","text")
    url_d_flex_input.addAttributes([{"placeholder":"http://..."}])
    url_d_flex.addBelow(url_d_flex_label.elemento())
    url_d_flex.addBelow(url_d_flex_input.elemento())
    //Me falta añadirle la funcionalidad para el evento "input"
    return url_d_flex 
}