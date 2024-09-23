import {crearElemento} from './factory.js';
import * as LocalStorage from './LocalStorage.js' 
import {get_date_as_day_month} from './functions.js'

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
export function petMobileBtn(pet){
    const main_button = crearElemento('div','',["main-button"])
    const a = crearElemento('a','',["main-pets-pet"])
    a.addAttributes([{"data-bs-toggle":"modal"},{"data-bs-target":"#PetProfile"}])
    const main_button_img = crearElemento('div','',["main-button-img"])
    const img = crearElemento('img','',["img-fluid","rounded-circle"])
    img.addAttributes([{"src":pet.image}])
    main_button_img.addBelow(img.elemento())
    const main_button_icon = crearElemento('div','',["main-button-icon"])
    const main_button_icon_mood_ico = mood_ico(pet.current_mood)    
    main_button_icon.addBelow(main_button_icon_mood_ico.elemento())
    a.addBelow(main_button_img.elemento())
    a.addBelow(main_button_icon.elemento())
    const p_name = crearElemento('p','',[],pet.name)
    main_button.addBelow(a.elemento())
    main_button.addBelow(p_name.elemento())
    return main_button
}
function mood_ico(mood) {    
    switch(mood){
        case 1:
            return crearElemento('i','',["fa-solid","fa-face-smile-wink","text-warning"])
            break
        case 2:
            return crearElemento('i','',["fa-solid","fa-face-sad-cry","text-primary"])
            break
        case 3:
            return crearElemento('i','',["fa-solid","fa-face-tired","text-success"])
            break
        case 4:
            return crearElemento('i','',["fa-solid","fa-face-kiss-wink-heart","text-danger"])
            break
    }
    const ico = crearElemento('i','',[])
}
//Función utilizada en la pantalla principal
export const createGeneralCard = (pet) =>{    
    let Appointment_pet = crearElemento('a','',["Appointment-pet"])
    Appointment_pet.addAttributes([{"data-bs-toggle":"modal"},{"data-bs-target":"#PetProfile"}])
    let Appointment_pet_img = crearElemento('img','',[])
    Appointment_pet_img.addAttributes([{"src": pet.image}])
    let Appointment_pet_text = crearElemento('div','',["Appointment-pet-text"])
    let Appointment_pet_text_span = crearElemento('span','',[],`${pet.name} | ${pet.race}`)
    Appointment_pet_text.addBelow(Appointment_pet_text_span.elemento())
    Appointment_pet.addBelow(Appointment_pet_img.elemento())
    Appointment_pet.addBelow(Appointment_pet_text.elemento())    
    return Appointment_pet
}
export const pet_items = (pet) => {
    let pet_items_div = crearElemento('div','',["pet-items"])
    let pet_items_img = crearElemento('div','',["pet-items-img"])
    let pet_items_img_img = crearElemento('img','',["img-fluid","rounded-circle"])
    pet_items_img_img.addAttributes([{"src":pet.image}])
    pet_items_img.addBelow(pet_items_img_img.elemento())
    let pet_items_title = crearElemento('div','',["pet-items-title"])
    let pet_items_title_h3 = crearElemento('h3','',[],pet.name)
    pet_items_title.addBelow(pet_items_title_h3.elemento())
    pet_items_div.addBelow(pet_items_img.elemento())
    pet_items_div.addBelow(pet_items_title.elemento())
    return pet_items_div
}
export const pet_card_info = (pet) => {
    let pet_card_info_div = crearElemento('div','',["pet-card-info"])
    let pet_card_info_sub = crearElemento('div','',["pet-card-info-sub","pet-card-info-age"])
    let pet_card_info_sub_age = crearElemento('h6','',[],`Edad`)
    let pet_card_info_sub_years = crearElemento('h6','',[],`${pet.age_years} año(s)`)
    pet_card_info_sub.addBelow(pet_card_info_sub_age.elemento())
    pet_card_info_sub.addBelow(pet_card_info_sub_years.elemento())
    let pet_card_info_personality = crearElemento('div','',["pet-card-info-sub","pet-card-info-personality"])
    let pet_card_info_personality_humor = crearElemento('h6','',[],`Humor`)
    let pet_card_info_personality_i = crearElemento('i','',pet.mood.ico)        
    pet_card_info_personality.addBelow(pet_card_info_personality_humor.elemento())
    pet_card_info_personality.addBelow(pet_card_info_personality_i.elemento())
    let pet_card_info_species = crearElemento('div','',["pet-card-info-sub","pet-card-info-age"]) 
    let pet_card_info_species_specie = crearElemento('h6','',[],`Especie`)
    let pet_card_info_species_ico = crearElemento('i','',["fa-solid",pet.species.icon])
    pet_card_info_species.addBelow(pet_card_info_species_specie.elemento())
    pet_card_info_species.addBelow(pet_card_info_species_ico.elemento())
    pet_card_info_div.addBelow(pet_card_info_sub.elemento())
    pet_card_info_div.addBelow(pet_card_info_personality.elemento())
    pet_card_info_div.addBelow(pet_card_info_species.elemento())
    return pet_card_info_div
}
export const pet_card_badges = (badges,badge) => {
    let badges_filtered = badges.filter(element => element.idBadge == badge.idBadge)
    let badge_data = badges_filtered[0]
    let general_accordion_card = crearElemento('div','',["general-accordion-card"])
    let general_accordion_card_bg = crearElemento('div','',["general-accordion-card-bg"])
    let general_accordion_card_bg_img = crearElemento('img','',[])
    general_accordion_card_bg_img.addAttributes([{"src":badge_data.image}])
    let general_accordion_card_small = crearElemento('small','',[],badge_data.description)
    general_accordion_card_bg.addBelow(general_accordion_card_bg_img.elemento())
    general_accordion_card.addBelow(general_accordion_card_bg.elemento())
    general_accordion_card.addBelow(general_accordion_card_small.elemento())
    return general_accordion_card
}
export const pets_card_pet_race = (pet) => {
    let pet_generals_row = crearElemento('div','',["pet-generals-row","row"])
    let pet_generals_row_col_2 = crearElemento('div','',["col-2"])
    let pet_generals_row_col_2_i = crearElemento('i','',["fa-solid","fa-layer-group","text-primary"])
    pet_generals_row_col_2.addBelow(pet_generals_row_col_2_i.elemento())
    let pet_generals_row_col_10 = crearElemento('div','',["col-10"],pet.race)
    pet_generals_row.addBelow(pet_generals_row_col_2.elemento())
    pet_generals_row.addBelow(pet_generals_row_col_10.elemento())
    return pet_generals_row

}
export const pets_card_pet_birth = (pet) => {
    let pet_generals_row = crearElemento('div','',["pet-generals-row","row"])
    let pet_generals_row_col_2 = crearElemento('div','',["col-2"])
    let pet_generals_row_col_2_i = crearElemento('i','',["fa-solid","fa-cake-candles","text-danger"])
    pet_generals_row_col_2.addBelow(pet_generals_row_col_2_i.elemento())
    let pet_generals_row_col_10 = crearElemento('div','',["col-10"],get_date_as_day_month(new Date(pet.birthDate)))
    pet_generals_row.addBelow(pet_generals_row_col_2.elemento())
    pet_generals_row.addBelow(pet_generals_row_col_10.elemento())
    return pet_generals_row

}
export const pets_card_pet_colors = (pet) => {
    let pet_generals_row = crearElemento('div','',["pet-generals-row","row"])
    let pet_generals_row_col_2 = crearElemento('div','',["col-2"])
    let pet_generals_row_col_2_i = crearElemento('i','',["fa-solid","fa-layer-group","text-primary"])
    pet_generals_row_col_2.addBelow(pet_generals_row_col_2_i.elemento())
    let pet_generals_row_col_10 = crearElemento('div','',["col-10"],pet.colors)
    pet_generals_row.addBelow(pet_generals_row_col_2.elemento())
    pet_generals_row.addBelow(pet_generals_row_col_10.elemento())
    return pet_generals_row

}

//Funciones para obtener info
export const pet_get_species = (pet) => {
    let MyPetsCatalog = LocalStorage.Get('MyPetsCatalog')
    let pet_filtered = MyPetsCatalog.filter(element => element.idPet === pet.idPet)
    return pet_filtered[0].species
}