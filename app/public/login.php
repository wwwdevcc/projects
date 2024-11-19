<?php include "header.php" ?>
<?php
require_once "../src/auth/Auth.php";

$auth = new Auth("../data/users.json");
if($auth->isAuthenticated()) {
	header("Location: index.php");
	exit;
}

if($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["action"]) && $_POST['action'] === "login") {
	// Redirect back home if honeypot field is checked.
	if(isset($_POST['hp'])) {
		header('Location: /');
		exit;
	}

	$username = $_POST['username'];
	$password = $_POST['password'];

	if($auth->login($username, $password)) {
		header("Location: index.php");
		exit;
	} else {
		$error = "Invalid username or password.";
	}
}

?>

	<div class="content">

    <form method="POST" action="login.php">
			  <h1>Login</h1>
				<?php if (!empty($error)): ?>
						<p style="color: red;"><?= htmlspecialchars($error); ?></p>
				<?php endif; ?>
        <label for="username">Username:</label>
        <input type="text" name="username" id="username" required autofocus>
        <br>
        <label for="password">Password:</label>
        <input type="password" name="password" id="password" required>
        <br>
        <input type="hidden" name="action" value="login">
		<input type="checkbox" class="hidden" name="hp" value=1></input>
        <input type="submit" value="Login"></input>
    </form>

	</div>
<?php include "footer.php" ?>
