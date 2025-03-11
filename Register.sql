-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql_db_840:3306
-- Generation Time: Mar 11, 2025 at 09:49 PM
-- Server version: 5.7.44
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `Register`
--

CREATE TABLE `Register` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) CHARACTER SET utf8 NOT NULL,
  `lastname` varchar(255) CHARACTER SET utf8 NOT NULL,
  `transportType` enum('เลือกประเภทขนส่ง','รถยนต์','รถจักรยานยนต์','รถบรรทุก') CHARACTER SET utf8 NOT NULL,
  `street` varchar(255) CHARACTER SET utf8 NOT NULL,
  `soi` varchar(255) CHARACTER SET utf8 COLLATE utf8_german2_ci NOT NULL,
  `thaiDistricts` enum('กรุณาเลือกจังหวัด') CHARACTER SET utf8 NOT NULL,
  `districts` enum('กรุณาเลือกเขต') CHARACTER SET utf8 NOT NULL,
  `subDistrict` enum('กรุณาเลือกแขวง') CHARACTER SET utf8 NOT NULL,
  `zipcodes` int(5) NOT NULL,
  `deliveryDate` date NOT NULL,
  `productQuantity` int(11) NOT NULL,
  `productSize` varchar(10) CHARACTER SET utf8 NOT NULL,
  `productWeight` varchar(255) CHARACTER SET utf8 NOT NULL,
  `productNote` varchar(255) CHARACTER SET utf8 NOT NULL,
  `productType` enum('เลือกประเภทสินค้า','สินค้าทั่วไป','ของกิน','เอกสาร','') CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Register`
--
ALTER TABLE `Register`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Register`
--
ALTER TABLE `Register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
