import { BOARD, DISTANCE_TO_BOARD } from '../constants/board.js';
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

    detectBallCollision(ball){
        if (ball.position.x + BOARD.BALL_RADIUS > this.batPosition.x - BAT_WIDTH/2 && 
            ball.position.x - BOARD.BALL_RADIUS < this.batPosition.x + BAT_WIDTH/2 &&
            ball.position.y + BOARD.BALL_RADIUS > this.batPosition.y - BAT_HEIGHT/2 &&
            ball.position.y - BOARD.BALL_RADIUS < this.batPosition.y + BAT_HEIGHT/2 &&
            ball.position.z + BOARD.BALL_RADIUS > this.batPosition.z &&
            ball.position.z - BOARD.BALL_RADIUS< this.batPosition.z){
                ball.dZ *= -1;
                ball.dX += Math.sin((ball.position.x - this.batPosition.x) * Math.PI / (BAT_WIDTH * 2))
                ball.dY = -2;
                if (ball.dZ >0 ) ball.dZ = 8;
                else ball.dZ = -8;
                if( this.serveState) {
                    ball.dY = 0;
                    if (this.batPosition.z > BOARD.WIDTH/2 + DISTANCE_TO_BOARD)  ball.dZ = -5;
                    else ball.dZ = 5;
                    this.serveState = false;
                }
                console.log(this.serveState);
                ball.lastPlayerTouched = this.playerId;
                ball.isBeingServed = false;
            }
    }
}