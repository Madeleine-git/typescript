import { Estudiante, Asignatura } from "../domain/types/index.js";

export interface RespuestaAPI<T> {
  codigoEstado: number;
  exito: boolean;
  datos: T;
  errores?: string[];
}

// Base de datos simulada
const estudiantesDB: Estudiante[] = [
  { id: "EST-001", nombre: "Ana Martínez", email: "ana@uni.edu", carrera: "Ingeniería de Sistemas", semestre: 4 },
  { id: "EST-002", nombre: "Carlos López", email: "carlos@uni.edu", carrera: "Matemáticas", semestre: 6 },
];

const asignaturasDB: Asignatura[] = [
  { id: "ASG-001", nombre: "Matemáticas", creditos: 4, docente: "Dr. López" },
  { id: "ASG-002", nombre: "Programación", creditos: 3, docente: "Dra. García" },
];

// Base de datos simulada por endpoint
const baseDatos: Record<string, unknown> = {
  "/estudiantes": estudiantesDB,
  "/asignaturas": asignaturasDB,
};

// Método genérico que recibe un endpoint y devuelve una promesa fuertemente tipada
export function obtenerRecurso<T>(endpoint: string): Promise<RespuestaAPI<T>> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const datos = baseDatos[endpoint];

      if (!datos) {
        reject({
          codigoEstado: 404,
          exito: false,
          datos: null,
          errores: [`Endpoint ${endpoint} no encontrado`],
        });
        return;
      }

      resolve({
        codigoEstado: 200,
        exito: true,
        datos: datos as T,
      });
    }, 500);
  });
}

// Funciones específicas que usan el método genérico
export async function obtenerEstudiantes(): Promise<RespuestaAPI<Estudiante[]>> {
  return obtenerRecurso<Estudiante[]>("/estudiantes");
}

export async function obtenerAsignaturas(): Promise<RespuestaAPI<Asignatura[]>> {
  return obtenerRecurso<Asignatura[]>("/asignaturas");
}