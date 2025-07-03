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
   * Normalizar string
   * Ejemplo:
   * ' COMunicaciÓN    ' devuelve  'comunicacion'
   * [1, 2, 3]           devuelve   [1, 2, 3]
   * 
   * @param {string|any} string — valor a normalizar. Si no es string o está vacío, se devuelve tal cual
   * @param {Object} [options] — opciones de normalización
   * @param {boolean} [options.clearSpecialCharacters] — true = BORRAR caracteres especiales,  false = CONSERVAR caracteres especiales
   * @param {boolean} [options.enyeWithN] — true = REEMPLAZAR "ñ" y "Ñ" por "n", false = CONSERVAR letra "ñ"
   * @param {boolean} [options.clearNumbers] — true = BORRAR numeros, false = CONSERVAR numeros
   * @returns {string|any} — la cadena normalizada o el valor original si no es string */
  public static normalizeStr = (string: string | any, options?: { clearSpecialCharacters?: boolean, enyeWithN?: boolean, clearNumbers?:boolean }): string | any => {
     if (!(DataTypeClass.isString(string))) return string;
     if (String(string).trim() === "") return "";

     const {
        clearSpecialCharacters = false,
        enyeWithN = false,
        clearNumbers = false,
     } = options ?? {};

     let newString: string = string.toLowerCase()                                    // convertir a minuscula
                                   .normalize("NFD")                                 // hacer q funcionen las expresiones regulares
                                   .replaceAll(/[\u0300-\u0302\u0304-\u036f]/g, "")  // eliminar acentos (todos menos U+0303)
                                   .normalize("NFC")                                 // conservar la "ñ" "Ñ"
                                   

      if (enyeWithN) {
        newString = newString.replaceAll(/ñ/g, 'n');                                 // reemplazar ñ minúscula por n
      }

      if (clearSpecialCharacters) {
        newString = newString.replaceAll(/[^a-zA-Z0-9 ñÑ]/g, '');                    // borrar caracteres especiales
      }

      if (clearNumbers) {
       newString = newString.replaceAll(/\d+/g, '');                                 // borrar todos los numeros 0123456789
      }
      
      // esto TIENE q estar al final de la funcion
      newString = newString.trim()                                                   // borrar espacio en blanco al principio y final
                           .replaceAll(/\s+/g, ' ')                                  // reemplazar múltiples espacios en blanco '   ' por un solo espacio en blanco ' ';
      
      return newString;
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
    return typeof literalObject === "object"
           && literalObject !== null
           && (
              Object.getPrototypeOf(literalObject) === Object.prototype ||
              Object.prototype.toString.call(literalObject) === '[object Object]'
           )
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
