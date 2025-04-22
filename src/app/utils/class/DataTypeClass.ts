/* *********************************************
 * metodos relacionadas con los tipos de datos *
 * ********************************************* */

export default class DataTypeClass {
  /**
admite cualquier string */
  public static isString = (variable: string | any): boolean => {
    return typeof variable === 'string' || variable instanceof String;
  };

  /**
string q contiene numero,
admite numero decimal, comas, numero entero, positivo y negativo.
Ejemplo: "-1,2.1", "-2", "3" */
  public static isStringNumber = (variable: string | any): boolean => {
    return (
      typeof variable === 'string' &&
      /^(-?\d{0,}(\,|\.)?){0,}$/.test(variable.trim())
    );
  };

  /**
   true cuando el texto contiene cualquier tipo de letra */
  public static isLetter = (variable: string | any): boolean => {
    return (
      typeof variable === 'string' &&
      /^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s]+$/.test(variable.trim())
    );
  };

  /**
   solamente tipo NUMERO, NO admite NaN */
  public static isNumber = (variable: number | any): boolean => {
    return typeof variable === 'number' && Number.isNaN(variable) === false;
  };

  /**
  SI es posible convierte a NUMERO,
  cuando NO es posible devuleve null */
  public static convertToNumber = (number: number | any): number | null => {
    if (DataTypeClass.isNumber(number)) return number as number;

    if (DataTypeClass.isStringNumber(number)) {
      const removeCommas: string = number.trim().replaceAll(',', '.');
      return Number(removeCommas);
    }

    if (DataTypeClass.isString(number) && String(number)?.trim() !== '')
      return number;

    return null;
  };

  /**
  SI es posible
  1) convertir a string
  2) pasar string a minuscula

  cuando NO es posible devuleve null */
  public static convertToStringAndLowerCase = (
    string: string | any
  ): string | null | any => {
    if (String(string).trim() === '' || !string) {
      return null;
    }

    if (DataTypeClass.isString(string)) {
      return String(string).trim().toLowerCase();
    }

    return null;
  };

  public static trimLowerCase = (string: string | any): string | any => {
    if (DataTypeClass.isString(string)) {
      return string.trim().toLowerCase()
    }

    return string;
  };

  /**
   Ejemplo: '  Compañía ' devuelve 'compania', true devuelve true */
  public static normalizeStr = (string: string | any): string | any => {
    if (DataTypeClass.isString(string)) {
      return string
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
    }

    return string;
  };

  public static isBoolean = (variable: boolean | string | any): boolean => {
    const normalized: string = String(variable)?.trim()?.toLowerCase();

    if (
      // true
      normalized === 'true' ||
      normalized === '1' ||
      DataTypeClass.normalizeStr(variable) === 'si' ||
      // false
      normalized === 'false' ||
      normalized === '0' ||
      DataTypeClass.normalizeStr(variable) === 'no'
    ) {
      return true;
    }

    return false;
  };

  /**
  SI es posible
  convertir a booleano
  cuando NO es posible devuleve null */
  public static convertToBoolean = (
    variable: boolean | string | any
  ): boolean | null => {
    const normalized: string = String(variable)?.trim()?.toLowerCase();

    if (
      normalized === 'true' ||
      normalized === '1' ||
      DataTypeClass.normalizeStr(variable) === 'si'
    ) {
      return true;
    } else if (
      normalized === 'false' ||
      normalized === '0' ||
      DataTypeClass.normalizeStr(variable) === 'no'
    ) {
      return false;
    } else {
      return null;
    }
  };

  /**
  saber si puedo o no convertir de string a array u objeto con JSON.parse() */
  public static isValidJSONparse = (string: string): boolean => {
    if (!DataTypeClass.isString(string)) return false;

    try {
      JSON.parse(string);
      return true;
    } catch (error) {
      return false;
    }
  };

  /**
  ¿la variable es un archivo? */
  public static isFile(variable: Blob | FormData | any): boolean {
    return variable instanceof FormData || variable instanceof Blob;
  }

  /**
  ¿la variable es un objeto literal? */
  public static isLiteralObject = (literalObject: any): boolean => {
    return (
      Object.getPrototypeOf(literalObject) === Object.prototype ||
      Object.prototype.toString.call(literalObject) === '[object Object]'
    );
  };

  /**
  numero de keys (longitud) de un objeto literal {} */
  public static literalObjectLength = (literalObject: any): number => {
    if (DataTypeClass.isLiteralObject(literalObject)) {
      const length: number =
        Object.keys(literalObject).length +
        Object.getOwnPropertySymbols(literalObject).length;
      return length;
    }

    return -1;
  };
}
