<?php

$url = parse_url(getenv("mysql://b7de7cd547a86f:bf7c975c@us-cdbr-east-02.cleardb.com/heroku_27e421d583545ae?reconnect=true"));

$cd_host = $url["us-cdbr-east-02.cleardb.com"];
$cd_port = 3306;
$cd_socket = "";
$cd_user = $url["b7de7cd547a86f"];
$cd_password = $url["bf7c975c"];
$cd_dbname = substr($url["heroku_27e421d583545ae"], 1);

?>
