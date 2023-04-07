<?php
include_once('../data/conect.php');

$method = $_POST["method"];
$methodGrid = $_POST["method"];

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
                            <tr class='table--item"." ".$i."' ondblclick='getLineIndex();'>
                                <td class='item--info table--col--1'>".$room_natureza[$i]."</td>
                                <td class='item--info table--col--2'>".$room_localidade[$i]."</td>
                                <td class='item--info table--col--3'>".$room_nomenclatura[$i]."</td>
                                <td class='item--info table--col--4'>".$room_modelo[$i]."</td>
                                <td class='item--info table--col--5'>FSG-".$room_patrimonio[$i]."</td>
                                <td class='item--info table--col--6'>".$room_serie[$i]."</td>
                                <td class='table--item--action'>
                                    <button class='table--room--config--button button--default' 
                                    data-id='".$id[$i]."' 
                                    data-01='".$room_natureza[$i]."'
                                    data-02='".$room_localidade[$i]."'
                                    data-03='".$room_nomenclatura[$i]."'
                                    data-04='".$room_modelo[$i]."'
                                    data-05='".$room_patrimonio[$i]."'
                                    data-06='".$room_serie[$i]."'
                                    data-07='".$room_rede[$i]."'
                                    data-08='".$room_cpu[$i]."'
                                    data-09='".$room_gpu[$i]."'
                                    data-10='".$room_ram[$i]."'
                                    data-11='".$room_disco[$i]."'
                                    data-12='".$room_monitor[$i]."'
                                    data-13='".$room_cadeado[$i]."'
                                    data-14='".$room_cabo[$i]."'
                                    data-15='".$room_dataver[$i]."'
                                    data-16='".$room_desempenho[$i]."'
                                    data-17='".$room_obser[$i]."'
                                    onclick='openModalEdit();'
                                    >
                                    <i class='fa-regular fa-circle-play'></i>
                                    </button>
                                    <button class='button--default'><i class='fa-regular fa-bookmark'></i></button>
                                </td>
                            </tr>
                            <tr class='table--item--more"." ".$i."'>
                                <th class='table--col--1'>
                                    <button class='button--cancel'>
                                        <i class='fa-solid fa-exclamation'></i>
                                    </button>
                                </th>
                                <th class='table--col--2'>
                                    <div>
                                        <label>ID: </label>
                                        <p>".$id[$i]."</p>
                                    </div>
                                    <div>
                                        <label>Data: </label>
                                        <p>".$room_dataver[$i]."</p>
                                    </div>
                                </th>
                                <th class='table--col--3'>
                                    <div>
                                        <label>CPU: </label>
                                        <p>".$room_cpu[$i]."</p>
                                    </div>
                                    <div>
                                        <label>GPU: </label>
                                        <p>".$room_gpu[$i]."</p>
                                    </div>
                                </th>
                                <th class='table--col--4'>
                                    <div>
                                        <label>RAM: </label>
                                        <p>".$room_ram[$i]."</p>
                                    </div>
                                    <div>
                                        <label>Disco: </label>
                                        <p>".$room_disco[$i]."</p>
                                    </div>
                                <th class='table--col--5'>
                                    <div>
                                        <label>Rede: </label>
                                        <p>".$room_rede[$i]."</p>
                                    </div>
                                    <div>
                                        <div class='box--col checkbox--area'>
                                            <div>
                                                <input type='checkbox' id='more--cadeado' class='more--cadeado ".$i."' data-status='".$room_cadeado[$i]."' disabled>
                                                <label for='more--cadeado'><i class='fa-solid fa-lock'></i></label>
                                            </div>
                                            
                                            <div>
                                                <input type='checkbox' id='more--cabo' class='more--cabo ".$i."' value='' disabled>
                                                <label for='more--cabo'><i class='fa-solid fa-shield'></i></label>
                                            </div>
                                            
                                            <div>
                                                <input type='checkbox' id='more--monitor'  class='more--monitor ".$i."' value='' disabled>
                                                <label for='more--monitor'><i class='fa-sharp fa-solid fa-desktop'></i></label>
                                            </div>
                                        </div>
                                        <input type='hidden' value='".$room_cadeado[$i]."'>
                                        <input type='hidden' value='".$room_cabo[$i]."'>
                                        <input type='hidden' value='".$room_monitor[$i]."'>
                                    </div>
                                </th>
                                <th class='table--col--6'>
                                    <div>
                                        <label> Observações: </label>
                                        <p>".$room_obser[$i]."</p>
                                    </div>
                                    <div>
                                        <label>Desempenho: </label>
                                        <p>".$room_desempenho[$i]."</p>
                                    </div>
                                </th>
                                <th class='table--col--7'>
                                    <div>
                                        <label></label>
                                        <button class='button--cancel'><i class='fa-solid fa-trash-can'></i></button>
                                    </div>
                                </th>
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

switch ($methodGrid) {
    case 'item--grid':
        $consult = "SELECT * FROM groups";
                    if ($result = mysqli_query($conect, $consult)) {
                        $id = array();
                        $area_name = array();
                        $i = 0;

                        while ($reg = mysqli_fetch_assoc($result)) {
                            $id[$i] = $reg['id'];
                            $area_name[$i] = $reg['area_name'];

                            echo "
                            <section class='grid--block'>
                                <section class='grid--col'>
                                    <div class='grid--header'>
                                        <p>".$area_name[$i]."</p>  
                                        <div class='arrow--down--element'>
                                        <i class='fa-solid fa-ellipsis-vertical'></i>
                                        </div>
                                    </div>
                                    
                                </section>
                                <div class='grid--itens ".$i."' data-bloco='".$area_name[$i]."'>
                                        
                                </div>
                            </section>
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