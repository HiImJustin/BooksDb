-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bookdb
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author` (
  `authorID` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `surname` varchar(30) NOT NULL,
  `nationality` varchar(30) NOT NULL,
  `birthYear` int unsigned NOT NULL,
  `deathYear` int unsigned DEFAULT NULL,
  PRIMARY KEY (`authorID`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author`
--

LOCK TABLES `author` WRITE;
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
INSERT INTO `author` VALUES (1,'Miguell','de Cervantes Saavedra','Spanish',1547,1616),(2,'Charles','Dickens','British',1812,1870),(3,'J.R.R.','Tolkien','British',1892,1973),(4,'Antoine','de Saint-Exupery','French',1900,1944),(5,'J.K.','Rowling','British',1965,NULL),(6,'Agatha','Christie','British',1890,1976),(7,'Cao','Xueqin','Chinese',1715,1763),(8,'Henry',' Rider Haggard','British',1856,1925),(9,'C.S.','Lewis','British',1898,1963),(10,'Justin','Coates','Australian',1997,3001),(12,'Validation','Author','Australian',1997,4000),(13,'NonFail','NonFail','NonFail',2021,2021),(14,'Working','Working','Working',2021,2021),(15,'Isitworking','IDKisit','Henlo',2021,2021),(16,'Please','Working','Forme',2021,2021),(17,'Createauthor','Fulltesting','Australian',2021,2021),(18,'UpdateTesting','Coates','Australian',2021,2021);
/*!40000 ALTER TABLE `author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `bookID` int unsigned NOT NULL AUTO_INCREMENT,
  `bookTitle` varchar(255) NOT NULL,
  `originalTitle` varchar(255) DEFAULT NULL,
  `yearofPublication` int NOT NULL DEFAULT '0',
  `genre` varchar(30) NOT NULL,
  `millionsSold` int unsigned NOT NULL,
  `languageWritten` varchar(30) NOT NULL,
  `coverImagePath` varchar(255) NOT NULL,
  `authorID` int unsigned NOT NULL,
  PRIMARY KEY (`bookID`),
  KEY `fk_author` (`authorID`),
  CONSTRAINT `fk_author` FOREIGN KEY (`authorID`) REFERENCES `author` (`authorID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,'Don Quixote','El Ingenioso Hidalgo Don Quixote de la Mancha',1605,'Novela',500,'Spanishaa2','don_quixote',1),(2,'A Tale of Two Cities','A Tale of Two Cities',1859,'Historical Fiction',2002,'English','a-tale-of-two-cities',2),(3,'The Lord of the Rings','The Lord of the Rings',1954,'Fantasy/Adventure',150,'English','the-lord-of-the-rings',3),(5,'Harry Potter and the Sorcerer\'s Stone','Harry Potter and the Sorcerer\'s Stone',1997,'Fantasy Fiction',1077,'English','harry-potter',5),(6,'And Then There Were None','Ten Little Niggers',1939,'Mystery',100,'English','and-then-there-were-none',6),(7,'The Dream of the Red Chamber','The Story of the Stone',1792,'Novel',100,'Chinese','the-dream-of-the-red-chamber',7),(8,'The Hobbit ','There and Back Again',1937,'High Fantasy',100,'English','the-hobbit',3),(9,'She: A History of Adventure','She',1886,'Fiction',100,'English','she-a-history-of-adventure',8),(10,'The Lion, the Witch and the Wardrobe','The Lion, the Witch and the Wardrobe',1950,'Fantasy',856,'English ','the-lion-the-witch-and-the-wardrobe',9);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `changelog`
--

DROP TABLE IF EXISTS `changelog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `changelog` (
  `changeLogID` int unsigned NOT NULL AUTO_INCREMENT,
  `dateCreated` datetime DEFAULT NULL,
  `dateChanged` datetime DEFAULT NULL,
  `bookID` int unsigned NOT NULL,
  `userID` int unsigned NOT NULL,
  PRIMARY KEY (`changeLogID`),
  KEY `fk_bookID_C` (`bookID`),
  KEY `fk_userID_C` (`userID`),
  CONSTRAINT `fk_bookID_C` FOREIGN KEY (`bookID`) REFERENCES `book` (`bookID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_userID_C` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `changelog`
--

LOCK TABLES `changelog` WRITE;
/*!40000 ALTER TABLE `changelog` DISABLE KEYS */;
INSERT INTO `changelog` VALUES (6,'2021-11-13 00:00:00','2021-11-13 00:00:00',2,1),(7,'2021-11-13 00:00:00',NULL,3,1),(8,'2021-11-13 00:00:00',NULL,5,1),(9,'2021-11-13 00:00:00','2021-11-13 00:00:00',6,1),(11,'2021-11-13 00:00:00',NULL,9,1),(12,'2021-11-13 00:00:00',NULL,8,1),(13,'2021-11-13 00:00:00',NULL,7,1),(22,'2021-11-13 00:00:00',NULL,10,1),(24,'2021-11-13 00:00:00','2021-11-13 00:00:00',1,1);
/*!40000 ALTER TABLE `changelog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userID` int unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(200) NOT NULL,
  `lastName` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(255) NOT NULL,
  `accessRights` varchar(200) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Justin','Coatess','jcoates1997@hotmail.com','castiel','$2b$06$qgR4OVZJui.tgFSPILEtueOZgKm0jQWRshiUK5tzypgCTSb4fJERG','Admin'),(2,'Test','Test','yes@hotmail.com','castiel','$2b$06$crtAhNr8pDyd7H0wk5ZWnuq993ua5lHk5kmke7uaB5FOqtmLFTIJa','Admin'),(3,'Justin','Coates','jcoates1997@hotmail.com','Juss','$2b$06$5x88faNdsBxEPAQMjlU9OuQ2On1o3/s8vjoOWQNCp8xVD12CTmx92','Admin'),(5,'Justin','Coates','jcoates1997@hotmail.com','castiel','$2b$06$lepvp6OwWS2qkZE8PpQVBuLftyUPE.UUYsIzp0Xn1I59pkRooPYY6','Admin'),(6,'Justin','Coates','jcoates1997@hotmail.com','castiel','$2b$06$wxRzDdIRIt3EHA9aM4triemWMOcGtwj/AC3LnLlBmWADptAH0lLHS','Admin'),(7,'Testing','Coates','jcoates1997@hotmail.com','castiel','$2b$06$qNfglgZXUE4cINlREqLmVuJD3I3ehDYIjbKqYxg3xWXkZQaPP17La','Admin');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-16 11:04:19
