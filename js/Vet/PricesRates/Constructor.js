import { crearElemento } from '../../factory.js';
import * as LocalStorage from '../../LocalStorage.js'
import * as Events from './Events.js'

const ListPrices = document.getElementById("ListPrices")

//Constructor
export const Init = () => {
    const PriceRates = LocalStorage.Get('PriceRates')

    PriceRates.forEach((rate) => { //Carga los precios definidos por el Vet
        ListPrices.append(prices_row(rate).elemento())
    }) 
}

export function prices_row(rate){    
    let row = crearElemento("div",`PriceRate_${rate.idPrice}`,["row","p-2","opacity-fade-animation"],"","","","")
    row.addBelow(create_col_add(rate).elemento())
    row.addBelow(create_price_name(rate).elemento())
    row.addBelow(create_price_input(rate).elemento())
    row.addBelow(create_col_select(rate).elemento())
    row.addBelow(create_col_remove(rate.idPrice).elemento())
    
    return row

}
function create_price_name(rate){
    let col_Inputs = crearElemento("div","",["col-2"])
    let col_Inputs_div = crearElemento("div",`priceRate_name_controls_${rate.idPrice}`,["mb-3","form-div-input"])
    let col_Inputs_div_input = crearElemento("input",`price_name_${rate.idPrice}`,["form-control"],"","text","","")
    col_Inputs_div_input.setValue(rate.name)
    let paramsArray = [rate.idPrice,`price_name_${rate.idPrice}`]
    col_Inputs_div_input.addEvent('input',Events.event_name_onChange,paramsArray)
    //col_Inputs_div_input.addAttributes([{"value": rate.name}])
    let col_Inputs_div_input_label = crearElemento("label","",["form-label"],"Nombre")
    col_Inputs_div_input.addAttributes([{"placeholder": "Nombre de la tarifa"}])
    col_Inputs_div_input_label.addAttributes([{"for": `price_name_${rate.idPrice}`}])

    col_Inputs_div.addBelow(col_Inputs_div_input_label.elemento())
    col_Inputs_div.addBelow(col_Inputs_div_input.elemento())
    
    col_Inputs.addBelow(col_Inputs_div.elemento())

    return col_Inputs
}
function create_price_input(rate){
    let col_priceInputs = crearElemento("div","",["col-4"])
    let col_priceInputs_div = crearElemento("div",`priceRate_controls_${rate.idPrice}`,["mb-3","form-div-input"])
    let col_priceInputs_div_input = crearElemento("input",`price_rate_${rate.idPrice}`,["form-control","price_rate","cs-form"],"","text")
    col_priceInputs_div_input.setValue(parseFloat(rate.price))
    let paramsArray = [rate.idPrice,`price_rate_${rate.idPrice}`]
    col_priceInputs_div_input.addEvent('input',Events.event_price_onChange,paramsArray)
    
    let col_priceInputs_div_input_label = crearElemento("label","",["form-label"],"Precio por consulta")
    col_priceInputs_div_input_label.addAttributes([{"for": `price_rate_${rate.idPrice}`}])

    col_priceInputs_div.addBelow(col_priceInputs_div_input_label.elemento())
    col_priceInputs_div.addBelow(col_priceInputs_div_input.elemento())
    
    col_priceInputs.addBelow(col_priceInputs_div.elemento())

    return col_priceInputs
}
function create_col_select(rate){    
    let col_select = crearElemento("div","",["col-auto"])
    let col_priceInputs_div = crearElemento("div",`priceRate_type_controls_${rate.idPrice}`,["mb-3","form-div-input"])
    let col_timeInputs_div_input_start_label = crearElemento("label","",["form-label"],"Tipo de consulta")
    col_timeInputs_div_input_start_label.addAttributes([{"for": `price_type_${rate.idPrice}`}])
    let col_select_control = crearElemento("select",`price_type_${rate.idPrice}`,["form-select"])
    let paramsArray = [rate.idPrice,`price_type_${rate.idPrice}`]
    col_select_control.addEvent('change',Events.event_type_onChange,paramsArray)

    let col_select_control_option_1 = crearElemento("option","",[],"Seleccione un tipo de consulta","","","","0")
    if(rate.type == null) col_select_control_option_1.addAttributes([{"selected":null}])
    let col_select_control_option_2 = crearElemento("option","",[],"Videollamada","","","","1")    
    if(rate.type == 1) col_select_control_option_2.addAttributes([{"selected":null}])
    let col_select_control_option_3 = crearElemento("option","",[],"Cita presencial","","","","2")    
    if(rate.type == 2) col_select_control_option_3.addAttributes([{"selected":null}])
    // let col_select_control_option_4 = crearElemento("option","",[],"Cita a domicilio","","","","3")
    // if(rate.type == 3) col_select_control_option_4.addAttributes([{"selected":null}])    
    
    col_priceInputs_div.addBelow(col_timeInputs_div_input_start_label.elemento())
    col_select_control.addBelow(col_select_control_option_1.elemento())
    col_select_control.addBelow(col_select_control_option_2.elemento())
    col_select_control.addBelow(col_select_control_option_3.elemento())
    // col_select_control.addBelow(col_select_control_option_4.elemento())

    col_priceInputs_div.addBelow(col_select_control.elemento())    
    col_select.addBelow(col_priceInputs_div.elemento())

    return col_select
}
function create_col_remove(idPrice){
    let col_remove = crearElemento("div","",["col-1"])
    let col_remove_div_input_start_label = crearElemento("label","",["form-label"],"Remover")
    col_remove_div_input_start_label.addAttributes([{"for": `remove_${idPrice}`}])
    let col_remove_link = crearElemento("button",`remove_${idPrice}`,["btn","btn-outline-danger","agenda_mini_buttons"],"","button")
    let parametersArray=[idPrice]
    col_remove_link.addEvent('click',Events.event_remove_click,parametersArray)

    let col_remove_link_i = crearElemento("i","",["fa-solid","fa-trash"])
    col_remove_link.addBelow(col_remove_link_i.elemento())
    col_remove_link.addAttributes([{"style":`display:block;`}])
    col_remove.addBelow(col_remove_div_input_start_label.elemento())
    col_remove.addBelow(col_remove_link.elemento())

    return col_remove
}
function create_col_add(rate){
    let col_add = crearElemento("div","",["col-1"])
    let col_add_div_input_start_label = crearElemento("label","",["form-label"],"Añadir")
    col_add_div_input_start_label.addAttributes([{"for": `add_price`}])
    let col_add_link = crearElemento("button",`add_price`,["btn","btn-outline-secondary","agenda_mini_buttons"],"","button")
    let paramsArray = [rate.idPrice,'add_price']
    col_add_link.addEvent('click',Events.event_add_priceRate,paramsArray)

    let col_add_link_i = crearElemento("i","",["fa-solid","fa-plus"])
    col_add_link.addBelow(col_add_link_i.elemento())
    col_add_link.addAttributes([{"style":`display:block;`}])
    col_add.addBelow(col_add_div_input_start_label.elemento())
    col_add.addBelow(col_add_link.elemento())

    return col_add
}
function create_col_dummy(col_width) {
    let col_dummy = crearElemento("div", "", ["col-" + col_width])
    return col_dummy
}

//Events
