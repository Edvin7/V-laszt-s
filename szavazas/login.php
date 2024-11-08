<?php
// database.php - Fájl, amelyben a DB kapcsolati részleteit tároljuk
$servername = "localhost"; // Általában localhost
$username = "root"; // XAMPP alapértelmezett felhasználó
$password = ""; // XAMPP alapértelmezett jelszó üres
$dbname = "szavazas"; // Az adatbázis neve

// Kapcsolódás az adatbázishoz
$conn = new mysqli($servername, $username, $password, $dbname);

// Ellenőrizzük a kapcsolatot
if ($conn->connect_error) {
    die("Kapcsolati hiba: " . $conn->connect_error);
}

// Ellenőrizzük, hogy a forma be van-e küldve
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['your_name']; // Az email cím a bejelentkezési űrlapról
    $pass = $_POST['your_pass']; // A jelszó a bejelentkezési űrlapról

    // SQL lekérdezés az email cím alapján
    $sql = "SELECT password FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    // Ellenőrizzük, hogy van-e találat
    if ($stmt->num_rows > 0) {
        // Ha találat van, lekérdezzük a jelszót
        $stmt->bind_result($hashed_password);
        $stmt->fetch();

        // Jelszó ellenőrzése
        if (password_verify($pass, $hashed_password)) {
            // Jelszó helyes, állítsuk be a cookie-t
            setcookie("user_email", $email, time() + (86400 * 30), "/"); // 30 napig él
            setcookie("logged_in", "true", time() + (86400 * 30), "/"); // 30 napig él

            // Átirányítás a page.html oldalra
            header("Location: page.php");
            exit; // Fontos, hogy a script ne folytatódjon
        } else {
            // Jelszó helytelen
            echo "Hiba: A jelszó helytelen.";
        }
    } else {
        // Nincs találat az email címre
        echo "Hiba: A megadott email cím nem található.";
    }

    // Kapcsolat lezárása
    $stmt->close();
}
$conn->close();
?>
