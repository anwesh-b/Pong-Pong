import { BOARD } from '../constants/board.js';
import { get2dCoordinate } from '../utils.js';
import { BAT_HEIGHT, BAT_WIDTH } from '../constants/constants.js';

export class Player{
    constructor(ctx, x, y, z){
        this.ctx = ctx;
        this.bat = new Image();
        this.bat.src = './assets/bat.png';
        this.batPosition = {x: x, y: y, z: z};
        this.bat2dPosition = get2dCoordinate(this.batPosition);
        
    }
    drawBat(){
        this.bat2dPosition = get2dCoordinate(this.batPosition);
        console.log(this.batPosition);
        console.log(this.bat2dPosition);
        let batHeightWidth = get2dCoordinate({x: this.batPosition.x + BAT_WIDTH, y:  this.batPosition.y + BAT_HEIGHT, z: this.batPosition.z})
        let batWidth = Math.abs(batHeightWidth.x2d - this.bat2dPosition.x2d)
        let batHeight = Math.abs(batHeightWidth.y2d - this.bat2dPosition.y2d)
        this.ctx.globalAlpha = 0.7;
        this.ctx.drawImage(this.bat, this.bat2dPosition.x2d - batWidth /2 , this.bat2dPosition.y2d - (batHeight /2), batWidth, batHeight);
        this.ctx.globalAlpha = 1;
    }
    detectCollision(ball){
        if (ball.position.x + BOARD.BALL_RADIUS > this.batPosition.x - BAT_WIDTH/2 && 
            ball.position.x - BOARD.BALL_RADIUS < this.batPosition.x + BAT_WIDTH/2 &&
            ball.position.y + BOARD.BALL_RADIUS > this.batPosition.y - BAT_HEIGHT/2 &&
            ball.position.y - BOARD.BALL_RADIUS < this.batPosition.y + BAT_HEIGHT/2 &&
            ball.position.z + BOARD.BALL_RADIUS > this.batPosition.z &&
            ball.position.z - BOARD.BALL_RADIUS< this.batPosition.z){
                    console.log(ball.position);
                    console.log(this.batPosition);
                    ball.dZ *= -1;
        }
        this.batPosition.x;
        this.batPosition.y;
        this.batPosition.x;
    }
}