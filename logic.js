//The last tile clicked by the player
var lastTile;
//count X wins
var xScore = 0;
//count O wins
var oScore = 0;

var tie = false;
//if this is true, player X won
var xWins = false;
//if this is true, player O won
var oWins = false;
//Starts the life of a turn var at 0 every time the page is loaded
var turn = 0;

//this array will represent all of the X's and O's in the array. We will check this array after turn 5 and every turn after that to see if we have a winner.
var boardArray = [undefined, undefined,undefined, undefined, undefined, undefined, undefined, undefined, undefined];

//Sets a var equal to an array of the tile divs in our document
var tiles = document.getElementsByClassName("tile");

var addAvatar = function(tileNumber){
	lastTile = tileNumber;
	//We always start with X, so if our turn number is even, we should be putting an X into that div
	if(oWins == true || xWins == true || tie == true ){
		playAgain();
		oWins = false;
		xWins = false;
		tie = false;
		turn = 0;
	}
	
	if(turn%2 ==0){
		if(boardArray[tileNumber] != undefined){
			return;
		}
		else{
			//sets the point in boardArray matching with the 
			//tile number clicked to X
			boardArray[tileNumber] = "X";
			//Adds an X to the tile number clicked
			tiles[tileNumber].innerHTML = "X";
			//increment the turn var, so we know what turn 
			//we are on
			turn++;
			//tell devs what we've played so far
			console.log(boardArray);
			//if five turns have been made, minumum possible for 
			//a wincheck to see if player X, the first to move, 
			//has won
			if (turn>=4){
				console.log("checking winners");
				checkWinners("X");
			}
		}
	}
	//if the turn number isn't even, we should be putting an 
	//O into the clicked div
	else{
		//if the boxes contain an X or an O, don't change anything
		if(boardArray[tileNumber] != undefined){
			return;
		}
		else{
			//sets the point in boardArray matching with the tile 
			//number clicked to O
			boardArray[tileNumber] = "O";
			//adds an O to the tile number clicked
			tiles[tileNumber].innerHTML = "O";
			
			//increments the turn var, so we know where we are
			turn++;
			//tell devs what we've played so far
			console.log(boardArray);
			
			if (turn>=4){
				console.log("checking winners");
				checkWinners("O");
			}
		}
	}

};

var checkWinners = function(piece){
	for(var i=0; i<7; i++){
		//Checks horizontal matches. As long as we aren't starting from
		//the 2nd, 3rd, 5th, or 6th tile - three consecutive X's
		//means X wins!
		if(boardArray[i] == piece && boardArray[i+1] ==piece && boardArray[i+2] ==piece && (i==0 || i==3 || i==6)){
			if(piece == "O"){
				oWins = true;
			}
			else{
				xWins = true;
			}
		}
		//checks vertical matches
		if(boardArray[i] ==piece && boardArray[i+3] ==piece &&boardArray[i+6]==piece){
			if(piece == "O"){
				oWins = true;
			}
			else{
				xWins = true;
			}		
		}
		//checks diagonal to the right
		if(boardArray[i] ==piece && boardArray[i+4] ==piece && boardArray[i+8] ==piece){
			if(piece == "O"){
				oWins = true;
			}
			else{
				xWins = true;
			}
			}
		//checks diagonal to the left
		if(i == 2 && boardArray[i] ==piece && boardArray[i+2] ==piece && boardArray[i+4] ==piece){
			if(piece == "O"){
				oWins = true;
			}
			else
				xWins = true;
		}
	}
		// if our board is full, and we haven't declared a winner
		//we must have a tie!
		if(turn == 9 && (xWins != true || oWins != true))
			tie = true;
		
		if(xWins == true || oWins == true){
			displayWins();
			//get Id for xBox
			var xBox = document.getElementById("xScoreBox");
			xBox.innerHTML = xScore;
		}
	
		else if(tie == true){
			displayTies();

		}
}

//changes the text on the board to "O WINS"
var displayWins = function(){
	if(xWins == true){
		tiles[1].innerHTML = "X";
		console.log("I am adding a score to X" + xScore);
		xScore++;
		//get Id for xBox
		var xBox = document.getElementById("xScoreBox");
		xBox.innerHTML = xScore;
	}
	else if(oWins == true){
		tiles[1].innerHTML ="O";
		console.log("I am adding a score to O" + oScore)
		oScore ++;
		//get Id for xBox
		var oBox = document.getElementById("oScoreBox");
		oBox.innerHTML = oScore;
	}
	tiles[0].innerHTML = "";
	tiles[2].innerHTML = "";
	tiles[3].innerHTML = "W";
	tiles[4].innerHTML = "I";
	tiles[4].style.padding = "20px 0px 0px 55px";
	tiles[4].style.width = "95px";
	tiles[5].innerHTML = "N";
	tiles[6].innerHTML = "";
	tiles[7].innerHTML = "S";
	tiles[8].innerHTML = "";

}

var playAgain = function(){
	for(var i=0; i<9; i++){
		tiles[i].innerHTML = "";
	}
	boardArray = [undefined, undefined,undefined, undefined, undefined, undefined, undefined, undefined, undefined];
	tiles[4].style.padding = "20px 0px 0px 35px";
	tiles[4].style.width = "115px";
}

var displayTies = function(){
	tiles[0].innerHTML = "X";
	tiles[1].innerHTML = "&";
	tiles[2].innerHTML = "O";
	tiles[3].innerHTML = "";
	tiles[4].innerHTML = "T";
	tiles[4].style.padding = "20px 0px 0px 55px";
	tiles[4].style.width = "95px";
	tiles[5].innerHTML = "";
	tiles[6].innerHTML = "I";
	tiles[7].innerHTML = "E";
	tiles[8].innerHTML = "D";

}
var takeBack = function(){
	turn --;
	boardArray[lastTile] = "undefined";
	tiles[lastTile].innerHTML = "";

}

