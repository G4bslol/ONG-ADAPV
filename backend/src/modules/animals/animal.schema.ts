import { z } from 'zod';
import { AnimalSpecies, AnimalSex, AnimalStatus, NeuterStatus } from '../../shared/enums.js'

export const animalCreateSchema = z.object({
    name: z.string().min(1),
    species: z.enum(AnimalSpecies),
    breed: z.string().optional(),
    approximateAge: z.string().optional(),
    sex: z.enum(AnimalSex).default('UNKNOWN'),
    physicalTraits: z.string().optional(),
    healthHistory: z.string().optional(),
    rescueConditions: z.string().optional(),
    status: z.enum(AnimalStatus).default('RESCUED'),
    neuterStatus: z.enum(NeuterStatus).default('NOT_NEUTERED'),
});

export const animalUpdateSchema = animalCreateSchema.partial();

export const animalQuerySchema = z.object({
    status: z.enum(AnimalStatus).optional(),
});

export type AnimalCreateInput = z.infer<typeof animalCreateSchema>;
export type AnimalUpdateInput = z.infer<typeof animalUpdateSchema>;