import { Ball } from './ball.js';
import { Board } from "./board.js";

export class Game{
    constructor(gameContainer){
        gameContainer.innerHTML = '<canvas></canvas>'
        this.canvas = gameContainer.getElementsByTagName('canvas')[0];
        this.ctx = this.canvas.getContext('2d');

        this.canvas.height = 800;
        this.canvas.width = 800;
        this.board = new Board(this.ctx);
        this.ball = new Ball(this.ctx, this.board);
        this.animate();
    }

    animate(){
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.board.drawBoard();
        this.ball.drawBall();
        requestAnimationFrame(this.animate.bind(this));
    }
}
