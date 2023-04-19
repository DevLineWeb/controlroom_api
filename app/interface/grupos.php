<?php

include_once('../data/conect.php');
include_once('../log/log.php');

$local = $_POST['localidade'];
$getData = "SELECT * FROM rooms WHERE room_localidade = '$local' ORDER BY room_localidade ASC";
            

if ($result = mysqli_query($conect, $getData))  
{
    $id = array();
    $room_natureza = array();
    $room_localidade = array();
    $room_nomenclatura = array();
    $room_modelo = array();
    $room_patrimonio = array();
    $room_serie = array(); 
    $room_rede = array();
    $room_monitor = array();
    $room_cpu = array();
    $room_ram = array();
    $room_gpu = array();
    $room_disco = array();
    $room_cadeado = array();
    $room_cabo = array();
    $room_desempenho = array();
    $room_obser = array();
    $room_dataver = array();
    $i = 0;
    while ($reg = mysqli_fetch_assoc($result)) {
        $id[$i] = $reg['id'];
        $room_natureza[$i] = $reg['room_natureza'];
        $room_localidade[$i] = $reg['room_localidade'];
        $room_nomenclatura[$i] = $reg['room_nomenclatura'];
        $room_modelo[$i] = $reg['room_modelo'];
        $room_patrimonio[$i] = $reg['room_patrimonio'];
        $room_serie[$i] = $reg['room_serie'];
        $room_rede[$i] = $reg['room_rede'];
        $room_monitor[$i] = $reg['room_monitor'];
        $room_cpu[$i] = $reg['room_cpu'];
        $room_ram[$i] = $reg['room_ram'];
        $room_gpu[$i] = $reg['room_gpu'];
        $room_disco[$i] = $reg['room_disco'];
        $room_cadeado[$i] = $reg['room_cadeado'];
        $room_cabo[$i] = $reg['room_cabo'];
        $room_desempenho[$i] = $reg['room_desempenho'];
        $room_obser[$i] = $reg['room_obser'];
        $room_dataver[$i] = $reg['room_dataver'];
    echo "
    <button class='grid--edit--button'
        data-id='".$id[$i]."'
        data-01='".$room_natureza[$i]."'
        data-02='".$room_localidade[$i]."'
        data-03='".$room_nomenclatura[$i]."'
        data-04='".$room_modelo[$i]."'
        data-05='".$room_patrimonio[$i]."'
        data-06='".$room_serie[$i]."'
        data-07='".$room_rede[$i]."'
        data-08='".$room_cpu[$i]."'
        data-09='".$room_gpu[$i]."'
        data-10='".$room_ram[$i]."'
        data-11='".$room_disco[$i]."'
        data-12='".$room_monitor[$i]."'
        data-13='".$room_cadeado[$i]."'
        data-14='".$room_cabo[$i]."'
        data-15='".$room_dataver[$i]."'
        data-16='".$room_desempenho[$i]."'
        data-17='".$room_obser[$i]."'
        onclick='openModalEdit();'
        >".$room_nomenclatura[$i]."</button>
";


$i++;
    }
}
else {
    echo "ERRO! Veja o log de eventos";
}
