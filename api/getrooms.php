<?php

	require('connexpdo.inc.php');
	
	$pdo = connexpdo('EDT');
	
	$qry = 'SELECT * FROM rooms';
	$stt = $pdo->query($qry);
	
	$res = [];
	
	while($record=$stt->fetch(PDO::FETCH_NUM)) {
		array_push($res, $record);
	}
	
	echo json_encode($res);

?>
