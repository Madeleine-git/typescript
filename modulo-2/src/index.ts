import { Estudiante, Asignatura, EstadoMatricula } from "./domain/types/index.js";
import { generarReporte } from "./domain/reporte.js";

// Datos de prueba
const asignaturas: Asignatura[] = [
  { id: "ASG-001", nombre: "Matemáticas", creditos: 4, docente: "Rubén M." },
  { id: "ASG-002", nombre: "Programación", creditos: 3, docente: "Antonio G." },
];

const estudiante: Estudiante = {
  id: "EST-001",
  nombre: "Madeleine Urrego",
  email: "madeleine@uni.edu",
  carrera: "Ingeniería de Sistemas",
  semestre: 4,
};

// Tres estados posibles
const activa: EstadoMatricula = { tipo: "ACTIVA", asignaturas };
const suspendida: EstadoMatricula = { tipo: "SUSPENDIDA", motivo: "Deuda pendiente" };
const finalizada: EstadoMatricula = { tipo: "FINALIZADA", notaMedia: 4.2 };

console.log("=== Sistema de Gestión Universitaria ===");
console.log(`Estudiante: ${estudiante.nombre} | Carrera: ${estudiante.carrera}`);
console.log("---");
console.log(generarReporte(activa));
console.log(generarReporte(suspendida));
console.log(generarReporte(finalizada));