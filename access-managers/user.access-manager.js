import statuses from "../enums/statuses.enum.js";
import pickKeys from "../helpers/keys-picker.helper.js";

const userAccessManager = (user, accessLevel) => {
  if (accessLevel < statuses["Товаровед"]) {
    return pickKeys(user, [
      "id",
      "login",
      "name",
      "surname",
      "createAt",
      "status",
      "avatarUrl",
      "vkId",
      "isBanned",
      "isVkConfirmed",
    ]);
  }

  if (accessLevel < statuses["Заместитель директора"]) {
    return pickKeys(user, [
      "id",
      "login",
      "name",
      "surname",
      "createAt",
      "bankAcc",
      "status",
      "avatarUrl",
      "vkId",
      "isBanned",
      "isVkConfirmed",
    ]);
  }

  return user;
};

export default userAccessManager;
