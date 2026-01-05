import pkg from 'pg';
import dotenv from 'dotenv';
import pool from '../config/db.js';

dotenv.config();

const { Pool } = pkg;

const dbName = process.env.DB_DATABASE;

// Database Pool
const dbPool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'postgres', // Connect to default 'postgres' database to check/create other DBs
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Helper function to check if a database exists
const databaseExists = async (dbName) => {
    const result = await dbPool.query("SELECT 1 FROM pg_database WHERE datname=$1", [dbName]);
    return result.rowCount > 0;
};

// Creates database if it doesn't exist
const createDatabase = async () => {
    console.log("Running createDatabase...");

    if (await databaseExists(dbName)) return;

    await dbPool.query(`CREATE DATABASE "${dbName}"`);
    console.log(`Database ${dbName} created successfully.`);
};

// Helper function to check if a table exists
const tableExists = async (tableName) => {
    const result = await pool.query("SELECT to_regclass($1) AS table_name", [`public.${tableName}`]);
    return result.rows[0].table_name !== null;
};

// Creates tables in the database if they do not already exist
export const createTables = async () => {
    console.log("Running createTables...");

    if (!await databaseExists(dbName)) {
        await createDatabase();
    }

    if (await tableExists('fruits')) return;

    await pool.query(`CREATE TABLE fruits (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, color VARCHAR(50) NOT NULL, weight FLOAT)`);
    console.log('Table fruits created successfully.');
};