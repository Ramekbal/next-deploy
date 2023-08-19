import { hash } from "bcryptjs";

export async function passwardHash(password) {
  const hashPassword = await hash(password, 12);
  return hashPassword;
}
