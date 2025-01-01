import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function runQuery() {
    try {
        // Example query
        const result = await pool.query('SELECT * FROM projects');
        console.log('Query Results:', result.rows);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error message:', error.message);
        } else {
            console.error('Unknown error:', error);
        }
    } finally {
        // Close the database connection
        await pool.end();
    }
}

(async function main() {
    await runQuery();
})();
