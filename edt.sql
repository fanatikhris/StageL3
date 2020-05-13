-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 05 mai 2020 à 22:56
-- Version du serveur :  10.4.11-MariaDB
-- Version de PHP : 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `edt`
--

-- --------------------------------------------------------

--
-- Structure de la table `rooms`
--

CREATE TABLE `rooms` (
  `id` varchar(30) NOT NULL,
  `prises` tinyint(1) NOT NULL,
  `labo` tinyint(1) NOT NULL,
  `pc` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `rooms`
--

INSERT INTO `rooms` (`id`, `prises`, `labo`, `pc`) VALUES
('A014', 0, 0, 0),
('A018', 0, 0, 0),
('A116', 0, 0, 0),
('A019', 0, 0, 0),
('A020', 0, 0, 0),
('A117', 0, 0, 0),
('A115', 0, 0, 0),
('A118', 0, 0, 0),
('A119', 0, 0, 0),
('A120', 0, 0, 0),
('A203', 0, 0, 0),
('A212', 0, 0, 0),
('AMPHI-A', 0, 0, 0),
('AMPHI-B', 0, 0, 0),
('AMPHI-D', 0, 0, 0),
('AMPHI-E', 0, 0, 0),
('AMPHI-L001', 0, 0, 0),
('AMPHI-L003', 0, 0, 0),
('AMPHI-L002', 0, 0, 0),
('AMPHI-L004', 0, 0, 0),
('AMPHI-L005', 0, 0, 0),
('AMPHI-L006', 0, 0, 0),
('B002', 0, 0, 0),
('B003', 0, 0, 0),
('B005', 0, 0, 0),
('B006', 0, 0, 0),
('B\'107', 0, 0, 0),
('B\'108', 0, 0, 0),
('C002', 0, 0, 0),
('B\'109', 0, 0, 0),
('C004', 0, 0, 0),
('Da-003', 0, 0, 0),
('Da-006', 0, 0, 0),
('Da-101', 0, 0, 0),
('Da-102', 0, 0, 0),
('Da-106', 0, 0, 0),
('Da-107', 0, 0, 0),
('Da-201', 0, 0, 0),
('Da-202', 0, 0, 0),
('Da-207', 0, 0, 0),
('E002', 0, 0, 0),
('E001', 0, 0, 0),
('F001', 0, 0, 0),
('E003', 0, 0, 0),
('F002', 0, 0, 0),
('F101', 0, 0, 0),
('F102', 0, 0, 0),
('F003', 0, 0, 0),
('F004', 0, 0, 0),
('G001', 0, 0, 0),
('G002', 0, 0, 0),
('G003', 0, 0, 0),
('G101', 0, 0, 0),
('G102', 0, 0, 0),
('G103', 0, 0, 0),
('G104', 0, 0, 0),
('G105', 0, 0, 0),
('G204', 0, 0, 0),
('G205', 0, 0, 0),
('H001', 0, 0, 0),
('H003', 0, 0, 0),
('H006', 0, 0, 0),
('H113', 0, 0, 0),
('H217', 0, 0, 0),
('H002', 0, 0, 0),
('H007', 0, 0, 0),
('I003', 0, 0, 0),
('I002', 0, 0, 0),
('I004', 0, 0, 0),
('I005', 0, 0, 0),
('I006', 0, 0, 0),
('I008', 0, 0, 0),
('L101', 0, 0, 0),
('L102', 0, 0, 0),
('L103', 0, 0, 0),
('L104', 0, 0, 0),
('L105', 0, 0, 0),
('L107', 0, 0, 0),
('L106', 0, 0, 0),
('L108', 0, 0, 0),
('L201', 0, 0, 0),
('L202', 0, 0, 0),
('L203', 0, 0, 0),
('L204', 0, 0, 0),
('L205', 0, 0, 0),
('L206', 0, 0, 0),
('L207', 0, 0, 0),
('L208', 0, 0, 0),
('L209', 0, 0, 0),
('L210', 0, 0, 0),
('L211', 0, 0, 0),
('L212', 0, 0, 0),
('L219', 0, 0, 0),
('L218', 0, 0, 0),
('L220', 0, 0, 0),
('L221', 0, 0, 0),
('L222', 0, 0, 0),
('L229', 0, 0, 0),
('L230', 0, 0, 0),
('L232', 0, 0, 0),
('Rez-de-Jardin', 0, 0, 0),
('Salle-de-conférences-Bât.K', 0, 0, 0),
('Salle-du-conseil', 0, 0, 0),
('L231', 0, 0, 0),
('Pas-de-salle', 0, 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `teachercourse`
--

CREATE TABLE `teachercourse` (
  `teacher` varchar(30) NOT NULL,
  `course` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `teachercourse`
--

INSERT INTO `teachercourse` (`teacher`, `course`) VALUES
('LESAINT David', 'Développement Web 3_CM_promo'),
('LESAINT David', 'Développement Web 3_TP_A'),
('LESAINT David', 'Développement Web 3_TP_B'),
('AL HASAN Hasan', 'Développement Web 3_TP_C'),
('LEFEVRE Claire', 'Programmation fonctionnelle et logique_CM_promo'),
('LEFEVRE Claire', 'Programmation fonctionnelle et logique_TD_A'),
('STEPHAN Igor', 'Programmation fonctionnelle et logique_TD_B'),
('LEFEVRE Claire', 'Programmation fonctionnelle et logique_TP_A'),
('STEPHAN Igor', 'Programmation fonctionnelle et logique_TP_B'),
('TARI Sara', 'Programmation fonctionnelle et logique_TP_C'),
('AIT EL MEKKI Touria', 'Bases de données 2_CM_promo'),
('AIT EL MEKKI Touria', 'Bases de données 2_TD_A'),
('AIT EL MEKKI Touria', 'Bases de données 2_TD_B'),
('AIT EL MEKKI Touria', 'Bases de données 2_TP_A'),
('AIT EL MEKKI Touria', 'Bases de données 2_TP_B'),
('AIT EL MEKKI Touria', 'Bases de données 2_TP_C'),
('STEPHAN Igor', 'Image de synthèse_CM_promo'),
('STEPHAN Igor', 'Image de synthèse_TP_A'),
('GARREAU Fabien', 'Image de synthèse_TP_B'),
('CHANTREIN Jean-Mathieu', 'Développement d\'interfaces graphiques avancées_CM_promo'),
('CHANTREIN Jean-Mathieu', 'Développement d\'interfaces graphiques avancées_TP_A'),
('HUNAULT Gilles', 'Production automatisée de documents_CM_promo'),
('HUNAULT Gilles', 'Production automatisée de documents_TD_A'),
('HUNAULT Gilles', 'Production automatisée de documents_TP_A'),
('STEPHAN Igor', 'Initiation à la programmation de systèmes intelligents_CM_promo'),
('STEPHAN Igor', 'Initiation à la programmation de systèmes intelligents_TD_A'),
('STEPHAN Igor', 'Initiation à la programmation de systèmes intelligents_TP_A'),
('DEVRED Caroline', 'C++_CM_promo'),
('DA MOTA Benoit', 'C++_TP_A'),
('CHAMBON Arthur', 'C++_TP_B');

-- --------------------------------------------------------

--
-- Structure de la table `teachers`
--

CREATE TABLE `teachers` (
  `id` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `teachers`
--

INSERT INTO `teachers` (`id`) VALUES
('AIT EL MEKKI Touria'),
('AL HASAN Hasan'),
('AMGHAR Tassadit'),
('BARICHARD Vincent'),
('CHAMBON Arthur'),
('CHANTREIN Jean-Mathieu'),
('DA MOTA Benoit'),
('DELAVERNHE Florian'),
('DEVRED Caroline'),
('DUVAL Béatrice'),
('GARCIA Laurent'),
('GARREAU Fabien'),
('GENEST David'),
('GOEFFON Adrien'),
('GOUDET Olivier'),
('HAMIEZ Jean-Philippe'),
('HAO Jin-Kao'),
('HUNAULT Gilles'),
('LARDEUX Frédéric'),
('LE CALVAR Théo'),
('LEDUC Lionel'),
('LEFEVRE Claire'),
('LESAINT David'),
('LOISEAU Stéphane'),
('RICHER Jean-Michel'),
('ROBERT Adrian'),
('ROSSI André'),
('SAUBION Frédéric'),
('SCOTTO Martine'),
('STEPHAN Igor'),
('TARI Sara'),
('TELETCHEA Stéphane'),
('TODOSKOFF Alexis'),
('WELSCH Marie-Christine');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
