import { Clase } from "./clase";

export class Empleado {
    id: number;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    fechaNacimiento: string;
    dni: string;
    domicilio: string;
    celular: string;
    sexo: string;
    correo: string;
    listaClases: Clase[];
}
