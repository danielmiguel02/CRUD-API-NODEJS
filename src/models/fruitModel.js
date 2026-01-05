import pool from '../config/db.js';

export const getFruitByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM fruits WHERE id = $1", [id]);
    return result.rows[0];
};

export const getAllFruitsService = async () => {
    const result = await pool.query("SELECT * FROM fruits");
    return result.rows;
};

export const getAllFruitsByNameService = async (name) => {
    const result = await pool.query("SELECT * FROM fruits WHERE name ILIKE $1", [name]);
    return result.rows;
};

export const createFruitService = async (name, color, weight) => {
    const result = await pool.query("INSERT INTO fruits (name, color, weight) VALUES ($1, $2, $3) RETURNING *", [name, color, weight]);
    return result.rows[0];
};

export const updateFruitService = async (id, name, color, weight) => {
    const result = await pool.query("UPDATE fruits SET name = $1, color = $2, weight = $3 WHERE id = $4 RETURNING *", [name, color, weight, id]);
    return result.rows[0];
};

export const deleteFruitService = async (id) => {
    const result = await pool.query("DELETE FROM fruits WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
};