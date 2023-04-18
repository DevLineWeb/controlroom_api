<?php

    include_once('../data/conect.php');
    session_start();

    $id = $_POST['id'];
    $user_name = $_POST['user_name'];
    $user_password = $_POST['user_password'];
    $user_perm = $_POST['user_perm'];
    $user_unit = $_POST['user_unit'];

    $updateUser = mysqli_query($conect,"UPDATE users SET
    user_name = '$user_name', 
    perm_level = '$user_perm', 
    unit_id = '$user_unit', 
    user_password = '$user_password'
    WHERE id = $id");

    if($updateUser) {
        echo "
        <div class='request--feedback--info'>
        <div class='modal--legend'>
            <legend>Aviso!</legend>
        </div>
        <div class='box--line'>
            <div class='box--col'>
                <P>Dados atualizados!</P>
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
                <P>Erro ao editar usuário!</P>
            </div>
        </div>
        <div class='box--line'>
            <button class='button--submit request--feedback--button' onclick='closeModal()'> OK </button>
        </div>
    </div>
        ";
    }