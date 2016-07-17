<?php

/* LAMP CONFIGURATION 
define("DB_HOST","localhost");
define("DB_NAME","sales");
define("DB_USER","root");
define("DB_PASSWORD","");
*/

/* CLOUD 9 CONFIGURATION */

define("DB_HOST",getenv('IP'));
define("DB_NAME","sales");
define("DB_USER",getenv('C9_USER'));
define("DB_PASSWORD","");



define("SECRECT_KEY","my_super_secret_key_change_this_in_production");


