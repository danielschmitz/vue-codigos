# configuraçõe para o cloud9 server

## Banco de dados


```
$ mysql-ctl cli
mysql> source PATH_TO_SQL_FILE.sql        (source /home/ubuntu/workspace/vue-codigos/sales-server/database.sql)
```

**config.php**

```
define("DB_HOST",getenv('IP'));
define("DB_NAME","sales");
define("DB_USER",getenv('C9_USER'));
define("DB_PASSWORD","")
```

## Apache

```
$ sudo nano /etc/apache2/sites-enabled/001-cloud9.conf 
```

![](https://i.imgur.com/DwtIWtV.png)


