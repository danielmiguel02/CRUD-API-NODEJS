import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

// Console.log for pool testing
console.log(process.env.DB_USER);
console.log(process.env.DB_HOST);
console.log(process.env.DB_DATABASE);
console.log(process.env.DB_DBPORT);
console.log(process.env.DB_PASSWORD);

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: process.env.DB_DBPORT,
    password: process.env.DB_PASSWORD
});

pool.on('connect', () => {
    console.log('Connected to the database');
});

export default pool;