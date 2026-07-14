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
   * devuelve el http status real de una respuesta HTTP (exitosa o fallida).
   *
   * - `apiStatus`: status declarado en el body de la respuesta, accedido con
   *   `API_RESPONSE_KEYS.status`; solo existe si el backend devolvió un JSON que sigue el
   *   contrato `ApiResponse<T>`. Se usa ÚNICAMENTE para advertir en consola cuando no
   *   coincide con `httpStatus`, NUNCA se retorna.
   *
   * - `httpStatus`: propiedad propia y tipada `status: number` de `HttpResponse` /
   *   `HttpErrorResponse`, que refleja el código HTTP REAL de la respuesta (200, 404, 500,
   *   etc.), capturado directamente por `HttpClient`. NO pertenece al contrato
   *   `ApiResponse<T>`. SIEMPRE es el valor de retorno. */
  getRealHttpStatus(apiStatus: unknown, httpStatus: number): number {
    if (typeof apiStatus === 'number' && apiStatus !== httpStatus) {
      console.error('❌ error de backend (NO de frontend): el status declarado en el body de la API (apiStatus) no coincide con el http status real de la respuesta (httpStatus)', {
        apiStatus,
        httpStatus,
      });
    }

    return httpStatus;
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
