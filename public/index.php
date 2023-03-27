<?php

use app\library\Log;
use app\library\LoggerDatabase;
use app\library\LoggerFile;

require '../vendor/autoload.php';

Log::create(new LoggerDatabase());