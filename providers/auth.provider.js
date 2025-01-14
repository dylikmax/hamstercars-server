import jwt from "jsonwebtoken";
import { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } from "../secret-keys.js";
import mysqlProvider from "./mysql.provider.js";

class authProvider {
  static #accessSecret = ACCESS_SECRET_KEY;
  static #refreshSecret = REFRESH_SECRET_KEY;
  static #expTime = "10m";

  static createTokens = async (id, st) => {
    const accessToken = jwt.sign({ id, st }, this.#accessSecret, {
      expiresIn: this.#expTime,
    });

    const refreshToken = jwt.sign({ id, st }, this.#refreshSecret);
    await mysqlProvider.addToken(refreshToken);

    return { accessToken, refreshToken };
  };

  static refreshTokens = async (oldRefreshToken) => {
    await mysqlProvider.deleteToken(oldRefreshToken);
    const { id, st } = jwt.verify(oldRefreshToken, this.#refreshSecret);

    const newTokens = await this.createTokens(id, st);
    return newTokens
  };
}

export default authProvider;
