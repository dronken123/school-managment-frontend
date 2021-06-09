import { Aula } from "./aula";
import { Curso } from "./curso";
import { Empleado } from "./empleado";

export class Clase {
    id: number;
    nombre: string;
    aula: Aula;
    curso: Curso;
    empleado: Empleado;
}
