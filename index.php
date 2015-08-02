<head>
	<TITLE>Igrica</TITLE>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	<link rel="stylesheet" type="text/css" href="css/igrica_css.css">
	<script src="js/jquery.min.js"></script>
	<script src="js/angular.min.js"></script>
</head>
<?php
/*
	$host = "localhost";
	$db_name = "mojabaza";
	$user = "root";
	$password = "";

	$link = mysql_connect($host, $user, $password);
	if (!$link) {
    die('Nemoguće spajanje s bazom: ' . mysql_error());
	}
	mysql_select_db($db_name);

	$q = "SELECT * FROM Tablica ORDER BY bodovi DESC LIMIT 10";
	$rez = mysql_query($q);
	if(!$rez) {echo mysql_error();}
*/
?>

<body>

	<div id="app">
		<div id="lijevo">
			<div id="lista">

			<p style="font-size: 17px;"><b>Top 10:</b></p>
			<!--
			<?php
			/*
			while($rezultat = mysql_fetch_array($rez)){
			echo $rezultat['ime']."&nbsp;&nbsp;&nbsp;&nbsp;".$rezultat['bodovi']."<hr>";}
			*/
			?>
			-->
			</div>
		</div>
		<div id="desno">
			<p style="color: white; text-align: left; padding-left: 5px;">
			One Pair (x1.1) <br> Two Pair (x2) <br> Three of a Kind (x3) <br> Straight (x6) <br> Full House (x9) 
			<br> Flush (x10) <br> Poker (x20) <br> Straight Flush (x50)</p>
			<a href="pokerApp.php" class="novaigra" style="position: absolute; bottom: 10px; right: 40px;">New game</a>
		</div>
	</div>
<p style="color: white;">Poker ♠ ♥ ♦ ♣</p>
</body>