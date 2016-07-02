<?php
require '../vendor/autoload.php';
require '../database.php';

$app = new \Slim\App;

require 'tests.php';
//require 'user.php'
//require 'employee.php'
//require 'customer.php'
//require 'sales.php'
//require 'category.php'
//require 'supplier.php'
//require 'product.php'

$app->run();
