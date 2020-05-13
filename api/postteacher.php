<?php
    require('connexpdo.inc.php');
    $postdata = file_get_contents("php://input");
    if(isset($postdata) && !empty($postdata)){
        $dataarray = json_decode($postdata);
        $pdo = connexpdo('EDT');
	$id = $pdo->quote($dataarray->id);
        $qry = "INSERT INTO teachers VALUES ($id)";
        $stt = $pdo->exec($qry);
	$pdo = null;
	echo json_encode($dataarray);
    } else {
        http_response_code(422);
    }
    
?>
