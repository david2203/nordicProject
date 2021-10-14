<?php




$conn = mysqli_connect("localhost", "root", "", "nordic_bet_db");

if ($conn->connect_errno) {
    printf("Connect failed: %s\n", $conn->connect_error);
    exit();
}

$affectedRow = 0;

$xml = simplexml_load_file("result_filtered.xml") or die("Error: Cannot create object");

foreach ($xml->events->event as $event) {
    $id = $event['id'];
    $sql = "INSERT INTO results(id) VALUES ('" . $id . "')";
    
    $result = mysqli_query($conn, $sql);
    
    if (! empty($result)) {
        $affectedRow ++;
    } else {
        $error_message = mysqli_error($conn) . "\n";
    }
    
    $results = $events->results;
    $team = $results["participantname"];
    echo $team;
    // $sql = "INSERT INTO results(home_team) VALUES ('" . $team . "')";
    
        
    foreach ($results->result as $result) {
        $results = $events->results;
        $team = $results["participantname"];
        echo $team;
        
        $sql = "INSERT INTO results_result(id,type,value) VALUES ('" . $id . "','" . $type . "','" . $value . "')";
        
        $result = mysqli_query($conn, $sql);
        
        if (! empty($result)) {
            $affectedRow ++;
        } else {
            $error_message = mysqli_error($conn) . "\n";
        }
    }
}


?>
<h2>Insert XML Data to MySql Table Output</h2>
<?php
if ($affectedRow > 0) {
    $message = $affectedRow . " records inserted";
} else {
    $message = "No records inserted";
}

echo $message;