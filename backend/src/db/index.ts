const { MongoClient, ServerApiVersion } = require('mongodb');
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.DATABASE_URL;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const getDatabase = async () => {
  if (!client.isConnected) await client.connect();
  return client.db('canbanBoard');
};
export const getCollection = async () => {
  const db = await getDatabase();
  return db.collection('boards');
};

export { client };
