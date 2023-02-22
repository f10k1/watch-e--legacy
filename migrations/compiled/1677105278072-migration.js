"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migration1677105278072 = void 0;
class migration1677105278072 {
    constructor() {
        this.name = 'migration1677105278072';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`user\``);
    }
}
exports.migration1677105278072 = migration1677105278072;
//# sourceMappingURL=1677105278072-migration.js.map