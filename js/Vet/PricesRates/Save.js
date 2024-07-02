import * as LocalStorage from '../../LocalStorage.js'
import { async_request_put, getCookie} from '../../functions.js';

const LoggedVetId = getCookie('LoggedVetId');

//Save
export const save_vet_priceRates = (PriceRates) => { //Esta función sirve para guardar todos los cambios de "Availability"
    let vets = LocalStorage.Get(`VetData_${LoggedVetId}`)    
    vets.price_rates = PriceRates
    LocalStorage.Save(`VetData_${LoggedVetId}`,vets)    
    async_request_put('putVetsById',LoggedVetId,JSON.stringify(vets),PostPutVetData,PostErrorRequest); //Obtiene la información completa del vet
}

const PostPutVetData = (response,params) => {
    var obj_toast_agenda = new bootstrap.Toast(toast_agenda)
            obj_toast_agenda.show()
}
function PostErrorRequest(response,params){
    console.log(params);
    bootbox.alert('Se ha producido un error al intentar obtener la información');    
}