<?php 

include_once('../data/conect.php');


    session_start();

    // echo print_r(scandir(session_save_path()));
    $consult = "SELECT * FROM events WHERE events_user = '{$_SESSION["mail"]}' ORDER BY id DESC LIMIT 10";
    if ($result = mysqli_query($conect, $consult)) {
        $id = array();
        $events_protocol = array();
        $events_message = array();
        $events_date = array();
        $opened_msg = array();
        $i = 0;

        while ($reg = mysqli_fetch_assoc($result)) {
            $id[$i] = $reg['id'];
            $events_protocol[$i] = $reg['events_protocol'];
            $events_message[$i] = $reg['events_message'];
            $events_date[$i] = strtotime($reg['events_date']);
            $opened_msg[$i] = $reg['opened_msg'];
            if ($opened_msg[$i]==0) {$opened_msg[$i] = "new";}
            if ($opened_msg[$i]==1) {$opened_msg[$i] = "";}
            echo "
                <div class='notify--item ".$opened_msg[$i]."' data-list='".$i."' data-id='".$id[$i]."'>
                    <div>".date("d/m/Y h:i:s",$events_date[$i])."</div>
                    <div>".$events_protocol[$i]."</div>
                    <div>".$events_message[$i]."</div>
                </div>
            ";
            $i++;
        }
    }
                
?>