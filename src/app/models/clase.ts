import { Aula } from "./aula";
import { Curso } from "./curso";
import { Empleado } from "./empleado";
import { Frecuencia } from "./frecuencia";

export class Clase {
    id: number;
    aula: Aula;
    curso: Curso;
    empleado: Empleado;
    frecuencias: Frecuencia[];
}
