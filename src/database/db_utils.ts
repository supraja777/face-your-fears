import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// --- ESM __dirname Fix ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const runProfileSchema = () => runSchemaFile('Profile_Schema.sql');

// Load variables from .env
dotenv.config();

const dbUrl = process.env.SUPABASE_DB_URL;

if (!dbUrl) {
    console.error("❌ SUPABASE_DB_URL is missing in .env file");
    process.exit(1);
}

// Initialize the connection pool with SSL (required by Supabase)
const sql = postgres(dbUrl, { ssl: 'require' });

/**
 * Core execution function: Reads file and runs SQL
 */
async function runSchemaFile(filename: string) {
    try {
        // Looks for the file in the same folder as this script
        const filePath = path.join(__dirname, filename);
        
        if (!fs.existsSync(filePath)) {
            console.error(`❌ File not found at: ${filePath}`);
            return;
        }

        const schemaSql = fs.readFileSync(filePath, 'utf8');

        // Execute raw multi-line SQL
        await sql.unsafe(schemaSql);
        
        console.log(`✅ ${filename} deployed to Supabase successfully!`);
    } catch (error) {
        console.error(`❌ Error deploying ${filename}:`, error);
    }
}

/**
 * Main Execution Block
 */
async function main() {
    console.log("🚀 Starting database deployment...");
    
    await runProfileSchema();

    // Cleanly close the connection pool
    await sql.end();
    console.log("🏁 Deployment process finished.");
}

// Improved check for running directly via terminal/tsx
const isMain = process.argv[1] && (
    process.argv[1].includes('db_utils.ts') || 
    process.argv[1].includes('tsx') // Handles npx tsx execution context
);

if (isMain) {
    main().catch((err) => {
        console.error("💥 Unexpected error in main:", err);
        process.exit(1);
    });
}