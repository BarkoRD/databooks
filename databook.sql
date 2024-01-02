-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 30-12-2023 a las 02:02:17
-- Versión del servidor: 8.0.31
-- Versión de PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `databook`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `etiquetas`
--

DROP TABLE IF EXISTS `etiquetas`;
CREATE TABLE IF NOT EXISTS `etiquetas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `etiquetas_nombre_unique` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `extenos`
--

DROP TABLE IF EXISTS `extenos`;
CREATE TABLE IF NOT EXISTS `extenos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `etiqueta_id` int NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `credito` float DEFAULT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_externos-etiqueta_id` (`etiqueta_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gastos`
--

DROP TABLE IF EXISTS `gastos`;
CREATE TABLE IF NOT EXISTS `gastos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `etiqueta_id` int NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `debito` float DEFAULT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_gastos-etiqueta_id` (`etiqueta_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingresos`
--

DROP TABLE IF EXISTS `ingresos`;
CREATE TABLE IF NOT EXISTS `ingresos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `etiqueta_id` int NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `credito` float DEFAULT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_ingresos-etiqueta_id` (`etiqueta_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mail`
--

DROP TABLE IF EXISTS `mail`;
CREATE TABLE IF NOT EXISTS `mail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mail` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

DROP TABLE IF EXISTS `notificaciones`;
CREATE TABLE IF NOT EXISTS `notificaciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `extra_message` varchar(255) DEFAULT NULL,
  `mail_id` int NOT NULL,
  `propia_id` int DEFAULT NULL,
  `externa_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_notificaciones-mail_id` (`mail_id`),
  KEY `fk_notificaciones-propia_id` (`propia_id`),
  KEY `fk_notificaciones-externa_id` (`externa_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `propias`
--

DROP TABLE IF EXISTS `propias`;
CREATE TABLE IF NOT EXISTS `propias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `etiqueta_id` int NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `credito` float DEFAULT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_propias-etiqueta_id` (`etiqueta_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `pass` varchar(20) DEFAULT NULL,
  `balance` float DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `extenos`
--
ALTER TABLE `extenos`
  ADD CONSTRAINT `fk_externos-etiqueta_id` FOREIGN KEY (`etiqueta_id`) REFERENCES `etiquetas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `gastos`
--
ALTER TABLE `gastos`
  ADD CONSTRAINT `fk_gastos-etiqueta_id` FOREIGN KEY (`etiqueta_id`) REFERENCES `etiquetas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,

--
-- Filtros para la tabla `ingresos`
--
ALTER TABLE `ingresos`
  ADD CONSTRAINT `fk_ingresos-etiqueta_id` FOREIGN KEY (`etiqueta_id`) REFERENCES `etiquetas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `fk_notificaciones-externa_id` FOREIGN KEY (`externa_id`) REFERENCES `extenos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_notificaciones-mail_id` FOREIGN KEY (`mail_id`) REFERENCES `mail` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_notificaciones-propia_id` FOREIGN KEY (`propia_id`) REFERENCES `propias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `propias`
--
ALTER TABLE `propias`
  ADD CONSTRAINT `fk_propias-etiqueta_id` FOREIGN KEY (`etiqueta_id`) REFERENCES `etiquetas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
