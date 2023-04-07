<?php 
include_once('./conect.php');
include_once('../log/log.php');

    session_start();

    // echo print_r(scandir(session_save_path()));
    if(isset($_SESSION["mail"])) {
        echo "Bem vindo! ".$_SESSION['mail']."";
    }
    else{
        echo "invalid";
    }

?>