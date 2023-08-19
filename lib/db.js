import { MongoClient } from "mongodb";

export async function connectToClient() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.mongodb_userName}:${process.env.mongodb_password}@${process.env.mongodb_cluster}.iec4hzh.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
  );
  return client;
}

export async function connectToDB(client) {
  return await client.db();
}
