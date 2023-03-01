<?php
$dbHost = 'LocalHost';
$dbUsername = 'root';
$dbPassword = '';
$dbName = 'control--room';

$conect = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

if ($conect->connect_errno) {
    echo "Erro";
}