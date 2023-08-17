import { MongoClient } from "mongodb";

async function register(req, res) {
  if (req.method === "POST") {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.mongodb_userName}:${process.env.mongodb_password}@${process.env.mongodb_cluster}.iec4hzh.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
    );
    const db = await client.db();
    await db.collection("email").insertOne({ email: req.body.email });
    client.close();
    res.status(200).json({ massage: "Success!" });
  }
  if (req.method === "GET") {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.mongodb_userName}:${process.env.mongodb_password}@${process.env.mongodb_cluster}.iec4hzh.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
    );
    const db = await client.db();
    const data = await db
      .collection("email")
      .find()
      .sort({ _id: -1 })
      .toArray();
    client.close();
    res.status(200).json({ massage: "Success!", data: data });
  }
}

export default register;
