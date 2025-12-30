import { MongoClient } from 'mongodb';

// Single MongoDB URI for both databases
const MONGO_URI = "";
const PROSMART_DB_NAME = "";
const HYDRALITE_DB_NAME = "";

let client = null;
let db = null;
let hydraliteDb = null;

// Connect to both databases using the same client
async function connectDB() {
    if (!client) {
        client = new MongoClient(MONGO_URI);
        await client.connect();
        db = client.db(PROSMART_DB_NAME);
        hydraliteDb = client.db(HYDRALITE_DB_NAME);
        console.log('Connected to both databases:', PROSMART_DB_NAME, '&', HYDRALITE_DB_NAME);
    }
    return { db, hydraliteDb };
}

console.log('Use: await connectDB() to get both databases');