import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1511257896949 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `matrix` (`id` int(11) NOT NULL, PRIMARY KEY(`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `task` (`id` int(11) NOT NULL, `kind` varchar(20) NOT NULL, `name` varchar(100) NOT NULL, `done` tinyint(1) NOT NULL DEFAULT 0, PRIMARY KEY(`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `matrix_tasks_task` (`matrixId` int(11) NOT NULL, `taskId` int(11) NOT NULL, PRIMARY KEY(`matrixId`, `taskId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE INDEX `ind_a34930c6b127730159024a35ff` ON `matrix_tasks_task`(`matrixId`)");
        await queryRunner.query("CREATE INDEX `ind_fddf2c8ddb06b8e01db66aba9b` ON `matrix_tasks_task`(`taskId`)");
        await queryRunner.query("ALTER TABLE `matrix_tasks_task` ADD CONSTRAINT `fk_3f3a30a9099b4c046f5c20b59fa` FOREIGN KEY (`matrixId`) REFERENCES `matrix`(`id`)");
        await queryRunner.query("ALTER TABLE `matrix_tasks_task` ADD CONSTRAINT `fk_6d8cf27d8447ea97ed49677c43b` FOREIGN KEY (`taskId`) REFERENCES `task`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `matrix_tasks_task` DROP FOREIGN KEY `fk_6d8cf27d8447ea97ed49677c43b`");
        await queryRunner.query("ALTER TABLE `matrix_tasks_task` DROP FOREIGN KEY `fk_3f3a30a9099b4c046f5c20b59fa`");
        await queryRunner.query("ALTER TABLE `matrix_tasks_task` DROP INDEX `ind_fddf2c8ddb06b8e01db66aba9b`");
        await queryRunner.query("ALTER TABLE `matrix_tasks_task` DROP INDEX `ind_a34930c6b127730159024a35ff`");
        await queryRunner.query("DROP TABLE `matrix_tasks_task`");
        await queryRunner.query("DROP TABLE `task`");
        await queryRunner.query("DROP TABLE `matrix`");
    }

}
