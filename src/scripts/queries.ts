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

async function updateProjectTime(projectId: number, additionalTime: number) {
    try {
        const result = await pool.query(
            'UPDATE projects SET time = time + $1 WHERE id = $2 RETURNING *',
            [additionalTime, projectId]
        );
        console.log('Updated Project:', result.rows[0]);
        return result.rows[0]; // Return the updated project
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error message:', error.message);
        } else {
            console.error('Unknown error:', error);
        }
        throw error;
    }
}


(async function main() {
    await runQuery();

    const projectId = 1; // Replace with the actual project ID
    const additionalTime = 300; // Increment by 300 seconds (5 minutes)
    await updateProjectTime(projectId, additionalTime);
})();
