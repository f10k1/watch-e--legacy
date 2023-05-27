import AppDataSource from "../../dataSource";
import User from "../database/user.entity";
import bcrypt from 'bcrypt';
export default class UserModel {

    repository = AppDataSource.getRepository(User);

    async getUser(name: string): Promise<any> {
        return new Promise(async (resolve) => {
            const getUser = await this.repository.findOneBy({
                name: name
            });
            resolve(getUser);
        });
    }

    async createUser(data): Promise<void> {
        return new Promise(async (resolve) => {
            const hash = await bcrypt.hash(data.password, 10);

            const user = {
                name: data.login,
                password: hash,
                email: data.email
            };

            await this.repository.insert(user);

            const getUser = await this.repository.findOneBy({
                name: data.login,
                email: data.email
            });

            resolve(getUser);
        });
    }

    async checkIfUsernameExists(login: string): Promise<any> {
        return this.repository.find({
            where: { name: login }
        });
    }

    async checkIfEmailExists(email: string): Promise<any> {
        return this.repository.find({
            where: { email: email }
        });
    }
}