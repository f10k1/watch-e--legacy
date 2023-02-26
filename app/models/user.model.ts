import AppDataSource from "../../dataSource";
import User from "../database/user.entity";
export default class UserModel {
    async getUser(): Promise<any> {
        return AppDataSource.getRepository(User).createQueryBuilder("user").getOne();
    }
    createUser(data): Promise<void> {
        return new Promise(() => { });
    }

    async checkIfUsernameExists(login: string): Promise<any> {
        return AppDataSource.getRepository(User).find({
            where: { name: login }
        });
    }
}