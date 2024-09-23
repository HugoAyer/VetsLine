export class AppointmentTypeResults {
    /**
     *
     */
    constructor(type) {
        this.type = type,
        this.name = AppointmentTypeResults_name(type),
        this.description = AppointmentTypeResults_description(type),
        this.backColorClass = AppointmentTypeResults_backColorClass(type),
        this.ico = AppointmentTypeResults_ico(type)
    }
}
const AppointmentTypeResults_name = (type) => {
    switch (type){
        case 1:
            return 'videocall'
            break
        case 2:
            return 'following'
            break
        case 3:
            return 'onSite'
    }
}
const AppointmentTypeResults_description = (type) => {
    switch (type){
        case 1:
            return 'videollamada'
            break
        case 2:
            return 'presencial'
            break
        case 3:
            return 'en sitio'
    }

}
const AppointmentTypeResults_backColorClass = (type) => {
    switch (type){
        case 1:
            return 'videocall'
            break
        case 2:
            return 'following'
            break
        case 3:
            return 'onSite'
    }
}
const AppointmentTypeResults_ico = (type) => {
    switch (type){
        case 1:
            return 'fa-video'
            break
        case 2:
            return 'fa-house'
            break
        case 3:
            return 'fa-point'
    }
}