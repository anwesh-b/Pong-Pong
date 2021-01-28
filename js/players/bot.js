import { Player } from "./player.js";
import { BOARD, BOARD_LENGTH, DISTANCE_TO_BOARD } from '../constants/board.js';
import { CHECK_BALL_TIMER } from '../constants/constants.js';

export class Bot extends Player{
    constructor(ctx, x, y, z, id, ball){
        super(ctx, x, y ,z, id)
        this.ball = ball;
        this.dX = 0;
        this.dY = 0;
        this.dZ = 0;   
        this.currentBallPos = this.ball.position;
        setInterval(this.moveBot.bind(this), CHECK_BALL_TIMER);
    }

    neededChange(){
        this.currentBallPos = this.ball.position;
        this.dX = (this.currentBallPos.x);
        if (this.ball.dZ >= 0 && 
            this.ball.position.z > DISTANCE_TO_BOARD + BOARD_LENGTH/2 &&
            this.ball.position.y > BOARD.HEIGHT * 3/ 4) {
            this.dY = this.currentBallPos.y;
        }
        this.dY= (this.currentBallPos.y+this.ball.dY) ;
        // this.dZ = (this.currentBallPos.z+this.ball.dZ) ;
    }

    moveBot(){
        this.neededChange();
        this.batPosition.x = this.dX;
        this.batPosition.y = this.dY;
        if (this.batPosition.y > BOARD.HEIGHT){
            this.batPosition.y -= 2* (this.batPosition.y - BOARD.HEIGHT)
        }
        if (this.batPosition.y < BOARD.HEIGHT/2){
            this.batPosition.y = BOARD.HEIGHT;
        }
    }

    serve(){
        setTimeout(()=>{
            this.ball.dZ = Math.random()*2+3;
            this.ball.dX = Math.random()*2-1;
            this.ball.dY = 0;
            this.ball.isBeingServed = false;
            setTimeout(()=>{this.serveState = false;},200)
        },1000)
    }
}