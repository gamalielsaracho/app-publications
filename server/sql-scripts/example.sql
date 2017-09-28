SELECT
    me.id_medicamento,
    nombreMe.descripcion,
    (SELECT SUM(cantidadRecibida) FROM `lotesmedicamentos` lo WHERE lo.id_medicamento = me.id_medicamento) AS stock
      
  FROM `medicamentos` me, `nombresmedicamentos` nombreMe
    WHERE me.id_nombreMedicamento = nombreMe.id_nombreMedicamento 
    
    
  SELECT * FROM referencias ref, tiposanalisisparametros tipPa WHERE tipPa.id_tipoAnalisis = 1 AND tipPa.id_parametroAnalisis = ref.id_parametroAnalisis
 
    
    
 

-- MySQL Script generated by MySQL Workbench
-- 08/07/17 11:54:41
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema usf
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema usf
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `usf` DEFAULT CHARACTER SET utf8 ;
USE `usf` ;

-- -----------------------------------------------------
-- Table `usf`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `usf`.`roles` (
  `id_rol` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(45) NULL,
  PRIMARY KEY (`id_rol`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `usf`.`especialidades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `usf`.`especialidades` (
  `id_especialidad` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(45) NULL,
  PRIMARY KEY (`id_especialidad`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `usf`.`direcciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `usf`.`direcciones` (
  `id_direcciones` INT NOT NULL AUTO_INCREMENT,
  `calle` VARCHAR(45) NULL,
  `nroCasa` INT NULL,
  `observaciones` VARCHAR(45) NULL,
  PRIMARY KEY (`id_direcciones`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `usf`.`ciudades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `usf`.`ciudades` (
  `id_ciudades` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(45) NULL,
  PRIMARY KEY (`id_ciudades`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `usf`.`personales`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `usf`.`personales` (
  `id_personal` INT NOT NULL AUTO_INCREMENT,
  `nroDocumento` INT NULL,
  `nroRegistro` INT(30) NULL,
  `nombres` VARCHAR(45) NULL,
  `apellidos` VARCHAR(45) NULL,
  `telefono` INT(20) NULL,
  `fecha_nacimiento` DATE NULL,
  `email` VARCHAR(45) NULL,
  `clave` VARCHAR(45) NULL,
  `id_roles` INT NOT NULL,
  `id_especialidad` INT NOT NULL,
  `id_direcciones` INT NOT NULL,
  `id_ciudades` INT NOT NULL,
  `habilitado` TINYINT(1) NULL DEFAULT 1,
  PRIMARY KEY (`id_personal`),
  INDEX `fk_usuarios_roles1_idx` (`id_roles` ASC),
  INDEX `fk_usuarios_especialidades1_idx` (`id_especialidad` ASC),
  INDEX `fk_personales_direcciones1_idx` (`id_direcciones` ASC),
  INDEX `fk_personales_ciudades1_idx` (`id_ciudades` ASC),
  CONSTRAINT `fk_usuarios_roles1`
    FOREIGN KEY (`id_roles`)
    REFERENCES `usf`.`roles` (`id_rol`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuarios_especialidades1`
    FOREIGN KEY (`id_especialidad`)
    REFERENCES `usf`.`especialidades` (`id_especialidad`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_personales_direcciones1`
    FOREIGN KEY (`id_direcciones`)
    REFERENCES `usf`.`direcciones` (`id_direcciones`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_personales_ciudades1`
    FOREIGN KEY (`id_ciudades`)
    REFERENCES `usf`.`ciudades` (`id_ciudades`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
