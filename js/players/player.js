import { BOARD } from '../constants/board.js';
import { get2dCoordinate } from '../utils.js';
import { BAT_HEIGHT, BAT_WIDTH } from '../constants/constants.js';

export class Player{
    constructor(ctx, x, y, z, id){
        this.ctx = ctx;
        this.playerId = id;
        this.bat = new Image();
        this.bat.src = './assets/bat.png';
        this.batPosition = {x:x, y:y, z:z};
        this.bat2dPosition = get2dCoordinate(this.batPosition);
        this.serveState = false;        
    }
    drawBat(){
        this.bat2dPosition = get2dCoordinate(this.batPosition);
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
                console.log('mmm');
                ball.dZ *= -1;
                ball.dX += Math.sin((ball.position.x - this.batPosition.x) * Math.PI / (BAT_WIDTH * 2))
                if( this.serveState) {
                    ball.dZ = 5;
                    this.serveState = false;
                }
                ball.lastPlayerTouched = this.playerId;
                ball.isBeingServed = false;
            }
    }
}