import { connectToClient, connectToDB } from "../../../lib/db";

async function register(req, res) {
  if (req.method === "POST") {
    const client = await connectToClient();
    const db = await connectToDB(client);
    await db.collection("email").insertOne({ email: req.body.email });
    client.close();
    res.status(200).json({ massage: "Success!" });
  }
  if (req.method === "GET") {
    const client = await connectToClient();
    const db = await connectToDB(client);
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
