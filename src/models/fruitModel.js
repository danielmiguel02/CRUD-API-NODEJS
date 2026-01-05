import pool from '../config/db.js';

export const getFruitByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM fruits WHERE id = $1", [id]);
    return result.rows[0];
};

export const getAllFruitsService = async ({ limit, offset }) => {
    const result = await pool.query("SELECT * FROM fruits ORDER BY id LIMIT $1 OFFSET $2",[limit, offset]);

    const totalResult = await pool.query("SELECT COUNT(*) FROM fruits");
    const totalItems = parseInt(totalResult.rows[0].count, 10);

    return { fruits: result.rows, totalItems };
};

export const getAllFruitsByNameService = async ({ name, limit, offset }) => {
    const result = await pool.query("SELECT * FROM fruits WHERE name ILIKE $1 ORDER BY id LIMIT $2 OFFSET $3", [name, limit, offset]);

    const totalResult = await pool.query("SELECT COUNT(*) FROM fruits WHERE name ILIKE $1", [name]);
    const totalItems = parseInt(totalResult.rows[0].count, 10);

    return { fruits: result.rows, totalItems };
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