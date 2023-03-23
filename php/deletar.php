<?php
include_once('./conect.php');

$id = $_POST['id'];
$data_envio = date('Y-m-d');

$deleteRoom = mysqli_query($conect,"DELETE FROM rooms WHERE id = '$id'");

// $update = $conect->query($insertRoom);

if($deleteRoom) {
    echo "
    <div class='request--feedback--info'>
        <div class='modal--legend'>
            <legend>Aviso!</legend>
        </div
        <div class='box--line'>
            <div class='box--col'>
                <P>Deleted!</P>
            </div>
        </div>
        <div class='box--line'>
            <button class='button--submit request--feedback--button' onclick='closeModal()'> OK </button>
        </div>
    </div>
    ";
}
else {
    echo "
    <div class='request--feedback--info'>
        <div class='modal--legend'>
            <legend>Aviso!</legend>
        </div
        <div class='box--line'>
            <div class='box--col'>
                <P>Error on delete!</P>
            </div>
        </div>
        <div class='box--line'>
            <button class='button--submit request--feedback--button' onclick='closeModal()'> OK </button>
        </div>
    </div>
    ";
}