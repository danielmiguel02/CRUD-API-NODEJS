import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import pool from './config/db.js';
import fruitRoutes from './routes/fruitRoutes.js';
import errorHandling from './middlewares/errorHandler.js';
import { createTables } from './data/databaseManagement.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5006;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/", fruitRoutes);

// Creates database and tables if they do not exist
createTables();

// Error handling middleware
app.use(errorHandling);

// Testing postgres connection
app.get("/", async (req, res) => {
    const result = await pool.query("SELECT current_database()");
    try {
        res.status(200).json({ database: result.rows[0].current_database });
    } catch (error) { return res.status(500).json({ error: error.message }); }
});

// Server running
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});