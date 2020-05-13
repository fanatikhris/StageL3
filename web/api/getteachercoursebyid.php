<?php

	require('connexpdo.inc.php');
	$postdata = file_get_contents("php://input");
  	if(isset($postdata) && !empty($postdata)){
        	$dataarray = json_decode($postdata);
	
		$pdo = connexpdo('EDT');
		$id = $pdo->quote($dataarray->id);

		$qry = "SELECT * FROM teachercourse where teacher = $id";
		$stt = $pdo->query($qry);
	
		$res = [];
	
		while($record=$stt->fetch(PDO::FETCH_NUM)) {
			array_push($res, $record[1]);
		}
	
		echo json_encode($res);
	} else {
        	http_response_code(422);
    	}

?>
