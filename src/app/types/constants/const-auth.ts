/*
 ***************************************************
 * Constantes para autenticacion:                  *
 * Iniciar sesion, registro y recuparar contraseña *
 *************************************************** */

import path from '@/app/types/constants/cons-path';

/**
cambiar numero de esta variable minLengthContrasena
para modifcar la validacion del numero de caracteres de la contraseña */
export const minLengthPassword: number = 6;

export const securePasswordErrorMessage: string =
  'debe contener un caracter especial, un número, una mayúscula y una minúscula';

/**
Encriptar y desencriptar texto */
export const secretKeyAuthentication: string = 'GestionAlcaldeCO';
export const IVAuth: string = 'encryptionIntVec';

/**
ruta de inicio para administrador y usuario */
export const initRoute: string = `/${path.home.home}/${path.home.bots}`;
