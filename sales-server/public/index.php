<?php
require '../vendor/autoload.php';

require '../config.php';
require '../DB.php';

$app = new \Slim\App();

$corsOptions = array(
 "origin" => "*",
 "exposeHeaders" => array("Content-Type", "X-Requested-With", "X-authentication", "X-client"),
 "allowMethods" => array('GET', 'POST', 'PUT', 'DELETE', 'OPTIONS')
 );
$cors = new \CorsSlim\CorsSlim($corsOptions);
$app->add($cors);

require 'tests.php';
require 'login.php';
//require 'employee.php'
//require 'customer.php'
//require 'sales.php'
//require 'category.php'
//require 'supplier.php'
//require 'product.php'

$app->run();
