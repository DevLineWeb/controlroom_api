<?php
include_once('../data/conect.php');
include_once('../log/log.php');
session_start();

$user_name = $_POST['user_name'];
$user_mail = $_POST['user_mail'];

$insertGroup = mysqli_query($conect,"INSERT INTO users(
    
    user_name, 
    user_mail)
    VALUES ( 
        '$group_name',
        '$user_mail')");

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
}