-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: hiring_channel_app
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `companies`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(255) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `user_uid` varchar(36) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `companies_un` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (15,'1eef0a3c-0b0e-4e9f-9057-ed32362ce791','Samsan Tech','samsan.jpg','7Soul,Cheju, Ido 2(i)-dong, 이도이동 제주시 Korea Selatan','samsantech@gmail.com','(896) 7055-8381','IT Provider established in South Korea','fed05651-38a3-45dd-ab41-c4da7e5ad334','2021-01-10 07:07:04','2021-01-10 07:07:04');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversation_replies`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `conversation_replies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `reply` text NOT NULL,
  `user_uid` varchar(36) NOT NULL,
  `conversation_uid` varchar(36) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE` (`uid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=476 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversation_replies`
--

LOCK TABLES `conversation_replies` WRITE;
/*!40000 ALTER TABLE `conversation_replies` DISABLE KEYS */;
INSERT INTO `conversation_replies` VALUES (456,'b03e04a1-eb4a-46bd-9e57-da77b445e265','test','37b70d3d-1c8e-4ccc-9b33-470f41993215','5e4728b3-530b-4842-ba49-4e67556cf888','2020-12-26 17:57:30');
INSERT INTO `conversation_replies` VALUES (457,'877762bc-08a5-4135-afc6-6a66346d864f','kentang','37b70d3d-1c8e-4ccc-9b33-470f41993215','5e4728b3-530b-4842-ba49-4e67556cf888','2020-12-26 20:52:07');
INSERT INTO `conversation_replies` VALUES (458,'9df07b5f-2c56-41ee-9c21-78ed1b4b55f3','busuk','37b70d3d-1c8e-4ccc-9b33-470f41993215','5e4728b3-530b-4842-ba49-4e67556cf888','2020-12-26 20:53:01');
INSERT INTO `conversation_replies` VALUES (459,'397e1bf7-334e-4aad-a811-943e233c2356','ujay','37b70d3d-1c8e-4ccc-9b33-470f41993215','5e4728b3-530b-4842-ba49-4e67556cf888','2020-12-26 20:58:27');
INSERT INTO `conversation_replies` VALUES (460,'bdf2f368-7697-4465-92a2-ae43d33b0077','kentut','37b70d3d-1c8e-4ccc-9b33-470f41993215','5e4728b3-530b-4842-ba49-4e67556cf888','2020-12-26 20:59:51');
INSERT INTO `conversation_replies` VALUES (461,'fd7617ae-c53b-48af-af2c-909e9c1dce99','jabar','37b70d3d-1c8e-4ccc-9b33-470f41993215','5e4728b3-530b-4842-ba49-4e67556cf888','2020-12-26 21:01:32');
INSERT INTO `conversation_replies` VALUES (462,'6da9f3f5-9f3b-4dab-a224-542147edd4e1','hai','37b70d3d-1c8e-4ccc-9b33-470f41993215','5e4728b3-530b-4842-ba49-4e67556cf888','2020-12-26 21:06:48');
INSERT INTO `conversation_replies` VALUES (463,'afc0add9-86f1-4754-a8db-37f36baf2dec','salam','37b70d3d-1c8e-4ccc-9b33-470f41993215','5e4728b3-530b-4842-ba49-4e67556cf888','2020-12-26 21:47:58');
INSERT INTO `conversation_replies` VALUES (464,'8fd32c66-1eed-4497-ab7c-b8b5c8b9b727','halo','19bd1da7-7473-4985-9e77-6f77f5053672','5e4728b3-530b-4842-ba49-4e67556cf888','2020-12-26 14:51:14');
INSERT INTO `conversation_replies` VALUES (465,'7f179405-9fb8-40f2-be83-c5074922da99','halo too','37b70d3d-1c8e-4ccc-9b33-470f41993215','5e4728b3-530b-4842-ba49-4e67556cf888','2020-12-26 21:51:26');
INSERT INTO `conversation_replies` VALUES (466,'3f992d3a-0618-44cd-ba85-6a4db1ea8093','apakah kamu sedang mendengarkan lagu mcr ? ','19bd1da7-7473-4985-9e77-6f77f5053672','5e4728b3-530b-4842-ba49-4e67556cf888','2020-12-26 14:52:56');
INSERT INTO `conversation_replies` VALUES (467,'a85c3c34-2523-4d09-9cac-4bd24c5fd102','masih basic','19bd1da7-7473-4985-9e77-6f77f5053672','5e4728b3-530b-4842-ba49-4e67556cf888','2020-12-26 14:55:40');
INSERT INTO `conversation_replies` VALUES (468,'8a565ab7-7b37-4a60-9970-b013fa5b5d15','apanya yang basic ?','37b70d3d-1c8e-4ccc-9b33-470f41993215','5e4728b3-530b-4842-ba49-4e67556cf888','2020-12-26 21:56:10');
INSERT INTO `conversation_replies` VALUES (469,'6f212f64-f70a-4441-8c68-18cf35f21778','bukan','19bd1da7-7473-4985-9e77-6f77f5053672','5e4728b3-530b-4842-ba49-4e67556cf888','2020-12-26 14:56:25');
INSERT INTO `conversation_replies` VALUES (470,'5564e326-de2b-4eb0-9a6a-70e1f2086ae6','bisa coding ngga ? ','37b70d3d-1c8e-4ccc-9b33-470f41993215','5e4728b3-530b-4842-ba49-4e67556cf888','2020-12-26 22:01:09');
INSERT INTO `conversation_replies` VALUES (471,'74776a1f-3a87-43e6-aa1c-a631ddf509de','bisa dong','19bd1da7-7473-4985-9e77-6f77f5053672','5e4728b3-530b-4842-ba49-4e67556cf888','2020-12-26 15:01:26');
INSERT INTO `conversation_replies` VALUES (472,'8671ea70-f212-45ba-806f-f00ca9fa7c96','jabar hadir','37b70d3d-1c8e-4ccc-9b33-470f41993215','5e4728b3-530b-4842-ba49-4e67556cf888','2020-12-26 22:03:59');
INSERT INTO `conversation_replies` VALUES (473,'0a038502-980a-4a7a-b586-82ae2bda9d7b','test','37b70d3d-1c8e-4ccc-9b33-470f41993215','5e4728b3-530b-4842-ba49-4e67556cf888','2020-12-26 22:04:41');
INSERT INTO `conversation_replies` VALUES (474,'a2869c3e-d000-4a94-96f2-48b2f7d4c4e2','salam sobat super','37b70d3d-1c8e-4ccc-9b33-470f41993215','5e4728b3-530b-4842-ba49-4e67556cf888','2020-12-26 22:27:55');
INSERT INTO `conversation_replies` VALUES (475,'bc9a4eda-4581-40f0-aaef-2aa557953d24','hai','37b70d3d-1c8e-4ccc-9b33-470f41993215','5e4728b3-530b-4842-ba49-4e67556cf888','2020-12-26 22:28:04');
/*!40000 ALTER TABLE `conversation_replies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversations`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `conversations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_authenticated_uid` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_guest_uid` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversations`
--

LOCK TABLES `conversations` WRITE;
/*!40000 ALTER TABLE `conversations` DISABLE KEYS */;
/*!40000 ALTER TABLE `conversations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `engineer_skills`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `engineer_skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `engineer_uid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `skill_uid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `engineer_skills_un` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `engineer_skills`
--

LOCK TABLES `engineer_skills` WRITE;
/*!40000 ALTER TABLE `engineer_skills` DISABLE KEYS */;
INSERT INTO `engineer_skills` VALUES (40,'5dad1f5d-36c5-4022-94b2-cd83a8a9da48','00dd2707-e7ca-4084-89e2-7881b751136d','c1d8aec7-15cd-4f4d-aa87-519bd2d35e0a');
INSERT INTO `engineer_skills` VALUES (41,'f83ddb2b-b77f-414f-9096-a7d980d20a85','00dd2707-e7ca-4084-89e2-7881b751136d','fafb63a6-3ac4-44ad-ba26-4753d14e716f');
INSERT INTO `engineer_skills` VALUES (42,'b88a4c5d-084a-4f2f-9524-1fba43fbe026','00dd2707-e7ca-4084-89e2-7881b751136d','cba88e0c-7f92-4baf-b8f7-5856a66173bc');
INSERT INTO `engineer_skills` VALUES (45,'0108c970-736d-45f8-9353-5109f960870f','00dd2707-e7ca-4084-89e2-7881b751136d','5fff4310-f29a-48a9-8b0e-1f8e05413d54');
INSERT INTO `engineer_skills` VALUES (46,'b7e5c51c-aa08-46f0-9d75-17cbdb7d23da','00dd2707-e7ca-4084-89e2-7881b751136d','beb239ff-3bd0-409f-8253-43b15523db50');
INSERT INTO `engineer_skills` VALUES (47,'34ffbbc6-3ef2-4186-ad9b-9bac7e6043c3','fc5bcb50-5ca4-4198-8d17-29dc196c172e','beb239ff-3bd0-409f-8253-43b15523db50');
INSERT INTO `engineer_skills` VALUES (48,'68492c77-3446-4cbd-9411-a245bde23bf7','fc5bcb50-5ca4-4198-8d17-29dc196c172e','75cd380b-a557-48af-a25b-db72c848e2d6');
INSERT INTO `engineer_skills` VALUES (49,'de871860-c2a4-4999-935b-1495485dbaad','fc5bcb50-5ca4-4198-8d17-29dc196c172e','0b186739-ea24-4ea3-bf82-5d0c976bce12');
INSERT INTO `engineer_skills` VALUES (50,'6aaa24f1-44ea-4184-a6ad-43547c2138cb','dc448d0d-a71e-4336-be62-67282420f31b','c1d8aec7-15cd-4f4d-aa87-519bd2d35e0a');
INSERT INTO `engineer_skills` VALUES (51,'04f9b8e0-efa0-48ca-a1d3-1bb6824163f2','dc448d0d-a71e-4336-be62-67282420f31b','cba88e0c-7f92-4baf-b8f7-5856a66173bc');
INSERT INTO `engineer_skills` VALUES (52,'1014c881-5ff5-426a-85e8-ff595ee6b086','dc448d0d-a71e-4336-be62-67282420f31b','1dc917b7-f53d-44e4-ba18-977340b86063');
INSERT INTO `engineer_skills` VALUES (53,'a82babf9-1287-4767-a1b5-63a2e0100a97','dc448d0d-a71e-4336-be62-67282420f31b','fafb63a6-3ac4-44ad-ba26-4753d14e716f');
INSERT INTO `engineer_skills` VALUES (54,'45280ac5-e594-41ae-99f8-66c9367f21fc','dc448d0d-a71e-4336-be62-67282420f31b','75cd380b-a557-48af-a25b-db72c848e2d6');
INSERT INTO `engineer_skills` VALUES (55,'f90d1579-3afa-4cbf-9691-8779a886cdf6','dc448d0d-a71e-4336-be62-67282420f31b','5fff4310-f29a-48a9-8b0e-1f8e05413d54');
INSERT INTO `engineer_skills` VALUES (56,'09837527-b505-4486-a44c-6e5822c9014d','dc448d0d-a71e-4336-be62-67282420f31b','d6200176-98be-45b4-a0cf-4c9970abd4ef');
INSERT INTO `engineer_skills` VALUES (57,'305241b1-e0e8-48d1-a57e-b7962633495c','dc448d0d-a71e-4336-be62-67282420f31b','beb239ff-3bd0-409f-8253-43b15523db50');
INSERT INTO `engineer_skills` VALUES (58,'845be735-5627-4866-afea-0fee879a1065','dc448d0d-a71e-4336-be62-67282420f31b','f8c443ba-07fb-4197-ad27-a42f6edccc0c');
INSERT INTO `engineer_skills` VALUES (59,'1fb83459-6c1c-49ff-b153-74bdac873266','dc448d0d-a71e-4336-be62-67282420f31b','0b186739-ea24-4ea3-bf82-5d0c976bce12');
INSERT INTO `engineer_skills` VALUES (60,'9d73a9f8-41ea-425c-b975-9d997ffcebf7','75aac6e8-6d17-4001-b093-13dbbcda1cb0','c1d8aec7-15cd-4f4d-aa87-519bd2d35e0a');
INSERT INTO `engineer_skills` VALUES (61,'b5e11c77-42e1-4ad7-967a-cde20e5adc27','7a47c9a4-1ced-4c66-b985-5b41294bf1bc','f8c443ba-07fb-4197-ad27-a42f6edccc0c');
INSERT INTO `engineer_skills` VALUES (62,'dc805bee-b940-4cf8-a317-ec7e7d216207','d87a665e-3d02-4e3b-936c-a99dc4d76fc7','75cd380b-a557-48af-a25b-db72c848e2d6');
INSERT INTO `engineer_skills` VALUES (63,'6857cf09-d582-444d-8ff2-32599ac9dd3b','d1c769ea-3c64-4ad9-922f-19fea39d56bf','f8c443ba-07fb-4197-ad27-a42f6edccc0c');
INSERT INTO `engineer_skills` VALUES (64,'2c5e3578-eef7-4d3d-abc9-8e8fd2394777','d1c769ea-3c64-4ad9-922f-19fea39d56bf','1dc917b7-f53d-44e4-ba18-977340b86063');
INSERT INTO `engineer_skills` VALUES (65,'4a91d07e-ca3f-4f6b-bd90-cfa6668538b6','d1c769ea-3c64-4ad9-922f-19fea39d56bf','d6200176-98be-45b4-a0cf-4c9970abd4ef');
INSERT INTO `engineer_skills` VALUES (66,'447fe1b6-7e05-45e8-8a43-f18e6150bbaf','d1c769ea-3c64-4ad9-922f-19fea39d56bf','0b186739-ea24-4ea3-bf82-5d0c976bce12');
INSERT INTO `engineer_skills` VALUES (67,'1c7fa4a3-cadb-4596-b62b-ffb326e588c3','d1c769ea-3c64-4ad9-922f-19fea39d56bf','fafb63a6-3ac4-44ad-ba26-4753d14e716f');
INSERT INTO `engineer_skills` VALUES (68,'251ca922-995e-4016-8314-b703ece1be26','d1c769ea-3c64-4ad9-922f-19fea39d56bf','c1d8aec7-15cd-4f4d-aa87-519bd2d35e0a');
INSERT INTO `engineer_skills` VALUES (69,'24c9f12b-6219-4d7d-b93e-e457b7dfbf75','d87a665e-3d02-4e3b-936c-a99dc4d76fc7','c1d8aec7-15cd-4f4d-aa87-519bd2d35e0a');
INSERT INTO `engineer_skills` VALUES (70,'01ca7d77-6665-43cd-8d57-2edbc06bb1ac','d87a665e-3d02-4e3b-936c-a99dc4d76fc7','cba88e0c-7f92-4baf-b8f7-5856a66173bc');
INSERT INTO `engineer_skills` VALUES (71,'b1f8da76-7497-4ff8-a3b7-c0c7981ea0ac','d87a665e-3d02-4e3b-936c-a99dc4d76fc7','f8c443ba-07fb-4197-ad27-a42f6edccc0c');
INSERT INTO `engineer_skills` VALUES (72,'be69e76c-69dc-400f-8731-d30d0435ec33','d87a665e-3d02-4e3b-936c-a99dc4d76fc7','d6200176-98be-45b4-a0cf-4c9970abd4ef');
INSERT INTO `engineer_skills` VALUES (73,'0f8361a6-c425-4d45-aaef-4d36d6d752c1','d87a665e-3d02-4e3b-936c-a99dc4d76fc7','fafb63a6-3ac4-44ad-ba26-4753d14e716f');
/*!40000 ALTER TABLE `engineer_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `engineers`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `engineers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'null',
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `showcase` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `telephone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `salary` varchar(255) DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `user_uid` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `engineers_un` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=232 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `engineers`
--

LOCK TABLES `engineers` WRITE;
/*!40000 ALTER TABLE `engineers` DISABLE KEYS */;
INSERT INTO `engineers` VALUES (225,'fc5bcb50-5ca4-4198-8d17-29dc196c172e','connie.jpg','Yokohama, Prefektur Kanagawa, Jepang','https://dev.co.id','(896) 7055-8381','Rp 9.000.000','Lorem Ipsum adalah contoh teks atau dummy dalam industri percetakan dan penataan huruf atau typesetting. Lorem Ipsum telah menjadi standar contoh teks sejak tahun 1500an, saat seorang tukang cetak yang tidak dikenal mengambil sebuah kumpulan teks dan mengacaknya untuk menjadi sebuah buku contoh huruf. Ia tidak hanya bertahan selama 5 abad, tapi juga telah beralih ke penataan huruf elektronik, tanpa ada perubahan apapun. Ia mulai dipopulerkan pada tahun 1960 dengan diluncurkannya lembaran-lembaran Letraset yang menggunakan kalimat-kalimat dari Lorem Ipsum, dan seiring munculnya perangkat lunak Desktop Publishing seperti Aldus PageMaker juga memiliki versi Lorem Ipsum.','a62bd086-7ec6-41d0-85ca-151bc49609e6','1990-12-20','2020-12-25 22:36:28','2020-12-25 22:36:28');
INSERT INTO `engineers` VALUES (226,'d87a665e-3d02-4e3b-936c-a99dc4d76fc7','beck.jpg','Magelang, Kota Magelang, Jawa Tengah, Indonesia','https://dev.co.id','(896) 7055-8381','Rp 12.000.000','Hallo I\'m beck','245d1c14-06ff-416f-b9fb-3256ab6dad9e','1985-12-27','2020-12-25 22:43:54','2020-12-25 22:43:54');
INSERT INTO `engineers` VALUES (227,'7a47c9a4-1ced-4c66-b985-5b41294bf1bc','udin.jpg','Malang, Kota Malang, Jawa Timur, Indonesia','https://dev.co.id','(896) 7055-8381','Rp 9.000.000','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis bibendum sem, et consequat massa. In hac habitasse platea dictumst. Morbi a consectetur tortor. Phasellus vitae est gravida, pretium neque eu, scelerisque mi. Maecenas sed nisl convallis ex mattis ornare. Nam dapibus diam ut malesuada accumsan. Ut sed imperdiet ligula. Aliquam eu enim lobortis, vehicula nibh a, dignissim orci. Donec consequat ipsum ligula, at fringilla purus accumsan eget. Proin vestibulum ornare mattis.','07b18e2a-cf48-42a0-9fbb-912eaf708deb','1995-12-27','2020-12-26 12:35:57','2020-12-26 12:35:57');
INSERT INTO `engineers` VALUES (228,'75aac6e8-6d17-4001-b093-13dbbcda1cb0','tina.jpg','America City, KS 66540, Amerika Serikat','https://dev.co.id','(896) 7055-8381','Rp 11.000.000','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis bibendum sem, et consequat massa. In hac habitasse platea dictumst. Morbi a consectetur tortor. Phasellus vitae est gravida, pretium neque eu, scelerisque mi. Maecenas sed nisl convallis ex mattis ornare. Nam dapibus diam ut malesuada accumsan. Ut sed imperdiet ligula. Aliquam eu enim lobortis, vehicula nibh a, dignissim orci. Donec consequat ipsum ligula, at fringilla purus accumsan eget. Proin vestibulum ornare mattis.','de950c86-9022-4809-8ed5-ace59a988e72','1990-12-27','2020-12-26 12:49:48','2020-12-26 12:49:48');
INSERT INTO `engineers` VALUES (229,'dc448d0d-a71e-4336-be62-67282420f31b','jack.jpg','Bengkunat, Suka Marga, Bengkunat Belimbing, Kabupaten Lampung Barat, Lampung, Indonesia','https://dev.co.id','(896) 7055-8381','Rp 10.350.000','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis bibendum sem, et consequat massa. In hac habitasse platea dictumst. Morbi a consectetur tortor. Phasellus vitae est gravida, pretium neque eu, scelerisque mi. Maecenas sed nisl convallis ex mattis ornare. Nam dapibus diam ut malesuada accumsan. Ut sed imperdiet ligula. Aliquam eu enim lobortis, vehicula nibh a, dignissim orci. Donec consequat ipsum ligula, at fringilla purus accumsan eget. Proin vestibulum ornare mattis.','19bd1da7-7473-4985-9e77-6f77f5053672','1982-12-09','2020-12-26 12:51:41','2020-12-26 12:51:41');
INSERT INTO `engineers` VALUES (231,'d1c769ea-3c64-4ad9-922f-19fea39d56bf','avatar.png','Jl. Ir Sukarno No.144, Beji, Kec. Junrejo, Kota Batu, Jawa Timur 65236, Indonesia','https://dev.co.id','(896) 7055-8381','Rp 20.000.000','Hello my name is Darco','da971542-aa52-4cf9-a6c7-95a910b9dad0','1997-12-31','2020-12-28 00:07:42','2020-12-28 00:07:42');
/*!40000 ALTER TABLE `engineers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_types`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` char(36) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `post_job_types_un` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_types`
--

LOCK TABLES `job_types` WRITE;
/*!40000 ALTER TABLE `job_types` DISABLE KEYS */;
INSERT INTO `job_types` VALUES (1,'cad42f5e-022b-4d69-9655-44d565a0e511','Full-time');
INSERT INTO `job_types` VALUES (2,'2054f405-2b91-4bc9-a5f0-91c34053f1c0','Contract');
INSERT INTO `job_types` VALUES (3,'916803ce-247c-4381-89a3-d4c5543c78dc','Internship');
INSERT INTO `job_types` VALUES (4,'60846743-34fc-487c-a5ac-1b8d81b56d12','Freelance');
INSERT INTO `job_types` VALUES (5,'d3aa8328-1b7d-423d-ad5d-3715cd1204f6','Part-time');
/*!40000 ALTER TABLE `job_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message_notifications`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message_notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `read` tinyint(4) DEFAULT '0',
  `content` varchar(255) NOT NULL,
  `conversation_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `message_notifications_un` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message_notifications`
--

LOCK TABLES `message_notifications` WRITE;
/*!40000 ALTER TABLE `message_notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `message_notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_job_skills`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_job_skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` char(36) DEFAULT NULL,
  `post_job_uid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `skill_uid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `company_skills_un` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_job_skills`
--

LOCK TABLES `post_job_skills` WRITE;
/*!40000 ALTER TABLE `post_job_skills` DISABLE KEYS */;
INSERT INTO `post_job_skills` VALUES (70,'dfa432f5-a2b6-464a-b6bc-39afc17f0127','133d7e46-af2c-403d-8d8e-4a6891ed123d','c1d8aec7-15cd-4f4d-aa87-519bd2d35e0a','2021-01-23 20:22:33','2021-01-23 20:22:33');
INSERT INTO `post_job_skills` VALUES (71,'d75867f0-b3e5-4e86-9b81-fa81a5306948','133d7e46-af2c-403d-8d8e-4a6891ed123d','1dc917b7-f53d-44e4-ba18-977340b86063','2021-01-23 20:22:33','2021-01-23 20:22:33');
INSERT INTO `post_job_skills` VALUES (72,'52e322a5-6314-48ea-8652-59313be2086b','133d7e46-af2c-403d-8d8e-4a6891ed123d','d6200176-98be-45b4-a0cf-4c9970abd4ef','2021-01-23 20:22:33','2021-01-23 20:22:33');
INSERT INTO `post_job_skills` VALUES (73,'06da0fbc-fc1b-4d58-bbcb-00ad90b504a7','946583b2-4754-44de-ae6b-907ce7d02c9d','75cd380b-a557-48af-a25b-db72c848e2d6','2021-01-23 20:23:08','2021-01-23 20:23:08');
INSERT INTO `post_job_skills` VALUES (78,'a0142b08-9aed-4e2d-a448-03bab128db51','946583b2-4754-44de-ae6b-907ce7d02c9d','c1d8aec7-15cd-4f4d-aa87-519bd2d35e0a','2021-01-30 10:31:38','2021-01-30 10:31:38');
INSERT INTO `post_job_skills` VALUES (79,'c55ab721-c815-449b-adbd-eb96044d6f1f','946583b2-4754-44de-ae6b-907ce7d02c9d','cd54f94a-2da8-4143-b4a5-6ecfe3043c2a','2021-01-30 10:32:47','2021-01-30 10:32:47');
INSERT INTO `post_job_skills` VALUES (84,'4d104073-0e11-484e-8db5-7e7278b84ace','60bea80d-d3d4-480d-b649-64b3e7b9750a','0b186739-ea24-4ea3-bf82-5d0c976bce12','2021-01-30 19:22:33','2021-01-30 19:22:33');
INSERT INTO `post_job_skills` VALUES (85,'787b713e-322d-46ae-bb58-b2c2ea7371c7','60bea80d-d3d4-480d-b649-64b3e7b9750a','f8c443ba-07fb-4197-ad27-a42f6edccc0c','2021-02-02 05:40:20','2021-02-02 05:40:20');
/*!40000 ALTER TABLE `post_job_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_job_types`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_job_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` char(36) DEFAULT NULL,
  `post_job_uid` char(36) DEFAULT NULL,
  `job_type_uid` char(36) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `POST JOB UID` (`post_job_uid`),
  UNIQUE KEY `UID` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_job_types`
--

LOCK TABLES `post_job_types` WRITE;
/*!40000 ALTER TABLE `post_job_types` DISABLE KEYS */;
INSERT INTO `post_job_types` VALUES (32,'483c68f9-93f5-457b-adf4-4e8fa5bd65ea','60bea80d-d3d4-480d-b649-64b3e7b9750a','cad42f5e-022b-4d69-9655-44d565a0e511','2021-01-30 19:17:26','2021-01-30 19:17:26');
INSERT INTO `post_job_types` VALUES (33,'70fd262d-81e5-4921-8624-b41e7b391722','946583b2-4754-44de-ae6b-907ce7d02c9d','916803ce-247c-4381-89a3-d4c5543c78dc','2021-01-30 19:17:53','2021-01-30 19:17:53');
/*!40000 ALTER TABLE `post_job_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_jobs`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_jobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` char(36) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `salary` varchar(255) DEFAULT NULL,
  `company_uid` char(36) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `post_jobs_un` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_jobs`
--

LOCK TABLES `post_jobs` WRITE;
/*!40000 ALTER TABLE `post_jobs` DISABLE KEYS */;
INSERT INTO `post_jobs` VALUES (73,'946583b2-4754-44de-ae6b-907ce7d02c9d','Front End Developer','<p>A&nbsp;<strong>front</strong>-<strong>end</strong>&nbsp;web&nbsp;<strong>developer</strong> is responsible for implementing visual elements that users see and interact with within a web application. They are usually supported by back-<strong>end</strong>&nbsp;web developers, who are responsible for server-side application logic and integration of the work&nbsp;<strong>front</strong>-<strong>end</strong>&nbsp;developers do.</p>','IDR 4.000.000','1eef0a3c-0b0e-4e9f-9057-ed32362ce791','5Bf4v','2021-01-23 20:23:09','2021-01-23 20:23:09');
INSERT INTO `post_jobs` VALUES (74,'60bea80d-d3d4-480d-b649-64b3e7b9750a','Back End Developer','<p>Back-end developers work hand-in-hand with front-end developers by providing the outward-facing web application elements server-side logic. In other words, back-end developers create the logic to make the web app function properly, and they accomplish this through the use of server-side scripting languages like Ruby or.</p>','IDR 4.000.000','1eef0a3c-0b0e-4e9f-9057-ed32362ce791','35Fsd','2021-01-30 16:36:37','2021-01-30 16:36:37');
/*!40000 ALTER TABLE `post_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(255) NOT NULL,
  `color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `skills_un` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (1,'c1d8aec7-15cd-4f4d-aa87-519bd2d35e0a','React JS','react');
INSERT INTO `skills` VALUES (2,'fafb63a6-3ac4-44ad-ba26-4753d14e716f','React Native','react-native');
INSERT INTO `skills` VALUES (3,'d6200176-98be-45b4-a0cf-4c9970abd4ef','CSS','css');
INSERT INTO `skills` VALUES (4,'cba88e0c-7f92-4baf-b8f7-5856a66173bc','Javascript','js');
INSERT INTO `skills` VALUES (5,'1dc917b7-f53d-44e4-ba18-977340b86063','HTML','html');
INSERT INTO `skills` VALUES (6,'f8c443ba-07fb-4197-ad27-a42f6edccc0c','Python','py');
INSERT INTO `skills` VALUES (7,'75cd380b-a557-48af-a25b-db72c848e2d6','Ruby','ruby');
INSERT INTO `skills` VALUES (8,'beb239ff-3bd0-409f-8253-43b15523db50','JQuery','jquery');
INSERT INTO `skills` VALUES (9,'0b186739-ea24-4ea3-bf82-5d0c976bce12','GoLang','go');
INSERT INTO `skills` VALUES (10,'5fff4310-f29a-48a9-8b0e-1f8e05413d54','Flutter','flutter');
INSERT INTO `skills` VALUES (11,'cd54f94a-2da8-4143-b4a5-6ecfe3043c2a','PostgreSQL','postgre');
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_roles_un` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,'79a80bd7-65c8-460b-bd84-20b5a45a550f','engineer');
INSERT INTO `user_roles` VALUES (2,'a75b0343-162a-46a6-a694-a0c10062ba63','company');
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `fullname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role` tinyint(4) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_un` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=160 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (142,'a62bd086-7ec6-41d0-85ca-151bc49609e6','connie','connie','connie@gmail.com','$2a$10$Od01ExSdHC2zTXb9Kg8TY..qPfrywdsCq08aoSp/BGjbkgaGFnHri','connie',1,'2020-12-25 22:36:28','2020-12-25 22:36:28');
INSERT INTO `users` VALUES (143,'245d1c14-06ff-416f-b9fb-3256ab6dad9e','beck','beck','beck@gmail.com','$2a$10$fHUYNhZwc/JuVzy8RDPCgeXI9SZl4vberOdVJtUJ7yXQKaSs6Nqci','beck',1,'2020-12-25 22:43:54','2020-12-25 22:43:54');
INSERT INTO `users` VALUES (144,'07b18e2a-cf48-42a0-9fbb-912eaf708deb','udin','udin','udin@gmail.com','$2a$10$vV1ZfeHj28yXrvw4bWr7kOSSJ8XII.4UFKkzzy1dAXD8eFPvGBzPi','udin',1,'2020-12-26 12:35:57','2020-12-26 12:35:57');
INSERT INTO `users` VALUES (145,'de950c86-9022-4809-8ed5-ace59a988e72','tina','tina','tina@gmail.com','$2a$10$xLxNP4ZvxT6UU49Cl28X/ezPzeoLi4wKUze6tOnloHp6wNgfwtd1.','tina',1,'2020-12-26 12:49:48','2020-12-26 12:49:48');
INSERT INTO `users` VALUES (146,'19bd1da7-7473-4985-9e77-6f77f5053672','jack','jack','jack@gmail.com','$2a$10$OcQBbLm42LxHVxWFNnrf/OCojqojhMYYnNsGL07cf8stspN7sTYqe','jack',1,'2020-12-26 12:51:42','2020-12-26 12:51:42');
INSERT INTO `users` VALUES (147,'31e7f4cb-4d8e-4d4e-a7d4-52ff9cbddfb8','rendy yadi','rendy','rendy@gmail.com','$2a$10$ErTOnis0i7cNk6hXMQk9meDWzEHHyHqtNy492qa1igH84M5ruRAjG','rendy-yadi',1,'2020-12-28 00:02:02','2020-12-28 00:02:02');
INSERT INTO `users` VALUES (148,'da971542-aa52-4cf9-a6c7-95a910b9dad0','darco','darco','darco@gmail.com','$2a$10$FbHhOv0alu8Dw.mcO0PRvel4f3/Cz.BbGUSrc3lNLyEnKd.cRjF4a','darco',1,'2020-12-28 00:07:42','2020-12-28 00:07:42');
INSERT INTO `users` VALUES (159,'fed05651-38a3-45dd-ab41-c4da7e5ad334','Nam Do San','Do San','namdosan@gmail.com','$2a$10$OIhOVs9BeWarF7ZVdrHUf.x6GuLqidL8W.CKrdI5mRYEgmjgbUdfW','nam-do-san',2,'2021-01-10 14:07:04','2021-01-10 14:07:04');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'hiring_channel_app'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-03 18:16:07
