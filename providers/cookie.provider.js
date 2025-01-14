class cookieProvider {
  static #cookieSettings = {
    httpOnly: true,
    sameSite: "Strict",
  };

  static setTokens = (res, tokens) => {
    res.cookie("access_token", tokens.accessToken, this.#cookieSettings);
    res.cookie("refresh_token", tokens.refreshToken, this.#cookieSettings);
  };

  static getTokens = (req) => {
    const { access_token: accessToken, refresh_token: refreshToken } =
      req.cookies;

    return { accessToken, refreshToken };
  };
}

export default cookieProvider;
