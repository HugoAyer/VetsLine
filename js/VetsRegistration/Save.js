import * as LocalStorage from '../LocalStorage.js'

export function save_vet_registration_specialties(specialty) {
    let specialties = LocalStorage.Get('CurrentSpecialties')
    if(specialties == undefined) specialties =[]
    if(specialties.length > 5) return false //Si ya van 6 propiedades regresa false para no seguir agregado más
    specialties.push(specialty)
    LocalStorage.Save('CurrentSpecialties',specialties)
    
    return true //Regresa true si es que sí logró guardar
}