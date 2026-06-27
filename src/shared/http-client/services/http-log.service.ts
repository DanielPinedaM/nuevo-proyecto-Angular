import { environment } from '@/environments/environment';
import { IResponse } from '@/shared/http-client/data-types/interfaces/http-response.interface';
import { HttpContextToken, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Service } from '@angular/core';

/**
 * token para desactivar los logs en una peticion concreta.
 * Por defecto se imprimen logs en todos los ambientes EXCEPTO produccion */
export const HTTP_LOG_ENABLED: HttpContextToken<boolean> = new HttpContextToken<boolean>(
  () => !environment.production,
);

/**
 * objeto literal (resumido) que se imprime en los logs. `data` y `body` se imprimen RESUMIDOS,
 * nunca completos. Los tipos de params, headers y responseType se reutilizan de Angular */
interface IResponseLogger {
  NODE_ENV: string;

  success: boolean;
  status: number;
  message: string;
  data: string | null;

  body: string | null;
  params?: HttpParams;
  headers?: HttpHeaders;
  responseType?: HttpRequest<unknown>['responseType'];
  method: HttpRequest<unknown>['method'];
  urlWithParams: HttpRequest<unknown>['urlWithParams'];
}

/**
 * logging por consola de las peticiones HTTP. Permite desactivar los logs por peticion mediante
 * HttpContext usando el HttpContextToken HTTP_LOG_ENABLED (distinto al token del loader) */
@Service()
export class HttpLogService {
  /**
   * transforma la respuesta de la API en el objeto literal
   * que luego imprimen successLogs, errorLogs y timeoutLogs.
   * SOLO retorna el objeto; NO imprime nada por consola */
  transformResponseToLogger(
    response: IResponse<unknown>,
    req: HttpRequest<unknown>,
  ): IResponseLogger {
    const { success, status, message, data } = response;
    const { body, params, headers, responseType, method, urlWithParams } = req;

    return {
      NODE_ENV: environment.NODE_ENV,

      success,
      status,
      message,
      data: this.summarize(data),

      body: this.summarize(body),
      params,
      headers,
      responseType,
      method,
      urlWithParams,
    };
  }

  /**
   * ✅ imprime los logs cuando la peticion es exitosa */
  successLogs(req: HttpRequest<unknown>, response: IResponse<unknown>): void {
    if (!this.canLog(req)) return;

    if (this.isFile(req.body)) {
      console.info('✅ archivo(s) subido(s)');
    }

    console.info('✅ ', this.transformResponseToLogger(response, req));
  }

  /**
   * ❌ imprime los logs cuando la peticion da error */
  errorLogs(req: HttpRequest<unknown>, response: IResponse<unknown>): void {
    if (!this.canLog(req)) return;

    console.error('❌ ', this.transformResponseToLogger(response, req));
  }

  /**
   * ⏱️ imprime los logs despues de detener la peticion HTTP por el timeout de 1 minuto */
  timeoutLogs(req: HttpRequest<unknown>, response: IResponse<unknown>): void {
    if (!this.canLog(req)) return;

    console.error('⏱️ timeout error: ', this.transformResponseToLogger(response, req));
  }

  /**
   * ¿se debe imprimir el log?
   * NO en produccion, NI cuando la peticion desactivo el token */
  private canLog(req: HttpRequest<unknown>): boolean {
    if (environment.production) return false;
    return req.context.get(HTTP_LOG_ENABLED);
  }

  /**
   * resume `data` o `body` para NO imprimir el contenido completo */
  private summarize(value: unknown): string | null {
    if (value === null || value === undefined) return null;

    if (Array.isArray(value)) {
      if (value.length === 0) return 'array vacío ➡️ (0) []';

      const areAllObjects: boolean = value.every(
        (item) => typeof item === 'object' && item !== null,
      );

      return areAllObjects
        ? `array de objetos con ${value.length} elementos ➡️ (${value.length}) [{}]`
        : `array de ${value.length} elementos ➡️ (${value.length}) []`;
    }

    if (this.isLiteralObject(value)) {
      const length: number = this.literalObjectLength(value);

      return length === 0
        ? 'objeto literal vacío ➡️ (0) {}'
        : `objeto literal con ${length} keys ➡️ (${length}) {}`;
    }

    return String(value);
  }

  /**
   * ¿la variable es un objeto literal {}? */
  private isLiteralObject(value: unknown): value is Record<string | symbol, unknown> {
    return (
      typeof value === 'object' &&
      value !== null &&
      (Object.getPrototypeOf(value) === Object.prototype ||
        Object.prototype.toString.call(value) === '[object Object]')
    );
  }

  /**
   * numero de keys (longitud) de un objeto literal {} */
  private literalObjectLength(value: Record<string | symbol, unknown>): number {
    return Object.keys(value).length + Object.getOwnPropertySymbols(value).length;
  }

  /**
   * ¿la variable es un archivo? */
  private isFile(value: unknown): boolean {
    if (!value) return false;

    return (
      value instanceof FormData ||
      value instanceof Blob ||
      value instanceof File ||
      value instanceof ArrayBuffer
    );
  }
}
