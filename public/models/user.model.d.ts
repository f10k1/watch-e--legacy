export default class UserModule {
    getUser(): Promise<any>;
    createUser(data: any): Promise<void>;
}
