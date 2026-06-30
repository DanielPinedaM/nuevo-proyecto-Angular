import { Service } from '@angular/core';

/**
 * helpers reutilizables en src\shared\http-client */
@Service()
export class HttpClientHelpersService {
  /**
   * ¿la variable es un objeto literal {}? */
  isLiteralObject(value: unknown): value is Record<string | symbol, unknown> {
    return (
      typeof value === 'object' &&
      value !== null &&
      (Object.getPrototypeOf(value) === Object.prototype ||
        Object.prototype.toString.call(value) === '[object Object]')
    );
  }

  /**
   * numero de keys (longitud) de un objeto literal {} */
  literalObjectLength(value: Record<string | symbol, unknown>): number {
    return Object.keys(value).length + Object.getOwnPropertySymbols(value).length;
  }

  /**
   * ¿la variable es un archivo? */
  isFile(value: unknown): boolean {
    if (!value) return false;

    return (
      value instanceof FormData ||
      value instanceof Blob ||
      value instanceof File ||
      value instanceof ArrayBuffer
    );
  }
}
