import {
  MIN_LENGTH_PASSWORD,
  SECURE_PASSWORD_ERROR_MESSAGE,
} from '@/app/features/auth/data-types/constants/auth.const';
import { IObjValidatePassword } from '@/app/features/auth/data-types/interfaces/auth.interfaces';
import CONST_REGEX from '@/shared/data-types/constants/regex.const';
import DataTypeService from '@/shared/services/DataType.service';
import ToastService from '@/shared/services/Toast.service';
import { inject, Service } from '@angular/core';

@Service()
export default class GeneralService {
  dataTypeClass = inject(DataTypeService);
  toast = inject(ToastService);

  strongPassword = (password: string): boolean => {
    return CONST_REGEX.text.strongPassword.test(password);
  };

  /**
  valida que...
  1) coincidan 2 inputs de contraseñas
  2) la contraseña sea segura */
  validatePasswords = (password: string, confirmPassword: string): IObjValidatePassword => {
    const objValidatePassword: IObjValidatePassword = {
      error: true,
      message: '',
      minLength: MIN_LENGTH_PASSWORD,

      password,
      confirmPassword,
    };

    // mensajes de error
    const type = 'Digite';
    const containMinimum = `debe contener mínimo ${MIN_LENGTH_PASSWORD} caracteres`;
    const notAText = 'no es un texto';

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

    // validar q contraseña tenga el numero de caracteres de la variable MIN_LENGTH_PASSWORD

    // contraseña - hacer obligatorio
    if (password === '') {
      objValidatePassword.message = type + ' ' + 'contraseña';
      return objValidatePassword;
    }

    // contraseña - validar numero caracteres
    if (password.length < MIN_LENGTH_PASSWORD) {
      objValidatePassword.message = 'Contraseña' + ' ' + containMinimum;
      return objValidatePassword;
    }

    // contraseña - validar q sea segura
    if (!this.strongPassword(password)) {
      objValidatePassword.message =
        'Contraseña no es segura,' + ' ' + SECURE_PASSWORD_ERROR_MESSAGE;
      return objValidatePassword;
    }

    // confirmar contraseña - hacer obligatorio
    if (confirmPassword === '') {
      objValidatePassword.message = type + ' ' + 'confirmar contraseña';
      return objValidatePassword;
    }

    // confirmar contraseña - validar numero caracteres
    if (confirmPassword.length < MIN_LENGTH_PASSWORD) {
      objValidatePassword.message = 'Confirmar contraseña' + ' ' + containMinimum;
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
        'Confirmar contraseña no es segura,' + ' ' + SECURE_PASSWORD_ERROR_MESSAGE;
      return objValidatePassword;
    }

    // NO hay error en las validaciones de la contraseña
    objValidatePassword.error = false;
    objValidatePassword.message = '';
    return objValidatePassword;
  };

  /**
  copiar texto en portapapeles */
  public copyText = (text: string): void => {
    const errorMessage = 'No se pudo copiar el texto';

    if (!this.dataTypeClass.isString(text)) {
      this.toast.error(errorMessage);
      console.error('❌ error, text NO es tipo string\ntypeof text ', typeof text);
      return;
    }

    if (text.trim() === '') {
      this.toast.error(errorMessage);
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

    this.toast.success('Texto copiado');
  };
}
