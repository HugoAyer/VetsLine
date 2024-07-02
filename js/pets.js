import {crearElemento} from './factory.js';

export function createBuildPetCard(element){    
    let main_div = crearElemento("div","",["col-xl-3" ,"col-sm-6" ,"mb-5"],"","","","");
    let card_div = crearElemento("div","",["bg-white","rounded","shadow-sm","py-5","px-4"],"","","","");
    let img = crearElemento("img","",["img-fluid","rounded-circle","mb-3","img-thumbnail","shadow-sm"],"","","","");
    img.addAttributes([{"src":element.image}]);
    let h5 = crearElemento("h5","",["mb-0"],"","","","");        
    let pet_ico = crearElemento("i","",["fa-solid","fa-dog"],"","","","");
    h5.addBelow(pet_ico.elemento());
    let pet_name = crearElemento("span","",[]," " + element.name,"","","");
    h5.addBelow(pet_name.elemento());
    let span = crearElemento("span","",["small","text-uppercase","text-muted"],element.race,"","");
    let ul = crearElemento("ul","",["social","mb-0","list-inline","mt-3"],"","","","");
    
    let li_Expediente = crearElemento("li","",["list-inline-item"],"","","","");
    let Expediente = crearElemento("a","",["pet-file","social-link"],"","","","Expediente");
    Expediente.addAttributes([{"href":"#"},{"pet-id":element.idPet}]);
    Expediente.addAttributes([{"data-bs-toggle":"modal"},{"data-bs-target":"#PetsFileModal"}]);
    let li_expediente_ico = crearElemento("li","",["fa-solid","fa-file-medical"],"","","","");
    Expediente.addBelow(li_expediente_ico.elemento());
    li_Expediente.addBelow(Expediente.elemento());

    let li_Citas = crearElemento("li","",["list-inline-item"],"","","","");
    let Citas = crearElemento("a","",["pet-file","social-link"],"","","","Citas");
    Citas.addAttributes([{"href":"#"},{"pet-id":element.idPet}]);
    let li_citas_ico = crearElemento("li","",["fa-solid","fa-calendar-days"],"","","","");
    Citas.addBelow(li_citas_ico.elemento());
    li_Citas.addBelow(Citas.elemento());

    let li_Vacunas = crearElemento("li","",["list-inline-item"],"","","","");
    let Vacunas = crearElemento("a","",["pet-file","social-link"],"","","","Vacunas");
    Vacunas.addAttributes([{"href":"#"},{"pet-id":element.idPet}]);
    let li_vacunas_ico = crearElemento("li","",["fa-solid","fa-syringe"],"","","","");
    Vacunas.addBelow(li_vacunas_ico.elemento());
    li_Vacunas.addBelow(Vacunas.elemento());

    let li_Habits = crearElemento("li","",["list-inline-item"],"","","","");
    let Habits = crearElemento("a","",["pet-file","social-link"],"","","","Hábitos alimenticios");
    Habits.addAttributes([{"href":"#"},{"pet-id":element.idPet}]);
    let li_habits_ico = crearElemento("li","",["fa-solid","fa-utensils"],"","","","");
    Habits.addBelow(li_habits_ico.elemento());
    li_Habits.addBelow(Habits.elemento());

    ul.addBelow(li_Expediente.elemento());
    ul.addBelow(li_Citas.elemento());
    ul.addBelow(li_Vacunas.elemento());
    ul.addBelow(li_Habits.elemento());

    card_div.addBelow(img.elemento());
    card_div.addBelow(h5.elemento());
    card_div.addBelow(span.elemento());
    card_div.addBelow(ul.elemento());
    main_div.addBelow(card_div.elemento());

    return main_div;
}
export const createMiniCard = (pet) => {
    console.log(pet)
    let div = crearElemento("div","",["bg-white","rounded","shadow-sm","py-5","px-4","book-appointment-pet-card","justify-content-center"])
    let div_img = crearElemento("img","",["img-fluid","rounded-circle","mb-3","img-thumbnail","shadow-sm"])
    div_img.addAttributes([{"src":pet.image}])
    let div_h5 = crearElemento("h5","",["mb-0","d-flex","justify-content-center","align-items-center"])
    let div_h5_i = crearElemento("i","",["fa-solid",pet.species.icon,"d-block"])
    let div_h5_name = crearElemento("h5","",["mb-0","d-flex","justify-content-center","align-items-center"])
    let div_h5_name_span = crearElemento("span","",["d-block"],pet.name)
    div_h5_name.addBelow(div_h5_name_span.elemento())

    div_h5.addBelow(div_h5_i.elemento())

    div.addBelow(div_img.elemento())
    div.addBelow(div_h5.elemento())
    div.addBelow(div_h5_name.elemento())

    return div

}
export const createInfo = (pet) => {    
    let div = crearElemento("div","",["book-appointment-pet-card-mini","d-flex","align-items-center"])
    let div_img = crearElemento("img","",["img-fluid","rounded-circle","mb-3","img-thumbnail-smaller","shadow-sm"])
    div_img.addAttributes([{"src":pet.image}])    
    //let div_h5_i = crearElemento("i","",["fa-solid",pet.species.icon,"d-block"])
    let div_h5_name = crearElemento("h3","",["d-flex","align-items-center","appointment-confirm-data"],pet.name)    

    div.addBelow(div_h5_name.elemento())
    div.addBelow(div_img.elemento())
    

    return div

}