import { Game } from "./game.js";
import { GameLayout } from './constants/gamelayout.js';
import { PLAYER_PROJECTOR } from "./constants/constants.js";

export class TableTennis{
    /**
     * @constructs TableTennis
     * @param Object Container Object for our game
     */
    constructor(ttContainer){
        ttContainer.innerHTML += GameLayout;
        this.tempProjX = null;
        this.dashBoardContainer = document.querySelector('.dashboard-container');
        this.dashBoard = document.querySelector('.dashboard');
        this.settingButton = this.dashBoard.querySelector('#setting-icon');
        this.gameModes = this.dashBoard.querySelector('ul').querySelectorAll('li');
        this.settingContainer = document.querySelector('.setting-container');
        this.settingMenu = this.settingContainer.querySelector('.settings').querySelector('table').querySelectorAll('tr');
        this.saveButton = this.settingContainer.querySelector('.settings').querySelector('button');
        this.backButton = document.querySelector('#back-settings');
        this.postGameContainer = document.querySelector('.postGameContainer');
        this.gameContainer = document.getElementById('ping-pong-container');
        this.quitGame = document.querySelector('.quit-game');
        this.replay = this.postGameContainer.querySelector('#play-again');

        this.game = null;
        this.playerName = localStorage.getItem('playerName') || 'Player 1';
        this.player2Name = localStorage.getItem('player2Name') || 'Player 2';
        this.gameAt = localStorage.getItem('gameAt') || '11';
        this.changeServeAt = localStorage.getItem('changeServeAt') || '2';
        this.maxGame = localStorage.getItem('maxGame') || '1';
        this.setAllEventListeners();
    }

    setAllEventListeners(){
        this.settingButton.addEventListener('click',()=>{
            this.dashBoard.style.display = 'none';
            this.settingContainer.style.display = 'block';
            this.settingMenu.forEach((x,index)=>{
                this.getSettings(x,index);
            })
        })
    
        this.backButton.addEventListener('click',()=>{
            this.dashBoard.style.display = 'block';
            this.settingContainer.style.display = 'none';
        })
    
        this.gameModes.forEach((x,index)=>{
            x.addEventListener('click',()=>{
                this.dashBoardContainer.style.display = 'none';
                this.gameContainer.style.display = 'block';
                this.quitGame.style.display = 'block';
                this.tempProjX = PLAYER_PROJECTOR.viewerPosition.x;
                if (index === 0) this.game = new Game(this.gameContainer, index, this.gameAt, this.changeServeAt, this.maxGame, this.playerName, "Henry");
                else if (index === 1) this.game = new Game(this.gameContainer, index, this.gameAt, this.changeServeAt, this.maxGame, this.playerName, this.player2Name);
                this.checkGameOver();
            })
        })
    
        this.saveButton.addEventListener('click',()=>{
            this.settingMenu.forEach((x, index)=>{
                this.setSettings(x,index);
            })
            setTimeout(()=>{
                this.settingContainer.style.display = 'none';
                this.dashBoard.style.display = 'block';
            },200)
        })
    
        this.replay.addEventListener('click',()=>{
            this.postGameContainer.style.display = 'none';
            this.dashBoardContainer.style.display = 'block';
            this.dashBoard.style.display ='block';
        })

        this.quitGame.addEventListener('click',()=>{
            PLAYER_PROJECTOR.viewerPosition.x = this.tempProjX;
            this.game.gameOver = true;
            delete this.game;
            // this.game = null;
            this.dashBoardContainer.style.display = 'block';
            this.quitGame.style.display = 'none';
            this.gameContainer.style.display = 'none';
            this.postGameContainer.style.display = 'none';
        })
    }
    
    
    checkGameOver(){
        if(!this.game) return;
        if(this.game.gameOver){
            this.postGame(this.game.winner);
            delete this.game;
            this.game = null;
        }else{
            requestAnimationFrame(this.checkGameOver.bind(this));
        }
    }
    
    postGame(winner){
        PLAYER_PROJECTOR.viewerPosition.x = this.tempProjX;
        this.postGameContainer.style.display = 'block';
        this.quitGame.style.display = 'none';
        this.gameContainer.style.display = 'none';
        this.postGameContainer.querySelector('span').innerHTML = winner;
    }
    
    getSettings(x,index){
        switch(index){
            case 0:         //Player Name
                x.querySelector('input').value = this.playerName;
                break;
            case 1:         //Player Name
                x.querySelector('input').value = this.player2Name;
                break;
            case 2:      //Best Of
                x.querySelectorAll('input').forEach((y)=>{
                    if(y.value === this.maxGame) {
                        y.checked = "checked";
                        return;
                    }
                })
                break;
            case 3:         //Game At
                x.querySelectorAll('input').forEach((x)=>{
                    if (x.value === this.gameAt){
                        x.checked = "checked";
                        return;
                    } 
                })
                break;
            case 4:         //Change Serve At
                x.querySelectorAll('input').forEach((x)=>{
                    if (x.value === this.changeServeAt){
                        x.checked="checked";
                        return;
                    } 
                })  
                break;
            default:
                break;
        }
    }
    
    setSettings(x,index){
        switch(index){
            case 0:         //Player1 Name
                if(x.querySelector('input').value){
                    this.playerName = x.querySelector('input').value;
                    localStorage.setItem('playerName', this.playerName);
                }
                break;
            case 1:         //Player2 Name
                if(x.querySelector('input').value){
                    this.player2Name = x.querySelector('input').value;
                    localStorage.setItem('player2Name', this.player2Name);
                }
                break;
            case 2:      //Best Of
                x.querySelectorAll('input').forEach((y)=>{
                    if(y.checked) {
                        this.maxGame = y.value;
                        localStorage.setItem('maxGame', this.maxGame);
                        return;
                    }
                })
                break;
            case 3:         //Game At
                let temp2 = x.querySelectorAll('input');
                temp2.forEach((y)=>{
                    if(y.checked) {
                        this.gameAt = y.value;
                        localStorage.setItem('gameAt', this.gameAt);
                        return;
                    }
                })
                break;
            case 4:         //Change Serve At
                let temp3 = x.querySelectorAll('input');
                temp3.forEach((y)=>{
                    if(y.checked){
                        this.changeServeAt = y.value;
                        localStorage.setItem('changeServeAt', this.changeServeAt);
                        return;
                    }
                })
                break;
            default:
                break;
        }
    }
}
