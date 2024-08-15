import {Vet} from './Models/Vet.js'
import {uuidv4,async_request_put} from './functions.js'
import {LoggedVet} from './../index.js'

export const registration_vet = (name, email, password) => {    
    const today = new Date()
    const uuid = uuidv4()
    const newVet = new Vet(uuid,name,email,password,today)
    console.log(newVet)
    async_request_put('putVet','',JSON.stringify(newVet),PostPutVetData,ErrorPutVetData); //Obtiene la información completa del vet
}
export const registration_owner = (name, email, password) => {

}
const PostPutVetData = (response, params) => {
    LoggedVet(JSON.parse(params))
}
const ErrorPutVetData = (response, params) => {
    console.log(response)
}