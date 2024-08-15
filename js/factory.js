const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export function crearElemento(tipo, id, clases, innerHTML, type, role, tittle,value ) {
    const element = document.createElement(tipo);
    return {
        elemento: function () {
            if (id != "") element.id = id            
            clases.forEach(function (clase) { if (clase != "") element.classList.add(clase) });
            // if (name != undefined && name != "") element.name = name
            if (type != undefined && type != "") element.type = type
            if (role != undefined && role != "") element.role = role
            if (tittle != undefined) if (tittle != "") element.setAttribute("title", tittle);
            if (innerHTML != undefined) if (innerHTML != "") element.innerHTML = innerHTML
            if(value != undefined && value != "") element.value = value
            return element;//Retorna el elemento que ha de insertarse en el DOM
        },
        addBelow: function (son) {//Esta función sirve para añadir nodos hijos
            element.appendChild(son);
        },
        addAttributes: function (attributes) { //Añade todos los atributos que se pasen
            attributes.forEach(function (attribute) {
                element.setAttribute(Object.keys(attribute), Object.values(attribute));
            });
        },
        setValue: function (text) {
            element.value = text;
        },
        setOppacity: function (value) {
            element.style.opacity = value;
        },
        append: function (value) {
            element.append(value);
        },
        onclick: function (value) {
            element.setAttribute("onclick", value);
        },
        hidden: function () {
            element.style.display = "none";
        },        
        disabled: function () {
            element.disabled = true;
        },
        tooltip: function(text) {
            element.setAttribute("data-bs-toggle","tooltip")
            element.setAttribute("data-bs-placement","top")
            element.setAttribute("tittle",text)
        },
        addEvent: function(action,callBack,paramsArray) {
            element.addEventListener(action,function(event) {
                event.preventDefault()
                callBack(paramsArray,event)
            })
        }
    }
}