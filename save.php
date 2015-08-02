<?php
	//Database connection
	$host = "";
	$user = "";
	$password = "";
	$db_name = "";

	$link = mysql_connect($host, $user, $password);
	if (!$link) {
    die('Nemoguće spajanje s bazom: ' . mysql_error());
	}
	mysql_select_db($db_name);

	$data = json_decode(file_get_contents("php://input"));
	$ime = mysql_real_escape_string($data->ime);
	$bodovi = mysql_real_escape_string($data->bodovi);

	$q = "INSERT INTO Tablica(ime, bodovi) VALUES ('$ime', '$bodovi')";
	if(!($rez = mysql_query($q))) {echo mysql_error(); $arr = array('msg' => '', 'error' => 'Unos u bazu neuspješan!');
        $jsn = json_encode($arr);
        print_r($jsn);}
	else{$arr = array('msg' => "Proslo!", 'error' => '');
    $jsn = json_encode($arr);
    print_r($jsn);}
?>