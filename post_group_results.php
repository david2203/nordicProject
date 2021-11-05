<?php




$conn = mysqli_connect("localhost", "root", "", "nordic_bet_db");
$sql_init = "TRUNCATE TABLE results";
mysqli_query($conn, $sql_init);
if ($conn->connect_errno) {
    printf("Connect failed: %s\n", $conn->connect_error);
    exit();
}


$data16 = new stdClass;
$data16 ->

$data16 = {
    Round of 16

(37) Jun/25 15:00   Switzerland  4-5 pen. 1-1 a.e.t. (0-0)  Poland            @ Stade Geoffroy-Guichard, Saint-Étienne
(38) Jun/25 18:00   Wales        1-0                  Northern Ireland  @ Parc des Princes, Paris
(39) Jun/25 21:00   Croatia      0-1 a.e.t. (0-0)    Portugal          @ Stade Bollaert-Delelis, Lens

(40) Jun/26 15:00   France       2-1              Ireland           @ Parc Olympique Lyonnais, Lyon
(41) Jun/26 18:00   Germany      3-0              Slovakia          @ Stade Pierre-Mauroy, Lille
(42) Jun/26 21:00   Hungary      0-4              Belgium           @ Stadium Municipal, Toulouse

(43) Jun/27 18:00   Italy        2-0              Spain             @ Stade de France, Saint-Denis
(44) Jun/27 21:00   England      1-2              Iceland           @ Allianz Riviera, Nice

}

$dataQuarter = {
    Quarter-finals

(45) Jun/30 21:00   Poland       3-5 pen. 1-1 a.e.t. (0-0)   Portugal          @ Stade Vélodrome, Marseille
(46) Jul/01 21:00   Wales        3-1              Belgium           @ Stade Pierre-Mauroy, Lille
(47) Jul/02 21:00   Germany      6-5 pen. 1-1 a.e.t. (0-0)   Italy             @ Nouveau Stade de Bordeaux, Bordeaux
(48) Jul/03 21:00   France       5-2              Iceland           @ Stade de France, Saint-Denis
}
$dataSemi = {
    Semi-finals

(49) Jul/06 21:00   Portugal     2-0              Wales             @ Parc Olympique Lyonnais, Lyon
(50) Jul/07 21:00   Germany      0-2              France            @ Stade Vélodrome, Marseille

}

$dataFinal = {
    Final

(51) Jul/10 21:00   Portugal     1-0 a.e.t. (0-0)     France            @ Stade de France, Saint-Denis
}

}