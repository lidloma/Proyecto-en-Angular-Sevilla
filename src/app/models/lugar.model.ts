export class LugarModel {
    constructor(
        public titulo: string,
        public imagen1: string,
        public imagen2: string,
        public imagen3: string,
        public imagen4: string,
        public descripcion: string,  
        public ubicacion: string,
        public horario: string,
        public historia: string,   
        public precio: string,
        public id?: number,  
        public puntuacion?: number
    ){}
}