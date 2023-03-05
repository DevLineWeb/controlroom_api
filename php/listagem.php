<?php
include_once('./conect.php');

$method = $_POST["method"];

switch ($method) {
    case 'item--list':
        $consult = "SELECT * FROM rooms";
                    if ($result = mysqli_query($conect, $consult)) {
                        $id = array();
                        $room_natureza = array();
                        $room_localidade = array();
                        $room_nomenclatura = array();
                        $room_modelo = array();
                        $room_patrimonio = array();
                        $room_serie = array(); 
                        $room_rede = array();
                        $room_monitor = array();
                        $room_cpu = array();
                        $room_ram = array();
                        $room_gpu = array();
                        $room_disco = array();
                        $room_cadeado = array();
                        $room_cabo = array();
                        $room_desempenho = array();
                        $room_obser = array();
                        $room_dataver = array();
                        $i = 0;

                        while ($reg = mysqli_fetch_assoc($result)) {
                            $id[$i] = $reg['id'];
                            $room_natureza[$i] = $reg['room_natureza'];
                            $room_localidade[$i] = $reg['room_localidade'];
                            $room_nomenclatura[$i] = $reg['room_nomenclatura'];
                            $room_modelo[$i] = $reg['room_modelo'];
                            $room_patrimonio[$i] = $reg['room_patrimonio'];
                            $room_serie[$i] = $reg['room_serie'];
                            $room_rede[$i] = $reg['room_rede'];
                            $room_monitor[$i] = $reg['room_monitor'];
                            $room_cpu[$i] = $reg['room_cpu'];
                            $room_ram[$i] = $reg['room_ram'];
                            $room_gpu[$i] = $reg['room_gpu'];
                            $room_disco[$i] = $reg['room_disco'];
                            $room_cadeado[$i] = $reg['room_cadeado'];
                            $room_cabo[$i] = $reg['room_cabo'];
                            $room_desempenho[$i] = $reg['room_desempenho'];
                            $room_obser[$i] = $reg['room_obser'];
                            $room_dataver[$i] = $reg['room_dataver'];

                            echo "
                            <tr>
                                <td>".$room_natureza[$i]."</td>
                                <td>".$room_localidade[$i]."</td>
                                <td>".$room_nomenclatura[$i]."</td>
                                <td>".$room_modelo[$i]."</td>
                                <td>FSG-".$room_patrimonio[$i]."</td>
                                <th><button class='button--default'><i class='fa-solid fa-gear'></i></button></th>
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