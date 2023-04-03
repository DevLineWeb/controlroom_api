<?php
include_once('../data/conect.php');
include_once('../log/log.php');
session_start();

$id = $_POST['id'];
$natureza = $_POST['natureza'];
$local = $_POST['localidade'];
$sala = $_POST['sala'];
$modelo = $_POST['modelo'];
$patrimonio = $_POST['patrimonio'];
$numSerie = $_POST['numSerie'];
$rede = $_POST['rede'];
$monitor = $_POST['monitor'];
$gpu = $_POST['gpu'];
$ram = $_POST['ram'];
$disco = $_POST['disco'];
$cpu = $_POST['cpu'];
$cadeado = $_POST['cadeado'];
$caboAco = $_POST['caboAco'];
$desempenho = $_POST['desempenho'];
$obs = $_POST['obs'];
$data_envio = date('Y-m-d');

$updateRoom = mysqli_query($conect,"UPDATE rooms SET
    room_natureza = '$natureza', 
    room_localidade = '$local', 
    room_nomenclatura = '$sala', 
    room_modelo = '$modelo', 
    room_patrimonio = '$patrimonio', 
    room_serie = '$numSerie', 
    room_rede = '$rede', 
    room_monitor = '$monitor', 
    room_cpu = '$cpu', 
    room_ram = '$ram', 
    room_gpu = '$gpu', 
    room_disco = '$disco', 
    room_cadeado = '$cadeado', 
    room_cabo = '$caboAco', 
    room_desempenho = '$desempenho',
    room_obser = '$obs', 
    room_dataver = '$data_envio'
    WHERE id = $id");

// $update = $conect->query($insertRoom);

if($updateRoom) {
    echo "
    <div class='request--feedback--info'>
        <div class='modal--legend'>
            <legend>Aviso!</legend>
        </div>
        <div class='box--line'>
            <div class='box--col'>
                <P>Updated!</P>
            </div>
        </div>
        <div class='box--line'>
            <button class='button--submit request--feedback--button' onclick='closeModal()'> OK </button>
        </div>
    </div>
    ";
    logger($_SESSION['mail'].'edited room: '.$sala.'', $mode = 'NOTICE');
    LogToDatabase('edited room: '.$sala, $mode = 'NOTICE');

}
else {
    echo "
    <div class='request--feedback--info'>
        <div class='modal--legend'>
            <legend>Aviso!</legend>
        </div>
        <div class='box--line'>
            <div class='box--col'>
                <P>Error on update!</P>
            </div>
        </div>
        <div class='box--line'>
            <button class='button--submit request--feedback--button' onclick='closeModal()'> OK </button>
        </div>
    </div>
    ";
    logger($_SESSION['mail'].' failed to edited room: '.$sala.'', $mode = 'NOTICE');
    LogToDatabase('failed to edited room: '.$sala, $mode = 'NOTICE');
}