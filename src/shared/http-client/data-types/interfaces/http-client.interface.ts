/**
 * Contrato que define el tipo de dato con el que responden todas las APIs  */
export interface ApiResponse<T = any> {
  success: boolean;
  status: number;
  message: string;
  data: T;
}
