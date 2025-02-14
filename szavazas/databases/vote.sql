-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Feb 14. 08:44
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
-- Tábla szerkezet ehhez a táblához `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `admin`
--

INSERT INTO `admin` (`admin_id`, `name`, `email`, `password_hash`, `created_at`) VALUES
(1, 'admin', 'admin@admin.com', '$2y$10$zvOqZ89P7h7bC1sS0qO8oeLPD3wXrP6ksL0Ree5UOyWTqO62JKUta', '2025-02-14 08:43:47');

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
(1, 'Nemzeti Haladás Pártja', 'A Nemzeti Haladás Pártja egy olyan politikai szervezet, amely szorosan kapcsolódik a hagyományos nemzeti értékekhez, miközben elkötelezett a gazdasági és társadalmi fejlődés iránt. A párt célja, hogy megteremtse a modern Magyarország alapjait, ahol a múlt értékei és a jövő kihívásai találkoznak. A párt programja az erős nemzeti identitásra és a globális gazdaságban való helytállásra épül. Kiemelt figyelmet fordítanak az oktatásra, az egészségügyre és a nemzetközi versenyképességre. A Nemzeti Haladás Pártja hisz abban, hogy a gazdasági növekedés csak akkor fenntartható, ha az emberek biztonságban érzik magukat, és bíznak a jövőben. Ennek érdekében nagy hangsúlyt helyeznek a kis- és középvállalkozások támogatására, a munkahelyteremtésre, valamint a mezőgazdaság és az ipar modernizációjára. A párt vezetői kiemelik, hogy a modernizáció nem jelenti a hagyományok elfeledését. Éppen ellenkezőleg, hisznek abban, hogy a gazdasági siker a kulturális örökség megőrzésével érhető el. Az oktatási reformok terén a párt célja egy olyan oktatási rendszer kialakítása, amely az innovációt és a kritikus gondolkodást ösztönzi, ugyanakkor tiszteletben tartja a hagyományos értékeket.'),
(2, 'Zöld Jövő Szövetség', 'A Zöld Jövő Szövetség a környezetvédelem és a fenntarthatóság iránt elkötelezett politikai párt, amely a természeti erőforrások megóvását és a klímaváltozás elleni küzdelmet helyezi a középpontba. A párt vezetése hisz abban, hogy a gazdasági növekedésnek és a környezeti fenntarthatóságnak kéz a kézben kell járnia. A Zöld Jövő Szövetség fő célkitűzései közé tartozik a megújuló energiaforrások arányának növelése, az energiahatékonyság javítása, valamint a környezetszennyezés csökkentése. A párt különösen fontosnak tartja a zöld technológiák fejlesztését és alkalmazását, amely nemcsak a környezet védelmét szolgálja, hanem új munkahelyeket is teremt. A szövetség jelentős hangsúlyt helyez a közösségi szemléletformálásra, hogy minden állampolgár megértse a fenntartható életmód fontosságát. Az oktatásban a párt kiemelt feladata, hogy a jövő generációi számára olyan tudást adjanak át, amely lehetővé teszi a környezettudatos döntések meghozatalát.'),
(3, 'Modern Mozgalom', 'A Modern Mozgalom egy progresszív politikai párt, amely a technológiai innovációt, a digitalizációt és a gazdasági modernizációt állítja politikájának középpontjába. A mozgalom hisz abban, hogy jövője a globális technológiai versenyben való helytállásban rejlik, ezért célja az ország digitális infrastruktúrájának fejlesztése és az innováció ösztönzése. A mozgalom programja átfogó reformokat javasol az oktatás, az egészségügy és a munkaerőpiac területén. Az oktatásban kiemelt figyelmet fordítanak a STEM (tudomány, technológia, mérnöki tudományok és matematika) területek megerősítésére, hogy a fiatalok a jövő munkaerőpiaci igényeinek megfelelő képzést kapjanak. Gazdasági téren a párt támogatja a startup ökoszisztéma fejlesztését, az innovatív vállalkozások ösztönzését és a tudományos kutatásba való befektetést. A Modern Mozgalom úgy véli, hogy a gazdasági növekedés és a társadalmi jólét eléréséhez elengedhetetlen a digitalizáció és az innováció.'),
(4, 'Közösségi Egyensúly Pártja', 'A Közösségi Egyensúly Pártja a társadalmi igazságosság és a közösségi szolidaritás elkötelezett híve. A párt célja egy olyan társadalom megteremtése, ahol minden állampolgár egyenlő esélyekkel indulhat, és ahol a közösségi értékek megerősítik a társadalmi kohéziót. A párt programja kiterjed a szociális szolgáltatások fejlesztésére, az egészségügy és az oktatás hozzáférhetőségének javítására, valamint a hátrányos helyzetű csoportok támogatására. A Közösségi Egyensúly Pártja úgy véli, hogy a társadalmi igazságosság megteremtéséhez szükség van a közösségi alapú kezdeményezések támogatására és a helyi közösségek megerősítésére. A párt vezetése kiemelten foglalkozik a lakhatási problémák megoldásával és a munkanélküliség csökkentésével. A Közösségi Egyensúly Pártja szerint a gazdasági növekedés csak akkor fenntartható, ha az a társadalom minden rétegére kiterjed, és ha az emberek biztonságban érzik magukat.'),
(5, 'Szabadság és Igazságosság Párt', 'A Szabadság és Igazságosság Párt a liberális demokrácia, az emberi jogok és a jogállamiság elkötelezett támogatója. A párt célja, hogy biztosítsa az egyéni szabadságjogokat, az átláthatóságot és a tisztességes kormányzást, miközben küzd a korrupció ellen. A párt programja a törvény előtti egyenlőséget és az igazságosságot helyezi a középpontba, és támogatja a szociális és gazdasági reformokat, amelyek lehetővé teszik az állampolgárok számára, hogy méltó életet élhessenek. A Szabadság és Igazságosság Párt kiemelten foglalkozik az oktatási rendszer reformjával, a szociális védelem megerősítésével és a munkahelyi egyenlőség biztosításával. A párt vezetése szerint a társadalmi fejlődés alapja az emberek szabadsága és méltósága, ezért támogatják a szólásszabadságot, a vallásszabadságot és az önrendelkezési jogot. A Szabadság és Igazságosság Párt hisz abban, hogy a demokrácia és az igazságosság minden ember alapvető joga.'),
(6, 'Új Generáció Koalíció', 'Az Új Nemzedék Mozgalom egy fiatalokat megszólító politikai párt, amely a jövő generációk igényeit helyezi előtérbe. A párt hitvallása szerint a fiataloknak nemcsak részesei, hanem alakítói is kell legyenek a politikai és társadalmi életnek. Az Új Nemzedék Mozgalom célja, hogy Magyarországot egy olyan hellyé alakítsa, ahol a fiatalok boldogan tervezhetik jövőjüket. A párt fő célkitűzései között szerepel az oktatás reformja, különösen az innovatív oktatási módszerek bevezetése, valamint a modern technológiák oktatásba való integrálása. Az Új Nemzedék Mozgalom kiemelten támogatja a digitális készségek fejlesztését és a nyelvtanulást, hogy a fiatalok versenyképesek legyenek a globális munkaerőpiacon. A párt programja kiterjed a munkahelyteremtésre is, különösen a fiatal vállalkozók és startupok támogatására. Az Új Nemzedék Mozgalom hisz abban, hogy a fiatalok kreativitása és innovációs képessége a gazdasági növekedés motorja lehet, ezért különféle ösztönző programokat javasolnak, amelyek megkönnyítik a fiatal vállalkozók számára az elindulást.'),
(7, 'Egység és Fejlődés Szövetsége', 'Az Egység és Fejlődés Szövetsége egy centrista politikai párt, amely az ország gazdasági növekedését és társadalmi kohézióját kívánja erősíteni. A szövetség hitvallása, hogy az egyéni szabadságjogok és a közösségi felelősségvállalás egyaránt fontosak a társadalmi harmónia megteremtéséhez. Az Egység és Fejlődés Szövetsége a piacgazdaságot támogatja, miközben kiemelten foglalkozik a társadalmi egyenlőtlenségek csökkentésével. A párt programja a gazdasági reformokra és az infrastrukturális fejlesztésekre koncentrál, hogy elősegítse az ország versenyképességének növelését. Az Egység és Fejlődés Szövetsége különös figyelmet fordít a vidéki területek fejlesztésére, az agrárium modernizációjára és a helyi közösségek támogatására. A párt célja, hogy az ország minden részén javuljon az életszínvonal, és hogy minden állampolgár számára elérhetővé váljon a minőségi egészségügyi ellátás és oktatás. Az Egység és Fejlődés Szövetsége hisz abban, hogy a gazdasági növekedés és a társadalmi jólét nem zárják ki egymást, hanem kölcsönösen erősítik.'),
(8, 'Nemzeti Haladás Pártja', 'A Nemzeti Haladás Pártja egy olyan politikai szervezet, amely szorosan kapcsolódik a hagyományos nemzeti értékekhez, miközben elkötelezett a gazdasági és társadalmi fejlődés iránt. A párt célja, hogy megteremtse a modern Magyarország alapjait, ahol a múlt értékei és a jövő kihívásai találkoznak. A párt programja az erős nemzeti identitásra és a globális gazdaságban való helytállásra épül. Kiemelt figyelmet fordítanak az oktatásra, az egészségügyre és a nemzetközi versenyképességre. A Nemzeti Haladás Pártja hisz abban, hogy a gazdasági növekedés csak akkor fenntartható, ha az emberek biztonságban érzik magukat, és bíznak a jövőben. Ennek érdekében nagy hangsúlyt helyeznek a kis- és középvállalkozások támogatására, a munkahelyteremtésre, valamint a mezőgazdaság és az ipar modernizációjára. A párt vezetői kiemelik, hogy a modernizáció nem jelenti a hagyományok elfeledését. Éppen ellenkezőleg, hisznek abban, hogy a gazdasági siker a kulturális örökség megőrzésével érhető el. Az oktatási reformok terén a párt célja egy olyan oktatási rendszer kialakítása, amely az innovációt és a kritikus gondolkodást ösztönzi, ugyanakkor tiszteletben tartja a hagyományos értékeket.'),
(9, 'Demokratikus Szövetség', 'A Demokratikus Szövetség egy liberális politikai párt, amely az emberi jogok és a szociális igazságosság védelmét tűzte zászlajára. A párt elkötelezett a demokratikus értékek mellett, és célja, hogy biztosítsa az állampolgárok számára a méltó élet feltételeit. A Demokratikus Szövetség programja a szociális szolgáltatások fejlesztésére, az oktatás hozzáférhetőségének javítására és a környezeti fenntarthatóság előmozdítására összpontosít. A párt kiemelten foglalkozik a nők és a kisebbségek jogainak védelmével, valamint az egyenlő bérezés biztosításával. A Demokratikus Szövetség hisz abban, hogy a társadalmi haladás csak akkor érhető el, ha mindenki számára biztosítottak az egyenlő esélyek és a szociális biztonság. A párt vezetése támogatja az európai integrációt, és célja, hogy Magyarország erős és megbízható partner legyen az Európai Unióban. A Demokratikus Szövetség úgy véli, hogy a társadalmi fejlődéshez szükség van a gazdasági növekedésre és a környezetvédelemre egyaránt.'),
(10, 'Magyarországért Mozgalom', 'A Magyarországért Mozgalom egy konzervatív politikai párt, amely a nemzeti szuverenitás és a hagyományos értékek védelmére helyezi a hangsúlyt. A párt célja, hogy megőrizze Magyarország kulturális örökségét, miközben erősíti az ország gazdasági és társadalmi alapjait. A Magyarországért Mozgalom programja a családok támogatására, a helyi közösségek megerősítésére és a gazdasági önállóság növelésére összpontosít. A párt vezetése úgy véli, hogy a nemzeti érdekek védelme elsődleges fontosságú, és hogy az ország fejlődése csak akkor érhető el, ha megőrizzük a hagyományos értékeket és biztosítjuk a társadalmi stabilitást. A Magyarországért Mozgalom kiemelt figyelmet fordít az oktatásra és az egészségügyre, és célja, hogy minden állampolgár számára biztosítsa a méltó élet feltételeit. A párt hisz abban, hogy a gazdasági növekedés csak akkor fenntartható, ha az a társadalom minden rétegére kiterjed, és ha az emberek biztonságban érzik magukat. A Magyarországért Mozgalom támogatja a helyi gazdaságok fejlesztését és a hazai vállalkozások erősítését.'),
(11, 'Polgári Koalíció', 'A Polgári Koalíció egy centrista politikai párt, amely a gazdasági növekedést és a társadalmi kohéziót kívánja elősegíteni. A koalíció hitvallása, hogy a gazdasági fejlődés és a társadalmi jólét nem zárják ki egymást, hanem kölcsönösen erősítik. A Polgári Koalíció programja a gazdasági reformokra és az infrastrukturális fejlesztésekre koncentrál, hogy elősegítse az ország versenyképességének növelését. A párt különös figyelmet fordít a vidéki területek fejlesztésére, az agrárium modernizációjára és a helyi közösségek támogatására. A Polgári Koalíció célja, hogy az ország minden részén javuljon az életszínvonal, és hogy minden állampolgár számára elérhetővé váljon a minőségi egészségügyi ellátás és oktatás. A párt hisz abban, hogy a gazdasági növekedés és a társadalmi jólét nem zárják ki egymást, hanem kölcsönösen erősítik.'),
(12, 'Szabadság és Igazságosság Párt', 'A Szabadság és Igazságosság Párt a liberális demokrácia, az emberi jogok és a jogállamiság elkötelezett támogatója. A párt célja, hogy biztosítsa az egyéni szabadságjogokat, az átláthatóságot és a tisztességes kormányzást, miközben küzd a korrupció ellen. A párt programja a törvény előtti egyenlőséget és az igazságosságot helyezi a középpontba, és támogatja a szociális és gazdasági reformokat, amelyek lehetővé teszik az állampolgárok számára, hogy méltó életet élhessenek. A Szabadság és Igazságosság Párt kiemelten foglalkozik az oktatási rendszer reformjával, a szociális védelem megerősítésével és a munkahelyi egyenlőség biztosításával. A párt vezetése szerint a társadalmi fejlődés alapja az emberek szabadsága és méltósága, ezért támogatják a szólásszabadságot, a vallásszabadságot és az önrendelkezési jogot. A Szabadság és Igazságosság Párt hisz abban, hogy a demokrácia és az igazságosság minden ember alapvető joga.'),
(13, 'Egység és Fejlődés Szövetsége', 'Az Egység és Fejlődés Szövetsége egy centrista politikai párt, amely az ország gazdasági növekedését és társadalmi kohézióját kívánja erősíteni. A szövetség hitvallása, hogy az egyéni szabadságjogok és a közösségi felelősségvállalás egyaránt fontosak a társadalmi harmónia megteremtéséhez. Az Egység és Fejlődés Szövetsége a piacgazdaságot támogatja, miközben kiemelten foglalkozik a társadalmi egyenlőtlenségek csökkentésével. A párt programja a gazdasági reformokra és az infrastrukturális fejlesztésekre koncentrál, hogy elősegítse az ország versenyképességének növelését. Az Egység és Fejlődés Szövetsége különös figyelmet fordít a vidéki területek fejlesztésére, az agrárium modernizációjára és a helyi közösségek támogatására. A párt célja, hogy az ország minden részén javuljon az életszínvonal, és hogy minden állampolgár számára elérhetővé váljon a minőségi egészségügyi ellátás és oktatás. Az Egység és Fejlődés Szövetsége hisz abban, hogy a gazdasági növekedés és a társadalmi jólét nem zárják ki egymást, hanem kölcsönösen erősítik.');

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

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id_number`, `name`, `email`, `password_hash`, `personal_id`, `agree_terms`, `registered_at`, `status`) VALUES
(1, 'asdasd', 'asdf@g.c', '$2a$10$xbmELMYirbUdsscb9spbhOQvokv2SMNcDGGhPf93MdwnnygT.NViC', '1234', 1, '2024-12-03 13:18:51', 'active'),
(2, 'a', 'a@g.c', '$2a$10$/1ejtoPs3WY1ZyDv4IZMGunG11KEIVMVOj4BNZRx5yP2xmYXZjrBG', '123', 1, '2025-01-07 13:11:12', 'active'),
(3, 'aa', 'aa@g.c', '$2a$10$i0QUtF9EdHJ/6JzcQaIOvuQmKHvwtVqA8zcsE31gMo/aGxTvuGspa', '123', 1, '2025-01-13 10:34:49', 'active'),
(4, 'pal', 'pal@g.c', '$2a$10$hSBqx2gCgpun1UTHgibIFedLYt2rca8CBuVH7v20jhUSRY2/8OVTa', '123', 1, '2025-02-10 11:06:17', 'active'),
(5, 'edv', 'edv@g.c', '$2a$10$Iv/4zrIHBg9jCtExbKa.Me93zq9a9ZBcHutbMz9kjCy6rPaf6yp62', '123', 1, '2025-02-10 11:06:29', 'active');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `votes`
--

CREATE TABLE `votes` (
  `vote_id` int(11) NOT NULL,
  `election_id` int(11) DEFAULT NULL,
  `party_id` int(11) NOT NULL,
  `vote_time` datetime DEFAULT current_timestamp(),
  `vote_hash` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `votes`
--

INSERT INTO `votes` (`vote_id`, `election_id`, `party_id`, `vote_time`, `vote_hash`, `user_id`) VALUES
(1, 1, 3, '2025-02-10 11:47:16', 'sryxq1gb17r', 4),
(2, 1, 3, '2025-02-10 11:52:34', 'hs36vug6vl', 2),
(3, 1, 12, '2025-02-10 11:53:48', 'r21b7kukiwc', 5);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `email` (`email`);

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
  ADD KEY `party_id` (`party_id`),
  ADD KEY `user_id` (`user_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `candidates`
--
ALTER TABLE `candidates`
  MODIFY `candidate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT a táblához `parties`
--
ALTER TABLE `parties`
  MODIFY `party_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id_number` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `votes`
--
ALTER TABLE `votes`
  MODIFY `vote_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `votes`
--
ALTER TABLE `votes`
  ADD CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`party_id`) REFERENCES `parties` (`party_id`),
  ADD CONSTRAINT `votes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_number`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
