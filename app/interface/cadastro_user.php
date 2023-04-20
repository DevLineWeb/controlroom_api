<?php
include_once('../data/conect.php');
include_once('../log/log.php');
session_start();

$user_name = $_POST['user_name'];
$user_mail = $_POST['user_mail'];
$user_unit = $_POST['user_unit'];
$user_perm = $_POST['user_perm'];
$user_pass = $_POST['user_pass'];

$insertGroup = mysqli_query($conect,"INSERT INTO users(
    user_name, 
    user_mail,
    unit_id,
    perm_level,
    user_password)
    VALUES ( 
        '$user_name',
        '$user_mail',
        '$user_unit',
        '$user_perm',
        '$user_pass')");

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