import { Game } from "./game.js";


const dashBoardContainer = document.querySelector('.dashboard-container');
const dashBoard = document.querySelector('.dashboard');
const settingButton = dashBoard.querySelector('#setting-icon');
const gameModes = dashBoard.querySelector('ul').querySelectorAll('li');
const settingPage = document.querySelector('.setting-container');
const settingMenu = settingPage.querySelector('.settings').querySelector('ul').querySelectorAll('li');
const saveButton = settingPage.querySelector('.settings').querySelector('button');
const backButton = document.querySelector('#back-settings');

const gameContainer = document.getElementById('ping-pong-container');

let game = null;
let playerName = localStorage.getItem('playerName') || 'Player 1';
let gameAt = localStorage.getItem('gameAt') || 11;

settingButton.addEventListener('click',()=>{
   dashBoard.style.display = 'none';
   settingPage.style.display = 'block';
})

backButton.addEventListener('click',()=>{
    dashBoard.style.display = 'block';
    settingPage.style.display = 'none';
})

gameModes.forEach((x,index)=>{
    x.addEventListener('click',()=>{
        dashBoardContainer.style.display = 'none';
        gameContainer.style.display = 'block';
        game = new Game(gameContainer, gameAt,  playerName, "Henry");
        checkGameOver();
    })
})

saveButton.addEventListener('click',()=>{
    settingMenu.forEach((x, index)=>{
        switch(index){
            case 0:
                if(x.querySelector('input').value){
                    playerName = x.querySelector('input').value;
                    localStorage.setItem('playerName', playerName);
                }
                break;
            // case 1:
            //     let temp = x.querySelectorAll('input');
            //     temp.forEach((y)=>{
            //         if(y.checked) console.log(y.value);
            //     })
            //     break;
            case 2:
                let temp2 = x.querySelectorAll('input');
                temp2.forEach((y)=>{
                    if(y.checked) {
                        gameAt = y.value;
                        localStorage.setItem('gameAt', gameAt);
                        return;
                    }
                })
                break;
            // case 3:
            //     break;
            default:
                break;
        }
    })
    console.log('Saved');
})

function checkGameOver(){
    if(game.gameOver){
        postGame(game.winner);
        game = null;
    }else{
        requestAnimationFrame(checkGameOver);
    }
}

function postGame(winner){
    console.log(`${winner} won`);
}