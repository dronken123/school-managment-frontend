import { Aula } from "./aula";

export class Estudiante {
    id: number;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    fechaNacimiento: string;
    dni: string;
    sexo: string;
    correo: string;
    aulaEstudiante: Aula;
}
