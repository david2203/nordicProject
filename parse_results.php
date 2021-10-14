<?php




$conn = mysqli_connect("localhost", "root", "", "nordic_bet_db");
$sql_init = "TRUNCATE TABLE results";
mysqli_query($conn, $sql_init);
if ($conn->connect_errno) {
    printf("Connect failed: %s\n", $conn->connect_error);
    exit();
}

$affectedRow = 0;
$uppdatedRow = 0;

$xml = simplexml_load_file("result_filtered.xml") or die("Error: Cannot create object");

foreach ($xml->events as $events) {
    
    foreach ($events->event as $event) {
        $event_id = $event['id'];
        $name = $event['name'];
        $explodeNames = explode("-", $name);
        $home_team = $explodeNames[0];
        $away_team = $explodeNames[1];
    
        $sql = "INSERT INTO results(event_id, home_team, away_team) VALUES ('" . $event_id . "', '" . $home_team. "','" . $away_team . "')";
        
        mysqli_query($conn, $sql);
        
        if (! empty($result)) {
            $affectedRow ++;
        } else {
            $error_message = mysqli_error($conn) . "\n";
        }

        $homeresults = $event->results[0];
        $awayresults = $event->results[1];
        $homeparticipant = $homeresults['participantname'];
        $awayparticipant = $awayresults['participantname'];

        // $homeparticipantid = $homeresults['participantid'];
        // echo "Participant 1: " . $homeparticipant . "<br>";

        foreach($homeresults->result as $result) {
            if ($result["type"] == "finalresult") {
                $homeresult = $result["value"];
            }
        }
        foreach($awayresults->result as $result) {
            if ($result["type"] == "finalresult") {
                $awayresult = $result["value"];
            }
        }
        
        if ((int)($homeresult) > (int)($awayresult)) {
            $result_winner = $homeparticipant;
            
        }
        else if ((int)$homeresult < (int)$awayresult) {
            $result_winner = $awayparticipant;
           

        }
        else if ((int)$awayresult == (int)$homeresult){
            $result_winner = "X";
            
        }
        
        $sql1 = "UPDATE results SET home_goals = $homeresult WHERE event_id = $event_id";
        mysqli_query($conn, $sql1 );
        $sql2 = "UPDATE results SET away_goals = $awayresult WHERE event_id = $event_id";
        mysqli_query($conn, $sql2 );
        $sql10 = "UPDATE results SET winner_team = '$result_winner' WHERE event_id = $event_id";
        mysqli_query($conn, $sql10);

        $uppdatedRow ++;



    }
    
}


?>
<h2>Insert XML Data to MySql Table Output</h2>
<?php
if ($affectedRow > 0) {
    $message = $affectedRow . " records inserted" . $uppdatedRow . "updated rows";
} else {
    $message = "No records inserted";
}

echo $message;