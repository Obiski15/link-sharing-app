import jwt from "jsonwebtoken";

export function signToken(data: string | object) {
  const token = jwt.sign(data, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN!,
  });
  return token;
}
