<?php 

include_once('../data/conect.php');

$id = $_POST['id'];

$updateMessage = mysqli_query($conect,"UPDATE events SET
    opened_msg = '1' WHERE id = '$id'");

if($updateMessage) {
    echo "";
}
else {
    echo "";
}
?>