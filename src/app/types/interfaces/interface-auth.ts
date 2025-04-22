/*
 ***************************************************
 * Interface para autenticacion:                   *
 * Iniciar sesion, registro y recuparar contraseña *
 *************************************************** */

/**
body para registrar usuario */
export interface IBodyRegister {
  nameUser: string;
  email: string;
  password: string;
  activate: boolean;
}

/**
body para iniciar sesion */
export interface IBodyLogin {
  email: string;
  password: string;
}

/**
body para cambiar contraseña */
export interface IBodyAssignPassword {
  id: number;
  password: string;
}

/**
objeto para validar que:
1) Coincidan 2 inputs de contraseñas
2) La contraseña sea segura */
export interface IObjValidatePassword {
  error: boolean;
  message: string;
  minLength?: number;

  password: string;
  confirmPassword: string;
}

/**
guardar el valor actual de los inpuuts de contraseña y confirmar contraseña */
export interface IInputValuePassword {
  password: string;
  confirmPassword: string;
}
