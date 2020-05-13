<?php

	require('connexpdo.inc.php');
	
	$pdo = connexpdo('EDT');
	
	$qry = 'SELECT * FROM teachercourse';
	$stt = $pdo->query($qry);
	
	$res = [];
	
	while($record=$stt->fetch(PDO::FETCH_ASSOC)) {
		array_push($res, $record);
	}
	
	echo json_encode($res);

?>
