import { MongoClient } from 'mongodb';

// Single MongoDB URI for both databases
const MONGO_URI = process.env.MONGO_URI;
const PROSMART_DB_NAME = '';
const HYDRALITE_DB_NAME = '';

let client = null;
let db = null;
let hydraliteDb = null;

// Test-only hook so unit tests can inject a mocked db implementation.
// Not used in production.
export const setTestDB = (testDb) => {
  db = testDb;
};

export const connectDB = async () => {
  if (db && hydraliteDb) {
    return db;
  }

  try {
    // Use proper SSL/TLS settings for MongoDB Atlas
    const clientOptions = {
      maxPoolSize: 50,
      minPoolSize: 10,
      maxIdleTimeMS: 30000,
      socketTimeoutMS: 30000,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      retryWrites: true,
      retryReads: true,
      family: 4,
      // SSL/TLS options
      tls: true,
      tlsAllowInvalidCertificates: false,
      tlsAllowInvalidHostnames: false,
    };

    client = new MongoClient(MONGO_URI, clientOptions);
    await client.connect();
    console.log('MongoDB connecting using host:', (new URL(MONGO_URI)).host);
    console.log('Successfully connected to MongoDB');

    // Connect to both databases using the same client
    db = client.db(PROSMART_DB_NAME);
    hydraliteDb = client.db(HYDRALITE_DB_NAME);

    console.log(`Connected to databases: ${PROSMART_DB_NAME} & ${HYDRALITE_DB_NAME}`);

    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB first.');
  }
  return db;
};

export const getDatabase = (dbName) => {
  if (!client) {
    throw new Error('Database client not initialized. Call connectDB first.');
  }
  return client.db(dbName);
};

// Hydralite connection - now uses the same client
export const connectHydraliteDB = async () => {
  if (hydraliteDb) {
    return hydraliteDb;
  }

  // If client doesn't exist, connect first
  if (!client) {
    await connectDB();
  }

  return hydraliteDb;
};

export const getHydraliteDB = () => {
  if (!hydraliteDb) {
    throw new Error('Hydralite Database not initialized. Call connectDB or connectHydraliteDB first.');
  }
  return hydraliteDb;
};

export const closeDB = async () => {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed (both prosmart_db & hydralite)');
    db = null;
    hydraliteDb = null;
    client = null;
  }
};

export default { connectDB, getDB, closeDB, connectHydraliteDB, getHydraliteDB };

