<?php
// Not sure on a folder/file structure so I just slapped this here.
class Auth {
    private $db;
    private $timeout = 1800;
    private $users = [];

    public function __construct($db) {
        $this->db = $db;

        // Using simple json file for a fake database atm.
        if (file_exists($this->db)) {
            $decodedJson = json_decode(file_get_contents($this->db), true);
            $this->users = $decodedJson ?? [];
        } else {
            throw new Exception("DB file was not found");
        }
    }

    public function login($username, $password) {
        foreach ($this->users as $user) {
            if ($user["username"] === $username && password_verify($password, $user["password"])) {
                session_regenerate_id();  
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['username'] = $user['username'];
                $_SESSION['is_logged_in'] = true;
                $_SESSION['last_activity'] = time();
                return true;
            }
        }
        return false;
    }

    public function register($username, $password) {
        foreach ($this->users as $user) {
            if ($user["username"] === $username) {
                return "Username already exists!";
            }
        }

        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        $userId = count($this->users) + 1;
        $newUser = [
            'id' => $userId,
            'username' => $username,
            'password' => $hashedPassword
        ];

        $this->users[] = $newUser;

        file_put_contents($this->db, json_encode($this->users, JSON_PRETTY_PRINT));

        return $this->login($username, $password);
    }

    public function logout() {
        if (session_status() === PHP_SESSION_ACTIVE) {
            session_unset();
            session_destroy();
        }
    }

    public function isAuthenticated() {
        if (session_status() !== PHP_SESSION_ACTIVE || !isset($_SESSION["is_logged_in"])) {
            return false;
        }

        if (time() - $_SESSION["last_activity"] > $this->timeout) {
            $this->logout();
            return false;
        }

        $_SESSION["last_activity"] = time();
        return true;
    }

    public function getUsersUsername() {
        return $_SESSION["username"] ?? null;
    }
}
