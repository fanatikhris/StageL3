<?php
    $postdata = file_get_contents("php://input");
    if(isset($postdata) && !empty($postdata)){
        $dataarray = json_decode($postdata);
        
        $file = fopen('../dist/stageproject/'.$dataarray->file, 'w');
        fwrite($file, $dataarray->xml);
        fclose($file);
	echo json_encode($dataarray);
    } else {
        http_response_code(422);
    }
    
?>
