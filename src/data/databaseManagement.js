import pool from './dbPool.js';
import dotenv from 'dotenv';

dotenv.config();

// Helper function to check if a database exists
const databaseExists = async (dbName) => {
    try {
        const result = await pool.query("SELECT 1 FROM pg_database WHERE datname=$1", [dbName]);
        return result.rowCount > 0;
    } catch (error) { return console.error('Error checking database existence:', error); };
};

// Creates database if it doesn't exist
export const createDatabase = async () => {
    const dbName = process.env.DB_NAME;

    if (databaseExists(dbName)) return;
    else {
        try {
            await pool.query(`CREATE DATABASE ${dbName}`);

            console.log(`Database ${dbName} created successfully.`);
        } catch (error) { return console.error('Error creating database:', error); };   
    }
};

// Helper function to check if a table exists
const tableExists = async (tableName) => {
    const result = await pool.query("SELECT to_regclass($1) AS table_name", [tableName]);
    return result.rows[0].table_name !== null;
}

// Creates tables in the database if they do not already exist
export const createTables = async () => {
    if (databaseExists(process.env.DB_NAME) === true) {
        if (tableExists('fruits')) return;
        else {
            try {
                await pool.query("CREATE TABLE IF NOT EXISTS fruits (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, color VARCHAR(50) NOT NULL, weight FLOAT)");
            
                console.log('Table fruits created successfully.');
            } catch (error) { return console.error('Error creating tables:', error); };
        }
    }
};