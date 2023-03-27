<?php
namespace app\library;

use app\interfaces\LoggerInterface;

class LoggerFile implements LoggerInterface
{
    public function create() 
    {
        var_dump('create log file');
    }
}