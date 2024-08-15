import * as LocalStorage from '../../LocalStorage.js'
import { async_request_put, getCookie} from '../../functions.js';

export function save_acceptance(id){
    let appointments = LocalStorage.Get('Appointments')
    let index = appointments.findIndex(appntmnt => appntmnt.idTransaction == id)        
    appointments[index].status = 'A'    
    LocalStorage.Save('Appointments',appointments)
    console.log('Guardó en LocalStorage')
    async_request_put('acceptAppointment',id,JSON.stringify(appointments),PostUpdateAppointment,PostErrorUpdateAppointment); //Obtiene la información completa del vet
}

const PostUpdateAppointment = (response,params) => {
    console.log('Terminó')
}
const PostErrorUpdateAppointment = (response,params) => {
    console.log(params);
    bootbox.alert('Se ha producido un error al intentar obtener la información');    
}