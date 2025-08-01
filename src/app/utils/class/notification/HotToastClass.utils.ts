import { Injectable } from '@angular/core';
import { HotToastService, ToastPosition } from '@ngxpert/hot-toast';
import DataTypeClass from '@/app/utils/class/DataTypeClass.utils';

/**
funciones para mostrar toast */
@Injectable({
  providedIn: 'root',
})
export default class HotToastClass {
  constructor(private toast: HotToastService) {}

  private duration: number = 4000;

  private position: ToastPosition = 'top-right';

  private generalStyle = {
    padding: '3px 6px',
    borderRadius: '8px',
    margin: '8px 8px 0 0',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  };

  private normalizeMessage(message: string): string {
    return message
      .trim()
      .replaceAll(/\s+/g, ' ') // reemplazar múltiples espacios en blanco por un solo espacio en blanco
      .replaceAll('undefined', '')
      .replaceAll('null', '')
      .replaceAll('NaN', '');
  }

  successNotification(message: string): void {
    if (!DataTypeClass.isString(message)) {
      console.error(
        '❌ error - successNotification - ngxpert/hot-toast necesita el mensaje tipo string'
      );
      return;
    }

    if (String(message).trim() === '') {
      console.error(
        "❌ error - successNotification - ngxpert/hot-toast - el mensaje no puede ser un string vacio ''"
      );
      return;
    }

    this.toast.show(`Éxito: ${this.normalizeMessage(message)}`, {
      icon: '<div class="flex h-full w-fit items-center"><span class="material-symbols-outlined !text-white">check_circle</span><div/>',
      duration: this.duration,
      position: this.position,
      style: {
        background: '#22c561',
        color: '#fff',
        ...this.generalStyle,
      },
    });
  }

  errorNotification(message: string): void {
    if (!DataTypeClass.isString(message)) {
      console.error(
        '❌ error - errorNotification - ngxpert/hot-toast necesita el mensaje tipo string'
      );
      return;
    }

    if (String(message).trim() === '') {
      console.error(
        "❌ error - errorNotification - ngxpert/hot-toast - el mensaje no puede ser un string vacio ''"
      );
      return;
    }

    this.toast.show(`Error: ${this.normalizeMessage(message)}`, {
      icon: '<div class="flex h-full w-fit items-center"><span class="material-symbols-outlined !text-white">cancel</span><div/>',
      duration: this.duration,
      position: this.position,
      style: {
        background: '#d03035',
        color: '#fff',
        ...this.generalStyle,
      },
    });
  }

  infoNotification(message: string): void {
    if (!DataTypeClass.isString(message)) {
      console.error(
        '❌ error - infoNotification - ngxpert/hot-toast necesita el mensaje tipo string'
      );
      return;
    }

    if (String(message).trim() === '') {
      console.error(
        "❌ error - infoNotification - ngxpert/hot-toast - el mensaje no puede ser un string vacio ''"
      );
      return;
    }

    this.toast.show(`Aviso: ${this.normalizeMessage(message)}`, {
      icon: '<div class="flex h-full w-fit items-center"><span class="material-symbols-outlined !text-white">info</span><div/>',
      duration: this.duration,
      position: this.position,
      style: {
        background: '#61aaec',
        color: '#fff',
        ...this.generalStyle,
      },
    });
  }

  warningNotification(message: string): void {
    if (!DataTypeClass.isString(message)) {
      console.error(
        '❌ error - warningNotification - ngxpert/hot-toast necesita el mensaje tipo string'
      );
      return;
    }

    if (String(message).trim() === '') {
      console.error(
        "❌ error - warningNotification - ngxpert/hot-toast - el mensaje no puede ser un string vacio ''"
      );
      return;
    }

    this.toast.show(`Advertencia: ${this.normalizeMessage(message)}`, {
      icon: '<div class="flex h-full w-fit items-center"><span class="material-symbols-outlined !text-white">warning</span><div/>',
      duration: this.duration,
      position: this.position,
      style: {
        background: '#f4d745',
        color: '#fff',
        ...this.generalStyle,
      },
    });
  }
}
