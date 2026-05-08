# 🅰️ Angular 20 + Prime NG 20 + Tailwind 4 + Sass

usar Node JS 24.11.1

## 📦 Instalar paquetes

```javascript
npm i
```

## ▶️ Ejecutar proyecto

Para mejorar rendimiento de ejecución de comandos y especificar el entorno de ejecución del proyecto se debe usar `node --run` en lugar de `npm run` o `npm start`.

| comando                | apunta a... | ruta archivo                                |
| ---------------------- | ----------- | ------------------------------------------- |
| node --run start:local | local host  | `src/environments/environment.localhost.ts` |
| node --run start:prod  | producción  | `src/environments/environment.prod.ts`      |
| node --run start:test  | pruebas     | `src/environments/environment.test.ts`      |

## 🚀 Generar build (dist) para desplegar

| comando               | apunta a... | ruta archivo                           |
| --------------------- | ----------- | -------------------------------------- |
| node --run build:test | pruebas     | `src/environments/environment.test.ts` |
| node --run build:prod | producción  | `src/environments/environment.prod.ts` |

## 📁 Estructura del Proyecto


```txt
src/
├── app/
│   ├── app.routes.ts → Definición de rutas (URL)
│   │
│   ├── auth/ → Rutas de autenticación
│   │   ├── assign-password/ → Recuperar y cambiar la contraseña
│   │   ├── login/ → Iniciar sesión
│   │   ├── recover-password/ → Enviar correo para recuperar contraseña
│   │   └── register/ → Formulario de registro de nuevo usuario
│   │
│   ├── home/ → Contiene todas las rutas y componentes después de iniciar sesión
│   │   └── bots/ → Define la ruta inicio/bots, es una feature
│   │       ├── bots.component.html
│   │       └── bots.component.ts
│   │
│   └── layout/ → Componentes de maquetación generales
│       ├── breadcrumbs/ → Componente con migas de pan
│       ├── error-404-non-existent-path/ → Componente para URLs inexistentes
│       ├── home/ → Contenedor principal de la aplicación después del login
│       ├── loader/ → Componente de carga (loading spinner)
│       └── menu/ → Componente de menú
│
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
├── shared/ → utilidades compartidas (globales) que se pueden usar en cualquier parte de la web
│   ├── guards/
│   │   └── auth.guard.ts → protección de rutas de todos los componentes que estan despues de loguearse en la URL /inicio/...
│   │
│   ├── models/ → contiene tipos de datos y constantes globales
│   │   ├── constants/
│   │   ├── interface/
│   │   ├── enums/
│   │
│   ├── service/
│   │ ├── general-service/
│   │ │ └── http-async-await.service.ts → Clase para peticiones HTTP usando async/await
│   │ │ └── http-observable.service.ts → Clase para peticiones HTTP usando Observables
│   │ │
│   │ └── RxJS-BehaviorSubject/ → Archivos con RxJS BehaviorSubject ()
│   │ └── layout/ → BehaviorSubject para maquetación
│   │   └── loader.service.ts → estado global para ocultar y mostrar icono de cargando
│   │   └── viewport-width.service.ts → devuelve un numero con el ancho del viewport (pantalla),
│   │   └── current-route.service.ts → devuelve un string con la ruta actual 
│   │
│   ├── utils/
│   │ ├── class/
│   │ │ ├── notification/ → carpeta con funciones para mostrar mensajes emeergentes
│   │ │ │ └── HotToastClass.utils.ts → Notificaciones tipo toast
│   │ │ │ └── SweetAlertClass.utils.ts → Modal con SweetAlert2
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
│   ├── _reset-CSS.scss → elimina los estilos por defecto del navegador para asegurar una apariencia uniforme en todos los navegadores
│   ├── _scroll-bar.scss → estilos globales de barra de scroll
│   ├── _table.scss → estilos globales para tablas
│   └── _variables.scss → variables globales de Sass
```

## 📅 Fechas

Usar la librería **Luxon** para el manejo de fechas. **NO** usar `new Date()` **NI** librerías como Moment.js.

Esto se debe a que:

* `new Date()` tiene comportamientos inconsistentes entre zonas horarias.

* `new Date()` Es difícil de formatear y manipular de forma segura.

* `new Date()` No maneja bien timezones ni conversiones complejas.

* [Moment.js está en modo legacy/deprecado y ya no se recomienda para proyectos modernos.](https://momentjs.com/docs/#/-project-status/)

* Luxon ofrece una API más clara, moderna y robusta para fechas, tiempos y zonas horarias.

En `src\shared\utils\class\LuxonClass.utils.ts` hay funciones para el manejo (formateo) de fechas usando Luxon.

***❌ Incorrecto***

```ts
/* new Date() */

const now = new Date();
const formatted = now.toLocaleDateString();
```

```ts
/* moment.js */

import moment from 'moment';

const today = moment().format('YYYY-MM-DD');
```

***✅ Correcto***

```ts
import { DateTime } from 'luxon';

const now = DateTime.now();
const formatted = now.toFormat('yyyy-MM-dd');
```

## 💅 Maquetación

### ¿Cómo usar Tailwind y Sass juntos?

***❌ Incorrecto:***

Todos los componentes de Angular **NO** pueden tener archivos de Sass ni CSS con `styleUrls`,

Mezclar Sass y Tailwind en un mismo componente es mala práctica porque los estilos de Sass y Tailwind se sobrescriben debido a la especificidad, herencia y cascada de CSS.

**❌ Ejemplo incorrecto:**

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

<button id="btn-guardar" class="bg-red-600">
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

Sass para estilos globales en `src/style/global/...`

Tailwind para estilos especificos de cada componente en `src/app/...` y `src/shared/components/...`

**✅ Ejemplo Correcto de Sass global:**

```scss
/* src/style/global/__scroll-bar.scss */

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

**✅ Ejemplo Correcto de Tailwind:**

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

<button className="bg-red-600">
  Guardar
</button>
```

### 🧱 Configuración de Tailwind 4

[Igual que como se muestra en la documentacion](https://tailwindcss.com/blog/tailwindcss-v4#css-first-configuration)

En este proyecto se está utilizando **Tailwind CSS V4**, por lo tanto el archivo `tailwind.config.js` ya no se utiliza y se considera **obsoleto** en esta arquitectura.

La configuración de Tailwind ahora se realiza en el archivo `src/style/global/library/tailwind.css`

Esto permite centralizar la definición de tokens de diseño (colores, media queries, etc.) sin necesidad de configuración en archivo JavaScript.

***❌ Incorrecto (Tailwind v3 con configuración antigua)***

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

***✅ Correcto (Tailwind 4)***

```CSS
/* src/style/global/library/tailwind.css */

@theme {
  --color-primary-color: #FF0000;
}
```


### 🎨 Variables de Colores Tailwind y Sass

Las variables con nombres de los colores de **Sass** en `src/style/global/_variable.scss` y **Tailwind** en `src/style/global/library/tailwind.css` tienen que ser exactamente los mismos

Esto garantiza que los colores sean los mismos entre los estilos globales definidos en Sass y los estilos de cada componente definidos con Tailwind.

Ejemplo:

En Sass y Tailwind ambos colores tienen exactamente el mismo nombre `primary-color` y son el mismo color rojo `#FF0000`

```scss
/*
src/style/global/_variable.scss

colores de Sass */

$primary-color: #FF0000;
```

[Documentaciógrn de variables de Tailwind 4](https://tailwindcss.com/blog/tailwindcss-v4#css-theme-variables)

```CSS
/*
src/style/global/library/tailwind.css

colores de Tailwind */

@theme {
  --color-primary-color: #FF0000;
}
```

## 🔀 Enrutado

El nombre de las carpetas dentro de `src/app` tiene que coincidir exactamente con las rutas definidas en `src/app/app.routes.ts`

Esto permite ubicar los componentes que corresponden a cada URL

Además, todas las páginas protegidas de la aplicación deben ser `children` de `HomeComponent`.

***✅ Correcto:***

```txt
src/app/
├── home/
│   ├── home.component.ts
│   │
│   └── bots/
│       └── bots.component.ts
```

```ts
/* src/app/app.routes.ts */
import { Routes } from "@angular/router";
import { AuthGuard } from "@/shared/guards/auth.guard";

import { HomeComponent } from "@/app/home/home.component";
import { BotsComponent } from '@/app/home/bots/bots.component';

export const routes: Routes = [
  {
    path: "inicio",
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "bots",
        component: BotsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];
```

En este ejemplo:

- La URL `/inicio/bots` coincide con la estructura `src/app/home/bots`

- `BotsComponent` es hijo de `HomeComponent`

- `AuthGuard` protege automáticamente todas las rutas hijas gracias a `canActivateChild`

## 🧩 Organización de componentes

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

### Diferencia entre `src/app/bots/components` y `src/shared/components`

* `src/app/bots/components` contiene componentes exclusivos de la funcionalidad (feature) `bots`

* Estos componentes no deben reutilizarse globalmente porque pertenecen únicamente a esa página o *feature*

* `src/shared/components` contiene componentes reutilizables en toda la aplicación

* Los componentes compartidos deben ser genéricos y desacoplados de una funcionalidad específica

## 🌐 Consumo de API

En este proyecto todas las peticiones HTTP deben hacerse usando el servicio centralizado `src\shared\service\general-service\http-observable.service.ts`, que maneja:
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

### ❌ Forma incorrecta

No se debe consumir la API directamente con `HttpClient` + `try/catch` en componentes o servicios externos.

**NO** es necesario escribir `try/catch` porque la clase `http-observable.service.ts` ya se encarga de manejar los errores.

❌ Problemas de este enfoque:

* Repite lógica en cada componente.

* No tiene loader global.

* No tiene manejo estandarizado de errores.

* No respeta arquitectura del proyecto.

* Usa `try/catch` en cada llamada.

* No centraliza validaciones ni logging.

#### ❌ Ejemplo incorrecto con `lastValueFrom`

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

#### **❌ Ejemplo incorrecto con `firstValueFrom`**

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

#### **❌ Ejemplo incorrecto (Angular legacy con `toPromise()`)**

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

#### **❌ Ejemplo incorrecto con observable**

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

#### **❌ Ejemplo incorrecto con `fetch`**

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

### ✅ Forma correcta

Se debe usar únicamente el HttpService centralizado.

* NO usar `try/catch` aquí

* El servicio `http-observable.service.ts` ya maneja errores internamente

#### **✅ Ejemplo correcto con `http-observable.service.ts` y  `firstValueFrom`**

```ts
import { inject } from '@angular/core';
import { HttpService } from '@/shared/service/general-service/http-observable.service';
import { IResponse } from '@/shared/service/general-service/types/request-data.types';
import { environment } from '@/environments/environment';

export class BotsComponent {

  http = inject(HttpService);

  async getBots() {
    const { success, status, message, data }: IResponse = await firstValueFrom(
      this.http.POST(`${environment.api}`, optionsApi)
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

## ⏳ Icono de Loader Global

El icono de carga se oculta y muestra automáticamente desde `http-observable.service` y `loader.service.ts` cuando se realizan peticiones HTTP.

👉 **NO se debe crear estados manuales como `loader = true/false` en los componentes**, ya que el loader es global y centralizado.

***❌ Ejemplo incorrecto***

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

* Cuando hay varias peticiones HTTP en un mismo componente se vuelve muy complejo saber cuando mostrar y ocultar el icono de cargando

#### **✅ Ejemplo correcto con `http-observable.service.ts`**

```ts
import { inject } from '@angular/core';
import { HttpService } from '@/shared/service/general-service/http-observable.service';
import { IResponse } from '@/shared/service/general-service/types/request-data.types';
import { environment } from '@/environments/environment';

export class BotsComponent {

  http = inject(HttpService);

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

## ⚙️ Configuración de peticiones HTTP (`IRequestOptions`)

En este proyecto todas las peticiones realizadas con `http-observable.service.ts` pueden configurarse mediante la interfaz `IRequestOptions`.

Esto permite estandarizar el comportamiento de las llamadas HTTP sin repetir lógica en los componentes.

---

### 📦 ¿Qué permite configurar?

```ts
/* src\shared\service\general-service\types\request-data.types.ts */

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


## ❌ Angular legacy VS ✅ Angular moderno

- Usar standalone para importar librerias y componentes, en este proyecto _NO_ existe app.module.ts
