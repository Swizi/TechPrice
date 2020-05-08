<?php

require_once('../inc/database.inc.php');

header("Access-Control-Allow-Origin: *");

$login = strtolower($_POST['login']);
$pass = $_POST['password'];

$query = "SELECT * FROM users WHERE login = '" . $login . "';";
$res = makeQuery($query);
$data = getData($res);

if (empty($data)) {
	echo json_encode(array(
    'error' => "true"
  ));
	die();
}
if (!password_verify($pass, $data['password'])) {
  echo json_encode(array(
    'error' => "true"
  ));
  die();
}

echo json_encode(array(
  'error' => "false",
  'user_id' => 1,
  'user_login' => "yaroslav-hub"
));

die();