import { Apoderado } from "./apoderado";
import { Aula } from "./aula";
import { Grado } from "./grado";

export class Estudiante {
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
    apoderado: Apoderado;
    aulaEstudiante: Aula;
    grado: Grado;
}
