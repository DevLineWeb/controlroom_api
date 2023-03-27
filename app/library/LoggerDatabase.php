<?php
namespace app\library;

use app\interfaces\LoggerInterface;


class LoggerDatabase implements LoggerInterface
{
    public function create() 
    {
        var_dump('create database log');
    }
}