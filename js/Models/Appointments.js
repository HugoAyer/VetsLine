import {get_month_as_desc_from_date,get_dayOfWeek_from_date} from '../functions.js'
export class Appointment {
    constructor(idOwner,idVet, type,fullDate,year,month,startTime,endTime,strStartTime,strEndTime,monthStr,dayOfWeek,dayOfWeekStr,availability){
        this.idOwner = idOwner, //Al inicializar la cita, ya sabré éste dato
        this.idVet = idVet, //Al inicializar la cita, ya sabré éste dato
        this.idPet = -1,        
        this.pet = {},
        this.type = type, //Al inicializar la cita, ya sabré éste dato
        this.fullDate = fullDate,
        this.year = fullDate.getUTCFullYear(),
        this.month = fullDate.getUTCMonth(),
        this.monthStr = get_month_as_desc_from_date(fullDate),
        this.dayOfMonth = fullDate.getDate(),
        this.dayOfWeek = fullDate.getDay(),
        this.dayOfWeekStr = get_dayOfWeek_from_date(fullDate),
        this.createDate = '',
        this.strStartTime = strStartTime,
        this.startTime = startTime,
        this.endTime = endTime,
        this.strEndTime = strEndTime,
        this.subject = '',
        this.Synthom = {},
        this.description = '',
        this.tags = '',
        this.status = 'N',
        this.vetAccepted = 'P',
        this.vetAcceptedTime = '',
        this.vetAcceptedNotes = '',
        this.ownerAccepted = 'P',
        this.ownerAcceptedTime = '',
        this.ownerAcceptedNotes = '',    
        this.availability = availability,
        this.Synthom = null
    }
}
    
