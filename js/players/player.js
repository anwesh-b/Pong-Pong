import { get2dCoordinate } from '../utils.js';
import { BAT_HEIGHT, BAT_WIDTH } from '../constants/constants.js';
import { BOARD, DISTANCE_TO_BOARD, BOARD_LENGTH } from '../constants/board.js';

export class Player{
    constructor(ctx, x, y, z, id, name){
        this.ctx = ctx;
        this.playerId = id;
        this.name = name;
        this.bat = new Image();
        this.bat.src = './assets/bat.png';
        this.audio = new Audio();
        this.audio.src = './assets/bat.m4a';
        this.batPosition = {x:x, y:y, z:z};
        // this.bat2dPosition = get2dCoordinate(this.batPosition);
        this.serveState = false;    
        this.score = 0;   
        this.games = 0; 
    }
    drawBat(index){
        let bat2dPosition = 0;
        let batHeightWidth = 0;
        let batWidth = 0;
        let batHeight = 0;
        switch(index){
            case 0:
                bat2dPosition = get2dCoordinate(this.batPosition);
                batHeightWidth = get2dCoordinate({x: this.batPosition.x + BAT_WIDTH, y:  this.batPosition.y + BAT_HEIGHT, z: this.batPosition.z});
                batWidth = Math.abs(batHeightWidth.x2d - bat2dPosition.x2d);
                batHeight = Math.abs(batHeightWidth.y2d - bat2dPosition.y2d);
                break;
            case 1:
                bat2dPosition = get2dCoordinate({x: -1*this.batPosition.x , y:  this.batPosition.y , z: DISTANCE_TO_BOARD + BOARD_LENGTH/2 - 1 * (this.batPosition.z - DISTANCE_TO_BOARD - BOARD_LENGTH/2) });
                batHeightWidth = get2dCoordinate({x: -1*this.batPosition.x + BAT_WIDTH, y:  this.batPosition.y + BAT_HEIGHT, z: DISTANCE_TO_BOARD + BOARD_LENGTH/2 - 1 * (this.batPosition.z - DISTANCE_TO_BOARD - BOARD_LENGTH/2) });
                batWidth = Math.abs(batHeightWidth.x2d - bat2dPosition.x2d);
                batHeight = Math.abs(batHeightWidth.y2d - bat2dPosition.y2d);
                break;
            default:
                break;
        }
        this.ctx[index].globalAlpha = 0.7;
        this.ctx[index].drawImage(this.bat, bat2dPosition.x2d - batWidth /2 , bat2dPosition.y2d - (batHeight /2), batWidth, batHeight);
        this.ctx[index].globalAlpha = 1;     
    }

    detectBallCollision(ball){
        if (ball.position.x + BOARD.BALL_RADIUS > this.batPosition.x - BAT_WIDTH/2 && 
            ball.position.x - BOARD.BALL_RADIUS < this.batPosition.x + BAT_WIDTH/2 &&
            ball.position.y + BOARD.BALL_RADIUS > this.batPosition.y - BAT_HEIGHT/2 &&
            ball.position.y - BOARD.BALL_RADIUS < this.batPosition.y + BAT_HEIGHT/2 &&
            ball.position.z + BOARD.BALL_RADIUS > this.batPosition.z &&
            ball.position.z - BOARD.BALL_RADIUS< this.batPosition.z){
                this.audio.play();
                if(!ball.isBounched) ball.isInvalid = true;
                ball.dZ *= -1;
                ball.dX += Math.sin((ball.position.x - this.batPosition.x) * Math.PI / (BAT_WIDTH * 2))
                ball.dY = -2.5;
                if (ball.dZ >0 ) ball.dZ = 8;
                else ball.dZ = -8;
                if( this.serveState) {
                    ball.dY = 0;
                    if (this.batPosition.z > BOARD.WIDTH/2 + DISTANCE_TO_BOARD)  ball.dZ = -5;
                    else ball.dZ = 5;
                    this.serveState = false;
                }
                ball.lastPlayerTouched = this.playerId;
                ball.isBeingServed = false;
                ball.isBounched = false;
            }
    }
}