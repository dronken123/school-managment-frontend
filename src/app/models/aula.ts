import { Grado } from "./grado";
import { Nivel } from "./nivel";

export class Aula {
    id: number;
    nombre: string;
    seccion: string;
    nivel: Nivel;
    turno: Aula;
    gradoAula: Grado;
    capacidad: number;
    cantidadEstudiante: number;
}
