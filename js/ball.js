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
    constructor(ctx, board, firstServePlayer = 0){
        this.ctx = ctx;
        this.board = board;
        this.position = { x:0, y:0, z:0};
        this.resetBallPosition(firstServePlayer);
        
        this.dX = 0;
        this.dY = 0;
        this.dZ = 0;
        this.isInvalid = false;
        this.lastPlayerTouched = null;
        this.isBeingServed = true;
        this.speedAfterBounche = SPEED_AFTER_BOUNCE;
        this.position2d = get2dCoordinate(this.position);
        this.bounches = 0;
        this.scoreTo = null;
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
        if (!this.isBeingServed) this.dY += ACCELERATION_DUE_TO_GRAVITY;
        if (this.ballAboveBoard() && this.detectCollision(BOARD.HEIGHT)) {
            this.bounches++;
            this.dY = this.speedAfterBounche;
            // Check if the position touched is valid or not 
            if( this.bounches <= 1 && 
                (   this.position.z < this.lastPlayerTouched*BOARD.LENGTH/2 + DISTANCE_TO_BOARD ||
                    this.position.z > (1 + this.lastPlayerTouched)*BOARD.LENGTH/2 + DISTANCE_TO_BOARD))
            {         
                this.isInvalid = true;
                this.scoreTo = 1-this.lastPlayerTouched;
            }
            else if(this.bounches>1){
                if( this.position.z < (1-this.lastPlayerTouched) * BOARD.LENGTH/2 + DISTANCE_TO_BOARD ||
                    this.position.z > (2-this.lastPlayerTouched) * BOARD.LENGTH/2 + DISTANCE_TO_BOARD )
                {
                    this.isInvalid = true;
                } else{
                    this.scoreTo = this.lastPlayerTouched;
                }
            }
        }
        this.position.x += this.dX;
        this.position.y += this.dY;
        this.position.z += this.dZ;
        if (this.detectCollision(BOARD.HEIGHT*2)) {
            this.dY = this.speedAfterBounche;
            this.isInvalid = true;
        }
        if (this.detectNetCollision()){
            this.dZ *= -0.2;
            this.dX *= 0.2;
            this.position.z += BOARD.BALL_RADIUS;
            this.speedAfterBounche *=0.2;
            this.isInvalid = true;
        }
    }

    detectNetCollision(){
        if(
            this.position.y + BOARD.BALL_RADIUS > BOARD.HEIGHT - BOARD.NET_HEIGHT &&
            this.position.y < BOARD.HEIGHT && 
            this.position.z + BOARD.BALL_RADIUS >= BOARD.LENGTH/2 &&
            this.position.z - BOARD.BALL_RADIUS <=  BOARD.LENGTH/2 &&
            Math.abs(this.position.x) <= BOARD.WIDTH/2
        ){
            return true;
        }
        return false;
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