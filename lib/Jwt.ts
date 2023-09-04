import jwt, { Secret } from "jsonwebtoken";
import { JwtSign } from "./types";

class Jwt {
    public sign(config: JwtSign) {
        return jwt.sign(config.payload, config.secretKey, config.options)

    }
    public verify(token: string, secret: Secret) {
        return jwt.verify(token, secret)
    }
}

export default new Jwt()