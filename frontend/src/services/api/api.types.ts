export interface ApiResponse<T> {
  readonly _data?: T;
  readonly _message: string;
  readonly _success: boolean;
  readonly statusCode: number;
}
