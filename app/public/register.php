<?php include "header.php";
require_once "../src/auth/Auth.php";

$auth = new Auth("../data/users.json");

if ($auth->isAuthenticated()) {
    header("Location: index.php");
    exit;
}

$error = '';

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["action"]) && $_POST['action'] === "register") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $registerResult = $auth->register($username, $password);

    if ($registerResult === true) {
        header("Location: index.php");
        exit;
    } else {
        $error = $registerResult;
    }
}
?>

<div class="content">
    <form method="POST" action="register.php">
        <h1>Register</h1>
        <?php if (!empty($error)): ?>
            <p style="color: red;"><?= htmlspecialchars($error); ?></p>
        <?php endif; ?>
        
        <label for="username">Username:</label>
        <input type="text" name="username" id="username" required>
        <br>

        <label for="password">Password:</label>
        <input type="password" name="password" id="password" required>
        <br>

        <input type="hidden" name="action" value="register">
        <input type="submit" value="Register">
    </form>
</div>

<?php include "footer.php"; ?>
