-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 09 Sep 2021 pada 15.04
-- Versi server: 10.4.18-MariaDB
-- Versi PHP: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `daerah`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `kabupaten_tb`
--

CREATE TABLE `kabupaten_tb` (
  `id` mediumint(9) NOT NULL,
  `nama` varchar(50) DEFAULT NULL,
  `diresmikan` date DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp(),
  `provinsi_id` mediumint(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `kabupaten_tb`
--

INSERT INTO `kabupaten_tb` (`id`, `nama`, `diresmikan`, `photo`, `created_at`, `updated_at`, `provinsi_id`) VALUES
(3, 'Kabupaten Tegal', '0000-00-00', '1631189553511-poci_tegal.jpg', '2021-09-09 11:52:22', '2021-09-09 11:52:22', 2),
(4, 'Kabupaten pemalang', '0000-00-00', '1631189635811-58f7016d7838f53abc128335239d8005_2021-05-28_163846.png', '2021-09-09 19:13:55', '2021-09-09 19:13:55', 3),
(5, 'Kabupaten brebes', '0000-00-00', '1631190112147-unnamed.jpg', '2021-09-09 19:21:52', '2021-09-09 19:21:52', 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `provinsi_tb`
--

CREATE TABLE `provinsi_tb` (
  `id` mediumint(9) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `diresmikan` date DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `pulau` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `provinsi_tb`
--

INSERT INTO `provinsi_tb` (`id`, `nama`, `diresmikan`, `photo`, `pulau`, `created_at`, `updated_at`) VALUES
(2, 'Jawa timur', '0000-00-00', '1631190415784-download.png', 'Jawa', '2021-09-09 11:42:05', '2021-09-09 11:42:05'),
(3, 'Jawa Tengah', '1976-12-20', '1631190282948-unnamed.png', 'jawa', '2021-09-09 12:07:52', '2021-09-09 12:07:52'),
(4, 'Jawa Barat', '1959-10-14', '1631190461620-LOGO_3200_JAWA-BARAT_thumb.png', 'Jawa', '2021-09-09 19:27:41', '2021-09-09 19:27:41');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `kabupaten_tb`
--
ALTER TABLE `kabupaten_tb`
  ADD PRIMARY KEY (`id`),
  ADD KEY `provinsi_id` (`provinsi_id`);

--
-- Indeks untuk tabel `provinsi_tb`
--
ALTER TABLE `provinsi_tb`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `kabupaten_tb`
--
ALTER TABLE `kabupaten_tb`
  MODIFY `id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `provinsi_tb`
--
ALTER TABLE `provinsi_tb`
  MODIFY `id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `kabupaten_tb`
--
ALTER TABLE `kabupaten_tb`
  ADD CONSTRAINT `kabupaten_tb_ibfk_1` FOREIGN KEY (`provinsi_id`) REFERENCES `provinsi_tb` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
