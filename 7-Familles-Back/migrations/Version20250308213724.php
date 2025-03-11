<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250308213724 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE family (idfamily SERIAL NOT NULL, name VARCHAR(50) DEFAULT NULL, description TEXT DEFAULT NULL, PRIMARY KEY(idfamily))');
        $this->addSql('CREATE TABLE game (idgame SERIAL NOT NULL, codepartie VARCHAR(255) NOT NULL, iswin BOOLEAN DEFAULT NULL, start_date TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, end_date TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(idgame))');
        $this->addSql('CREATE TABLE rawmaterial (idrawmaterial SERIAL NOT NULL, idfamily INT NOT NULL, name VARCHAR(50) DEFAULT NULL, description TEXT DEFAULT NULL, image VARCHAR(200) DEFAULT NULL, PRIMARY KEY(idrawmaterial))');
        $this->addSql('CREATE INDEX IDX_7EB23170C15B8CF7 ON rawmaterial (idfamily)');
        $this->addSql('ALTER TABLE rawmaterial ADD CONSTRAINT FK_7EB23170C15B8CF7 FOREIGN KEY (idfamily) REFERENCES family (idfamily) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE rawmaterial DROP CONSTRAINT FK_7EB23170C15B8CF7');
        $this->addSql('DROP TABLE family');
        $this->addSql('DROP TABLE game');
        $this->addSql('DROP TABLE rawmaterial');
    }
}
