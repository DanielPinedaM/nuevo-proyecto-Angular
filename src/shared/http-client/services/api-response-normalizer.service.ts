import {
  API_RESPONSE_KEYS,
  FALLBACK_MESSAGE,
  REQUIRED_KEYS,
} from '@/shared/http-client/data-types/constants/http-client.const';
import { ApiResponse } from '@/shared/http-client/data-types/interfaces/http-client.interface';
import { Service } from '@angular/core';

/**
 * intermediario que valida y normaliza TODAS las respuestas HTTP al contrato ApiResponse<T>.
 * Se llama tanto en successInterceptor como en errorInterceptor para NO repetir la logica de
 * normalizacion entre ambos. SIEMPRE retorna un objeto literal ApiResponse<T> con las keys
 * success, status, message y data. */
@Service()
export class ApiResponseNormalizerService {
  /**
   * valida y normaliza el body crudo de CUALQUIER respuesta HTTP (exitosa o erronea) al contrato ApiResponse<T>.
   *
   * @param rawBody body crudo de la respuesta: event.body en success.interceptor,
   * error.error en error.interceptor
   *
   * @param status http status real de la respuesta, capturado por HttpClient
   *
   * @param fallbackMessage NO es "el message que se quiere usar" (eso lo decide normalize
   * mirando el body con hasStringMessage), es el 'plan B' SOLO para cuando el body no trae
   * message string. error.interceptor pasa error.message (mensaje generado por Angular que
   * vive FUERA del body y que normalize no puede deducir); success.interceptor no lo pasa
   * porque en el exito no existe fuente de mensaje externa al body, y aplica el default
   * FALLBACK_MESSAGE */
  normalize<T>(
    rawBody: unknown,
    status: number,
    fallbackMessage = FALLBACK_MESSAGE,
  ): ApiResponse<T> {
    /*
     Caso 1:
     la API SI cumple el contrato ApiResponse<T>  -> se retorna la respuesta tal cual, SIN modificar. */
    if (this.isApiContract<T>(rawBody)) return rawBody;

    /*
    Caso 2:
    la API NO cumple el contrato                  -> se envuelve en ApiResponse<T> */

    /*
     * Flujo del message:
     * 1. Ambos interceptores (success.interceptor y error.interceptor) le entregan el body crudo al normalizer.
     *
     * 2. El normalizer intenta extraer API_RESPONSE_KEYS.message del body — esto pasa igual en exito y en error.
     *
     * 3. Si el body NO trae la key message, o la trae pero su value no es un string:
     *  en el error.interceptor usa error.message, propiedad propia y tipada (message: string) de la
     *  clase HttpErrorResponse de @angular/common/http, cuyo texto lo genera HttpClient al fallar
     *  la peticion (NO viene del backend ni del body);
     *
     *  en el success.interceptor usa el default FALLBACK_MESSAGE */
    const messageFromBodyOrFallback: string = this.hasStringMessage(rawBody)
      ? rawBody[API_RESPONSE_KEYS.message]
      : fallbackMessage;

    return {
      success: this.isSuccessStatus(status), // success se deriva del status
      status,
      message: messageFromBodyOrFallback,
      data: (rawBody ?? null) as T,
    };
  }

  /**
   * valida (a) que existan TODAS las keys del contrato
   * y (b) que los tipos de sus values sean correctos.
   *
   * En `data` solo se valida que la key exista, porque su tipo es <T> */
  private isApiContract<T>(value: unknown): value is ApiResponse<T> {
    if (typeof value !== 'object' || value === null) return false;

    const response = value as Record<keyof ApiResponse, unknown>;

    // (a) que las keys existan
    const hasAllKeys: boolean = REQUIRED_KEYS.every((key) => key in response);

    if (!hasAllKeys) return false;

    // (b) que los tipos de datos de los values sean correctos (data NO se valida porque es tipo <T>)
    return (
      typeof response?.[API_RESPONSE_KEYS.success] === 'boolean' &&
      typeof response?.[API_RESPONSE_KEYS.status] === 'number' &&
      typeof response?.[API_RESPONSE_KEYS.message] === 'string'
    );
  }

  private isSuccessStatus(status: number): boolean {
    return status >= 200 && status < 300;
  }

  private hasStringMessage(value: unknown): value is Pick<ApiResponse, 'message'> {
    return (
      typeof value === 'object' &&
      value !== null &&
      API_RESPONSE_KEYS.message in value &&
      typeof (value as Pick<ApiResponse, 'message'>)[API_RESPONSE_KEYS.message] === 'string'
    );
  }
}
