import { inject, Injectable } from '@angular/core';
import { HotToastService, ToastPosition } from '@ngxpert/hot-toast';
import DataTypeService from '@/shared/services/DataType.service';

const TOAST_CONTAINER_STYLE = {
  padding: '3px 6px',
  borderRadius: '8px',
  margin: '8px 8px 0 0',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
};

@Injectable({
  providedIn: 'root',
})
export default class ToastService {
  dataTypeClass = inject(DataTypeService);
  toast = inject(HotToastService);

  private duration: number = 4000;
  private position: ToastPosition = 'top-right';

  #normalizeMessage(message: string): string {
    return message
      .trim()
      .replaceAll(/\s+/g, ' ') // reemplazar múltiples espacios en blanco por un solo espacio en blanco
      .replaceAll('undefined', '')
      .replaceAll('null', '')
      .replaceAll('NaN', '');
  }

  success(message: string): void {
    if (!this.dataTypeClass.isString(message)) {
      console.error(
        '❌ Toast.utils.ts - ngxpert/hot-toast necesita el mensaje tipo string',
      );
      return;
    }

    if (String(message).trim() === '') {
      console.error(
        "❌ Toast.utils.ts - ngxpert/hot-toast - el mensaje no puede ser un string vacio ''",
      );
      return;
    }

    this.toast.show(`Éxito: ${this.#normalizeMessage(message)}`, {
      icon: '<div class="flex h-full w-fit items-center"><span class="material-symbols-outlined text-white">check_circle</span><div/>',
      duration: this.duration,
      position: this.position,
      style: {
        background: '#22c561',
        color: '#fff',
        ...TOAST_CONTAINER_STYLE,
      },
    });
  }

  error(message: string): void {
    if (!this.dataTypeClass.isString(message)) {
      console.error(
        '❌ Toast.utils.ts - ngxpert/hot-toast necesita el mensaje tipo string',
      );
      return;
    }

    if (String(message).trim() === '') {
      console.error(
        "❌  Toast.utils.ts - ngxpert/hot-toast - el mensaje no puede ser un string vacio ''",
      );
      return;
    }

    this.toast.show(`Error: ${this.#normalizeMessage(message)}`, {
      icon: '<div class="flex h-full w-fit items-center"><span class="material-symbols-outlined text-white">cancel</span><div/>',
      duration: this.duration,
      position: this.position,
      style: {
        background: '#d03035',
        color: '#fff',
        ...TOAST_CONTAINER_STYLE,
      },
    });
  }

  info(message: string): void {
    if (!this.dataTypeClass.isString(message)) {
      console.error(
        '❌  Toast.utils.ts - ngxpert/hot-toast necesita el mensaje tipo string',
      );
      return;
    }

    if (String(message).trim() === '') {
      console.error(
        "❌  Toast.utils.ts - el mensaje no puede ser un string vacio ''",
      );
      return;
    }

    this.toast.show(`Aviso: ${this.#normalizeMessage(message)}`, {
      icon: '<div class="flex h-full w-fit items-center"><span class="material-symbols-outlined text-white">info</span><div/>',
      duration: this.duration,
      position: this.position,
      style: {
        background: '#61aaec',
        color: '#fff',
        ...TOAST_CONTAINER_STYLE,
      },
    });
  }

  warning(message: string): void {
    if (!this.dataTypeClass.isString(message)) {
      console.error(
        '❌  Toast.utils.ts - ngxpert/hot-toast necesita el mensaje tipo string',
      );
      return;
    }

    if (String(message).trim() === '') {
      console.error(
        "❌ Toast.utils.ts - ngxpert/hot-toast - el mensaje no puede ser un string vacio ''",
      );
      return;
    }

    this.toast.show(`Advertencia: ${this.#normalizeMessage(message)}`, {
      icon: '<div class="flex h-full w-fit items-center"><span class="material-symbols-outlined text-white">warning</span><div/>',
      duration: this.duration,
      position: this.position,
      style: {
        background: '#f4d745',
        color: '#fff',
        ...TOAST_CONTAINER_STYLE,
      },
    });
  }
}
