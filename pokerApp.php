<head>
	<TITLE>Igrica</TITLE>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	<link rel="stylesheet" type="text/css" href="css/igrica_css.css">
	<script src="js/jquery.min.js"></script>
	<script src="js/angular.min.js"></script>
</head>

<body>

	<div ng-app="pokerApp" ng-controller="pokerController" id="app" ng-csp>
		<div id="lijevo" ng-show="show_poker_div">
		<br>
		{{state.label}}
		<table id="tablica">
			<tr>
				<td ng-repeat="c in cardList" style="color: {{c.color}}"><div ng-click="checkOnClick($index)" class="karte" id="prvi">{{ c.card }}</div></td>
			</tr>
			<tr>
				<td ng-repeat="c in cardList"><input type="checkbox" ng-checked="c.checked" ng-model="c.checked" /></td>
			</tr>
		</table>

		<a ng-class="click && 'myButton_nova' || !click && 'myButton'" ng-click="drawCards()"><span ng-bind="buttonText"></span></a>

	</div>

	<div id="lijevo" ng-show="show_don_d">
    {{ hl_result }}
		<div id="karta_vm">
		{{ hl }}
		</div>

		<a class="novaigra" ng-click="high()" ng-show="show_hl_b">High</a>
		<a class="novaigra" ng-click="low()" ng-show="show_hl_b">Low</a><br><br>
		<a class="myButton_nova" ng-click="continue()">Nastavi igru</a>

	</div>

		<div id="desno">
		Ime: <input type="text" ng-model="name"/>
		<br>
		Ulog:<input type="text" ng-model="newBet"/>
		<br><br>
		<a class="myButton" ng-show="show_don_b" ng-click="show_don_div()">Duplo ili ništa</a>
		<div id="bottom">
			<table id="tablica_bodovi">
				<tr>
					<td>Bet:</td><td>{{state.bet}}</td>
				</tr>
				<tr>
					<td>Win:</td><td>{{state.win}}</td>
				</tr>
				<tr>
					<td>Total score:</td> <td style="color: #DD0000; font-weight: bold;">{{state.score}}</td>
				</tr>
			</table>
			<a href="pokerApp.php" class="novaigra">New Game</a>
			<a ng-click="save()" class="novaigra" disabled="true">Save</a>
			
			</div>
	</div>

</div>
<p style="color: white;">One Pair (x1.1) - Two Pair (x2) - Three of a Kind (x3) - Straight (x6) - Full House (x9) <br> Flush (x10) - Poker (x20) - Straight Flush (x50)</p>
</body>

<script src="js/pokerApp.js"></script>
<script src="js/pokerControllers.js"></script>
<script src="js/ps_checkService.js"></script>