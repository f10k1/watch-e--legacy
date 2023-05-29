"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migration1685390856533 = void 0;
class migration1685390856533 {
    constructor() {
        this.name = 'migration1685390856533';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`notification\` ADD \`important\` tinyint NOT NULL DEFAULT 0`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`important\``);
    }
}
exports.migration1685390856533 = migration1685390856533;
//# sourceMappingURL=1685390856533-migration.js.map