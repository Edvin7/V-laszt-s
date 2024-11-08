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
    $name = $_POST['name'];
    $email = $_POST['email'];
    $pass = $_POST['pass'];
    $re_pass = $_POST['re_pass'];
    $personal_id = $_POST['personal_id'];

    // Ellenőrzés, hogy a jelszavak egyeznek-e
    if ($pass !== $re_pass) {
        echo "A jelszavak nem egyeznek.";
        exit;
    }

    // Jelszó titkosítása
    $hashed_password = password_hash($pass, PASSWORD_DEFAULT);

    // SQL lekérdezés
    $sql = "INSERT INTO users (name, email, password, personal_id, created_at) VALUES (?, ?, ?, ?, NOW())";
    
    // Előkészítés
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $name, $email, $hashed_password, $personal_id);

    // Lekérdezés végrehajtása
    if ($stmt->execute()) {
        // Regisztráció sikeres, átirányítás a loading.html oldalra
        header("Location: loading.html");
        exit; // Fontos, hogy a script ne folytatódjon
    } else {
        echo "Hiba a regisztráció során: " . $stmt->error;
    }

    // Kapcsolat lezárása
    $stmt->close();
}
$conn->close();
?>
