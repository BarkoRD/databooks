-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 27-12-2023 a las 14:56:02
-- Versión del servidor: 8.0.31
-- Versión de PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `contabilidad`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--


--
-- Volcado de datos para la tabla `proveedores`
--

-- --------------------------------------------------------
--
-- SELECT SUM(debitos) AS total_debitos FROM gastos; 
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `pass` varchar(20) DEFAULT NULL,
  `balance` float DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT DEFAULT CHARSET=utf8 COLLATE=utf8;

DROP TABLE IF EXISTS `gastos`;
CREATE TABLE IF NOT EXISTS `gastos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `etiqueta_id` int NOT NULL, 
  `medio_id` int NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `debito` float DEFAULT NULL,`
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_etiquetas-etiqueta_id` (`etiqueta_id`),
  KEY `fk_medios-medio_id` (`medio_id`),
) ENGINE=InnoDB AUTO_INCREMENT DEFAULT CHARSET=utf8 COLLATE=utf8;

DROP TABLE IF EXISTS `ingresos`;
CREATE TABLE IF NOT EXISTS `ingresos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `etiqueta_id` int NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `credito` float DEFAULT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_etiquetas-etiqueta_id` (`etiqueta_id`),
) ENGINE=InnoDB AUTO_INCREMENT DEFAULT CHARSET=utf8 COLLATE=utf8; --luego veremo

DROP TABLE IF EXISTS `etiquetas`;
CREATE TABLE IF NOT EXISTS `etiquetas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT DEFAULT CHARSET=utf8 COLLATE=utf8;

DROP TABLE IF EXISTS `medio_de_pago`;
CREATE TABLE IF NOT EXISTS `medios_de_pago` (
  `id` int NOT NULL AUTO_INCREMENT,
  `medio` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT DEFAULT CHARSET=utf8 COLLATE=utf8;

ALTER TABLE `gastos`
  ADD CONSTRAINT `fk_etiquetas-etiqueta_id` FOREIGN KEY (`etiqueta_id`) REFERENCES `etiquetas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_medios-medio_id` FOREIGN KEY (`medio_id`) REFERENCES `medios_de_pago` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `ingresos`
  ADD CONSTRAINT `fk_etiquetas-etiqueta_id` FOREIGN KEY (`etiqueta_id`) REFERENCES `etiquetas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO `usuarios` (`id`, `username`, `pass`, `balance`) VALUES (1, 'admin', 'admin', 0);

INSERT INTO `Medios_de_pago` (`id`, `medio`) VALUES
(1, 'efectivo'),
(2, 'tarjeta'),
(3, 'transferencia'),
(4, 'paypal'),
(5, 'criptomoneda'),
(6, 'otro');

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
