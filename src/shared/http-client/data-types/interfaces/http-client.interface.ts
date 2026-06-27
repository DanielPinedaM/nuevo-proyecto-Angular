/**
asi es como responde la API */
export interface IResponse<T = any> {
  success: boolean;
  status: number;
  message: string;
  data: T;
}
