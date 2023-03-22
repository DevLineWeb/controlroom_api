<?php

include_once('./conect.php');

session_start();
$_SESSION['filterActive'] = "active";

$natureza = $_POST['natureza'];
$rede = $_POST['rede'];
$monitor = $_POST['monitor'];
$gpu = $_POST['gpu'];
$ram = $_POST['ram'];
$disco = $_POST['disco'];
$cpu = $_POST['cpu'];
$cadeado = $_POST['cadeado'];
$caboAco = $_POST['caboAco'];
$desempenho = $_POST['desempenho'];
if($_SESSION['filterActive']) {
    
    $consult = "SELECT * FROM rooms WHERE
        room_natureza = '$natureza',
        room_rede = '$rede', 
        room_monitor = '$monitor', 
        room_cpu = '$cpu', 
        room_ram = '$ram', 
        room_gpu = '$gpu', 
        room_disco = '$disco', 
        room_cadeado = '$cadeado', 
        room_cabo = '$caboAco', 
        room_desempenho = '$desempenho'
        ";
    
}
else {

    $consult = "SELECT * FROM rooms";
}


















?>