import { get2dCoordinate } from '../utils.js';
import { BOARD } from '../constants/board.js';
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
        let batHeightWidth = get2dCoordinate({x: this.batPosition.x + BAT_WIDTH, y:  this.batPosition.y + BAT_HEIGHT, z: this.batPosition.z})
        let batHeight = Math.abs(batHeightWidth.x2d - this.bat2dPosition.x2d)
        let batWidth = Math.abs(batHeightWidth.y2d - this.bat2dPosition.y2d)
        this.ctx.drawImage(this.bat, this.bat2dPosition.x2d - batHeight, this.bat2dPosition.y2d,batHeight, batWidth);
    }
    detectCollision(ball){
        if (ball.position.x + BOARD.BALL_RADIUS > this.batPosition.x && ball.position.x - BOARD.BALL_RADIUS < this.batPosition.x + BAT_WIDTH){
            if ( ball.position.y + BOARD.BALL_RADIUS > this.batPosition.y && ball.position.y - BOARD.BALL_RADIUS < this.batPosition.y + BAT_HEIGHT){
                // if (ball.position.z + BOARD.BALL_RADIUS > this.batPosition.z && ball.position.z - BOARD.BALL_RADIUS< this.batPosition.z){
                    console.log(ball.position);
                    console.log(this.batPosition);
                    ball.dZ *= -1;
                    // ball.dX *= -1;
                // }
            }
        }
        this.batPosition.x;
        this.batPosition.y;
        this.batPosition.x;
    }
}