# Especificación técnica para Claude Code — Migración a Angular 22 moderno (estado con signals + interceptors + contrato de respuesta unificado)

## 1. Contexto

- Se trabaja sobre un proyecto Angular **ya existente**, ubicado bajo `C:\Users\User\Documents\nuevo-proyecto-Angular\src`.
- El proyecto debe quedar escrito en **Angular 22 moderno** (APIs y patrones modernos de la versión 22).
- El trabajo se compone de **tres fases consecutivas** (ver sección 4) que deben ejecutarse **en orden**, sin saltarse pasos, sin resumirlos y sin solaparlos.

### 1.1 Motivo de usar el MCP oficial de Angular (regla totalmente obligatoria)

El conocimiento interno del modelo sobre Angular y sobre Claude Code es, en gran parte, **incorrecto u obsoleto**, porque Angular introduce numerosos *breaking changes* entre versiones. Por ese motivo, **todo el código debe basarse exclusivamente en la documentación oficial de Angular servida por su MCP**, y nunca en el conocimiento interno del modelo ni en otras fuentes.

---

## 2. Reglas globales obligatorias

Estas reglas aplican a **toda** la tarea, en **todas** sus fases y en **todos** los turnos.

1. **Fuente de verdad única (OBLIGATORIO).** Claude Code debe conectarse al MCP de la documentación oficial de Angular disponible en `https://angular.dev/ai/mcp`. No está permitido basarse en ninguna otra fuente.
2. **Versión de referencia.** Todo el código escrito debe basarse en el MCP de **Angular 22** de la documentación oficial.
3. **Angular 22 moderno.** Usar las APIs y patrones modernos de Angular 22.
4. **Tipado estricto (OBLIGATORIO).** Usar siempre tipos estrictos. Está **prohibido** usar `any`. Antes de crear un tipo o interfaz nuevos, verificar si Angular ya provee un tipo que represente exactamente los mismos datos o las mismas propiedades (keys); si existe, reutilizarlo en lugar de crear uno nuevo. Solo cuando se necesiten propiedades adicionales, usar `extends` sobre el tipo existente para evitar duplicación.
5. **Prohibido propagar errores desde los interceptors.** Está **prohibido** que dentro de los interceptors se propague el error con `throw new Error()`.
6. **Uso explícito y verificable del MCP en cada afirmación (OBLIGATORIO).** No basta con que el MCP esté conectado al inicio de la sesión. Para **cada** afirmación sobre una API, sintaxis, patrón o buena práctica de Angular, y **antes** de escribir el código correspondiente, se debe:
   - Invocar explícitamente la herramienta del MCP que corresponda (`search_documentation`, `get_best_practices`, `find_examples`, `list_projects`, según el caso).
   - Mostrar evidencia de esa invocación: el **nombre exacto de la tool** llamada y el **fragmento textual** que devolvió, antes de basar el código en esa información.
   - Si una respuesta sobre Angular **no** muestra una invocación de tool con su resultado, esa respuesta se considera **no verificada** y se debe repetir la consulta usando el MCP antes de continuar.
   - Esta verificación se exige en **cada turno y en cada fase**, no solo una vez al comienzo: no se debe asumir que, por haber consultado el MCP en un paso anterior, ya no es necesario volver a consultarlo para preguntas de seguimiento dentro de la misma fase o en fases posteriores.
7. **Responsabilidad única.** Cada interceptor y cada service tiene una **única responsabilidad**.

---

## 3. Estructura obligatoria de archivos y carpetas

Esta estructura es **totalmente obligatoria**: no se debe omitir, modificar ni eliminar ningún archivo ni carpeta. Es la **única fuente de verdad** sobre dónde vive cada archivo nuevo.

```txt
src/
└── shared/
    └── http-response/
        ├── interceptors/
        │   ├── error.interceptor.ts
        │   ├── success.interceptor.ts
        │   └── timeout.interceptor.ts
        │
        ├── services/
        │   ├── api-response-normalizer.service.ts
        │   └── http-log.service.ts
        │
        └── loader/
            ├── design/
            │   └── ui/
            │       └── fixed-loader/url
            │           ├── fixed-loader.component.ts
            │           └── fixed-loader.component.html
            │
            ├── interceptors/
            │   └── loader.interceptor.ts
            │
            └── services/
                └── stores/
                    └── loader.store.ts
```


Ubicación de cada archivo y la fase en la que se crea/mueve:

- `src/shared/http-response/interceptors/error.interceptor.ts` → `errorInterceptor` (se crea en Fase 2).
- `src/shared/http-response/interceptors/success.interceptor.ts` → `successInterceptor` (se crea en Fase 2).
- `src/shared/http-response/interceptors/timeout.interceptor.ts` → `timeoutInterceptor` (se crea en Fase 2).
- `src/shared/services/api-response-normalizer.service.ts` → `ApiResponseNormalizerService` (se crea en Fase 2).
- `src/shared/services/http-log.service.ts` → `http-log.service` (se crea en Fase 2).
- `src/shared/loader/design/ui/fixed-loader/fixed-loader.component.ts` y `.html` → componente del loader (se **mueve** en Fase 1).
- `src/shared/loader/interceptors/loader.interceptor.ts` → `loaderInterceptor` (se crea en Fase 2).
- `src/shared/loader/services/stores/loader.store.ts` → `loader.store` (se **mueve** y se **migra a signals** en Fase 1).

---

## 4. Objetivos generales — las tres fases

El trabajo se realiza en tres fases, en este orden:

1. **Fase 1 — Migrar el estado del loader a signals.**
2. **Fase 2 — Migrar la lógica del gateway HTTP a interceptors separados** y a la lógica global equivalente recomendada por la documentación oficial de Angular.
3. **Fase 3 — Eliminar `GatewayApiService` y migrar todos sus consumidores** a `HttpClient` directo con observables de Angular y `async/await` con `firstValueFrom` de RxJS.

---

## 5. Lectura previa del código existente (antes de modificar nada)

Antes de modificar nada, **leer el código que ya existe** en:

`C:\Users\User\Documents\nuevo-proyecto-Angular\src\shared\services\api\http-client`

De esa carpeta se **adaptará** lógica en fases posteriores (en particular de `gateway-helper.service.ts` y de `http-gateway-observable.api.ts`). Esta lectura es obligatoria para conocer el comportamiento actual antes de reescribir su equivalente.

---

## 6. Fase 1 — Migrar `loader.store.ts` a signals

Esta es la **primera** acción que debe realizarse.

### 6.1 Mover los archivos del loader a la nueva estructura

- Mover el componente de `C:\Users\User\Documents\nuevo-proyecto-Angular\src\shared\design\ui\fixed-loader` a `C:\Users\User\Documents\nuevo-proyecto-Angular\src\shared\loader\design\ui\fixed-loader` (con sus archivos `fixed-loader.component.ts` y `fixed-loader.component.html`).
- Mover el store de `C:\Users\User\Documents\nuevo-proyecto-Angular\src\shared\services\stores\loader.store.ts` a `C:\Users\User\Documents\nuevo-proyecto-Angular\src\shared\loader\services\stores\loader.store.ts`.

### 6.2 Migrar `loader.store.ts` a signals

- `loader.store.ts` es un **estado global** para ocultar y mostrar el icono de "cargando".
- Usar la herramienta **`modernize`** del MCP de Angular para migrar el archivo `loader.store.ts` a **signals**.
- **En todo el proyecto, lo único que se debe migrar a signals es `loader.store.ts`. No migrar ninguna otra cosa.**

### 6.3 Métodos que debe contener `loader.store.ts`

Tras la migración, `loader.store.ts` debe exponer exactamente estos tres miembros:

- **`getLoader`**: devuelve el **booleano** con el estado actual del loader, para determinar si se oculta o se muestra el loader.
- **`showLoader`**: método para **mostrar** el loader.
- **`hideLoader`**: método para **ocultar** el loader.

Aclaración sobre la relación entre `getLoader` y `loader`: el estado vivo del loader pasa a ser un **signal interno** del store. `getLoader` es el **acceso de lectura** a ese estado (devuelve el booleano actual), mientras que `showLoader` y `hideLoader` son los **únicos** métodos que mutan ese estado. Tras la migración **no debe existir ni manipularse una propiedad suelta `loader`** fuera del store: cualquier lectura del estado se hace con `getLoader`, y cualquier cambio se hace con `showLoader` / `hideLoader`.

### 6.4 Actualizar `app.component.ts` y `app.component.html`

- En `C:\Users\User\Documents\nuevo-proyecto-Angular\src\app\app.component.ts` y `C:\Users\User\Documents\nuevo-proyecto-Angular\src\app\app.component.html`, migrar a **signals** la lógica del método `getLoader`.
- Donde antes el componente manipulaba el estado directamente (por ejemplo `this.loader.set(false)`), ahora debe hacerlo a través del **estado global** del store: lectura con `getLoader` y ocultar con `hideLoader()`.
- La lógica del `setTimeout` que hoy vive en `app.component.ts` (la que oculta el icono de cargando y muestra una advertencia) **no se queda aquí**: se **traslada al `timeoutInterceptor`** en la Fase 2 (ver sección 7.8). En Fase 1 solo se migra a signals la lógica de `getLoader`; el bloque `setTimeout` se relocaliza en Fase 2 para que no se pierda.

---

## 7. Fase 2 — Migrar la lógica del gateway HTTP a interceptors separados

### 7.1 Reglas de la fase

- **Después** de la Fase 1, migrar la lógica existente que está en `C:\Users\User\Documents\nuevo-proyecto-Angular\src\shared\services\api\http-client` a **interceptors separados** y a la **lógica global equivalente recomendada por la documentación oficial de Angular**.
- El método `executeRequest` de `http-gateway-observable.api.ts` **ya NO se usa** para controlar la lógica que llama a la API.
- **No eliminar** el código que está en `C:\Users\User\Documents\nuevo-proyecto-Angular\src\shared\services\api\http-client`. (La eliminación de la Fase 3 aplica únicamente a los **usos e imports** de `GatewayApiService` en archivos **fuera** de esa carpeta; la **definición** del servicio permanece dentro de la carpeta. Ver sección 8.)
- **Mecanismo de reutilización.** Como está prohibido eliminar el código de `http-client`, "reutilizar la lógica" significa **adaptar/replicar** la lógica necesaria **dentro de los nuevos archivos** de `src/shared/...`. **No** se debe importar ni invocar `gateway-helper.service.ts` desde los nuevos interceptors/services: la lógica original permanece en su carpeta, pero su equivalente se **reescribe adaptado** en el nuevo destino.

### 7.2 Inventario de componentes a crear en esta fase

Cuatro interceptors y dos services (el store ya quedó migrado en la Fase 1):

- `loader.interceptor.ts` (loader).
- `error.interceptor.ts` (`errorInterceptor`: errores generales/globales + normalización de la respuesta errónea).
- `success.interceptor.ts` (`successInterceptor`: normalización de la respuesta exitosa).
- `timeout.interceptor.ts` (`timeoutInterceptor`: timeout de 1 minuto).
- `api-response-normalizer.service.ts` (`ApiResponseNormalizerService`: validación + normalización del contrato).
- `http-log.service.ts` (logging por consola).

### 7.3 `loader.interceptor.ts` (control del icono de carga)

- Controla el icono de carga (loader) que tiene `position: fixed` de Tailwind en el componente `fixed-loader`.
- Debe usar un **contador** (incrementar al entrar una petición, decrementar al salir) **en vez de un booleano**, para que **dos peticiones solapadas no apaguen el loader antes de tiempo**. Mientras el contador sea mayor que cero, el loader permanece visible; cuando el contador vuelve a cero, el loader se oculta.
- Como ese icono **bloquea toda la UI**, debe **permitir desactivar el icono de loader** desde el propio `loaderInterceptor` mediante **`HttpContext`**, usando como "llave" para guardar ese dato un **`HttpContextToken`**. Así, una petición concreta puede solicitar que no se muestre el loader.
- El mostrar/ocultar real se hace a través del store de signals (`showLoader` / `hideLoader`), nunca manipulando un booleano suelto.

### 7.4 `http-log.service.ts` (logging por consola)

- Imprime por consola los logs de las peticiones HTTP.
- Debe **permitir desactivar los logs** desde el propio `http-log.service.ts` mediante **`HttpContext`**, usando como "llave" para guardar ese dato un **`HttpContextToken`** (un token **distinto** al del loader).

Dentro de `http-log.service.ts` deben existir los siguientes métodos:

- **`successLogs`**: imprime los logs cuando la petición es **exitosa**. `successLogs` debe llamarse en `success.interceptor.ts`.
- **`errorLogs`**: imprime los logs cuando la petición da **error**. Al final imprime:
  `console.error(`las variables de entorno estan apuntando al ambiente de ➡️ ${environment.NODE_ENV} ⬅️`)`.
  `errorLogs` debe llamarse en `error.interceptor.ts`.
- **`timeoutLogs`**: imprime los logs **después** de detener la petición HTTP por el timeout de 1 minuto. `timeoutLogs` debe llamarse en `timeout.interceptor.ts`.
- **`transformResponseToLogger`**: método para **transformar** la respuesta de las API y que luego se imprima en los logs. Se **reutiliza** en `successLogs`, `errorLogs` y `timeoutLogs`. Debe **adaptar la lógica** que ya existe en el método `successLogs` de `C:\Users\User\Documents\nuevo-proyecto-Angular\src\shared\services\api\http-client\gateway-helper.service.ts`. **`transformResponseToLogger` solamente retorna el objeto literal; no imprime nada por consola**: ese objeto luego es impreso por `successLogs`, `errorLogs` y `timeoutLogs`.

El objetivo de `transformResponseToLogger` es retornar un objeto literal con este tipo (tipar de forma **estricta**, sin `any`; confirmar con el MCP de Angular los tipos exactos de `params` y `headers` —por ejemplo, los tipos de `HttpParams` / `HttpHeaders`— ya que en el contrato original quedaron sin tipo):

```ts
{
  success: boolean;
  status: number;
  message: string;
  data: string;
  body: string;
  params?: /* tipo estricto confirmado vía MCP */;
  headers?: /* tipo estricto confirmado vía MCP */;
  responseType?: /* tipo estricto confirmado vía MCP */;
}
```

**Reglas de resumen para `body` y `data`.** Corregir y adaptar la lógica existente para que funcione **tanto para `body` como para `data`** en el objeto que retorna `transformResponseToLogger`. El objetivo es **NO imprimir el `body` ni el `data` completos**, sino imprimir un **resumen** según corresponda:

- `null` cuando no exista `body` o `data` (según corresponda).
- array vacío.
- array de objetos con `.length` elementos.
- array de `.length` elementos.
- objeto literal vacío.
- objeto literal con `.length` keys.

Lógica de referencia a adaptar (actualmente está escrita solo para `data`; debe quedar parametrizada para resumir **de la misma forma** el `body` y el `data`):

```ts
if (response) {
  let { success, status, message, data } = response;

  if (data) {
    if (Array.isArray(data)) {
      if (data.length === 0) {
        data = 'array vacío ➡️ (0) []';
      } else {
        // data es un array de objetos [{}]
        const areAllObjects: boolean = data?.every(
          (item) => typeof item === 'object' && item && item !== null,
        );
        if (areAllObjects) {
          data = `array de objetos con ${data.length} elemento ➡️ (${data.length}) [{}]`;
        } else {
          // data es un array []
          data = `array de ${data.length} elementos ➡️ (${data.length}) []`;
        }
      }
    } else if (this.dataTypeClass.isLiteralObject(data)) {
      // data es un objeto literal {}
      const length: number | null =
        this.dataTypeClass.literalObjectLength(data);

      if (length === 0) {
        data = 'objeto literal vacío ➡️ (0) {}';
      } else {
        data = `objeto literal con ${length} keys ➡️ (${length}) {}`;
      }
    }
  }

  const objectSuccesResponse: IResponse = {
    success,
    status,
    message,
    data,
  };
}
```

Al adaptarla: aplicar el **mismo resumen** al `body`, hacer que el valor de retorno sea el objeto literal del tipo indicado más arriba (incluyendo `body`, `params`, `headers` y `responseType`), y reescribir/adaptar las utilidades de las que depende (`isLiteralObject`, `literalObjectLength`) dentro del nuevo destino, ya que no se debe importar el service original.

### 7.5 `api-response-normalizer.service.ts` (validación y normalización del contrato)

- `api-response-normalizer.service.ts` es el **intermediario** que se llama **tanto en `successInterceptor` como en `errorInterceptor`** para **validar y normalizar** las respuestas HTTP **sin repetir código** entre ambos interceptors. Está **prohibido** repetir la misma lógica de normalización de respuestas de APIs en `successInterceptor` y en `errorInterceptor`.
- `api-response-normalizer.service.ts` tiene que **retornar siempre** un objeto literal de tipo `IResponse<T>`. Se encarga de la lógica para que **todos** los consumos de **todas** las APIs se **normalicen** y respondan **SIEMPRE** con este tipo:

```ts
{
  success: boolean;
  status: number;
  message: string;
  data: T;
}
```

Es decir, **SIEMPRE** se debe poder acceder a **todas** las keys: `success`, `status`, `message`, `data`.

Para lograrlo se deben cumplir **estas dos condiciones**:

1. **Runtime:** que la respuesta se **envuelva** en `IResponse<T>` cuando la app corre de verdad.
2. **Tipo:** que **TypeScript sepa** que la respuesta viene envuelta (la verificación que hace el editor/compilador antes de ejecutar).

#### Los dos casos que valida `ApiResponseNormalizerService`

**Caso 1 — la API SÍ responde con el contrato `IResponse<T>`:**

- Validar que la respuesta tenga **exactamente** todas estas keys: `success`, `status`, `message`, `data`.
- Validar los **tipos de datos** de los values de las keys usando:
  - `typeof success === 'boolean'`
  - `typeof status === 'number'`
  - `typeof message === 'string'`
  - En el caso de `data`, **NO** se debe validar un tipo de dato; solamente se debe validar que la key `data` **exista**, debido a que `data` es de tipo `<T>`.
- Son **dos validaciones diferentes y ambas obligatorias**: (a) que las keys existan y (b) que los tipos de datos de los values de las keys sean los correctos. Se deben hacer **las dos**, no solo una.
- Como la API **sí** cumple el contrato, **retornar la respuesta exactamente como ya está, SIN modificar la respuesta**.

**Caso 2 — la API NO responde con el contrato `IResponse<T>`:**

- Se debe **normalizar tanto la respuesta errónea como la exitosa** para que cumplan con el contrato `IResponse<T>` (envolverlas de modo que queden disponibles `success`, `status`, `message`, `data`).

> Recordatorio de regla global: está **prohibido** que en los interceptors se propague el error con `throw new Error()` (ver sección 2).

### 7.6 `error.interceptor.ts` (`errorInterceptor`)

- Encargado de la **normalización de respuestas HTTP erróneas** al contrato `IResponse<T>`, **delegando** esa validación/normalización en `api-response-normalizer.service.ts` (no repetir esa lógica aquí).
- Contiene acciones de **errores generales/globales**; **NO** contiene lógica de negocio específica de features/dominios.
- Debe **adaptar la misma lógica** que ya existe en el método `errorHandling` de `C:\Users\User\Documents\nuevo-proyecto-Angular\src\shared\services\api\http-client\gateway-helper.service.ts` (adaptándola al nuevo archivo, **sin importar** el service original).
- Debe llamar a **`errorLogs`** de `http-log.service.ts`.
- **Prohibido** propagar el error con `throw new Error()`.

### 7.7 `success.interceptor.ts` (`successInterceptor`)

- Encargado de la **normalización de respuestas HTTP exitosas** al contrato `IResponse<T>`, **delegando** esa validación/normalización en `api-response-normalizer.service.ts` (no repetir esa lógica aquí).
- Debe llamar a **`successLogs`** de `http-log.service.ts`.

### 7.8 `timeout.interceptor.ts` (`timeoutInterceptor`)

- Aplica un **tiempo máximo de expiración de 1 minuto** a cada petición HTTP.
- Cuando se cumple **1 minuto** sin respuesta, el interceptor debe:
  1. **Abortar** la petición HTTP.
  2. **Ocultar** el icono de loader a través del **estado global** de `loader.store.ts`, usando `hideLoader()` (recuérdese que en la Fase 1 `loader.store.ts` ya quedó migrado a signals).
  3. Imprimir `console.error("Se ha detenido la peticion HTTP porque ha demorado mas de un minuto en responder")`.
  4. Imprimir un **objeto literal** con el detalle de la petición HTTP detenida, con **exactamente** estas keys (tomadas del `HttpRequest`):
     - `url`
     - `method` (método HTTP)
     - `body`
     - `headers`
     - `urlQueryParams` (los query params de la URL)
     - `responseType`
  5. Llamar a **`timeoutLogs`** de `http-log.service.ts`.
- Debe **mover a este interceptor** la siguiente lógica que actualmente se encuentra en `C:\Users\User\Documents\nuevo-proyecto-Angular\src\app\app.component.ts`, cuyo fin original es **ocultar el icono de cargando y mostrar un mensaje de advertencia**:

  ```ts
  if (loader) {
    const milliseconds = 120000;

    setTimeout(() => {
      this.loader.set(false);

      console.warn(
        `⚠️ se oculto el icono de cargando despues de ${
          milliseconds / 120000
        } minutos porque una peticion HTTP tardo en responder`,
      );
    }, milliseconds);
  }
  ```

- **Adaptaciones obligatorias al moverla:**
  - El temporizador debe durar **1 minuto** (`60000` ms). Corregir el cálculo del mensaje para que refleje correctamente los minutos (con `60000` ms, `milliseconds / 60000` da `1`, es decir, "1 minuto").
  - Implementar el timeout con el **patrón moderno recomendado por la documentación oficial de Angular/RxJS** (verificado vía MCP), en lugar del `setTimeout` manual.
  - Ocultar el loader con `hideLoader()` del store de signals, **no** con `this.loader.set(false)`.
  - El `console.warn` original queda **reemplazado** por el `console.error` requerido en el punto 3 (ambos notifican el mismo evento de timeout a 1 minuto), conservando el comportamiento de ocultar el loader.
  - Integrar además las acciones nuevas del listado anterior: abortar la petición, imprimir el objeto literal de detalle y llamar a `timeoutLogs`.
- Al llegar a este paso, **ya se debe haber convertido a signals** el archivo `loader.store.ts` (ver Fase 1), y el icono de cargando se oculta exclusivamente mediante ese **estado global**.

### 7.9 Requisito obligatorio de separación entre `errorInterceptor` y `successInterceptor`

- **OBLIGATORIO:** separar `errorInterceptor` y `successInterceptor`, cada uno con **responsabilidad única**, de modo que:
  - el **error no se propague a los consumidores**, y
  - el **tipo de la respuesta sea siempre** el contrato `IResponse<T>` (`{ success, status, message, data }`).
- **No existe** ningún `responseInterceptor` que valide a la vez la respuesta errónea y la exitosa. Solo existen `errorInterceptor` (errores), `successInterceptor` (éxitos) y `timeoutInterceptor` (timeout). La validación y normalización del contrato la ejecuta **`ApiResponseNormalizerService`**, al que **ambos** interceptors (`errorInterceptor` y `successInterceptor`) **delegan** para no duplicar código.

### 7.10 Arquitectura elegida — envelope ("el error se traga")

**Aclaración:** para esta arquitectura se escoge la opción de que **todo está envuelto en `IResponse<T>`** y **"el error se traga"**.

Se elige específicamente el siguiente enfoque (**"Caso interceptor"**): lo que envuelve la respuesta es el **interceptor**, que **corre siempre, solo**. El consumidor **no tiene que llamar a nada**. Lo único que el consumidor podría olvidar es la **anotación de tipo**:

```ts
getUser(id: string) {
  return this.http.get<User>(`/api/users/${id}`); // me olvidé de poner IResponse<T>
}
```

- **Runtime:** la respuesta **igual se envuelve**, porque el interceptor **no depende** del consumidor. Todo funciona bien de verdad.
- **El "error":** solo el **tipo** quedó mal (dice `User` cuando en realidad llega `IResponse<User>`). Esto **salta al instante**: al intentar leer `res.data.name`, TypeScript marca en rojo *"Property 'data' does not exist on type 'User'"*. Se ve en el editor, **antes de correr nada**.

### 7.11 Ejemplo de consumo en plantilla (conservar tal cual)

```html
@if (userRes.isLoading()) { <spinner /> }
@else if (!userRes.value()?.success) { <p>No se pudo cargar</p> }  <!-- chequeás el flag -->
@else { <p>{{ userRes.value()?.data?.name }}</p> }                 <!-- value() es IResponse<User> → ?.data?.name -->
```

---

## 8. Fase 3 — Eliminar `GatewayApiService` y migrar los consumidores a `HttpClient` directo

### 8.1 Eliminaciones tras la refactorización

Al terminar la refactorización, **eliminar de los archivos consumidores** (los que están **fuera** de la carpeta `http-client`):

```ts
http = inject(GatewayApiService);
```

```ts
import { GatewayApiService } from '@/shared/services/api/http-client/http-gateway-observable.api';
```

**Importante:** la prohibición de "no eliminar código en `http-client`" aplica a la **definición** de `GatewayApiService`, que **permanece** dentro de `C:\Users\User\Documents\nuevo-proyecto-Angular\src\shared\services\api\http-client`. Lo que se elimina son únicamente los **usos** (`inject(GatewayApiService)`) y los **imports** de ese service en los archivos **fuera** de esa carpeta.

### 8.2 Búsqueda y migración de todos los usos

- En la ruta `C:\Users\User\Documents\nuevo-proyecto-Angular\src`, **buscar todos los lugares** donde se está llamando a `GatewayApiService` para migrarlos a su equivalente, usando **`HttpClient` DIRECTO con observables**.
- Actualmente **TODAS** las llamadas a la API que usan `GatewayApiService` están usando `await firstValueFrom`.
- **Conservar el mismo patrón de `await firstValueFrom`**, pero usando **`HttpClient` DIRECTO**.

### 8.3 Prohibido crear servicios externos

- **Prohibido crear servicios externos.** Esto significa **no crear ningún wrapper ni servicio nuevo que encapsule las llamadas a la API** (es decir, ningún equivalente a `GatewayApiService`). Cada consumidor debe **inyectar `HttpClient` directamente** y llamar a la API por sí mismo.
- Los interceptors (`error`, `success`, `timeout`, `loader`) y los services transversales (`api-response-normalizer.service.ts` y `http-log.service.ts`) **no** son "servicios externos" en este sentido: son infraestructura transversal exigida por esta especificación, no wrappers de llamadas a la API.

### 8.4 Restricciones de manejo de errores con `HttpClient` directo

Al usar `HttpClient` DIRECTO está **prohibido** usar:

- `try/catch`
- el operador de RxJS `catchError`
- el callback `error` del objeto pasado a `subscribe()`

El manejo de errores se tiene que hacer con `if / else`, leyendo el flag `success` del contrato `IResponse<T>`.

### 8.5 Método HTTP correcto en `HttpClient` directo

`HttpClient` **no** expone métodos en mayúsculas como `POST`. Su API usa métodos en **minúsculas**: `get()`, `post()`, `put()`, `delete()`, `patch()`, etc. Por lo tanto, en la migración el método `POST` del ejemplo original se escribe como `post` (y de forma análoga para los demás verbos).

### 8.6 Ejemplo de consumo a conservar (con el método ya corregido)

```ts
async getBots() {
  const { success } = await firstValueFrom(
    this.http.post(`${environment.api}AQUI_ESCRIBIR_EL_ENDPOINT`),
  );

  if (success) {
    // codigo cuando la peticion HTTP es exitosa
  } else {
    // codigo cuando la peticion HTTP es erronea
  }
}
```
