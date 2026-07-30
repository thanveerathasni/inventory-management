

import { NextFunction,Request,Response } from "express";

import { AppError } from "../common/AppError";
import { COMMON_MESSAGES } from "../constants/apiMessages";
import { HTTP_STATUS } from "../constants/statusCodes";
import { logger } from "../logger/logger";

export const errorMiddleware = (
    error:Error,
    _req:Request,
    res:Response,
    _next:NextFunction
):void=>{
if(error instanceof AppError){
    res.status(error._statusCode).json({
        success: false,
        message: error.message || COMMON_MESSAGES.INTERNAL_SERVER_ERROR 
    })
    return;
}
logger.error(error)

res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: COMMON_MESSAGES.INTERNAL_SERVER_ERROR
})

}
