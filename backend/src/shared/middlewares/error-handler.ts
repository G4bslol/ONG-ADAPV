import { ErrorRequestHandler } from "express";
import { AppError } from "../errors/app-error.js";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    if (err instanceof ZodError) {
        return res.status(400).json({ error: 'Dados inválidos', details: err.flatten() })
    }
    if (err instanceof AppError) {
        return res.status(err.status).json({ error: err.message });
    }
    console.error(err);
    res.status(500).json({ error: 'Erro interno' });
}