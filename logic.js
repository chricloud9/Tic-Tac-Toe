var tie = false;
//if this is true, player X won
var xWins = false;
//if this is true, player O won
var oWins = false
//Starts the life of a turn var at 0 every time the page is loaded
var turn = 0;

//this array will represent all of the X's and O's in the array. We will check this array after turn 5 and every turn after that to see if we have a winner.
var boardArray = [undefined, undefined,undefined, undefined, undefined, undefined, undefined, undefined, undefined];

//Sets a var equal to an array of the tile divs in our document
var tiles = document.getElementsByClassName("tile");


var addAvatar = function(tileNumber){
	//We always start with X, so if our turn number is even, we should be putting an X into that div
	if(oWins == true || xWins == true || tie == true ){
		playAgain();
		oWins = false;
		xWins = false;
		turn = 0;
	}

	if (turn>=4){
		console.log("checking winners");
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
		checkWinnersX();
	}
}
	//if the turn number isn't even, we should be putting an 
	//O into the clicked div
	else{
		if(boardArray[tileNumber] != undefined){
			return;
		}
		else{
		//sets the point in boardArray matching with the tile 
		//number clicked to O
		boardArray[tileNumber] = "O"
		//adds an O to the tile number clicked
		tiles[tileNumber].innerHTML = "O";
		
		//increments the turn var, so we know where we are
		turn++;
		//tell devs what we've played so far
		console.log(boardArray);

		checkWinnersO();
		//if five turns have been made, minumum possible for a win
		//check to see if player O, the second to move, has won
	}
	}

}

//if the tiles contain an X or an O
//disable the onclick event


var checkWinnersX = function(){
	for(var i=0; i<7; i++){
		//Checks horizontal matches. As long as we aren't starting from
		//the 2nd, 3rd, 5th, or 6th tile - three consecutive X's
		//means X wins!
		if(boardArray[i] == "X" && boardArray[i+1] =="X" && boardArray[i+2] =="X" && i !=2 && i!=5 && i !=1 && i!=4){

			xWins = true;
			console.log(xWins);
		}
		//checks vertical matches
		if(boardArray[i] =="X" && boardArray[i+3] =="X" &&boardArray[i+6]=="X"){
			xWins = true;
			console.log(xWins);
		}
		//checks diagonal to the right
		if(boardArray[i] =="X" && boardArray[i+4] =="X" && boardArray[i+8] =="X"){
			xWins = true;
			console.log(xWins);
		}
		//checks diagonal to the left
		if(boardArray[i] =="X" && boardArray[i+2] =="X" && boardArray[i+4] =="X"){
			xWins = true;
			console.log(xWins);
		}
		// if our board is full, and we haven't declared a winner
		//we must have a tie!
			if(turn ==9 && xWins != true){
				tie = true;
			}
	}
	if(xWins == true){
		displayXWins();
	}
	if(tie == true){
		displayTies();
	}
}

var checkWinnersO = function(){
	for(var i=0; i<7; i++){
		//checks horizontal matches. Provided we aren't counting form
		//the 2nd, 3rd, 5th, or 6th tile, three consecutive O's means
		//X wins
		if(boardArray[i] == "O" && boardArray[i+1] =="O" && boardArray[i+2] =="O" && i !=2 && i!=5 && i !=1 && i!=4){
			oWins = true;
			console.log(xWins);
		}
		//checks vertical matches
		if(boardArray[i] =="O" && boardArray[i+3] =="O" &&boardArray[i+6]=="O"){
			oWins = true;
			console.log(xWins);
		}
		//checks diagonals to the right
		if(boardArray[i] =="O" && boardArray[i+4] =="O" && boardArray[i+8] =="O"){
			oWins = true;
			console.log(xWins);
		}
		//checks diagonals to the left
		if(boardArray[i] =="O" && boardArray[i+2] =="O" && boardArray[i+4] =="O"){
			oWins = true;
			console.log(xWins);
		}
		// if our board is full, and we haven't declared a winner
		//we must have a tie!

		if(turn ==9 && xWins != true){
			tie = true;
		}
	}
	if(tie == true){
		displayTies();
	}

}

//changes the text on the board to "O WINS"
var displayOWins = function(){
	tiles[0].innerHTML = "";
	tiles[1].innerHTML = "O";
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

//changes the text on the board to "X WINS"
var displayXWins = function(){
	tiles[0].innerHTML = "";
	tiles[1].innerHTML = "X";
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
	for(var i=0; i<8; i++){
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
