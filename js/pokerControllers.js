angular.module('pokerApp.controllers', [])
.controller('pokerController', function($scope, checkScoreService)
{
    //Space button
    var spaceButtonHandler = function(e){
        if(e.keyCode === 32) {
         if($scope.show_poker_div == true) { $scope.$apply(function(){$scope.drawCards()}); }
         else $scope.$apply(function(){$scope.nastavi()});
        }      
    };

    var $doc = angular.element(document);
    $doc.on('keydown', spaceButtonHandler);
    $scope.$on('$destroy',function(){
      $doc.off('keydown', spaceButtonHandler);
    })

    //Model
    $scope.name = "";
    $scope.cards=["A♥","A♦","A♣","A♠", "2♥","2♦","2♣","2♠","3♥","3♦","3♣","3♠","4♥","4♦","4♣","4♠",
    "5♥","5♦","5♣","5♠","6♥","6♦","6♣","6♠","7♥","7♦","7♣","7♠","8♥","8♦","8♣","8♠","9♥","9♦","9♣","9♠",
    "10♥","10♦","10♣","10♠","J♥","J♦","J♣","J♠","Q♥","Q♦","Q♣","Q♠","K♥","K♦","K♣","K♠"];
    $scope.cardList = [{card: "", checked: false, color: "black"}, {card: "", checked: false, color: "black"}, 
                        {card: "", checked: false, color: "black"}, {card: "", checked: false, color: "black"}, 
                        {card: "", checked: false, color: "black"}];
    $scope.state = {
        score: 100,
        win: 0,
        label: "-",
        bet: 5,
        temp_score: 100
    }

    $scope.newBet = 5;
    $scope.buttonText = "New";
    $scope.show_poker_div = true;
    $scope.show_don_d = false;
    $scope.hl_result = "-";
    $scope.click = true;
    
    //PokerController

    $scope.drawCards = function() {
        
        if($scope.click == true)
        {
            if($scope.state.score == 0){ window.location.assign("/index.php"); }
            if($scope.newBet > $scope.state.score || $scope.newBet % 1 != 0 || $scope.newBet < 0)
             {
                alert("Change your bet!");
                return;
             }

            $scope.show_don_d = false;
            $scope.show_don_b = false;
            $scope.state.bet = $scope.newBet;
            $scope.state.label = "-";
            $scope.state.score = $scope.state.score - $scope.state.bet;
            $scope.state.win = null;
            $scope.buttonText = "Next";
            

            for(i = 0; i < 5; i++)
            {
                 $scope.cardList[i].card = randomCard();
                 $scope.cardList[i].checked = false;
            }
            setCardColors();
            $scope.click = false;
        }
        else
        {
            for(var i = 0; i < 5; i++)
            {
                if(!$scope.cardList[i].checked) { $scope.cardList[i].card = randomCard();}
            }

            setCardColors();
            
            $scope.state = checkScoreService.checkScore($scope.cardList, $scope.state);
            if( $scope.state.win > 0 ) { $scope.show_don_b = true; }
            if($scope.state.score == 0){ $state.label = "Game Over"; }

            $scope.buttonText = "New";
            $scope.click = true;
        }
    }

    $scope.checkOnClick = function(cardId)
    {
        $scope.cardList[cardId].checked = true;
    }

     $scope.show_don_div = function() {
        $scope.show_don_b = false;
        $scope.show_poker_div = false;
        $scope.show_don_d = true;
        $scope.show_hl_b = true;
        $scope.state.score = $scope.state.temp_score;
    };

    $scope.hide_don_div = function() {
        $scope.show_poker_div = true;
        $scope.show_don_d = false;
    };

    $scope.high = function() {
        $scope.hl = randomCard();
        hl = $scope.hl.substring(0, $scope.hl.length - 1);
        if (hl == "J") hl = 11;
        if (hl == "Q") hl = 12;
        if (hl == "K") hl = 13;
        if (hl == "A") hl = 1;

        if (hl > 7) {$scope.state.win = $scope.state.win * 2; $scope.hl_result = "High";}
        else if (hl == 7) { $scope.hl_result = "-"; }
        else{ $scope.win = 0; $scope.show_hl_b = false; $scope.state.score=$scope.state.temp_score; $scope.hl_result = "Low";}
    };

    $scope.low = function() {
        $scope.hl = randomCard();
        hl = $scope.hl.substring(0, $scope.hl.length - 1);
        if (hl == "J") hl = 11;
        if (hl == "Q") hl = 12;
        if (hl == "K") hl = 13;
        if (hl == "A") hl = 1;

        if (hl < 7) {$scope.state.win = $scope.state.win * 2; $scope.hl_result = "Low";}
        else if (hl == 7) { $scope.hl_result = "-"; }
        else{ $scope.state.win = 0; $scope.show_hl_b = false; $scope.state.score=$scope.state.temp_score; $scope.hl_result = "High";}
    };

     $scope.continue = function() {
        $scope.hl_result = "-";
        $scope.hl = "";
        $scope.hide_don_div();
        for(i = 0; i < 5; i++)
            {
                 $scope.cardList[i].card = "";
                 $scope.cardList[i].checked = false;
            }
        $scope.state.label = "-";
        $scope.state.score += $scope.state.win;
        $scope.state.win = 0;    
    }

    //HelperFunctions
    function setCardColors ()
    {
        for(var i = 0; i<5; i++)
        {
            sign =  $scope.cardList[i].card.substr($scope.cardList[i].card.length - 1);
            if(sign == "♥" || sign == "♦" ) $scope.cardList[i].color = "#850000";
            else $scope.cardList[i].color = "black";
        }
    }

    function randomCard()
    {
        var a = $scope.cards[Math.floor(Math.random() * 52)];
        for(var i=0; i<5; i++)
        {
            if($scope.cardList[i].card == a) a = randomCard();
        }
        return a;
    }

     $scope.errors = [];
     $scope.msgs = [];
 
     $scope.save = function() {
                    /*if($scope.ime == "") { alert("Unesi ime!"); return;}
 
                    $scope.errors.splice(0, $scope.errors.length);
                    $scope.msgs.splice(0, $scope.msgs.length);
                    data = [$scope.ime, $scope.bodovi];
 
                    $http.post('save.php', {'ime': $scope.ime, 'bodovi': $scope.bodovi}
                    ).success(function(data, status, headers, config) {
                        if (data.msg != '')
                        {
                            $scope.msgs.push(data.msg);
                            alert("Spremljeno!");
                            window.location.assign("/index.php");
                        }
                        else
                        {
                            $scope.errors.push(data.error);
                            console.log("Erori: " + $scope.errors)
                        }
                    }).error(function(data, status) { 
                        $scope.errors.push(status);
                        console.log("Erorine: " + $scope.errors)
                    });*/
                }

})