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
        $perm_level = $row['perm_level'];
        if ($perm_level==1){
            $perm_level='Admin';
        }else{
            $perm_level='User';
        };
        echo "
        <label for='session--user'>Usuário: </label>
        <input type='text' name='' id='session--user' value='".$_SESSION["mail"]."' disabled>
        <label for='session--password'>Permissão: </label>
        <input type='text' name='' id='session--level' value='".$perm_level."' type='password' disabled>
    ";
    }
    else{
        echo "invalid";
        LogToDatabase('load error', $mode = 'ERRO');
    }

?>