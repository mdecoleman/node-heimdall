import jwt from "jsonwebtoken";
import { v4 as uuidV4 } from "uuid";

export const create = ({ sub, exp, ...rest }) => {
  const iss = process.env.DOMAIN;
  const aud = process.env.DOMAIN;
  const jwtSecret = process.env.JWT_SECRET;

  return jwt.sign(
    {
      jti: uuidV4(),
      aud,
      iss,
      sub,
      exp: Math.floor(Date.now() / 1000) + exp,
      ...rest
    },
    jwtSecret
  );
};

export const verify = token => {
  const jwtSecret = process.env.JWT_SECRET;
  const iss = process.env.DOMAIN;
  const aud = process.env.DOMAIN;

  try {
    const decodedToken = jwt.verify(token, jwtSecret, {
      issuer: iss,
      audience: aud
    });
    return { isValid: true, token: decodedToken };
  } catch (err) {
    return { isValid: false };
  }
};
