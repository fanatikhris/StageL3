<?php

	require('connexpdo.inc.php');
	
	$pdo = connexpdo('EDT');
	
	$qry = 'SELECT * FROM teachers';
	$stt = $pdo->query($qry);
	
	$res = [];
	
	while($record=$stt->fetch(PDO::FETCH_NUM)) {
		array_push($res, $record[0]);
	}
	
	echo json_encode($res);

?>
