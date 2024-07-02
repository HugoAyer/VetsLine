export function Save(name,data){
    window.localStorage.setItem(name, JSON.stringify(data));
    return true
}
export function Get(name){    
    let data_str = window.localStorage.getItem(name); //Almaceno las partidas de la recepción en localStorage            
        let data = JSON.parse(data_str);
        return data
}