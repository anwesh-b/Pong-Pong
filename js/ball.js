import { get2dCoordinate } from './utils.js';
import { BOARD_BALL_RADIUS, MAX_BALL_Z_DISTANCE, BOARD_LENTH, DISTANCE_TO_BOARD } from './constants.js';

export class Ball{
    constructor(ctx){
        this.ctx = ctx;
        this.x = 10;
        this.y = 45;
        this.z = 250;
        this.dZ = 1;
        this.position = get2dCoordinate(this.x,this.y,this.z);
    }

    drawBall(){
        if(this.z== DISTANCE_TO_BOARD - MAX_BALL_Z_DISTANCE || this.z== DISTANCE_TO_BOARD + BOARD_LENTH + MAX_BALL_Z_DISTANCE) this.dZ *= -1;
        this.z += this.dZ;
        this.position = get2dCoordinate(this.x,this.y,this.z);
        let currentRadius = this.position.x2d - get2dCoordinate(this.x + BOARD_BALL_RADIUS,this.y,this.z).x2d;
        this.ctx.beginPath();
        this.ctx.arc(this.position.x2d, this.position.y2d, Math.abs(currentRadius), 0, 2 * Math.PI);
        this.ctx.fillStyle = 'white'
        this.ctx.fill();
        this.ctx.stroke();
    }

    drawShadow(){
        
        this.ctx.beginPath();
        this.ctx.arc(this.position.x2d, this.position.y2d, Math.abs(currentRadius), 0, 2 * Math.PI);
        this.ctx.fillStyle = 'white'
        this.ctx.fill();
        this.ctx.stroke();
    }

    ballAboveBoard(){
        
    }
    // detectCollision(){

    // }
}