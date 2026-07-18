![logo-angular](./docs/readme-md/img/logo-angular.png)

---

# 🅰️ Stack Frontend del Proyecto
A continuación se resumen las principales tecnologías del proyecto y el motivo por el que se utilizan. No se incluyen todas las dependencias.

* Node.js 24.18.0

* [**Angular 22:**](https://cursos.devtalles.com/courses/angular-moderno) _Framework opinionado_, excelente para proyectos grandes, aplicaciones complejas y formularios complejos. Desde la versión 17 hasta la 22 ha incorporado cambios importantes, como los _Signals_ (_reactividad_) y las nuevas _directivas de control_ de flujo _`@for`_, _`@if`_, _`@switch`_, _`@case`_.

* [**TypeScript 6:**](https://youtu.be/fUgxxhI_bvc?si=rRY7NTzsONRSwyNN) Agrega _tipado estático_ al lenguaje, permitiendo detectar errores durante el desarrollo y mejorar el _autocompletado_, la _refactorización_ y el _mantenimiento del código_. Además, permite tener el mismo lenguaje de programación en frontend y backend.

* [**Luxon 3:**](https://moment.github.io/luxon/) Corrige los errores de _`new Date()`_ de JavaScript y y tiene una API muy completa para manejo de fechas.

* [**CSS:**](https://youtu.be/K3xmRF8ab1o?si=w1Ox_P5e2R934Xby) _`@layer`_ resuelve problemas de _especificidad_ y _cascada_ al controlar el orden de prioridad entre las _capas_, reduciendo la necesidad de usar _`!important`_. Además, CSS ha alcanzado un alto nivel de madurez e incorpora _CSS Nesting_, equivalente al _anidamiento de Sass_, y _Custom Properties_, equivalentes a las _variables de Sass_. En este proyecto se usa en _estilso globales_.

* [**Tailwind CSS 4:** ](https://youtu.be/R5EXap3vNDA?si=9TV4hucexfUBXgGk) Usa _clases utilitarias_ para aplicar estilos, evitando la mayoría de los problemas de _especificidad_, _herencia_ y _cascada_ de CSS. En este proyecto se usa en _estilos de los componentes_.

* [**Spartan ng:**](https://spartan.ng/components) Tiene una lista de _componentes UI_ muy completa, con integración nativa para estilos de _Tailwind_, _Signal Forms_ de Angular moderno, y _Luxon_ para fechas. Además, al no ser totalmente _headless_, tiene estilos por defecto que son fáciles de personalizar sin recurrir a _hacks de CSS_ como _`::ng-deep`_ o _`!important`_.

* [**Zod 4:**](https://youtu.be/bUzGfrjg66M?si=PqQtfsXKDVA0HnuP) Permite utilizar la misma _sintaxis de código_ y reutilizar los mismos _esquemas de validación_ en frontend y backend. Además, se integra con _TypeScript_, ofrece validación de tipos en _tiempo de compilación_ y validación de datos en _tiempo de ejecución (runtime)_. En _frontend_ valida _formularios_ y _datos de entrada_, con excelente integración con _React Hook Form_ (_React_) y _Forms with Signals_ (_Angular_). En _backend_ valida _`body`_, _`query`_ y _`params`_ de las _solicitudes http_, garantizando la integridad de los datos antes de procesarlos.

* [**Material Symbols Icons:**](https://fonts.google.com/icons) Contiene iconos para todo. Sus estilos se pueden personalizar con _Tailwind_.

> [!TIP]
> # 🎥 **Aprende**
>
> Puedes hacer clic en el nombre de cada tecnología para ver cursos y aprenderlas

# ⚙️ Configurar lo Siguiente **UNA SOLA VEZ**

## 🛠️ Antes de Empezar
Para que la configuración funcione, debes tener instalado:
* [VS Code](https://code.visualstudio.com/) o cualquier editor basado en VS Code ([Antigravity IDE](https://antigravity.google/product/antigravity-ide), [Cursor](https://cursor.com/get-started), Windsurf, etc.)

* [Git Bash](https://youtu.be/niPExbK8lSw?si=tHx4IYZBdrUmW6ey)

* [Node.js](https://nodejs.org/)

* [Claude Code](https://youtu.be/Bf7hfpItrDk?si=5pW919OUbtSqJlyP)

* [pnpm](https://pnpm.io/installation)

* [fnm](https://github.com/Schniz/fnm)

> [!TIP]
> # ⚡ **Empieza de inmediato**
>
> 👍 Si quieres empezar a programar con IA sin perder tiempo configurando herramientas, utiliza **Claude Code**. Este proyecto ya incluye las configuraciones de **MCP**, **Skills**, **Rules** y `AGENTS.md` listas para usar.
>
> 👎 Si prefieres otra IA, deberás configurar manualmente sus funcionalidades equivalentes según la forma en que esa herramienta las implemente.

## Instalar `pnpm`
1. Abrir Git Bash

2. Instalar:

```console
npm install -g pnpm@latest-11
```

3. Cerrar y volver abrir Git Bash

4. Si la instalacion es correcta, al ejecutar

```console
pnpm -v
```

Debe mostrar la version de `pnpm` instalada

## `fnm`
Para que `fnm` automáticamente al entrar a la carpeta del proyecto seleccione la versión correcta de Node.js que se especifica en el archivo `.nvmrc` que esta en la raiz del proyecto. Hacer esto:

1. Abrir Git Bash.

2. Instalar Node.js 24.18.0:

```console
fnm install 24.18.0
```

3. Copiar completo el siguiente comando y ejecutarlo:

```console
echo 'eval "$(fnm env --use-on-cd)"' >> ~/.bashrc
source ~/.bashrc
```

4. Cerrar y volver abrir Git Bash

5. Para verificar que funcione ejecutar los siguientes comandos en el siguiente orden:

```console
cd /ruta/a/tu/proyecto
```

```console
fnm current
```

```console
node -v
```

6. Debería mostrarte `v24.18.0` automáticamente, sin que hayas escrito manualmente

```console
fnm use 24.18.0
```

## ⌨️ Autocompletado, Formatear Código y Linter
Usar VS Code o cualquier editor basado en VS Code (Antigravity, Cursor, Windsurf, etc.) para instalar las siguientes extensiones:

* [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

* [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)

* [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

* [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

* [Console Ninja](https://marketplace.visualstudio.com/items?itemName=WallabyJs.console-ninja)

* [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)

* [Angular Snippets (Version 18)](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2)

* [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)

* [Auto Import](https://marketplace.visualstudio.com/items?itemName=steoates.autoimport)

* [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)

* [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)

No es necesario buscar cada extensión manualmente en el marketplace: el archivo `.vscode/extensions.json` ya está configurado con esas extensiones como recomendadas. Al abrir el proyecto, el editor mostrará una notificación sugiriendo instalarlas; también puede instalarlas desde la pestaña **Extensions** filtrando por `@recommended`.

La configuración de autocompletado, formateo de código y linter ya está incluida en los siguientes archivos. No es necesario realizar modificaciones adicionales:

* `.vscode/`
* `.editorconfig`
* `.prettierrc`
* `eslint.config.js`

# ⚙️ Entorno de Ejecución
Obligatorio el uso de Node.js, prohibido usar alternativas como:

* Bun
* Deno

# 📦 Manejador de Paquetes
Obligatorio el uso de `pnpm`, `pnpm-lock.yaml` y `pnpm dlx <paquete>` version `>=11.0.0 <12.0.0`. Esta 🚫 **BLOQUEADO** el uso de otras alternativas como:

| Concepto ⬇️ / Nombre gestor de paquetes ➡️               | `npm`                                   | `yarn`                              |
| --------------------------------------------------------- | --------------------------------------- | ----------------------------------- |
| Lockfile                                                  | `package-lock.json`                     | `yarn.lock`                         |
| Ejecutar un paquete temporal (sin instalarlo globalmente) | `npx <paquete>`<br>`npm exec <paquete>` | `yarn dlx <paquete>` *(Yarn Berry)* |

# 🟢 Administrador de Versiones para Node.js
Obligatorio el uso de `fnm`. Está prohibido usar alternativas como:

* nvm
* volta

Este proyecto usa Node.js 24.18.0

# 🏷️ Alias
Para todos los comandos de `pnpm` usar el alias `pn`

# 📦 Instalar Paquetes

```console
pn i
```

# ▶️ Scripts de desarrollo

| Comando          | Entorno      | Archivo de configuración                    |
| ---------------- | ------------ | ------------------------------------------- |
| `pn start:local` | Local host   | `src/environments/environment.localhost.ts` |
| `pn start:test`  | Pruebas      | `src/environments/environment.test.ts`      |
| `pn start:prod`  | Producción   | `src/environments/environment.prod.ts`      |

# 🚀 Generar build (dist) para Desplegar

| Comando         | Entorno      | Archivo de configuración               |
| --------------- | ------------ | -------------------------------------- |
| `pn build:test` | Pruebas      | `src/environments/environment.test.ts` |
| `pn build:prod` | Producción   | `src/environments/environment.prod.ts` |

# Arquitectura del Proyecto

> [!TIP]
> # 🧠 **Aprende antes de pedir cambios**
>
> No te limites a pedirle a la IA *"hazme X"* sin entender cómo funciona la arquitectura del proyecto.
>
> Hazle preguntas a la IA sobre:
>
> 1. `AGENTS.md`
> 2. `.claude/skills/***`
> 3. `.claude/rules/***`
> 4. Los **"🔗 Enlaces"**
>
> Hasta comprender cómo funciona el proyecto.
>
> Aunque es un texto largo, aprenderás la arquitectura, buenas prácticas y a detectar revisando el código, cuando la IA alucina

# 🤖 Uso de IA

> [!CAUTION]
> # ⚠️ **IMPORTANTE** 🚨
>
> ****Ignorar esta sección ocasionará que la IA genere código que no respeta la arquitectura, estructura ni las convenciones del proyecto, produciendo código legacy, inconsistente, desordenado y con malas practicas****

## Principales IA para Desarrollo de Software

| Empresa ↓ \ Plataforma → | Web                                                                                     | Desktop                                                               | Terminal / Bash / CLI                                              |
| ------------------------ | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Anthropic                | [Claude Web](https://claude.ai/)                                                        | [Claude Desktop](https://youtu.be/DYwZy7VNKws?si=cXTPumpZ3Jr9rNn9)    | [Claude Code](https://youtu.be/Bf7hfpItrDk?si=wjUIcIgtDX_Loyey)    |
| Open AI                  | [Chat GPT](https://chatgpt.com/)                                                        | [GPT Codex Desktop](https://youtu.be/bgx8ownl3O4?si=TzbOntfYIBVN1PGU) | [Codex](https://youtu.be/Ub-K1n4YYsg?si=EoIXGCzEa4ZxyRqA)          |
| Google                   | [Google AI Studio](https://aistudio.google.com/) / [Gemini](https://gemini.google.com/) | [Antigravity 2.0](https://antigravity.google/product/antigravity-2)   | [Antigravity CLI](https://youtu.be/bdEqIchP4x4?si=gRf6iLggXuzy_cq) |
| Anomaly Innovations      | [`opencode web`](https://opencode.ai/docs/web/)                                         | [Open Code Desktop](https://youtu.be/_SVSv2Y59P0?si=LT2S0z10t1FBxlB6) | [Open Code CLI](https://youtu.be/2gO8WyctqMk?si=aNvHlf23tKfrN-Z3)  |
| Cursor                   | [Cursor Web](https://cursor.com/agents)                                                 | [Cursor Desktop](https://youtu.be/XWsOQTqVl0w?si=0OVGRnYSCH46v2zf)    | [Cursor CLI](https://cursor.com/es/cli)                            |

# [🔗 Enlace - Benchmark de IA](https://artificialanalysis.ai/)

## ✏️ Edición de Código
Este proyecto esta configurado para usar _IAs de pago y desde la terminal_. **NO** sirve si usas IAs gratis o desde una pagina web, porque estan limitadas.

**Razones:**
* Si copias y pegas codigo desde plataforma web al proyecto, es probable que cometas errores

Las IAs de pago y desde la terminal tienen mejoras respecto a otras plataformas:

* Mayor comprensión del proyecto y de la estructura completa del código (_contexto_ y _tokens_).

* Acceso al sistema operativo (archivos y carpetas) y capacidad para ejecutar comandos.

* Capacidad para realizar cambios respetando la arquitectura del proyecto.

* Uso de Skills y MCP para reducir las _alucinaciones_ de la IA, permitiéndole a la IA consultar documentación oficial actualizada y seguir buenas prácticas.

# [🔗 Enlace - Prompts para Desarrollo Full Stack con IA](https://github.com/DanielPinedaM/prompt-engineering/tree/main/2_prompts-full-stack)

# 🅰️ Configurar Angular para que Funcione con IA
Estas configuraciones ya estan listas para funcionar. Solo debes seguir los pasos a continuación para verificar que funcionen correctamente.

# `AGENTS.md`
Contiene instrucciones que se inyectan SIEMPRE en cada prompt, para que la IA respete arquitectura del proyecto.

# Skills

## 🌿 `git-commit`
Por cada feature terminada hacer un commit antes de solicitar nuevas modificaciones a la IA. Evita acumular demasiados cambios, ya que puedes perder el contexto de lo que la IA está realizando y cometer errores.

Trabajar bajo el principio:

> 1 commit = 1 feature

El skill `.claude\skills\git-commit\SKILL.md` te permite realizar commits.

***Ejemplos:***

```console
/git-commit
```

```console
hacer commit y push
```

# MCP

## angular-cli MCP para que Claude Code Acceda a la Documentación Oficial de Angular
1. Abrir Git Bash

2. Abrir la carpeta del proyecto
```console
cd /ruta/a/tu/proyecto
```

3. Iniciar claude
```console
claude
```

4. Seleccionar la opcion
```txt
2. Use this and all future MCP servers in this project
```

5. En el archivo `.mcp.json` ya esta configurada la conexion al MCP

6. Para verificar conexión al MCP, ejecutar:
```console
!claude mcp list
```

La salida de la terminal debe ser:
```console
angular-cli: pnpm dlx @angular/cli mcp - ✔ Connected
```

```console
/mcp
```

La salida de la terminal debe ser:
```console
❯ angular-cli · ✔ connected · 9 tools
```

Ejecutar este prompt:
```console
usar search_documentation de angular-cli MCP para citar textualmente la definición de Forms with signals
```

La salida de la terminal debe incluir:
```console
Called angular-cli
```

> [!NOTE]
> **NO** debes hacer lo siguiente porque ya esta configurado
>
> Este comando instala el MCP de `angular-cli` con el `--scope project`. Es decir, configura el MCP para que se ejecute únicamente en este proyecto y pueda compartirse con el resto del equipo mediante Git.
>
> ```bash
> !claude mcp add angular-cli --scope project -- pnpm dlx @angular/cli mcp
> ```

# [🔗 Enlace - Tools del angular-cli MCP](https://angular.dev/ai/mcp)


## Diferencia Entre Angular MCP y X
X es para UI

angular-cli es para conecptos de angular

## Ejemplos de ¿Como Usar IA en este Proyecto?
**Iniciar tutorial paso a paso:**
```txt
usar ai_tutor de angular-cli MCP para explicarme Forms with signals
```

**Refactorizar:**
```txt
usar get_best_practices de angular-cli MCP para refactorizar el componente que esta en la ruta src/***
```

**Migrar a Signals:**
```txt
usar search_documentation de angular-cli MCP para migrar a signals el componente que esta en la ruta src/***
```

**Crear una nueva feature:**
```txt
usar search_documentation y get_best_practices de angular-cli MCP para crear un nuevo componente en src/*** que contenga Form with signals usando spartan ui. Con los siguientes campos:
- nombre: tipo string, minimo 5 caracteres

- celular: tipo number, minimo 10 caracteres
```

# 📁 Estructura Base del Proyecto
La estructura de carpetas definida a continuación **no representa la totalidad completa del proyecto**, representa la **arquitectura base de referencia**.

Esta arquitectura define el patrón estructural que toda la aplicación debe seguir, independientemente del crecimiento del proyecto o la incorporación de nuevas features.

Es la guía principal que determina cómo se organiza el código, no una lista exhaustiva de todos los archivos existentes.

```txt
src/
├── assets/
│   ├── icon/ → Iconos del proyecto
│   └── img/ → Imágenes del proyecto
│
├── environments/ → variables de entorno
│   ├── data-types/
│   │   └── interfaces/
│   │       └── environment.interface.ts → Tipos de datos de las variables de entorno
│   │
│   ├── environment.localhost.ts → Variables de entorno de local host (desarrollo)
│   ├── environment.prod.ts → Variables de entorno de producción
│   └── environment.test.ts → Variables de entorno de pruebas
│
├── app/
│   ├── app.routes.ts → Definición de rutas (URL)
│   │
│   └── features/ → Contiene todas las rutas y componentes después de iniciar sesión
│       ├── auth/ → Rutas de autenticación
│       │   ├── assign-password/ → Recuperar y cambiar la contraseña
│       │   ├── login/ → Iniciar sesión
│       │   ├── recover-password/ → Enviar correo para recuperar contraseña
│       │   ├── register/ → Formulario de registro de nuevo usuario
│       │   └── data-types/ → tipos de datos, contratos, constantes y definiciones utilizados exclusivamente por auth
│       │       ├── constants/
│       │       └── interfaces/
│       │
│       └── bots/ → Feature independiente que define la ruta `/bots`.
│           ├── bots.component.html
│           ├── bots.component.ts
│           │
│           ├── data-types/ → tipos de datos, contratos, constantes y definiciones utilizados exclusivamente por la feature bots. Pueden representar conceptos de negocio específicos de la feature, por lo que no deben utilizarse desde otras features
│           │   ├── constants/
│           │   ├── interfaces/
│           │   ├── enums/
│           │   └── types/
│           │
│           ├── components/ → componentes reutilizables internos de la feature bots. Pueden contener lógica, dependencias y acceso a servicios de esta feature. Su alcance está limitado a bots y no deben utilizarse desde otras features
│           │
│           ├── ui/ → componentes visuales reutilizables utilizados únicamente por la feature bots. Están enfocados en la presentación de la interfaz y deben mantenerse desacoplados de la lógica de negocio
│           │
│           └── services/ → servicios, lógica de negocio y gestión de estado utilizados únicamente por la feature bots. Pueden depender de modelos, reglas de negocio y casos de uso específicos de la feature. Su alcance está limitado a bots y no deben utilizarse desde otras features.
│               └── stores/ → estados compartidos por los componentes de la feature bots. Su alcance está limitado a esta feature y no debe utilizarse para compartir estado con otras features ni para estado global de toda la aplicación
│
├── core/ → INCOMPLETO - me falta definir esta carpeta
│
├── shared/ → utilidades compartidas (globales), totalmente agnosticas a la logica de negocio/domio que se pueden usar en cualquier parte de la web
│   ├── guards/
│   │   └── auth.guard.ts → protección de rutas de todos los componentes que estan despues de loguearse
│   │
│   ├── design/ → componentes relacionados con la maquetacion (presentación)
│   │   ├── layouts/ → contenedores que definen la estructura visual y de navegación de una sección completa de la aplicación
│   │   │   └── main-wrapper/ → contenedor principal de paginas despues de loguearse
│   │   │
│   │   └── ui/ → componentes visuales reutilizables que representan partes aisladas de la interfaz, no páginas ni estructuras de navegación completas
│   │       ├── menu/ → Componente de menú
│   │       └── spartan-ng/ → componentes helm de Spartan NG (`@spartan-ng/*`), la capa con estilos Tailwind construida sobre `@spartan-ng/brain/*`
│   │           ├── overlay/ → componentes que se superponen al contenido (alert-dialog, dialog, drawer, dropdown-menu, popover, sheet, toast/sonner, tooltip)
│   │           ├── form/ → controles de formulario y sus dependencias, agrupados por el tipo de interacción
│   │           │   ├── action/ → dispara una acción, no captura un valor del formulario (button)
│   │           │   ├── date/ → selección de fechas (calendar, date-picker)
│   │           │   ├── selection/ → elegir entre opciones predefinidas (checkbox, combobox, radio-group, select, switch)
│   │           │   └── text/ → entrada de texto libre y su etiqueta (input, input-group, label, textarea)
│   │           ├── navigation/ → componentes de navegación (accordion, pagination, tabs)
│   │           ├── data-display/ → componentes de presentación de datos (carousel, data-table)
│   │           └── utils/ → NO es un componente: expone la función `hlm()` para combinar clases de Tailwind, usada por todas las categorías
│   │
│   ├── services/ → servicios reutilizables de alcance global que pueden ser utilizados por múltiples features de la aplicación. Encapsulan lógica transversal, infraestructura, acceso a APIs, utilidades técnicas y gestión de estado compartido. No deben depender de reglas de negocio específicas de una feature.
│   │   ├── Crypto.service.ts → Encriptar y desencriptar texto y objeto literal usando crypto-js
│   │   ├── DataType.service.ts → funciones para tipos de datos de JS, ejemplo normalizar string
│   │   ├── DownloadFile.service.ts → funciones para descargar y ver archivos
│   │   ├── Luxon.service.ts → funciones para fechas usando Luxon
│   │   ├── SessionStorage.service.ts → manejo de `sessionStorage`, codifica y decodifica en Base64 y realiza conversión automática de tipos de datos (string, number, boolean, null, undefined, array y object) al guardar y recuperar la información.
│   │   └── Toast.service.ts → notificaciones tipo toast
│   │
│   └── http-client/ → infraestructura centralizada de HTTP: interceptors, normalización de respuestas, logging y loader global
│       ├── data-types/
│       │   └── interfaces/
│       │       └── http-client.interface.ts → contrato ApiResponse<T>: estructura estándar de respuesta de la API (success, status, message, data)
│       │
│       ├── interceptors/
│       │   ├── headers/ → interceptors que asignan headers HTTP de forma dinámica y agnóstica al dominio (no dependen de la lógica de negocio de ninguna feature)
│       │   │   ├── accept.interceptor.ts → asigna dinámicamente el header Accept en cada petición HTTP
│       │   │   └── content-type.interceptor.ts → asigna dinámicamente el header Content-Type en cada petición HTTP
│       │   │
│       │   ├── timeout.interceptor.ts → aplica tiempo máximo de 1 minuto por petición; si se supera, aborta y emite respuesta sintética con status 408
│       │   └── with-credentials.interceptor.ts → agrega withCredentials a cada petición HTTP; excluye los endpoints de la constante URLS_WITHOUT_CREDENTIALS
│       │
│       ├── response/ → normalización y manejo de respuestas HTTP (éxito y error) al contrato ApiResponse<T>
│       │   ├── success.interceptor.ts → intercepta respuestas HTTP exitosas y las normaliza al contrato ApiResponse<T>
│       │   │
│       │   └── error-handling/ → manejo de respuestas HTTP erróneas, separado por responsabilidad única (SRP)
│       │       ├── error.interceptor.ts → captura errores HTTP, delega el manejo global, normaliza al contrato ApiResponse<T>, loguea y "se traga" el error (nunca lo propaga con throw)
│       │       │
│       │       └── services/
│       │           ├── global-error-handler.service.ts → orquestador: según el código de estado delega en el handler correspondiente (401, 403, 404, 429, 5xx)
│       │           ├── error-handler-helper.service.ts → helpers de navegación compartidos entre los handlers (pathnameIsLogin, redirectToLogin, returnToBrowserHistory)
│       │           │
│       │           └── handlers/ → cada handler resuelve un único tipo de error HTTP (responsabilidad única)
│       │               ├── unauthenticated-error.handler.service.ts → status 401: redirige a /iniciar-sesion, oculta el loader y notifica con Toast
│       │               ├── forbidden-error.handler.service.ts → status 403: vuelve atrás en el historial y notifica "acceso denegado"
│       │               ├── not-found-error.handler.service.ts → status 404: loguea en consola y notifica un error genérico
│       │               ├── too-many-requests-error.handler.service.ts → status 429: loguea en consola y notifica que se espere antes de reintentar
│       │               └── server-error.handler.service.ts → status >= 500: loguea en consola y notifica un error genérico
│       │
│       ├── services/
│       │   ├── api-response-normalizer.service.ts → valida y normaliza todas las respuestas HTTP al contrato ApiResponse<T>; usado por success.interceptor, error.interceptor y timeout.interceptor
│       │   └── http-log.service.ts → logging por consola de peticiones HTTP (exitosas, erróneas y timeout); desactivable por petición con el token HTTP_LOG_ENABLED
│       │
│       └── loader/ → módulo que centraliza el icono de carga global (componente, interceptor y estado)
│           ├── design/
│           │   └── ui/
│           │       └── fixed-loader/
│           │           ├── fixed-loader.component.html → template del icono de carga con position: fixed centrado en pantalla
│           │           └── fixed-loader.component.ts → componente del icono de carga global
│           │
│           ├── interceptors/
│           │   └── loader.interceptor.ts → controla la visibilidad del loader con un contador de peticiones HTTP activas; desactivable por petición con el token SHOW_LOADER
│           │
│           └── services/
│               └── stores/
│                   └── loader.store.ts → estado global con signals para mostrar y ocultar el icono de carga
│
└── styles/
    └── global/
        ├── scss/
        │   ├── main.scss → con @use importa estilos .scss globales de toda la pagina web, NO debe contener estilos directos
        │   ├── _scroll-bar.scss → estilos globales de barra de scroll
        │   ├── _variables.scss → variables globales de Sass
        │   │
        │   └── buttons/ → estilos globales de botones organizados en archivos .scss composables que permiten combinar variantes, tamaños, estados y temas
        │       ├── index-buttons.scss → con @use importa estilos .scss para los botones, NO debe contener estilos directos
        │       ├── _base.scss → Reset CSS para botones
        │       ├── _effects.scss → utilidades visuales reutilizables para los botones: box-shadow, blur, elevation (sin lógica UI)
        │       ├── _modifiers.scss → alteran/extienden características de los botones sin sobrescribir sus estilos principales
        │       ├── _sizes.scss → Define el tamaño del botón mediante tokens basados en la escala de Tailwind CSS 4 para padding, font-size y line-height
        │       ├── _states.scss → estados de boton: hover, active, focus, disabled
        │       ├── _themes.scss → Define los temas de color del botón mediante CSS Custom Properties generadas a partir de _tokens.scss.
        │       ├── _tokens.scss → Define los tokens de diseño del sistema de botones mediante variables Sass (colores, tipografía, espaciado y escalas).
        │       ├── _mixins.scss → codigo de Sass que se repite en diferentes archivos de src\styles\global\scss\buttons
        │       └── _variants.scss → Variantes visuales (background, outline, ghost, link) que define la apariencia y comportamiento visual según el tipo de botón.
        │
        └── tailwind/ → Carpeta para configurar Tailwind 4
            ├── import.css → importar Tailwind
            ├── preflight.css → Reset CSS basado en Tailwind
            └── theme.css → variables de Tailwind
```

# Feature Architecture

Este proyecto utiliza **Feature Architecture** sobre Angular

La regla principal es:

* La lógica de negocio pertenece a una feature.

* El código agnóstico al negocio pertenece a `shared`.

Un archivo no debe moverse a `shared` únicamente porque se reutiliza en varias `features`

La reutilización no convierte automáticamente un archivo en código compartido (`shared`)

# Regla de Ubicación de Archivos y Carpetas






> [!WARNING]
> # ***INCOMPLETO - verificar manualmente otra vez todo este readme md, para pasar readme md de next a angular***








# Diferencia entre `src/app/features` y `src/shared`

## `src/app/features`

Contiene código específico de una funcionalidad del sistema.

Todo archivo que conozca entidades, reglas, procesos o casos de uso del negocio debe permanecer dentro de la feature correspondiente.

La lógica de negocio nunca debe salir de su feature.

**Ejemplo:**
* `src/app/features/*/design/ui`: componentes visuales reutilizables únicamente dentro de la feature.

* `src/app/features/*/design/layouts`: layouts y contenedores utilizados exclusivamente por la feature.

* `src/app/features/*/guards`: guards con reglas de acceso o navegación específicas de la feature.

* `src/app/features/*/services`: servicios con lógica de negocio y funcionalidades propias de la feature.

* `src/app/features/*/services/stores`: gestión de datos propios de la feature.

## `src/shared`

Contiene únicamente código reutilizable y completamente agnóstico al dominio.

`shared` no puede conocer ninguna `feature`.

`shared` no puede contener reglas de negocio.

`shared` no puede contener componentes, servicios o lógica relacionados con usuarios, autenticación, productos, órdenes, dashboard o cualquier otro concepto del dominio.

**Ejemplo:**
* `src/shared/design/ui`: componentes visuales reutilizables globalmente.

* `src/shared/design/layouts`: layouts y contenedores reutilizables.

* `src/shared/guards`: guards reutilizables para control de navegación y acceso, sin lógica de negocio específica de las features

* `src/shared/services`: servicios con lógica reutilizable y utilidades compartidas entre múltiples features.

* `src/shared/services/api`: capa de acceso a APIs externas. Su única responsabilidad es realizar llamadas HTTP y centralizar la comunicación con servicios externos.

* `src/shared/services/stores`: estado global de toda la aplicación.

# Diferencia entre `components` y `ui`

## ui

`ui` contiene exclusivamente componentes de presentación y maquetación.

Los componentes de `ui` deben ser completamente agnósticos al dominio.

Un componente de `ui` no puede conocer logica de negocio, entidades del sistema ni casos de uso.

Su única responsabilidad es renderizar interfaz reutilizable.

## components

`components` contiene componentes con lógica de negocio específica de la feature donde están definidos.

Un componente pertenece a `components` cuando conoce el dominio, participa en un caso de uso o implementa comportamiento propio de la funcionalidad.

La lógica de negocio siempre pertenece a `components`, nunca a `ui`.

## Prohibido `src/shared/components`

La carpeta `src/shared/components` está prohibida.

`shared` representa código agnóstico al dominio.

`components` representa componentes con comportamiento funcional asociado a una feature.

Ambos conceptos son incompatibles.

Si un componente es agnóstico al dominio, pertenece a `shared/ui`.

Si un componente contiene lógica de negocio, pertenece a `src/app/features/*/components`.

Por esta razón **NO** debe exitir:

* `src/shared/components`
* `src/app/shared/components`
* `src/app/features/*/shared/components`.

Las únicas ubicaciones válidas para componentes compartidos es:
* `src/shared/design/layouts`

* `src/shared/design/ui`

# Diferencia entre `ui` y `layouts`

## ui

`ui` contiene exclusivamente componentes de presentación y maquetación reutilizables.

Su responsabilidad es renderizar interfaz.

Los componentes de `ui` deben ser completamente agnósticos al dominio y no pueden contener lógica de negocio, casos de uso ni conocimiento de entidades del sistema.

Un componente de `ui` **NO** debe actuar como contenedor principal de una pantalla o sección compleja.

****Ejemplos:****

* Button
* Modal
* Card

## layouts

`layouts` contiene contenedores padre reutilizables encargados de definir la estructura visual de páginas, secciones o flujos.

Su responsabilidad es organizar y componer componentes, proyectar contenido y establecer la distribución general de la interfaz.

Un layout puede contener múltiples componentes de `ui`, pero un componente de `ui` no debe asumir responsabilidades de layout.

****Ejemplos:****

* AuthLayout
* DashboardLayout
* HomeLayout

## Regla de ubicación

La ubicación depende del alcance de reutilización:

* Si el elemento pertenece únicamente a una feature, debe ubicarse en:
  * `src/app/features/*/design/ui`
  * `src/app/features/*/design/layouts`

* Si el elemento es reutilizable globalmente y no conoce ninguna regla de negocio, debe ubicarse en:
  * `src/shared/design/ui`
  * `src/shared/design/layouts`

La decisión de ubicar un archivo en `features` o `shared` depende de su conocimiento del dominio y alcance de reutilización, no de si es un `ui` o un `layout`.

# 🔀 Enrutado

El nombre de las carpetas dentro de `src/app` tiene que coincidir exactamente con las rutas definidas en `src/app/app.routes.ts`

Esto permite ubicar los componentes que corresponden a cada URL

Además,

**✅ Correcto:**

```txt
src/app/
├── features/
│     └── bots/
│         └── bots.component.html
│         └── bots.component.ts
```

```ts
/* src/app/app.routes.ts */
import { Routes } from "@angular/router";
import { AuthGuard } from "@/shared/guards/auth.guard";

// #region - contenedor principal de paginas despues de loguearse
import { MainWrapperComponent } from '@/shared/design/layouts/main-wrapper/main-wrapper.component';
// #endregion

import { BotsComponent } from "@/app/features/bots/bots.component";

export const routes: Routes = [
  {
    path: "",
    component: MainWrapperComponent,

    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],

    children: [
      {
        // /bots
        path: "bots",
        component: BotsComponent,
      },
    ],
  },
];
```

En este ejemplo:

- La URL `/bots` coincide con la estructura `src/app/features/bots`

- `BotsComponent` es hijo de `MainWrapperComponent`

- `AuthGuard` protege automáticamente todas las rutas hijas gracias a `canActivateChild`

# 🔒 Protección de Rutas

Todas las páginas protegidas de la aplicación deben ser `children` de `MainWrapperComponent`.

Los `children` de `MainWrapperComponent` son las rutas protegidas despues de que el usuario se loguea.

```ts
/* src/app/app.routes.ts */
import { Routes } from "@angular/router";
import { AuthGuard } from "@/shared/guards/auth.guard";

// #region - contenedor principal de paginas despues de loguearse
import { MainWrapperComponent } from '@/shared/design/layouts/main-wrapper/main-wrapper.component';
// #endregion

import { BotsComponent } from "@/app/features/bots/bots.component";

export const routes: Routes = [
  {
    path: "",
    component: MainWrapperComponent,

    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],

    children: [
      {
        // /bots
        path: "bots",
        component: BotsComponent,
      },
    ],
  },
];
```

# 📅 Fechas
1. **OBLIGATORIO** usar Luxon para el manejo de fechas y horas. **PROHIBIDO** utilizar `new Date()` nativo de JavaScript o cualquier otra librería diferente de Luxon.

2. En todos los componentes definidos en la sección **"Componentes Permitidos de Calendarios"**, toda su interfaz pública de fechas (`input()` y `output()`, como `dateChange`) es de tipo Luxon `DateTime`.

3. **OBLIGATORIO** usar los calendarios  para la selección de fechas definidos en "Componentes de Calendarios". **PROHIBIDO** usar cualquier otro componente de calendario, incluyendo el `<input type="date">` nativo de HTML.

4. **OBLIGATORIO** utilizar exclusivamente los componentes definidos en la sección **"Componentes Permitidos de Calendarios"** para la selección de fechas. **PROHIBIDO** utilizar cualquier otro componente de calendario, incluyendo la etiqueta`<input type="date">` nativa de HTML.

5. **OBLIGATORIO** mantener en zona horaria local el `DateTime` de Luxon que entra o sale de los componentes definidos en la sección **"Calendarios permitidos"**, a través de sus `input()` y `output()` (`date`, `dateChange`, etc.), ya que representan una fecha seleccionada por el usuario. **PROHIBIDO** convertir ese `DateTime` a UTC (`.toUTC()`) dentro del flujo de estos componentes. Si necesitas persistir un instante (por ejemplo, `createdAt`) o enviarlo en el **payload** al backend, convierte ese `DateTime` a UTC únicamente justo antes de persistirlo o incluirlo en el payload, nunca antes. **OBLIGATORIO** que ese valor viaje en el payload como un `string` en formato ISO 8601 UTC (`YYYY-MM-DDTHH:mm:ssZ`), por ejemplo: `2024-06-15T14:30:00Z`.

6. En `src/shared/services/Luxon.service.ts` existen funciones utilitarias reutilizables para el manejo y formateo de fechas y horas con Luxon. **OBLIGATORIO** reutilizarlas cuando cubran la necesidad. **PROHIBIDO** duplicar su funcionalidad. Estas funciones no contienen lógica de negocio.

## Componentes Permitidos de Calendarios

### `src\shared\design\ui\spartan-ng\form\date\calendar`
* `hlm-calendar`
* `hlm-calendar-range`
* `hlm-calendar-multi`

### `src\shared\design\ui\spartan-ng\form\date\date-picker`
* `hlm-date-picker`
* `hlm-date-picker-multi`
* `hlm-date-range-picker`

# 💅 Maquetación

## Componentes de interfaz (UI): uso y maquetación
Los componentes de Spartan NG están instalados en `src\shared\design\ui\spartan-ng`.

Spartan NG tiene dos capas:
* **`@spartan-ng/brain/*` (brain):** primitivas accesibles y sin estilo, instaladas vía npm. Aportan atributos ARIA, navegación por teclado y gestión del foco. Es el equivalente en Angular a Radix UI de React.

* **`@spartan-ng/*` (helm):** las versiones con estilo (Tailwind) construidas sobre brain. Son los componentes que se usan directamente en las plantillas (`hlm-...`, `hlmBtn`, `hlmInput`, etc.).

Esta regla aplica a **cualquier componente visual del proyecto** (formularios, cards, badges, tooltips, layouts, etc.), no solo a formularios.

### Orden de decisión
Para construir cualquier elemento de UI, evaluar en este orden y detenerse en el primer caso que aplique:

1. **¿El componente está en "Componentes permitidos"?**
   Usar el componente helm de Spartan de la lista. Está prohibido usar su equivalente nativo de HTML.
   Ejemplo: existe la etiqueta nativa `<dialog>` de HTML, pero como `Dialog` está en la lista, se debe usar el `Dialog` de Spartan (`<hlm-dialog>` + sus directivas).

2. **¿El componente es un botón?**
   Usar **SIEMPRE** el componente de `src\shared\design\ui\buttons`. Está prohibido usar el botón de Spartan (directiva `hlmBtn` de `@spartan-ng/button`) y está prohibido usar la etiqueta `<button>` nativa de HTML. Esta regla aplica en todos los casos, incluidos los botones internos de componentes compuestos (ver "Botones dentro de componentes compuestos").

3. **¿El componente NO está en la lista y NO es un botón?**
   Maquetar con Tailwind. En este caso sí se usan elementos HTML nativos (`<div>`, `<span>`, etc.) como base del maquetado.
   Ejemplo: `Card` no está en la lista, se maqueta con Tailwind sobre `<div>`.

4. **Alcance de la prohibición de HTML nativo (aplica a los casos 1, 2 y 3):**
   El HTML nativo solo está prohibido en dos situaciones:
   * (a) Cuando existe un equivalente en "Componentes permitidos": usar Spartan, no el nativo.

   * (b) La etiqueta `<button>` nativa: usar siempre `src\shared\design\ui\buttons`.
   En cualquier otro caso (componentes que no están en la lista), el HTML nativo es la base esperada para maquetar con Tailwind.

### Refuerzo para formularios
Además de lo anterior, en formularios es **obligatorio** usar los componentes de Spartan de "Componentes permitidos" para todos los controles disponibles (checkbox, input, label, Radio Group, Select, Switch, textarea, etc.). No se permite ningún control de formulario en HTML nativo cuando existe su equivalente en la lista.

Para el formulario en sí, sí se permite usar la etiqueta nativa `<form>` de HTML junto con los formularios de Angular (forms with signals) para el manejo de estado y validación. No es obligatorio envolver el formulario en un componente específico de Spartan.

### Botones dentro de componentes compuestos
Varios componentes de la lista (Alert Dialog, Dialog, Drawer, Sheet, dropdown-menu, Date Picker) usan botones internos: triggers que abren el overlay, acciones y botones de cierre. En Spartan NG esto **no** se hace con un patrón `asChild`: se aplica una **directiva de Spartan directamente sobre un elemento `<button>`** (por ejemplo `hlmDialogTrigger`, `hlmDialogClose`).

Esto encaja de forma natural con el sistema de botones definido en `src\shared\design\ui\buttons`: la directiva de Spartan (comportamiento/accesibilidad) y el botón (`src\shared\design\ui\buttons`, estilos y variantes) conviven en el **mismo** `<button>`. En **todos** los escenarios se usa `src\shared\design\ui\buttons`, nunca la directiva `hlmBtn`:

* Trigger que abre el modal / drawer / menú → `<button [tuBoton] hlmDialogTrigger>` (o la directiva de trigger que corresponda: `hlmSheetTrigger`, `brnDialogTriggerFor`, etc.).

* Botones de acción internos (footer del Dialog, cerrar, confirmar/cancelar del Alert Dialog, etc.) → `src\shared\design\ui\buttons` sobre el mismo `<button>` que lleva la directiva de acción/cierre (`hlmDialogClose`, etc.).

* Botones sueltos que no llevan directiva de Spartan → `src\shared\design\ui\buttons`.

Ejemplo (Dialog):

```html
<hlm-dialog>
  <!-- Trigger: comportamiento de Spartan + estilos de tu botón en el mismo <button> -->
  <button hlmDialogTrigger tuBoton variant="primary">Abrir</button>

  <hlm-dialog-content *hlmDialogPortal="let ctx">
    <hlm-dialog-header>
      <h3 hlmDialogTitle>Título</h3>
    </hlm-dialog-header>

    <hlm-dialog-footer>
      <!-- Cerrar/cancelar: directiva de cierre de Spartan + tu botón -->
      <button hlmDialogClose tuBoton variant="secondary">Cancelar</button>
      <button tuBoton variant="primary" type="submit">Guardar</button>
    </hlm-dialog-footer>
  </hlm-dialog-content>
</hlm-dialog>
```

Nota: `tuBoton` representa el selector real de tu componente/directiva en `src\shared\design\ui\buttons`. Ese componente ya reenvía correctamente los atributos y el foco (equivalente a `forwardRef`/spread de props), por lo que es compatible con las directivas de comportamiento de Spartan.

### Data Table
Solo se permite el patrón "Data Table" de Spartan, construido sobre las directivas `Table` (`hlmTable`, `hlmTr`, `hlmTh`, `hlmTd`, etc.) + **`@tanstack/angular-table`**, incluyendo paginación y sorting. Es decir, se usa el conjunto completo Data Table (Table + TanStack + paginación + sorting), no una tabla estática suelta. No esta permitiro usar la etiqueta `<table>` nativa de HTML

### Prohibiciones
* Prohibido instalar componentes nuevos de Spartan (vía su CLI, por ejemplo: `pnpm ng g @spartan-ng/cli:ui <componente>` o `nx g @spartan-ng/cli:ui <componente>`) distintos a los de "Componentes permitidos".

* Prohibido usar cualquier librería de UI externa (Angular Material, PrimeNG, NG-ZORRO, etc.).

### Componentes permitidos
Los componentes están agrupados en cuatro categorías dentro de `src\shared\design\ui\spartan-ng`: `overlay`, `form`, `navigation` y `data-display`.

Cada fila indica el alias de import. El alias es independiente de la carpeta: aunque los componentes estén anidados por categoría, el import siempre es plano (`@spartan-ng/<componente>`).

| Nombre                                                           | import alias                                         |
| ---------------------------------------------------------------- | ---------------------------------------------------- |
| Accordion                                                        | `@spartan-ng/accordion`                              |
| Alert Dialog                                                     | `@spartan-ng/alert-dialog`                           |
| Calendar                                                         | `@spartan-ng/calendar`                               |
| Carousel                                                         | `@spartan-ng/carousel`                               |
| Checkbox                                                         | `@spartan-ng/checkbox`                               |
| Combobox                                                         | `@spartan-ng/combobox`                               |
| Data Table (con `@tanstack/angular-table`, paginación y sorting) | `@spartan-ng/data-table` + `@tanstack/angular-table` |
| Date Picker                                                      | `@spartan-ng/date-picker`                            |
| Dialog                                                           | `@spartan-ng/dialog`                                 |
| Drawer                                                           | `@spartan-ng/drawer`                                 |
| Dropdown Menu                                                    | `@spartan-ng/dropdown-menu`                          |
| Input                                                            | `@spartan-ng/input`                                  |
| Input Group                                                      | `@spartan-ng/input-group`                            |
| Label                                                            | `@spartan-ng/label`                                  |
| Pagination                                                       | `@spartan-ng/pagination`                             |
| Popover                                                          | `@spartan-ng/popover`                                |
| Radio Group                                                      | `@spartan-ng/radio-group`                            |
| Select                                                           | `@spartan-ng/select`                                 |
| Sheet                                                            | `@spartan-ng/sheet`                                  |
| Toast (Sonner)                                                   | `@spartan-ng/toast`                                  |
| Switch                                                           | `@spartan-ng/switch`                                 |
| Tabs                                                             | `@spartan-ng/tabs`                                   |
| Textarea                                                         | `@spartan-ng/textarea`                               |
| Tooltip                                                          | `@spartan-ng/tooltip`                                |

## 🧱 Configuración de Tailwind 4

[Igual que como se muestra en la documentacion](https://tailwindcss.com/blog/tailwindcss-v4#css-first-configuration)

En este proyecto se está utilizando **Tailwind CSS V4**, por lo tanto el archivo `tailwind.config.js` ya no se utiliza y se considera **obsoleto** en esta arquitectura.

La configuración de Tailwind ahora se realiza en el archivo `src/styles/global/tailwind`

Esto permite centralizar la definición de tokens de diseño (colores, media queries, etc.) sin necesidad de configuración en archivo JavaScript.

**❌ Incorrecto - Configurar Tailwind 3 con `.js`**

```js
/* tailwind.config.js */

module.exports = {
  theme: {
    extend: {
      colors: {
        "primary-color": "oklch(62.8% 0.258 29.23)" // #FF0000
      },
    },
  },
};
```

**✅ Correcto - Configurar Tailwind 4 con `.css`**

```CSS
/* src/styles/global/tailwind/theme.css */

@theme {
  --color-primary-color: oklch(62.8% 0.258 29.23); // #FF0000
}
```

## 🎨 Variables de Colores Tailwind y Sass

[Documentación de variables de Tailwind 4](https://tailwindcss.com/blog/tailwindcss-v4#css-theme-variables)

Las variables con nombres de los colores de **Sass** en `src/styles/global/variable.scss` y **Tailwind** en `src/styles/global/tailwind/theme.css` deben mantener exactamente el mismo nombre y el mismo valor.

Esto garantiza que los colores sean los mismos entre los estilos globales definidos en Sass y los estilos de cada componente definidos con Tailwind.

***✅ Ejemplo Correcto:***

En Sass y Tailwind ambos colores tienen exactamente el mismo nombre `primary-color` y son el mismo valor con color rojo `oklch(62.8% 0.258 29.23)`

```scss
/*
src/styles/global/variable.scss

colores de Sass */
$primary-color: oklch(62.8% 0.258 29.23) ;
```

```CSS
/*
src/styles/global/tailwind/theme.css

colores de Tailwind */
@theme {
  --color-primary-color: oklch(62.8% 0.258 29.23) ;
}
```

***❌ Ejemplo Incorrecto:***

Los nombres o valores no coinciden entre Sass y Tailwind.


```scss
/*
src/styles/global/variable.scss

colores de Sass */
$primary-color: oklch(62.8% 0.258 29.23); // color rojo
```

```css
/*
src/styles/global/tailwind/theme.css

colores de Tailwind */
@theme {
  --color-brand-primary: oklch(54.6% 0.245 262.881); /* color azul */
}
```

### 🎨 Formato de Colores

Todos los colores del proyecto se definen utilizando el formato `oklch`.

***✅ Ejemplo Correcto***

```scss
oklch(62.8% 0.258 29.23)
```

***❌ Ejemplo Incorrecto***

```scss
/* Hexadecimal */
#FF0000

/* RGB */
rgb(255 0 0)

/* RGBA */
rgba(255 0 0 / 50%)

/* HSL  */
hsl(0 100% 50%)

/* HSLA */
hsla(0, 100%, 50%, 0.5)
```

### 🎨 Tailwind Custom Values

Cuando se utilicen colores mediante valores arbitrarios de Tailwind, el color también debe estar definido en formato `oklch`.

***✅ Ejemplo Correcto***

```html
<div class="bg-[oklch(62.8%_0.258_29.23)]"></div>
```

***❌ Ejemplo Incorrecto***

```html
<!-- Hexadecimal -->
<div class="bg-[#FF0000]"></div>

<!-- RGB -->
<div class="bg-[rgb(255_0_0)]"></div>

<!-- RGBA -->
<div class="bg-[rgba(255_0_0_/_50%)]"></div>

<!-- HSL -->
<div class="bg-[hsl(0_100%_50%)]"></div>

<!-- HSLA -->
<div class="bg-[hsla(0,_100%,_50%,_0.5)]"></div>
```

## 🤔 ¿Cómo Usar Tailwind y Sass Juntos?

### ✅ PATRÓN CORRECTO (OBLIGATORIO)

👉 Separación estricta de responsabilidades:

* ***Sass*** para estilos globales en `src/styles/global/...`

```ts
/* my-component.component.ts */
import { Component, signal } from '@angular/core';
import { HlmTableImports } from '@spartan-ng/data-table';

interface Product {
  id: number;
  name: string;
  price: number;
}

const PRODUCTS: Product\[] = \[
  { id: 1, name: 'Laptop', price: 2500 },
  { id: 2, name: 'Mouse', price: 50 },
]

@Component({
  selector: 'app-my-component',
  imports: [HlmTableImports],
  templateUrl: './my-component.component.html',
})
export class MyComponent {
  readonly products = signal<Product\[]>(PRODUCTS);
}
```

```HTML
<!-- my-component.component.html -->

<div hlmTableContainer>
    <table hlmTable>
        <thead hlmTableHeader>
            <tr hlmTableRow>
                <th hlmTableHead>Identificacion</th>
                <th hlmTableHead>Nombre</th>
                <th hlmTableHead>Precio</th>
            </tr>
        </thead>

        <tbody hlmTableBody>
            @for (product of products(); track product.id) {
                <tr hlmTableRow>
                    <td hlmTableCell>{{ product.id }}</td>
                    <td hlmTableCell>{{ product.name }}</td>
                    <td hlmTableCell>{{ product.price }}</td>
                </tr>
            }
        </tbody>
    </table>
</div>
```

```scss
// estilo global para tablas en src/styles/global/_table.scss
@use './variable.scss' as variable;

table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  thead,
  tfoot,
  th {
    background-color: variable.$blue-ocean;
    color: oklch(100% 0 0); /\* #ffffff \*/
  }

  // ...
}
```

* ***Tailwind*** para estilos especificos de cada componente en:

* `src/app/...`

* `src/shared/design/layouts/...`

* `src/shared/design/ui/...`

```html
<!-- my-component.component.html -->

<h1 class="text-center text-blue-600">
  Guardar
</h1>
```

### 🚨 PRINCIPIO BASE (INNEGOCIABLE)

* ❌ Tailwind y Sass **NO** se mezclan en la capa de UI
* ❌ **NO** existen overrides entre Sass y Tailwind
* ❌ **NO** se resuelve con especificidad
* ❌ **NO** está permitido usar `!important` ni en Sass ni en Tailwind
* ❌ **NO** se duplican responsabilidades de estilos
* ❌ **NO** se crean estilos visuales en Sass para componentes

👉 Si esto ocurre, la arquitectura está mal diseñada.

### ❌ LOS COMPONENTES DE ANGULAR NO PUEDEN USAR:

* Estilos en linea `style=" "` 
* Binding de estilo `[style.prop]`
* Directiva `[ngStyle]=" "`
* `styleUrls: ['./component.scss']`
* `styleUrls: ['./component.css']`

### 🚫 En Sass global

Está prohibido:

* Estilos de UI de componentes
* Cards, layouts
* Selectores por ID para componentes
* Overrides de Tailwind
* Diseño de interfaces completas

### 🚨 ANTIPATRÓN - ERROR CRÍTICO

```ts
/* my-component.component.ts */
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.scss']
})
export class MyComponent {}
```

```scss
/* my-component.component.scss */

#btn-guardar {
  background-color: blue !important;
}

.card {
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid oklch(92.2% 0.005 264);
}
```

```html
<!-- my-component.component.html -->

<button id="btn-guardar" class="bg-red-600!">
  Guardar
</button>

<div class="card">
  Contenido de la card
</div>
```

### ❌ PROHIBIDO USAR `@apply` DE TAILWIND

En estos enlaces el creador de Tailwind explica porque **NO** usar `@apply`:

* [Tutorial](https://x.com/adamwathan/status/1226511611592085504)
* [X (Twitter)](https://x.com/adamwathan/status/1559250403547652097)

Está estrictamente prohibido utilizar la directiva `@apply` de Tailwind.

Esto incluye cualquier uso dentro de archivos:

* `.css`
* `.scss`
* cualquier archivo de estilos globales o de componentes

***❌ EJEMPLO INCORRECTO USANDO  `@apply`***

```scss
/* src/styles/global/global.scss 

❌ MAL: usando Tailwind dentro de Sass/CSS con @apply */

.button {
  @apply bg-red-600 text-white px-4 py-2 rounded-lg;
}
```

```html
<!-- my-component.component.html -->

<button class="button">
  Boton
</button>
```

## 🖼️ Ruta de Iconos e Imagenes

Debes crear las siguientes carpetas:

```txt
src/
└── assets/
    ├── icon/
    └── img/
```

**✅ Correcto:**

Al usar la etiqueta `<img>`, siempre utilizar rutas **absolutas** desde `/assets`.

```html
<!-- my-component.component.html -->

<!-- usar slash al principio de /assets -->
<img src="/assets/img/logo.png" alt="Logo" />
```

**❌ Incorrecto:**

**NO** usar rutas **relativas** para acceder a imágenes e iconos

```html
<!-- my-component.component.html -->

<!-- es incorrecto porque se escribe ../ -->
<img src="../../../assets/img/logo.png" alt="Logo" />
```

```html
<!-- my-component.component.html -->

<!-- es incorrecto porque NO se escribio el slash al principio de assets -->
<img src="assets/img/logo.png" alt="Logo" />
```

### Imagenes

Las **imágenes** del proyecto se deben guardar dentro de la carpeta:

```txt
src/assets/img/
```

Ejemplo:

```html
<!-- my-component.component.html -->

<img src="/assets/img/my-image.png" alt="image" />
```

### Iconos

**NO** instales otra libreria para iconos porque en este proyecto es estandar usar [Material Symbols Icons](https://fonts.google.com/icons)

Dar prioridad a usar los iconos de [Material Symbols Icons](https://fonts.google.com/icons)

Usar siempre la siguiente estructura:

```html
<!-- my-component.component.html -->

<span class="material-symbols-outlined"> home </span>
```

La clase:

```html
material-symbols-outlined
```

No debe modificarse ni reemplazarse.

Esa clase es la que permite renderizar correctamente los Material Symbols Icons.

Lo único que debe cambiar es el nombre del icono:

```html
home
```

Dependiendo del icono que se quiera mostrar.

Ejemplos:

```html
<span class="material-symbols-outlined"> delete </span>
```

```html
<span class="material-symbols-outlined"> settings </span>
```

```html
<span class="material-symbols-outlined"> search </span>
```

No agregar imágenes/SVGs manualmente si el icono ya existe en [Material Symbols Icons](https://fonts.google.com/icons)

Cuando el icono no este en [Material Symbols Icons](https://fonts.google.com/icons), entonces agregarlo dentro de la carpeta `src/assets/icon/...`.

Los **iconos** del proyecto se deben guardar dentro de la carpeta

```txt
src/assets/icon/
```

Ejemplo:

```html
<!-- my-component.component.html -->

<img src="/assets/icon/logo.png" alt="Logo" />
```

## 🔘 Estilos Globales para Botones

Está guía de estilos para botones está basada en:

- [Arquitectura de Bootstrap 5.3 para botones](https://getbootstrap.com/docs/5.3/components/buttons/)

- [Tailwind 4 font-size](https://tailwindcss.com/docs/font-size)

- [Tailwind 4 line-height](https://tailwindcss.com/docs/line-height)

- [Tailwind 4 padding](https://tailwindcss.com/docs/padding)

**❌ Incorrecto:**

Usar etiquetas `<img>` para iconos porque las imágenes no se integran correctamente con la arquitectura CSS de los botones y dificultan aplicar estilos dinámicos como:

- `color`
- `hover`
- `active`
- `disabled`
- `font-size`
- dark mode

Esto rompe la consistencia visual y vuelve el código más difícil de mantener y escalar.

```html
<button>
  <img src="/assets/icon/delete.svg" alt="Eliminar" />
</button>
```

Por ejemplo, para intentar cambiar color, tamaño o estados visuales de imágenes `<img>`, normalmente se termina recurriendo a hacks visuales con CSS, lo cual es mala práctica:

```SCSS
// cambiar tamaño de imagen
button {
  img {
    display: inline-block;
    width: 20px;
    height: 20px;
  }
}
```

```SCSS
// cambiar color de imagen
img {
  filter: brightness(0) saturate(100%) invert(100%);
}
```

```SCSS
// Recortar la imagen usando la forma del SVG
img {
  mask-image: url(icon.svg);
}
```

```SCSS
// Hacer imagen semitransparente al pasar el mouse
button {
  &:hover {
    img {
      opacity: 0.5;
    }
  }
}
```

Esto genera:

- Son difíciles de mantener.
- Generan inconsistencias visuales.
- Complican los estilos para los estados del botón.
- Rompen fácilmente en dark mode.
- Vuelven el CSS más complejo y frágil.

**✅ Correcto:**

Los iconos de los botones deben utilizar [Material Symbols Icons](https://fonts.google.com/icons)

[Material Symbols Icons](https://fonts.google.com/icons) funcionan como texto estilizable mediante CSS, lo que permite integrarlos correctamente con la arquitectura visual del proyecto.

```html
<button class="btn btn-primary btn-outline btn-icon-only btn-rounded-full btn-shadow">
  <span class="material-symbols-outlined">arrow_forward</span>
</button>
```

**❌ Incorrecto:**

Usar Tailwind CSS para definir estilos de botones directamente en cada componente, ya que esto genera estilos inconsistentes y no escalables:

```HTML
<button class="rounded-2xl bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white disabled:cursor-not-allowed enabled:cursor-pointer">
  Aceptar
</button>
```

Mezclar las clases globales de botones (`.btn`, `.btn-primary`, `.btn-outline-*`, etc.) con clases de Tailwind CSS.

```HTML
<button class="btn btn-primary bg-red-500 px-10 rounded-full">
  <span class="material-symbols-outlined">save</span>
  <span class="text-blue-500">Guardar</span>
</button>
```

Usar muchas clases de Sass para cada uno de los estilos de los botones, porque mezcla múltiples responsabilidades en una sola clase:

- Icono
- Texto
- Borde

```HTML
<button class="btn-with-icon-text-border">
  <span class="material-symbols-outlined"> home </span>
  <span>Boton</span>
</button>
```

Ese enfoque no escala bien, ya que cada nueva combinación obliga a crear más clases:

```SCSS
.btn-with-icon-text-border-loading {}
.btn-with-icon-text-background-lg {}
.btn-with-icon-text-border-disabled {}
```

Esto genera:

- Archivos Sass enormes y difíciles de mantener.
- Duplicación innecesaria de código.
- Inconsistencias visuales.
- Dificultad para reutilizar un estándar de diseño.

**✅ Correcto:**

Las clases de botones deben representar una sola responsabilidad y ser **composables**.

En arquitectura CSS y de componentes, composable significa que una clase puede combinarse con otras clases pequeñas y reutilizables para construir distintos comportamientos sin duplicar código.

Cada clase modifica únicamente una característica específica del botón. Esto permite combinar comportamientos sin duplicar estilos:

| Archivo              | Descripción                                                                                                                                                                  | Ejemplo de código                                                |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------|
| `index-buttons.scss` | Archivo orquestador. Importa todos los módulos SCSS mediante `@use`. No debe contener estilos CSS, variables ni lógica visual.                                               | `@use "./base.scss";`                                            |
| `_base.scss`         | Define la estructura base del sistema de botones: reset CSS, layout, alineación, box model y estilos fundamentales de `.btn`. Todas las variantes parten de esta clase base. | `.btn {} `                                                       |
| `_variants.scss`     | Define la apariencia principal del botón (fondo, borde y comportamiento visual). Las variantes pueden combinarse con cualquier tema, tamaño o modificador.                   | `.btn-background {} .btn-outline {} .btn-ghost {} .btn-link {} ` |
| `_themes.scss`       | Define los temas de color mediante CSS Custom Properties. Cada tema establece los colores utilizados por las variantes (`solid`, `outline`, `ghost`, etc.).                  | `.btn-primary {} .btn-secondary {} .btn-success {} `             |
| `_sizes.scss`        | Define la escala de tamaños del botón mediante `padding`, `font-size` y `line-height`. Puede combinarse con cualquier variante o tema.                                       | `.btn-xs {} .btn-sm {} .btn-base {} .btn-lg {} `                 |
| `_states.scss`       | Define los estados interactivos y de accesibilidad del botón. Centraliza comportamientos relacionados con `focus-visible`, `hover`, `active` y `disabled`.                   |                                                                  |
| `_effects.scss`      | Contiene utilidades visuales reutilizables independientes de la lógica del botón. Permite agregar efectos opcionales como sombras, blur o elevación.                         | `.btn-shadow {} `                                                |
| `_modifiers.scss`    | Clases composables que alteran o extienden características específicas del botón sin modificar su variante principal.                                                        | `.btn-full-width {} .btn-rounded-full {} .btn-icon-only {}`      |
| `_mixins.scss`       | Codigo de Sass reutilizable que se repite en diferentes archivos de src\styles\global\buttons                                                                                | `@mixin btn-base-size {}`                                        |
| `_tokens.scss`       | Variables globales de Sass utilizadas por todo el sistema de botones. Centraliza colores, tamaños tipográficos y escalas de espaciado para mantener consistencia visual.     | `$primary: oklch(...);`                                          |

### 📖 Manual de Uso para Dar Estilos a Botones

Esta guía explica cómo utilizar correctamente los estilos globales de botones definidos en:

```txt
src/styles/global/buttons
```

### ✨ UI/UX

En el diseño de interfaces (UI/UX), el color de un botón no es solo decorativo:
cada variante representa una intención de acción dentro del sistema.

Esto ayuda al usuario a entender rápidamente qué va a ocurrir antes de hacer clic.

**🔴 Los colores fuertes:**

- Capturan atención.
- Indican importancia.
- El usuario lo identifica como el botón más importante para hacer clic.

**⚪ Los colores suaves o transparentes:**

- Reducen distracción.
- Bajan la jerarquía visual.
- Mantienen el foco en el contenido principal.

**📏 Reglas de UI/UX**

- Solo debe existir 1 acción primaria por pantalla (colores fuertes).
- Las acciones secundarias deben tener menor jerarquía visual (colores suaves).
- Las acciones destructivas deben ser claramente identificables.
- El color no es decoración, es comunicación.

### Clase `.btn` con Estilos Base

La clase `.btn` define los estilos base y actúa como un **reset CSS obligatorio para todos los botones**, sin importar su variante o tipo (`primary`, `outline`, `ghost`, etc.).

Esta clase **siempre debe utilizarse**, ya que establece la estructura común del componente y garantiza consistencia en toda la UI.

Incluye estilos fundamentales como `padding`, `font-size`, alineación del contenido, comportamiento de interacción (`hover`, `active`, `disabled`) y configuración de layout.

Por defecto, `.btn` tiene `background-color: transparent`, por lo que **no representa un botón visual completo por sí sola**. Su función es servir como base para que las variantes (`.btn-primary`, `.btn-outline-*`, etc.) apliquen el estilo visual final.

- Botones **activados** usan `cursor: pointer` 👆🏻 para indicar que el botón es interactivo y puede ser clickeado.

- Botones **desactivados** usan `cursor: not-allowed` 🚫 para indicar que el botón no está disponible y no puede ser clickeado.

```html
<button class="btn">
  Base class
</button>
```

### Enlaces

`btn btn-link` define los estilos para los enlaces para `<a>` y `<button>`

![enlaces](./docs/readme-md/img/button/enlaces.png)

```html
<a class="btn btn-link" routerLink="/home">
  Ir a home
</a>

<button class="btn btn-link" routerLink="/home">
  Ir a home
</button>

<button disabled class="btn btn-link" routerLink="/home">
  Ir a home
</button>

<a class="btn btn-link" target="_blank" rel="noopener noreferrer" href="https://www.google.com">
  Ir a Google
</a>
```

### Botones con Color de Fondo

`btn-background` agrega color de fondo al boton.

En sistemas de diseño modernos, los botones se clasifican según su nivel de importancia y riesgo de la acción:

| Tipo de boton    | Significado                                                    |
| ---------------- | -------------------------------------------------------------- |
| 🔵 **Primary**   | acción principal (continuar / confirmar / guardar)             |
| ⚪ **Secondary** | acción secundaria (cancelar / salir)                           |
| 👻 **Ghost**     | acción discreta sin estructura visual fuerte - no tiene border |
| 🔴 **Danger**    | eliminar o destruir                                            |
| 🟡 **Warning**   | advertencia                                                    |
| 🟢 **Success**   | confirmación positiva                                          |
| 🔷 **Info**      | información                                                    |
| 🔗 **Link**      | navegación / enlaces                                           |
| ⚫ **Dark**      | variante de alto contraste para acciones neutras o de soporte  |

![variantes-con-color-de-fondo](./docs/readme-md/img/button/variantes-con-color-de-fondo.png)

```html
<button class="btn btn-primary btn-background">Primary</button>
<button class="btn btn-secondary btn-background">Secondary</button>
<button class="btn btn-success btn-background">Success</button>
<button class="btn btn-danger btn-background">Danger</button>
<button class="btn btn-warning btn-background">Warning</button>
<button class="btn btn-info btn-background">Info</button>
<button class="btn btn-light btn-background">Light</button>
<button class="btn btn-dark btn-background">Dark</button>
```

### Botones con Borde + Texto

Las clases `.btn-outline-*` se usan para botones que tienen `border`, pero no color de fondo `background-color` por defecto.

El comportamiento visual depende del estado de interacción:

- **Estado normal (sin `hover`)** → sin fondo `background-color: transparent` y se muestra únicamente el `border`.

- **Estado `hover`** → botón cambia su `background-color` dependiendo del tipo de botón.

Algunos botones usan colores claros en el texto o borde, por lo que deben colocarse sobre fondos oscuros para mantener un buen contraste y asegurar que sean claramente visibles.

![borde-con-texto](./docs/readme-md/img/button/borde-con-texto.png)

```html
<button class="btn btn-primary btn-outline">Primary</button>
<button class="btn btn-secondary btn-outline">Secondary</button>
<button class="btn btn-success btn-outline">Success</button>
<button class="btn btn-danger btn-outline">Danger</button>
<button class="btn btn-warning btn-outline">Warning</button>
<button class="btn btn-info btn-outline">Info</button>
<button class="btn btn-light btn-outline">Light</button>
<button class="btn btn-dark btn-outline">Dark</button>
```

### Botones con sombra

`btn-shadow` agrega una sombra a cualquier variante de botón, sin importar su estilo (fondo, borde o ghost).

![botones-con-sombra](./docs/readme-md/img/button/botones-con-sombra.png)

```html
<!-- sombra + fondo + texto -->
<button class="btn btn-primary btn-background btn-shadow">Primary</button>

<!-- sombra + texto -->
<button class="btn btn-secondary btn-ghost btn-shadow">Secondary</button>

<!-- sombra + borde + texto -->
<button class="btn btn-success btn-outline btn-shadow">Success</button>

<!-- sombra + bordes redondeados + icono + fondo -->
<button class="btn btn-warning btn-background btn-icon-only btn-shadow">
  <span class="material-symbols-outlined">warning</span>
</button>

<!-- sombra + bordes redondeados + icono + borde -->
<button class="btn btn-success btn-outline btn-icon-only btn-shadow">
  <span class="material-symbols-outlined">check_circle</span>
</button>

<!-- sombra + borde + btn-rounded-full forma de circulo + icono -->
<button class="btn btn-outline btn-danger btn-icon-only btn-rounded-full btn-shadow">
  <span class="material-symbols-outlined">delete</span>
</button>

<!-- sombra + btn-rounded-full forma de circulo + icono -->
<button class="btn btn-ghost btn-info btn-icon-only btn-rounded-full btn-shadow">
  <span class="material-symbols-outlined">info</span>
</button>

<!-- sombra + icono + fondo + texto -->
<button class="btn btn-primary btn-background btn-shadow">
  <span class="material-symbols-outlined">arrow_forward</span>
  <span>Primary</span>
</button>

<!-- sombra + icono + fondo + texto + boton redondo -->
<button class="btn btn-info btn-background btn-rounded-full btn-shadow">
  <span class="material-symbols-outlined">info</span>
  <span>Info</span>
</button>
```

### Botones con Icono

Es obligatorio que, cuando el botón contenga únicamente un icono (sin texto), se utilicen las clases `btn` y `btn-icon-only`.

![solo-icono](./docs/readme-md/img/button/solo-icono.png)

```HTML
<!-- bordes redondeados -->
<button class="btn btn-warning btn-background btn-icon-only">
  <span class="material-symbols-outlined">warning</span>
</button>

<!-- btn-rounded-full forma de circulo -->
<button class="btn btn-outline btn-danger btn-icon-only btn-rounded-full">
  <span class="material-symbols-outlined">delete</span>
</button>

<button class="btn btn-ghost btn-dark btn-icon-only btn-rounded-full">
  <span class="material-symbols-outlined">settings</span>
</button>

<!-- xs boton muy pequeño -->
<button class="btn btn-info btn-background btn-icon-only btn-rounded-full btn-xs">
  <span class="material-symbols-outlined">info</span>
</button>

<!-- 2xl boton muy grande -->
<button class="btn btn-primary btn-background btn-icon-only btn-rounded-full btn-2xl">
  <span class="material-symbols-outlined">arrow_forward</span>
</button>
```

### Botones con Icono + Fondo

![icono-fondo](./docs/readme-md/img/button/icono-fondo.png)

```html
<button class="btn btn-primary btn-background btn-icon-only">
  <span class="material-symbols-outlined">arrow_forward</span>
</button>

<button class="btn btn-secondary btn-background btn-icon-only">
  <span class="material-symbols-outlined">close</span>
</button>

<button class="btn btn-success btn-background btn-icon-only">
  <span class="material-symbols-outlined">check_circle</span>
</button>

<button class="btn btn-danger btn-background btn-icon-only">
  <span class="material-symbols-outlined">delete</span>
</button>

<button class="btn btn-warning btn-background btn-icon-only">
  <span class="material-symbols-outlined">warning</span>
</button>

<button class="btn btn-info btn-background btn-icon-only">
  <span class="material-symbols-outlined">info</span>
</button>

<button class="btn btn-light btn-background btn-icon-only">
  <span class="material-symbols-outlined">light_mode</span>
</button>

<button class="btn btn-dark btn-background btn-icon-only">
  <span class="material-symbols-outlined">dark_mode</span>
</button>
```

### Botones con Borde + Icono

![icono-borde](./docs/readme-md/img/button/icono-borde.png)

```html
<button class="btn btn-primary btn-outline btn-icon-only">
  <span class="material-symbols-outlined">arrow_forward</span>
</button>

<button class="btn btn-secondary btn-outline btn-icon-only">
  <span class="material-symbols-outlined">close</span>
</button>

<button class="btn btn-success btn-outline btn-icon-only">
  <span class="material-symbols-outlined">check_circle</span>
</button>

<button class="btn btn-danger btn-outline btn-icon-only">
  <span class="material-symbols-outlined">delete</span>
</button>

<button class="btn btn-warning btn-outline btn-icon-only">
  <span class="material-symbols-outlined">warning</span>
</button>

<button class="btn btn-info btn-outline btn-icon-only">
  <span class="material-symbols-outlined">info</span>
</button>

<button class="btn btn-light btn-outline btn-icon-only">
  <span class="material-symbols-outlined">light_mode</span>
</button>

<button class="btn btn-dark btn-outline btn-icon-only">
  <span class="material-symbols-outlined">dark_mode</span>
</button>
```

### Botones con Icono + Fondo + Texto

![icono-fondo-texto](./docs/readme-md/img/button/icono-fondo-texto.png)

```html
<button class="btn btn-primary btn-background">
  <span class="material-symbols-outlined">arrow_forward</span>
  <span>Primary</span>
</button>

<button class="btn btn-secondary btn-background">
  <span class="material-symbols-outlined">close</span>
  <span>Secondary</span>
</button>

<button class="btn btn-success btn-background">
  <span class="material-symbols-outlined">check_circle</span>
  <span>Success</span>
</button>

<button class="btn btn-danger btn-background">
  <span class="material-symbols-outlined">delete</span>
  <span>Danger</span>
</button>

<button class="btn btn-warning btn-background">
  <span class="material-symbols-outlined">warning</span>
  <span>Warning</span>
</button>

<button class="btn btn-info btn-background">
  <span class="material-symbols-outlined">info</span>
  <span>Info</span>
</button>

<button class="btn btn-light btn-background">
  <span class="material-symbols-outlined">light_mode</span>
  <span>Light</span>
</button>

<button class="btn btn-dark btn-background">
  <span class="material-symbols-outlined">dark_mode</span>
  <span>Dark</span>
</button>
```

### Botones Redondos

`btn-rounded-full` redondea al maximo las esquinas de cualquier tipo de boton

| Tipo de botón  | Condición (dimensiones) | Resultado visual                                  |
|----------------|-------------------------|---------------------------------------------------|
| Rectangular    | width ≠ height          | Esquinas totalmente redondeadas (forma alargada)  |
| Cuadrado       | width = height          | Círculo perfecto (no óvalo)                       |

![botones-redondos](./docs/readme-md/img/button/botones-redondos.png)

```HTML
<button class="btn btn-primary btn-background btn-rounded-full">Primary</button>

<button class="btn btn-secondary btn-outline btn-rounded-full">Secondary</button>

<button class="btn btn-info btn-background btn-rounded-full">
  <span class="material-symbols-outlined">info</span>
  <span>Info</span>
</button>

<button class="btn btn-outline btn-danger btn-icon-only btn-rounded-full">
  <span class="material-symbols-outlined">delete</span>
</button>

<button class="btn btn-background btn-warning btn-icon-only btn-rounded-full">
  <span class="material-symbols-outlined">warning</span>
</button>

<!-- SIN btn-rounded-full tiene esquinas redondeadas -->
<button class="btn btn-background btn-success btn-icon-only">
  <span class="material-symbols-outlined">check_circle</span>
</button>
```

### Botones sin Fondo ni Borde

`btn-ghost` tiene las siguientes características:

- **Fondo:** transparente.
- **Borde:** inexistente.
- **Color:** usa los mismos colores de las variantes (primary, secondary, success, etc).
- **Hover:** Cambia color de fondo al situar mouse en boton.
- **Uso:** acciones secundarias o discretas.

***NO hover***

![botones-sin-fondo-ni-borde](./docs/readme-md/img/button/botones-sin-fondo-ni-borde.png)

***hover***

![botones-sin-fondo-ni-borde-hover](./docs/readme-md/img/button/botones-sin-fondo-ni-borde-hover.png)

```HTML
<button class="btn btn-primary btn-ghost">Primary</button>

<button class="btn btn-secondary btn-ghost">
  <span class="material-symbols-outlined">close</span>
  <span>Secondary</span>
</button>

<button class="btn btn-warning btn-ghost btn-icon-only btn-rounded-full">
  <span class="material-symbols-outlined">warning</span>
</button>
```

### 🚫 Boton desactivado `cursor: not-allowed`

Agregar el atributo booleano de HTML `disabled` a la etiqueta `<button>` hace que los botones tomen estilos de desactivados.

El estilo de boton desactivado se aplica a cualquier tipo de boton.

![boton-desactivado](./docs/readme-md/img/button/boton-desactivado.png)

```HTML
<button disabled class="btn btn-primary btn-background">Primary</button>

<button disabled class="btn btn-secondary btn-outline">Secondary</button>

<button disabled class="btn btn-icon-only btn-outline btn-danger btn-rounded-full">
  <span class="material-symbols-outlined">delete</span>
</button>

<button disabled class="btn btn-icon-only btn-warning btn-background">
  <span class="material-symbols-outlined">warning</span>
</button>

<button disabled class="btn btn-icon-only btn-outline btn-info">
  <span class="material-symbols-outlined">info</span>
</button>

<button disabled class="btn btn-dark btn-background">
  <span class="material-symbols-outlined">dark_mode</span>
  <span>Dark</span>
</button>

<!-- Enlaces -->
<button disabled class="btn btn-link" routerLink="/home">Link</button>
```

### 📐 Tamaños

Puedes modificar el tamaño de cualquier variante de botón, sin importar su estilo (fondo, borde o ghost).

El ajuste de tamaño se aplica a todo el boton y afecta de manera proporcional a todos sus elementos internos:

- Tamaño del botón `padding`.

- Tamaño del texto `font-size`.

- Tamaño de los iconos.

- El espacio entre el icono y el texto `gap` es proporcional al tamaño del botón, ya que utiliza la unidad de medida `em`, la cual depende del `font-size` del propio botón.

El tamaño por defecto de todos los botones es `.btn-base`:

Esto significa que no es necesario declararlo explícitamente: si no se especifica un modificador de tamaño, el botón siempre asumirá este estilo automáticamente.

```SCSS
.btn-base {
  padding: 0.5rem 0.75rem;      // py-2 = 0.5rem = 8px, px-3 = 0.75rem = 12px

  font-size: 1rem;              // text-base = 1rem = 16px
  line-height: calc(1.2 / 1);   // (line-height que se desea aplicar / font-size)
}
```

![tamanos](./docs/readme-md/img/button/tamanos.png)

```HTML
<button class="btn btn-primary btn-background btn-xs">
  Muy pequeño
</button>

<button class="btn btn-secondary btn-outline btn-sm">
  Pequeño
</button>

<button class="btn btn-secondary btn-outline">
  Valor por defecto
</button>

<button class="btn btn-secondary btn-outline btn-base">
  Valor por defecto
</button>

<button class="btn btn-success btn-background btn-lg">
  <span class="material-symbols-outlined">check_circle</span>
  <span>Grande</span>
</button>

<button class="btn btn-danger btn-outline btn-xl">
  <span class="material-symbols-outlined">delete</span>
  <span>Muy grande</span>
</button>

<button class="btn btn-warning btn-background btn-2xl">
  <span class="material-symbols-outlined">warning</span>
  <span>Enorme</span>
</button>

<button class="btn btn-info btn-background btn-3xl">
  <span class="material-symbols-outlined">rocket_launch</span>
  <span>Gigante</span>
</button>
```

### Modificadores - Boton en Bloque - Responsive

En CSS un elemento en bloque es aquel que ocupa todo el ancho disponible de su contenedor y siempre inicia en una nueva línea ("renglon")

```SCSS
.block {
  display: block;
}
```

```SCSS
.flex {
  display: flex;
}
```

`btn-full-width` convierte el boton a elemento en bloque, hace que el boton ocupe todo al ancho disponible de su contenedor padre y es responsive

Funciona para cualquier variante de botón, sin importar su estilo (fondo, borde o ghost).

![boton-responsive](./docs/readme-md/img/button/boton-responsive.png)

```HTML
<!-- solo texto -->
<button class="btn btn-danger btn-background btn-full-width">Danger</button>

<!-- solo icono + fondo -->
<button class="btn btn-dark btn-background btn-icon-only btn-full-width">
  <span class="material-symbols-outlined">dark_mode</span>
</button>

<!-- icono + fondo + texto -->
<button class="btn btn-success btn-background btn-full-width">
  <span class="material-symbols-outlined">check_circle</span>
  <span>Success</span>
</button>

<!-- icono + borde -->
<button class="btn btn-outline btn-info btn-icon-only btn-full-width">
  <span class="material-symbols-outlined">info</span>
</button>

<!-- sin fondo ni borde  -->
<button class="btn btn-primary btn-icon-only btn-ghost btn-full-width">
  <span class="material-symbols-outlined">arrow_forward</span>
</button>
```

### Ubicación de Iconos y Texto en Botones

**❌ Incorrecto:**

Usar [flex-direction](https://tailwindcss.com/docs/flex-direction) para cambiar ubicacion de iconos:

```HTML
<button class="btn btn-primary btn-background flex-row-reverse">
  <span class="material-symbols-outlined">arrow_forward</span>
  <span>Primary</span>
</button>
```

**✅ Correcto:**

Cambiar la ubicación del icono y texto en el HTML, sin usar Sass ni Tailwind.

*icono a la izquierda - texto a la derecha*

![icono-izquierda-texto-derecha](./docs/readme-md/img/button/icono-izquierda-texto-derecha.png)

```HTML
<button class="btn btn-primary btn-background">
  <span class="material-symbols-outlined">arrow_forward</span>
  <span>Primary</span>
</button>
```

*icono a la derecha - texto a la izquierda*

![icono-derecha-texto-izquierda](./docs/readme-md/img/button/icono-derecha-texto-izquierda.png)

```HTML
<button class="btn btn-primary btn-background">
  <span>Primary</span>
  <span class="material-symbols-outlined">arrow_forward</span>
</button>
```

# 🔌 Consumo de API

## Contrato `ApiResponse<T>`
`ApiResponse<T>` es la interface que define la estructura unica con la que el frontend recibe **TODAS** las respuestas de las APIs (internas y externas). Sin importar que responda el backend, `src\shared\http-client` envuelve toda respuesta HTTP en este contrato; el generico `<T>` tipa el contenido de `data`:

```ts
export interface ApiResponse<T = any> {
  success: boolean;
  status: number;
  message: string;
  data: T;
}
```

Ruta del import:

```ts
import { ApiResponse } from '@/shared/http-client/data-types/interfaces/http-client.interface';
```

## 🔀 Flujo para Consumir API:
Toda petición tiene que pasa primero por `src\shared\http-client`, y desde ahí se dirige a las APIs internas y externas. Los dos destinos posibles del flujo son:

```txt
                     ┌──────────────────────────────┐
                     │           Frontend           │
                     └──────────────┬───────────────┘
                                    │
                                    ↓
                     ┌──────────────────────────────┐
                     │  httpResource / HttpClient   │
                     └──────────────┬───────────────┘
                                    │
                                    ↓
             ┌──────────────────────────────────────────────┐
             │    Interceptors de src\shared\http-client    │
             │  (por aqui pasan TODAS las peticiones HTTP)  │
             └──────────────────────┬───────────────────────┘
                                    │
                 ┌──────────────────┴──────────────────┐
                 ↓                                     ↓
┌──────────────────────────────────┐  ┌──────────────────────────────────┐
│          Internal APIs           │  │          External APIs           │
│ (Servicio interno / First-Party) │  │ (Servicio externo / Third-Party) │
└──────────────────────────────────┘  └──────────────────────────────────┘
```

## 📥 Estandarización de Respuestas al Contrato `ApiResponse<T>`
Toda respuesta que pasa por `HttpClient` termina envuelta en el contrato `ApiResponse<T>`, sin importar el escenario:

| Escenario | Quién lo estandariza | Resultado |
| --------- | -------------------- | --------- |
| 2xx con body que cumple el contrato | `success.interceptor` → normalizer (Caso 1) | El body pasa tal cual |
| 2xx con body fuera del contrato (array plano, string, objeto cualquiera, `null` de un 204) | `success.interceptor` → normalizer (Caso 2) | Se envuelve: `success: true`, `data` = body crudo, message del body o `FALLBACK_MESSAGE(status)` |
| Petición que tarda >1 minuto | `timeout.interceptor` | Respuesta sintética 408 envuelta |
| Backend que "miente" (status del body ≠ status HTTP real) | `getRealHttpStatus` en ambos interceptores | Siempre gana el status real de `HttpClient` + `console.error` de alerta |
| Cualquier petición HTTP en curso (exitosa, errónea o con timeout) | `loader.interceptor` | No toca el body: estandariza el icono de carga global (`fixed-loader`). Un CONTADOR de peticiones activas muestra el loader mientras sea > 0 y `finalize()` lo oculta solo cuando llega a 0, incluso si la respuesta falló; se desactiva por petición con el token `SHOW_LOADER` en `false` |

## Manejo Global de Errores (`src\shared\http-client\response\error-handling`)

| Escenario | Quién lo estandariza | Resultado |
| --------- | -------------------- | --------- |
| 4xx/5xx con o sin contrato | `error.interceptor` | Se envuelve, el error se "traga" y sale como respuesta sintética; además dispara los handlers globales (401/403/404/429/5xx) |
| Error de red / servidor caído (`status 0`, body `ProgressEvent`) | `error.interceptor` | `success: false`, message = `error.message` de Angular; el handler global no actúa (status 0 se ignora a propósito) |
| JSON malformado del backend | `error.interceptor` (Angular lo reporta como error de parsing) | Envuelto con el message de parsing de Angular |
| Acciones globales según el status de error (401/403/404/429/5xx) | `global-error-handler.service.ts` (orquestador, invocado por `error.interceptor`) | Redirige cada status a su handler dedicado: 401 → `unauthenticated`, 403 → `forbidden`, 404 → `not-found`, 429 → `too-many-requests` y cualquier status >= 500 se normaliza al bucket 500 → `server-error`. Si el status no está mapeado (o es 0) no ejecuta ninguna acción (`noop`) |

## Reglas de `src\shared\http-client`
1. **PROHIBIDO** escribir logica de negocio/dominio en cualquier archivo de `src\shared\http-client`: todo su codigo tiene que ser agnostico al negocio, es decir, limitarse a responsabilidades transversales de HTTP (interceptores, normalizacion del contrato `ApiResponse<T>`, manejo global de errores, loader, logs) y funcionar igual en cualquier proyecto sin conocer las features que lo consumen.

## Reglas OBLIGATORIAS para Consumir API
1. **PROHIBIDO** usar cualquier otro metodo para consumir APIs que no sea HttpClient como fetch o axios directo

2. **PROHIBIDO** usar `try/catch` y sus equivalentes de Angular/RxJS: `catchError()` de RxJS, el callback `error` de `subscribe({ next, error })`, `.catch()` de Promises con `firstValueFrom()`. Esto **NO** es un bug, es una desición de arquitectura de software, intencional para estandarizar respuesta de APIs.

  **Explicacion:** El `src\shared\http-client\response\error-handling\error.interceptor.ts` se "traga" el error: **NUNCA** se propaga con `throw` ni llega al consumidor; en su lugar emite una respuesta sintetica envuelta en el contrato `ApiResponse<T>`. **Las peticiones HTTP erroneas NUNCA llegaran al bloque catch**, por eso el `try/catch` (y sus equivalentes) seria codigo muerto que jamas se ejecuta.

3. **PROHIBIDO** propagar los errores de las peticiones HTTP: esta prohibido usar `throw new Error()`, `throw error` o `throwError()` de RxJS. Si nadie lanza errores, no existe nada que capturar y el `try/catch` (y sus equivalentes) pierde toda razon de existir

4. **SIEMPRE** todas las peticiones HTTP exitosas y erroneas tienen que validarse con la key `success`: es la key `success: boolean` del contrato `ApiResponse<T>` que envuelve toda respuesta HTTP; la calcula `src\shared\http-client` a partir del http status real de la respuesta (`true` cuando el status es 2xx, `false` en cualquier otro caso). Validar con la key `success` (desestructurada, ver regla 6) es la sustitucion a la propagacion de errores y al `try/catch`: `if (!success) return;` es la unica validacion que necesita el consumidor

5. **PROHIBIDO** (en la gran mayoria de los casos) crear un estado booleano propio (signal, variable, etc.) para mostrar y ocultar el icono de cargando: `src\shared\http-client\loader\interceptors\loader.interceptor.ts` ya se encarga de mostrarlo y ocultarlo automaticamente en TODAS las peticiones HTTP, a traves del componente `src\shared\http-client\loader\design\ui\fixed-loader`.

   **Caso muy especial (extremadamente raro):** se permite desactivar el icono de cargando **EXCLUSIVAMENTE** en peticiones HTTP donde, por experiencia de usuario, sea totalmente necesario **NO** bloquear la UI (pantalla) con el `position: fixed` del componente `fixed-loader`. Para ese unico caso, pasar el token `SHOW_LOADER` (exportado por `loader.interceptor.ts`, por defecto `true`) en `false` en esa peticion concreta:

   ```ts
   import { environment } from '@/environments/environment';

   async getTasks(): Promise<void> {
     const { success, data } = await firstValueFrom(
       this.http.get<ApiResponse<Task[]>>(`${environment.api}tasks`, {
         context: new HttpContext().set(SHOW_LOADER, false),
       }),
     );

     if (!success) return;

     this.tasks.set(data);
   }
   ```

6. **OBLIGATORIO** desestructurar las keys del contrato `ApiResponse<T>` (`success`, `status`, `message`, `data`) al consumir la respuesta. Esta **PROHIBIDO** acceder directamente a las keys sin desestructurar: `response.success`, `response.status`, `response.message` y `response.data`.

7. **OBLIGATORIO** usar early return pattern al validar la key `success` de las peticiones HTTP: validar primero el caso fallido y salir de inmediato con `if (!success) return;`, para que la logica principal quede en el nivel raiz de la funcion, sin anidacion.

8. **OBLIGATORIO** importar los environment SIEMPRE desde el archivo base `@/environments/environment`. Esta **PROHIBIDO** importar directamente un archivo de entorno especifico (`environment.localhost`, `environment.test`, `environment.prod`): el build de Angular (`fileReplacements` segun el script de `package.json`) es quien reemplaza el archivo base por el del entorno que corresponda; importar uno especifico quema el entorno y rompe ese reemplazo.

9. **OBLIGATORIO** construir la URL de toda peticion HTTP concatenando `environment.api` + el endpoint. `environment.api` es la URL base de la API segun el entorno de ejecucion (por ejemplo `'http://localhost:3000/api/v1/'`), asi el mismo codigo funciona en localhost, pruebas y produccion sin modificar nada. Esta **PROHIBIDO** quemar (hardcodear) la URL base en la peticion.

10. **PROHIBIDO** usar `async/await` con `lastValueFrom()` de RxJS: la unica forma permitida de convertir el Observable de `HttpClient` en Promise es `firstValueFrom()`. Razon: `firstValueFrom()` resuelve apenas llega la PRIMERA emision, mientras que `lastValueFrom()` solo resuelve cuando el Observable se COMPLETA; aplicado a un stream que nunca se completa, la Promise queda colgada para siempre y el `await` bloquea ese flujo indefinidamente. En una peticion HTTP ambos se comportan igual (HttpClient emite un unico valor y completa), por eso se estandariza `firstValueFrom()` como unico patron.

11. **PROHIBIDO** usar `toPromise()`: esta deprecado desde RxJS 7 y eliminado en RxJS 8, por lo que es codigo legacy que rompera al actualizar la libreria. Ademas su comportamiento es ambiguo: resuelve con el ULTIMO valor solo cuando el Observable se completa y resuelve con `undefined` si se completa sin emitir, lo que obliga a tipar el resultado como `T | undefined`. El reemplazo oficial y unico permitido en este proyecto es `firstValueFrom()` (ver regla 10).

## Casos Donde Usar `async/await con firstValueFrom()`

## Casos Donde Usar Observable
* Debounce para retrasar peticiones HTTP al buscar en OnChange de input

## Casos Donde Usar `toSignal`
Re-fetch reactivo

## Casos Donde Usar `httpResource`
* Usar httpResource para peticiones HTTP GET que requieran reactividad. No utilizarlo para mutaciones (POST, PUT, PATCH o DELETE); en esos casos, utilizar directamente HttpClient.

# INCOMPLETO - VERIFICAR Q EN "CONSUMO DE API" HAYA ESCRITO LO Q ESTA EN SIGUIENTE TEXTO

```txt
En nuevo proyecto angular

En esta sección
https://github.com/DanielPinedaM/nuevo-proyecto-Angular#-consumo-de-api

Explicar con ejemplos y usando http gateway observable cuando usar cada uno de los patrones angular  para consumir API que son los siguientes

async await  firstValueFrom

toSignal()

RxJS operators (switchMap, mergeMap, concatMap, exhaustMap, debounceTime, distinctUntilChanged) - este ejemplo debe ser de debounce

ejecuta varias promesas en paralelo y devuelve los resultados cuando todas terminan correctamente; si una falla, la operación completa falla

Ejecutar todas las peticiones en paralelo sin importar si fallan o son exitosas

Esperar que una petición  termine antes de la siguiente

Segunda petición depende del resultado de la primera

Ejecutar peticiones secuencialmente

Explicar la diferencia y cuando usar first value from y observables para hacer petición http

También me falta ejemplo de llamar API usando  observable

Observable no espera , es asíncrono , es como si pasara derecho , y cuando se resuelva la llamada a la API (promesa) entonces obtiene (devuelve) la respuesta 

first value from usa await por lo q espera antes de continuar con la siguiente linea de código

Observable sirve para hacer debounce


Además, `GatewayApiService` maneja:

* icono de loader global
* timeout
* logging
* logger
* validaciones de seguridad (guards)
```

# ❌ Angular Legacy VS ✅ Angular Moderno

## 📜 Regla Obligatoria
Usar Angular 22 moderno. **NUNCA** usar Angular legacy:
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

* Estado global con signals

* `input()` y `output()` con signals importados desde `import { input, output } from '@angular/core'`

* Standalone Components

* Function Interceptors

* **Control Flow Directives:** `@for`, `@if`, `@switch`, `@case`, `@default`

* Inyeccion de dependencias con `inject()`

* Para servicios singleton usar `@Service()`

## 📝 Formularios

[Tutorial de formularios reactivos con signals](https://youtu.be/7V9I9_qwx74?si=m5Bn3_ygcEEuSpXx)

# INCOMPLETO - aqui me falta agregar ejemplos del equivalente entre FormGroup y Signal forms

OBLIGATORIO Utilizar Signal Forms junto con los componentes UI de formularios de Spartan NG. PROHIBIDO utilizar `ngModel` (Template-driven Forms) o `FormGroup` (Reactive Forms), incluyendo Typed Reactive Forms.

## 🧹 Sufijos en nombres de archivos

[Angular moderno eliminó la necesidad de usar sufijos como:](https://www.reddit.com/r/angular/comments/1lk8r9k/bring_back_suffixes_in_angular_20_cli_need_20/?tl=es-419)

- `.component`
- `.service`
- `.directive`
- `.pipe`

porque con el tipo del archivo ya se entiende que hace el archivo por el decorador de Angular (`@Component`, `@Injectable`, etc).

**❌ Angular moderno sin sufijos**

| Nombre Archivo   | Tipo de Archivo | decorador / tipo Angular |
| ---------------- | --------------- | ------------------------ |
| `login.ts`       | componente      | `@Component`             |
| `auth.ts`        | servicio        | `@Injectable`            |
| `auth-guard.ts`  | guard           | `CanActivateFn`          |
| `list-table.ts`  | componente      | `@Component`             |
| `format-date.ts` | pipe            | `@Pipe`                  |
| `highlight.ts`   | directiva       | `@Directive`             |

**✅ Convención usada en este proyecto**

Aunque Angular moderno ya no obliga a usar sufijos, en este proyecto sí se siguen utilizando para mantener mayor claridad y organización.

Esto facilita:

- Identificar rápidamente el tipo de archivo.

- Mejorar la lectura de imports.

- Evitar confusión en proyectos grandes.

- Mantener consistencia entre carpetas y archivos.

| Nombre Archivo            | Tipo de Archivo | decorador / tipo Angular |
| ------------------------- | --------------- | ------------------------ |
| `login.component.ts`      | componente      | `@Component`             |
| `auth.service.ts`         | servicio        | `@Injectable`            |
| `auth.guard.ts`           | guard           | `CanActivateFn`          |
| `list-table.component.ts` | componente      | `@Component`             |
| `format-date.pipe.ts`     | pipe            | `@Pipe`                  |
| `highlight.directive.ts`  | directiva       | `@Directive`             |

## 🧩 Standalone Components

En Angular moderno `AppModule` (`app.module.ts`) ya no es necesario.

Angular reemplazó la arquitectura basada en módulos (`NgModule`) por componentes standalone.

Además:

- Ya **NO** es necesario escribir `standalone: true` en los componentes.

- `standalone` ahora es `true` por defecto.

- Cada componente importa directamente sus propias dependencias en array `imports: []`

***❌ Ejemplo Incorrecto - Angular legacy - `AppModule`***

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

***✅ Ejemplo Correcto - Angular moderno con Standalone Components***

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
| ----------------------------- | ------------------------ |
| `*ngFor`                      | `@for`                   |
| `*ngIf`                       | `@if`                    |
| `*ngSwitch`                   | `@switch`                |
| `*ngSwitchCase`               | `@case`                  |
| `*ngSwitchDefault`            | `@default`               |

### **[`@for`](https://angular.dev/api/core/@for)**

***❌ Incorrecto - Angular legacy - `*ngFor`\***

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

**✅ Correcto - Angular moderno `@for`**

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

***❌ Incorrecto - Angular legacy - `*ngIf`\***

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

**✅ Correcto - Angular moderno `@if` y `@else if`**

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

***❌ Incorrecto - Angular legacy - `*ngSwitch`\***

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

**✅ Correcto - Angular moderno `@switch`, `@case`, `@default`**

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

- menos boilerplate.

- evitar constructores gigantes.

- mejor legibilidad

- mejor tipado

- mejor compatibilidad con `Signals`.

***❌ Ejemplo incorrecto - Angular legacy - `constructor()`***

```TS
/* my-component.component.ts */
import { Component } from '@angular/core';
import { GatewayApiService } from '@/shared/services/api/http-client/http-gateway-observable.api';
import LuxonService from '@/shared/services/Luxon.service';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
})
export class MyComponent {
  constructor(
    private http: GatewayApiService,
    private dateUtils: LuxonService,
  ) {}

  // ...
}
```

***✅ Ejemplo correcto - Angular moderno `inject()`***

```TS
/* my-component.component.ts */
import { Component, inject } from '@angular/core';
import { GatewayApiService } from '@/shared/services/api/http-client/http-gateway-observable.api';
import LuxonService from '@/shared/services/Luxon.service';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
})
export class MyComponent {
  http = inject(GatewayApiService);
  luxon = inject(LuxonService);

  // ...
}
```

## 📡 Estado

[Tutorial de `signal`](https://youtu.be/jqGjE6iqkvg?si=9PJ8N08wo-M1_GIh)

Este proyecto **tiene** que usar signals para estados, **NO** estados tradicionales de Angular legacy.

Los signals son reactivos, cuando un signal cambia:

- Angular actualiza automáticamente todo lo que depende de ese estado.

- No es necesario sincronizar estados manualmente.

- No hace falta usar BehaviorSubject para compartir reactividad.

- Se escribe menos código.

- La reactividad es más simple y mantenible.

- Evita múltiples `subscribe()` innecesarios.

***❌ Ejemplo incorrecto - Angular legacy - estado tradicional NO reactivo automáticamente***

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

***✅ Ejemplo correcto - Angular moderno estados con `signal`***

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

\****❌ Ejemplo incorrecto - Angular legacy - `@Input()`, `@Output()` y `*ngFor`***

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

***✅ Ejemplo correcto - Angular moderno `input()` signal, `output()` y `@for`***

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

## Servicios singleton

Usar `@Service()` en vez de `@Injectable({providedIn: 'root'})`. `@Service()` es el equivalente moderno y conciso, ya provee la instancia como singleton en root por defecto, sin configuración extra. Reservar `@Injectable` solo para casos avanzados (constructor injection, useClass/useValue/useFactory, scopes distintos a root).

***✅ Ejemplo correcto***

```TS
import { Service } from '@angular/core';

@Service()
export class LoaderService { }
```

***❌ Ejemplo Incorrecto:***

```TS
@Injectable({providedIn: 'root'})
export class LoaderService { }
```
