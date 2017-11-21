import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1511263789033 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            'CREATE TABLE `matrices` (' +
            '`id` int(11) NOT NULL, ' +
            'PRIMARY KEY(`id`)' +
            ') ENGINE=InnoDB',
        );
        await queryRunner.query(
            'CREATE TABLE `tasks` (' +
            '`id` int(11) NOT NULL, ' +
            '`kind` varchar(20) NOT NULL, ' +
            '`name` varchar(100) NOT NULL, ' +
            '`done` tinyint(1) NOT NULL DEFAULT 0, ' +
            'PRIMARY KEY(`id`)' +
            ') ENGINE=InnoDB',
        );
        await queryRunner.query(
            'CREATE TABLE `matrix_tasks` (' +
            '`matrix_id` int(11) NOT NULL, ' +
            '`task_id` int(11) NOT NULL, ' +
            'PRIMARY KEY(`matrix_id`, `task_id`)' +
            ') ENGINE=InnoDB',
        );
        await queryRunner.query('CREATE INDEX `ind_99b58ff225adf89b4d4e8020a0` ON `matrix_tasks`(`matrix_id`)');
        await queryRunner.query('CREATE INDEX `ind_6792fa1ac04e5bfc01ece011fa` ON `matrix_tasks`(`task_id`)');
        await queryRunner.query(
            'ALTER TABLE `matrix_tasks` ' +
            'ADD CONSTRAINT `fk_f5801676a1491692a879ce5afac` ' +
            'FOREIGN KEY (`matrix_id`) ' +
            'REFERENCES `matrices`(`id`)',
        );
        await queryRunner.query(
            'ALTER TABLE `matrix_tasks` ' +
            'ADD CONSTRAINT `fk_d48d8e6e6875cad6e22abc54eeb` ' +
            'FOREIGN KEY (`task_id`) ' +
            'REFERENCES `tasks`(`id`)',
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `matrix_tasks` DROP FOREIGN KEY `fk_d48d8e6e6875cad6e22abc54eeb`');
        await queryRunner.query('ALTER TABLE `matrix_tasks` DROP FOREIGN KEY `fk_f5801676a1491692a879ce5afac`');
        await queryRunner.query('ALTER TABLE `matrix_tasks` DROP INDEX `ind_6792fa1ac04e5bfc01ece011fa`');
        await queryRunner.query('ALTER TABLE `matrix_tasks` DROP INDEX `ind_99b58ff225adf89b4d4e8020a0`');
        await queryRunner.query('DROP TABLE `matrix_tasks`');
        await queryRunner.query('DROP TABLE `tasks`');
        await queryRunner.query('DROP TABLE `matrices`');
    }

}
