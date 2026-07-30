export class ApiResponse<T> {
  constructor(
    public readonly _success: boolean,
    public readonly statusCode: number,
    public readonly _message: string,
    public readonly _data?: T
  ) {}
}
