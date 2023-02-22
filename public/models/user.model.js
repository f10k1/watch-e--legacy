"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataSource_1 = __importDefault(require("../../dataSource"));
const user_entity_1 = __importDefault(require("../database/user.entity"));
class UserModule {
    async getUser() {
        return dataSource_1.default.getRepository(user_entity_1.default).createQueryBuilder("user").getOne();
    }
    createUser(data) {
        return new Promise(() => { });
    }
}
exports.default = UserModule;
//# sourceMappingURL=user.model.js.map