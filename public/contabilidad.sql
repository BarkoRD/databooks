-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 06, 2023 at 10:06 PM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `contabilidad`
--

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
CREATE TABLE IF NOT EXISTS `clients` (
  `client_rnc` varchar(9) NOT NULL CHECK,
  `client_name` varchar(100) NOT NULL,
  `razon_social` varchar(50) NOT NULL,
  `client_phone` varchar(15) DEFAULT NULL,
  `client_email` varchar(50) DEFAULT NULL,
  `client_address` varchar(100) DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`client_rnc`),
  KEY `fk_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(75) DEFAULT NULL,
  `reference` varchar(50) DEFAULT NULL,
  `product_description` varchar(50) DEFAULT NULL,
  `cost` float DEFAULT NULL,
  `price` float DEFAULT NULL,
  `supplier_rnc` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `reference` (`reference`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
CREATE TABLE IF NOT EXISTS `suppliers` (
  `supplier_rnc` varchar(9) NOT NULL,
  `supplier_name` varchar(50) DEFAULT NULL,
  `supplier_address` varchar(100) DEFAULT NULL,
  `supplier_phone` varchar(15) DEFAULT NULL,
  `supplier_email` varchar(50) DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`supplier_rnc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `user_pass` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



ALTER TABLE `clients`
ADD CONSTRAINT `fk_clients-user_id`
FOREIGN KEY (`user_id`) 
REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `suppliers`
ADD CONSTRAINT `fk_suppliers-user_id`
FOREIGN KEY (`user_id`) 
REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;