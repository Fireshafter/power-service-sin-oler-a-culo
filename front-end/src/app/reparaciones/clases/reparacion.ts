import { Cliente } from './cliente';
import { Dispositivo } from './dispositivo';
import { Servicio } from './servicio';
import { Cambio } from './cambio';

export class Reparacion {
    constructor(
        public orden: Number,
        public estado: String,
        public fechaentrada: Date,
        public ultimaedicion: Date,
        public taller: String,
        public cliente: Cliente,
        public dispositivo: Dispositivo,
        public titulo: String,
        public descripcion: String,
        public costes: Servicio[],
        public log: Cambio[],
        public _id?: Number
        
    ){

    }
}
