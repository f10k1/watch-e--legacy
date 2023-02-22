import AppDataSource from "../../dataSource";
import User from "../database/user.entity";
export default class UserModule {
    async getUser(): Promise<any> {
        return AppDataSource.getRepository(User).createQueryBuilder("user").getOne();
    }
    createUser(data): Promise<void> {
        return new Promise(() => { });
    }
}