import { Player } from "./player.js";
import { BOARD, BOARD_LENGTH, DISTANCE_TO_BOARD } from '../constants/board.js';
import { CHECK_BALL_TIMER } from '../constants/constants.js';

export class Bot extends Player{
    constructor(ctx, x, y, z, ball){
        super(ctx, x, y ,z)
        this.ball = ball;
        this.dX = 0;
        this.dY = 0;
        this.dZ = 0;   

        // this.pastBallPos = this.ball.position;
        this.currentBallPos = this.ball.position;
        setInterval(this.moveBot.bind(this), CHECK_BALL_TIMER);
    }

    neededChange(){
        // this.pastBallPos = this.currentBallPos;
        this.currentBallPos = this.ball.position;
        this.dX = (this.currentBallPos.x) ;
        if (this.ball.dZ >= 0 && 
            this.ball.position.z > DISTANCE_TO_BOARD + BOARD_LENGTH/2 &&
            this.ball.position.y > BOARD.HEIGHT * 3/ 4) {
            this.dY = this.currentBallPos.y;
        }
        // this.dY= (this.currentBallPos.y+this.ball.dY) ;
        // this.dZ = (this.currentBallPos.z+this.ball.dZ) ;
    }

    moveBot(){
        this.neededChange();
        console.log(this.ball);

        console.log(this.batPosition);
        // console.log(this.dX, this.dY, this.dZ);
        this.batPosition.x = this.dX;
        this.batPosition.y = this.dY;
        // this.batPosition.z += this.dZ;
        if (this.batPosition.y > BOARD.HEIGHT){
            this.batPosition.y -= 2* (this.batPosition.y - BOARD.HEIGHT)
        }
    }
}