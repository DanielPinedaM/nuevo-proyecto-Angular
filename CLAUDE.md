# Entorno de Ejecución
Node.js

# Manejador de Paquetes
`pnpm` y `pnpm-lock.yaml`

# Administrador de Versiones para Node.js
`fnm`

# Comandos

## Ejecutar Proyecto

| Comando            | Apunta a ... | Ruta Archivo                                |
| ------------------ | ------------ | ------------------------------------------- |
| `pnpm start:local` | local host   | `src/environments/environment.localhost.ts` |
| `pnpm start:prod`  | producción   | `src/environments/environment.prod.ts`      |
| `pnpm start:test`  | pruebas      | `src/environments/environment.test.ts`      |

## Generar build (dist) para Desplegar

| Comando           | Apunta a ... | Ruta Archivo                           |
| ----------------- | ------------ | -------------------------------------- |
| `pnpm build:test` | pruebas      | `src/environments/environment.test.ts` |
| `pnpm build:prod` | producción   | `src/environments/environment.prod.ts` |

# Reglas Obligatorias para la IA
* No generes análisis, recomendaciones ni comentarios adicionales hasta que empiece a realizar preguntas.

* Todas las respuestas, recomendaciones y fragmentos de código deben respetar obligatoriamente la arquitectura, reglas, patrones y convenciones definidas en este documento.

* No cuestiones, reemplaces, contradigas ni ignores las decisiones de arquitectura definidas en este proyecto.

* Siempre que respondas con código, debes indicar explícitamente la ubicación exacta de cada archivo basándote en la estructura base del proyecto definida en este documento.

* Si existe alguna ambigüedad, falta de contexto o algún aspecto importante de arquitectura, estructura o convenciones que no esté definido, primero debes preguntar antes de asumir una implementación.

* Si durante la conversación recibes instrucciones contradictorias, debes priorizar siempre las reglas y decisiones definidas inicialmente en este documento.

* La arquitectura, reglas y convenciones definidas en este documento tienen prioridad absoluta. Sin embargo, como no todos los casos posibles están documentados, si un problema no puede resolverse respetando la arquitectura actual o requiere una solución no contemplada en el README, primero debes advertir explícitamente que dicha solución se sale de la arquitectura o convenciones establecidas antes de generar una implementación.

# Reglas de Idioma
* Responder siempre en español. Es decir, redactar en español todas las explicaciones, respuestas, preguntas, descripciones, análisis, recomendaciones, documentación y mensajes dirigidos al usuario.

* Mantener en español el razonamiento explicativo que se muestra al usuario para justificar una respuesta o decisión.

* El razonamiento explicativo es generado y mostrado únicamente a criterio de la IA cuando sea necesario para justificar o aclarar una respuesta o decisión. Cuando este razonamiento se muestre al usuario, debe estar redactado en español.

* No traducir términos técnicos de uso común en desarrollo de software (por ejemplo: middleware, service, controller, repository, signal, interceptor, provider, endpoint, payload).

* No traducir nombres de frameworks, librerías, paquetes, APIs ni patrones de diseño.

* Mantener el código, identificadores, nombres de archivos, clases, interfaces, métodos, funciones y variables en inglés.

* Escribir el código en inglés, salvo las excepciones indicadas más abajo.

* Como excepción a la regla anterior, escribir en español los valores de `path` de las rutas definidas en `src/app/app.routes.ts` (por ejemplo, `iniciar-sesion` o `recuperar-clave`). El nombre del archivo y de la clase del componente asociado permanecen en inglés.

# Reglas OBLIGATORIAS para Angular
Este proyecto usa *Angular 22*.

Para CUALQUIER interacción relacionada con Angular —ya sea responder una pregunta del usuario, explicar un concepto, analizar código existente, generar código nuevo o modificar archivos— usa SIEMPRE las tools search_documentation y get_best_practices del MCP server `angular-cli` ANTES de responder o tocar el código. Esto aplica a todo el proceso: antes de contestarle al usuario, antes de analizar código y antes de escribir o modificar cualquier archivo.

**Razón:** Angular tiene breaking changes frecuentes entre versiones, por lo que mi conocimiento interno puede estar desactualizado respecto a Angular 22. El MCP consulta la documentación oficial y las mejores prácticas vigentes en angular.dev, así que prevalece sobre cualquier conocimiento previo que yo tenga.

## Compatibilidad con zone.js
Esta PROHIBIDO:
* Eliminar zone.js del build en `angular.json`

* Eliminar zone.js de los polyfills de build

* Eliminar  zone.js y zone.js/testing de la sección de test

**Razon**: Existen librerías de terceros que dependen de Zone. Sin Zone.js, cualquier callback asíncrono de estas librerías no refrescará la vista automáticamente.

## Usar Angular 22 Moderno, NUNCA Legacy
* Signal-based reactivity

* Signal Forms

* **Signals API**:
  * `signal()`
  * `.set()`
  * `.update()`
  * `computed()`
  * `effect()`
  * `afterRenderEffect()`
  * `linkedSignal`
  * `resource()`

* **Estado global con signals:** Todo estado global o compartido entre componentes debe manejarse con la API de signals de Angular, expuesto desde un servicio singleton `@Service()`. PROHIBIDO usar BehaviorSubject, ReplaySubject, Subject u otros stores basados en RxJS para mantener estado. RxJS queda reservado únicamente para flujos asíncronos de eventos (HTTP, websockets, streams), nunca como contenedor de estado.

* `input()` y `output()` con signals importados desde `import { input, output } from '@angular/core'`

* Standalone Components (no `NgModules`). No es necesario escribir `@Component({standalone: true })` porque ese es el valor por defecto

* Function Interceptors (no class-based interceptors)

* **Control Flow Directives:** `@for`, `@if`, `@switch`, `@case`, `@default` (no `*ngFor`, `*ngIf`, `ngSwitch`)

* Inyección de dependencias con `inject()` (no constructor injection)

- **Servicios singleton:** usar `@Service()` en vez de `@Injectable({providedIn: 'root'})`. `@Service()` es el equivalente moderno y conciso, ya provee la instancia como singleton en root por defecto, sin configuración extra. Reservar `@Injectable` solo para casos avanzados (constructor injection, useClass/useValue/useFactory, scopes distintos a root).
