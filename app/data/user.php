<?php 
include_once('./conect.php');
include_once('../log/log.php');


    session_start();

    // echo print_r(scandir(session_save_path()));
    if(isset($_SESSION["mail"])) {
        $verify = "SELECT * FROM users WHERE user_mail = '{$_SESSION["mail"]}'";
        $result = mysqli_query($conect, $verify);
        $row= mysqli_fetch_array($result);
        $name = $row['user_name'];
        $unit_id = $row['unit_id'];
        $password = $row['user_password'];
        $perm_level = $row['perm_level'];
        $user_img = $row['user_img'];
        if ($perm_level==1){
            $perm_level='Admin';
        }else{
            $perm_level='User';
        };
        if ($user_img == "") {
            $user_img = "default-user-image.png";
        }
        echo "
        <div class='box--col user--image--box'>
            <img src='../app/data/users_images/".$user_img."' alt='' onclick='imageUpdateCase();'>
        </div>
        <div class='box--col'>
            <label for='session--user'>Usuário: </label>
            <input type='text' name='' id='session--user' value='".$_SESSION["mail"]."' disabled>
            <label for='session--name'>Nome: </label>
            <input type='text' name='' id='session--name' value='".$name."' type='password' disabled>
            <label for='session--password'>Permissão: </label>
            <input type='text' name='' id='session--level' value='".$perm_level."' type='password' disabled>
        </div>
        ";
    }
    else{
        echo "invalid";
    }

?>