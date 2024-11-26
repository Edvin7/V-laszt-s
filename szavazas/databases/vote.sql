-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Nov 26. 10:55
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `vote`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `candidates`
--

CREATE TABLE `candidates` (
  `candidate_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `party` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `candidates`
--

INSERT INTO `candidates` (`candidate_id`, `name`, `party`, `bio`, `photo`) VALUES
(1, 'Deutsch Tamás', 'Fidesz-KDMP', 'Jelenlegi EP képviselő, a Fidesz európai parlamenti delegációjának vezetője.', 'photos/deutsch_tamas.jpg'),
(2, 'Rónai Sándor', 'Fidesz-KDMP', 'EP képviselő, aki a közlekedési és biztonságpolitikai kérdésekben aktív.', 'photos/ronai_sandor.jpg'),
(3, 'Kovács József', 'Fidesz-KDMP', 'Képviselő, aki a mezőgazdasági és vidékfejlesztési kérdésekkel foglalkozik az EP-ben.', 'photos/kovacs_jozsef.jpg'),
(4, 'Tóth Edina', 'Fidesz-KDMP', 'Jelenlegi EP képviselő, jogi és belügyi szakértő.', 'photos/toth_edina.jpg'),
(5, 'Kósa Lajos', 'Fidesz-KDMP', 'Képviselő, aki gazdasági és ipari politikák terén dolgozik az EP-ben.', 'photos/kosa_lajos.jpg'),
(6, 'Dobrev Klára', 'DK-MSZP-Párbeszéd-Zöldek', 'Jelenlegi EP képviselő, szociális és jogállamisági szakértő.', 'photos/dobrev_klara.jpg'),
(7, 'Molnár Csaba', 'DK-MSZP-Párbeszéd-Zöldek', 'Jelenlegi EP képviselő, európai integráció és gazdaságpolitikai szakértő.', 'photos/molnar_csaba.jpg'),
(8, 'Ujhelyi István', 'DK-MSZP-Párbeszéd-Zöldek', 'Szociális és egészségügyi politikák szakértője, EP képviselő.', 'photos/ujhelyi_istvan.jpg'),
(9, 'Niedermüller Péter', 'DK-MSZP-Párbeszéd-Zöldek', 'Jelenlegi EP képviselő, emberi jogi és szociális kérdésekkel foglalkozik.', 'photos/niedermuller_peter.jpg'),
(10, 'Kovács András', 'DK-MSZP-Párbeszéd-Zöldek', 'EU jogszabályi kérdésekben aktív politikus.', 'photos/kovacs_andras.jpg'),
(11, 'Jakab Péter', 'Jobbik', 'Jelenlegi EP képviselő, a nemzeti érdeket képviseli.', 'photos/jakab_peter.jpg'),
(12, 'Sneider Tamás', 'Jobbik', 'Politikai vezető, EU politikák terén dolgozik.', 'photos/sneider_tamas.jpg'),
(13, 'Stummer János', 'Jobbik', 'Jelenlegi EP képviselő, védelmi és külpolitikai szakértő.', 'photos/stummer_janos.jpg'),
(14, 'Kovács Béla', 'Jobbik', 'Nemzetközi politikai elemző, az EP-ben dolgozó képviselő.', 'photos/kovacs_bela.jpg'),
(15, 'Farkas Gergely', 'Jobbik', 'Külpolitikai és jogi ügyekben dolgozó EP képviselő.', 'photos/farkas_gergely.jpg'),
(16, 'Schmuck Erzsébet', 'LMP', 'Zöldpolitikával foglalkozó EP képviselő, környezetvédelmi kérdésekkel.', 'photos/schmuck_erzsebet.jpg'),
(17, 'Keresztes László Lóránt', 'LMP', 'Zöld politikai irányvonalat képviselő politikus, a fenntarthatóság híve.', 'photos/keresztes_lorant.jpg'),
(18, 'Gál József', 'LMP', 'Környezetvédelmi és fenntarthatósági ügyekkel foglalkozó politikus.', 'photos/gal_jozsef.jpg'),
(19, 'Tóth László', 'LMP', 'EP képviselő, EU-s környezetvédelmi politikák szakértője.', 'photos/toth_laszlo.jpg'),
(20, 'Szabó Rebeka', 'LMP', 'Zöld politikus, környezetvédelmi és klímapolitikai szakértő.', 'photos/szabo_rebeka.jpg'),
(21, 'Toroczkai László', 'Mi Hazánk', 'Jelenlegi EP képviselő, nemzeti érdekeket képviselő politikus.', 'photos/toroczkai_laszlo.jpg'),
(22, 'Dúró Dóra', 'Mi Hazánk', 'Szociális ügyek és oktatáspolitika szakértője.', 'photos/duro_dora.jpg'),
(23, 'Németh Zsolt', 'Mi Hazánk', 'Külföldi kapcsolatok és biztonságpolitikai szakértő.', 'photos/nemeth_zsolt.jpg'),
(24, 'Farkas Gergely', 'Mi Hazánk', 'Nemzetközi politikai kérdésekben jártas EP képviselő.', 'photos/farkas_gergely_mh.jpg'),
(25, 'Péterfalvi Attila', 'Mi Hazánk', 'Európai jogi ügyekkel foglalkozó politikus.', 'photos/peterfalvi_attila.jpg'),
(26, 'Cseh Katalin', 'Momentum', 'Jelenlegi EP képviselő, a fiatalok és a jövőpolitika képviselője.', 'photos/cseh_katalin.jpg'),
(27, 'Fekete-Győr András', 'Momentum', 'Politikai vezető, EU-s jogi kérdések szakértője.', 'photos/fekete_gyor_andras.jpg'),
(28, 'Donáth Anna', 'Momentum', 'Jelenlegi EP képviselő, emberi jogi és digitális ügyekkel foglalkozik.', 'photos/donath_anna.jpg'),
(29, 'Kelemen Hunor', 'Momentum', 'Fiatal politikus, EU belügyi kérdésekkel foglalkozik.', 'photos/kelemen_hunor.jpg'),
(30, 'Gaal Gergely', 'Momentum', 'Környezetvédelmi és közlekedési politikákban aktív EP képviselő.', 'photos/gaal_gergely.jpg'),
(31, 'Magyar Péter', 'Tisza Párt', 'Politikai vezető és EP képviselő jelölt, nemzeti érdekek védelmezése.', 'photos/magyar_peter.jpg'),
(32, 'Kovács Tamás', 'Tisza Párt', 'Szociálpolitikai és oktatási ügyekben dolgozó politikus.', 'photos/kovacs_tamas.jpg'),
(33, 'Gulyás Péter', 'Tisza Párt', 'Nemzetközi kapcsolatok és gazdasági politikák szakértője.', 'photos/gulyas_peter.jpg'),
(34, 'Balogh János', 'Tisza Párt', 'Nemzetközi politikai elemző, EU politikákban aktív képviselő.', 'photos/balogh_janos.jpg'),
(35, 'Szabó Ádám', 'Tisza Párt', 'Fiatal politikus, EU szintű társadalmi kérdésekben dolgozik.', 'photos/szabo_adam.jpg'),
(36, 'Kovács Gábor', 'MKKP', 'EP képviselőjelölt, társadalmi ügyek és szórakoztató politika szakértője.', 'photos/kovacs_gabor_mkkp.jpg'),
(37, 'Szilágyi Áron', 'MKKP', 'Képviselőjelölt, a társadalmi igazságosság és a fenntarthatóság híve.', 'photos/szilagyi_aron.jpg'),
(38, 'Kőszegi Péter', 'MKKP', 'Szórakoztató politikát és közéleti problémákat feldolgozó képviselőjelölt.', 'photos/koszegi_peter.jpg'),
(39, 'Tóth Gábor', 'MKKP', 'Politikai humorista, aki a szociális és jogi kérdésekkel foglalkozik.', 'photos/toth_gabor_mkkp.jpg'),
(40, 'Németh Márton', 'MKKP', 'Szórakoztató és társadalmi ügyekben jártas EP képviselőjelölt.', 'photos/nemeth_marton.jpg'),
(41, 'Szabó Krisztián', 'MMN', 'Képviselőjelölt, aki az európai jogi kérdésekkel foglalkozik.', 'photos/szabo_krisztian_mmn.jpg'),
(42, 'Baranyai László', 'MMN', 'Politikai aktivista, aki a szociális jogok területén dolgozik.', 'photos/baranyai_laszlo.jpg'),
(43, 'Pálffy Zoltán', 'MMN', 'EU-s szociálpolitikai kérdésekkel foglalkozó politikus.', 'photos/palffy_zoltan.jpg'),
(44, 'Kovács Mária', 'MMN', 'Politikai elemző, aki a magyar közpolitikai kérdésekkel foglalkozik.', 'photos/kovacs_maria.jpg'),
(45, 'Szilágyi Ágnes', 'MMN', 'Politikai vezető, szociális és gazdasági kérdésekben aktív képviselő.', 'photos/szilagyi_agnes.jpg'),
(46, 'Szilágyi László', 'Nép Pártján', 'Jelenlegi EP képviselő, a szociális ügyek és a közszolgáltatások fejlesztésére fókuszál.', 'photos/szilagyi_laszlo.jpg'),
(47, 'Gálik Ágnes', 'Nép Pártján', 'Szociális politikák és női jogok védelmezője, EP képviselő.', 'photos/galik_agnes.jpg'),
(48, 'Tóth Sándor', 'Nép Pártján', 'Politikai elemző, aki az EP-ben dolgozik a közszolgáltatások fejlesztésén.', 'photos/toth_sandor.jpg'),
(49, 'Bodnár László', 'Nép Pártján', 'Politikai vezető, aki a közösségi és szociális kérdésekben dolgozik.', 'photos/bodnar_laszlo.jpg'),
(50, 'Nagy Ilona', 'Nép Pártján', 'Szociális és egészségügyi politikus, EP képviselőjelölt.', 'photos/nagy_ilona.jpg'),
(51, 'Kovács József', '2RK Párt', 'Politikai vezető, aki az európai közgazdaság és társadalmi igazságosság terén dolgozik.', 'photos/kovacs_jozsef_2rk.jpg'),
(52, 'Farkas Zsolt', '2RK Párt', 'Szociálpolitikai szakértő, aki az európai jogrend és jogállamiság kérdéseiben aktív.', 'photos/farkas_zsolt_2rk.jpg'),
(53, 'Nagy István', '2RK Párt', 'Politikai elemző, aki a közlekedési és közszolgáltatási kérdésekre fókuszál.', 'photos/nagy_istvan_2rk.jpg'),
(54, 'Juhász Péter', '2RK Párt', 'Nemzetközi politikai szakértő, aki a gazdasági és ipari politikákat képviseli.', 'photos/juhasz_peter_2rk.jpg'),
(55, 'Tóth Zoltán', '2RK Párt', 'A fenntarthatóság és környezetvédelem kérdéseivel foglalkozó politikus.', 'photos/toth_zoltan_2rk.jpg'),
(56, 'Tóth Gábor', 'MEMO', 'Politikai aktivista, aki a szociális és közszolgáltatási reformokkal foglalkozik.', 'photos/toth_gabor_memo.jpg'),
(57, 'Varga Ádám', 'MEMO', 'Politikai vezető, aki a fiatalok és a digitális jogok védelmét tűzte ki célul.', 'photos/varga_adam_memo.jpg'),
(58, 'Kovács Tamás', 'MEMO', 'Szociális ügyekkel foglalkozó politikai elemző és közgazdász.', 'photos/kovacs_tamas_memo.jpg'),
(59, 'Szabó Gábor', 'MEMO', 'Képviselőjelölt, aki az oktatási és munkavállalói jogok fejlesztésére fókuszál.', 'photos/szabo_gabor_memo.jpg'),
(60, 'Kiss Mária', 'MEMO', 'Szociális és egészségügyi politikákban jártas politikus, közszolgáltatás fejlesztésében aktív.', 'photos/kiss_maria_memo.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `parties`
--

CREATE TABLE `parties` (
  `party_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `parties`
--

INSERT INTO `parties` (`party_id`, `name`, `description`) VALUES
(1, 'Fidesz-KDMP', 'Konzervatív, jobboldali politikai párt, amely a magyar kormányt vezeti.\r\n'),
(2, 'DK-MSZP-Párbeszéd-Zöldek', 'Liberális és szociáldemokrata párt, amely a baloldali politikát képviseli Magyarországon.\r\n'),
(3, 'Jobbik', 'Nemzeti konzervatív párt, amely az elmúlt években mérsékelt irányba fordult.'),
(4, 'MEMO', 'Innovatív megoldásokra törekvő politikai mozgalom, a közélet tisztaságát és hatékonyságát hangsúlyozza.'),
(5, 'LMP-Zöldek', 'Zöldpárt, amely a fenntarthatóságot és környezetvédelmet helyezi középpontba.'),
(6, 'Mi Hazánk', 'Nemzeti radikális politikai párt, amely a konzervatív értékeket képviseli.'),
(7, '2RK Párt', 'Modern reformokat szorgalmazó párt, amely a magyar történelem reformkori szellemiségét viszi tovább.'),
(8, 'Momentum', 'Progresszív, liberális párt, amely a fiatal generációk érdekeit képviseli.'),
(9, 'Tisza Párt', 'Helyi érdekeket és a vidéki lakosság támogatását középpontba helyező párt.'),
(10, 'MKKP', 'Szatirikus párt, amely kreatív megoldásokkal kritizálja a politikai rendszert.'),
(11, 'MMN', 'Közösségi alapú mozgalom, amely az országos politikai és helyi ügyek összekapcsolására törekszik.'),
(12, 'Nép Pártján', 'A társadalmi igazságosságot és a kisemberek érdekképviseletét előtérbe helyező politikai párt.');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id_number` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `personal_id` varchar(20) NOT NULL,
  `agree_terms` tinyint(1) NOT NULL DEFAULT 0,
  `registered_at` datetime DEFAULT current_timestamp(),
  `status` varchar(50) NOT NULL CHECK (`status` in ('active','inactive'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `votes`
--

CREATE TABLE `votes` (
  `vote_id` int(11) NOT NULL,
  `election_id` int(11) DEFAULT NULL,
  `candidate_id` int(11) DEFAULT NULL,
  `vote_time` datetime DEFAULT current_timestamp(),
  `vote_hash` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `candidates`
--
ALTER TABLE `candidates`
  ADD PRIMARY KEY (`candidate_id`);

--
-- A tábla indexei `parties`
--
ALTER TABLE `parties`
  ADD PRIMARY KEY (`party_id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_number`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A tábla indexei `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`vote_id`),
  ADD KEY `candidate_id` (`candidate_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `candidates`
--
ALTER TABLE `candidates`
  MODIFY `candidate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT a táblához `parties`
--
ALTER TABLE `parties`
  MODIFY `party_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id_number` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `votes`
--
ALTER TABLE `votes`
  MODIFY `vote_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `votes`
--
ALTER TABLE `votes`
  ADD CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`candidate_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
