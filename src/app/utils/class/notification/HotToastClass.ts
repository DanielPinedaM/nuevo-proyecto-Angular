import { Injectable } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import { DataTypeClass } from '@/app/utils/class/DataTypeClass';

@Injectable({
  providedIn: 'root',
})
export default class HotToastClass {
  constructor(private toast: HotToastService) {}

  successNotification(message: string): void {
     if (!(DataTypeClass.isString(message))) {
       console.error("❌ error - successNotification - ngxpert/hot-toast necesita el mensaje tipo string");
       return;
     }

     if (String(message).trim() === "") {
       console.error("❌ error - successNotification - ngxpert/hot-toast - el mensaje no puede ser un string vacio ''");
       return;
     }

    this.toast.success(`Éxito: ${message}`, {
      icon: '<span class="material-symbols-outlined !text-white">check_circle</span>',
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#22c561',
        color: '#fff',
      },
    });
  }

  errorNotification(message: string): void {
     if (!(DataTypeClass.isString(message))) {
       console.error("❌ error - errorNotification - ngxpert/hot-toast necesita el mensaje tipo string");
       return;
     }

     if (String(message).trim() === "") {
       console.error("❌ error - errorNotification - ngxpert/hot-toast - el mensaje no puede ser un string vacio ''");
       return;
     }

    this.toast.error(`Error: ${message}`, {
      icon: '<span class="material-symbols-outlined !text-white">cancel</span>',
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#d03035',
        color: '#fff',
      },
    });
  }

  infoNotification(message: string): void {
     if (!(DataTypeClass.isString(message))) {
       console.error("❌ error - infoNotification - ngxpert/hot-toast necesita el mensaje tipo string");
       return;
     }

     if (String(message).trim() === "") {
       console.error("❌ error - infoNotification - ngxpert/hot-toast - el mensaje no puede ser un string vacio ''");
       return;
     }

    this.toast.info(`Aviso: ${message}`, {
      icon: '<span class="material-symbols-outlined !text-white">info</span>',
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#61aaec',
        color: '#fff',
      },
    });
  }

  warningNotification(message: string): void {
     if (!(DataTypeClass.isString(message))) {
       console.error("❌ error - warningNotification - ngxpert/hot-toast necesita el mensaje tipo string");
       return;
     }

     if (String(message).trim() === "") {
       console.error("❌ error - warningNotification - ngxpert/hot-toast - el mensaje no puede ser un string vacio ''");
       return;
     }

    this.toast.success(`Advertencia: ${message}`, {
      icon: '<span class="material-symbols-outlined !text-white">warning</span>',
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#f4d745',
        color: '#fff',
      },
    });
  }
}
