<?php
// Ellenőrizzük, hogy a felhasználó be van-e jelentkezve
if (!isset($_COOKIE['logged_in']) || $_COOKIE['logged_in'] !== 'true') {
    // A felhasználó nincs bejelentkezve, átirányítás a bejelentkezési oldalra
    header("Location: login.html");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    
    <title>Szavazz.hu</title>
    
    <link rel="stylesheet" href="indexstyle.css">
    <link rel="stylesheet" type="text/css" target="_blank" href="navbar.css" />
    <link rel="icon" type="image/x-icon" href="favico.ico">
    <link rel="stylesheet" href="partok.js">
    <link rel="stylesheet" href="/css/partok.css">
</head>
<body>
    <!--Navbar-->
    <nav class="navbar">
        <div class="logo">
            <img src="images/most.png" alt="logo" />
        </div>
        <ul>
            <li><a href="#">Szavazz</a></li>
            <li><a href="#">Statisztikák</a></li>
            <li><a href="#">Kapcsolat</a></li>
            <li><a href="loading.html" class="loginbutton">Bejelentkezés</a></li>
        </ul>
        <div class="hamburger">
            <span class="line"></span>
            <span class="line"></span>
            <span class="line"></span>
        </div>
    </nav>

    <div class="menubar">
        <ul>
            <li><a href="#">Kezdőlap</a></li>
            <li><a href="#">Szavazz</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Kapcsolat</a></li>
        </ul>
    </div>

    <!--Section-->
    <div class="flex-auto">
      <br>

<br>
        <div class="relative mt-8">
          <br>

            <div class="max-w-7xl mx-auto px-4 lg:px-8 ">
                <div class="relative shadow-xl rounded-2xl overflow-hidden bg-indigo-50 dark:bg-gray-900">
                    <div class="dark:hidden dark:sm:block absolute inset-0">
                        <img class="h-full w-full object-cover" src="images/proba.jpg" alt="Szavazó kép">
                        <div class="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-700 dark:from-gray-700 dark:to-gray-600 mix-blend-multiply"></div>
                    </div>
                    <div class="relative px-4 py-16 sm:px-6 sm:py-24 lg:pt-28 lg:pb-32 lg:px-8">
                        <h1 class="text-center sm:text-left text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl sm:ml-12">
                            <span class="block text-white">Szavazzon most</span>
                            <span class="block text-indigo-300">otthonról</span>
                        </h1>
                        <p class="mt-6 max-w-sm mx-auto sm:ml-12 text-center sm:text-left text-lg sm:text-xl text-indigo-200 sm:max-w-2xl">
                            Az online szavazás megkönnyíti a részvételt, lehetővé téve, hogy mindenki otthonról, kényelmesen szavazzon, így növelve a demokratikus folyamatokhoz való hozzáférést és a választási részvételt.
                        </p>
                        <div class="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-begin">
                            <div class="sm:ml-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <a href="vote.html" class="flex items-center justify-center rounded-md border border-transparent bg-white px-3 py-2 text-base font-medium text-indigo-700 shadow-sm hover:bg-indigo-50 sm:px-6">
                                    Szavazok
                                </a>
                                <a href="loading.html" class="flex items-center justify-center rounded-md border border-transparent bg-indigo-500 bg-opacity-60 px-3 py-2 text-base font-medium text-white shadow-sm hover:bg-opacity-70 sm:px-6">
                                    Bejelentkezés
                                </a>
                            </div>
                        </div>
                        <div class="hidden sm:block ml-12 text-sm mt-4 text-indigo-200">Regisztráljon vagy jelentkezzen be ha már van fiókja.</div>
                    </div>
                </div>
            </div>
        </div>
        <br>
<br>
<br>
<br>
        <!--Partok-->
        <section class="section2">
          <br>
            <h2 class="section-title">Kiemelt politikai <span class="szoszin">pártok</span></h2>
            <div class="section-divider"></div> <!-- Itt van a vonal -->
            <br>
            <div class="partok-container">
                <!-- FIDESZ panel -->
                <div class="part-panel">
                    <img src="images/fidesz.png" alt="FIDESZ">
                    <h3>FIDESZ</h3>
                    <p>A FIDESZ a nemzeti identitás erősítésére és a gazdasági növekedésre helyezi a hangsúlyt, illetve a családok támogatását tartja középpontban.</p>
                </div>

                <!-- Jobbik panel -->
                <div class="part-panel">
                    <img src="images/jobbik.png" alt="Jobbik">
                    <h3>Jobbik</h3>
                    <p>A Jobbik célja a nemzeti érdekek védelme, a hagyományos értékek erősítése, és a korrupció ellenes harc.</p>
                </div>

                <!-- Tisza panel -->
                <div class="part-panel">
                  <img src="images/tisza.png" alt="Jobbik">
                  <h3>Tisza</h3>
                  <p>A Tisza célja a nemzeti érdekek védelme, a hagyományos értékek erősítése, és a korrupció ellenes harc.</p>
                </div>
                <!-- LMP panel -->
                <div class="part-panel">
                  <img src="images/lmp.png" alt="Jobbik">
                  <h3>LMP</h3>
                  <p>A LMP célja a környezettudatos politikák előmozdítása és a fenntartható fejlődés támogatása.</p>
                </div>

            </div>
        </section>

<!--FAQ-->
    <div class="bg-indigo-100 dark:bg-gray-800">
        <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Készen áll dönteni a jövőről?<br>Adja le szavazatát most.</h2>
                <div class="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
                    <a href="/create/#poll" class="button is-primary">Információk a szavazásról</a>
                    <a href="/signup/" class="text-sm font-bold leading-6 text-gray-900 dark:text-white">Bejelentkezés<span aria-hidden="true">→</span></a>
                </div>
            </div>
    </div>      

        <!--Footer-->
        <footer>
            <div class="footer">
                <div class="row">
                    <ul>
                        <li><a href="#">Kapcsolat</a></li>
                        <li><a href="#">Szavazok</a></li>
                        <li><a href="#">Adatvédelmi szabályzat</a></li>
                        <li><a href="#">Általános Szerződési Feltételek</a></li>
                        <li><a href="#">Bejelentkezés</a></li>
                    </ul>
                </div>
                <div class="row">
                    Copyright © 2024 Szavazz.hu - Minden jog fenntartva || Készítette: Bodri Dávid, Pál Edvin
                </div>
            </div>
        </footer>

        <script src="navbar.js"></script>
    </body>

    <style>
     .szoszin{
      color: rgb(165 180 252);
     }
        .section2 {
            background-color: #033473; /*4342a9*/
            padding: 20px 0; /* Padding hozzáadása a szekcióhoz */
        }

        .section-title {
            text-align: center;
            font-size: 3em;
            margin: 20px 0;
            color: #fff; /* Kiemeltebb szín */
            font-weight: bold;
        }

        .section-divider {
            width: 15%; /* A vonal szélessége */
            height: 4px; /* A vonal magassága */
            background-color: white; /* Vonal színe */
            margin: 0 auto 20px auto; /* Középre igazítás */
            border-radius: 50px; /* Kerekítés */
        }

        .partok-container {
    display: flex;
    justify-content: center; /* Középre igazítás */
    padding: 20px; /* Padding hozzáadása */
    gap: 20px; /* Csökkentett gap, de még mindig van távolság */
    flex-wrap: wrap; /* Ha a panelek nem férnek el egy sorban, új sorba kerülnek */
}

.part-panel {
    background-color: #fff;
    width: calc(15% + 1cm); /* Változtasd meg a szélességet */
    max-width: 350px; /* Maximum szélesség beállítása */
    border-radius: 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
    position: relative;
    padding: 10px;
    text-align: center;
    cursor: pointer;
}

        .part-panel img {
            width: 100%; /* Kisebb kép méret */
            border-radius: 10px 10px 0 0; /* Kisebb kerekítés a képnél */
            margin-bottom: 1px; /* Kép és cím közötti távolság */
        }

        .part-panel h3 {
            margin: 50px 0; /* Kisebb margó */
            font-size: 2.2em; /* Csökkentett betűméret */
            color: #333;
            font-weight: bolder;
        }

        .part-panel p {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            color: #fff;
            padding: 10px; /* Csökkentett padding */
            text-align: center;
            border-radius: 10px; /* Kisebb kerekítés */
            transition: opacity 0.3s;
            opacity: 0;
        }

        .part-panel:hover {
            transform: scale(1.03); /* Kisebb méretváltozás a hover állapotban */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .part-panel:hover p {
            display: block;
            opacity: 1;
        }
    </style>
    
</html>
