import { passwardHash } from "../../../lib/auth";
import { connectToClient, connectToDB } from "../../../lib/db";

async function signUp(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { email, password } = data;
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        massage:
          "Invalid input - Password should also be at least 7 charecters...",
      });
      return;
    }
    const client = await connectToClient();
    const db = await connectToDB(client);
    //Check user is exsits or not
    const userExists = await db.collection("users").findOne({ email: email });
    if (userExists) {
      res.status(422).json({ massage: "User already exits" });
      client.close();
      return;
    }
    const hashPassword = await passwardHash(password);
    const result = await db
      .collection("users")
      .insertOne({ email: email, password: hashPassword });
    client.close();
    res.status(200).json({ massage: "Creted user!" });
  }

  //   if (req.method === "GET") {
  //     const client = await connectToClient();
  //     const db = await connectToDB(client);
  //     const data = await db
  //       .collection("userSignUp")
  //       .find()
  //       .sort({ _id: -1 })
  //       .toArray();
  //     client.close();
  //     res.status(200).json({ massage: "Success!", data: data });
  //   }
}

export default signUp;
