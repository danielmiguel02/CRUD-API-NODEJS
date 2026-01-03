import express from 'express';
import { createFruit, deleteFruit, getAllFruits, getFruitById, updateFruit } from '../controller/fruitController';

const router = express.Router();

router.post("/fruits", createFruit);
router.get("/fruits/:id", getFruitById);
router.get("/fruits", getAllFruits);
router.put("/fruits/:id", updateFruit);
router.delete("/fruits/:id", deleteFruit);

export default router;