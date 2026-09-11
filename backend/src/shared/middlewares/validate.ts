import { RequestHandler } from "express";
import { ZodType } from "zod";

type Source = 'body' | 'query' | 'params';

export const validate = (schema: ZodType, source: Source = 'body'): RequestHandler => {
    return (req, _res, next) => {
        req[source] = schema.parse(req[source]);
        next();
    }
}