import connection from "../connection/db.js";
import bcrypt from "bcryptjs";
import statuses from "../enums/statuses.enum.js";
const salt = bcrypt.genSaltSync(10);

const statusesNames = {
  "-1": "Заблокирован",
  0: "Пользователь",
  1: "Арендодатель",
  2: "Товаровед",
  3: "Заместитель директора",
  4: "Директор",
  44: "Папочка",
};

class mysqlProvider {
  static #connection = connection;
  static #vkCodeMiliseconds = 300000;

  static isUniqueVkId = async (vkId) => {
    const rows = await this.#connection.query(
      "SELECT id FROM users WHERE vk_id = ? AND is_vk_confirmed = 1",
      [vkId],
    );

    return !rows[0].length;
  };

  static addUser = async (user) => {
    const hashedPassword = bcrypt.hashSync(user.password, salt);

    try {
      const rows = await this.#connection.query(
        "INSERT INTO users (login, password, name, second_name, bank, status, vk_id, create_time, is_vk_confirmed) VALUES (:login, :password, :name, :surname, :bankAcc, 0, :VK_ID, CURRENT_TIMESTAMP, 0);",
        { ...user, password: hashedPassword },
      );

      return rows;
    } catch (error) {
      if (error.errno === 1062) {
        throw new Error("User with this login is already exist.");
      }

      throw new Error(error.message);
    }
  };

  static authenticateUser = async (login, password) => {
    const [rows] = await this.#connection.query(
      "SELECT * FROM users WHERE login = ?",
      [login],
    );

    if (rows.length === 0) {
      throw new Error("Account with this login doesn`t exist.");
    }

    const user = rows[0];

    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error("Wrong password.");
    }

    return user;
  };

  static changePassword = async (userId, oldPassword, newPassword) => {
    const [rows] = await this.#connection.query(
      "SELECT * FROM users WHERE id = ?",
      [userId],
    );

    if (rows[0].length === 0) {
      throw new Error("User doesn't exist.");
    }

    const { password: currentPassword } = rows[0];

    if (!bcrypt.compareSync(oldPassword, currentPassword)) {
      throw new Error("Wrong password.");
    }

    const hashedPassword = bcrypt.hashSync(newPassword, salt);
    await this.#connection.query(
      "UPDATE users SET password = ? WHERE id = ?;",
      [hashedPassword, userId],
    );
  };

  static getFullUserInfo = async (id) => {
    const [rows] = await this.#connection.query(
      "SELECT * FROM users WHERE id = ?",
      [id],
    );

    if (rows.length === 0) {
      throw new Error("Account with this ID doesn`t exist.");
    }

    const user = rows[0];

    return this.#userToCamelCase(user);
  };

  static filterByLargerStatus = async (status) => {
    const [users] = await this.#connection.query(
      "SELECT * FROM users WHERE status >= ?",
      [status],
    );

    return users.map((user) => this.#userToCamelCase(user));
  };

  static addVkCode = async (userId, code) => {
    const { vkId } = this.getFullUserInfo(userId);

    const [usersWithThisVK] = await this.#connection.query(
      "SELECT * FROM users WHERE vk_id = ? AND is_vk_confirmed = 1",
      [vkId],
    );

    if (usersWithThisVK.length !== 0) {
      throw new Error("User with this VK already exist.");
    }

    const vkExpTime = this.#timestampToIso(
      Date.now() + this.#vkCodeMiliseconds,
    );

    await this.#connection.query(
      "UPDATE users SET VK_confirm_code = ?, VK_exp_time = ? WHERE id = ?;",
      [code, vkExpTime, userId],
    );
  };

  static addToken = async (token) => {
    await this.#connection.query(
      "INSERT INTO refresh_tokens (token) VALUES (?)",
      [token],
    );
  };

  static checkVkCode = async (userId, code) => {
    const [users] = await this.#connection.query(
      "SELECT * FROM users WHERE id = ?",
      [userId],
    );
    const { VK_confirm_code: actualCode, VK_exp_time: expireTime } = users[0];

    if (code != actualCode) {
      throw new Error("Incorrect code.");
    }

    if (this.#isoToTimestamp(expireTime) < Date.now()) {
      throw new Error("Time to enter the code expired.");
    }

    await this.#connection.query(
      "UPDATE users SET Is_VK_confirmed = 1 WHERE id = ?;",
      [userId],
    );
  };

  static changeUserBan = async (userId, banReason, adminId) => {
    const { status } = await this.getFullUserInfo(userId);
    
    if (status === "Заблокирован") {
      if (banReason) {
        throw new Error("User account is already have ban.");
      }

      await this.#connection.query(
        "UPDATE users SET status = 0, ban_reason = null, who_banned = null WHERE id = ?;",
        [userId],
      );

      return;
    }

    if (status !== "Пользователь") {
      throw new Error("You cannot ban an employee.")
    }

    await this.#connection.query(
      "UPDATE users SET status = -1, ban_reason = ?, who_banned = ? WHERE id = ?;",
      [banReason, adminId, userId],
    );
  };

  static isValidToken = async (token) => {
    const result = await this.#connection.query(
      "SELECT * FROM refresh_tokens WHERE token = ?",
      [token],
    );

    return !!result[0].length;
  };

  static deleteToken = async (token) => {
    await this.#connection.query("DELETE FROM refresh_tokens WHERE token = ?", [
      token,
    ]);
  };

  static #userToCamelCase = (user) => ({
    id: user.id,
    login: user.login,
    name: user.name,
    surname: user.second_name,
    createAt: this.#isoToTimestamp(user.create_time),
    bankAcc: user.bank,
    status: statusesNames[user.status],
    avatarUrl: user.avatar_url,
    vkId: user.vk_id,
    isBanned: user.status === statuses["Заблокирован"],
    banReason: user.ban_reason ? user.ban_reason : undefined,
    whoBanned: user.who_banned ? user.who_banned : undefined,
    isVkConfirmed: !!user.Is_VK_confirmed,
  });

  static #timestampToIso = (timestamp) => {
    const date = new Date(timestamp + 3 * 60 * 60 * 1000);
    const isoString = date.toISOString();
    const mysqlFormat = isoString.slice(0, 19).replace("T", " ");
    return mysqlFormat;
  };

  static #isoToTimestamp = (isoTime) => Date.parse(isoTime);
}

export default mysqlProvider;
