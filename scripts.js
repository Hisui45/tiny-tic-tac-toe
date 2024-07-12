
var option = 0
var isXTurn = true
var inProgress = false
var isGameOver = false
var totalMoves = 0
var emptyBoxes = [0,1,2,3,4,5,6,7,8]
var seconds = 0
function setGame(){
    //Clear All Boxes
    var boxes = document.querySelectorAll('.board p');
    boxes.forEach(hideBoxes)

    //Hide Turn Message
    var turnMessage = document.getElementById('turn-message');
    turnMessage.style.display ="none"

    //Hide Player Info
    var playerInfo = document.getElementById('player-info');
    playerInfo.style.display ="none"
    seconds = 0;
}


function startTimer(){
    if(inProgress){
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds % 3600) / 60);
        let remainingSeconds = seconds % 60;
    
        var formattedHours = hours.toString()
        var formattedMinutes = minutes.toString()
        var formattedSeconds = remainingSeconds.toString()
        
        if(remainingSeconds < 10){
            formattedSeconds = "0" + remainingSeconds
        }
        if (hours > 0) {
            document.getElementById('timer').innerHTML = formattedHours + ":" + formattedMinutes +":" + formattedSeconds;
        } else {
            document.getElementById('timer').innerHTML = formattedMinutes + ":" + formattedSeconds;
            
        }
        setTimeout(startTimer, 1000);
        seconds++;
    }

}

function hideBoxes(box){
    box.innerHTML = ""
}


function selectOption(selectedOption){
    option = selectedOption
}

function setTurnMessage(){
    var turnMessage = document.getElementById('turn-message');
    if(isXTurn){
        turnMessage.style.display = "block"
        turnMessage.innerHTML = "It's X's turn"
    }else{
        turnMessage.style.display = "block"
        turnMessage.innerHTML = "It's O's turn"
    }
}

function gameStart(){
    setGame()
    inProgress = true
    startTimer()
    randomFirst()
    setTurnMessage()
    totalMoves = 0
    emptyBoxes = [0,1,2,3,4,5,6,7,8]
    changeButton()
    
    if(option == 1){ //Player v Computer
        var playerInfo = document.getElementById('player-info');
        playerInfo.style.display ="block"
        if(!isXTurn){
            computerTurn()
        }
    }
}


function computerTurn(){
    var boxes = document.querySelectorAll('.board p');
    while(!isXTurn){
        var randomSquare = Math.floor(Math.random() * emptyBoxes.length);
        index = emptyBoxes[randomSquare]
        if(isEmpty(boxes[index])){
            boxes[index].innerHTML = "O";
            isXTurn = true;
        }
    } 
    progressGame(boxes[index].id);
}

function changeButton(){
    if(inProgress){
        document.getElementById('start-button').value = "Restart"
    }else if(isGameOver){
        document.getElementById('start-button').value = "Play Again?"
    }else{
        document.getElementById('start-button').value = "Start"
    }
    
}

function randomFirst(){
    var randomNum = Math.floor(Math.random() * 2);
    if(randomNum == 0){
        isXTurn = true;
    }else if(randomNum == 1){
       isXTurn = false;
    }
}

function placeMarker(elementId) {
    var box = document.getElementById(elementId);
    if(inProgress){
        if(isEmpty(box)){
            if(option == 1){  //Player v Computer game
                if(isXTurn){
                    box.innerHTML = "X"
                    isXTurn = false
                    progressGame(elementId)
                    if(inProgress){
                        computerTurn()
                    }
                } 
            }else{ //Player v Player game
                if (isXTurn) {
                    box.innerHTML = "X";
                     isXTurn = false;
                 } else {
                     box.innerHTML = "O";
                     isXTurn = true;
                 }
                 progressGame(elementId)
            }  
        }
    }
}

function progressGame(elementId){
    updateEmptyBoxes(elementId)
    totalMoves++;
    if(checkWin(elementId)){
        gameWon()
    }else if(totalMoves == 9){
        gameOver()
    }
    else{
        setTurnMessage();
    }
}

function updateEmptyBoxes(elementId){
    var boxes = document.querySelectorAll('.board p');
    for (var i = 0; i < boxes.length; i++) {
        var currentBox = boxes[i].id;
        
        if (currentBox === elementId) {
            const index = emptyBoxes.indexOf(i);
            if (index > -1) { 
                emptyBoxes.splice(index, 1);
            }
        }
    }
}

function gameWon(){
    var turnMessage = document.getElementById('turn-message');
    
    if(!isXTurn){
        if(option == 1){
            turnMessage.innerHTML = "You beat the computer!"
        }else{
            turnMessage.innerHTML = "X wins!"
        }
    }else{
        if(option == 1){
            turnMessage.innerHTML = "You lost to a computer!"
        }else{
            turnMessage.innerHTML = "O wins!"
        }
        

    }
    inProgress = false
    isGameOver = true
    changeButton()
}


function gameOver(){
    var turnMessage = document.getElementById('turn-message');
    turnMessage.innerHTML = "Look it's a cat!"
    inProgress = false
    isGameOver = true
    changeButton()
}

function isEmpty(element) {
    return element.innerHTML === "";
}

function checkWin(elementId){
    return checkRowWin(elementId) || checkColumnWin(elementId)  || checkDiagonalWin(elementId)
}

function checkRowWin(elementId){
    var boxes = document.querySelectorAll('.board p');
    var row1Boxes = [0,1,2];
    var row2Boxes = [3,4,5];
    var row3Boxes = [6,7,8];

    for (var i = 0; i < boxes.length; i++) {
        var currentBox = boxes[i].id;
        //Get the currentBox
        if (currentBox === elementId) {
            if(row1Boxes.includes(i)){
                if(!(boxes[0].innerHTML === boxes[1].innerHTML && boxes[1].innerHTML === boxes[2].innerHTML)){
                    return false
                }
            }
            else if(row2Boxes.includes(i)){
                if(!(boxes[3].innerHTML === boxes[4].innerHTML && boxes[4].innerHTML === boxes[5].innerHTML)){
                    return false
                }
            }
            else if(row3Boxes.includes(i)){
                if(!(boxes[6].innerHTML === boxes[7].innerHTML && boxes[7].innerHTML === boxes[8].innerHTML)){
                    return false
                }
            }
        }
    }


    return true
}

function checkColumnWin(elementId){
    var boxes = document.querySelectorAll('.board p');
    var column1Boxes = [0, 3, 6];
    var column2Boxes = [1, 4, 7];
    var column3Boxes = [2, 5, 8];

    for (var i = 0; i < boxes.length; i++) {
        var currentBox = boxes[i].id;
        
        if (currentBox === elementId) {
            if (column1Boxes.includes(i)) {
                if (!(boxes[0].innerHTML === boxes[3].innerHTML && boxes[3].innerHTML === boxes[6].innerHTML)) {
                    return false;
                }
            } else if (column2Boxes.includes(i)) {
                if (!(boxes[1].innerHTML === boxes[4].innerHTML && boxes[4].innerHTML === boxes[7].innerHTML)) {
                    return false;
                }
            } else if (column3Boxes.includes(i)) {
                if (!(boxes[2].innerHTML === boxes[5].innerHTML && boxes[5].innerHTML === boxes[8].innerHTML)) {
                    return false;
                }
            }
        }
    }

    return true
}


function checkDiagonalWin(elementId){
    var boxes = document.querySelectorAll('.board p');
    var diagonal1Boxes = [0, 4, 8];
    var diagonal2Boxes = [2, 4, 6];

    for (var i = 0; i < boxes.length; i++) {
        var currentBox = boxes[i].id;

        if (currentBox === elementId) {
            if (diagonal1Boxes.includes(i)) {
                if (!(boxes[0].innerHTML === boxes[4].innerHTML && boxes[4].innerHTML === boxes[8].innerHTML)) {
                    return false;
                }
            } else if (diagonal2Boxes.includes(i)) {
                if (!(boxes[2].innerHTML === boxes[4].innerHTML && boxes[4].innerHTML === boxes[6].innerHTML)) {
                    return false;
                }
            }else{
                return false
            }
        }
    }

    return true
}
