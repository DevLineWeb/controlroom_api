<?php 

include_once('../data/conect.php');


    session_start();

    // echo print_r(scandir(session_save_path()));
    $consult = "SELECT * FROM events WHERE events_user = '{$_SESSION["mail"]}' ORDER BY id DESC LIMIT 5";
    if ($result = mysqli_query($conect, $consult)) {
        $id = array();
        $events_protocol = array();
        $events_message = array();
        $events_date = array();
        $i = 0;

        while ($reg = mysqli_fetch_assoc($result)) {
            $id[$i] = $reg['id'];
            $events_protocol[$i] = $reg['events_protocol'];
            $events_message[$i] = $reg['events_message'];
            $events_date[$i] = $reg['events_date'];

            echo "
                <tr>
                    <td>".$events_protocol[$i]."</td>
                    <td>".$events_message[$i]."</td>
                    <td>".$events_date[$i]."</td>
                </tr>
            ";
            $i++;
        }
    }
                
?>