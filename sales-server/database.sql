-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema sales
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `sales` ;

-- -----------------------------------------------------
-- Schema sales
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sales` DEFAULT CHARACTER SET utf8 ;
USE `sales` ;

-- -----------------------------------------------------
-- Table `sales`.`Users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sales`.`Users` ;

CREATE TABLE IF NOT EXISTS `sales`.`Users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `lastLogin` DATETIME NULL,
  `lastIp` VARCHAR(45) NULL,
  `isEmployee` TINYINT(1) NULL,
  `isCustomer` TINYINT(1) NULL,
  `birth` DATE NULL,
  `photo` BLOB NULL,
  `phone` VARCHAR(45) NULL,
  `address` BLOB NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sales`.`Suppliers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sales`.`Suppliers` ;

CREATE TABLE IF NOT EXISTS `sales`.`Suppliers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `Address` BLOB NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sales`.`Categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sales`.`Categories` ;

CREATE TABLE IF NOT EXISTS `sales`.`Categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sales`.`Products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sales`.`Products` ;

CREATE TABLE IF NOT EXISTS `sales`.`Products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idCategory` INT NOT NULL,
  `idSupplier` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `quantity` INT NULL,
  `minQuantity` INT NULL,
  `price` DECIMAL(10,2) NULL,
  `description` VARCHAR(245) NULL,
  `photo` BLOB NULL,
  `active` TINYINT(1) NULL,
  `code` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Produtos_Categorias1_idx` (`idCategory` ASC),
  INDEX `fk_Produtos_Fornecedores1_idx` (`idSupplier` ASC),
  CONSTRAINT `fk_Produtos_Categorias1`
    FOREIGN KEY (`idCategory`)
    REFERENCES `sales`.`Categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Produtos_Fornecedores1`
    FOREIGN KEY (`idSupplier`)
    REFERENCES `sales`.`Suppliers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sales`.`Sales`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sales`.`Sales` ;

CREATE TABLE IF NOT EXISTS `sales`.`Sales` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idCustomer` INT NOT NULL,
  `idEmployee` INT NOT NULL,
  `date` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Sales_Users1_idx` (`idCustomer` ASC),
  INDEX `fk_Sales_Users2_idx` (`idEmployee` ASC),
  CONSTRAINT `fk_Sales_Users1`
    FOREIGN KEY (`idCustomer`)
    REFERENCES `sales`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Sales_Users2`
    FOREIGN KEY (`idEmployee`)
    REFERENCES `sales`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sales`.`itens`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sales`.`itens` ;

CREATE TABLE IF NOT EXISTS `sales`.`itens` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idSale` INT NOT NULL,
  `idProduct` INT NOT NULL,
  `quantity` INT NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_itensVenda_Vendas1_idx` (`idSale` ASC),
  INDEX `fk_itensVenda_Produtos1_idx` (`idProduct` ASC),
  CONSTRAINT `fk_itensVenda_Vendas1`
    FOREIGN KEY (`idSale`)
    REFERENCES `sales`.`Sales` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_itensVenda_Produtos1`
    FOREIGN KEY (`idProduct`)
    REFERENCES `sales`.`Products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
