import { Router } from "express";
import {
    createEspecieController,
    getEspeciesController,
    getEspecieByIdController, 
    updateEspecieController,
    deleteEspecieController,
} from "../controllers/especies.controller.js";


const router = Router();
router.post("/", createEspecieController);
router.put("/:id", updateEspecieController);
router.delete("/:id", deleteEspecieController);
router.get("/", getEspeciesController);
router.get("/:id", getEspecieByIdController);

export default router;