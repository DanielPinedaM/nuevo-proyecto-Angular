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
   * Caso 1: la API SI cumple el contrato ApiResponse<T>  -> se retorna la respuesta tal cual, SIN modificar.
   * Caso 2: la API NO cumple el contrato                 -> se envuelve en ApiResponse<T> (success se deriva del status). */
  normalize<T>(
    rawBody: unknown,
    status: number,
    fallbackMessage = 'no se pudo capturar el mensaje de error de la API',
  ): ApiResponse<T> {
    // Caso 1
    if (this.isApiContract<T>(rawBody)) return rawBody;

    // Caso 2
    return {
      success: this.isSuccessStatus(status),
      status,
      message: this.hasStringMessage(rawBody) ? rawBody.message : fallbackMessage,
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

    const response = value as Record<string, unknown>;

    // (a) que las keys existan
    const REQUIRED_KEYS = ['success', 'status', 'message', 'data'] satisfies (keyof ApiResponse)[];

    const hasAllKeys: boolean = REQUIRED_KEYS.every((key) => key in response);

    if (!hasAllKeys) return false;

    // (b) que los tipos de datos de los values sean correctos (data NO se valida porque es tipo <T>)
    return (
      typeof response['success'] === 'boolean' &&
      typeof response['status'] === 'number' &&
      typeof response['message'] === 'string'
    );
  }

  private isSuccessStatus(status: number): boolean {
    return status >= 200 && status < 300;
  }

  private hasStringMessage(value: unknown): value is { message: string } {
    return (
      typeof value === 'object' &&
      value !== null &&
      'message' in value &&
      typeof (value as { message: unknown }).message === 'string'
    );
  }
}
