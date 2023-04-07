<?php
include_once('../data/conect.php');

$method = $_POST["method"];

switch ($method) {
    case 'user--list':
        $consult = "SELECT * FROM users";
                    if ($result = mysqli_query($conect, $consult)) {
                        $id = array();
                        $user_mail = array();
                        $user_password = array();
                        $user_img = array();
                        $perm_level = array();
                        $i = 0;

                        while ($reg = mysqli_fetch_assoc($result)) {
                            $id[$i] = $reg['id'];
                            $user_mail[$i] = $reg['user_mail'];
                            $user_password[$i] = $reg['user_password'];
                            $user_img[$i] = $reg['user_img'];
                            $perm_level[$i] = $reg['perm_level'];

                            echo "
                            <tr class='table--item"." ".$i."'>
                                <td class='item--info table--col--1'>".$id[$i]."</td>
                                <td class='item--info table--col--2'>".$user_mail[$i]."</td>
                                <td class='item--info table--col--3'>".$user_password[$i]."</td>
                                <td class='item--info table--col--4'>".$perm_level[$i]."</td>
                                <td class='table--item--action'>
                                    <button class='table--user--config--button button--default' 
                                    data-id='".$id[$i]."' 
                                    data-01='".$user_mail[$i]."'
                                    data-02='".$user_password[$i]."'
                                    data-03='".$perm_level[$i]."'
                                    >
                                    <i class='fa-regular fa-circle-play'></i>
                                    </button>
                                    <button class='button--default'><i class='fa-regular fa-bookmark'></i></button>
                                </td>
                            </tr>
                           
                            ";


                            $i++;
                        }
                    }
        break;
    
    default:
        # code...
        break;
}




?>