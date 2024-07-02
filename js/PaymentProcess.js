import { async_request_put, getCookie} from './functions.js';
import * as LocalStorage from './LocalStorage.js'
import {PaymentApplication} from './Models/Payment.js'

const toast_appointments_modal = document.getElementById('toast_appointments_modal')

export async function payment_reception(idTransaction, paymentType, paymentMethod, chargeType, chargeTotal, chargeMethod, dateTime) {    
    let NewAppointment = LocalStorage.Get('NewAppointment')    
    let paymentApplication = new PaymentApplication(idTransaction,paymentType, paymentMethod, chargeType, chargeTotal, chargeMethod, dateTime)

    const promiseRequestPayment = async_request_put('putPayment','',JSON.stringify(paymentApplication),PostPutPayment,PostErrorRequest)
    promiseRequestPayment.then(function(){
        const promiseRequest = async_request_put('putAppointment','',JSON.stringify(NewAppointment),PostPutAppointment,PostErrorRequest); //Obtiene la información completa del vet                 
        promiseRequest.then(function(){            
            let toast = new bootstrap.Toast(toast_appointments_modal)
            toast.show()
            $('#ModalPet').modal('hide');
        })
    })
    
    
}

const PostPutPayment = (response,params) => {
    if(response.status == 200) console.log('Se ha creado el pago')    
}
const PostPutAppointment = (response, params) => {
    if(response.status == 200) $('#VetModal_carousel').carousel('first')
}
const PostErrorRequest = (response, params) => {
    console.log('Se ha producido un error')
}