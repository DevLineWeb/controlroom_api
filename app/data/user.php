<?php 
include_once('./conect.php');
include_once('../log/log.php');


    session_start();

    // echo print_r(scandir(session_save_path()));
    if(isset($_SESSION["mail"])) {
        $verify = "SELECT * FROM users WHERE user_mail = '{$_SESSION["mail"]}'";
        $result = mysqli_query($conect, $verify);
        $row= mysqli_fetch_array($result);
        $password = $row['user_password'];

        echo "
        <label for='session--user'>Usuário: </label>
        <input type='text' name='' id='session--user' value='".$_SESSION["mail"]."' disabled>
        <label for='session--password'>Senha: </label>
        <input type='password' name='' id='session--password' value='".md5($password)."' type='password'>
    ";
    }
    else{
        echo "invalid";
        LogToDatabase('load erro', $mode = 'ERRO');
    }

?>