
export class Asistencia {
    id: number;
    fecha: string;
    estado: string;
    fechaExist: string;

    constructor(){
        this.estado = 'FALTA';
        let f = new Date();
        this.fecha = f.getDate() + '/' + (f.getMonth()+1) + '/' + f.getFullYear();
        this.fechaExist = f.getDate() + '/' + (f.getMonth()+1) + '/' + f.getFullYear();
    }
}
