import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1511261549061 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `matrices` (`id` int(11) NOT NULL, PRIMARY KEY(`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `tasks` (`id` int(11) NOT NULL, `kind` varchar(20) NOT NULL, `name` varchar(100) NOT NULL, `done` tinyint(1) NOT NULL DEFAULT 0, PRIMARY KEY(`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `matrix_tasks` (`matricesId` int(11) NOT NULL, `tasksId` int(11) NOT NULL, PRIMARY KEY(`matricesId`, `tasksId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE INDEX `ind_030fbb19bf3ba84bf6287ab405` ON `matrix_tasks`(`matricesId`)");
        await queryRunner.query("CREATE INDEX `ind_2a388966947fd5dbe71d94deca` ON `matrix_tasks`(`tasksId`)");
        await queryRunner.query("ALTER TABLE `matrix_tasks` ADD CONSTRAINT `fk_48e0473183d7c9fb1152c86154d` FOREIGN KEY (`matricesId`) REFERENCES `matrices`(`id`)");
        await queryRunner.query("ALTER TABLE `matrix_tasks` ADD CONSTRAINT `fk_d46d43a2a19d822a8cd3c4d0000` FOREIGN KEY (`tasksId`) REFERENCES `tasks`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `matrix_tasks` DROP FOREIGN KEY `fk_d46d43a2a19d822a8cd3c4d0000`");
        await queryRunner.query("ALTER TABLE `matrix_tasks` DROP FOREIGN KEY `fk_48e0473183d7c9fb1152c86154d`");
        await queryRunner.query("ALTER TABLE `matrix_tasks` DROP INDEX `ind_2a388966947fd5dbe71d94deca`");
        await queryRunner.query("ALTER TABLE `matrix_tasks` DROP INDEX `ind_030fbb19bf3ba84bf6287ab405`");
        await queryRunner.query("DROP TABLE `matrix_tasks`");
        await queryRunner.query("DROP TABLE `tasks`");
        await queryRunner.query("DROP TABLE `matrices`");
    }

}
