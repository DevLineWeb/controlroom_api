<?php

require '../../vendor/autoload.php';

use Monolog\Logger;
use Monolog\Handler\StreamHandler;




function logger($message, $mode = 'info'){
    $logger = new Logger('LOG');
    $logger->pushHandler(new StreamHandler(dirname(__FILE__).'/logs.txt'));
    $logger->pushProcessor(function($record){
        $record["extra"]["HTTP_HOST"] = $_SERVER["HTTP_HOST"];
        $record["extra"]["REQUEST_URI"] = $_SERVER["REQUEST_URI"];
        $record["extra"]["REQUEST_METHOD"] = $_SERVER["REQUEST_METHOD"];
        $record["extra"]["HTTP_USER_AGENT"] = $_SERVER["HTTP_USER_AGENT"];
        return $record;
    });


    switch($mode){
        case 'info':
            $logger->info($message);
            break;
            
        case 'warning':
            $logger->warning($message);
            break;
            
        case 'error':
            $logger->error($message);
            break;
            
        case 'debug':
            $logger->debug($message);
            break;
            
        case 'notice':
            $logger->notice($message);
            break;
            
        case 'critical':
            $logger->critical($message);
            break;
            
        case 'alert':
            $logger->alert($message);
            break;
            
        case 'emergency':
            $logger->emergency($message);
            break;
            
        case 'default':
            $logger->info($message);
            break;
    }

}

function LogToDatabase ($message, $mode, $object) {
    $dbHost = 'LocalHost';
    $dbUsername = 'root';
    $dbPassword = '';
    $dbName = 'control--room';
    $sql = "mysql:host=$dbHost;dbname=$dbName;";
    $dsn_Options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];
    date_default_timezone_set('America/Sao_Paulo');
    $date = date('Y-m-d H:i:s');
    $session = $_SESSION["mail"];
    try { 
        $my_Db_Connection = new PDO($sql, $dbUsername, $dbPassword, $dsn_Options);
        echo "Connected successfully";
        } catch (PDOException $error) {
        echo 'Connection error: ' . $error->getMessage();
        }
    
    $my_Insert_Statement = $my_Db_Connection->prepare("INSERT INTO events (
    events_protocol, events_user, events_object, events_message, events_date) 
    VALUES ('$mode', '$session', '$object', '$message', '$date')");

    if ($my_Insert_Statement->execute()) {
        echo "New record created successfully";
    } else {
        echo "Unable to create record";
    }
    return $my_Insert_Statement;
}