-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Feb 18. 10:19
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
  `description` text DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `political_ideology` varchar(255) DEFAULT NULL,
  `political_years` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`political_years`)),
  `political_campaigns` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`political_campaigns`)),
  `political_campaign_description` text DEFAULT NULL,
  `political_year_description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `parties`
--

INSERT INTO `parties` (`party_id`, `name`, `description`, `photo`, `political_ideology`, `political_years`, `political_campaigns`, `political_campaign_description`, `political_year_description`) VALUES
(1, 'Nemzeti Haladás Pártja', 'A Nemzeti Haladás Pártja egy olyan politikai szervezet, amely szorosan kapcsolódik a hagyományos nemzeti értékekhez, miközben elkötelezett a gazdasági és társadalmi fejlődés iránt. A párt célja, hogy megteremtse a modern Magyarország alapjait, ahol a múlt értékei és a jövő kihívásai találkoznak. A párt programja az erős nemzeti identitásra és a globális gazdaságban való helytállásra épül. Kiemelt figyelmet fordítanak az oktatásra, az egészségügyre és a nemzetközi versenyképességre. A Nemzeti Haladás Pártja hisz abban, hogy a gazdasági növekedés csak akkor fenntartható, ha az emberek biztonságban érzik magukat, és bíznak a jövőben. Ennek érdekében nagy hangsúlyt helyeznek a kis- és középvállalkozások támogatására, a munkahelyteremtésre, valamint a mezőgazdaság és az ipar modernizációjára. A párt vezetői kiemelik, hogy a modernizáció nem jelenti a hagyományok elfeledését. Éppen ellenkezőleg, hisznek abban, hogy a gazdasági siker a kulturális örökség megőrzésével érhető el. Az oktatási reformok terén a párt célja egy olyan oktatási rendszer kialakítása, amely az innovációt és a kritikus gondolkodást ösztönzi, ugyanakkor tiszteletben tartja a hagyományos értékeket.', 'nemzetihaladas.png', 'Liberalizmus', '[\"2000\", \"2004\", \"2008\", \"2012\"]', '[\"Kampány 2000\", \"Kampány 2004\"]', 'A 2000-es kampány célja a szociális jogok védelme volt, hangsúlyt fektettek az oktatásra és a szociális biztonságra., A 2004-es kampány során a gazdasági reformok és a munkahelyteremtés volt a fő téma.', '2000: A szociális jogok védelme és az oktatási reformok., 2004: Gazdasági reformok és munkahelyteremtés., 2008: Pénzügyi válság hatásainak kezelése., 2012: Szociális támogatások növelése és munkahelyteremtés.'),
(2, 'Zöld Jövő Szövetség', 'A Zöld Jövő Szövetség a környezetvédelem és a fenntarthatóság iránt elkötelezett politikai párt, amely a természeti erőforrások megóvását és a klímaváltozás elleni küzdelmet helyezi a középpontba. A párt vezetése hisz abban, hogy a gazdasági növekedésnek és a környezeti fenntarthatóságnak kéz a kézben kell járnia. A Zöld Jövő Szövetség fő célkitűzései közé tartozik a megújuló energiaforrások arányának növelése, az energiahatékonyság javítása, valamint a környezetszennyezés csökkentése. A párt különösen fontosnak tartja a zöld technológiák fejlesztését és alkalmazását, amely nemcsak a környezet védelmét szolgálja, hanem új munkahelyeket is teremt. A szövetség jelentős hangsúlyt helyez a közösségi szemléletformálásra, hogy minden állampolgár megértse a fenntartható életmód fontosságát. Az oktatásban a párt kiemelt feladata, hogy a jövő generációi számára olyan tudást adjanak át, amely lehetővé teszi a környezettudatos döntések meghozatalát.', 'zoldjovo.png', 'Konzervativizmus', '[\"2010\", \"2014\", \"2018\", \"2022\"]', '[\"Kampány 2010\", \"Kampány 2014\"]', 'A 2010-es kampány célja a nemzeti identitás erősítése és a családpolitikai intézkedések voltak, míg 2014-ben az európai uniós politikák reformja és a közszolgáltatások privatizációja voltak a fő téma., A 2014-es kampány során az EU politikák reformja és közszolgáltatások privatizációja voltak a központi témák.', '2010: A nemzeti identitás erősítése és családpolitikai intézkedések., 2014: Az EU politikák reformja és a közszolgáltatások privatizációja., 2018: Gazdasági növekedés és új munkalehetőségek., 2022: Politikai stabilitás és szociális intézkedések erősítése.'),
(3, 'Modern Mozgalom', 'A Modern Mozgalom egy progresszív politikai párt, amely a technológiai innovációt, a digitalizációt és a gazdasági modernizációt állítja politikájának középpontjába. A mozgalom hisz abban, hogy jövője a globális technológiai versenyben való helytállásban rejlik, ezért célja az ország digitális infrastruktúrájának fejlesztése és az innováció ösztönzése. A mozgalom programja átfogó reformokat javasol az oktatás, az egészségügy és a munkaerőpiac területén. Az oktatásban kiemelt figyelmet fordítanak a STEM (tudomány, technológia, mérnöki tudományok és matematika) területek megerősítésére, hogy a fiatalok a jövő munkaerőpiaci igényeinek megfelelő képzést kapjanak. Gazdasági téren a párt támogatja a startup ökoszisztéma fejlesztését, az innovatív vállalkozások ösztönzését és a tudományos kutatásba való befektetést. A Modern Mozgalom úgy véli, hogy a gazdasági növekedés és a társadalmi jólét eléréséhez elengedhetetlen a digitalizáció és az innováció.', 'modernmozgalom.png', 'Szocializmus', '[\"2015\", \"2019\", \"2023\", \"2027\"]', '[\"Kampány 2015\", \"Kampány 2019\"]', 'A 2015-ös kampányban a társadalmi egyenlőségre és a munkahelyek védelmére koncentráltak., A 2019-es kampány során a szegénység elleni küzdelem és az oktatási reformok voltak a központi témák.', '2015: A társadalmi egyenlőség védelme és munkahelyek biztosítása., 2019: A szegénység elleni küzdelem és oktatási reformok., 2023: A digitális gazdaság fejlődése és a közszolgáltatások bővítése., 2027: Az oktatás és szociális védelmi rendszerek megerősítése.'),
(4, 'Közösségi Egyensúly Pártja', 'A Közösségi Egyensúly Pártja a társadalmi igazságosság és a közösségi szolidaritás elkötelezett híve. A párt célja egy olyan társadalom megteremtése, ahol minden állampolgár egyenlő esélyekkel indulhat, és ahol a közösségi értékek megerősítik a társadalmi kohéziót. A párt programja kiterjed a szociális szolgáltatások fejlesztésére, az egészségügy és az oktatás hozzáférhetőségének javítására, valamint a hátrányos helyzetű csoportok támogatására. A Közösségi Egyensúly Pártja úgy véli, hogy a társadalmi igazságosság megteremtéséhez szükség van a közösségi alapú kezdeményezések támogatására és a helyi közösségek megerősítésére. A párt vezetése kiemelten foglalkozik a lakhatási problémák megoldásával és a munkanélküliség csökkentésével. A Közösségi Egyensúly Pártja szerint a gazdasági növekedés csak akkor fenntartható, ha az a társadalom minden rétegére kiterjed, és ha az emberek biztonságban érzik magukat.', 'kozossegiegyensuly.png', 'Zöldek', '[\"2005\", \"2009\", \"2013\", \"2017\"]', '[\"Kampány 2005\", \"Kampány 2009\"]', 'A 2005-ös kampány során a környezetvédelmi intézkedések és a fenntartható fejlődés kiemelt szerepet kaptak., A 2009-es kampány a megújuló energiák és a zöld gazdaság elterjedésére összpontosított.', '2005: Környezetvédelmi intézkedések és fenntartható fejlődés., 2009: Megújuló energiák és zöld gazdaság., 2013: Zöld infrastruktúrák és fenntartható városfejlesztés., 2017: Környezetvédelmi törvények és a klímaváltozás elleni küzdelem.'),
(5, 'Szabadság és Igazságosság Párt', 'A Szabadság és Igazságosság Párt a liberális demokrácia, az emberi jogok és a jogállamiság elkötelezett támogatója. A párt célja, hogy biztosítsa az egyéni szabadságjogokat, az átláthatóságot és a tisztességes kormányzást, miközben küzd a korrupció ellen. A párt programja a törvény előtti egyenlőséget és az igazságosságot helyezi a középpontba, és támogatja a szociális és gazdasági reformokat, amelyek lehetővé teszik az állampolgárok számára, hogy méltó életet élhessenek. A Szabadság és Igazságosság Párt kiemelten foglalkozik az oktatási rendszer reformjával, a szociális védelem megerősítésével és a munkahelyi egyenlőség biztosításával. A párt vezetése szerint a társadalmi fejlődés alapja az emberek szabadsága és méltósága, ezért támogatják a szólásszabadságot, a vallásszabadságot és az önrendelkezési jogot. A Szabadság és Igazságosság Párt hisz abban, hogy a demokrácia és az igazságosság minden ember alapvető joga.', 'szabadsagigazsagossag.png', 'Anarchizmus', '[\"2006\", \"2010\", \"2014\", \"2018\"]', '[\"Kampány 2006\", \"Kampány 2010\"]', 'A 2006-os kampányban a hatalom nélküli társadalomra összpontosítottak., A 2010-es kampányban a szabadság és az önrendelkezés fontosságát hangsúlyozták.', '2006: Hatalom nélküli társadalom és szabadság., 2010: Szabadság és önrendelkezés., 2014: Közvetlen demokrácia és decentralizált irányítás., 2018: Autonómiák és önállóság megerősítése.'),
(6, 'Új Generáció Koalíció', 'Az Új Nemzedék Mozgalom egy fiatalokat megszólító politikai párt, amely a jövő generációk igényeit helyezi előtérbe. A párt hitvallása szerint a fiataloknak nemcsak részesei, hanem alakítói is kell legyenek a politikai és társadalmi életnek. Az Új Nemzedék Mozgalom célja, hogy Magyarországot egy olyan hellyé alakítsa, ahol a fiatalok boldogan tervezhetik jövőjüket. A párt fő célkitűzései között szerepel az oktatás reformja, különösen az innovatív oktatási módszerek bevezetése, valamint a modern technológiák oktatásba való integrálása. Az Új Nemzedék Mozgalom kiemelten támogatja a digitális készségek fejlesztését és a nyelvtanulást, hogy a fiatalok versenyképesek legyenek a globális munkaerőpiacon. A párt programja kiterjed a munkahelyteremtésre is, különösen a fiatal vállalkozók és startupok támogatására. Az Új Nemzedék Mozgalom hisz abban, hogy a fiatalok kreativitása és innovációs képessége a gazdasági növekedés motorja lehet, ezért különféle ösztönző programokat javasolnak, amelyek megkönnyítik a fiatal vállalkozók számára az elindulást.', 'ujgeneracio.png', 'Kommunizmus', '[\"1998\", \"2002\", \"2006\", \"2010\"]', '[\"Kampány 1998\", \"Kampány 2002\"]', 'A 1998-as kampányban a munkásosztály és a szegénység elleni harcot támogatták., A 2002-es kampány célja a kollektivizálás és a közszolgáltatások ingyenessé tétele volt.', '1998: Munkásosztály és szegénység elleni küzdelem., 2002: Kollektivizálás és közszolgáltatások ingyenessé tétele., 2006: A szocializmus visszaállítása., 2010: Szocialista alapú gazdaságok és munkavállalói jogok védelme.'),
(7, 'Egység és Fejlődés Szövetsége', 'Az Egység és Fejlődés Szövetsége egy centrista politikai párt, amely az ország gazdasági növekedését és társadalmi kohézióját kívánja erősíteni. A szövetség hitvallása, hogy az egyéni szabadságjogok és a közösségi felelősségvállalás egyaránt fontosak a társadalmi harmónia megteremtéséhez. Az Egység és Fejlődés Szövetsége a piacgazdaságot támogatja, miközben kiemelten foglalkozik a társadalmi egyenlőtlenségek csökkentésével. A párt programja a gazdasági reformokra és az infrastrukturális fejlesztésekre koncentrál, hogy elősegítse az ország versenyképességének növelését. Az Egység és Fejlődés Szövetsége különös figyelmet fordít a vidéki területek fejlesztésére, az agrárium modernizációjára és a helyi közösségek támogatására. A párt célja, hogy az ország minden részén javuljon az életszínvonal, és hogy minden állampolgár számára elérhetővé váljon a minőségi egészségügyi ellátás és oktatás. Az Egység és Fejlődés Szövetsége hisz abban, hogy a gazdasági növekedés és a társadalmi jólét nem zárják ki egymást, hanem kölcsönösen erősítik.', 'egysegfejlodes.png', 'Neoliberalizmus', '[\"2000\", \"2004\", \"2008\", \"2012\"]', '[\"Kampány 2000\", \"Kampány 2004\"]', 'A 2000-es kampány a piac liberalizálására és a privatizációra fókuszált., A 2004-es kampányban a gazdaság szabadságának és versenyképességének növelésére helyezték a hangsúlyt.', '2000: Piac liberalizálása és privatizáció., 2004: Gazdasági szabadság és versenyképesség növelése., 2008: Pénzügyi szektor liberalizálása., 2012: Az egyéni vállalkozások és a verseny erősítése.'),
(8, 'Jövő Erő Pártja', 'A Jövő Erő Pártja a társadalmi igazságosság, a fenntarthatóság és a gazdasági fejlődés érdekében dolgozik. Célunk egy olyan ország építése, amely mindenki számára jobb jövőt biztosít.', 'jovoero.png', 'Fasiszta', '[\"1930\", \"1934\", \"1938\", \"1942\"]', '[\"Kampány 1930\", \"Kampány 1934\"]', 'A 1930-as kampányban a nemzeti egység és az erős állam létrehozására fókuszáltak., A 1934-es kampány során a gazdasági központi irányítása és a katonai hatalom megerősítése volt a cél.', '1930: Nemzeti egység és erős állam., 1934: Gazdasági irányítás és katonai hatalom megerősítése., 1938: A terjeszkedés és nemzeti egység., 1942: Háborús gazdaság és politikai stabilitás megteremtése.'),
(9, 'Progresszív Jövő Pártja', 'A Progresszív Jövő Pártja célja egy fenntartható és modern társadalom kiépítése, amely elősegíti a környezetvédelem, a gazdaságfejlesztés és az oktatás fejlődését.', 'progresszivjovo.png', 'Feminizmus', '[\"2010\", \"2014\", \"2018\", \"2022\"]', '[\"Kampány 2010\", \"Kampány 2014\"]', 'A 2010-es kampány célja a nők jogainak védelme és a társadalmi egyenlőség előmozdítása., A 2014-es kampányban a nők jogainak további bővítése és a munkaerőpiacon való egyenlő esélyek biztosítása volt a fő téma.', '2010: Nők jogainak védelme és társadalmi egyenlőség., 2014: Nők jogainak bővítése és munkaerőpiaci egyenlőség., 2018: Társadalmi egyenlőség és a nők érvényesülésének elősegítése., 2022: A nők jogainak védelme és a férfi-nő közötti egyenlőség erősítése.'),
(10, 'Magyarországért Mozgalom', 'A Magyarországért Mozgalom egy konzervatív politikai párt, amely a nemzeti szuverenitás és a hagyományos értékek védelmére helyezi a hangsúlyt. A párt célja, hogy megőrizze Magyarország kulturális örökségét, miközben erősíti az ország gazdasági és társadalmi alapjait. A Magyarországért Mozgalom programja a családok támogatására, a helyi közösségek megerősítésére és a gazdasági önállóság növelésére összpontosít. A párt vezetése úgy véli, hogy a nemzeti érdekek védelme elsődleges fontosságú, és hogy az ország fejlődése csak akkor érhető el, ha megőrizzük a hagyományos értékeket és biztosítjuk a társadalmi stabilitást. A Magyarországért Mozgalom kiemelt figyelmet fordít az oktatásra és az egészségügyre, és célja, hogy minden állampolgár számára biztosítsa a méltó élet feltételeit. A párt hisz abban, hogy a gazdasági növekedés csak akkor fenntartható, ha az a társadalom minden rétegére kiterjed, és ha az emberek biztonságban érzik magukat. A Magyarországért Mozgalom támogatja a helyi gazdaságok fejlesztését és a hazai vállalkozások erősítését.', 'orszagertmozgalom.png', 'Anarcho-kapitalizmus', '[\"2012\", \"2016\", \"2020\", \"2024\"]', '[\"Kampány 2012\", \"Kampány 2016\"]', 'A 2012-es kampány során az egyéni szabadság és a piaci anarchia voltak a központi témák. A 2016-os kampányban a gazdasági szabadság és a központi hatalom eltörlésére helyezték a hangsúlyt.', '2012: Egyéni szabadság és piaci anarchia. 2016: Központi hatalom eltörlése és gazdasági szabadság. 2020: Piaci alapú társadalom és minimalizált kormányzati szerepvállalás. 2024: Az állam és a közszolgáltatások eltörlése és a teljes piaci szabadság.'),
(11, 'Polgári Koalíció', 'A Polgári Koalíció egy centrista politikai párt, amely a gazdasági növekedést és a társadalmi kohéziót kívánja elősegíteni. A koalíció hitvallása, hogy a gazdasági fejlődés és a társadalmi jólét nem zárják ki egymást, hanem kölcsönösen erősítik. A Polgári Koalíció programja a gazdasági reformokra és az infrastrukturális fejlesztésekre koncentrál, hogy elősegítse az ország versenyképességének növelését. A párt különös figyelmet fordít a vidéki területek fejlesztésére, az agrárium modernizációjára és a helyi közösségek támogatására. A Polgári Koalíció célja, hogy az ország minden részén javuljon az életszínvonal, és hogy minden állampolgár számára elérhetővé váljon a minőségi egészségügyi ellátás és oktatás. A párt hisz abban, hogy a gazdasági növekedés és a társadalmi jólét nem zárják ki egymást, hanem kölcsönösen erősítik.', 'polgarikol.png', 'Racionalizmus', '[\"2013\", \"2017\", \"2021\", \"2025\"]', '[\"Kampány 2013\", \"Kampány 2017\"]', 'A 2013-as kampány célja a tudományos alapú politikai döntéshozatal és racionalizált gazdaság volt. A 2017-es kampányban a hatékony államigazgatás és a logikai rendszerek bevezetése volt a központi téma.', '2013: Tudományos alapú döntéshozatal és racionalizált gazdaság. 2017: Hatékony államigazgatás és logikai rendszerek. 2021: Költséghatékonyság és társadalmi problémák racionális kezelése. 2025: Tudományos fejlődés és a politikai racionalizmus megerősítése.'),
(12, 'Igazság és Közjó Pártja', 'Az Igazság és Közjó Pártja a társadalmi egyenlőség, igazságosság és a közjó előmozdítására összpontosít. A célunk egy olyan társadalom, ahol mindenki méltósággal élhet és hozzájárulhat a közösség fejlődéséhez.', 'igazsag_kozzjo.png', 'Populizmus', '[\"2010\", \"2014\", \"2018\", \"2022\"]', '[\"Kampány 2010\", \"Kampány 2014\"]', 'A 2010-es kampányban az emberek közvetlen érdekeit és szükségleteit hangsúlyozták. A 2014-es kampány során a politikai elit ellenállásának növelése és a nép jogainak védelme volt a központi téma.', '2010: Közvetlen érdekeltségek és politikai elit elleni küzdelem. 2014: Politikai elit ellenállása és népi jogok védelme. 2018: Közvetlen demokráció és közvetlen érdekeltségek. 2022: A politikai elittel szembeni konfliktusok és populista reformok.'),
(13, 'Új Esélyek Koalíciója', 'Az Új Esélyek Koalíciója célja a fiatalok, a hátrányos helyzetűek és az elnyomott közösségek képviselete, valamint a társadalmi igazságosság előmozdítása.', 'ujeselyekkoalicioja.png', 'Monarchizmus', '[\"1999\", \"2003\", \"2007\", \"2011\"]', '[\"Kampány 1999\", \"Kampány 2003\"]', 'A 1999-es kampány célja a monarchikus rend megerősítése és a királyi hatalom növelése volt. A 2003-as kampányban a politikai stabilitás és az ősi hagyományok védelme állt a középpontban.', '1999: Monarchikus rend és királyi hatalom. 2003: Politikai stabilitás és hagyományok védelme. 2007: A monarchia és a szociális rend helyreállítása. 2011: Ősi hagyományok és politikai stabilitás megőrzése.'),
(15, 'asd', 'asd', NULL, NULL, NULL, NULL, NULL, NULL),
(16, 'dd', 'dd', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------



--
-- Tábla szerkezet ehhez a táblához `terms_of_service`
--

CREATE TABLE `terms_of_service` (
  `id` int(11) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `terms_of_service`
--

INSERT INTO `terms_of_service` (`id`, `content`, `created_at`, `updated_at`) VALUES
(1, '28', '2025-02-17 07:37:16', '2025-02-17 07:37:16');

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
(2, 'a', 'a@g.c', '$2a$10$/1ejtoPs3WY1ZyDv4IZMGunG11KEIVMVOj4BNZRx5yP2xmYXZjrBG', '123', 1, '2025-01-07 13:11:12', 'active'),
(4, 'pal', 'pal@g.c', '$2a$10$hSBqx2gCgpun1UTHgibIFedLYt2rca8CBuVH7v20jhUSRY2/8OVTa', '123', 1, '2025-02-10 11:06:17', 'active'),
(5, 'edv', 'edv@g.c', '$2a$10$Iv/4zrIHBg9jCtExbKa.Me93zq9a9ZBcHutbMz9kjCy6rPaf6yp62', '123', 1, '2025-02-10 11:06:29', 'active'),
(6, 'asd', 'asd@g.c', '$2a$10$PBzLPUKGYDFvGdXdmIbTIeGDr7m3ixvKk5BVr99FeQDmMlGmuF0ci', '123', 1, '2025-02-11 13:46:35', 'active'),
(7, 'sdfks', 'sdfksf@g.c', '$2a$10$n5/cfWWLTIY4XHTW0RqT5u/guN24JuDFGh0Jy/ODt3r0CgeHXiuP6', '1342', 1, '2025-02-17 08:19:59', 'active'),
(8, 'david', 'david@g.c', '$2a$10$/P6koo76igcXzaUpVP7Y/.QloUe2OYyfWNDa1gWVGEkF10PNRNER6', '123', 1, '2025-02-18 09:16:25', 'active'),
(9, 'teszt', 'teszt@g.c', '$2a$10$nhHwLZUrnBYkCNnR4svZSuklGRQHlTGUMMagtPKR1nuOs.b4wEfM6', '123', 1, '2025-02-18 09:19:10', 'active');

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
(3, 1, 12, '2025-02-10 11:53:48', 'r21b7kukiwc', 5),
(4, 1, 8, '2025-02-11 13:50:15', '4dxy5x9mxkh', 6),
(5, 1, 1, '2025-02-18 09:16:56', 'c31xgu7o4qv', 8),
(6, 1, 15, '2025-02-18 09:21:09', 'nbbznljn22', 9);


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
(0, 'admin', 'admin@admin.com', '$2a$10$OAAls9KPJ4mflgrVZeOCAuA.i6i/Y/20V8dUEGFuvceRjIPNRWY.O', '2025-02-14 11:54:26');
COMMIT;



--
-- Indexek a kiírt táblákhoz
--
CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `countdown_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `votes`
--

INSERT INTO `settings` (`id`, `countdown_date`) VALUES
(1, '2025-02-28 11:47:16');
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
-- A tábla indexei `terms_of_service`
--
ALTER TABLE `terms_of_service`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT a táblához `candidates`
--
ALTER TABLE `candidates`
  MODIFY `candidate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT a táblához `parties`
--
ALTER TABLE `parties`
  MODIFY `party_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT a táblához `terms_of_service`
--
ALTER TABLE `terms_of_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id_number` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT a táblához `votes`
--
ALTER TABLE `votes`
  MODIFY `vote_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
