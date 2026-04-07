import { EstadoMatricula } from "./types/index.js";

export function generarReporte(estado: EstadoMatricula): string {
  switch (estado.tipo) {
    case "ACTIVA":
      return `Matrícula activa con ${estado.asignaturas.length} asignatura(s) cursando.`;

    case "SUSPENDIDA":
      return `Matrícula suspendida. Motivo: ${estado.motivo}`;

    case "FINALIZADA":
      return `Matrícula finalizada con nota media de ${estado.notaMedia}`;
  }
}
