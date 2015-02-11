var app = angular.module('ticTacToe', ['firebase']);

app.controller("ticTacToeCtrl", function($scope, $firebase) {
	
	var boardRef = new Firebase("https://tic-tac-toe-do.firebaseio.com/board");
	var fireBoard = $firebase(boardRef);
	$scope.currentBoard = fireBoard.$asArray();
		// $scope.currentBoard = $firebase(new Firebase("https://tic-tac-toe-do.firebaseio/currentBoard").$asArray());
	$scope.currentBoard.$loaded(function(){
		if($scope.currentBoard.length == 0){
			$scope.currentBoard.$add({currentBoard:['','','','','','','','','']});
		}
		else{
			for(var i=0; i<9; i++){
				$scope.currentBoard.currentBoard[i] = '';
				$scope.currentBoard.currentBoard.$save(i);
			}
		}
	});

	$scope.board = [8,1,6,3,5,7,4,9,2];
	console.log($scope.board[0]);
	$scope.movesMade = $firebase(new Firebase("https://tic-tac-toe-do.firebaseio.com/board")).$asArray();
	




	
	//init scores in firebase
	var scores = new Firebase("https://tic-tac-toe-do.firebaseio.com/scores");
	//create angularfire reference to scores
	var fireScores = $firebase(scores);
	//create angularfire reference to board
	$scope.localFireScores = fireScores;
	//put some stuff in that score Object
	// $scope.localFireScores = fireScores.$set({oScore:0, xScore:0, turns:0});
	// $scope.localFireScores.$loaded(function(){
	// 	$scope.localFireScores.$add({count:0},{oScore:0}, {xScore:0}, {xWins:false}, {oWins:false}, {tie:false});
	// });


	// $scope.makeMove = function(id){
	// 	if ($scope.localFireScores[0].count %2) == 0{
	// 		$scope.movesMade.$add({xMoves:$scope.board[id]});
	// 	}
	// };



	// scores.$set({turn:0, oScore: 0, xScore: 0});
	

	
	// var ref = new Firebase("https://tic-tac-toe-do.firebaseio.com/");
	//init the board in firebase
	gameBoard = new Firebase("https://tic-tac-toe-do.firebaseio.com/gameBoard");
	var fireBoardArray = $firebase(gameBoard);
	$scope.localFireBoard=fireBoardArray.$asArray();


	// $scope.localFireBoard.$loaded(function(){
	// console.log('Board length: ' + $scope.board.length);
	// 	if ($scope.localFireBoard.length==0){ //if board doesn't exist in current instance, generates it
	// 		for (var i = 0; i<9; i++){
	// 			$scope.localFireBoard.$add({playerMove: ''});
	// 		}
	// 	} else{							//if board exists, clears out all x's
	// 		for (var i = 0; i<9; i++){
	// 			$scope.localFireBoard[i].playerMove='';
	// 			$scope.localFireBoard.$save(i);
	// 		}
	// 	}
	// make a firebase array with indices corresponding to the points that will add up to 15 in the case of a win
	// 	$scope.localFireBoard.$add(
	// 		{board:[8,1,6,4,5,7,4,9,2]
	// 		});
	// 	$scope.totalLocalBoard = $scope.localFireBoard[10].board;
	// 	console.log($scope.totalLocalBoard);
	// });

$scope.makeMove = function(id){
	
	//when X makes a move, we want to add $scope.localFireBoard[10].board[indexClicked] to another firebase Array, moves made
	//When O makes a move, we want to add $scope.localFirebBoard[10].board[indexClicked] *-1 to the same firebase array
	//After move 4, make arrays of possible combinations of inputted moves -- if one of the 3X1 arrays adds up to 15, X Wins, if one adds up to -15, O wins

	if($scope.localFireBoard[id].playerMove != '')
		{
		return;
	}
	else{
		if($scope.localFireScores.count %2  ==0){
				$scope.localFireBoard[id].playerMove = "X";
				$scope.localFireBoard.$save($scope.localFireBoard[id]);
				$scope.localFireScores[0].count++;
				$scope.localFireScores.save($scope.localFireScores[0]);
				console.log($scope.localFireBoard[id].playerMove);
				console.log($scope.localFireScores[0].count)
		}
		else{

			$scope.localFireBoard[id].playerMove = "O";
			$scope.localFireBoard.$save($scope.localFireBoard[id]);
			$scope.localFireScores[0].count++;
			$scope.localFireScores.save(0);
			console.log($scope.localFireScores[id].playerMove);
		}
	}

	console.log("the player moved to this place: " + $scope.localFireBoard[id].playerMove);

}

$scope.checkWins = function(){

	for(var i=0; i<9; i++){
		if($scope.localFireBoard[i].playerMove == $scope.localFireBoard[i+1].playerMove && $scope.localFireBoard[i+2] && $scope.localFireBoard[i] != ''){
			console.log("three in a row");
		}
	}
}

	// fireScores.$set({counter:0, xScore:0, oScore:0});
	/*
	// $scope.localFireBoard.$set({move:"",move2:"",move:"",move:"",move:"",move:"",move:"",move:"",move:""});
	// $scope.localFireBoard.save();
	// $scope.localFireScores.save(0);



	// $scope.localFireBoard.$loaded(function(){ 
	// for(var i = 0; i < 9; i++){
	// 	$scope.localFireBoard.$add({playerMove: ""});
	// 	// $scope.localFireBoard[i].save(i);
	// 		}
	// 	});
	

	

	// for (var i = 0; i<9; i++){
	// 			$scope.localFireBoard[i]='';
	// 			$scope.localFireBoard.$save(i);
	// 		}

	// $scope.localFireBoard.$add({t1:"X"})


	// $scope.fireBoardArray.$loaded(function(){
	// 	console.log('Board length: ' + $scope.board.length);
	// 	if ($scope.board.length==0){ //if board doesn't exist in current instance, generates it
	// 		for (var i = 0; i<9; i++){
	// 			$scope.board.$add({playerMove: ''});
	// 		}
	// 	} else{							//if board exists, clears out all x's
	// 		for (var i = 0; i<9; i++){
	// 			$scope.board[i].playerMove='';
	// 			$scope.board.$save(i);
	// 		}
	// 	}
	// });



	// $scope.makeMove=function(ind){
	// 	if($scope.localFireScores.counter % 2 == 0){
	// 		$scope.localFireBoard[ind].playerMove='X';
	// 	}
	// 	else{
	// 		$scope.localFireBoard[ind].playerMove='O';
	// 	}
	// }
	*/
	 


	});



	// download the data into a local object

	// var syncObject = sync.$asObject();
	// // synchronize the object with a three-way data binding
	// // click on `index.html` above to see it used in the DOM!
	// syncObject.$bindTo($scope, "data");

	// $scope.localFireScores = fireScores.value();
	// 1

	// //changes the value, t0, to X
	// fireBoardArray.$update({t0:"X"});

	// $scope.fireBoard = fireBoardArray;
	// $scope.counter = countSync.$asArray();
	// console.log(fireBoard[0]);
	
	
	
	

	// fireBoardArray.$add("hello");

   // replace the entire node with new data
   // sync.$set({foo: "bar"});

   




	/*var fireGameObject = new Firebase('https://tic-tac-toe-do.firebaseio.com/board');
	//Create AngularFire reference to data
	var fireGameObjectSync = $firebase(fireGameObject);
	// make a local variable that syncs to firebase object
	/*$scope.gameObject = fireGameObjectSync.$asObject();
	$scope.gameObject.$set({
           board:{
           0:"",
           1:"",
           2:"",
           3:"",
           4:"",
           5:"",
           6:"",
           7:"",
           8:""},
		scores:{
           turn:0,
           xScore:0,
           oScore:0
		} 
	}); */


	






// //The last tile clicked by the player
// var lastTile;
// //count X wins
// var xScore = 0;
// //count O wins
// var oScore = 0;

// var tie = false;
// //if this is true, player X won
// var xWins = false;
// //if this is true, player O won
// var oWins = false;
// //Starts the life of a turn var at 0 every time the page is loaded
// var turn = 0;

// //this array will represent all of the X's and O's in the array. We will check this array after turn 5 and every turn after that to see if we have a winner.
// var boardArray = [undefined, undefined,undefined, undefined, undefined, undefined, undefined, undefined, undefined];

// //Sets a var equal to an array of the tile divs in our document
// var tiles = document.getElementsByClassName("tile");

// var addAvatar = function(tileNumber){
// 	lastTile = tileNumber;
// 	//We always start with X, so if our turn number is even, we should be putting an X into that div
// 	if(oWins == true || xWins == true || tie == true ){
// 		playAgain();
// 		oWins = false;
// 		xWins = false;
// 		tie = false;
// 		turn = 0;
// 	}
	
// 	if(turn%2 ==0){
// 		if(boardArray[tileNumber] != undefined){
// 			return;
// 		}
// 		else{
// 			//sets the point in boardArray matching with the 
// 			//tile number clicked to X
// 			boardArray[tileNumber] = "X";
// 			//Adds an X to the tile number clicked
// 			tiles[tileNumber].innerHTML = "X";
// 			//increment the turn var, so we know what turn 
// 			//we are on
// 			turn++;
// 			//tell devs what we've played so far
// 			console.log(boardArray);
// 			//if five turns have been made, minumum possible for 
// 			//a wincheck to see if player X, the first to move, 
// 			//has won
// 			if (turn>=4){
// 				console.log("checking winners");
// 				checkWinners("X");
// 			}
// 		}
// 	}
// 	//if the turn number isn't even, we should be putting an 
// 	//O into the clicked div
// 	else{
// 		//if the boxes contain an X or an O, don't change anything
// 		if(boardArray[tileNumber] != undefined){
// 			return;
// 		}
// 		else{
// 			//sets the point in boardArray matching with the tile 
// 			//number clicked to O
// 			boardArray[tileNumber] = "O";
// 			//adds an O to the tile number clicked
// 			tiles[tileNumber].innerHTML = "O";
			
// 			//increments the turn var, so we know where we are
// 			turn++;
// 			//tell devs what we've played so far
// 			console.log(boardArray);
			
// 			if (turn>=4){
// 				console.log("checking winners");
// 				checkWinners("O");
// 			}
// 		}
// 	}

// };

// var checkWinners = function(piece){
// 	for(var i=0; i<7; i++){
// 		//Checks horizontal matches. As long as we aren't starting from
// 		//the 2nd, 3rd, 5th, or 6th tile - three consecutive X's
// 		//means X wins!
// 		if(boardArray[i] == piece && boardArray[i+1] ==piece && boardArray[i+2] ==piece && (i==0 || i==3 || i==6)){
// 			if(piece == "O"){
// 				oWins = true;
// 			}
// 			else{
// 				xWins = true;
// 			}
// 		}
// 		//checks vertical matches
// 		if(boardArray[i] ==piece && boardArray[i+3] ==piece &&boardArray[i+6]==piece){
// 			if(piece == "O"){
// 				oWins = true;
// 			}
// 			else{
// 				xWins = true;
// 			}		
// 		}
// 		//checks diagonal to the right
// 		if(boardArray[i] ==piece && boardArray[i+4] ==piece && boardArray[i+8] ==piece){
// 			if(piece == "O"){
// 				oWins = true;
// 			}
// 			else{
// 				xWins = true;
// 			}
// 			}
// 		//checks diagonal to the left
// 		if(i == 2 && boardArray[i] ==piece && boardArray[i+2] ==piece && boardArray[i+4] ==piece){
// 			if(piece == "O"){
// 				oWins = true;
// 			}
// 			else
// 				xWins = true;
// 		}
// 	}
// 		// if our board is full, and we haven't declared a winner
// 		//we must have a tie!
// 		if(turn == 9 && (xWins != true || oWins != true))
// 			tie = true;
		
// 		if(xWins == true || oWins == true){
// 			displayWins();
// 			//get Id for xBox
// 			var xBox = document.getElementById("xScoreBox");
// 			xBox.innerHTML = xScore;
// 		}
	
// 		else if(tie == true){
// 			displayTies();

// 		}
// }

// //changes the text on the board to "O WINS"
// var displayWins = function(){
// 	if(xWins == true){
// 		tiles[1].innerHTML = "X";
// 		console.log("I am adding a score to X" + xScore);
// 		xScore++;
// 		//get Id for xBox
// 		var xBox = document.getElementById("xScoreBox");
// 		xBox.innerHTML = xScore;
// 	}
// 	else if(oWins == true){
// 		tiles[1].innerHTML ="O";
// 		console.log("I am adding a score to O" + oScore)
// 		oScore ++;
// 		//get Id for xBox
// 		var oBox = document.getElementById("oScoreBox");
// 		oBox.innerHTML = oScore;
// 	}
// 	tiles[0].innerHTML = "";
// 	tiles[2].innerHTML = "";
// 	tiles[3].innerHTML = "W";
// 	tiles[4].innerHTML = "I";
// 	tiles[4].style.padding = "20px 0px 0px 55px";
// 	tiles[4].style.width = "95px";
// 	tiles[5].innerHTML = "N";
// 	tiles[6].innerHTML = "";
// 	tiles[7].innerHTML = "S";
// 	tiles[8].innerHTML = "";

// }

// var playAgain = function(){
// 	for(var i=0; i<9; i++){
// 		tiles[i].innerHTML = "";
// 	}
// 	boardArray = [undefined, undefined,undefined, undefined, undefined, undefined, undefined, undefined, undefined];
// 	tiles[4].style.padding = "20px 0px 0px 35px";
// 	tiles[4].style.width = "115px";
// }

// var displayTies = function(){
// 	tiles[0].innerHTML = "X";
// 	tiles[1].innerHTML = "&";
// 	tiles[2].innerHTML = "O";
// 	tiles[3].innerHTML = "";
// 	tiles[4].innerHTML = "T";
// 	tiles[4].style.padding = "20px 0px 0px 55px";
// 	tiles[4].style.width = "95px";
// 	tiles[5].innerHTML = "";
// 	tiles[6].innerHTML = "I";
// 	tiles[7].innerHTML = "E";
// 	tiles[8].innerHTML = "D";

// }
// var takeBack = function(){
// 	turn --;
// 	boardArray[lastTile] = undefined;
// 	tiles[lastTile].innerHTML = "";

// }

