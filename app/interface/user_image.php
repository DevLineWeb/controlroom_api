<?php 
include_once('../data/conect.php');
include_once('../log/log.php');
session_start();
    // echo print_r(scandir(session_save_path()));
    if(isset($_SESSION["mail"])) {
        $verify = "SELECT * FROM users WHERE user_mail = '{$_SESSION["mail"]}'";
        $result = mysqli_query($conect, $verify);
        $row= mysqli_fetch_array($result);
        $user_img = $row['user_img'];
        echo "
                ../app/data/users_images/".$user_img."
        ";
    }
    else{
        echo "invalid";
        LogToDatabase('load error', $mode = 'ERRO');
    }

?>