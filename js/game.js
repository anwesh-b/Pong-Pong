import { Ball } from './ball.js';
import { Board } from './board.js';
import { Bot } from './players/bot.js';
import { Human } from './players/human.js';
import { BOARD, DISTANCE_TO_BOARD } from './constants/board.js';
import { CANVAS_HEIGHT, CANVAS_WIDTH, BALL_RESET_POS, SPEED_AFTER_BOUNCE } from './constants/constants.js';

export class Game{
    constructor(gameContainer){
        gameContainer.innerHTML = '<canvas></canvas>'
        this.canvas = gameContainer.getElementsByTagName('canvas')[0];
        this.ctx = this.canvas.getContext('2d');
        this.canvas.height = CANVAS_HEIGHT;
        this.canvas.width = CANVAS_WIDTH;
        this.board = new Board(this.ctx);
        this.ball = new Ball(this.ctx, this.board, 1);
        this.player1 = new Human(this.ctx, 10, BOARD.HEIGHT*0.75, DISTANCE_TO_BOARD*3/4, 0);
        this.botPlayer = new Bot(this.ctx, 10, BOARD.HEIGHT*0.75, DISTANCE_TO_BOARD+BOARD.LENGTH, 1, this.ball);
        this.botPlayer.serveState = true;
        // this.player1.serveState = true;
        this.isPaused = false;
        this.currentServe = 0;
        this.maxServe = 2;
        this.servePlayer = this.botPlayer.playerId;
        this.runGame();
        this.botPlayer.serve();
    }

    runGame(){
        this.player1.detectCollision(this.ball);
        this.botPlayer.detectCollision(this.ball);
        if (this.ball.isInvalid == true) this.resetToServe(); 
        if (this.servePlayer === this.botPlayer.playerId && this.isPaused) {
            this.botPlayer.serve();
            this.isPaused = false;
        }
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ball.moveBall();
        // this.botPlayer.moveBot();
        if(this.ball.position.z > this.botPlayer.batPosition.z) this.ball.drawBall();
        if(this.ball.position.y >= BOARD.HEIGHT ) this.ball.drawBall();
        this.botPlayer.drawBat();
        this.board.drawBoard();
        if ( this.ball.position.y <= BOARD.HEIGHT && 
            this.ball.position.z <= this.botPlayer.batPosition.z) this.ball.drawBall();
        this.player1.drawBat();
        requestAnimationFrame(this.runGame.bind(this));
    }

    resetToServe(){
        this.isPaused = true;
        this.ball.isInvalid = false;
        this.ball.isBeingServed = true;
        this.ball.dX = 0;
        this.ball.dY = 0;
        this.ball.dZ = 0;
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
}
