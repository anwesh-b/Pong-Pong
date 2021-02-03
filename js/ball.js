import { get2dCoordinate } from './utils.js';
import { BALL_RESET_POS } from './constants/constants.js';
import { DISTANCE_TO_BOARD, BOARD, BOARD_COORDINATE, BOARD_LENGTH } from './constants/board.js';
import { ACCELERATION_DUE_TO_GRAVITY, 
            SPEED_AFTER_BOUNCE, 
            INITIAL_DX, 
            INITIAL_DY, 
            INITIAL_DZ, 
            MAX_BALL_Z_DISTANCE 
        } from './constants/constants.js';

export class Ball{
    constructor(ctx, board, gameMode, firstServePlayer = 0){
        this.ctx = ctx;
        this.board = board;
        this.position = { x:0, y:0, z:0};
        this.resetBallPosition(firstServePlayer);
        this.gameMode = gameMode;        
        this.dX = 0;
        this.dY = 0;
        this.dZ = 0;
        this.isInvalid = false;
        this.lastPlayerTouched = null;
        this.isBeingServed = true;
        this.speedAfterBounche = SPEED_AFTER_BOUNCE;
        // this.position2d = get2dCoordinate(this.position);
        this.bounches = 0;
        this.scoreTo = null;
        this.sound = new Audio('./assets/bounche.m4a');
        this.sound.volume = 0.5;
    }

    drawBall(){
        this.ctx.forEach((x, index ) => {
            let position2d = 0;
            switch(index){
                case 0:
                    position2d = get2dCoordinate({x:this.position.x, y:this.position.y, z: this.position.z});
                    this.currentRadius = position2d.x2d - get2dCoordinate({ x: this.position.x + BOARD.BALL_RADIUS, y: this.position.y, z: this.position.z}).x2d;
                    break;
                case 1:
                    position2d = get2dCoordinate({x: -1* this.position.x, y:this.position.y, z: DISTANCE_TO_BOARD + BOARD_LENGTH/2 - 1 * (this.position.z - DISTANCE_TO_BOARD - BOARD_LENGTH/2)});
                    this.currentRadius = position2d.x2d - get2dCoordinate({ x: -1* this.position.x + BOARD.BALL_RADIUS, y: this.position.y, z: DISTANCE_TO_BOARD + BOARD_LENGTH/2 - 1 * (this.position.z - DISTANCE_TO_BOARD - BOARD_LENGTH/2) }).x2d;
                    break;
                default:
                    break;
            }
            x.beginPath();
            x.arc(position2d.x2d, position2d.y2d, Math.abs(this.currentRadius), 0, 2 * Math.PI);
            x.fillStyle = 'white'
            x.fill();
            x.stroke();
        });
        if (this.ballAboveBoard()) this.drawShadow();
    }

    drawShadow(){
        this.ctx.forEach((x,index) => {
            let shadowPos = 0;
            let shadow = get2dCoordinate(shadowPos);
            switch(index){
                case 0:
                    shadowPos = { x: this.position.x, y: BOARD.HEIGHT, z: this.position.z };
                    shadow = get2dCoordinate(shadowPos);
                    this.currentRadius = shadow.x2d - get2dCoordinate({ x: this.position.x + BOARD.BALL_RADIUS, y: BOARD.HEIGHT, z: this.position.z }).x2d;
                    break;
                case 1:
                    shadowPos = { x: -1*this.position.x, y: BOARD.HEIGHT, z: DISTANCE_TO_BOARD + BOARD_LENGTH/2 - 1 * (this.position.z - DISTANCE_TO_BOARD - BOARD_LENGTH/2) };
                    shadow = get2dCoordinate(shadowPos);
                    this.currentRadius = shadow.x2d - get2dCoordinate({ x: -1* this.position.x + BOARD.BALL_RADIUS, y: BOARD.HEIGHT, z: DISTANCE_TO_BOARD + BOARD_LENGTH/2 - 1 * (this.position.z - DISTANCE_TO_BOARD - BOARD_LENGTH/2) }).x2d;
                    break;
                default:
                    break;
            }
            x.beginPath();
            x.arc(shadow.x2d, shadow.y2d, Math.abs(this.currentRadius), 0, 2 * Math.PI);
            x.fillStyle = 'rgba(0, 0, 0, 0.21)'
            x.fill();    
        });
    }

    ballAboveBoard(){
        if (this.position.x > BOARD_COORDINATE[this.gameMode].leftBot.x && 
            this.position.x < BOARD_COORDINATE[this.gameMode].rightBot.x && 
            this.position.z < BOARD_COORDINATE[this.gameMode].leftBot.z && 
            this.position.z > BOARD_COORDINATE[this.gameMode].leftTop.z)
        {
            return true;
        }
        return false;
    }

    moveBall(){
        if (!this.isBeingServed) this.dY += ACCELERATION_DUE_TO_GRAVITY;
        if (this.ballAboveBoard() && this.detectCollision(BOARD.HEIGHT)) {
            // debugger;
            this.bounches++;
            this.sound.play();
            this.dY = this.speedAfterBounche;
            // Check if the position touched is valid or not 
            if( this.bounches <= 1 && this.isValidServeBounche()){         
                this.isInvalid = true;
                this.scoreTo = 1-this.lastPlayerTouched;
            }
            else if(this.bounches>1){
                if( this.isValidBounche()) this.isInvalid = true;
                else this.scoreTo = this.lastPlayerTouched;
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
            debugger;
            this.dZ *= -0.2;
            this.dX *= 0.2;
            this.position.z += BOARD.BALL_RADIUS;
            this.speedAfterBounche *=0.2;
            this.isInvalid = true;
            this.sound.play();
        }
    }

    detectNetCollision(){
        if(
            this.position.y + BOARD.BALL_RADIUS > BOARD.HEIGHT - BOARD.NET_HEIGHT &&
            this.position.y < BOARD.HEIGHT && 
            this.position.z + BOARD.BALL_RADIUS >= BOARD.LENGTH/2 + DISTANCE_TO_BOARD &&
            this.position.z - BOARD.BALL_RADIUS <=  BOARD.LENGTH/2 + DISTANCE_TO_BOARD &&
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
    
    isValidServeBounche(){
        if ( this.position.z < this.lastPlayerTouched*BOARD.LENGTH/2 + DISTANCE_TO_BOARD && 
            this.position.z > (1 + this.lastPlayerTouched)*BOARD.LENGTH/2 + DISTANCE_TO_BOARD){
                return true;
            }
        else return false;
    }

    isValidBounche(){
        if( this.position.z < (1-this.lastPlayerTouched) * BOARD.LENGTH/2 + DISTANCE_TO_BOARD &&
            this.position.z > (2-this.lastPlayerTouched) * BOARD.LENGTH/2 + DISTANCE_TO_BOARD ){
                return true;
            }
        else return false;
    }
}