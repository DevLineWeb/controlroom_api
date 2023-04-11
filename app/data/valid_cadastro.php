<?php

include './conect.php';

$method = $_POST['method'];
switch($method) {
    case 'select--group':

        $consult = "SELECT * FROM groups";
        if ($result = mysqli_query($conect, $consult)) {
            $id = array();
            $group_name = array();
            $unit_id = array();
            $i = 0;

            while ($reg = mysqli_fetch_assoc($result)) {
                $id[$i] = $reg['id'];
                $group_name[$i] = $reg['group_name'];
                $unit_id[$i] = $reg['unit_id'];

                echo "
                <option class='group--option' value='".$group_name[$i]."' data-01='".$unit_id[$i]."'>".$group_name[$i]."</option>
                ";
                $i++;
            }
            
        }
    break;      
}