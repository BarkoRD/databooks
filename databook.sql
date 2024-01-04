SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

DROP TABLE IF EXISTS `etiquetas`;
CREATE TABLE IF NOT EXISTS `etiquetas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `etiquetas_nombre_unique` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `etiquetas` (`id`, `nombre`, `tipo`) VALUES
(1, 'elpepe', 'ingreso');

DROP TABLE IF EXISTS `extenos`;
CREATE TABLE IF NOT EXISTS `extenos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `etiqueta_id` int NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `credito` float DEFAULT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_externos-etiqueta_id` (`etiqueta_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `gastos`;
CREATE TABLE IF NOT EXISTS `gastos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `etiqueta_id` int NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `debito` float DEFAULT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_gastos-etiqueta_id` (`etiqueta_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `ingresos`;
CREATE TABLE IF NOT EXISTS `ingresos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `etiqueta_id` int NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `credito` float DEFAULT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_ingresos-etiqueta_id` (`etiqueta_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `mail`;
CREATE TABLE IF NOT EXISTS `mail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mail` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `propias`;
CREATE TABLE IF NOT EXISTS `propias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `etiqueta_id` int NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `credito` float DEFAULT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_propias-etiqueta_id` (`etiqueta_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `pass` varchar(20) DEFAULT NULL,
  `balance` float DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `usuarios` (`id`, `username`, `pass`, `balance`) VALUES
(1, 'admin', 'admin', 0);

ALTER TABLE `extenos`
  ADD CONSTRAINT `fk_externos-etiqueta_id` FOREIGN KEY (`etiqueta_id`) REFERENCES `etiquetas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
