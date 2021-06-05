import { Clase } from "./clase";
import { Estudiante } from "./estudiante";
import { Grado } from "./grado";

export class Aula {
    id: number;
    nombre: string;
    seccion: string;
    nivel: string;
    turno: string;
    gradoAula: Grado;
    capacidad: number;
    listaEstudiantes: Estudiante[];
    clasesAula: Clase[]; 
}
