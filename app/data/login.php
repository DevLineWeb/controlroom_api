<?php

include_once('./conect.php');
include_once('../log/log.php');

session_start();

if (empty($_POST['mail']) || empty($_POST['password'])) { //SE NÃO FOR INFORMADO USUÁRIO E SENHA
    echo "
    <div class='request--feedback--info'>
        <div class='modal--legend'>
            <legend>Aviso!</legend>
        </div>
        <div class='box--line'>
            <div class='box--col'>
                <P>Digite o usuário e a senha!</P>
            </div>
        </div>
        <div class='modal--footer'>
            <button class='button--modal request--feedback--button' onclick='closeModal()'>  <i class='fa-solid fa-check'></i> </button>
        </div>
    </div>
    ";
    logger('error when trying to login, user and password NULL', $mode = 'error');

    exit();
}

$user = mysqli_real_escape_string($conect, $_POST['mail']); //ATRIBUI O USUÁRIO PARA UMA VARIÁVEL STRING
$pass = mysqli_real_escape_string($conect, $_POST['password']); //ATRIBUI A SENHA PARA UMA VARIÁVEL STRING

$verify = "SELECT * FROM users WHERE user_mail = '{$user}' AND user_password = '{$pass}'"; //VERIFICA SE O USUÁRIO E SENHA SÃO AUTENTICADOS NO BANCO

$result = mysqli_query($conect, $verify); //ATRIBUI O RESULTADO A UMA VARIÁVEL

$row = mysqli_num_rows($result); //ATRIBUI O RESULTADO A UMA LINHA DO BANCO

if ($row == 1) { //SE UMA LINHA FOI ENCONTRADA
    $_SESSION['mail'] = $user; //CRIA A SESSÃO EMAIL E ATRIBUI A ELA UMA VARIÁVEL USER
    echo "valid";
    logger($_SESSION["mail"].' '.'has logged in');
    exit();
} else {
    $_SESSION['not_autenticate'] = true; //SE NÃO FOR AUTENTICADO ATRIBUI UM VALOR BOOLEANO TRUE
    echo "
    <div class='request--feedback--info'>
        <div class='modal--legend'>
            <legend>Aviso!</legend>
        </div>
        <div class='box--line'>
            <div class='box--col'>
                <P>Usuário e/ou senha incorretos!</P>
            </div>
        </div>
        <div class='modal--footer'>
            <button class='button--modal request--feedback--button' onclick='closeModal()'>  <i class='fa-solid fa-check'></i> </button>
        </div>
    </div>
    ";
    logger($_POST["mail"].' '.'tried to login but wrong username or password', $mode = 'error');

}

?>
