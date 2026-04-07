// src/domain/types/index.ts

export interface Estudiante {
  readonly id: string;
  nombre: string;
  email: string;
  carrera: string;
  semestre: number;
}

export interface Asignatura {
  readonly id: string;
  nombre: string;
  creditos: number;
  docente: string;
}

export interface MatriculaActiva {
  tipo: "ACTIVA";
  asignaturas: Asignatura[];
}

export interface MatriculaSuspendida {
  tipo: "SUSPENDIDA";
  motivo: string;
}

export interface MatriculaFinalizada {
  tipo: "FINALIZADA";
  notaMedia: number;
}

export type EstadoMatricula = MatriculaActiva | MatriculaSuspendida | MatriculaFinalizada;