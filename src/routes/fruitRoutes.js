import express from 'express';
import { createFruit, deleteFruit, getAllFruits, getAllFruitsByName, getFruitById, updateFruit } from '../controller/fruitController.js';

const router = express.Router();

router.post("/fruits", createFruit);
router.get("/fruits", getAllFruits);
router.get("/fruits/id/:id", getFruitById);
router.get("/fruits/name/:name", getAllFruitsByName);
router.put("/fruits/:id", updateFruit);
router.delete("/fruits/:id", deleteFruit);

export default router;