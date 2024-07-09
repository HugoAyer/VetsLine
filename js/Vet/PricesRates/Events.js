import * as LocalStorage from '../../LocalStorage.js'
import * as Save from './Save.js'
import {PriceRate} from '../../Models/PriceRate.js'
import {prices_row} from './Constructor.js'

export const event_price_onChange = (parametersArray) => {    
    let idPrice = parametersArray[0]
    let name = parametersArray[1]
    const PriceRates = LocalStorage.Get('PriceRates')

    let price_input = document.getElementById(name)
    if(price_input != ''){
        let index = PriceRates.findIndex((rate) => rate.idPrice == idPrice )
        PriceRates[index].price = parseFloat(price_input.value)
        LocalStorage.Save('PriceRates', PriceRates)   
        Save.save_vet_priceRates(PriceRates)     
    }
}
export const event_name_onChange = (parametersArray) => {
    let idPrice = parametersArray[0]
    let name = parametersArray[1]
    const PriceRates = LocalStorage.Get('PriceRates')

    let name_input = document.getElementById(name)
    if(name_input != ''){
        let index = PriceRates.findIndex((rate) => rate.idPrice == idPrice )        
        PriceRates[index].name = name_input.value
        LocalStorage.Save('PriceRates', PriceRates)   
        Save.save_vet_priceRates(PriceRates)     
    }
}
export const event_type_onChange = (parametersArray) => {    
    let idPrice = parametersArray[0]
    console.log(idPrice)
    let name = parametersArray[1]
    const PriceRates = LocalStorage.Get('PriceRates')

    let type_select = document.getElementById(name)
    if(type_select != ''){        
        let index = PriceRates.findIndex((rate) => rate.idPrice == idPrice )        
        PriceRates[index].type = parseInt(type_select.value)
        LocalStorage.Save('PriceRates', PriceRates)   
        Save.save_vet_priceRates(PriceRates)     
    }
}
export const event_add_priceRate = (parametersArray) => {
    let idPrice = parametersArray[0]
    let name = parametersArray[1]
    let new_price_rate = new PriceRate()

    let ListPrices = document.getElementById("ListPrices")

    const PriceRates = LocalStorage.Get('PriceRates')
    let maxPrice = Math.max.apply(null,PriceRates.map(function(r) {return r.idPrice}))  
    console.log(maxPrice)              
    console.log(1 + maxPrice)
    new_price_rate.idPrice = 1 + maxPrice
    PriceRates.push(new_price_rate)
    LocalStorage.Save('PriceRates', PriceRates)   
    Save.save_vet_priceRates(PriceRates)     
    ListPrices.append(prices_row(new_price_rate).elemento())
}
export const event_remove_click = (parametersArray) => {    
    let idPrice = parametersArray[0]
    let row = document.getElementById(`PriceRate_${idPrice}`)     
            
        const PriceRates = LocalStorage.Get('PriceRates')  
        let index = PriceRates.findIndex((rate) => rate.idPrice == idPrice )
        
        PriceRates.splice(index,1) //Remueve la fila del array                        
        Save.save_vet_priceRates(PriceRates) //Guarda los cambios en la BD        
        LocalStorage.Save('PriceRates', PriceRates) //Guarda los cambios en el array


        row.classList.remove("opacity-fade-animation")
        row.classList.add("opacity-fade-animation-removed") //Inserta la clase para darle el efecto de desvanecer
        setTimeout(() => {
        row.remove() 
        }, 500);        
    
}