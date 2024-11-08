<?php
// Cookie-k törlése
setcookie("user_email", "", time() - 3600, "/"); // Cookie törlése
setcookie("logged_in", "", time() - 3600, "/"); // Cookie törlése

// Átirányítás a bejelentkezési oldalra
header("Location: login.html");
exit;
?>
