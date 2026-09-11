import { RequestHandler } from "express";
import { animalService } from "./animal.service.js";

export const animalController = {
    list: (async (req, res) => {
        const { status } = req.query as { status?: string };
        res.json(await animalService.list(status));
    }) as RequestHandler,

    getById: (async (req, res) => {
        res.json(await animalService.getById(req.params.id as string));
    }) as RequestHandler,

    create: (async (req, res) => {
        res.status(201).json(await animalService.create(req.body));
    }) as RequestHandler,

    update: (async (req, res) => {
        res.json(await animalService.update(req.params.id as string, req.body));
    }) as RequestHandler,

    remove: (async (req, res) => {
        await animalService.remove(req.params.id as string);
        res.status(204).send();
    }) as RequestHandler,
}