<?php
include_once('../data/conect.php');
include_once('../log/log.php');

session_start();
$id = $_POST['id'];
$nomenclatura = $_POST['nomenclatura'];
$data_envio = date('Y-m-d');

$deleteRoom = mysqli_query($conect,"DELETE FROM rooms WHERE id = '$id'");

// $update = $conect->query($insertRoom);

if($deleteRoom) {
    echo "
    <div class='request--feedback--info'>
        <div class='modal--legend'>
            <legend>Aviso!</legend>
        </div>
        <div class='box--line'>
            <div class='box--col'>
                <P>Delete!</P>
            </div>
        </div>
        <div class='modal--footer'>
            <button class='button--modal request--feedback--button' onclick='closeModal()'> <i class='fa-solid fa-check'></i></button>
        </div>
    </div>
    ";
    logger($_SESSION['mail'].'deleted the room: '.$nomenclatura, $mode = 'NOTICE');
    LogToDatabase('deleted the room: '.$nomenclatura, $mode = 'NOTICE', $object = $nomenclatura);

}
else {
    echo "
    <div class='request--feedback--info'>
        <div class='modal--legend'>
            <legend>Aviso!</legend>
        </div>
        <div class='box--line'>
            <div class='box--col'>
                <P>Error on delete!</P>
            </div>
        </div>
        <div class='modal--footer'>
            <button class='button--modal request--feedback--button' onclick='closeModal()'> <i class='fa-solid fa-check'></i></button>
        </div>
    </div>
    ";
    logger($_SESSION['mail'].'error in deleted the room: '.$id, $mode = 'ERROR');
    LogToDatabase('error in deleted the room: '.$id, $mode = 'ERROR', $object = $sala);

}