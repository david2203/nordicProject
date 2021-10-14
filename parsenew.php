<?php




$conn = mysqli_connect("localhost", "root", "", "nordic_bet_db");

if ($conn->connect_errno) {
    printf("Connect failed: %s\n", $conn->connect_error);
    exit();
}

$affectedRow = 0;

$xml = simplexml_load_file("result_filtered.xml") or die("Error: Cannot create object");

foreach ($xml->events as $events) {
    $id = $events['id'];
    $date = $events['ut'];
    $league = $events['league'];
    
    $sql = "INSERT INTO results_events(id,date,league) VALUES ('" . $id . "','" . $date . "','" . $league . "')";
    
    $result = mysqli_query($conn, $sql);
    
    if (! empty($result)) {
        $affectedRow ++;
    } else {
        $error_message = mysqli_error($conn) . "\n";
    }

    foreach ($events->event as $event) {
        $id = $event['id'];
        $name = $event['name'];
        $explodeNames = explode("-", $name);
        $home_team = $explodeNames[0];
        $away_team = $explodeNames[1];
    
        $sql = "INSERT INTO results(event_id, home_team, away_team) VALUES ('" . $id . "', '" . $home_team. "','" . $away_team . "')";
        
        $result = mysqli_query($conn, $sql);
        
        if (! empty($result)) {
            $affectedRow ++;
        } else {
            $error_message = mysqli_error($conn) . "\n";
        }
        
        foreach ($event->results as $results) {
            $participantid = $results['participantid'];
            $participantname = $results['participantname'];
            
            $sql = "INSERT INTO results_results(participantid,participantname) VALUES ('" . $participantid . "','" . $participantname . "')";
            
            $result = mysqli_query($conn, $sql);
            
            if (! empty($result)) {
                $affectedRow ++;
            } else {
                $error_message = mysqli_error($conn) . "\n";
            }

            foreach ($results->result as $result) {
                $id = $result['id'];
                $type = $result['type'];
                $value = $result['value'];
                
                $sql = "INSERT INTO results_result(id,type,value) VALUES ('" . $id . "','" . $type . "','" . $value . "')";
                
                $result = mysqli_query($conn, $sql);
                
                if (! empty($result)) {
                    $affectedRow ++;
                } else {
                    $error_message = mysqli_error($conn) . "\n";
                }
            }
        }
        foreach ($event->results as $results) {
            $event_id = $results['participantid'];
            
            
            $sql = "INSERT INTO results_results(participantid,participantname) VALUES ('" . $participantid . "','" . $participantname . "')";
            
            $result = mysqli_query($conn, $sql);
            
            if (! empty($result)) {
                $affectedRow ++;
            } else {
                $error_message = mysqli_error($conn) . "\n";
            }
        }
        foreach ($event->incidents as $incidents) {
            $participantid = $incidents['participantid'];
            $participantname = $incidents['participantname'];
            
            $sql = "INSERT INTO results_incidents(participantid,participantname) VALUES ('" . $participantid . "','" . $participantname . "')";
            
            $result = mysqli_query($conn, $sql);
            
            if (! empty($result)) {
                $affectedRow ++;
            } else {
                $error_message = mysqli_error($conn) . "\n";
            }


            foreach ($incidents->incident as $incident) {
                $id = $incident['id'];
                $type = $incident['type'];
                $playerid = $incident['playerid'];
                $player = $incident['player'];
                $elapsed = $incident['elapsed'];
                $incident_typeFK = $incident['incident_typeFK'];

                $sql = "INSERT INTO results_incident(id,type,playerid,player,elapsed,incident_typeFK) VALUES ('" . $id . "','" . $type . "','" . $playerid . "','" . $player. "','" . $elapsed . "','" . $incident_typeFK . "')";
                
                $result = mysqli_query($conn, $sql);
                
                if (! empty($result)) {
                    $affectedRow ++;
                } else {
                    $error_message = mysqli_error($conn) . "\n";
                }
            }
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