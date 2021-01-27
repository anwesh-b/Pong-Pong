import { get2dCoordinate } from './utils.js';
import { BALL_RESET_POS } from './constants/constants.js';
import { DISTANCE_TO_BOARD, BOARD, BOARD_COORDINATE } from './constants/board.js';
import { ACCELERATION_DUE_TO_GRAVITY, 
            SPEED_AFTER_BOUNCE, 
            INITIAL_DX, 
            INITIAL_DY, 
            INITIAL_DZ, 
            MAX_BALL_Z_DISTANCE 
        } from './constants/constants.js';

export class Ball{
    constructor(ctx, board){
        this.ctx = ctx;
        this.board = board;
        this.position = { x:0, y:0, z:0};
        this.resetBallPosition(0);
        
        this.dX = 0;
        this.dY = 0;
        this.dZ = 0;
        this.bouncheOut = false;
        this.lastPlayerTouched = null;
        this.isBeingServed = true;
        this.position2d = get2dCoordinate(this.position);
    }

    drawBall(){
        this.position2d = get2dCoordinate(this.position);
        this.currentRadius = this.position2d.x2d - get2dCoordinate({ x: this.position.x + BOARD.BALL_RADIUS, y: this.position.y, z: this.position.z}).x2d;
        this.ctx.beginPath();
        this.ctx.arc(this.position2d.x2d, this.position2d.y2d, Math.abs(this.currentRadius), 0, 2 * Math.PI);
        this.ctx.fillStyle = 'white'
        this.ctx.fill();
        this.ctx.stroke();
        if (this.ballAboveBoard()) this.drawShadow();
    }

    drawShadow(){
        let shadowPos = { x: this.position.x, y: BOARD.HEIGHT, z: this.position.z };
        var shadow = get2dCoordinate(shadowPos);
        this.ctx.beginPath();
        this.ctx.arc(shadow.x2d, shadow.y2d, Math.abs(this.currentRadius), 0, 2 * Math.PI);
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.21)'
        this.ctx.fill();
    }

    ballAboveBoard(){
        if (this.position.x > BOARD_COORDINATE.leftBot.x && 
            this.position.x < BOARD_COORDINATE.rightBot.x && 
            this.position.z < BOARD_COORDINATE.leftBot.z && 
            this.position.z > BOARD_COORDINATE.leftTop.z)
        {
            return true;
        }
        return false;
    }

    moveBall(){
        // if( this.position.z <= DISTANCE_TO_BOARD - MAX_BALL_Z_DISTANCE || 
        //     this.position.z>= DISTANCE_TO_BOARD + BOARD.LENGTH + MAX_BALL_Z_DISTANCE) 
        // {
        //     this.dZ *= -1;
        //     this.dX *= -1;
        // }
        if (!this.isBeingServed) this.dY += ACCELERATION_DUE_TO_GRAVITY;
        if (this.ballAboveBoard() && this.detectCollision(BOARD.HEIGHT)) this.dY = SPEED_AFTER_BOUNCE;
        this.position.x += this.dX;
        this.position.y += this.dY;
        this.position.z += this.dZ;
        if (this.detectCollision(BOARD.HEIGHT*2)) {
            this.dY = SPEED_AFTER_BOUNCE;
            this.bouncheOut = true;
        }
    }

    detectCollision(height){
        if (this.position.y + BOARD.BALL_RADIUS >= height ) return true;
        else return false;
    }

    resetBallPosition(id){
        this.position.x = BALL_RESET_POS[id].x
        this.position.y = BALL_RESET_POS[id].y
        this.position.z = BALL_RESET_POS[id].z
    }
}