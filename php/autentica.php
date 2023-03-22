<?php 
include_once('./conect.php');


    session_start();

    // echo print_r(scandir(session_save_path()));
    if(isset($_SESSION["mail"])) {
        echo "
        <div class='request--feedback--info'>
            <div class='modal--legend'>
                <legend>Warning!</legend>
            </div
            <div class='box--line'>
                <P>Session Start!".$_SESSION['mail']."</P>
                <button class='button--submit request--feedback--button' onclick='closeModal()'> OK </button>
            </div>
        </div>
    ";
    }
    else{
        echo "invalid";
    }

?>