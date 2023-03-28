<?php

include_once('../data/conect.php');

require '../../vendor/autoload.php';

use Monolog\Logger;
use Monolog\Handler\StreamHandler;

function logger($message, $mode = 'info'){
    $logger = new Logger('logs');
    $logger->pushHandler(new StreamHandler(dirname(__FILE__).'/logs.txt'));

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