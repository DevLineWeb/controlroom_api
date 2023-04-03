<?php 
include_once('./conect.php');
include_once('../log/log.php');

session_start();
logger($_SESSION["mail"].' logged out', $mode = 'INFO');
LogToDatabase('logged out', $mode = 'INFO');
session_destroy();


    echo "
    <div class='request--feedback--info'>
        <div class='modal--legend'>
            <legend>Warning!</legend>
        </div
        <div class='box--line'>
            <div class='box--col'>
                <P>Logout!</P>
            </div>
        </div>
        <div class='box--line'>
            <button class='button--submit request--feedback--button' onclick='closeModal()'> OK </button>
        </div>
    </div>
    ";

