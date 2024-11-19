<?php ob_start();
if (session_status() === PHP_SESSION_NONE) {
    session_start(); 
}
?>

<html>
<head>
    <meta charset="UTF-8">
    <title>Projects Board - wwwdev.cc</title>
    <meta name="description" content="wwwdev.cc showcase of projects that are seeking collaborators">
    <link rel="stylesheet" href="style.css?v=3.0">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>
    <nav class="navbar">
        <ul>
            <a href="/">Home</a>
            <div>
                <?php if (isset($_SESSION['is_logged_in']) && $_SESSION['is_logged_in'] === true): ?>
            <li>
                <a href="/logout.php">Logout</a> 
            </li>
            <?php else: ?>
            <li>
                <a href="/login.php">Login</a>  
            </li>
            <li>
                <a href="/register.php">Register</a> 
            </li>
            <?php endif; ?>
            </div>

        </ul>
            

    </nav>
</body>
</html>
