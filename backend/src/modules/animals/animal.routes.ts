import { Router } from "express";
import { validate } from "../../shared/middlewares/validate.js";
import { animalCreateSchema, AnimalUpdateInput, animalQuerySchema, animalUpdateSchema } from "./animal.schema.js";
import { animalController } from "./animal.controller.js";

export const animalsRouter = Router();

animalsRouter.get('/', validate(animalQuerySchema, 'query'), animalController.list)
animalsRouter.get('/:id', animalController.getById)
animalsRouter.post('/', validate(animalCreateSchema), animalController.create)
animalsRouter.patch('/:id', validate(animalUpdateSchema), animalController.update)
animalsRouter.delete('/:id', animalController.remove)