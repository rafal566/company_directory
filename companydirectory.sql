-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 26, 2020 at 11:15 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.2.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `companydirectory`
--

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `locationID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `name`, `locationID`) VALUES
(1, 'Human Resources', 1),
(2, 'Sales', 2),
(3, 'Marketing', 2),
(4, 'Legal', 1),
(5, 'Services', 1),
(6, 'Research and Development', 3),
(7, 'Product Management', 3),
(8, 'Training', 4),
(9, 'Support', 4),
(10, 'Engineering', 5),
(11, 'Accounting', 5),
(12, 'Business Development', 3);

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`id`, `name`) VALUES
(1, 'London'),
(2, 'New York'),
(3, 'Paris'),
(4, 'Munich'),
(5, 'Rome');

-- --------------------------------------------------------

--
-- Table structure for table `personnel`
--

CREATE TABLE `personnel` (
  `id` int(11) NOT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `jobTitle` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `departmentID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `personnel`
--

INSERT INTO `personnel` (`id`, `firstName`, `lastName`, `jobTitle`, `email`, `departmentID`) VALUES
(1, 'Rosana', 'Heffron', 'HR Manager', 'rheffron0@ibm.com', 1),
(2, 'Kris', 'Kovnot', 'Sales Manager', 'kkovnot1@google.nl', 2),
(3, 'Vera', 'Kisbee', 'Sales Specialist', 'vkisbee2@nih.gov', 2),
(4, 'Aveline', 'Edgson', 'Project Manager', 'aedgson3@wikispaces.com', 3),
(5, 'Bertie', 'Wittke', 'Legal Advisor', 'bwittke4@yahoo.com', 4),
(6, 'Demetre', 'Cossam', 'IT Manager', 'dcossam5@washington.edu', 5),
(7, 'Annabela', 'McGavigan', 'Comissioner', 'amcgavigan6@wp.com', 4),
(8, 'Crichton', 'McAndrew', 'HR Advisor', 'cmcandrew7@zdnet.com', 1),
(9, 'Cordula', 'Plain', 'IT Manager', 'cplain8@google.ca', 5),
(10, 'Glen', 'McDougle', 'R&D Manager', 'gmcdougle9@meetup.com', 6),
(11, 'Theo', 'Audas', 'Director Of PM', 'taudasa@newsvine.com', 7),
(12, 'Spense', 'Jolliss', 'Training Assistant', 'sjollissb@wufoo.com', 8),
(13, 'Leopold', 'Carl', 'Customer Service Support', 'lcarlc@paginegialle.it', 9),
(14, 'Barr', 'MacAllan', 'IT Technican', 'bmacalland@github.com', 5),
(15, 'Suzie', 'Cromer', 'HR Advisor', 'scromere@imageshack.us', 1),
(16, 'Tracee', 'Gisbourn', 'Engineering Project Manager', 'tgisbournf@bloglines.com', 10),
(17, 'Taylor', 'St. Quintin', 'Project Manager', 'tstquinting@chronoengine.com', 10),
(18, 'Lin', 'Klassmann', 'Engineering Team Leader', 'lklassmannh@indiatimes.com', 10),
(19, 'Lay', 'Fintoph', 'Finance Assistant', 'lfintophi@goo.gl', 11),
(20, 'Moishe', 'Flinn', 'Business Development Manager', 'mflinnj@list-manage.com', 12),
(21, 'Gay', 'Bickford', 'R&D Officer', 'gbickfordk@scientificamerican.com', 6),
(22, 'Erik', 'Lindback', 'Training Assistant', 'elindbackl@virginia.edu', 8),
(23, 'Tamarra', 'Ace', 'Customer Service Director', 'tacem@vinaora.com', 9),
(24, 'Barbara-anne', 'Rooksby', 'Product Manager', 'brooksbyn@issuu.com', 7),
(25, 'Lucien', 'Allsup', 'Customer Service Manager', 'lallsupo@goo.ne.jp', 9),
(26, 'Jackelyn', 'Imlach', 'Project Engineer', 'jimlachp@google.it', 10),
(27, 'Virge', 'Bootes', 'Sales Manager', 'vbootesq@oracle.com', 2),
(28, 'Rafferty', 'Matasov', 'Legal Advisor', 'rmatasovr@4shared.com', 4),
(29, 'Vanya', 'Goulder', 'Customer Service Support', 'vgoulders@phoca.cz', 9),
(30, 'Bonita', 'McGonagle', 'HR Advisor', 'bmcgonaglet@microsoft.com', 1),
(31, 'Allx', 'Whaley', 'HR Manager', 'awhaleyu@bbb.org', 1),
(32, 'Mavis', 'Lernihan', 'IT Director', 'mlernihanv@netscape.com', 5),
(33, 'Vern', 'Durling', 'HR Advisor', 'vdurlingw@goo.gl', 1),
(34, 'Myles', 'Minchi', 'Chief Product Officer', 'mminchix@smugmug.com', 7),
(35, 'Anitra', 'Coleridge', 'R&D Officer', 'acoleridgey@nbcnews.com', 6),
(36, 'Ailis', 'Brewster', 'Head Of PM', 'abrewsterz@businesswire.com', 7),
(37, 'Rahal', 'Tute', 'R&D Officer', 'rtute10@pinterest.com', 6),
(38, 'Warner', 'Blonden', 'Business Development Manager', 'wblonden11@spiegel.de', 12),
(39, 'Melvyn', 'Canner', 'Legal Advisor', 'mcanner12@eepurl.com', 4),
(40, 'Ryann', 'Giampietro', 'Comissioner', 'rgiampietro13@theguardian.com', 4),
(41, 'Harwell', 'Jefferys', 'Engineering Project Manager', 'hjefferys14@jimdo.com', 10),
(42, 'Lanette', 'Buss', 'Legal Advisor', 'lbuss15@51.la', 4),
(43, 'Lissie', 'Reddington', 'Customer Service Manager', 'lreddington16@w3.org', 9),
(44, 'Dore', 'Braidford', 'Senior Accountant', 'dbraidford17@google.com.br', 11),
(45, 'Lizabeth', 'Di Franceshci', 'Training Assistant', 'ldifranceshci18@mediafire.com', 8),
(46, 'Felic', 'Sharland', 'Business Development Executive', 'fsharland19@myspace.com', 12),
(47, 'Duff', 'Quail', 'Customer Service Support', 'dquail1a@vimeo.com', 9),
(48, 'Brendis', 'Shivell', 'HR Manager', 'bshivell1b@un.org', 1),
(49, 'Nevile', 'Schimaschke', 'Project Manager', 'nschimaschke1c@hexun.com', 10),
(50, 'Jon', 'Calbaithe', 'Legal Advisor', 'jcalbaithe1d@netvibes.com', 4),
(51, 'Emmery', 'Darben', 'Project Engineer', 'edarben1e@mapquest.com', 10),
(52, 'Staford', 'Whitesel', 'R&D Director', 'swhitesel1f@nasa.gov', 6),
(53, 'Benjamin', 'Hawkslee', 'Junior Product Manager', 'bhawkslee1g@hubpages.com', 7),
(54, 'Myrle', 'Speer', 'Project Manager', 'mspeer1h@tripod.com', 3),
(55, 'Matthus', 'Banfield', 'Marketing Director', 'mbanfield1i@angelfire.com', 3),
(56, 'Annadiana', 'Drance', 'Project Manager', 'adrance1j@omniture.com', 3),
(57, 'Rinaldo', 'Fandrey', 'Sales Director', 'rfandrey1k@bbc.co.uk', 2),
(58, 'Roanna', 'Standering', 'Project Manager', 'rstandering1l@cocolog-nifty.com', 3),
(59, 'Lorrie', 'Fattorini', 'Customer Service Support', 'lfattorini1m@geocities.jp', 9),
(60, 'Talbot', 'Andrassy', 'Legal Advisor', 'tandrassy1n@bigcartel.com', 4),
(61, 'Cindi', 'O\'Mannion', 'Accounting Manager', 'comannion1o@ameblo.jp', 11),
(62, 'Pancho', 'Mullineux', 'HR Advisor', 'pmullineux1p@webmd.com', 1),
(63, 'Cynthy', 'Peyntue', 'R&D Manager', 'cpeyntue1q@amazon.co.jp', 6),
(64, 'Kristine', 'Christal', 'Training Manager', 'kchristal1r@behance.net', 8),
(65, 'Dniren', 'Reboulet', 'Product Manager', 'dreboulet1s@360.cn', 7),
(66, 'Aggy', 'Napier', 'Marketing Manager', 'anapier1t@sciencedirect.com', 3),
(67, 'Gayleen', 'Hessay', 'Legal Advisor', 'ghessay1u@exblog.jp', 4),
(68, 'Cull', 'Snoden', 'HR Manager', 'csnoden1v@so-net.ne.jp', 1),
(69, 'Vlad', 'Crocombe', 'Junior Product Manager', 'vcrocombe1w@mtv.com', 7),
(70, 'Georgeanna', 'Joisce', 'R&D Manager', 'gjoisce1x@google.com.au', 6),
(71, 'Ursola', 'Berthomieu', 'Legal Director', 'uberthomieu1y@un.org', 4),
(72, 'Mair', 'McKirdy', 'HR Advisor', 'mmckirdy1z@ovh.net', 1),
(73, 'Erma', 'Runnalls', 'Training Manager', 'erunnalls20@spiegel.de', 8),
(74, 'Heida', 'Gallone', 'Project Engineer', 'hgallone21@hostgator.com', 10),
(75, 'Christina', 'Denge', 'Business Development Director', 'cdenge22@canalblog.com', 12),
(76, 'Wilone', 'Fredi', 'Junior Product Manager', 'wfredi23@gizmodo.com', 7),
(77, 'Stormie', 'Bolderstone', 'Accounting Director', 'sbolderstone24@globo.com', 11),
(78, 'Darryl', 'Pool', 'Finance Assistant', 'dpool25@vistaprint.com', 11),
(79, 'Nikolas', 'Mager', 'System Analyst', 'nmager26@nifty.com', 5),
(80, 'Brittney', 'Gaskal', 'Engineering Manager', 'bgaskal27@weather.com', 10),
(81, 'Field', 'Gresty', 'Comissioner', 'fgresty28@networkadvertising.org', 4),
(82, 'Martina', 'Tremoulet', 'Marketing Manager', 'mtremoulet29@sciencedaily.com', 3),
(83, 'Robena', 'Ivanyutin', 'Sales Specialist', 'rivanyutin2a@mozilla.org', 2),
(84, 'Reagen', 'Corner', 'Engineering Team Leader', 'rcorner2b@qq.com', 10),
(85, 'Eveleen', 'Sulter', 'R&D Officer', 'esulter2c@nature.com', 6),
(86, 'Christy', 'Dunbobbin', 'Training Assistant', 'cdunbobbin2d@feedburner.com', 8),
(87, 'Winthrop', 'Lansley', 'Training Director', 'wlansley2e@alibaba.com', 8),
(88, 'Lissa', 'Insley', 'Project Manager', 'linsley2f@friendfeed.com', 3),
(89, 'Shell', 'Risebarer', 'Engineering Project Manager', 'srisebarer2g@patch.com', 10),
(90, 'Cherianne', 'Liddyard', 'Sales Specialist', 'cliddyard2h@com.com', 2),
(91, 'Brendan', 'Fooks', 'Sales Specialist', 'bfooks2i@utexas.edu', 2),
(92, 'Edmund', 'Tace', 'Customer Service Manager', 'etace2j@hatena.ne.jp', 9),
(93, 'Ki', 'Tomasini', 'Project Engineer', 'ktomasini2k@cnbc.com', 10),
(94, 'Chadd', 'McGettrick', 'Project Engineer', 'cmcgettrick2l@simplemachines.org', 10),
(95, 'Dulcie', 'Baudi', 'Project Manager', 'dbaudi2m@last.fm', 3),
(96, 'Barnebas', 'Mowbray', 'HR Director', 'bmowbray2n@cbslocal.com', 1),
(97, 'Stefanie', 'Anker', 'Cyber Security', 'sanker2o@hud.gov', 5),
(98, 'Cherye', 'de Cullip', 'Engineering Team Leader', 'cdecullip2p@loc.gov', 10),
(99, 'Sinclare', 'Deverall', 'R&D Officer', 'sdeverall2q@ow.ly', 6),
(100, 'Shae', 'Johncey', 'Marketing Manager', 'sjohncey2r@bluehost.com', 3),
(208, 'Rafal', 'Bury', 'Project Engineer', 'rafalbury@email.com', 10);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personnel`
--
ALTER TABLE `personnel`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `personnel`
--
ALTER TABLE `personnel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=215;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
