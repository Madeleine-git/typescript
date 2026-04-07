# Arquitectura del Sistema de Gestión Universitaria

## Descripción general

Este módulo implementa una capa de modelado de dominio y acceso a datos
para un sistema de gestión universitaria, desarrollado en TypeScript con modo estricto activado. El objetivo es demostrar el uso de patrones de diseño modernos, tipado fuerte y arquitectura limpia aplicada a un contexto real.

## Estructura del proyecto
   
modulo-2/
  src/
    domain/
      types/
        index.ts       → Interfaces y tipos del dominio
      reporte.ts       → Lógica de generación de reportes
    services/
      api-client.ts    → Servicio genérico de acceso a datos
    index.ts           → Punto de entrada y pruebas de integración
  docs/
    arquitectura.md    → Este documento


## Modelado del dominio

### Entidades principales

Las entidades del sistema se modelaron utilizando `interface` en lugar de `type alias`. Esta decisión responde a una razón técnica y arquitectónica: las interfaces están diseñadas para definir contratos estructurales de objetos, permiten extensión mediante `extends` y son la convención estándar en proyectos orientados a objetos con TypeScript.

**Estudiante**
Representa a un estudiante registrado en el sistema. El campo `id` se
declara como `readonly` para garantizar su inmutabilidad tras la creación del objeto, evitando modificaciones accidentales que comprometan la integridad de los datos.

**Asignatura**
Representa una materia ofrecida por la institución. Aplica el mismo
criterio de inmutabilidad en su identificador.

## Patrón de Unión Discriminada — EstadoMatricula

El estado de una matrícula se modeló mediante una **Unión Discriminada**, uno de los patrones más robustos de TypeScript para representar estados mutuamente excluyentes.

En lugar de usar una única interfaz con propiedades opcionales (lo cual
genera ambigüedad y errores silenciosos), se definieron tres interfaces
independientes, cada una con una propiedad literal `tipo` que actúa como
discriminante:

|       Estado         |  Discriminante |    Datos adicionales    |
|----------------------|----------------|-------------------------|
| `MatriculaActiva`    | `"ACTIVA"`   | Array de asignaturas cursando |
| `MatriculaSuspendida`| `"SUSPENDIDA"` | Motivo de la suspensión |
| `MatriculaFinalizada`| `"FINALIZADA"` | Nota media obtenida     |

Este diseño permite al compilador de TypeScript verificar en tiempo de
compilación que todos los estados están cubiertos, eliminando una
categoría completa de bugs en producción.

Se usó `type` para `EstadoMatricula` porque es una unión de interfaces,
que es precisamente el caso de uso para el que los `type aliases` están
diseñados.

## Capa de servicios — Genéricos y abstracción

### RespuestaAPI\<T\>

Todas las respuestas del servidor siguen un contrato uniforme definido
por la interfaz genérica `RespuestaAPI<T>`. El parámetro genérico `T`
permite reutilizar la misma estructura para cualquier tipo de dato sin
sacrificar la seguridad de tipos:

- `RespuestaAPI<Estudiante[]>` → respuesta con lista de estudiantes
- `RespuestaAPI<Asignatura[]>` → respuesta con lista de asignaturas

Este enfoque centraliza el manejo de respuestas, facilita el testing y
garantiza consistencia en toda la aplicación.

### obtenerRecurso\<T\>

El método genérico `obtenerRecurso<T>(endpoint: string): Promise<RespuestaAPI<T>>`
simula llamadas asíncronas a una base de datos mediante `Promise` y
`setTimeout`. Su diseño ofrece tres ventajas clave:

1.**Reutilizable** — funciona para cualquier entidad del sistema con
    un solo método.
2.**Fuertemente tipado** — TypeScript conoce el tipo exacto del dato
   retornado en cada llamada.
3.**Escalable** — puede reemplazarse por llamadas reales a una API REST
   sin modificar el contrato con el resto de la aplicación.

## Conclusión

Este módulo demuestra la aplicación de principios de ingeniería de
software en TypeScript: tipado estricto, separación de responsabilidades,
patrones de diseño probados y código preparado para escalar. Cada
decisión de diseño está motivada por la mantenibilidad y la seguridad
del sistema a largo plazo.