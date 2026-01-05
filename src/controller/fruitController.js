import {
    createFruitService,
    getFruitByIdService,
    getAllFruitsService,
    updateFruitService,
    deleteFruitService,
    getAllFruitsByNameService
} from "../models/fruitModel.js";

// Standardized controller for fruit-related operations
const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    });
};

export const createFruit = async (req, res, next) => {
    const {name, color, weight} = req.body;

    try {
        const newFruit = await createFruitService(name, color, weight);
        handleResponse(res, 201, "Fruit created successfully", newFruit);
    } catch (err) { next(err); };
};

export const getFruitById = async (req, res, next) => {
    try {
        const fruit = await getFruitByIdService(req.params.id);

        if (!fruit) {
            return handleResponse(res, 404, "Fruit not found");
        }
        handleResponse(res, 200, "Fruit retrieved successfully", fruit);
    } catch (err) { next(err); }
};

export const getAllFruits = async (req, res, next) => {
    try {
        const fruits = await getAllFruitsService();
        handleResponse(res, 200, "Fruits retrieved successfully", fruits);
    } catch (err) { next(err); }
};

export const getAllFruitsByName = async (req, res, next) => {
    try {
        const fruits = await getAllFruitsByNameService(req.params.name);
        handleResponse(res, 200, "Fruits retrieved successfully", fruits);
    } catch (err) { next(err); }
}

export const updateFruit = async (req, res, next) => {
    const {name, color, weight} = req.body;

    try {
        const updateFruit = await updateFruitService(req.params.id, name, color, weight);
        
        if (!updateFruit) {
            return handleResponse(res, 404, "Fruit not found");
        }
        handleResponse(res, 200, "Fruit updated successfully", updateFruit);
    } catch (err) { next(err); }
};

export const deleteFruit = async (req, res, next) => {
    try {
        const deleteFruit = await deleteFruitService(req.params.id);

        if (!deleteFruit) {
            return handleResponse(res, 404, "Fruit not found");
        }
        handleResponse(res, 200, "Fruit deleted successfully", deleteFruit);
    } catch (err) { next(err); }
};