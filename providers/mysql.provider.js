import connection from "../connection/db.js";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

class mysqlProvider {
  static #connection = connection;

  static isUniqueVkId = async (vkId) => {
    const rows = await this.#connection.query(
      "SELECT id FROM users WHERE vk_id = ? AND is_vk_confirmed = 1",
      [vkId],
    );

    return !!rows.length;
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

    return rows[0];
  };
}

export default mysqlProvider;
