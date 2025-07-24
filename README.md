# Angular 20 + Prime NG 20 + Tailwind 4

#### Instalar paquetes

```javascript
nvm install 22.17.1
```

```javascript
nvm use 22.17.1
```

```javascript
npm i
```

#### [Ejecutar proyecto](https://youtu.be/xBMEvd7PyEY?si=4KH0nBKGi1dz0rW1)

```javascript
nvm use 22.17.1
```

comando | apunta a... | ruta archivo
------------ | ------------- | -------------
node --run start:dev | localhost | src/environments/environment.development.ts
node --run start:test | pruebas | src/environments/environment.test.ts
node --run start:prod | producción | src/environments/environment.ts

#### Generar build (dist) para desplegar

```javascript
nvm use 22.17.1
```

comando | apunta a... | ruta archivo
------------ | ------------- | -------------
node --run build:test | pruebas | src/environments/environment.test.ts
node --run build:prod | producción | src/environments/environment.ts

#### Estructura del Proyecto

* **src/app/guards/auth.guard.ts**: Protección de rutas

* **src/app/app.routes.ts**: Redireccionamiento de rutas

* Estilos en Tailwind 4 y **src/style/** Sass

* **src/enviroments/**: Variables de entorno

  * **src/enviroments/interface-environment.ts**: interface para tipos de datos de las variables de entorno

  * **src/enviroments/environment.ts**: Variables de entorno de ***produccion***

  * **src/enviroments/environment.test.ts**: Variables de entorno de ***pruebas***

  * **src/enviroments/environment.development.ts**: Variables de entorno de ***desarrollo (local)***

* **src/app/service/api/http.service.ts**: clase general para hacer peticiones http

* **src/app/service/RxJS-BehaviorSubject**: Archivos con [RxJS Behavior Subject](https://www.learnrxjs.io/learn-rxjs/subjects/behaviorsubject)

* **src/app/service/RxJS-BehaviorSubject/layout/loader.service.ts**: loader general. Cuando se ejecuta **http.service.ts** el loader se muestra y oculta

* **src/app/utils/func/sessionStorage.ts** funciones con sessionStorage en base 64

* **src/app/models/constants**: constantes generales para usar en toda la web

* **src/app/models/interface**: interface generales para usar en toda la web

* **src/app/utils/class/GeneralClass.ts**: Clase general con funciones (metodos) generales para usar en toda la web

* **src/app/utils/class/SweetAlertClass.ts**: Clase para abrir ventana modal de Swet Alert 2

* **src/assets/icon**: Iconos de la pagina web

* **src/assets/img**: Imagenes de la pagina web

#### Maquetación
* Todos los componentes de Angular **no** pueden tener archivos de Sass con ```styleUrls```, se tiene que maquetar en Tailwind.

* Mezclar Sass con Tailwind es mala práctica porque Sass sobrescribe los estilos de Tailwind porque Sass tiene más especificidad que Tailwind.

* Los únicos archivos de Sass tienen que ser globales y estar en ```src/style/global```.

#### Modulos
* Usar standalone para importar librerias y componentes

* Asi es como se importa Prime NG en cualquier componente

```javascript
import { PrimeNgModules } from '@/app/imports/import-prime-ng';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bots',
  templateUrl: './bots.component.html',
  imports: [...PrimeNgModules]
})
export class BotsComponent { }
```
