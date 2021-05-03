import { Clase } from "./clase";
import { Estudiante } from "./estudiante";

export class Aula {
    id: number;
    nombre: string;
    seccion: string;
    listaEstudiantes: Estudiante[];
    clases: Clase[]; 
}
