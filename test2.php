<?php




$xmldata = simplexml_load_file("filtered_result.xml") or die("Failed to load");



foreach ($xmldata->events as $events) {

    echo "</br></br>" . $events["id"] . ", ";

    echo $events["ut"] . ", ";

    echo $events["league"] . "<br>";



    foreach ($events->event as $event) {

        echo "</br>" . $event["id"] . ", ";

        echo $event["name"] . ", ";

        echo $event["date"] . ", ";

        echo $event["round"] . ", ";

        echo $event["status"] . "<br>";




        foreach ($event->results as $results) {

            echo $results["participantid"] . ", ";

            echo $results["participantname"] . ",";

            foreach ($results->result as $result) {

                echo $result["id"] . ", ";

                echo $result["type"] . ", ";

                echo $result["value"] . "</br>";
            }
        }

        foreach ($event->incidents as $incidents) {

            echo $incidents["participantid"] . ", ";

            echo $incidents["participantname"] . ",";

            foreach ($incidents->incident as $incident) {

                echo $incident["id"] . ", ";

                echo $incident["type"] . ", ";

                echo $incident["playerid"] . ", ";

                echo $incident["elapsed"] . ", ";

                echo $incident["incident_typeFK"] . "</br>";
            }
        }
    }
}
