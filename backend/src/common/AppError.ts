export class AppError extends Error{
 
public readonly _statusCode : number;
public readonly _isOperational : boolean;

constructor(message:string, statusCode : number)
{
    super(message);
    this._statusCode = statusCode;
    this._isOperational = true;

    Error.captureStackTrace(this,this.constructor);
}
}