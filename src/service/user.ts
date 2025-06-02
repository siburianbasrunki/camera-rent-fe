import { getEndpoints } from "../config/config";
import type { UserModel } from "../model/user";

const UserService = {
  async getUserById(id: string): Promise<UserModel> {
    const { user } = getEndpoints();
    const res = await fetch(`${user}/${id}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data;
  },
};

export default UserService;
