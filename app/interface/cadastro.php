<?php
include_once('../data/conect.php');
include_once('../log/log.php');
session_start();

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

$insertRoom = mysqli_query($conect,"INSERT INTO rooms(
    room_natureza, 
    room_localidade, 
    room_nomenclatura, 
    room_modelo, 
    room_patrimonio, 
    room_serie, 
    room_rede, 
    room_monitor, 
    room_cpu, 
    room_ram, 
    room_gpu, 
    room_disco, 
    room_cadeado, 
    room_cabo, 
    room_desempenho,
    room_obser, 
    room_dataver) 
        VALUES(
        '$natureza',
        '$local',
        '$sala', 
        '$modelo',
        '$patrimonio',
        '$numSerie', 
        '$rede', 
        '$monitor', 
        '$cpu', 
        '$ram', 
        '$gpu', 
        '$disco', 
        '$cadeado', 
        '$caboAco', 
        '$desempenho', 
        '$obs', 
        '$data_envio')");

// $update = $conect->query($insertRoom);

if($insertRoom) {
    echo "
    <div class='request--feedback--info'>
        <div class='modal--legend'>
            <legend>Aviso!</legend>
        </div>
        <div class='box--line'>
            <div class='box--col'>
                <P>Cadastro realizado!</P>
            </div>
        </div>
        <div class='box--line'>
            <button class='button--submit request--feedback--button' onclick='closeModal()'> OK </button>
        </div>
    </div>
    ";
    logger($_SESSION['mail'].' added a new room: '.$sala, $mode = 'NOTICE');
    LogToDatabase('added a new room: '.$sala, $mode = 'NOTICE', $object = $sala);
}
else {
    echo "
    <div class='request--feedback--info'>
        <div class='modal--legend'>
            <legend>Aviso!</legend>
        </div>
        <div class='box--line'>
            <div class='box--col'>
                <P>Erro ao cadastrar!</P>
            </div>      
        </div>
        <div class'box--line'>
            <button class='button--submit request--feedback--button' onclick='closeModal()'> OK </button>
        </div>
    </div>
    ";
    logger($_SESSION['mail']. ' error on added a new room: '.$sala, $mode = 'ERROR');
    LogToDatabase('error on added a new room: '.$sala, $mode = 'ERROR', $object = $sala);
}


?>