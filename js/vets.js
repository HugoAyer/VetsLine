import * as LocalStorage from './LocalStorage.js'
import { crearElemento,startsDiv } from './factory.js';

// $(document).ready(function () {
//     Constructor.Init()
// });

export const Appointment_vet = (vet) => {
    let Appointment_vet_div = crearElemento('div','',["Appointment-vet"])
    let Appointment_vet_div_img = crearElemento('img','',[])
    Appointment_vet_div_img.addAttributes([{"src":vet.img_src}])
    let Appointment_vet_text = crearElemento('div','',["Appointment-vet-text"]) 
    let Appointment_vet_text_span = crearElemento('span','',[],vet.displayName)
    let Appointment_vet_text_small = crearElemento('small','',[],vet.titleDesc)
    Appointment_vet_text.addBelow(Appointment_vet_text_span.elemento())
    Appointment_vet_text.addBelow(Appointment_vet_text_small.elemento())
    Appointment_vet_div.addBelow(Appointment_vet_div_img.elemento())
    Appointment_vet_div.addBelow(Appointment_vet_text.elemento())
    return Appointment_vet_div
}