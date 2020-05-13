<?php
	require_once 'js.php';
    function connexpdo(string $db) {
        $sgbd = "mysql";
        $host = 'localhost';
        $user = 'root';
        $pass = '';
	try {
        $pdo = new PDO("$sgbd:host=$host;dbname=$db;charset=utf8", $user, $pass);
		$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		return $pdo;
	}
	catch (PDOException $e) {
        displayException($e);
        exit;
    }
	
    }

?>
