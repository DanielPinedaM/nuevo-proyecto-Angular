/*
 ***************************************************
 * Constantes para autenticacion:                  *
 * Iniciar sesion, registro y recuparar contraseña *
 *************************************************** */

/**
cambiar numero de esta variable minLengthContrasena
para modifcar la validacion del numero de caracteres de la contraseña */
export const MIN_LENGTH_PASSWORD: number = 6;

export const SECURE_PASSWORD_ERROR_MESSAGE: string =
  'debe contener un caracter especial, un número, una mayúscula y una minúscula';

/**
Encriptar y desencriptar texto */
export const SECRET_KEY_AUTHENTICATION: string = 'GestionAlcaldeCO';
export const IV_AUTH: string = 'encryptionIntVec';
