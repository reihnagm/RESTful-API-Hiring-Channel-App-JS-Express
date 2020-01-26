-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 26, 2020 at 04:58 PM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hiring_channel_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `name`, `logo`, `location`, `description`, `email`, `telephone`, `user_id`, `date_created`, `date_updated`) VALUES
(4, 'Tokopedia', 'tokopedia.jpg', 'Jakarta', 'Tokopedia adalah salah satu marketplace terbesar di Indonesia yang didirikan pada tahun 2010', NULL, '089670558381', 102, '2020-01-25 08:32:00', '2020-01-25 08:32:00'),
(5, 'Twitter', 'twitter.png', 'Jakarta', 'Twitter adalah sebuah platform untuk pengguna berbagi informasi', 'twitter@gmail.com', '089670558381', 103, '2020-01-25 11:24:22', '2020-01-25 11:24:22'),
(6, 'BukaLapak', 'bukalapak.png', 'Jakarta', 'BukaLapak adalah salah satu e-commerce terbesar di Indonesia.', 'bukalapak@gmail.com', '089670558381', 104, '2020-01-25 12:54:09', '2020-01-25 12:54:09');

-- --------------------------------------------------------

--
-- Table structure for table `engineer`
--

CREATE TABLE `engineer` (
  `id` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `skill` varchar(255) DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `showcase` varchar(50) DEFAULT NULL,
  `telephone` varchar(50) DEFAULT NULL,
  `salary` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `date_created` datetime DEFAULT current_timestamp(),
  `date_updated` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `engineer`
--

INSERT INTO `engineer` (`id`, `description`, `skill`, `location`, `birthdate`, `showcase`, `telephone`, `salary`, `avatar`, `user_id`, `date_created`, `date_updated`) VALUES
(153, 'Seorang Full Stack Developer yang memiliki kemampuan dalam membangun sebuah website, dengan adanya pengalaman saya dalam bekerja untuk menangani berbagai bug dan merawat fitur serta mengintegrasikan fitur pada website, adapun dalam pembuatan website saya menggunakan Laravel & Codeigniter serta JQuery dan Oracle DB. Di samping itu, saya mempunyai kemampuan membangun sebuah RESTful API dengan NodeJs, Express dan JSON Web Token. ', 'Laravel, Codeigniter, Javascript, Node JS, Express, React JS', 'Jakarta', '1999-12-02', 'https://reihanagam.id/showcase', '089670558381', '7.000.000', 'me.png', 59, '2020-01-21 22:24:12', '2020-01-21 22:24:12'),
(154, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula, justo ut commodo bibendum, erat elit malesuada enim, convallis ultricies eros dui non nisi. Nulla pretium pellentesque pretium. Integer faucibus odio sed sapien bibendum sagittis. Curabitur eget ullamcorper massa. Nunc eu nibh ac justo efficitur vehicula eget quis tellus. Nullam ac massa eleifend, vulputate turpis congue, facilisis eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In eget lectus vestibulum, elementum tortor in, aliquam nisl. Donec eu malesuada lectus. Etiam risus eros, tempor ut lectus sed, eleifend placerat ipsum. Suspendisse placerat sed erat ut maximus. Duis aliquam purus nulla, sit amet vehicula ante efficitur a. Morbi scelerisque iaculis volutpat. Aenean pharetra porttitor semper.', 'Laravel, Codeigniter, React JS, React Native', 'Jakarta', '0000-00-00', 'https://gilang.com/showcase', '089670558381', '24.000.000', 'sylvester-stallone.jpg', 60, '2020-01-22 06:36:26', '2020-01-22 06:36:26'),
(158, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut leo nunc, blandit ac justo ac, imperdiet feugiat urna. Nulla ac feugiat elit. Donec consectetur sollicitudin ligula, at congue ante dictum ut. Ut vulputate tempor ligula. In id pretium urna, a ultricies tortor. Fusce quis lacus vel enim dapibus lacinia sit amet quis mi. Maecenas eu tortor sit amet ligula semper dictum sit amet id elit. Morbi at suscipit tellus, et pulvinar mauris. Etiam a tempus enim, scelerisque facilisis massa. Ut mattis arcu eu ligula volutpat, sed congue diam laoreet. Duis sed dapibus nisi. Aenean non ultricies tellus. Quisque fringilla eu elit ac fermentum. Sed id est id mi auctor pharetra. Donec malesuada viverra tortor in euismod.', 'Laravel, Codeigniter, React JS, React Native, Javascript, C#, C++', 'South Korea', '0000-00-00', 'https://wonbin.com/showcase', '089670558381', '30.000.000', 'Won-Bin-01.jpg', 64, '2020-01-22 08:48:56', '2020-01-22 08:48:56'),
(159, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula, justo ut commodo bibendum, erat elit malesuada enim, convallis ultricies eros dui non nisi. Nulla pretium pellentesque pretium. Integer faucibus odio sed sapien bibendum sagittis. Curabitur eget ullamcorper massa. Nunc eu nibh ac justo efficitur vehicula eget quis tellus. Nullam ac massa eleifend, vulputate turpis congue, facilisis eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In eget lectus vestibulum, elementum tortor in, aliquam nisl. Donec eu malesuada lectus. Etiam risus eros, tempor ut lectus sed, eleifend placerat ipsum. Suspendisse placerat sed erat ut maximus. Duis aliquam purus nulla, sit amet vehicula ante efficitur a. Morbi scelerisque iaculis volutpat. Aenean pharetra porttitor semper.', 'Laravel, Codeigniter, Javascript, Node JS, Express', 'Texas', '0000-00-00', 'http://dwayne.com/showcase', '089670558381', '28.000.000', 'dwayne johnson.jpg', 65, '2020-01-22 09:03:44', '2020-01-22 09:03:44'),
(161, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula, justo ut commodo bibendum, erat elit malesuada enim, convallis ultricies eros dui non nisi. Nulla pretium pellentesque pretium. Integer faucibus odio sed sapien bibendum sagittis. Curabitur eget ullamcorper massa. Nunc eu nibh ac justo efficitur vehicula eget quis tellus. Nullam ac massa eleifend, vulputate turpis congue, facilisis eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In eget lectus vestibulum, elementum tortor in, aliquam nisl. Donec eu malesuada lectus. Etiam risus eros, tempor ut lectus sed, eleifend placerat ipsum. Suspendisse placerat sed erat ut maximus. Duis aliquam purus nulla, sit amet vehicula ante efficitur a. Morbi scelerisque iaculis volutpat. Aenean pharetra porttitor semper.', 'Microsoft, ASP.net, C++, C#, Swift', 'Sydney', '0000-00-00', 'http://steve.id/showcase', '089670558381', '25.000.000', 'steve-jobs.jpg', 67, '2020-01-23 18:52:09', '2020-01-23 18:52:09'),
(162, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut leo nunc, blandit ac justo ac, imperdiet feugiat urna. Nulla ac feugiat elit. Donec consectetur sollicitudin ligula, at congue ante dictum ut. Ut vulputate tempor ligula. In id pretium urna, a ultricies tortor. Fusce quis lacus vel enim dapibus lacinia sit amet quis mi. Maecenas eu tortor sit amet ligula semper dictum sit amet id elit. Morbi at suscipit tellus, et pulvinar mauris. Etiam a tempus enim, scelerisque facilisis massa. Ut mattis arcu eu ligula volutpat, sed congue diam laoreet. Duis sed dapibus nisi. Aenean non ultricies tellus. Quisque fringilla eu elit ac fermentum. Sed id est id mi auctor pharetra. Donec malesuada viverra tortor in euismod.', 'Laravel, Codeigniter, React JS, React Native', 'Amerika', '0000-00-00', 'https://keanu.com/showcase', '089670558381', '20.000.000', 'gettyimages-1981871a-1560281723.jpg', 68, '2020-01-23 20:34:48', '2020-01-23 20:34:48'),
(163, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula, justo ut commodo bibendum, erat elit malesuada enim, convallis ultricies eros dui non nisi. Nulla pretium pellentesque pretium. Integer faucibus odio sed sapien bibendum sagittis. Curabitur eget ullamcorper massa. Nunc eu nibh ac justo efficitur vehicula eget quis tellus. Nullam ac massa eleifend, vulputate turpis congue, facilisis eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In eget lectus vestibulum, elementum tortor in, aliquam nisl. Donec eu malesuada lectus. Etiam risus eros, tempor ut lectus sed, eleifend placerat ipsum. Suspendisse placerat sed erat ut maximus. Duis aliquam purus nulla, sit amet vehicula ante efficitur a. Morbi scelerisque iaculis volutpat. Aenean pharetra porttitor semper.', 'Laravel, Codeigniter, React JS, React Native, Javascript', 'Amerika', '0000-00-00', 'http://riddle.com/showcase', '089670558381', '20.000.000', 'Tom_Marvolo_Riddle_III.jpg', 69, '2020-01-23 20:40:11', '2020-01-23 20:40:11'),
(164, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut leo nunc, blandit ac justo ac, imperdiet feugiat urna. Nulla ac feugiat elit. Donec consectetur sollicitudin ligula, at congue ante dictum ut. Ut vulputate tempor ligula. In id pretium urna, a ultricies tortor. Fusce quis lacus vel enim dapibus lacinia sit amet quis mi. Maecenas eu tortor sit amet ligula semper dictum sit amet id elit. Morbi at suscipit tellus, et pulvinar mauris. Etiam a tempus enim, scelerisque facilisis massa. Ut mattis arcu eu ligula volutpat, sed congue diam laoreet. Duis sed dapibus nisi. Aenean non ultricies tellus. Quisque fringilla eu elit ac fermentum. Sed id est id mi auctor pharetra. Donec malesuada viverra tortor in euismod.', 'Laravel, Codeigniter, Javascript, Node JS, Express', 'Jakarta', '0000-00-00', 'https://jackma.com/showcase', '089670558381', '60.000.000', 't_5da435da2ad13.jpg', 70, '2020-01-23 21:13:13', '2020-01-23 21:13:13'),
(165, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula, justo ut commodo bibendum, erat elit malesuada enim, convallis ultricies eros dui non nisi. Nulla pretium pellentesque pretium. Integer faucibus odio sed sapien bibendum sagittis. Curabitur eget ullamcorper massa. Nunc eu nibh ac justo efficitur vehicula eget quis tellus. Nullam ac massa eleifend, vulputate turpis congue, facilisis eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In eget lectus vestibulum, elementum tortor in, aliquam nisl. Donec eu malesuada lectus. Etiam risus eros, tempor ut lectus sed, eleifend placerat ipsum. Suspendisse placerat sed erat ut maximus. Duis aliquam purus nulla, sit amet vehicula ante efficitur a. Morbi scelerisque iaculis volutpat. Aenean pharetra porttitor semper.', 'Laravel, Codeigniter, Javascript, Node JS, Express', 'Amerika', '0000-00-00', 'http://erwinsmith.com/showcase', '089670558381', '7.000.000', '1.jpg', 71, '2020-01-23 21:58:03', '2020-01-23 21:58:03'),
(170, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut leo nunc, blandit ac justo ac, imperdiet feugiat urna. Nulla ac feugiat elit. Donec consectetur sollicitudin ligula, at congue ante dictum ut. Ut vulputate tempor ligula. In id pretium urna, a ultricies tortor. Fusce quis lacus vel enim dapibus lacinia sit amet quis mi. Maecenas eu tortor sit amet ligula semper dictum sit amet id elit. Morbi at suscipit tellus, et pulvinar mauris. Etiam a tempus enim, scelerisque facilisis massa. Ut mattis arcu eu ligula volutpat, sed congue diam laoreet. Duis sed dapibus nisi. Aenean non ultricies tellus. Quisque fringilla eu elit ac fermentum. Sed id est id mi auctor pharetra. Donec malesuada viverra tortor in euismod.', 'Microsoft, ASP.net, C++, C#', '', '0000-00-00', '', '', '24.000.000', '5.jpg', 76, '2020-01-23 22:48:17', '2020-01-23 22:48:17'),
(177, 'lorem ipsum dolor sit amet', 'Laravel, Codeigniter, Javascript, Node JS, Express, Vue', 'China', '0000-00-00', 'http://kirito.com/showcase', '089670558381', '20.000.000', 'evan you.jpg', 83, '2020-01-23 23:52:08', '2020-01-23 23:52:08'),
(178, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula, justo ut commodo bibendum, erat elit malesuada enim, convallis ultricies eros dui non nisi. Nulla pretium pellentesque pretium. Integer faucibus odio sed sapien bibendum sagittis. Curabitur eget ullamcorper massa. Nunc eu nibh ac justo efficitur vehicula eget quis tellus. Nullam ac massa eleifend, vulputate turpis congue, facilisis eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In eget lectus vestibulum, elementum tortor in, aliquam nisl. Donec eu malesuada lectus. Etiam risus eros, tempor ut lectus sed, eleifend placerat ipsum. Suspendisse placerat sed erat ut maximus. Duis aliquam purus nulla, sit amet vehicula ante efficitur a. Morbi scelerisque iaculis volutpat. Aenean pharetra porttitor semper.', '', '', NULL, '', '', '', '', 84, '2020-01-24 00:08:34', '2020-01-24 00:08:34'),
(179, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula, justo ut commodo bibendum, erat elit malesuada enim, convallis ultricies eros dui non nisi. Nulla pretium pellentesque pretium. Integer faucibus odio sed sapien bibendum sagittis. Curabitur eget ullamcorper massa. Nunc eu nibh ac justo efficitur vehicula eget quis tellus. Nullam ac massa eleifend, vulputate turpis congue, facilisis eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In eget lectus vestibulum, elementum tortor in, aliquam nisl. Donec eu malesuada lectus. Etiam risus eros, tempor ut lectus sed, eleifend placerat ipsum. Suspendisse placerat sed erat ut maximus. Duis aliquam purus nulla, sit amet vehicula ante efficitur a. Morbi scelerisque iaculis volutpat. Aenean pharetra porttitor semper.', 'Laravel, Codeigniter, Javascript, Node JS, Express, Vue', 'Bandung', '1978-01-19', 'https://erick.com/showcase', '089670558381', '24.000.000', 'jack-lepiarz.jpg', 85, '2020-01-24 00:20:42', '2020-01-24 00:20:42'),
(181, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula, justo ut commodo bibendum, erat elit malesuada enim, convallis ultricies eros dui non nisi. Nulla pretium pellentesque pretium. Integer faucibus odio sed sapien bibendum sagittis. Curabitur eget ullamcorper massa. Nunc eu nibh ac justo efficitur vehicula eget quis tellus. Nullam ac massa eleifend, vulputate turpis congue, facilisis eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In eget lectus vestibulum, elementum tortor in, aliquam nisl. Donec eu malesuada lectus. Etiam risus eros, tempor ut lectus sed, eleifend placerat ipsum. Suspendisse placerat sed erat ut maximus. Duis aliquam purus nulla, sit amet vehicula ante efficitur a. Morbi scelerisque iaculis volutpat. Aenean pharetra porttitor semper.', 'Node JS. Redis, C++, C#, Laravel, Codeigniter', 'South Korea', '0000-00-00', 'https://jack.id/showcase', '089670558381', '7.000.000', 'sehun.jpg', 87, '2020-01-24 00:32:18', '2020-01-24 00:32:18'),
(182, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut leo nunc, blandit ac justo ac, imperdiet feugiat urna. Nulla ac feugiat elit. Donec consectetur sollicitudin ligula, at congue ante dictum ut. Ut vulputate tempor ligula. In id pretium urna, a ultricies tortor. Fusce quis lacus vel enim dapibus lacinia sit amet quis mi. Maecenas eu tortor sit amet ligula semper dictum sit amet id elit. Morbi at suscipit tellus, et pulvinar mauris. Etiam a tempus enim, scelerisque facilisis massa. Ut mattis arcu eu ligula volutpat, sed congue diam laoreet. Duis sed dapibus nisi. Aenean non ultricies tellus. Quisque fringilla eu elit ac fermentum. Sed id est id mi auctor pharetra. Donec malesuada viverra tortor in euismod.', 'Laravel, Codeigniter, Javascript, Node JS, Express, React JS, React Native', 'Texas', '2020-01-26', 'https://john.com/showcase', '089670558381', '10.000.000', 'john-cena-562300-1-402.jpg', 88, '2020-01-24 00:43:00', '2020-01-24 00:43:00'),
(183, 'lorem ipsum dolor sit amet', '', '', '0000-00-00', '', '', '', '', 89, '2020-01-24 07:42:51', '2020-01-24 07:42:51'),
(184, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula, justo ut commodo bibendum, erat elit malesuada enim, convallis ultricies eros dui non nisi. Nulla pretium pellentesque pretium. Integer faucibus odio sed sapien bibendum sagittis. Curabitur eget ullamcorper massa. Nunc eu nibh ac justo efficitur vehicula eget quis tellus. Nullam ac massa eleifend, vulputate turpis congue, facilisis eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In eget lectus vestibulum, elementum tortor in, aliquam nisl. Donec eu malesuada lectus. Etiam risus eros, tempor ut lectus sed, eleifend placerat ipsum. Suspendisse placerat sed erat ut maximus. Duis aliquam purus nulla, sit amet vehicula ante efficitur a. Morbi scelerisque iaculis volutpat. Aenean pharetra porttitor semper.', 'Laravel, Codeigniter, React JS, React Native, Javascript, Python', 'Amerika', '0000-00-00', 'http://james.com/showcase', '089670558381', '24.000.000', '2.jpg', 90, '2020-01-24 08:04:43', '2020-01-24 08:04:43'),
(185, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula, justo ut commodo bibendum, erat elit malesuada enim, convallis ultricies eros dui non nisi. Nulla pretium pellentesque pretium. Integer faucibus odio sed sapien bibendum sagittis. Curabitur eget ullamcorper massa. Nunc eu nibh ac justo efficitur vehicula eget quis tellus. Nullam ac massa eleifend, vulputate turpis congue, facilisis eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In eget lectus vestibulum, elementum tortor in, aliquam nisl. Donec eu malesuada lectus. Etiam risus eros, tempor ut lectus sed, eleifend placerat ipsum. Suspendisse placerat sed erat ut maximus. Duis aliquam purus nulla, sit amet vehicula ante efficitur a. Morbi scelerisque iaculis volutpat. Aenean pharetra porttitor semper.', 'Laravel, Codeigniter, Javascript, Node JS, Express', 'Bandung', '0000-00-00', 'https://tomholland.com/showcase', '089670558381', '40.000.000', 'tom-holland-spider-man-homecoming-premiere-1024x683.jpg', 91, '2020-01-24 08:06:11', '2020-01-24 08:06:11'),
(186, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula, justo ut commodo bibendum, erat elit malesuada enim, convallis ultricies eros dui non nisi. Nulla pretium pellentesque pretium. Integer faucibus odio sed sapien bibendum sagittis. Curabitur eget ullamcorper massa. Nunc eu nibh ac justo efficitur vehicula eget quis tellus. Nullam ac massa eleifend, vulputate turpis congue, facilisis eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In eget lectus vestibulum, elementum tortor in, aliquam nisl. Donec eu malesuada lectus. Etiam risus eros, tempor ut lectus sed, eleifend placerat ipsum. Suspendisse placerat sed erat ut maximus. Duis aliquam purus nulla, sit amet vehicula ante efficitur a. Morbi scelerisque iaculis volutpat. Aenean pharetra porttitor semper.', 'Laravel, Codeigniter, Javascript, Node JS, Express', 'South Korea', '1987-06-21', 'https://lee.com/showcase', '089670558381', '25.000.000', '199-1998676_607-best-lee-min-ho-images-on-pinterest.jpg', 92, '2020-01-24 08:42:03', '2020-01-24 08:42:03'),
(187, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula, justo ut commodo bibendum, erat elit malesuada enim, convallis ultricies eros dui non nisi. Nulla pretium pellentesque pretium. Integer faucibus odio sed sapien bibendum sagittis. Curabitur eget ullamcorper massa. Nunc eu nibh ac justo efficitur vehicula eget quis tellus. Nullam ac massa eleifend, vulputate turpis congue, facilisis eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In eget lectus vestibulum, elementum tortor in, aliquam nisl. Donec eu malesuada lectus. Etiam risus eros, tempor ut lectus sed, eleifend placerat ipsum. Suspendisse placerat sed erat ut maximus. Duis aliquam purus nulla, sit amet vehicula ante efficitur a. Morbi scelerisque iaculis volutpat. Aenean pharetra porttitor semper.', 'Laravel, Codeigniter, Javascript, Node JS, Express, GoLang', 'Portugal', '0000-00-00', 'https://judo.com/showcase', '089670558381', '12.000.000', '846f5f8c1c61084cfc57cbf701bf700e.jpg', 93, '2020-01-24 08:44:51', '2020-01-24 08:44:51'),
(188, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula, justo ut commodo bibendum, erat elit malesuada enim, convallis ultricies eros dui non nisi. Nulla pretium pellentesque pretium. Integer faucibus odio sed sapien bibendum sagittis. Curabitur eget ullamcorper massa. Nunc eu nibh ac justo efficitur vehicula eget quis tellus. Nullam ac massa eleifend, vulputate turpis congue, facilisis eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In eget lectus vestibulum, elementum tortor in, aliquam nisl. Donec eu malesuada lectus. Etiam risus eros, tempor ut lectus sed, eleifend placerat ipsum. Suspendisse placerat sed erat ut maximus. Duis aliquam purus nulla, sit amet vehicula ante efficitur a. Morbi scelerisque iaculis volutpat. Aenean pharetra porttitor semper.', 'Laravel, Codeigniter, Express, React JS, React Native', 'Amerika', '0000-00-00', 'http://connie.com/showcase', '089670558381', '24.000.000', '6.jpg', 94, '2020-01-24 08:58:23', '2020-01-24 08:58:23'),
(189, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula, justo ut commodo bibendum, erat elit malesuada enim, convallis ultricies eros dui non nisi. Nulla pretium pellentesque pretium. Integer faucibus odio sed sapien bibendum sagittis. Curabitur eget ullamcorper massa. Nunc eu nibh ac justo efficitur vehicula eget quis tellus. Nullam ac massa eleifend, vulputate turpis congue, facilisis eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In eget lectus vestibulum, elementum tortor in, aliquam nisl. Donec eu malesuada lectus. Etiam risus eros, tempor ut lectus sed, eleifend placerat ipsum. Suspendisse placerat sed erat ut maximus. Duis aliquam purus nulla, sit amet vehicula ante efficitur a. Morbi scelerisque iaculis volutpat. Aenean pharetra porttitor semper.', 'Laravel, Codeigniter, Javascript, Node JS, Express', 'Jakarta', '0000-00-00', 'https://ryu.com/showcase', '089670558381', '20.000.000', 'ryu-dam-0001.jpg', 95, '2020-01-24 09:13:52', '2020-01-24 09:13:52'),
(190, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula, justo ut commodo bibendum, erat elit malesuada enim, convallis ultricies eros dui non nisi. Nulla pretium pellentesque pretium. Integer faucibus odio sed sapien bibendum sagittis. Curabitur eget ullamcorper massa. Nunc eu nibh ac justo efficitur vehicula eget quis tellus. Nullam ac massa eleifend, vulputate turpis congue, facilisis eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In eget lectus vestibulum, elementum tortor in, aliquam nisl. Donec eu malesuada lectus. Etiam risus eros, tempor ut lectus sed, eleifend placerat ipsum. Suspendisse placerat sed erat ut maximus. Duis aliquam purus nulla, sit amet vehicula ante efficitur a. Morbi scelerisque iaculis volutpat. Aenean pharetra porttitor semper.', '', '', '0000-00-00', '', '', '', '', 96, '2020-01-24 09:51:51', '2020-01-24 09:51:51'),
(191, 'lorem ipsum dolor sit amet', '', '', '0000-00-00', '', '', '', '', 97, '2020-01-24 09:52:50', '2020-01-24 09:52:50'),
(192, 'lorem ipsum dolor sit amet', '', '', '0000-00-00', '', '', '', '', 98, '2020-01-24 10:01:42', '2020-01-24 10:01:42'),
(193, 'testsetstsetsetsetset', '', '', '0000-00-00', '', '', '', '', 99, '2020-01-24 10:11:23', '2020-01-24 10:11:23'),
(194, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tincidunt sem. Curabitur posuere euismod nisi eu varius. Nulla et massa ullamcorper nisi condimentum ultrices. Integer nisl lectus, congue sed pharetra a, auctor vel elit. Nullam ultrices augue sit amet magna molestie maximus. Donec feugiat, sem vitae consectetur pharetra, elit sem mattis eros, vitae cursus lorem arcu nec neque. Nullam consequat vestibulum neque quis accumsan. Nunc cursus faucibus finibus.', 'Laravel, Codeigniter, React JS, React Native', 'Jakarta', '2020-01-26', 'http://beckham.com/showcase', '089670558381', '24.000.000', 'c29bc1bc-0ea0-449e-95e5-7ef2bde4dd54_169.jpeg', 100, '2020-01-24 11:08:24', '2020-01-24 11:08:24'),
(195, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut leo nunc, blandit ac justo ac, imperdiet feugiat urna. Nulla ac feugiat elit. Donec consectetur sollicitudin ligula, at congue ante dictum ut. Ut vulputate tempor ligula. In id pretium urna, a ultricies tortor. Fusce quis lacus vel enim dapibus lacinia sit amet quis mi. Maecenas eu tortor sit amet ligula semper dictum sit amet id elit. Morbi at suscipit tellus, et pulvinar mauris. Etiam a tempus enim, scelerisque facilisis massa. Ut mattis arcu eu ligula volutpat, sed congue diam laoreet. Duis sed dapibus nisi. Aenean non ultricies tellus. Quisque fringilla eu elit ac fermentum. Sed id est id mi auctor pharetra. Donec malesuada viverra tortor in euismod.', 'Node JS. Redis, C++, C#', 'Jakarta', '0000-00-00', 'https://user.com/showcase', '089670558381', '12.000.000', 'default.png', 101, '2020-01-25 08:58:51', '2020-01-25 08:58:51');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` tinyint(4) NOT NULL,
  `slug` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `role_id`, `slug`) VALUES
(59, 'Reihan Agam', 'reihanagam7@gmail.com', '$2a$10$96YLhpYGNpA.G9bY8MuDheOe3hYB2CuLHgBj0VV3pc582vgfR.Uj.', 1, 'reihan-agam'),
(60, 'Gilang', 'gilang@gmail.com', '$2a$10$BA5e4/cawUkScEfflvJMme8wbIECjNQQsN1CL0ezeW2xH2dGxTaXa', 1, 'gilang'),
(64, 'Won Bin', 'wonbin@gmail.com', '$2a$10$BCYP6eZd.tsGXpBwTBsCYePoQLKvuHvZApGdE89mwpYa9C8NJAl1G', 1, 'won-bin'),
(65, 'Dwayne', 'levi@gmail.com', '$2a$10$IhKmzRjiK7Fc.Q90V4JUQ.Y9qYGLroKS7SJkaqyO3aNJNSqZRd.pu', 1, 'dwayne'),
(67, 'Steve', 'steve@gmail.com', '$2a$10$25MlMvtNNKtbofimkoAPPOFG9xTyQTgICp5EI4GHDYdgx1fn1hnMO', 1, 'steve'),
(68, 'Keanu Reeves', 'keanu@gmail.com', '$2a$10$k5FAj92eaj6zxz81qZ9dmu0OTK2zhWS8Gi/cKAM/f.awCQ3WMxU7i', 1, 'keanu-reeves'),
(69, 'Tom Riddle', 'riddle@gmail.com', '$2a$10$dUIvK6v5aWMwRYN5XUPfOuA.5vOf2IaLr0.Y4MLAkT7NsWvfg7CzG', 1, 'tom-riddle'),
(70, 'Jack Ma', 'jackma@gmail.com', '$2a$10$lB/1VWHr8kdQugcMPJIjWup.bfFIzLsObqIsy3KxCrldED9AFLKBS', 1, 'jack-ma'),
(71, 'Erwin Smith', 'erwinsmith@gmail.com', '$2a$10$XvU1qJHn9XV0DcvQHy9c/.uf4LHq8rVs0kdDhSsCuwtOBbjIBKo.G', 1, 'erwin-smith'),
(74, 'Jean', 'jean@gmail.com', '$2a$10$1kqCMLtqRnmrR.k3mrpR4OpGt5z4r4KG.c6Nwo/vQhLySiqQHcVVe', 1, 'jean'),
(76, 'Bill Gates', 'bill@gmail.com', '$2a$10$VSvNWif7SKexC1gSCC1RuONHOjiJlb98Rse8AMjOCA/sTH7oh6AHW', 1, 'bill-gates'),
(83, 'Evan', 'evanyou@gmail.com', '$2a$10$wzUIVs1RC4XPzoVg74USuODH1pY8jPpVA3lO2WI2.FMlXIdwe0CFO', 1, 'evan'),
(85, 'Erick', 'erick@gmail.com', '$2a$10$khu7iRoVrYUxx2l8b9NuZOJj2UJ.dF1F4NixVyBKanq6/h20a2Kg6', 1, 'erick'),
(86, 'Yudo', 'yudo@gmail.com', '$2a$10$a9VlDc22XTJx5Jc4CenmqOKTZIKtEACGsiou4hDU6U683Lxc/NAQO', 1, 'yudo'),
(87, 'Jack', 'jack@gmail.com', '$2a$10$VFUg5TqH4bNA6qyR9RIz1u1drklKDDEgAtibi16lrx.K4A7k6eb0G', 1, 'jack'),
(88, 'John Cena', 'john@gmail.com', '$2a$10$gWBSZVJXaLSc2OltUCA0BereeekRXyTwqclOJ.ZORqbD.pSEI2P9K', 1, 'john-cena'),
(90, 'James', 'james@gmail.com', '$2a$10$0zaxgRl25yUGxjtHrDH0NO5WGsZlJPd/TfBLLPj498s8rqHyoDdke', 1, 'james'),
(91, 'Tom Holland', 'tom@gmail.com', '$2a$10$IOdVO7FvN6oTO/glkppUy.wdzzzmmxMZ3Hrejie8BDnHzGhodqe1O', 1, 'tom-holland'),
(92, 'Lee', 'lee@gmail.com', '$2a$10$051c/AWVputAF9Knt5sF2OuqIW6nLEvYjK3N687r4.Pg8uQaZ1OMS', 1, 'lee'),
(93, 'Judo', 'judo@gmail.com', '$2a$10$BL5/6TU56fHEK6z.pA2sKOeBB92ho/mSVBO0DIcVKdcBJclBd0rJm', 1, 'judo'),
(94, 'Connie', 'connie@gmail.com', '$2a$10$8OwyQayNSTMV63j3wRKO9.BvQQti4ekrJ.bqLKAMXbp4pJfxVqZKC', 1, 'connie'),
(95, 'Ryu', 'ryu@gmail.com', '$2a$10$bxtyAdnsKUvNt/czf7ohFOtsAkQUZmrY5rwHlf2iHb7liYcOCAfn6', 1, 'ryu'),
(100, 'David', 'beckham@gmail.com', '$2a$10$vQtUf0K8DjuC7LymVyxOF.oUKEy5sZiGqGZug5TeMLaVlcmL8ox1W', 1, 'david'),
(101, 'user', 'user@gmail.com', '$2a$10$v8dUkPPn/8QmEqAWF92BXOV/wybPwuyGwiI.bSEO.kKGn5PNrm2MC', 1, 'user'),
(102, 'Tokopedia', 'tokopedia@gmail.com', '$2a$10$.ehwA80ArifwgxZw0xSshO0ilWtSuQBKyklFX.Zkp74goplt6E4k2', 2, 'tokopedia'),
(103, 'Twitter', 'twitter@gmail.com', '$2a$10$HUZwq4P5IcpFghvBST/ZR.bpt1y4QBEyNzQJiG3pTDFhs934S1jYO', 2, 'twitter'),
(104, 'BukaLapak', 'bukalapak@gmail.com', '$2a$10$/XJMAf/lqAihZ3IqVGoFwe9dnE3gSF20D951XF8eIR0PGzRmg9JU6', 2, 'bukalapak');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `engineer`
--
ALTER TABLE `engineer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `engineer`
--
ALTER TABLE `engineer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=196;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
