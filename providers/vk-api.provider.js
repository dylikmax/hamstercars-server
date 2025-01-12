import { VK_ACCESS_KEY } from "../VK-access-key.js";

class vkApiProvider {
  static #accessToken = VK_ACCESS_KEY;
  static #BASE_VK_API = "https://api.vk.com/method/";

  static getRealId = async (textIds) => {
    const queryParams = new URLSearchParams({
      user_ids: textIds,
      v: "5.199",
    }).toString();

    const response = await fetch(
      `${this.#BASE_VK_API}users.get?${queryParams}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.#accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { response: data } = await response.json();
    if (data.length === 0) {
      throw new Error("No user exist with this ID.");
    }

    const user = data[0];
    if (user.deactivated) {
      throw new Error("VK account with this ID is deactivated now.");
    }

    return user.id;
  };
}

export default vkApiProvider;
