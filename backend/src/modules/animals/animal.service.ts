import { db } from "../../prisma/db.js";
import { AppError } from "../../shared/errors/app-error.js";
import { AnimalCreateInput, AnimalUpdateInput } from "./animal.schema.js";

export const animalService = {
    list: (status?: string) =>
        status
            ? db.orm.public.Animal.where({ status: status as any }).all()
            : db.orm.public.Animal.all(),

    getById: async (id: string) => {
        const animal = await db.orm.public.Animal.where({ id }).first();
        if (!animal) throw new AppError(404, 'Animal não encontrado');
        return animal;
    },

    create: (data: AnimalCreateInput) => db.orm.public.Animal.create(data),

    update: async (id: string, data: AnimalUpdateInput) => {
        await animalService.getById(id);
        return db.orm.public.Animal.where({ id }).update(data);
    },

    remove: async (id: string) => {
        await animalService.getById(id);
        return db.orm.public.Animal.where({ id }).delete();
    },

}