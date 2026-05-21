# ⚠️ Advertencia: 🚨

Debido a que la IA no conoce las convenciones ni la arquitectura de este proyecto, antes de hacer preguntas a una IA (Chat GPT, Claude, Gemini, etc.), primero debes copiar y pegar completo este README.md en la IA para que las respuestas de la IA y el código generado sigan las buenas prácticas y se alineen correctamente con la arquitectura del proyecto.

Desobedecer esta advertencia hace que el código generado sea desordenado, inconsistente y no siga las convenciones definidas en el proyecto.

# 🅰️ Angular 20 + Prime NG 20 + Tailwind 4 + Sass

usar Node JS 24.15.0

# 📦 Instalar paquetes

```javascript
npm i
```

# ▶️ Ejecutar proyecto

Para mejorar rendimiento de ejecución de comandos y especificar el entorno de ejecución del proyecto se debe usar `node --run` en lugar de `npm run` o `npm start`.

| comando                | apunta a... | ruta archivo                                |
| ---------------------- | ----------- | ------------------------------------------- |
| node --run start:local | local host  | `src/environments/environment.localhost.ts` |
| node --run start:prod  | producción  | `src/environments/environment.prod.ts`      |
| node --run start:test  | pruebas     | `src/environments/environment.test.ts`      |

# 🚀 Generar build (dist) para desplegar

| comando               | apunta a... | ruta archivo                           |
| --------------------- | ----------- | -------------------------------------- |
| node --run build:test | pruebas     | `src/environments/environment.test.ts` |
| node --run build:prod | producción  | `src/environments/environment.prod.ts` |

# 📁 Estructura del Proyecto

```txt
src/
├── assets/
│   ├── icon/ → Iconos del proyecto
│   └── img/ → Imágenes del proyecto
│
├── environments/ → variables de entorno
│   ├── environment.interface.ts → Tipos de datos de las variables de entorno
│   ├── environment.localhost.ts → Variables de entorno de local host (desarrollo)
│   ├── environment.prod.ts → Variables de entorno de producción
│   └── environment.test.ts → Variables de entorno de pruebas
│
├── app/
│   ├── app.routes.ts → Definición de rutas (URL)
│   ├── not-found-404/ → Componente q se muestra al acceder a URLs inexxistentes
│   │
│   ├── auth/ → Rutas de autenticación
│   │   ├── assign-password/ → Recuperar y cambiar la contraseña
│   │   ├── login/ → Iniciar sesión
│   │   ├── recover-password/ → Enviar correo para recuperar contraseña
│   │   └── register/ → Formulario de registro de nuevo usuario
│   │
│   ├── home/ → Contiene todas las rutas y componentes después de iniciar sesión
│   │   └── main-wrapper/ → contenedor principal de paginas despues de loguearse
│   │   └── bots/ → Define la ruta /bots, es una feature
│   │       ├── bots.component.html
│   │       └── bots.component.ts
│
├── shared/ → utilidades compartidas (globales) que se pueden usar en cualquier parte de la web
│   ├── guards/
│   │   └── auth.guard.ts → protección de rutas de todos los componentes que estan despues de loguearse
│   │
│   ├── components/ → componentes que se pueden reutilizzar en varias features
│   │
│   ├── ui / → componentes visuales reutilizables
│   │     ├── breadcrumbs/ → Componente con migas de pan
│   │     ├── loader/ → icono de cargando
│   │     └── menu/ → Componente de menú
│   │ 
│   ├── models/ → contiene tipos de datos y constantes globales
│   │   ├── constants/
│   │   ├── interface/
│   │   ├── enums/
│   │
│   ├── api/ → clases encargadas de realizar peticiones HTTP a APIs propias y externos
│   │ ├── general-api/ →
│   │ │ └── http-gateway-async-await.api.ts → Clase legacy mantenida únicamente por compatibilidad para peticiones HTTP usando async/await
│   │ │ └── http-gateway-observable.api.ts → Clase para peticiones HTTP usando Observables
│   │ 
│   ├── service/ → clases reutilizables usadas para separar lógica reutilizable que no debería estar dentro de los componentes
│   │ └── RxJS-BehaviorSubject/ → Archivos con RxJS BehaviorSubject ()
│   │     └── layout/
│   │         └── loader.service.ts → estado global para ocultar y mostrar icono de cargando
│   │         └── viewport-width.service.ts → devuelve un numero con el ancho del viewport (pantalla),
│   │         └── current-route.service.ts → devuelve un string con la ruta actual 
│   │
│   ├── utils/
│   │ ├── class/
│   │ │ ├── notification/ → carpeta con funciones para mostrar mensajes emergentes
│   │ │ │   ── HotToastClass.utils.ts → Notificaciones tipo toast
│   │ │ │   ── SweetAlertClass.utils.ts → Modal con SweetAlert2
│   │ │ │
│   │ │ ├── CryptoServiceClass.utils.ts → Encriptar y desencriptar texto y objeto literal usando crypto-js
│   │ │ ├── DataTypeClass.utils.ts → funciones para tipos de datos de JS, ejemplo normalizar string
│   │ │ ├── DownloadFileClass.utils.ts → funciones para descargar y ver archivos
│   │ │ ├── GeneralClass.utils.ts → funciones globales q se pueden re-utilizar en cualquier parte de la web
│   │ │ ├── LuxonClass.utils.ts → funciones para fechas usando Luxon
│   │ │ ├── SessionStorageClass.utils.ts → manejo de `sessionStorage`, codifica y decodifica en Base64 y realiza conversión automática de tipos de datos (string, number, boolean, null, undefined, array y object) al guardar y recuperar la información.
│
├── style/
│   ├── styles.scss → importa estilos de toda la web, solo importa archivos de sass con @use, NO debe contener estilos directos
│   │
│   ├── global/ → estilos globales de toda la pagina web
│   │     └── library/ → estilos que afectan las librerias
│   │        └── _prime-ng.scss → estilos que afectan a Prime NG
│   │        └── _sweet-alert-2.scss → estilos que afectan a Sweet Alert 2
│   │        └── _tailwind.css → archivo de configuración de Tailwind 4
│   │ 
│   ├── _button.scss → estilos globales de botones
│   ├── _reset.scss → elimina los estilos por defecto del navegador para asegurar una apariencia uniforme en todos los navegadores
│   ├── _scroll-bar.scss → estilos globales de barra de scroll
│   ├── _table.scss → estilos globales para tablas
│   └── _variables.scss → variables globales de Sass
```

# 📅 Fechas

Usar la librería **Luxon** para el manejo de fechas. **NO** usar `new Date()` **NI** librerías como Moment.js.

Esto se debe a que:

* `new Date()` tiene comportamientos inconsistentes entre zonas horarias.

* `new Date()` Es difícil de formatear y manipular de forma segura.

* `new Date()` No maneja bien timezones ni conversiones complejas.

* [Moment.js está en modo legacy/deprecado y ya no se recomienda para proyectos modernos.](https://momentjs.com/docs/#/-project-status/)

* Luxon ofrece una API más clara, moderna y robusta para fechas, tiempos y zonas horarias.

***❌ Incorrecto - usar `new Date()`***

```ts
const now = new Date();
const formatted = now.toLocaleDateString();
```

***❌ Incorrecto - usar moment.js***

```ts
import moment from 'moment';

const today = moment().format('YYYY-MM-DD');
```

***✅ Correcto - usar Luxon***

```ts
import { DateTime } from 'luxon';

const now = DateTime.now();
const formatted = now.toFormat('yyyy-MM-dd');
```

En `src\shared\utils\class\LuxonClass.utils.ts` hay funciones para el manejo (formateo) de fecha y hora usando Luxon.

***❌ Incorrecto - NO usar `formatDate`, usar Luxon directo***

Problemas de este enfoque:

* Repetición de código en múltiples componentes

* cada dev formatea fechas de forma distinta, sin estandarización.

```ts
import { DateTime } from 'luxon';

export class BotsComponent {
  getDate() {
    const now = DateTime.now();

    const formatted = now
         .setLocale('es')
         .toFormat('d-LLL-yyyy hh:mm:ss a');

    console.log(formatted);
  }
}
```

***✅ Correcto - usar `formatDate`***

```ts
import { Component, inject } from '@angular/core';
import { DateTime } from 'luxon';
import LuxonClass from '@/shared/utils/class/LuxonClass.utils';

@Component({
  selector: 'app-bots',
  templateUrl: './bots.component.html',
})
export class BotsComponent {

  private dateUtils = inject(LuxonClass);

  getDate() {
    const formatted = this.dateUtils.formatDate(
      DateTime.now(),
      'd-LLL-yyyy hh:mm:ss a'
    );

    console.log(formatted);
  }
}
```

En `src\shared\utils\class\LuxonClass.utils.ts` hay función para obtener fecha y hora actual con formato de fecha y hora personalizada 

***❌ Incorrecto - usar Luxon directamente para obtener fecha y hora actual***

Problemas de este enfoque:

* Repetición de código en múltiples componentes

* cada dev formatea fechas de forma distinta, sin estandarización.

```ts
import { DateTime } from 'luxon';

export class BotsComponent {

  getCurrentDateTime() {
    const now = DateTime.now()
      .setLocale('es')
      .toFormat('d-LLL-yyyy hh:mm:ss a')
      .replace(/\.$/, '');

    const fixed = now
      .replace(/p\.\s?m/gi, 'p.m')
      .replace(/a\.\s?m/gi, 'a.m');

    console.log(fixed);
  }
}
```

****✅ Ejemplo correcto - usar `LuxonClass.utils.ts`****

```ts
import { Component, inject } from '@angular/core';
import LuxonClass from '@/shared/utils/class/LuxonClass.utils';

@Component({
  selector: 'app-bots',
  templateUrl: './bots.component.html',
})
export class BotsComponent {

  private dateUtils = inject(LuxonClass);

  getCurrentDateTime() {
    const current = this.dateUtils.currentDateAndTime(
      'd-LLL-yyyy hh:mm:ss a'
    );

    console.log(current);
  }
}
```

# 💅 Maquetación

## 🧱 Configuración de Tailwind 4

[Igual que como se muestra en la documentacion](https://tailwindcss.com/blog/tailwindcss-v4#css-first-configuration)

En este proyecto se está utilizando **Tailwind CSS V4**, por lo tanto el archivo `tailwind.config.js` ya no se utiliza y se considera **obsoleto** en esta arquitectura.

La configuración de Tailwind ahora se realiza en el archivo `src/styles/global/library/tailwind.css`

Esto permite centralizar la definición de tokens de diseño (colores, media queries, etc.) sin necesidad de configuración en archivo JavaScript.

***❌ Incorrecto - Configurar Tailwind 3 con `.js`***

```js
/* tailwind.config.js */

module.exports = {
  theme: {
    extend: {
      colors: {
        'primary-color': '#FF0000',
      },
    },
  },
};
```

***✅ Correcto - Configurar Tailwind 4 con `.css`***

```CSS
/* src/styles/global/library/tailwind.css */

@theme {
  --color-primary-color: #FF0000;
}
```

## ⌨️ Configurar Auto-completado y Linter de Tailwind 4

En VS Code o en cualquier editor basado en VS Code (Antigravity, Cursor, Windsurf, etc.), seguir estos pasos;

**1.** Instalar extensión [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

**2.** Instalar extensión [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)

**3.** Abrir el archivo `settings.json`

   - Atajo rápido: `Ctrl + Shift + P`
   - Luego escribir: `Preferences: Open User Settings (JSON)`

**4.** En `settings.json` agregar esto:

```json
/* Tailwind 4 */
{
  "tailwindCSS.experimental.configFile": "src/styles/global/library/tailwind.css", /* ruta del archivo .css de configuracion de Tailwind 4 */
  "tailwindCSS.emmetCompletions": true,
  "tailwindCSS.includeLanguages": {
      "javascript": "javascript",
      "javascriptreact": "javascriptreact",
      "plaintext": "html",
      "typescript": "typescript",
      "typescriptreact": "typescriptreact"
  },
}
```

## 🎨 Variables de Colores Tailwind y Sass

Las variables con nombres de los colores de **Sass** en `src/styles/global/_variable.scss` y **Tailwind** en `src/styles/global/library/tailwind.css` tienen que ser exactamente los mismos

Esto garantiza que los colores sean los mismos entre los estilos globales definidos en Sass y los estilos de cada componente definidos con Tailwind.

****✅ Ejemplo:****

En Sass y Tailwind ambos colores tienen exactamente el mismo nombre `primary-color` y son el mismo color rojo `#FF0000`

```scss
// src/styles/global/_variable.scss

// colores de Sass
$primary-color: #FF0000;
```

[Documentación de variables de Tailwind 4](https://tailwindcss.com/blog/tailwindcss-v4#css-theme-variables)

```CSS
/*
src/styles/global/library/tailwind.css

colores de Tailwind */

@theme {
  --color-primary-color: #FF0000;
}
```

## 🤔 ¿Cómo usar Tailwind y Sass juntos?

****❌ Incorrecto:****

Todos los componentes de Angular **NO** pueden tener archivos de Sass ni CSS con `styleUrls`,

Mezclar Sass y Tailwind en un mismo componente es mala práctica porque los estilos de Sass y Tailwind se sobrescriben debido a la especificidad, herencia y cascada de CSS.

****❌ Ejemplo incorrecto:****

```ts
/* bots.component.ts */

@Component({
  selector: 'app-bots',
  templateUrl: './bots.component.html',
  styleUrls: ["./bots.component.scss"], /*  NO se puede escribir `styleUrls` */
})
export class BotsComponent {}
```

```HTML
<!-- bots.component.html -->

<button id="btn-guardar"
        class="bg-red-600">
  Guardar
</button>
```

```scss
/* bots.component.scss */

#btn-guardar {
  background-color: red;
}
```

***✅ Correcto:***

Sass para estilos globales en `src/styles/global/...`

Tailwind para estilos especificos de cada componente en `src/app/...` y `src/shared/components/...`

****✅ Ejemplo Correcto de Sass global:****

```scss
// src/styles/global/__scroll-bar.scss

// ocultar barra de scroll, pero hacer q siga funcionando la barra de scroll
.hidden-scrollbar::-webkit-scrollbar {
  display: none;
}
```

```HTML
<!-- my-component-1.component.html -->

<div class="hidden-scrollbar overflow-auto">
  ...
</div>
```

```HTML
<!-- my-component-2.component.html -->

<div class="hidden-scrollbar overflow-auto">
  ...
</div>
```

****✅ Ejemplo Correcto de Tailwind:****

```ts
/* bots.component.ts */

@Component({
  selector: 'app-bots',
  templateUrl: './bots.component.html',
})
export class BotsComponent {}
```

```HTML
<!-- bots.component.html -->

<button class="bg-red-600">
  Guardar
</button>
```

# 🔀 Enrutado

El nombre de las carpetas dentro de `src/app` tiene que coincidir exactamente con las rutas definidas en `src/app/app.routes.ts`

Esto permite ubicar los componentes que corresponden a cada URL

Además, todas las páginas protegidas de la aplicación deben ser `children` de `MainWrapperComponent`.

***✅ Correcto:***

```txt
src/app/
├── home/
│     └── bots/
│         └── bots.component.html
│         └── bots.component.ts
```

```ts
/* src/app/app.routes.ts */
import { Routes } from "@angular/router";
import { AuthGuard } from "@/shared/guards/auth.guard";

// #region - contenedor principal de paginas despues de loguearse
import { MainWrapperComponent } from '@/app/home/main-wrapper/main-wrapper.component';
// #endregion

import { BotsComponent } from '@/app/home/bots/bots.component';

export const routes: Routes = [
  {
    path: '',
    component: MainWrapperComponent,

    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],

    children: [
      {
        // /bots
        path: 'bots',
        component: BotsComponent,
      },
    ],
  },
];
```

En este ejemplo:

- La URL `/bots` coincide con la estructura `src/app/home/bots`

- `BotsComponent` es hijo de `MainWrapperComponent`

- `AuthGuard` protege automáticamente todas las rutas hijas gracias a `canActivateChild`

# 🧩 Organización de componentes

Los componentes que pertenecen a una URL o página específica deben estar dentro de su módulo o ruta correspondiente en `src/app`.

Los componentes reutilizables y compartidos entre múltiples páginas deben estar en `src/shared/components`.

Esto permite mantener una arquitectura escalable.

***✅ Correcto:***

```txt
src/
├── app/
│   ├── home/
│   │   ├── bots/
│   │   │   ├── bots.component.ts
│   │   │   ├──  bots.component.html
│   │   │   ├──  bots.component.spec.ts
│   │   │   │
│   │   │   └── components/
│   │   │       └── bot-card/
│   │   │           ├── bot-card.component.ts
│   │   │           ├── bot-card.component.html
│   │   │           └── bot-card.component.spec.ts
│   
├── shared/
│   └── components/
│       ├── button/
│       ├── modal/
│       └── spinner/
```

En este ejemplo:
* `bot-card.component.ts` pertenece únicamente a la página de bots

* `button`, `modal` y `spinner` son componentes reutilizables globales

* Cada funcionalidad (*feature*) mantiene sus componentes encapsulados

***❌ Incorrecto:***

```txt
src/
├── components/
│   ├── bots/
│   │   ├── bots.component.ts
│   │   ├── bots.component.html
│   │   └── bots.component.spec.ts
│   │
│   ├── botbot-cards/
│   │   ├── bot-card.component.ts
│   │   ├── bot-card.component.html
│   │   └── bot-card.component.spec.ts
│   │
│   ├── home-banner/
│   │   ├── home-banner.component.ts
│   │   ├── home-banner.component.html
│   │   └── home-banner.component.spec.ts
│   │
│   ├── button/
│   │   ├── button.component.ts
│   │   ├── button.component.html
│   │   └── button.component.spec.ts
│   │
│   ├── modal/
│   │   ├── modal.component.ts
│   │   ├── modal.component.html
│   │   └── modal.component.spec.ts
│   │
│   └── spinner/
│       ├── spinner.component.ts
│       ├── spinner.component.html
│       └── spinner.component.spec.ts
```

No se debe meter todo en una carpeta global `src/components` porque:

* Mezcla componentes reutilizables con componentes específicos de páginas

* Dificulta encontrar archivos relacionados con una funcionalidad

* Genera desorden a medida que crece el proyecto

* Rompe el encapsulamiento de cada módulo o página

* Es inmantenible e inescalable

## Diferencia entre `src/app/bots/components` y `src/shared/components`

* `src/app/bots/components` contiene componentes exclusivos de la funcionalidad (feature) `bots`

* Estos componentes no deben reutilizarse globalmente porque pertenecen únicamente a esa página o *feature*

* `src/shared/components` contiene componentes reutilizables en toda la aplicación

* Los componentes compartidos deben ser genéricos y desacoplados de una funcionalidad específica

# 🌐 Consumo de API

En este proyecto todas las peticiones HTTP deben hacerse usando el servicio centralizado `src\shared\API\general-api\http-gateway-observable.api.ts`, que maneja:
- icono de loader global

- manejo de errores `catchError`

- timeout

- logging

- logger

- validaciones de seguridad (guards)

- respuesta estándar con el tipo 
```ts
{
  success: boolean;
  status: number;
  message: string;
  data: T;
}
```

## ❌ Forma incorrecta

No se debe consumir la API directamente con `HttpClient` + `try/catch` en componentes o servicios externos.

**NO** es necesario escribir `try/catch` porque la clase `http-observable.service.ts` ya se encarga de manejar los errores.

❌ Problemas de este enfoque:

* Repite lógica en cada componente.

* No tiene loader global.

* No tiene manejo estandarizado de errores.

* No respeta arquitectura del proyecto.

* Usa `try/catch` en cada llamada.

* No centraliza validaciones ni logging.

****❌ Ejemplo incorrecto - `lastValueFrom`****

```ts
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

export class BotsComponent {
  constructor(private http: HttpClient) {}

  async getBots() {
    try {
      const data = await lastValueFrom(
        this.http.get('https://api.com/bots')
      );

      console.log(data);
    } catch (error) {
      console.error('Error API', error);
    }
  }
}
```

****❌ Ejemplo incorrecto - `firstValueFrom`****

```ts
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export class BotsComponent {
  constructor(private http: HttpClient) {}

  async getBots() {
    try {
      const data = await firstValueFrom(
        this.http.get('https://api.com/bots')
      );

      console.log(data);
    } catch (error) {
      console.error('Error API', error);
    }
  }
}
```

****❌ Ejemplo incorrecto - Angular legacy - `toPromise()`****

Antes de `firstValueFrom`, en Angular antiguo se usaba `toPromise()`, pero este enfoque está **deprecado** y ya no se recomienda.

```ts
import { HttpClient } from '@angular/common/http';

export class BotsComponent {

  constructor(private http: HttpClient) {}

  async getBots() {
    try {
      const data = await this.http.get('https://api.com/bots').toPromise();

      console.log(data);
    } catch (error) {
      console.error('Error API', error);
    }
  }
}
```

****❌ Ejemplo incorrecto - observable****

```ts
import { HttpClient } from '@angular/common/http';

export class BotsComponent {
  constructor(private http: HttpClient) {}

  getBots() {
    this.http.get('https://api.com/bots').subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error('Error API', error);
      },
    });
  }
}
```

****❌ Ejemplo incorrecto - `fetch`****

Angular no usa `fetch` porque es una API básica del navegador y no se integra con la arquitectura del framework.

```ts
export class BotsComponent {
   async getBots() {
     try {
       const response = await fetch('https://api.com/bots');
   
       const data = await response.json();
   
       console.log(data);
     } catch (error) {
       console.error('Error API', error);
     }
   }
}
```

## ✅ Forma correcta

Se debe usar únicamente el ApiGatewayService (`src\shared\API\general-api\http-gateway-observable.api.ts`) centralizado.

* NO usar `try/catch` aquí

* El servicio `http-observable.service.ts` ya maneja errores internamente

* La URL se construye concatenando el `environment.api` con el endpoint específico de la petición, lo que permite reutilizar la base de la API en todos los ambientes (local, test, producción).

****✅ Ejemplo correcto con `http-observable.service.ts` y  `firstValueFrom`****

```ts
import { inject } from '@angular/core';
import { ApiGatewayService } from '@/shared/api/general-api/http-gateway-observable.api';
import { IResponse } from '@/shared/api/general-api/types/request-data.types';
import { environment } from '@/environments/environment';

export class BotsComponent {

  http = inject(ApiGatewayService);

  async getBots() {
    const { success, status, message, data }: IResponse = await firstValueFrom(
      // aqui se concatena el environment.api con el endpoint específico de la petición
      this.http.POST(`${environment.api}AQUI_ESCRIBIR_EL_ENDPOINT`)
    );

    console.log("¿la peticion HTTP es exitosa o erronea? ", success);
    console.log("numero de HTTP status", status)

    if (success) {
      console.log("peticion HTTP exitosa");
      console.log("mensaje con que responde la API", message);
      console.log("datos con que responde la API", data);
    } else {
      console.error("error al llamar la API")
    }
  }
}
```

# ⏳ Icono de Loader Global

El icono de carga se oculta y muestra automáticamente desde `http-observable.service` y `loader.service.ts` cuando se realizan peticiones HTTP.

👉 **NO se debe crear estados manuales como `loader = true/false` en los componentes**, ya que el loader es global y centralizado.

****❌ Ejemplo incorrecto****

Crear estados locales de loading en cada componente:

```ts
/* bots.component.ts */

export class BotsComponent {

  loading: boolean = false;

  getBots() {
    this.loading = true;

    this.http.get('https://api.com/bots')
      .subscribe({
        next: (res) => {
          console.log(res);
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
  }
}
```

```HTML
<!-- bots.component.html -->

<button (click)="getBots()">
  Obtener bots
</button>

@if (loading) {
  <div>
    Cargando...
  </div>
} @else {
  <div>
    Aquí se muestran los bots
  </div>
}
```

❌ Problemas de este enfoque:

* Duplica codigo para mostrar y ocultar icono de cargando en cada componente

* El loader no es global

* Riesgo de olvidar ocultar el icono de cargando

* Cuando hay varias peticiones HTTP en un mismo componente se vuelve muy complejo saber en donde escribir `loader = true/false` para mostrar y ocultar el icono de cargando.

****✅ Ejemplo correcto con `http-observable.service.ts`****

```ts
import { inject } from '@angular/core';
import { ApiGatewayService } from '@/shared/api/general-api/http-gateway-observable.api';
import { IResponse } from '@/shared/api/general-api/types/request-data.types';
import { environment } from '@/environments/environment';

export class BotsComponent {

  http = inject(ApiGatewayService);

  async getBots() {
    const { success, status, message, data }: IResponse = await firstValueFrom(
      this.http.POST(`${environment.api}`, optionsApi)
    );

    if (success) {
      // ...
    } else {
      // ...
    }
  }
}
```

# ⚙️ Configuración de peticiones HTTP (`IRequestOptions`)

En este proyecto todas las peticiones realizadas con `http-observable.service.ts` pueden configurarse mediante la interfaz `IRequestOptions`.

Esto permite estandarizar el comportamiento de las llamadas HTTP sin repetir lógica en los componentes.

## 📦 ¿Qué permite configurar?

```ts
/* src\shared\API\general-api\types\request-data.types.ts */

export interface IRequestOptions<T = any> {
  body?: T;
  params?: TParams;
  headers?: THeaders;
  responseType?: IResponseType;

  showLoader?: boolean;
  showLogger?: boolean;
  executeErrorHandling?: boolean;

  isASecurityEndpoint?: boolean;
  withCredentials?: boolean;
}

/**
tipo de respuesta HTTP */
export type IResponseType = 'arraybuffer' | 'blob' | 'json' | 'text';
```

### 🧠 Explicación de opciones

- `body` → datos enviados en POST, PUT o PATCH  
- `params` → query params de la URL  
- `headers` → headers personalizados  
- `responseType` → tipo de respuesta 'arraybuffer' | 'blob' | 'json' | 'text'

### 🎛️ Opciones de comportamiento global

- `showLoader` → muestra/oculta el loader global  
- `showLogger` → activa logs de request/response  
- `executeErrorHandling` → ejecuta manejo de errores centralizado  

### 🔐 Seguridad y autenticación

- `isASecurityEndpoint` → indica si requiere token o autenticación  
- `withCredentials` → envía cookies y credenciales en requests cross-domain  

### 🚀 Beneficio principal

👉 Permite que todas las peticiones HTTP tengan un comportamiento consistente, reutilizable y centralizado sin repetir lógica en cada componente o servicio.

### 📦✅ Ejemplo de consumo de API con `POST` y `body`
Enviar datos al backend usando `POST` y el `body` de `IRequestOptions`.

```ts
import { Component, inject } from '@angular/core';
import { ApiGatewayService } from '@/shared/api/general-api/http-gateway-observable.api';
import { firstValueFrom } from 'rxjs';
import { environment } from '@/environments/environment';
import { IResponse } from '@/shared/api/general-api/types/request-data.types';

interface IBodyBots {
  name: string;
  active: boolean;
}

@Component({
  selector: 'app-bots',
  templateUrl: './bots.component.html',
})
export class BotsComponent {

  private http = inject(ApiGatewayService);

  async createBot() {
    const optionsApi: IRequestOptions<IBodyBots> = {
      body: {
        name: 'Bot IA',
        active: true
      }
    };

    const { success, status, message, data }: IResponse = await firstValueFrom(
      this.http.POST(`${environment.api}/bots`, optionsApi)
    );

    // ...
  }
}
```

# ❌ Angular legacy VS ✅ Angular moderno

## 📝 Formularios

[Tutorial de formularios reactivos con signals](https://youtu.be/7V9I9_qwx74?si=m5Bn3_ygcEEuSpXx)

Angular 21 moderno introdujo los nuevos [**Signal Forms**](https://angular.dev/essentials/signal-forms), que permiten manejar formularios usando `signal()` y reactividad automática.

Sin embargo, actualmente los Signal Forms siguen siendo **experimentales** y la propia documentación oficial de Angular recomienda tener precaución antes de usarlos en producción.

Por esta razón, en este proyecto:

- ✅ sí se usan `signals` para manejo de estado.

- ❌ NO se usan todavía Signal Forms experimentales.

- ✅ Se siguen usando formularios reactivos tradicionales con `FormGroup`, `FormControl` y `ReactiveFormsModule`

Cuando Signal Forms sea estable y maduro, se podrá migrar gradualmente.

### 🧹 Sufijos en nombres de archivos

[Angular moderno eliminó la necesidad de usar sufijos como:](https://www.reddit.com/r/angular/comments/1lk8r9k/bring_back_suffixes_in_angular_20_cli_need_20/?tl=es-419)

- `.component`
- `.service`
- `.directive`
- `.pipe`

porque con el tipo del archivo ya se entiende que hace el archivo por el decorador de Angular (`@Component`, `@Injectable`, etc).

***❌ Angular moderno sin sufijos***

| Nombre Archivo   | Tipo de Archivo | decorador / tipo Angular  |
|------------------|-----------------|---------------------------|
| `login.ts`       | componente      | `@Component`              |
| `auth.ts`        | servicio        | `@Injectable`             |
| `auth-guard.ts`  | guard           | `CanActivateFn`           |
| `list-table.ts`  | componente      | `@Component`              |
| `format-date.ts` | pipe            | `@Pipe`                   |
| `highlight.ts`   | directiva       | `@Directive`              |
| `crypto.ts`      | utils           | `class` clase utilitaria  |

***✅ Convención usada en este proyecto***

Aunque Angular moderno ya no obliga a usar sufijos, en este proyecto sí se siguen utilizando para mantener mayor claridad y organización.

Esto facilita:
* Identificar rápidamente el tipo de archivo.

* Mejorar la lectura de imports.

* Evitar confusión en proyectos grandes.

* Mantener consistencia entre carpetas y archivos.

| Nombre Archivo             | Tipo de Archivo | decorador / tipo Angular  |
|----------------------------|-----------------|---------------------------|
| `login.component.ts`       | componente      | `@Component`              |
| `auth.service.ts`          | servicio        | `@Injectable`             |
| `auth.guard.ts`            | guard           | `CanActivateFn`           |
| `list-table.component.ts`  | componente      | `@Component`              |
| `format-date.pipe.ts`      | pipe            | `@Pipe`                   |
| `highlight.directive.ts`   | directiva       | `@Directive`              |
| `crypto.utils.ts`          | utils           | `class` clase utilitaria  |

## 🧩 Standalone Components

En Angular moderno `AppModule` (`app.module.ts`) ya no es necesario.

Angular reemplazó la arquitectura basada en módulos (`NgModule`) por componentes standalone.

Además:

- Ya ***NO*** es necesario escribir `standalone: true` en los componentes.

- `standalone` ahora es `true` por defecto.

- Cada componente importa directamente sus propias dependencias en array `imports: []`

****❌ Ejemplo Incorrecto - Angular legacy - `AppModule`****

```TS
/* app.module.ts */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BotsComponent } from './bots.component';

@NgModule({
  declarations: [
    AppComponent,
    BotsComponent
  ],
  imports: [
    BrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

****✅ Ejemplo Correcto - Angular moderno con Standalone Components****

```TS
/* children.component.ts */

import { Component } from '@angular/core';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
})
export class ChildrenComponent {}
```

```HTML
<!-- children.component.html -->

<p>
  componente hijo
</p>
```

```TS
/* parent.component.ts */

import { Component } from '@angular/core';
import { ChildrenComponent } from './children/children.component';

@Component({
  selector: 'app-parent',
  imports: [ChildrenComponent],
  templateUrl: './parent.component.html',
})
export class ParentComponent {}
```

```HTML
<!-- parent.component.html -->

<app-children />
```

## 🔀 Directivas de Control de Flujo (Control Flow Directives)

[Documentación oficial para migrar directivas](https://angular.dev/reference/migrations/control-flow)

Este comando ayuda a migrar las directivas:

```script
ng generate @angular/core:control-flow
```

| ❌ **NO** usar Angular legacy | ✅ Usar Angular moderno |
|--------------------------------|-------------------------|
| `*ngFor`                       | `@for`                  |
| `*ngIf`                        | `@if`                   |
| `*ngSwitch`                    | `@switch`               |
| `*ngSwitchCase`                | `@case`                 |
| `*ngSwitchDefault`             | `@default`              |

### **[`@for`](https://angular.dev/api/core/@for)**

***❌ Incorrecto - Angular legacy - `*ngFor`***

```TS
/* products.component.ts */

import { Component } from '@angular/core';

interface IProduct {
  id: number;
  name: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  products: IProduct[] = [
    { id: 1, name: 'producto 1' },
    { id: 2, name: 'producto 2' },
    { id: 3, name: 'producto 3' },
  ];
}
```

```HTML
<!-- products.component.html -->

<div *ngFor="let item of products">
  {{ item.name }}
</div>
```

***✅ Correcto - Angular moderno `@for`***

```TS
/* products.component.ts */

import { Component, signal, WritableSignal } from '@angular/core';

interface IProduct {
  id: number;
  name: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  products = signal<IProduct[]>([
    { id: 1, name: 'producto 1' },
    { id: 2, name: 'producto 2' },
    { id: 3, name: 'producto 3' },
  ]);
}
```

```HTML
<!-- products.component.html -->

@for (item of products(); track item.id) {
  <div>
    {{ item.name }}
  </div>
}
```

### **[`@if` `@else if`](https://angular.dev/guide/templates/control-flow)**

***❌ Incorrecto - Angular legacy - `*ngIf`***

```TS
/* status.component.ts */

import { Component } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
})
export class StatusComponent {
  loading: boolean = false;
  success: boolean = false;
  error: boolean = true;
}
```

```HTML
<!-- status.component.html -->

<div *ngIf="loading">
  cargando...
</div>

<div *ngIf="!loading && success">
  petición exitosa
</div>

<div *ngIf="!loading && !success && error">
  error
</div>
```

***✅ Correcto - Angular moderno `@if` y `@else if`***

```TS
/* status.component.ts */

import { Component, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
})
export class StatusComponent {
  loading = signal<boolean>(false);
  success = signal<boolean>(false);
  error = signal<boolean>(true);
}
```

```HTML
<!-- status.component.html -->

@if (loading()) {
  <div>
    cargando...
  </div>
} @else if (success()) {
  <div>
    petición exitosa
  </div>
} @else {
  <div>
    error
  </div>
}

```

### **[`@switch`, `@case`, `@default`](https://angular.dev/api/core/@switch)**

***❌ Incorrecto - Angular legacy - `*ngSwitch`***

```TS
/* role.component.ts */

import { Component } from '@angular/core';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
})
export class RoleComponent {
  role: string = 'admin';
}
```

```HTML
<!-- role.component.html -->

<div [ngSwitch]="role">
  <p *ngSwitchCase="'admin'">
    administrador
  </p>

  <p *ngSwitchCase="'user'">
    usuario
  </p>

  <p *ngSwitchDefault>
    sin permisos
  </p>
</div>
```

***✅ Correcto - Angular moderno `@switch`, `@case`, `@default`***

```TS
/* role.component.ts */

import { Component, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
})
export class RoleComponent {
  role = signal<string>('admin');
}
```

```HTML
<!-- role.component.html -->

 @switch (role()) {
  @case ('admin') {
    <p>
      administrador
    </p>

  }
  @case ('user') {
    <p>
      usuario
    </p>
  }
  @default {
    <p>
      sin permisos
    </p>
  }
}
```

## 💉 Inyección de dependencias

[Documentación oficial para migrar de `constructor()` a `inject()`](https://angular.dev/reference/migrations/inject-function)

Este comando ayuda a migrar de `constructor()` a `inject()`:

```script
ng generate @angular/core:inject
```

En Angular moderno ya no se recomienda usar `constructor()` para inyección de dependencias.

👉 Siempre usar `inject()`.

Esto permite:
* menos boilerplate.

* evitar constructores gigantes.

* mejor legibilidad

* mejor tipado

* mejor compatibilidad con `Signals`.

****❌ Ejemplo incorrecto - Angular legacy - `constructor()`****

```TS
import { Component } from '@angular/core';
import { ApiGatewayService } from '@/shared/api/general-api/http-gateway-observable.api';
import LuxonClass from '@/shared/utils/class/LuxonClass.utils';

@Component({
  selector: 'app-bots',
  templateUrl: './bots.component.html',
})
export class BotsComponent {
  constructor(
    private http: ApiGatewayService,
    private dateUtils: LuxonClass,
  ) {}

  // ...
}
```

****✅ Ejemplo correcto - Angular moderno `inject()`****

```TS
import { Component, inject } from '@angular/core';
import { ApiGatewayService } from '@/shared/api/general-api/http-gateway-observable.api';
import LuxonClass from '@/shared/utils/class/LuxonClass.utils';

@Component({
  selector: 'app-bots',
  templateUrl: './bots.component.html',
})
export class BotsComponent {
  private http = inject(ApiGatewayService);
  private dateUtils = inject(LuxonClass);

  // ...
}
```

## 📡 Estado

[Tutorial de `signal`](https://youtu.be/jqGjE6iqkvg?si=9PJ8N08wo-M1_GIh)

Este proyecto **tiene** que usar signals para estados, **NO** estados tradicionales de Angular legacy.

Los signals son reactivos, cuando un signal cambia:

* Angular actualiza automáticamente todo lo que depende de ese estado.

* No es necesario sincronizar estados manualmente.

* No hace falta usar BehaviorSubject para compartir reactividad.

* Se escribe menos código.

* La reactividad es más simple y mantenible.

* Evita múltiples `subscribe()` innecesarios.

****❌ Ejemplo incorrecto - Angular legacy - estado tradicional NO reactivo automáticamente****

```TS
/* counter.component.ts */
import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
})
export class CounterComponent {
  // estado principal
  count: number = 0;

  // estado derivado manual
  doubleCount: number = 0;

  increment(): void {
    // actualizar estado principal
    this.count = this.count + 1;

    // actualizar manualmente estado derivado
    this.doubleCount = this.count * 2;

    console.log(this.count); // 1
    console.log(this.doubleCount); // 2
  }

  setTen(): void {
    // setear (cambiar) count a 10
    this.count = 10;

    // actualizar manualmente doubleCount
    this.doubleCount = this.count * 2;

    console.log(this.count); // 10
    console.log(this.doubleCount); // 20
  }
}
```

```HTML
<!-- counter.component.html -->

<p>
  count: {{ count }}
</p>

<p>
  doubleCount: {{ doubleCount }}
</p>

<button (click)="increment()">
  incrementar
</button>

<button (click)="setTen()">
  setear en 10
</button>
```

****✅ Ejemplo correcto - Angular moderno estados con `signal`****

```TS
/* counter.component.ts */

import { Component, computed, Signal, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
})
export class CounterComponent {
  // estado reactivo principal
  count: WritableSignal<number> = signal(0);

  // estado reactivo derivado
  doubleCount: Signal<number> = computed(() => this.count() * 2);

  increment(): void {
    // actualizar signal
    this.count.update((currentCount: number) => currentCount + 1);

    console.log(this.count()); // 1
    console.log(this.doubleCount()); // 2
  }

  setTen(): void {
    // cambiar (setear) count a 10
    this.count.set(10);

    console.log(this.count()); // 10

    // automaticamente cambia a 20
    console.log(this.doubleCount()); // 20
  }
}
```

```HTML
<!-- counter.component.html -->

<p>
  count: {{ count() }}
</p>

<p>
  doubleCount: {{ doubleCount() }}
</p>

<button (click)="increment()">
  incrementar
</button>

<button (click)="setTen()">
  setear en 10
</button>
```

## 🔄 Input y Output

[Tutorial](https://youtu.be/_XnEoK47Il0?si=bnZ1NuRuxLIaSYUv)

****❌ Ejemplo incorrecto - Angular legacy - `@Input()`, `@Output()` y `*ngFor`****

```TS
/* product.interface.ts */

export interface IProduct {
  id: number;
  name: string
  quantity: number;
}
```

```TS
/* product-children.component.ts

importar 
- Input con I mayuscula
- Output con O mayuscula */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from './product.interface';

@Component({
  selector: 'app-product-children',
  templateUrl: './product-children.component.html',
})
export class ProductChildrenComponent {
  @Input() product!: IProduct;
  @Output() onIncrementQuantity = new EventEmitter<number>();

  incrementQuantity(): void {
    this.onIncrementQuantity.emit(this.product.id);
  }
}
```

```HTML
<!-- product-children.component.html -->

<p>
  {{ product.id }}
</p>

<p>
  {{ product.name }}
</p>

<button (click)="incrementQuantity()">
  <span>cantidad </span>
  <span>{{ product.quantity }}</span>
</button>
```

```TS
/* parent.component.ts  */

import { Component } from '@angular/core';
import { IProduct } from './product.interface';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
})
export class ParentComponent {
  products: IProduct[] = [
    { id: 1, name: 'producto 1', quantity: 100 },
    { id: 2, name: 'producto 2', quantity: 200 },
    { id: 3, name: 'producto 3', quantity: 300 },
  ];

  incrementQuantity(productId: number): void {
    this.products = this.products.map((product: IProduct) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }

      return product;
    });
  }
}
```

```HTML
<!-- parent.component.html -->

<app-product-children
  *ngFor="let item of products"
  [product]="item"
  (onIncrementQuantity)="incrementQuantity($event)">
</app-product-children>
```

****✅ Ejemplo correcto - Angular moderno `input()` signal, `output()` y `@for`****

```TS
/* product.interface.ts */

export interface IProduct {
  id: number;
  name: string;
  quantity: number;
}
```

```TS
/* product-children.component.ts

importar:
- input con i minuscula
- output con o minuscula */
import { Component, input, output } from '@angular/core';
import { IProduct } from './product.interface';

@Component({
  selector: 'app-product-children',
  templateUrl: './product-children.component.html',
})
export class ProductChildrenComponent {
  product = input.required<IProduct>();
  onIncrementQuantity = output<number>();

  incrementQuantity(): void {
    this.onIncrementQuantity.emit(this.product().id);
  }
}
```

```HTML
<!-- product-children.component.html -->

<p>
  {{ product().id }}
</p>

<p>
  {{ product().name }}
</p>

<button (click)="incrementQuantity()">
  <span>cantidad </span>
  <span>{{ product().quantity }}</span>
</button>
```

```TS
/* parent.component.ts */

import { Component, signal } from '@angular/core';
import { ProductChildrenComponent } from './product-children.component';
import { IProduct } from './product.interface';

@Component({
  selector: 'app-parent',
  imports: [ProductChildrenComponent],
  templateUrl: './parent.component.html',
})
export class ParentComponent {
  products = signal<IProduct[]>([
    { id: 1, name: 'producto 1', quantity: 100 },
    { id: 2, name: 'producto 2', quantity: 200 },
    { id: 3, name: 'producto 3', quantity: 300 }
  ])

  incrementQuantity(productId: number): void {
    this.products.update((currentProducts: IProduct[]) =>
      currentProducts.map((product: IProduct) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }

        return product;
      }),
    );
  }
}
```

```HTML
<!-- parent.component.html -->

@for (item of products(); track item.id) {
  <app-product-children
    [product]="item"
    (onIncrementQuantity)="incrementQuantity($event)">
  </app-product-children>
}
```
