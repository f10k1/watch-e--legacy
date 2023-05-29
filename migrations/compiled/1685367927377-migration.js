"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migration1685367927377 = void 0;
class migration1685367927377 {
    constructor() {
        this.name = 'migration1685367927377';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`notification\` ADD \`date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`date\``);
    }
}
exports.migration1685367927377 = migration1685367927377;
//# sourceMappingURL=1685367927377-migration.js.map