import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load variables from .env
dotenv.config();

class Config {
    private client: SupabaseClient;
    private _cache: Record<string, any> = {};

    constructor() {
        const url = process.env.VITE_SUPABASE_URL;
        const key = process.env.VITE_SUPABASE_ANON_KEY;

        if (!url || !key) {
            throw new Error("❌ Missing Supabase Environment Variables");
        }

        this.client = createClient(url, key);
    }

    /**
     * Reads all system thresholds from the 'system_config' table.
     */
    async loadAllThresholds() {
        try {
            const { data, error } = await this.client
                .from('system_config')
                .select('key, value');

            if (error) throw error;

            // Update local cache: convert array of objects to a key-value map
            this._cache = data.reduce((acc, row) => {
                acc[row.key] = row.value;
                return acc;
            }, {} as Record<string, any>);

            console.log(`✅ Config: Loaded ${Object.keys(this._cache).length} thresholds from database.`);
            return this._cache;
        } catch (e) {
            console.error(`❌ Config Error: ${e}`);
            // Fallback to defaults
            this._cache = this.getDefaults();
            return this._cache;
        }
    }

    /**
     * Retrieves a specific threshold from the loaded cache.
     */
    async get(key: string, defaultValue: any = null) {
        if (Object.keys(this._cache).length === 0) {
            await this.loadAllThresholds();
        }
        return this._cache[key] ?? defaultValue;
    }

    /**
     * Updates a threshold value in the database and refreshes cache.
     */
    async updateThreshold(key: string, newValue: any) {
        try {
            const { error } = await this.client
                .from('system_config')
                .update({ value: newValue })
                .eq('key', key);

            if (error) throw error;

            this._cache[key] = newValue;
            console.log(`🚀 Config Updated: ${key} is now ${newValue}`);
            return true;
        } catch (e) {
            console.error(`❌ Failed to update config: ${e}`);
            return false;
        }
    }

    /**
     * Standard backup values for the system.
     */
    getDefaults() {
        return {
            "cosine_threshold": 0.5,
            "exploration_rate": 0.1,
            "weight_vibe": 0.40,
            "weight_traits": 0.15,
            "weight_intellect": 0.15,
            "weight_age": 0.10,
            "social_energy_bonus": 0.05,
            "hobby_bonus_unit": 0.02
        };
    }
}

// --- Execution Block (Only runs if called from terminal) ---
// We check if the current file is the one being executed
const isMain = process.argv[1]?.includes('config.ts');

if (isMain) {
    const config = new Config();
    config.loadAllThresholds().then((data) => {
        console.log("Current Config Data:", data);
    });
}

export default Config;