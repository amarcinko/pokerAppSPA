angular.module('pokerApp.services', []).
  factory('checkScoreService', function() {

    var checkScoreAPI = {};

    checkScoreAPI.checkScore = function($cardList, $state){

        noSignCardList = [];
        var temp_score;

        for(i =0; i<5; i++)
        {
            noSignCardList[i] = $cardList[i].card.substring(0, $cardList[i].card.length - 1)
        }

        patternArray = [];
        broj = 0;
        for (i = 0; i < noSignCardList.length; i++)
            { 
                broj = 0;
                for (s = 0; s<noSignCardList.length; s++)
                {
                    if(noSignCardList[s] == noSignCardList[i])
                        {broj++}
                }
                patternArray[i] = broj;
             }

         patternArray.sort();

         op = [1, 1, 1, 2, 2];
         tp = [1, 2, 2, 2, 2];
         tok = [1, 1, 3, 3, 3];
         ful= [2, 2, 3, 3, 3];
         po = [1, 4, 4, 4, 4];

        if(JSON.stringify(patternArray) == JSON.stringify(op) /*&& jacksOrBetter()*/){ $state.label = "One Pair"; $state.win = +($state.bet * 1.1).toFixed(1); $state.temp_score=$state.score; $state.score += $state.win; }
        else if(JSON.stringify(patternArray) == JSON.stringify(tp)){ $state.label = "Two Pairs"; $state.win = $state.bet * 2; $state.temp_score=$state.score; $state.score += $state.win; }
        else if(JSON.stringify(patternArray) == JSON.stringify(tok)){ $state.label = "Three Of A Kind"; $state.win = $state.bet * 3; $state.temp_score=$state.score; $state.score += $state.win; }
        else if(JSON.stringify(patternArray) == JSON.stringify(ful)){ $state.label = "Full House"; $state.win = $state.bet * 9; $state.temp_score=$state.score; $state.score += $state.win; }
        else if(JSON.stringify(patternArray) == JSON.stringify(po)){ $state.label = "Poker"; $state.win = $state.bet * 20; $state.temp_score=$state.score; $state.score += $state.win; }
        else if(checkFlush($cardList)) { $state.label = "Flush"; $state.win = $state.bet * 10; $state.temp_score=$state.score; $state.score += $state.win; }
        else if(checkStraight($cardList)) { $state.label = "Straight"; $state.win = $state.bet * 6; $state.temp_score=$state.score; $state.score += $state.win; }
        /*else if(checkSkala() && checkBoja()) { $scope.pog = "Skala u boji"; $scope.dobitak = $scope.ulog * 50;   $scope.temp_score=$scope.bodovi; $scope.bodovi += $scope.dobitak; $scope.prikazi_duplo_gumb();}
        */
        else{ $state.label = "-"; $state.win = 0; }

        return $state;
    }
    
    //Check functions
    function checkFlush($cardList)
    {
        patternArray = [];
        for(i = 0; i < 5; i++)
        {
            patternArray[i] = $cardList[i].card.substr($cardList[i].card.length - 1);
        }

        if(patternArray[0] == patternArray[1] && patternArray[0] == patternArray[2] 
            && patternArray[0] == patternArray[3] && patternArray[0] == patternArray[4]) return true;
        else return false;
    }

     function checkStraight($cardList)
    {
        patternArray = [];
        patternNumArray = [];
        for(i = 0; i < 5; i++)
        {
            patternArray[i] = $cardList[i].card.substring(0, $cardList[i].card.length - 1)
        }

        for(i = 0; i < 5; i++)
        {
            if (patternArray[i] == "J") patternNumArray[i] = 11;
            else if (patternArray[i] == "Q") patternNumArray[i] = 12;
            else if (patternArray[i] == "K") patternNumArray[i] = 13;
            else if (patternArray[i] == "A") patternNumArray[i] = 14;
            else { patternNumArray[i] = parseInt(patternArray[i]); }
        }
        
        patternNumArray.sort(function(a,b){return a - b});
        for(i = 4; i>0; i--)
        {
            if((patternNumArray[i] - patternNumArray[i-1]) == 1) {skala = true;}
            else{skala = false; break;}
        }
        return skala;
    }

  /* function jacksOrBetter()
    {
        jobNiz = [];
        for(i = 0; i < 5; i++)
        {
            jobNiz[i] = $scope.cardList[i].card.substring(0, $scope.cardList[i].card.length - 1)
        }
        for(i = 0; i < 5; i++)
        {
            if (jobNiz[i] == "J") jobNiz[i] = "11";
            if (jobNiz[i] == "Q") jobNiz[i] = "12";
            if (jobNiz[i] == "K") jobNiz[i] = "13";
            if (jobNiz[i] == "A") jobNiz[i] = "14";
        }
        jobNiz.sort();
        var job = false;
        console.log("jobniz " + jobNiz)
        for(i=0; i<4; i++)
            {
                if(jobNiz[i] == jobNiz[i+1] && (jobNiz[i] == "11" || jobNiz[i] == "12" || jobNiz[i] == "13" || jobNiz[i] == "14")) {job = true; break;}
            }
            console.log("job " + job)
            return job;
        
    }*/

    return checkScoreAPI;
});