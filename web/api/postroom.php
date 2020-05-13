<?php
    require('connexpdo.inc.php');
    $postdata = file_get_contents("php://input");
    if(isset($postdata) && !empty($postdata)){
        $dataarray = json_decode($postdata);
        $pdo = connexpdo('EDT');
	$id = $pdo->quote($dataarray->id);
	$prises = $pdo->quote((int)$dataarray->prises);
	$labo = $pdo->quote((int)$dataarray->labo);
	$pc = $pdo->quote((int)$dataarray->pc);
        $qry = "INSERT INTO rooms VALUES ($id, $prises, $labo, $pc)";
        $stt = $pdo->exec($qry);
	$pdo = null;
	echo json_encode($dataarray);
    } else {
        http_response_code(422);
    }
    
?>
