import { get2dCoordinate } from './utils.js';
import { BOARD_COORDINATE, BOARD_STAND_WIDTH } from './constants/board.js';

export class Board{
    constructor(ctx){
        this.ctx = ctx;
        //Board Edges
        this.leftBot = get2dCoordinate( BOARD_COORDINATE.leftBot );
        this.leftTop = get2dCoordinate( BOARD_COORDINATE.leftTop );
        this.rightBot = get2dCoordinate( BOARD_COORDINATE.rightBot );
        this.rightTop = get2dCoordinate( BOARD_COORDINATE.rightTop );
        
        //Board Inner Edges
        this.innerLeftBot = get2dCoordinate( BOARD_COORDINATE.innerLeftBot );
        this.innerLeftTop = get2dCoordinate( BOARD_COORDINATE.innerLeftTop );
        this.innerRightBot = get2dCoordinate( BOARD_COORDINATE.innerRightBot );
        this.innerRightTop = get2dCoordinate( BOARD_COORDINATE.innerRightTop );
        this.innerMidLeftBot =  get2dCoordinate( BOARD_COORDINATE.innerMidLeftBot );
        this.innerMidLeftTop = get2dCoordinate( BOARD_COORDINATE.innerMidLeftTop );
        this.innerMidRightBot =  get2dCoordinate( BOARD_COORDINATE.innerMidRightBot );
        this.innerMidRightTop = get2dCoordinate( BOARD_COORDINATE.innerMidRightTop );
        //Net Edges
        this.netLeftBot = get2dCoordinate( BOARD_COORDINATE.netLeftBot );
        this.netLeftTop = get2dCoordinate( BOARD_COORDINATE.netLeftTop );
        this.netRightBot = get2dCoordinate( BOARD_COORDINATE.netRightBot );
        this.netRightTop = get2dCoordinate( BOARD_COORDINATE.netRightTop );
        //Stand Positions
        this.leftTopStandUpper = get2dCoordinate( BOARD_COORDINATE.leftTopStandUpper );
        this.leftTopStandLower = get2dCoordinate( BOARD_COORDINATE.leftTopStandLower );
        this.leftBotStandUpper =  get2dCoordinate( BOARD_COORDINATE.leftBotStandUpper );
        this.leftBotStandLower =  get2dCoordinate( BOARD_COORDINATE.leftBotStandLower );
        this.rightTopStandUpper = get2dCoordinate( BOARD_COORDINATE.rightTopStandUpper );
        this.rightTopStandLower = get2dCoordinate( BOARD_COORDINATE.rightTopStandLower );
        this.rightBotStandUpper = get2dCoordinate( BOARD_COORDINATE.rightBotStandUpper);
        this.rightBotStandLower = get2dCoordinate( BOARD_COORDINATE.rightBotStandLower );
    }

    drawStand(upper,lower){
        this.ctx.beginPath();
        this.ctx.moveTo(upper.x2d + (BOARD_STAND_WIDTH/2), upper.y2d);
        this.ctx.lineTo(upper.x2d - (BOARD_STAND_WIDTH/2), upper.y2d);
        this.ctx.lineTo(lower.x2d - (BOARD_STAND_WIDTH/2), lower.y2d);
        this.ctx.lineTo(lower.x2d + (BOARD_STAND_WIDTH/2), lower.y2d);
        this.ctx.closePath();
        this.ctx.fillStyle = 'brown';
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(lower.x2d, lower.y2d, BOARD_STAND_WIDTH/2 , 0, 2*Math.PI);
        this.ctx.fill();
    }

    drawStands(){
        this.drawStand(this.leftTopStandUpper, this.leftTopStandLower);  
        this.drawStand(this.leftBotStandUpper, this.leftBotStandLower);  
        this.drawStand(this.rightTopStandUpper, this.rightTopStandLower);  
        this.drawStand(this.rightBotStandUpper, this.rightBotStandLower);  
    }

    drawMainBoard(){
        this.ctx.beginPath();
        this.ctx.moveTo(this.leftBot.x2d, this.leftBot.y2d);
        this.ctx.lineTo(this.rightBot.x2d, this.rightBot.y2d);
        this.ctx.lineTo(this.rightTop.x2d, this.rightTop.y2d);
        this.ctx.lineTo(this.leftTop.x2d, this.leftTop.y2d);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fillStyle = 'white';
        this.ctx.fill();
        return;
    }

    drawBlueBoard(){
        //Left Side of Board
        this.ctx.beginPath();
        this.ctx.moveTo(this.innerLeftBot.x2d, this.innerLeftBot.y2d);
        this.ctx.lineTo(this.innerLeftTop.x2d, this.innerLeftTop.y2d);
        this.ctx.lineTo(this.innerMidLeftTop.x2d, this.innerMidLeftTop.y2d);
        this.ctx.lineTo(this.innerMidLeftBot.x2d, this.innerMidLeftBot.y2d);
        this.ctx.closePath();
        this.ctx.fillStyle = '#1672A7';
        this.ctx.fill();

        //Right Side of Board
        this.ctx.beginPath();
        this.ctx.moveTo(this.innerMidRightTop.x2d, this.innerMidRightTop.y2d);
        this.ctx.lineTo(this.innerMidRightBot.x2d, this.innerMidRightBot.y2d);
        this.ctx.lineTo(this.innerRightBot.x2d, this.innerRightBot.y2d);
        this.ctx.lineTo(this.innerRightTop.x2d, this.innerRightTop.y2d);
        this.ctx.closePath();
        this.ctx.fillStyle = '#1672A7';
        this.ctx.fill();
    }

    drawNet(){
        let netTop = 3;
        let netSides = 3;
        let veeticalLines = 50;
        let horiontelLines = 5;
        //Net Top
        this.ctx.beginPath();
        this.ctx.moveTo(this.netLeftTop.x2d+netSides, this.netLeftTop.y2d);
        this.ctx.lineTo(this.netLeftTop.x2d+netSides, this.netLeftTop.y2d+netTop);
        this.ctx.lineTo(this.netRightTop.x2d-netSides, this.netRightTop.y2d+netTop);
        this.ctx.lineTo(this.netRightTop.x2d-netSides, this.netRightTop.y2d);
        this.ctx.closePath();
        this.ctx.fillStyle = 'white';
        this.ctx.fill();
        // this.ctx.strokeStyle = 'red';
        this.ctx.stroke();

        //Net Left Side
        this.ctx.beginPath();
        this.ctx.moveTo(this.netLeftTop.x2d, this.netLeftTop.y2d);
        this.ctx.lineTo(this.netLeftBot.x2d, this.netLeftBot.y2d);
        this.ctx.lineTo(this.netLeftBot.x2d+netSides, this.netLeftBot.y2d);
        this.ctx.lineTo(this.netLeftTop.x2d+netSides, this.netLeftTop.y2d);
        this.ctx.closePath();
        this.ctx.fillStyle = 'black';
        this.ctx.fill();
        this.ctx.stroke();

        //Net Right Side
        this.ctx.beginPath();
        this.ctx.moveTo(this.netRightTop.x2d, this.netRightTop.y2d);
        this.ctx.lineTo(this.netRightBot.x2d, this.netRightBot.y2d);
        this.ctx.lineTo(this.netRightBot.x2d-netSides, this.netRightBot.y2d);
        this.ctx.lineTo(this.netRightTop.x2d-netSides, this.netRightTop.y2d);
        this.ctx.closePath();
        this.ctx.fillStyle = 'black';
        this.ctx.fill();
        this.ctx.stroke();

        //Net Inner Portion
        this.ctx.beginPath();
        this.ctx.moveTo(this.netLeftTop.x2d+netSides, this.netRightTop.y2d+netTop);
        this.ctx.lineTo(this.netLeftBot.x2d+netSides, this.netRightBot.y2d);
        this.ctx.lineTo(this.netRightBot.x2d-netSides, this.netRightBot.y2d);
        this.ctx.lineTo(this.netRightTop.x2d-netSides, this.netRightTop.y2d+netTop);
        this.ctx.closePath();
        this.ctx.fillStyle = ' rgba(0, 0, 0, 0.2)';
        this.ctx.fill();

    }

    drawBoard(){
        this.drawStands();
        this.drawMainBoard();
        this.drawBlueBoard();
        this.drawNet();
    }

}