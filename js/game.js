import { Ball } from './ball.js';
import { Board } from './board.js';
import { Bot } from './players/bot.js';
import { Human } from './players/human.js';
import { Scoreboard } from './scoreboard.js';
import { BOARD, DISTANCE_TO_BOARD } from './constants/board.js';
import { CANVAS_HEIGHT, CANVAS_WIDTH, BALL_RESET_POS, SPEED_AFTER_BOUNCE } from './constants/constants.js';

export class Game{
    constructor(gameContainer, gameMode, gameAt, serveChangeAt, p1Name, p2Name){
        this.gameMode = gameMode;
        if(this.gameMode === 0){
            gameContainer.innerHTML = `
                <canvas></canvas>
            `
        }else if(this.gameMode === 1){
            gameContainer.innerHTML = `
                <canvas></canvas>
                <canvas></canvas>
            `        
        }
        this.canvas = gameContainer.querySelectorAll('canvas');
        this.ctx = [];
        this.canvas.forEach((x)=>{
            this.ctx.push(x.getContext('2d'));
            x.height = CANVAS_HEIGHT;
            x.width = CANVAS_WIDTH;
        })
        this.gameOver = false;
        this.gameOverScore = gameAt;
        //First serve player
        this.servePlayer = 0;
    
        this.board = new Board(this.ctx);
        this.ball = new Ball(this.ctx, this.board, this.servePlayer);
        this.player1 = new Human(this.ctx, 10, BOARD.HEIGHT*0.75, DISTANCE_TO_BOARD*3/4, 0, p1Name);
        this.botPlayer = new Bot(this.ctx, 10, BOARD.HEIGHT*0.75, DISTANCE_TO_BOARD+BOARD.LENGTH, 1, p2Name, this.ball);
        this.players = [this.player1, this.botPlayer];
        
        this.players[this.servePlayer].serveState = true;
        if ( this.botPlayer.playerId === this.servePlayer ) this.botPlayer.serve();
        
        this.isPaused = false;
        this.currentServe = 0;
        this.maxServe = serveChangeAt;
        this.scoreBoard = new Scoreboard( this.ctx, this.player1, this.botPlayer );
        this.runGame();
        this.winner = null;
    }

    runGame(){
        this.player1.detectBallCollision(this.ball);
        this.botPlayer.detectBallCollision(this.ball);
        if (this.ball.isInvalid == true) this.resetToServe(); 
        if (this.servePlayer === this.botPlayer.playerId && this.isPaused) {
            this.botPlayer.serve();
            this.isPaused = false;
        }
        this.ctx.forEach((x, index)=>{
            x.fillStyle = "#ffffff";
            x.fillRect(0, 0, this.canvas[index].width, this.canvas[index].height);
        })
        this.ball.moveBall();
        if(this.ball.position.z > this.botPlayer.batPosition.z || this.ball.position.y >= BOARD.HEIGHT ) this.ball.drawBall();
        this.ctx.forEach((x, index)=>{
            this.players[1-index].drawBat(index);
        })
        this.board.drawBoard();
        if ( this.ball.position.y <= BOARD.HEIGHT && this.ball.position.z <= this.botPlayer.batPosition.z) this.ball.drawBall();
        this.ctx.forEach((x, index)=>{
            this.players[index].drawBat(index);
        })
        this.scoreBoard.displayScores();
        if(!this.gameOver) requestAnimationFrame(this.runGame.bind(this));
    }

    resetToServe(){
        if(this.ball.scoreTo != undefined) this.players[this.ball.scoreTo].score++;
        if( this.checkWonOrNot(this.players[0]) || this.checkWonOrNot(this.players[1]) ) {
            this.gameOver = true;
            if (this.players[0].score> this.players[1].score) gameEnd(this.players[0].name);
            else this.gameEnd(this.players[1].name);
        }   
        this.isPaused = true;
        this.ball.isInvalid = false;
        this.ball.isBeingServed = true;
        this.ball.dX = 0;
        this.ball.dY = 0;
        this.ball.dZ = 0;
        this.ball.bounches = 0;
        this.ball.speedAfterBounche = SPEED_AFTER_BOUNCE;
        if(this.isPaused){
            this.currentServe++;
            if(this.currentServe >= this.maxServe){
                if (this.servePlayer === this.player1.playerId) this.servePlayer = this.botPlayer.playerId;
                else this.servePlayer = this.player1.playerId;
                this.currentServe = 0;
            }
            if (this.servePlayer === this.player1.playerId) this.player1.serveState = true;
            else this.botPlayer.serveState = true;
            this.ball.resetBallPosition(this.servePlayer);
            this.isPaused = false;
        }
        this.isPaused = true;
    }

    gameEnd(winner){
        this.winner = winner;
    }

    checkWonOrNot(player){
        if (player.score >= this.gameOverScore) return true;
        return false        
    }
}
