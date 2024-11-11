import { get2dCoordinate } from './utils.js';
import { BOARD_COORDINATE, BOARD_STAND_WIDTH } from './constants/board.js';

export class Board{
    /**
     * @constructs Board
     * @param Array  Array of Canvas Context
     * @param Number GameMode ie. vs Bot or vs Friend
     */
    constructor(ctx, gameMode){
        this.ctx = ctx;
        this.gameMode = gameMode;
        this.netTop = 3;
        this.netSides = 3;
        this.netBotRadius = 10;    
        //Board Edges
        this.leftBot = get2dCoordinate( BOARD_COORDINATE[this.gameMode].leftBot );
        this.leftTop = get2dCoordinate( BOARD_COORDINATE[this.gameMode].leftTop );
        this.rightBot = get2dCoordinate( BOARD_COORDINATE[this.gameMode].rightBot );
        this.rightTop = get2dCoordinate( BOARD_COORDINATE[this.gameMode].rightTop );
        
        //Board Inner Edges
        this.innerLeftBot = get2dCoordinate( BOARD_COORDINATE[this.gameMode].innerLeftBot );
        this.innerLeftTop = get2dCoordinate( BOARD_COORDINATE[this.gameMode].innerLeftTop );
        this.innerRightBot = get2dCoordinate( BOARD_COORDINATE[this.gameMode].innerRightBot );
        this.innerRightTop = get2dCoordinate( BOARD_COORDINATE[this.gameMode].innerRightTop );
        this.innerMidLeftBot =  get2dCoordinate( BOARD_COORDINATE[this.gameMode].innerMidLeftBot );
        this.innerMidLeftTop = get2dCoordinate( BOARD_COORDINATE[this.gameMode].innerMidLeftTop );
        this.innerMidRightBot =  get2dCoordinate( BOARD_COORDINATE[this.gameMode].innerMidRightBot );
        this.innerMidRightTop = get2dCoordinate( BOARD_COORDINATE[this.gameMode].innerMidRightTop );
        //Net Edges
        this.netLeftBot = get2dCoordinate( BOARD_COORDINATE[this.gameMode].netLeftBot );
        this.netLeftTop = get2dCoordinate( BOARD_COORDINATE[this.gameMode].netLeftTop );
        this.netRightBot = get2dCoordinate( BOARD_COORDINATE[this.gameMode].netRightBot );
        this.netRightTop = get2dCoordinate( BOARD_COORDINATE[this.gameMode].netRightTop );
        //Stand Positions
        this.leftTopStandUpper = get2dCoordinate( BOARD_COORDINATE[this.gameMode].leftTopStandUpper );
        this.leftTopStandLower = get2dCoordinate( BOARD_COORDINATE[this.gameMode].leftTopStandLower );
        this.leftBotStandUpper =  get2dCoordinate( BOARD_COORDINATE[this.gameMode].leftBotStandUpper );
        this.leftBotStandLower =  get2dCoordinate( BOARD_COORDINATE[this.gameMode].leftBotStandLower );
        this.rightTopStandUpper = get2dCoordinate( BOARD_COORDINATE[this.gameMode].rightTopStandUpper );
        this.rightTopStandLower = get2dCoordinate( BOARD_COORDINATE[this.gameMode].rightTopStandLower );
        this.rightBotStandUpper = get2dCoordinate( BOARD_COORDINATE[this.gameMode].rightBotStandUpper);
        this.rightBotStandLower = get2dCoordinate( BOARD_COORDINATE[this.gameMode].rightBotStandLower );
    }

    drawStand(upper,lower){
        this.ctx.forEach((x) => {
            x.beginPath();
            x.moveTo(upper.x2d + (BOARD_STAND_WIDTH/2), upper.y2d);
            x.lineTo(upper.x2d - (BOARD_STAND_WIDTH/2), upper.y2d);
            x.lineTo(lower.x2d - (BOARD_STAND_WIDTH/2), lower.y2d);
            x.lineTo(lower.x2d + (BOARD_STAND_WIDTH/2), lower.y2d);
            x.closePath();
            x.fillStyle = 'brown';
            x.fill();
            x.beginPath();
            x.arc(lower.x2d, lower.y2d, BOARD_STAND_WIDTH/2 , 0, 2*Math.PI);
            x.fill();
        });
    }

    drawStands(){
        this.drawStand(this.leftTopStandUpper, this.leftTopStandLower);  
        this.drawStand(this.leftBotStandUpper, this.leftBotStandLower);  
        this.drawStand(this.rightTopStandUpper, this.rightTopStandLower);  
        this.drawStand(this.rightBotStandUpper, this.rightBotStandLower);  
    }

    drawMainBoard(){
        this.ctx.forEach((x) => {
            x.beginPath();
            x.moveTo(this.leftBot.x2d, this.leftBot.y2d);
            x.lineTo(this.rightBot.x2d, this.rightBot.y2d);
            x.lineTo(this.rightTop.x2d, this.rightTop.y2d);
            x.lineTo(this.leftTop.x2d, this.leftTop.y2d);
            x.closePath();
            x.stroke();
            x.fillStyle = 'white';
            x.fill();
            return;
        });
    }

    drawBlueBoard(){
        this.ctx.forEach((x) => {
            //Left Side of Board
            x.beginPath();
            x.moveTo(this.innerLeftBot.x2d, this.innerLeftBot.y2d);
            x.lineTo(this.innerLeftTop.x2d, this.innerLeftTop.y2d);
            x.lineTo(this.innerMidLeftTop.x2d, this.innerMidLeftTop.y2d);
            x.lineTo(this.innerMidLeftBot.x2d, this.innerMidLeftBot.y2d);
            x.closePath();
            x.fillStyle = '#1672A7';
            x.fill();

            //Right Side of Board
            x.beginPath();
            x.moveTo(this.innerMidRightTop.x2d, this.innerMidRightTop.y2d);
            x.lineTo(this.innerMidRightBot.x2d, this.innerMidRightBot.y2d);
            x.lineTo(this.innerRightBot.x2d, this.innerRightBot.y2d);
            x.lineTo(this.innerRightTop.x2d, this.innerRightTop.y2d);
            x.closePath();
            x.fillStyle = '#1672A7';
            x.fill();
        });
    }

    drawNet(){
        this.ctx.forEach((x) => {
            //Net Top
            x.beginPath();
            x.moveTo(this.netLeftTop.x2d-this.netSides, this.netLeftTop.y2d);
            x.lineTo(this.netRightTop.x2d+this.netSides, this.netRightTop.y2d);
            x.lineTo(this.netRightTop.x2d+this.netSides, this.netRightTop.y2d+this.netTop);
            x.lineTo(this.netLeftTop.x2d-this.netSides, this.netLeftTop.y2d+this.netTop);
            x.lineTo(this.netLeftTop.x2d-this.netSides, this.netLeftTop.y2d);
            x.fillStyle = 'white';
            x.fill();
            // x.strokeStyle = 'red';
            x.stroke();

            //Net Left Side
            x.beginPath();
            x.moveTo(this.netLeftTop.x2d, this.netLeftTop.y2d);
            x.lineTo(this.netLeftBot.x2d, this.netLeftBot.y2d);
            x.lineTo(this.netLeftBot.x2d-this.netSides, this.netLeftBot.y2d);
            x.lineTo(this.netLeftTop.x2d-this.netSides, this.netLeftTop.y2d);
            x.closePath();
            x.fillStyle = 'black';
            x.fill();
            x.stroke();

            //Net Left Stand
            x.beginPath();
            x.moveTo(this.netLeftBot.x2d, this.netLeftBot.y2d+2);
            x.lineTo(this.netLeftBot.x2d, this.netLeftBot.y2d-2);
            x.lineTo(this.netLeftBot.x2d+23, this.netLeftBot.y2d-2);
            x.lineTo(this.netLeftBot.x2d+19, this.netLeftBot.y2d+2);
            x.closePath();
            x.fillStyle = 'black';
            x.fill();
            x.stroke();

            //Net Right Side
            x.beginPath();
            x.moveTo(this.netRightTop.x2d, this.netRightTop.y2d);
            x.lineTo(this.netRightBot.x2d, this.netRightBot.y2d);
            x.lineTo(this.netRightBot.x2d+this.netSides, this.netRightBot.y2d);
            x.lineTo(this.netRightTop.x2d+this.netSides, this.netRightTop.y2d);
            x.closePath();
            x.fillStyle = 'black';
            x.fill();
            x.stroke();

            //Net Right Stand
            x.beginPath();
            x.moveTo(this.netRightBot.x2d, this.netRightBot.y2d-2);
            x.lineTo(this.netRightBot.x2d, this.netRightBot.y2d+2);
            x.lineTo(this.netRightBot.x2d-19, this.netRightBot.y2d+2);
            x.lineTo(this.netRightBot.x2d-23, this.netRightBot.y2d-2);
            x.closePath();
            x.fillStyle = 'black';
            x.fill();
            x.stroke();

            //Net Inner Portion
            x.beginPath();
            x.moveTo(this.netLeftTop.x2d-this.netSides, this.netRightTop.y2d+this.netTop);
            x.lineTo(this.netLeftBot.x2d-this.netSides, this.netRightBot.y2d);
            x.lineTo(this.netRightBot.x2d+this.netSides, this.netRightBot.y2d);
            x.lineTo(this.netRightTop.x2d+this.netSides, this.netRightTop.y2d+this.netTop);
            x.closePath();
            x.fillStyle = ' rgba(0, 0, 0, 0.2)';
            x.fill();
        });
    }

    drawNetLower(){
        this.ctx.forEach((x)=>{
            x.beginPath();
            x.arc(this.netLeftBot.x2d + this.netBotRadius - this.netSides, this.netLeftBot.y2d, this.netBotRadius, 0, Math.PI);
            x.arc(this.netRightBot.x2d - this.netBotRadius + this.netSides, this.netRightBot.y2d, this.netBotRadius, 0, Math.PI);
            x.fillStyle = 'black';
            x.fill();
        })
    }

    drawBoard(){
        this.drawStands();
        this.drawNetLower();
        this.drawMainBoard();
        this.drawBlueBoard();
        this.drawNet();
    }

}