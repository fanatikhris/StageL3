<?php
    require('connexpdo.inc.php');
    $postdata = file_get_contents("php://input");
    if(isset($postdata) && !empty($postdata)){
        $dataarray = json_decode($postdata);
        $pdo = connexpdo('EDT');
	foreach ($dataarray as $tcourse) {
		$teacher = $pdo->quote($tcourse->teacher);
		$course = $pdo->quote($tcourse->course);
		$qry = "INSERT INTO teachercourse VALUES ($teacher, $course)";
		$stt = $pdo->exec($qry);
	}
	
        
        
	$pdo = null;
	echo json_encode($dataarray);
    } else {
        http_response_code(422);
    }
    
?>
