"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migration1685187603282 = void 0;
class migration1685187603282 {
    constructor() {
        this.name = 'migration1685187603282';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`notification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`watched\` tinyint NOT NULL DEFAULT 0, \`type\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_1ced25315eb974b73391fb1c81b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_1ced25315eb974b73391fb1c81b\``);
        await queryRunner.query(`DROP TABLE \`notification\``);
    }
}
exports.migration1685187603282 = migration1685187603282;
//# sourceMappingURL=1685187603282-migration.js.map