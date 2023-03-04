<?php
include_once('./conect.php');

$natureza = $_POST['natureza'];
$local = $_POST['localidade'];
$sala = $_POST['sala'];
$modelo = $_POST['modelo'];
$patrimonio = $_POST['patrimonio'];
$numSerie = $_POST['numSerie'];
$rede = $_POST['rede'];
$monitor = $_POST['monitor'];
$gpu = $_POST['gpu'];
$ram = $_POST['ram'];
$disco = $_POST['disco'];
$cpu = $_POST['cpu'];
$cadeado = $_POST['cadeado'];
$caboAco = $_POST['caboAco'];
$desempenho = $_POST['desempenho'];
$obs = $_POST['obs'];
$data_envio = date('Y-m-d');

$insertRoom = mysqli_query($conect,"INSERT INTO rooms(
    natureza, 
    localidade, 
    sala, 
    modelo, 
    patrimonio, 
    ns, 
    rede, 
    monitor, 
    cpu, 
    ram, 
    gpu, 
    disco, 
    cadeado, 
    caboaco, 
    desempenho,
    obs, 
    dataver) 
        VALUES(
        '$natureza',
        '$local',
        '$sala', 
        '$modelo',
        '$patrimonio',
        '$numSerie', 
        '$rede', 
        '$monitor', 
        '$gpu', 
        '$ram', 
        '$disco', 
        '$cpu', 
        '$cadeado', 
        '$caboAco', 
        '$desempenho', 
        '$obs', 
        '$data_envio')");

// $update = $conect->query($insertRoom);

if($insertRoom) {
    echo "<legend>Aviso!</legend>
    <div class='request--waiting--info'>
    <p>Sala Cadastrada com Sucesso!</p>
    <button class='button--download request--waiting--button' onclick='closeSpan()'> OK </button>
    </div>";
}
else {
    echo "<legend>Aviso!</legend>
    <div class='request--waiting--info'>
    <p>Falha ao realizar o update!</p>
    <button class='button--download request--waiting--button'> OK </button>
    </div>";
}

// natureza: cr_natureza,
// local: cr_localidade,
// sala: cr_nomeSala,
// modelo: cr_modelo,
// patrimonio: cr_patrimonio,
// numSerie: cr_serie,
// rede: cr_rede,
// monitor: cr_monitor,
// gpu: cr_gpu,
// disco: cr_disco,
// cpu: cr_cpu,
// ram: cr_ram,
// cadeado: cr_cadeado,
// caboAco: cr_caboaco,
// desempenho: cr_desempenho,
// dataVer: cr_dataVer,
// obs: cr_obs




?>