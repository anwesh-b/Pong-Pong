import { get2dCoordinate } from './utils.js';
import { BOARD_COORDINATE, BOARD_STAND_WIDTH} from './constants.js';

export class Board{
    constructor(ctx){
        this.ctx = ctx;
        //Board Edges
        this.leftBot = get2dCoordinate( BOARD_COORDINATE.leftBot.x, BOARD_COORDINATE.leftBot.y, BOARD_COORDINATE.leftBot.z );
        this.leftTop = get2dCoordinate( BOARD_COORDINATE.leftTop.x, BOARD_COORDINATE.leftTop.y, BOARD_COORDINATE.leftTop.z );
        this.rightBot = get2dCoordinate( BOARD_COORDINATE.rightBot.x,  BOARD_COORDINATE.rightBot.y,  BOARD_COORDINATE.rightBot.z );
        this.rightTop = get2dCoordinate( BOARD_COORDINATE.rightTop.x, BOARD_COORDINATE.rightTop.y, BOARD_COORDINATE.rightTop.z );
        
        //Board Inner Edges
        this.innerLeftBot = get2dCoordinate( BOARD_COORDINATE.innerLeftBot.x, BOARD_COORDINATE.innerLeftBot.y, BOARD_COORDINATE.innerLeftBot.z );
        this.innerLeftTop = get2dCoordinate( BOARD_COORDINATE.innerLeftTop.x, BOARD_COORDINATE.innerLeftTop.y, BOARD_COORDINATE.innerLeftTop.z );
        this.innerRightBot = get2dCoordinate( BOARD_COORDINATE.innerRightBot.x, BOARD_COORDINATE.innerRightBot.y, BOARD_COORDINATE.innerRightBot.z );
        this.innerRightTop = get2dCoordinate( BOARD_COORDINATE.innerRightTop.x, BOARD_COORDINATE.innerRightTop.y, BOARD_COORDINATE.innerRightTop.z );
        this.innerMidLeftBot =  get2dCoordinate( BOARD_COORDINATE.innerMidLeftBot.x, BOARD_COORDINATE.innerMidLeftBot.y, BOARD_COORDINATE.innerMidLeftBot.z );
        this.innerMidLeftTop = get2dCoordinate( BOARD_COORDINATE.innerMidLeftTop.x, BOARD_COORDINATE.innerMidLeftTop.y, BOARD_COORDINATE.innerMidLeftTop.z );
        this.innerMidRightBot =  get2dCoordinate( BOARD_COORDINATE.innerMidRightBot.x, BOARD_COORDINATE.innerMidRightBot.y, BOARD_COORDINATE.innerMidRightBot.z );
        this.innerMidRightTop = get2dCoordinate( BOARD_COORDINATE.innerMidRightTop.x, BOARD_COORDINATE.innerMidRightTop.y, BOARD_COORDINATE.innerMidRightTop.z );
        //Net Edges
        this.netLeftBot = get2dCoordinate( BOARD_COORDINATE.netLeftBot.x, BOARD_COORDINATE.netLeftBot.y, BOARD_COORDINATE.netLeftBot.z );
        this.netLeftTop = get2dCoordinate( BOARD_COORDINATE.netLeftTop.x, BOARD_COORDINATE.netLeftTop.y, BOARD_COORDINATE.netLeftTop.z );
        this.netRightBot = get2dCoordinate( BOARD_COORDINATE.netRightBot.x, BOARD_COORDINATE.netRightBot.y, BOARD_COORDINATE.netRightBot.z );
        this.netRightTop = get2dCoordinate( BOARD_COORDINATE.netRightTop.x, BOARD_COORDINATE.netRightTop.y, BOARD_COORDINATE.netRightTop.z );
        //Stand Positions
        this.leftTopStandUpper = get2dCoordinate( BOARD_COORDINATE.leftTopStandUpper.x, BOARD_COORDINATE.leftTopStandUpper.y, BOARD_COORDINATE.leftTopStandUpper.z );
        this.leftTopStandLower = get2dCoordinate( BOARD_COORDINATE.leftTopStandLower.x, BOARD_COORDINATE.leftTopStandLower.y, BOARD_COORDINATE.leftTopStandLower.z );
        this.leftBotStandUpper =  get2dCoordinate( BOARD_COORDINATE.leftBotStandUpper.x, BOARD_COORDINATE.leftBotStandUpper.y, BOARD_COORDINATE.leftBotStandUpper.z );
        this.leftBotStandLower =  get2dCoordinate( BOARD_COORDINATE.leftBotStandLower.x, BOARD_COORDINATE.leftBotStandLower.y, BOARD_COORDINATE.leftBotStandLower.z );
        this.rightTopStandUpper = get2dCoordinate( BOARD_COORDINATE.rightTopStandUpper.x, BOARD_COORDINATE.rightTopStandUpper.y, BOARD_COORDINATE.rightTopStandUpper.z );
        this.rightTopStandLower = get2dCoordinate( BOARD_COORDINATE.rightTopStandLower.x, BOARD_COORDINATE.rightTopStandLower.y, BOARD_COORDINATE.rightTopStandLower.z );
        this.rightBotStandUpper = get2dCoordinate( BOARD_COORDINATE.rightBotStandUpper.x, BOARD_COORDINATE.rightBotStandUpper.y, BOARD_COORDINATE.rightBotStandUpper.z );
        this.rightBotStandLower = get2dCoordinate( BOARD_COORDINATE.rightBotStandLower.x, BOARD_COORDINATE.rightBotStandLower.y, BOARD_COORDINATE.rightBotStandLower.z );
        
        // //Board Inner Edges
        // this.innerLeftBot = get2dCoordinate( -1*BOARD_WIDTH/2 + BOARD_SIDE_LINES , BOARD_HEIGHT, DISTANCE_TO_BOARD+BOARD_LENTH-BOARD_SIDE_LINES );
        // this.innerLeftTop = get2dCoordinate( -1*BOARD_WIDTH/2 + BOARD_SIDE_LINES , BOARD_HEIGHT, DISTANCE_TO_BOARD+BOARD_SIDE_LINES );
        // this.innerRightBot = get2dCoordinate( BOARD_WIDTH/2 -BOARD_SIDE_LINES  , BOARD_HEIGHT, DISTANCE_TO_BOARD+BOARD_LENTH-BOARD_SIDE_LINES );
        // this.innerRightTop = get2dCoordinate( BOARD_WIDTH/2 - BOARD_SIDE_LINES , BOARD_HEIGHT, DISTANCE_TO_BOARD+BOARD_SIDE_LINES );
        // this.innerMidLeftBot =  get2dCoordinate( -1*BOARD_MID_LINE/2 + BOARD_SIDE_LINES , BOARD_HEIGHT, DISTANCE_TO_BOARD+BOARD_LENTH-BOARD_SIDE_LINES );
        // this.innerMidLeftTop = get2dCoordinate( -1*BOARD_MID_LINE/2 , BOARD_HEIGHT, DISTANCE_TO_BOARD+BOARD_SIDE_LINES );
        // this.innerMidRightBot =  get2dCoordinate( BOARD_MID_LINE/2 + BOARD_SIDE_LINES , BOARD_HEIGHT, DISTANCE_TO_BOARD+BOARD_LENTH-BOARD_SIDE_LINES );
        // this.innerMidRightTop = get2dCoordinate( BOARD_MID_LINE/2 , BOARD_HEIGHT, DISTANCE_TO_BOARD+BOARD_SIDE_LINES );
        // //Net Edges
        // this.netLeftBot = get2dCoordinate( -1*BOARD_NET_LENGTH/2, BOARD_HEIGHT+BOARD_NET_HEIGHT, DISTANCE_TO_BOARD+(BOARD_LENTH/2));
        // this.netLeftTop = get2dCoordinate( -1*BOARD_NET_LENGTH/2, BOARD_HEIGHT, DISTANCE_TO_BOARD+(BOARD_LENTH/2));
        // this.netRightBot = get2dCoordinate( BOARD_NET_LENGTH/2, BOARD_HEIGHT+BOARD_NET_HEIGHT, DISTANCE_TO_BOARD+(BOARD_LENTH/2));
        // this.netRightTop = get2dCoordinate( BOARD_NET_LENGTH/2, BOARD_HEIGHT, DISTANCE_TO_BOARD+(BOARD_LENTH/2));
        // //Stand Positions
        // this.leftTopStandUpper = get2dCoordinate( -1*BOARD_WIDTH/2 + BOARD_TO_STAND_DISTANCE, BOARD_HEIGHT, DISTANCE_TO_BOARD+BOARD_LENTH  - BOARD_TO_STAND_DISTANCE);
        // this.leftTopStandLower = get2dCoordinate( -1*BOARD_WIDTH/2 + BOARD_TO_STAND_DISTANCE, BOARD_HEIGHT*2, DISTANCE_TO_BOARD+BOARD_LENTH  - BOARD_TO_STAND_DISTANCE);
        // this.leftBotStandUpper =  get2dCoordinate( -1*BOARD_WIDTH/2 + BOARD_TO_STAND_DISTANCE, BOARD_HEIGHT, DISTANCE_TO_BOARD + BOARD_TO_STAND_DISTANCE);
        // this.leftBotStandLower =  get2dCoordinate( -1*BOARD_WIDTH/2 + BOARD_TO_STAND_DISTANCE, BOARD_HEIGHT*2, DISTANCE_TO_BOARD + BOARD_TO_STAND_DISTANCE);
        // this.rightTopStandUpper = get2dCoordinate( BOARD_WIDTH/2 - BOARD_TO_STAND_DISTANCE, BOARD_HEIGHT, DISTANCE_TO_BOARD+BOARD_LENTH  - BOARD_TO_STAND_DISTANCE);
        // this.rightTopStandLower = get2dCoordinate( BOARD_WIDTH/2 - BOARD_TO_STAND_DISTANCE, BOARD_HEIGHT*2, DISTANCE_TO_BOARD+BOARD_LENTH  - BOARD_TO_STAND_DISTANCE);
        // this.rightBotStandUpper = get2dCoordinate( BOARD_WIDTH/2 - BOARD_TO_STAND_DISTANCE, BOARD_HEIGHT, DISTANCE_TO_BOARD + BOARD_TO_STAND_DISTANCE);
        // this.rightBotStandLower = get2dCoordinate( BOARD_WIDTH/2 - BOARD_TO_STAND_DISTANCE, BOARD_HEIGHT*2, DISTANCE_TO_BOARD + BOARD_TO_STAND_DISTANCE);
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
    }

    drawStands(){
        this.drawStand(this.leftTopStandUpper,this.leftTopStandLower);  
        this.drawStand(this.leftBotStandUpper,this.leftBotStandLower);  
        this.drawStand(this.rightTopStandUpper,this.rightTopStandLower);  
        this.drawStand(this.rightBotStandUpper,this.rightBotStandLower);  
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
