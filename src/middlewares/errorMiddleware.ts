import { NextFunction, Request, Response } from "express";
import { ApiError, CustomError } from "../utils/ApiErros.ts";

export const errorMiddleware = (error: Error & Partial<ApiError> & Partial<CustomError>, req: Request, res: Response, next: NextFunction) => {
	const statusCode = error.statusCode ?? 500;
	const message = error.isExpectedError ? error.message : "Ocorreu um erro inesperado. Tente novamente mais tarde.";

	console.log(error.message);

	if (error.isCustomError) {
		res.status(statusCode).json({ ...JSON.parse(message), is_error: true });
		return;
	} else {
		res.status(statusCode).json({ message, is_error: true });
		return;
	}
};
