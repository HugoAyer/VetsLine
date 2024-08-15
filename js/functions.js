import {crearElemento} from './factory.js';

export const service = 'http://localhost:7195'
export const url = 'http://127.0.0.1:5500'

export const monthName = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
export const dayOfWeek = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"]
export const dayOfWeekEN = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]

export const states = [{AGU:"Aguascalientes"},{BCN:"Baja California"},{BCS:"Baja California Sur"},{CAM:"Campeche"},{CHP:"Chiapas"},{CHH:"Chihuahua"},{COA:"Coahuila"},{COL:"Colima"},{CMX:"Ciudad de México"},{"DUR":"Durango"},{"GUA":"Guanajuato"},{"GRO":"Guerrero"},{"HID":"Hidalgo"},{"JAL":"Jalisco"},{"MEX":"Estado de México"},{"MIC":"Michoacán"},{"MOR":"Morelos"},{"NAY":"Nayarit"},{"NLE":"Nuevo León"},{"OAX":"Oaxaca"},{"PUE":"Puebla"},{"QUE":"Querétaro"},{"ROO":"Quintana Roo"},{"SLP":"San Luis Potosí"},{"SIN":"Sinaloa"},{"SON":"Sonora"},{"TAB":"Tabasco"},{"TAM":"Tamaulipas"},{"TLA":"Tlaxcala"},{"VER":"Veracruz"},{"YUC":"Yucatán"},{"ZAC":"Zacatecas"}]


//Requests
export function request(endpoint,params,extraParams,callBack,OnError){
    var options = {
        method: "GET",
        mode: "cors",
        cache: "default"
    }

    fetch(`${service}/${endpoint}/${params}`,options)
    .then(response => response.json())
    .then(response => callBack(response,extraParams))
    .catch(error => OnError("Error !", error));
}
export async function async_request(endpoint,params,extraParams,callBack,OnError){
    var options = {
        method: "GET",
        mode: "cors",
        cache: "default"
    }

    fetch(`${service}/${endpoint}/${params}`,options)
    .then(response => response.json())
    .then(response => callBack(response,extraParams))
    .catch(error => OnError("Error !", error));
}
export async function async_request_put(endpoint,params,extraParams,callBack,OnError){
    var options = {
        method: "PUT",
        headers: {
            'Content-type': 'application/json'
        },
        body: extraParams,
        mode: "cors",
        cache: "default"
    }

    fetch(`${service}/${endpoint}`,options)
    //.then(response => response.json())
    .then(response => callBack(response,extraParams))
    .catch(error => OnError("Error !", error));
}
export async function requestPromise(endpoint,params){
    return new Promise(function(resolve,reject) {
        var options = {
            method: "GET",
            mode: "cors",
            cache: "default"
        }

        fetch(`${service}/${endpoint}/${params}`,options)
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject("Error !", error));
    });
}

export function getVetById(id){
    let callBack = function(response,params){                
        if(response.length > 0)
        {
            console.log(response[0]);
        }
    };
    let OnErrorCallBack = function(response,data){        
    };
    request("getVetById",id,null,callBack,OnErrorCallBack);
}
export function getCookie(cookieName) {
    let cookie = {};
    document.cookie.split(';').forEach(function (el) {
        let [key, value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName];
}

export const i_type_appointment = (type) => {
    let ico = ''
    switch (type){
        case 1:
            ico = 'video'
            break
        case 2:
            ico = 'location-dot'
            break
        case 3:
            ico = 'house-user'
    }
    let i = crearElemento("i","",["fa-solid",`fa-${ico}`])

    return i
}

//Funciones de fechas
export const get_date_as_string_short = (d) => {    
    let year = d.getUTCFullYear()
    let month = d.getUTCMonth()
    let day = d.getDate()

    month = `${(month + 1 < 10)? '0' : ''}${month + 1}`
    day = `${(day < 10)? '0' : ''}${day}`
    
    return `${year}-${month}-${day}`
}
export function convert_time_int_fromString(num) {
    let time_span = parseFloat(num.replace(':', ''))
    return time_span
}
export function convert_time_string_fromInt(num) {
    let hours = (num < 60) ? 0 : parseInt(num / 100)
    let minutes = (num < 60) ? num : parseFloat(num - (hours * 100))
    return `${(hours < 10) ? '0' + hours : hours}:${(minutes < 10) ? '0' + minutes : minutes}`
}
export const get_date_as_description = (d) => {
    let weekDay = dayOfWeek[d.getDay()]
    let month = monthName[d.getMonth()]
    let dayOfMonth = d.getDate()
    return `${weekDay} ${dayOfMonth} de ${month}`
}
export const get_am_pm = (time) => {    
    return (time < 1200) ? 'am':'pm'
}

//Otras funciones
export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});