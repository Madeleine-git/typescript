import { calcularMedia, calcularMediana, filtrarAtipicos } from "./math-utils.js";

const temperaturas: number[] = [22.1, 23.4, 19.8, 45.0, 21.5, 22.8, 1.2, 23.1];

console.log("=== Análisis de temperaturas ===");
console.log("Datos:", temperaturas);
console.log("Media:", calcularMedia(temperaturas));
console.log("Mediana:", calcularMediana(temperaturas));

const media = calcularMedia(temperaturas);
if (media !== null) {
  console.log("Filtrados (límite ±10):", filtrarAtipicos(temperaturas, 10));
}

console.log("\n=== Array vacío ===");
console.log("Media:", calcularMedia([]));
console.log("Mediana:", calcularMediana([]));