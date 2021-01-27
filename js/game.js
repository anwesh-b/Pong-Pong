import { Ball } from './ball.js';
import { Board } from './board.js';
import { Bot } from './players/bot.js';
import { Human } from './players/human.js';
import { BOARD, DISTANCE_TO_BOARD } from './constants/board.js';
import { CANVAS_HEIGHT, CANVAS_WIDTH, BALL_RESET_POS } from './constants/constants.js';

export class Game{
    constructor(gameContainer){
        gameContainer.innerHTML = '<canvas></canvas>'
        this.canvas = gameContainer.getElementsByTagName('canvas')[0];
        this.ctx = this.canvas.getContext('2d');
        this.canvas.height = CANVAS_HEIGHT;
        this.canvas.width = CANVAS_WIDTH;
        this.board = new Board(this.ctx);
        this.ball = new Ball(this.ctx, this.board);
        this.player1 = new Human(this.ctx, 10, BOARD.HEIGHT*0.75, DISTANCE_TO_BOARD*3/4, 0);
        this.botPlayer = new Bot(this.ctx, 10, BOARD.HEIGHT*0.75, DISTANCE_TO_BOARD+BOARD.LENGTH, 1, this.ball);
        this.player1.serveState = true;
        this.isPaused = true;
        this.runGame();
    }

    runGame(){
        this.player1.detectCollision(this.ball);
        this.botPlayer.detectCollision(this.ball);
        if (this.ball.bouncheOut == true) this.resetToServe(); 
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ball.moveBall();
        // this.botPlayer.moveBot();
        this.botPlayer.drawBat();
        this.board.drawBoard();
        this.ball.drawBall();
        this.player1.drawBat();
        requestAnimationFrame(this.runGame.bind(this));
    }

    resetToServe(){
        this.isPaused = true;
        this.ball.bouncheOut = false;
        this.ball.isBeingServed = true;
        this.player1.serveState = true;
        this.ball.dX = 0;
        this.ball.dY = 0;
        this.ball.dZ = 0;
        this.player1.serveState = true;
        setTimeout(()=>{
            // this.ball.position = { x: 50, y: 100, z:40};
            // this.ball.position = BALL_RESET_POS;
            this.ball.resetBallPosition(0);
            // this.ball.position.x = BALL_RESET_POS.x;
            // this.ball.position.y = BALL_RESET_POS.y;
            // this.ball.position.z = BALL_RESET_POS.z;
        },1000);
    }
}
