SELECT
    me.id_medicamento,
    nombreMe.descripcion,
    (SELECT SUM(cantidadRecibida) FROM `lotesmedicamentos` lo 
        WHERE lo.id_medicamento = me.id_medicamento) AS stock
      
  FROM `medicamentos` me, `nombresmedicamentos` nombreMe
    WHERE me.id_nombreMedicamento = nombreMe.id_nombreMedicamento 
    
    
  SELECT * FROM referencias ref, tiposanalisisparametros tipPa WHERE tipPa.id_tipoAnalisis = 1 AND tipPa.id_parametroAnalisis = ref.id_parametroAnalisis
 
  
-- para gráfica 1.
SELECT
  COUNT(DISTINCT consulta.fecha),
    consulta.fecha
FROM
    consultasdiagnosticos cXd,
    consultas consulta
WHERE
  cXd.id_consulta = consulta.id_consulta AND
    YEAR(consulta.fecha)



SELECT
     *,
     cu.`fechaCreacion` AS cu_fechaCreacion,
     cu.`fechaUmovimiento` AS cu_fechaUmovimiento,
     cu.`saldo` AS cu_saldo,
     cu.`sobreHabilitado` AS cu_sobreHabilitado,
     mov.`fechaMovimiento` AS mov_fechaMovimiento,
     mov.`monto` AS mov_monto,
     mov.`tipo` AS mov_tipo,
     mov.`id_cuenta` AS mov_id_cuenta,
     cli.`nombre` AS cli_nombre,
     cli.`apellido` AS cli_apellido,
     cli.`sexo` AS cli_sexo,
     cli.`edad` AS cli_edad,
     ba.`Nombre` AS ba_Nombre
FROM
     `cuentas` cu, `movimientos` mov, `clientes` cli, `bancos` ba
WHERE
    cu.`id_cuenta` = mov.`id_cuenta` AND
    cu.`id_cliente` = cli.`id_cliente` AND
    cu.`id_banco` = ba.`id_banco`
ORDER BY
     cu.`id_cuenta` ASC
    

-- --------------------
SELECT
  YEAR(consulta.fecha) fecha,
    COUNT( DISTINCT cXd.id_diagnostico) cantidad,
    diagnostico.descripcion,
    consulta.fecha
FROM
    consultasdiagnosticos cXd,
    consultas consulta,
    diagnosticos diagnostico
WHERE
  cXd.id_consulta = consulta.id_consulta AND
  cXd.id_diagnostico = diagnostico.id_diagnostico 
 

-- ------------
SELECT
  YEAR(consulta.fecha) fecha,
    
    diagnostico.descripcion,
    consulta.fecha,
    (SELECT COUNT(DISTINCT cXd.id_diagnostico) cantidad 
      FROM
        consultasdiagnosticos cXd,
        diagnosticos diagnostico
        
        WHERE cXd.id_diagnostico = diagnostico.id_diagnostico)
FROM
    consultasdiagnosticos cXd,
    consultas consulta,
    diagnosticos diagnostico
WHERE
  cXd.id_consulta = consulta.id_consulta AND
  cXd.id_diagnostico = diagnostico.id_diagnostico 


-- sdsadsadas ver más.
SELECT
  consulta.id_consulta,
    YEAR(consulta.fecha),
    diagnostico.descripcion,
    COUNT(cXd.id_diagnostico) cantidad
    
  FROM
    consultasdiagnosticos cXd,
    diagnosticos diagnostico,
    consultas consulta
WHERE
  cXd.id_consulta = consulta.id_consulta AND
    cXd.id_diagnostico = diagnostico.id_diagnostico AND
    diagnostico.id_diagnostico = 2


-- sssssssssssssssssssssssssssss (super Cool.!) Estadística 1.
SELECT *
  FROM
      (SELECT
          DISTINCT(cXd.id_diagnostico),
          YEAR(consulta.fecha) fecha,
          diagnostico.descripcion,
          (SELECT COUNT(cXdA.id_diagnostico) FROM consultasdiagnosticos cXdA, consultas con WHERE cXdA.id_diagnostico = diagnostico.id_diagnostico AND cXdA.id_consulta = con.id_consulta AND con.fecha = consulta.fecha) cantidad
         FROM
          consultasdiagnosticos cXd,
          diagnosticos diagnostico,
          consultas consulta
        WHERE
          cXd.id_diagnostico = diagnostico.id_diagnostico AND 
          diagnostico.id_diagnostico = 1 AND
          cXd.id_consulta = consulta.id_consulta) tGral



-- ssssssssssssssssssssssssssssss Estadística 2.
SELECT
      DISTINCT(YEAR(consulta.fecha)) fecha,
          cXd.id_diagnostico,
          diagnostico.descripcion,
          (SELECT COUNT(cXdA.id_diagnostico) FROM consultasdiagnosticos cXdA, consultas con WHERE cXdA.id_diagnostico = diagnostico.id_diagnostico AND cXdA.id_consulta = con.id_consulta AND con.fecha = consulta.fecha) cantidad
         FROM
          consultasdiagnosticos cXd,
          diagnosticos diagnostico,
          consultas consulta
        WHERE
          cXd.id_diagnostico = diagnostico.id_diagnostico AND 
        
          cXd.id_consulta = consulta.id_consulta AND
          YEAR(consulta.fecha) = '2017'
          


-- este es . 
SELECT
  DISTINCT(diagnostico.id_diagnostico),
  YEAR(consulta.fecha),
  diagnostico.descripcion,
    consulta.fecha,
    -- (SELECT *  FROM consultasdiagnosticos cXdB WHERE cXdB.id_consulta = consulta.id_consulta) fecha,
    
  (SELECT COUNT(cXdA.id_diagnostico) FROM consultasdiagnosticos cXdA WHERE cXdA.id_diagnostico =diagnostico.id_diagnostico) cantidad
  FROM
    consultas consulta,
    diagnosticos diagnostico

-- prueba. :)
SELECT
  DISTINCT(YEAR(consulta.fecha)) fecha,
  diagnostico.descripcion,
    -- consulta.fecha,
  -- (SELECT cXdB.id_consulta FROM consultasdiagnosticos cXdB, consultas consulta 
    -- WHERE cXdB.id_consulta = consulta.id_consulta) fecha,
    
  (SELECT COUNT(cXdA.id_diagnostico) 
    FROM consultasdiagnosticos cXdA , (SELECT 
      DISTINCT(cXdZ.id_consulta)
        FROM consultasdiagnosticos cXdZ, consultas consulta
          WHERE 
            cXdZ.id_consulta =consulta.id_consulta) consul

    WHERE cXdA.id_diagnostico = diagnostico.id_diagnostico AND 
          cXdA.id_consulta = consul.id_consulta) cantidad
  FROM
    consultas consulta,
    diagnosticos diagnostico


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
