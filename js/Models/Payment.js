export class PaymentApplication {
    constructor(idTransaction, paymentType, paymentMethod, chargeType, chargeTotal, chargeMethod, dateTime){
        this.idTransaction = idTransaction, //Id único de la transacción. Debe existir también en el objeto que genera el cobro
        this.paymentType = paymentType, //Identificador con número del tipo de pago: 1.- Tarjeta | 2.- Llamada gratis
        this.paymentMethod = paymentMethod, //El objeto de la tarjeta con la que se pagó
        this.chargeType = chargeType, //Identificador con número del tipo de cargo: 1.- Cita | 2.- Contratación de plan
        this.chargeTotal = chargeTotal, //Monto total del cargo
        this.chargeMethod = chargeMethod, //El objeto que generó el cargo
        this.dateTime = dateTime, //Fecha y hora de la transacción
        this.status = 'A' //Estatus del cobro: A.- Aplicado | C.- Cancelado
    }
}