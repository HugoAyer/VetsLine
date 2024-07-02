import { crearElemento } from '../../factory.js';
import { async_request_put, getCookie,convert_time_int_fromString,convert_time_string_fromInt } from '../../functions.js';
import * as Events from './Events.js'   
import * as LocalStorage from '../../LocalStorage.js'

const LoggedVetId = getCookie('LoggedVetId');
//Constructor
export function scheduler_row_sub(weekDay, row_number, time_start, time_end, enabled, daySettings) {    
    // try {
        const name = `${weekDay.day}_${row_number}`

        let row = crearElemento("div", `${name}_timeSet`, ["row"], "", "", "", "")
        row.addAttributes([{ "name": `availability_${weekDay.day}` }])
        row.addAttributes([{ "row": `${weekDay.day}_${row_number}` }])

        row.addBelow(create_col_check(weekDay, name, enabled).elemento())
        //row.addBelow(create_col_set_icons(name,row_number,weekDay).elemento())
        //row.addBelow(create_col_span(name).elemento())    
        row.addBelow(create_time_inputs(weekDay, name, 'none', time_convert(time_start), time_convert(time_end), row_number).elemento())        
        row.addBelow(create_col_type(weekDay, row_number, 'videocall', 'none', (daySettings != undefined) ? daySettings.videocall : 'N',daySettings).elemento())
        row.addBelow(create_col_type(weekDay, row_number, 'present', 'none', (daySettings != undefined) ? daySettings.present : 'N',daySettings).elemento())
        row.addBelow(create_col_dots(name, weekDay, row_number, 'none').elemento())

        return row
    // }
    // catch (err) {
    //     console.log(err)
    // }
}
export function scheduler_row_sub_details(weekDay, row_number, time_start, time_end, daySettings) {
    const name = `${weekDay.day}_${row_number}`

    let row = crearElemento("div", `${name}_timeSet`, ["row","opacity-fade-animation"], "", "", "", "")
    row.addAttributes([{ "name": `availability_${weekDay.day}` }])
    row.addAttributes([{ "row": `${weekDay.day}_${row_number}` }])

    row.addBelow(create_col_dummy(2).elemento())      
    row.addBelow(create_time_inputs(weekDay, name, 'block', time_start, time_end,row_number).elemento())        
    // row.addBelow(create_col_set_types(weekDay, row_number, 'block', daySettings).elemento())    
    row.addBelow(create_col_type(weekDay, row_number, 'videocall', 'block', (daySettings != undefined) ? daySettings.videocall : 'N',daySettings).elemento())
    row.addBelow(create_col_type(weekDay, row_number, 'present', 'block', (daySettings != undefined) ? daySettings.present : 'N',daySettings).elemento())
    row.addBelow(create_col_dots(name,weekDay,row_number,'block').elemento())

    return row

}
function create_col_check(weekDay, name, enabled) {
    let col_check = crearElemento("div", "", ["col-2"])

    let col_check_form_check = crearElemento("div", "", ["form-check", "form-switch"])
    let col_check_input = crearElemento("input", `availability_${name}`, ["form-check-input"], "", "checkbox")
    let parametersArray = [name,weekDay,1]
    col_check_input.addEvent('change',Events.event_availability_onChange,parametersArray)
    if (enabled == true) col_check_input.addAttributes([{ "checked": null }])
    let col_check_label = crearElemento("label", "", ["form-check-label"], weekDay.dia)

    col_check_label.addAttributes([{ "for": `availability_${name}` }])

    col_check_form_check.addBelow(col_check_input.elemento())
    col_check_form_check.addBelow(col_check_label.elemento())
    col_check.addBelow(col_check_form_check.elemento())

    return col_check
}
function create_time_inputs(weekDay, name, display, time_start, time_end, row_number) {
    let col_timeInputs = crearElemento("div", "", ["col-3", "align-items-center"])
    let col_timeInputs_div = crearElemento("div", `availability_${name}_controls`, ["cs-form", "d-flex", (display == "block") ? "schedule-input-selected" : "tab-noselection"])
    let col_timeInputs_div_input_start = crearElemento("input", `time_start_${name}`, ["form-control"], "", "time", "", "")
    col_timeInputs_div_input_start.addAttributes([{ "name": `time_start_${weekDay.day}` }])
    col_timeInputs_div_input_start.addAttributes([{ "style": `display:${display};` }])
    col_timeInputs_div_input_start.setValue(time_start)
    let parametersArray_start = [`time_start_${name}`, weekDay.day, row_number] //Agrego los parámetros dentro de un array para pasarlos a la función del evento
    col_timeInputs_div_input_start.addEvent('input', Events.event_time_start_onChange, parametersArray_start) //Con esta función extendida puedo agregar el evento de forma facil.

    let col_timeInputs_div_input_end = crearElemento("input", `time_end_${name}`, ["form-control"], "", "time", "", "")
    col_timeInputs_div_input_end.addAttributes([{ "name": `time_end_${weekDay.day}` }])
    col_timeInputs_div_input_end.addAttributes([{ "style": `display:${display};` }])
    col_timeInputs_div_input_end.setValue(time_end)
    let parametersArray_end = [`time_end_${name}`, weekDay.day, row_number] //Agrego los parámetros dentro de un array para pasarlos a la función del evento
    col_timeInputs_div_input_end.addEvent('input', Events.event_time_end_onChange, parametersArray_end) //Con esta función extendida puedo agregar el evento de forma facil.

    col_timeInputs_div.addBelow(col_timeInputs_div_input_start.elemento())
    col_timeInputs_div.addBelow(col_timeInputs_div_input_end.elemento())
    col_timeInputs.addBelow(col_timeInputs_div.elemento())

    return col_timeInputs
}
function create_col_set_types(weekDay, row_number, display, daySettings) {
    let sub_row = crearElemento("div", "", ["col-5", "d-flex","ms-0"])
    let sub_row_cols = crearElemento("div", "", ["col-6", "d-flex","ms-0"])
    sub_row_cols.addBelow(create_col_type(weekDay, row_number, 'videocall', display, (daySettings != undefined) ? daySettings.videocall : 'N',daySettings).elemento())
    sub_row_cols.addBelow(create_col_type(weekDay, row_number, 'present', display, (daySettings != undefined) ? daySettings.present : 'N',daySettings).elemento())
    //sub_row.addBelow(create_col_type(weekDay, row_number, 'onSite', display, (daySettings != undefined) ? daySettings.onSite : 'N',daySettings).elemento())
    sub_row.addBelow(sub_row_cols.elemento())
    sub_row.addAttributes([{ "style": `display:none;` }])

    return sub_row
}
function create_col_type(weekDay, row_number, type, display, checked,daySettings) {
    let sub_row = crearElemento("div", "", ["col-3", "d-flex","ms-0"])
    const name = `${weekDay.day}_${row_number}`
    let col_check = crearElemento("div", "", [""])
    let ico_type = ''
    let color_type = ''
    switch (type) {
        case 'videocall':
            ico_type = 'fa-video'
            color_type = 'warning'
            break
        case 'present':
            ico_type = 'fa-location-dot'
            color_type = 'danger'
            break
        case 'onSite':
            ico_type = 'fa-house-user'
            color_type = 'secondary'
            break
    }
    let accordion_header = crearElemento("div","",["accordion-header","p-2"])
    let col_check_div_input = crearElemento("button", `type_${name}_${type}`, ["btn", `btn${(checked == 'Y') ? '' : '-outline'}-${color_type}`, "type-of-call-button"])
    col_check_div_input.addAttributes([{"data-bs-toggle":"collapse"},{"data-bs-target":`#select_price_${name}_${type}`},{"aria-expanded":`${(checked == 'Y')? 'true' : 'false'}`},{"aria-controls":`select_price_${name}_${type}`}])
    let col_check_div = crearElemento("div", "", ["p-2"])

    let div_accordion = crearElemento("div",`accordion_type_${name}_${type}`,["accordion","accordion-flush"])
    let div_accordion_item = crearElemento("div","",["accordion-item","d-flex"])    
        
    let parametersArray = [`type_${name}_${type}`, weekDay, type, row_number] //Agrego los parámetros dentro de un array para pasarlos a la función del evento
    col_check_div_input.addEvent('click', Events.event_availability_type_click, parametersArray) //Con esta función extendida puedo agregar el evento de forma facil.
    let col_check_input_ico = crearElemento("i", "", ["fa-solid", ico_type])
    col_check_div_input.addAttributes([{ "style": `display:${display};` }])
    col_check_div_input.addBelow(col_check_input_ico.elemento())
    accordion_header.addBelow(col_check_div_input.elemento())

    div_accordion_item.addBelow(accordion_header.elemento())
            
    
    div_accordion_item.addBelow(create_select_price(name,weekDay,type,checked,row_number,daySettings).elemento())
    col_check_div.addBelow(div_accordion_item.elemento())
    col_check.addBelow(col_check_div.elemento())
    sub_row.addBelow(col_check.elemento())

    return sub_row

}
function create_select_price(name,weekDay, type, checked,row_number,daySettings) {
    let hidden_price = crearElemento("div",`select_price_${name}_${type}`,["accordion-collapse","collapse",`${(checked == 'Y') ? 'show': ''}`])
    hidden_price.addAttributes([{"data-bs-parent":`#accordion_type_${name}_${type}`}])
    let accordion_body = crearElemento("div","",["accordion-body","align-items-center","d-flex","cs-form"])
    
    let hidden_price_content = crearElemento("select",`select_control_${name}_${type}`,["form-select","cs-form"])
    let PriceRates = LocalStorage.Get('PriceRates')
    PriceRates.forEach((priceRate) => {
        let option = crearElemento("option","",[],priceRate.name)
        option.setValue(priceRate.idPrice)
        hidden_price_content.addBelow(option.elemento())
    })    
    hidden_price_content.setValue(daySettings[`idPrice_${type}`])
    let parametersArray =[`select_control_${name}_${type}`,weekDay.day,row_number,type]
    hidden_price_content.addEvent('change',Events.event_select_price_onChange,parametersArray)

    accordion_body.addBelow(hidden_price_content.elemento())
    hidden_price.addBelow(accordion_body.elemento())
    return hidden_price
}
function create_col_dummy(col_width) {
    let col_dummy = crearElemento("div", "", ["col-" + col_width])
    return col_dummy
}
function create_col_dots(name,weekDay,row_number,display) {    
    let col_dots = crearElemento("div", "", ["col-1", "d-flex", "align-items-center","p-2"])
    let col_dots_link = crearElemento("button", `options_${name}`, ["btn", "btn-outline-secondary", "agenda_mini_buttons"], "", "button")
    col_dots_link.addAttributes([{"data-bs-toggle":"dropdown"},{"aria-expanded":"false"}])
    let col_dots_link_i = crearElemento("i", "", ["fa-solid", "fa-ellipsis-vertical"])
    col_dots_link.addBelow(col_dots_link_i.elemento())
    col_dots_link.addAttributes([{ "style": `display:${display};` }])
    col_dots.addBelow(col_dots_link.elemento())

    let ul = crearElemento("ul","",["dropdown-menu"])
    let li = crearElemento("li","",[])
    
    let add = crearElemento("button","",["dropdown-item"],"","button")    
    let col_add_link_i = crearElemento("i", "", ["fa-solid", "fa-plus","text-primary"])
    let col_add_link_span = crearElemento("span","",["text-primary"]," Añadir")
    add.addBelow(col_add_link_i.elemento())
    add.addBelow(col_add_link_span.elemento())
    let paramsArray = [weekDay]    
    add.addEvent('click',Events.event_add_click,paramsArray)

    let remove = crearElemento("button","",["dropdown-item"],"","button")    
    let col_remove_link_i = crearElemento("i", "", ["fa-solid", "fa-trash","text-danger"])
    let col_remove_link_span = crearElemento("span","",["text-danger"]," Eliminar")
    remove.addBelow(col_remove_link_i.elemento())
    remove.addBelow(col_remove_link_span.elemento())
    let parametersArray = [name,weekDay,row_number]
    remove.addEvent('click',Events.event_remove_click,parametersArray)

    let copy = crearElemento("button","",["dropdown-item"],"","button")        
    let col_copy_link_i = crearElemento("i", "", ["fa-solid", "fa-copy","text-secondary"])
    let col_copy_link_span = crearElemento("span","",["text-secondary"]," Copiar horarios")
    copy.addBelow(col_copy_link_i.elemento())
    copy.addBelow(col_copy_link_span.elemento())
    let copyParametersArray = [name,weekDay,row_number]
    copy.addEvent('click',Events.event_copy_click,copyParametersArray)

    li.addBelow(add.elemento())
    li.addBelow(copy.elemento())
    li.addBelow(remove.elemento())
    ul.addBelow(li.elemento())
    col_dots.addBelow(ul.elemento())    

    return col_dots
}

//Meta functions
export function time_convert(num) {
    let time_span = parseFloat(num.replace(':', ''))
    let hours = (time_span < 60) ? 0 : parseInt(time_span / 100)
    let minutes = (time_span < 60) ? time_span : parseFloat(time_span - (hours * 100))
    return `${(hours < 10) ? '0' + hours : hours}:${(minutes < 10) ? '0' + minutes : minutes}`
}
