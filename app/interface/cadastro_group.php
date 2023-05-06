<?php
include_once('../data/conect.php');
include_once('../log/log.php');
session_start();

$group_name = $_POST['groupName'];

$insertGroup = mysqli_query($conect,"INSERT INTO groups(group_name)
    VALUES ('$group_name')");

if($insertGroup) {
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
        <div class='modal--footer'>
            <button class='button--modal request--feedback--button' onclick='closeModal()'>  <i class='fa-solid fa-check'></i> </button>
        </div>
    </div>
    ";
    LogToDatabase('added a new group: '.$group_name, $mode = 'NOTICE', $object = $group_name);
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
        <div class='modal--footer'>
            <button class='button--modal request--feedback--button' onclick='closeModal()'>  <i class='fa-solid fa-check'></i> </button>
        </div>
    </div>
    ";
    LogToDatabase('error on added a new group: '.$group_name, $mode = 'ERROR', $object = $group_name);
}