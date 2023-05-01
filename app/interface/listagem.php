<?php
include_once('../data/conect.php');

$method = $_POST["method"];

switch ($method) {
    case 'object--list':
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

                        // echo "
                        // <thead>
                        //     <tr class='table--header'>
                        //         <th class='table--col--1'>Natureza</th>
                        //         <th class='table--col--2'>Grupo</th>
                        //         <th class='table--col--3'>Nome</th>
                        //         <th class='table--col--4'>Máquina</th>
                        //         <th class='table--col--5'>Patrimônio</th>
                        //         <th class='table--col--6'>Série</th>
                        //         <th class='table--col--7'>Action</th>
                        //     </tr>
                        // </thead>
                        // ";
                        echo "
                            <button class='button--default selected' onclick='openModalAdd();'>
                                <i class='fa-solid fa-plus'> </i>
                            </button>
                        ";
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
                            <tr class='table--item"." ".$i."'>
                                <td class='item--info table--col--3'>".$room_nomenclatura[$i]."</td>
                                <td class='item--info table--col--2'>".$room_localidade[$i]."</td>
                                <td class='item--info table--col--1'>".$room_natureza[$i]."</td>
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
                                    <i class='fa-solid fa-play'></i>
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
    case 'user--list':
        $consult = "SELECT * FROM users";
                    if ($result = mysqli_query($conect, $consult)) {
                        $id = array();
                        $user_mail = array();
                        $user_password = array();
                        $user_img = array();
                        $perm_level = array();
                        $unit_id = array();
                        $i = 0;
                    //     echo "
                        
                    //     <thead>
                    //         <tr class='table--header'>
                    //             <th class='table--col--1'>ID</th>
                    //             <th class='table--col--2'>E-mail</th>
                    //             <th class='table--col--3'>Senha</th>
                    //             <th class='table--col--4'>Level</th>
                    //         </tr>
                    //     </thead>
                    // ";
                        while ($reg = mysqli_fetch_assoc($result)) {
                            $id[$i] = $reg['id'];
                            $user_name[$i] = $reg['user_name'];
                            $user_mail[$i] = $reg['user_mail'];
                            $user_password[$i] = $reg['user_password'];
                            $user_img[$i] = $reg['user_img'];
                            $perm_level[$i] = $reg['perm_level'];
                            $unit_id[$i] = $reg['unit_id'];
                            echo "
                            <div class='user--item"." ".$i."'>
                                <div class='user--info'><img src='../app/data/users_images/".$user_img[$i]."'></div>
                                <div class='user--info'><b>".$user_name[$i]."</b></div>
                                <div class='user--info'>".$user_mail[$i]."</div>
                                <div class='user--info'>".$perm_level[$i]."</div>
                                <div class='user--info--action'>
                                    <div class='user--config--button' 
                                    data-id='".$id[$i]."' 
                                    data-01='".$user_mail[$i]."'
                                    data-02='".$user_password[$i]."'
                                    data-03='".$perm_level[$i]."'
                                    data-04='".$user_name[$i]."'
                                    data-05='".$unit_id[$i]."'
                                    data-06='".$user_img[$i]."'
                                    >
                                    <i class='fa-solid fa-user-pen'></i>
                                    </div>
                                </div>
                            </div>
                            
                            ";


                            $i++;
                        }
                    }
        break;
    case 'group--list':
        $consult = "SELECT * FROM groups";
            if ($result = mysqli_query($conect, $consult)) {
                $id = array();
                $group_name = array();
                $i = 0;
                while ($reg = mysqli_fetch_assoc($result)) {
                    $id[$i] = $reg['id'];
                    $group_name[$i] = $reg['group_name'];

                    echo "
                    <section class='grid--block'>
                        <section class='grid--col'>
                            <div class='grid--header'>
                                <p>".$group_name[$i]."</p>  
                                <div class='arrow--down--element'>
                                <i class='fa-solid fa-ellipsis-vertical'></i>
                                </div>
                            </div>
                            
                        </section>
                        <div class='grid--itens ".$i."' data-bloco='".$group_name[$i]."'>
                                
                        </div>
                    </section>
                    ";
                    $i++;
                }
                
            }
        break;
    case 'log--list':
        $consult = "SELECT * FROM events ORDER BY id DESC";
            if ($result = mysqli_query($conect, $consult)) {
                $id = array();
                $events_protocol = array();
                $events_user = array();
                $events_message = array();
                $events_date = array();
                $i = 0;

                // echo "
                // <thead>
                //     <tr class='table--header'>
                //         <th class='table--col--1'>Natureza</th>
                //         <th class='table--col--2'>Grupo</th>
                //         <th class='table--col--3'>Nome</th>
                //         <th class='table--col--4'>Máquina</th>
                //         <th class='table--col--5'>Patrimônio</th>
                //         <th class='table--col--6'>Série</th>
                //         <th class='table--col--7'>Action</th>
                //     </tr>
                // </thead>
                // ";
                while ($reg = mysqli_fetch_assoc($result)) {
                    $id[$i] = $reg['id'];
                    $events_protocol[$i] = $reg['events_protocol'];
                    $events_user[$i] = $reg['events_user'];
                    $events_object[$i] = $reg['events_object'];
                    $events_message[$i] = $reg['events_message'];
                    $events_date[$i] = strtotime($reg['events_date']);


                    echo "
                    <section class='event--item"." ".$i."'>
                        <div class='event--info table--col--5'>".$id[$i]."</div>
                        <div class='event--info table--col--3'>".$events_user[$i]."</div>
                        <div class='event--info table--col--1'>".$events_protocol[$i]."</div>
                        <div class='event--info table--col--2'>".$events_object[$i]."</div>
                        <div class='event--info table--col--6'>".date("d/m/Y h:i:s",$events_date[$i])."</div>
                        <div class='event--action'>
                            <button class='event--info--button button--default' 
                            data-id='".$id[$i]."' 
                            data-01='".$events_protocol[$i]."'
                            data-02='".$events_user[$i]."'
                            data-03='".$events_message[$i]."'
                            data-04='".$events_date[$i]."'
                            data-05='".$events_object[$i]."'
                            onclick=''
                            >
                            <i class='fa-solid fa-file-lines'></i>
                            </button>
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