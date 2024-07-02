import {crearElemento} from './factory.js';

export function createCardAppointment(appointment){
    let a = crearElemento("a","",["text-decoration-none"],"","","","");
    let accordion_item = crearElemento("div","",["accordion-item"],"","","","");
    
    a.addAttributes([{"data-bs-toggle":"collapse"},{"data-bs-target":"#collapse" + appointment.idAppointment},{"aria-expanded":"true"},{"aria-controls":"collapse" + appointment.idAppointment}]);

    let row = crearElemento("div","",["row","row-striped"],"","","","");
    let col_1 = crearElemento("div","",["col-2","text-center"],"","","","");
    let col_2 = crearElemento("div","",["col-7"],"","","","");
    let col_3 = crearElemento("div","",["col-2","text-center","py-2"],"","","","");
    let col_4 = crearElemento("div","",["col-1","text-center","py-2"],"","","","");
    
    // Col 1    
    let button_day = crearElemento("button","",["display-4","btn","btn-outline-link","position-relative"],"","button","","Estatus: pendiente");    
    let h3_Col1 = crearElemento("h3","",[],appointment.dayOfMonth,"","","");
    let badge = crearElemento("span","",["position-absolute","top-0","start-100","translate-middle","p-2","bg-warning","border","border-light","rounded-circle"],"","","","");    
    let badge_span = crearElemento("span","",["visually-hidden"],"Hidden","","","");
    badge.addBelow(badge_span.elemento());
    button_day.addBelow(h3_Col1.elemento());  
    button_day.addBelow(badge.elemento());  
            
    
    let h4_Col1 = crearElemento("h4","",[],appointment.monthStr,"","","");
    
    //Col 2
    let h3_col2 = crearElemento("h3","",["text-uppercase"],"","","","");
    let strong_col2 = crearElemento("strong","",[],appointment.subject,"","","");
    let ul_col2 = crearElemento("ul","",["list-inline"],"","","","");
    let li_1_col2 = crearElemento("li","",["list-inline-item"],"","","","");
    let li_1_i_col2 = crearElemento("i","",["fa","fa-calendar-o"]," " + appointment.dayOfWeekStr,"","","");
    li_1_i_col2.addAttributes([{"aria-hidden":"true"}]);
    let li_2_col2 = crearElemento("li","",["list-inline-item"],"","","","");
    let li_2_i_col2 = crearElemento("i","",["fa-solid","fa-clock"],"","","","");    
    let span_col2 = crearElemento("span","",[]," " + appointment.strStartTime + " - " + appointment.strEndTime ,"","","");
    let li_3_col2 = crearElemento("li","",["list-inline-item"],"","","","");
    let span_li3_col2 = crearElemento("span","",[]," " + appointment.vet.name,"","","");
    let li_3_i_col2 = crearElemento("i","",["fa","fa-stethoscope"]," ","","","");    
    let p_col2 = crearElemento("p","",[],appointment.description,"","","");
    let img_col3 = crearElemento("img","",["img-fluid","rounded-circle","mb-3","img-thumbnail","shadow-sm"],"","","","");
    img_col3.addAttributes([{"src":appointment.pet.image}]);
    let span_tags_1 = crearElemento("span","",["badge","bg-soft-secondary","fs-14","mt-1"],"Revisión","","","");
    let span_tags_2 = crearElemento("span","",["badge","bg-soft-secondary","fs-14","mt-1"],"MédicoGeneral","","","");
    let span_tags_3 = crearElemento("span","",["badge","bg-soft-secondary","fs-14","mt-1"],"Monterrey","","","");
    
    col_1.addBelow(button_day.elemento());    
    col_1.addBelow(h4_Col1.elemento());
    
    h3_col2.addBelow(strong_col2.elemento());
    col_2.addBelow(h3_col2.elemento());
    ul_col2.addBelow(li_1_col2.elemento());
    li_2_col2.addBelow(li_2_i_col2.elemento());
    li_2_col2.addBelow(span_col2.elemento());
    ul_col2.addBelow(li_2_col2.elemento());
    li_3_col2.addBelow(li_3_i_col2.elemento());
    li_3_col2.addBelow(span_li3_col2.elemento());
    ul_col2.addBelow(li_3_col2.elemento());
    col_2.addBelow(ul_col2.elemento());
    col_2.addBelow(p_col2.elemento());
    col_3.addBelow(img_col3.elemento());    
    col_4.addBelow(span_tags_1.elemento());
    col_4.addBelow(span_tags_2.elemento());
    col_4.addBelow(span_tags_3.elemento());
    row.addBelow(col_1.elemento());
    row.addBelow(col_2.elemento());
    row.addBelow(col_3.elemento());
    row.addBelow(col_4.elemento());

    a.addBelow(row.elemento());
    accordion_item.addBelow(a.elemento());
    let app_details = AppointmentDetails(appointment);

    accordion_item.addBelow(app_details.elemento());

    return accordion_item.elemento();
}

export function createSmallCardAppointment(appointment,include_image){    
    let a = crearElemento("a","",["text-decoration-none"],"","","","");
    let accordion_item = crearElemento("div","",["accordion-item"],"","","","");
    
    a.addAttributes([{"data-bs-toggle":"collapse"},{"data-bs-target":"#collapse" + appointment.idAppointment},{"aria-expanded":"true"},{"aria-controls":"collapse" + appointment.idAppointment}]);

    let main_div = crearElemento("div","",["candidate-list-box","card","mt-4"],"","","","");
    let card_body = crearElemento("div","",["p-4","card-body"],"","","","");
    let row = crearElemento("div","",["align-items-center","row"],"","","","");
    let col_1 = crearElemento("div","",["col-auto"],"","","","");
    let col_2 = crearElemento("div","",["col-lg-5"],"","","","");
    let col_3 = crearElemento("div","",["col-lg-3"],"","","","");
    let col_4 = crearElemento("div","",["col-lg-2"],"","","","");

    let div_col_1 = crearElemento("div","",["candidate-list-images"],"","","","");
    let a_col_1 = crearElemento("a","",[],"","","","");
    a_col_1.addAttributes([{"href":"#"}]);
//let h3_col_1 = crearElemento("h3","",["display-4"],appointment.dayOfMonth,"","","");
//*********************************************************** */

    let button_day = crearElemento("button","",["display-4","btn","btn-outline-link","position-relative"],"","button","","Estatus: pendiente");    
    let h3_Col1 = crearElemento("h3","",[],appointment.dayOfMonth,"","","");
    let badge = crearElemento("span","",["position-absolute","top-0","start-100","translate-middle","p-2","bg-warning","border","border-light","rounded-circle"],"","","","");    
    let badge_span = crearElemento("span","",["visually-hidden"],"Hidden","","","");
    badge.addBelow(badge_span.elemento());
    button_day.addBelow(h3_Col1.elemento());  
    button_day.addBelow(badge.elemento());  

//*********************************************************** */

    let h4_col_1 = crearElemento("h4","",[],appointment.monthStr,"","","");
    let div_col_2 = crearElemento("div","",["candidate-list-content","mt-3","mt-lg-0"],"","","","");
    let h5_col_2 = crearElemento("h5","",["fs-19","mb-0"],"","","","");
    let a_col_2 = crearElemento("a","",["primary-link"],"","","","");

    a_col_2.addAttributes([{"href":"#"}]);
    let a_h5_col_2 = crearElemento("a","",["primary-link"],"","","","");
    let i_a_h5_col_2 = crearElemento("i","",["fa-solid","fa-video"],"","","","");
    let span_a_h5_col_2 = crearElemento("span","",[]," " + appointment.subject,"","","");
    a_h5_col_2.addBelow(i_a_h5_col_2.elemento());
    a_h5_col_2.addBelow(span_a_h5_col_2.elemento());
    let p_col_2 = crearElemento("p","",["text-muted","mb-2"],"","","","");
    let i_col_2 = crearElemento("i","",["fa-solid","fa-clock"],"","","","");
    let span_col_2 = crearElemento("span","",[]," " + appointment.dayOfWeekStr + " " + appointment.strStartTime + " - " + appointment.strEndTime,"","","");
    let ul_col_2 = crearElemento("ul","",["list-inline","mb-0","text-muted"],"","","","");
    let li_col_2 = crearElemento("li","",["list-inline-item"],"","","","");

    let a_li_col_2 = crearElemento("a","",["text-primary"],"","","","Expediente");
    //a_li_col_2.addAttributes([{"data-bs-toggle":"modal"},{"data-bs-target":"#VetFileModal"}]);
    let i_li_col_2 = crearElemento("i","",["fa-solid","fa-stethoscope"],"","","","");    
    let span_li_col_2 = crearElemento("span","",[]," " + appointment.vet.displayName,"","","");
    let parametersArray = []
    let openModalVet = () => { 
        document.cookie = 'CurrentVetId = ' + appointment.vet.idVet;
        $('#VetFileModal').modal('show')
    }
    a_li_col_2.addEvent('click',openModalVet,parametersArray)

    let row_col_3 = crearElemento("div","",["row","d-flex","align-items-center"],"","","","")
    let col1_row_col_3 = crearElemento("div","",["col-auto"],"","","","")
    let img_col3 = crearElemento("img","",["img-fluid","rounded-circle","mb-3","img-thumbnail","shadow-sm"],"","","","");
    img_col3.addAttributes([{"src":appointment.pet.image}]);
    col1_row_col_3.addBelow(img_col3.elemento())
    let col2_row_col_3 = crearElemento("div","",["col-auto"],"","","","")
    let block_name_img_col3 = crearElemento("div","",["d-block"],"","","","")
    let pet_name_img_col3 = crearElemento("span","",["pet-file-data","p-2"],appointment.pet.name,"","","")
        
    block_name_img_col3.addBelow(pet_name_img_col3.elemento())
    let block_race_img_col3 = crearElemento("div","",["d-block"],"","","","")
    let pet_race_img_col3 = crearElemento("span","",["pet-file-data","p-2"],appointment.pet.race + " ","","","")
    let i_pent_col_3 = crearElemento("i","",["fa-solid","fa-dog"],"","","","")    
    block_race_img_col3.addBelow(pet_race_img_col3.elemento())
    block_race_img_col3.addBelow(i_pent_col_3.elemento())
    let block_age_img_col3 = crearElemento("div","",["d-block"],"","","","")
    let pet_age_img_col3 = crearElemento("span","",["pet-file-data","p-2"],`${appointment.pet.age_years} años`,"","","")
    block_age_img_col3.addBelow(pet_age_img_col3.elemento())

    col2_row_col_3.addBelow(block_name_img_col3.elemento())
    col2_row_col_3.addBelow(block_race_img_col3.elemento())
    col2_row_col_3.addBelow(block_age_img_col3.elemento())

    let div_col_4 = crearElemento("div","",["mt-2","mt-lg-0","d-flex","flex-wrap","align-items-start","gap-1"],"","","","");
    let span_1_col_4 = crearElemento("span","",["badge","bg-soft-secondary","fs-14","mt-1"],"Revisión","","","");
    let span_2_col_4 = crearElemento("span","",["badge","bg-soft-secondary","fs-14","mt-1"],"Médico General","","","");
    let span_3_col_4 = crearElemento("span","",["badge","bg-soft-secondary","fs-14","mt-1"],"Monterrey","","","");
    let div_favorite_col_4 = crearElemento("div","",["favorite-icon"],"","","","");
    let a_col_4 = crearElemento("a","",[],"","","","");
    a_col_4.addAttributes([{"href":"#"}]);
    let i_col_4 = crearElemento("i","",["mdi","mdi-heart","fs-18"],"","","","");
    
    a_col_1.addBelow(button_day.elemento());
    a_col_1.addBelow(h4_col_1.elemento());
    div_col_1.addBelow(a_col_1.elemento());
    col_1.addBelow(div_col_1.elemento());

    a_li_col_2.addBelow(i_li_col_2.elemento());
    a_li_col_2.addBelow(span_li_col_2.elemento());
    li_col_2.addBelow(a_li_col_2.elemento());
    ul_col_2.addBelow(li_col_2.elemento());
    p_col_2.addBelow(i_col_2.elemento());
    p_col_2.addBelow(span_col_2.elemento());
    h5_col_2.addBelow(a_h5_col_2.elemento());
    div_col_2.addBelow(h5_col_2.elemento());
    div_col_2.addBelow(p_col_2.elemento());
    div_col_2.addBelow(ul_col_2.elemento());
    col_2.addBelow(div_col_2.elemento());

    row_col_3.addBelow(col1_row_col_3.elemento())
    row_col_3.addBelow(col2_row_col_3.elemento())    
    col_3.addBelow(row_col_3.elemento());        

    div_col_4.addBelow(span_1_col_4.elemento());
    div_col_4.addBelow(span_2_col_4.elemento());
    div_col_4.addBelow(span_3_col_4.elemento());
    col_4.addBelow(div_col_4.elemento());
    row.addBelow(col_1.elemento());
    row.addBelow(col_2.elemento());
    if(include_image)row.addBelow(col_3.elemento());
    row.addBelow(col_4.elemento());
    a_col_4.addBelow(i_col_4.elemento());
    div_favorite_col_4.addBelow(a_col_4.elemento());
    card_body.addBelow(row.elemento());
    card_body.addBelow(div_favorite_col_4.elemento());

    main_div.addBelow(card_body.elemento());

    a.addBelow(main_div.elemento());
    accordion_item.addBelow(a.elemento());
    let app_details = AppointmentDetails(appointment);

    accordion_item.addBelow(app_details.elemento());

    return accordion_item.elemento();

}

function AppointmentDetails(appointment){
    let div_collapse = crearElemento("div","collapse" + appointment.idAppointment,["accordion-collapse","collapse"],"","","","");
    div_collapse.addAttributes([{"data-bs-parent":"Appointments"}]);
    let accordion_body = crearElemento("div","",["accordion-body","candidate-list-box","card","mt-4"],"","","","");

    let goToAppointment = {
        "value": "cita",
        "desc": "Ver cita"
    };

    let row_link = AppointmentDetailsLink(goToAppointment);

    let acceptance_row = {
        "value": "Notas del doctor:",
        "desc": appointment.acceptedNotes
    };

    let row_1 = AppointmentDetailsRow(acceptance_row);

    let desc_row = {
        "value": "Observaciones del dueño:",
        "desc": appointment.description
    };

    let row_2 = AppointmentDetailsRow(desc_row);

    let hr_1 = crearElemento("hr","",[],"","","","");
    let hr_2 = crearElemento("hr","",[],"","","","");
    
    accordion_body.addBelow(row_link.elemento());
    accordion_body.addBelow(hr_1.elemento());
    accordion_body.addBelow(row_1.elemento());
    accordion_body.addBelow(hr_2.elemento());
    accordion_body.addBelow(row_2.elemento());
    div_collapse.addBelow(accordion_body.elemento());
    return div_collapse;
}

function AppointmentDetailsRow(detail){
    let row = crearElemento("div","",["align-items-center","mt-2","row"],"","","","");

    let col_auto_1 = crearElemento("div","",["col-4"],"","","","");
    let description_title = crearElemento("span","",["pet-file-data","d-block"],detail.value,"","","");    
    
    let col_auto_2 = crearElemento("div","",["col-lg-8"],"","","","");
    let description = crearElemento("span","",["pet-file-value"],detail.desc,"","","");    
    col_auto_1.addBelow(description_title.elemento());    
    col_auto_2.addBelow(description.elemento());    

    row.addBelow(col_auto_1.elemento());
    row.addBelow(col_auto_2.elemento());

    return row;
}

function AppointmentDetailsLink(detail){
    let row = crearElemento("div","",["align-items-center","mt-2","row"],"","","","");

    let col_auto_1 = crearElemento("div","",["col-4"],"","","","");

    let description_title = crearElemento("a","",["pet-file-data","text-primary","d-block"],detail.desc,"","","");    
    description_title.addAttributes([{"data-bs-toggle":"modal"},{"data-bs-target":"#AppointmentModal"}]);
    
    //let col_auto_2 = crearElemento("div","",["col-lg-8"],"","","","");
    //let description = crearElemento("span","",["pet-file-value"],detail.desc,"","","");    
    col_auto_1.addBelow(description_title.elemento());    
    //col_auto_2.addBelow(description.elemento());    

    row.addBelow(col_auto_1.elemento());
    //row.addBelow(col_auto_2.elemento());

    return row;
}