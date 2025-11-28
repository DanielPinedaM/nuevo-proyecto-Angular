import { constRegex } from '@/shared/models/constants/regex.const';
import DataTypeClass from '@/shared/utils/class/DataTypeClass.utils';
import HotToastClass from './notification/HotToastClass.utils';
import { inject, Injectable } from '@angular/core';
import { Options, titleCase as titleCaseNpm } from 'title-case';
import { titleCaseOptions } from '@/shared/models/constants/title-case.const';
import {
  minLengthPassword,
  securePasswordErrorMessage,
} from '@/app/auth/models/constants/auth.const';
import { IObjValidatePassword } from '@/app/auth/models/interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root',
})
export default class GeneralClass {
  dataTypeClass = inject(DataTypeClass);
  hotToast = inject(HotToastClass);

  strongPassword = (password: string): boolean => {
    return constRegex.text.strongPassword.test(password);
  };

  /**
  valida que...
  1) coincidan 2 inputs de contraseñas
  2) la contraseña sea segura */
  validatePasswords = (
    password: string,
    confirmPassword: string
  ): IObjValidatePassword => {
    const objValidatePassword: IObjValidatePassword = {
      error: true,
      message: '',
      minLength: minLengthPassword,

      password,
      confirmPassword,
    };

    // mensajes de error
    const type: string = 'Digite';
    const containMinimum: string = `debe contener mínimo ${minLengthPassword} caracteres`;
    const notAText: string = 'no es un texto';

    // validar q contraseña y confirmar contraseña sean tipo string
    if (!this.dataTypeClass.isString(password)) {
      objValidatePassword.message = 'Contraseña' + ' ' + notAText;
      //objValidatePassword.minLength = 99999;
      return objValidatePassword;
    }
    if (!this.dataTypeClass.isString(confirmPassword)) {
      objValidatePassword.message = 'Confirmar contraseña' + ' ' + notAText;
      //objValidatePassword.minLength = 99999;
      return objValidatePassword;
    }

    // eliminar espacios en blanco al principio y final de contraseña y confirmar contraseña
    password = password.trim();
    confirmPassword = confirmPassword.trim();

    // validar q contraseña tenga el numero de caracteres de la variable minLengthPassword

    // contraseña - hacer obligatorio
    if (password === '') {
      objValidatePassword.message = type + ' ' + 'contraseña';
      return objValidatePassword;
    }

    // contraseña - validar numero caracteres
    if (password.length < minLengthPassword) {
      objValidatePassword.message = 'Contraseña' + ' ' + containMinimum;
      return objValidatePassword;
    }

    // contraseña - validar q sea segura
    if (!this.strongPassword(password)) {
      objValidatePassword.message =
        'Contraseña no es segura,' + ' ' + securePasswordErrorMessage;
      return objValidatePassword;
    }

    // confirmar contraseña - hacer obligatorio
    if (confirmPassword === '') {
      objValidatePassword.message = type + ' ' + 'confirmar contraseña';
      return objValidatePassword;
    }

    // confirmar contraseña - validar numero caracteres
    if (confirmPassword.length < minLengthPassword) {
      objValidatePassword.message =
        'Confirmar contraseña' + ' ' + containMinimum;
      return objValidatePassword;
    }

    // validar q las contraseñas sean iguales
    if (password !== confirmPassword) {
      objValidatePassword.message = 'Las contraseñas no coinciden';
      return objValidatePassword;
    }

    // confirmar contraseña - validar q sea segura
    if (!this.strongPassword(confirmPassword)) {
      objValidatePassword.message =
        'Confirmar contraseña no es segura,' + ' ' + securePasswordErrorMessage;
      return objValidatePassword;
    }

    // NO hay error en las validaciones de la contraseña
    objValidatePassword.error = false;
    objValidatePassword.message = '';
    return objValidatePassword;
  };

  /**
  prime NG - calcular paginador y numero de filas q se muestran en <table>
  el algoritmo funciona mejor si rows es multiplo de 3, pero puede ser cualquier numero */
  rowsPerPageOptions = (length: number = 0, rows: number = 0): number[] => {
    if (typeof length !== 'number') {
      console.error(
        'para calcular el numero de filas del paginador de prime NG la el parametro de la longitud length del array debe ser tipo number',
        typeof length
      );
      return [];
    }

    if (length === 0) return [];
    if (rows === 0) return [];

    // longitud de la data <= numero inicial de filas q se muestran
    if (length <= rows) return [];

    let opciones: number[] = [];

    // length SI es multiplo de 3
    if (length % 3 === 0) {
      opciones = [rows, length / 3, (length / 3) * 2, length];

      // length NO es multiplo de 3
    } else {
      // redondear hacia abajo (longitud de la data / 3)
      const third = Math.floor(length / 3);

      // numero inicial de filas q se muestran
      opciones.push(rows);
      opciones.push(third);
      opciones.push(third * 2);
      // longitud de la data
      opciones.push(length);
    }

    // numero paginas cumple estas condiciones:
    // 1) >= numero inicial de filas q se muestran
    // 2) <= longitud de la data q se muestra en la tabla
    // 3) ...new Set todos los numeros de pagina tienen q ser unicos
    // 4) ordenar ascendente (de menor a mayor)
    return [
      ...new Set(
        opciones.filter((option: number) => option >= rows && option <= length)
      ),
    ].sort((a, b) => a - b);
  };

  /**
  recortar un string a un tamaño de caracteres máximo,
  agregando "..." si excede la longitud especificada */
  truncateString = (string: string | any, maxLength: number): string | any => {
    if (typeof string === 'string' && string.length > maxLength) {
      return string.slice(0, maxLength) + '...';
    }

    return string;
  };

  /**
  hacer q los string tengan mayuscula inicial */
  titleCase = (string: string, options?: Partial<Options>): string | any => {
    if (!this.dataTypeClass.isString(string)) return string;
    if (String(string).trim() === '') return '';

    const finalOptions: Options = { ...titleCaseOptions, ...options };

    return titleCaseNpm(string, finalOptions);
  };

  /**
  Separar array por comas
  Ejemplo: [1, 2, 3] devuelve 1, 2 y 3 */
  listFormat = (array: any[]): string => {
    const arrayString: string[] = array.map((item) => String(item));
    return new Intl.ListFormat('es').format(arrayString);
  };

  /**
  copiar texto en portapapeles */
  public copyText = (text: string): void => {
    const errorMessage: string = 'No se pudo copiar el texto';

    if (!this.dataTypeClass.isString(text)) {
      this.hotToast.errorNotification(errorMessage);
      console.error(
        '❌ error, text NO es tipo string\ntypeof text ',
        typeof text
      );
      return;
    }

    if (text.trim() === '') {
      this.hotToast.errorNotification(errorMessage);
      console.error("❌ error, text es un string vacio ''\ntext ", text);
      return;
    }

    const selBox: HTMLTextAreaElement = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = text;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.hotToast.successNotification('Texto copiado');
  };

  /**
  obtener elemento de un array de forma aleatoria */
  getRandomItem = <T>(array: T[]): T | null => {
    if (!Array.isArray(array)) {
      console.error(
        '❌ error - getRandomItem - se requiere q sea tipo \narray ',
        array,
        '\n¿es array? ',
        Array.isArray(array)
      );
      return null;
    }

    const max: number = array.length;

    if (max === 0) {
      console.error(
        '❌ error - getRandomItem - el array ',
        array,
        'no puede estar vacío \nmax',
        max
      );
      return null;
    }

    const randomArray: Uint32Array = new Uint32Array(1);
    crypto.getRandomValues(randomArray);

    const index: number = randomArray[0] % max;

    return array[index];
  };
}
