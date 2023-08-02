import UserServices from "../services/userServices.js";

class Users {
    // @ts-ignore
    // eslint-disable-next-line
    static getUsers = async (req, res, next) => {
        const users = await UserServices.getUsers();
        return res.json(users)
    }
}

export default Users;
