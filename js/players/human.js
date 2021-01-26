import { Player } from "./player.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../constants/constants.js';
import { BOARD, BOARD_LENGTH, DISTANCE_TO_BOARD } from '../constants/board.js';

export class Human extends Player{
    constructor(ctx, x, y, z){
        super(ctx, x, y, z);
        document.getElementsByTagName('canvas')[0].addEventListener('mousemove',(x)=>{
            //Traslating x and z coordinate on the basis of mouse movement;
            this.batPosition.x = x.x - CANVAS_WIDTH/2;
            this.batPosition.z = (CANVAS_HEIGHT - x.y) * BOARD.LENGTH / CANVAS_HEIGHT - BOARD.LENGTH/3 ;   
            //Limit z movement to half of board length
            if (this.batPosition.z > DISTANCE_TO_BOARD + BOARD_LENGTH/2) this.batPosition.z = DISTANCE_TO_BOARD + BOARD_LENGTH/2;          
            document.getElementById('ping-pong-container').style.cursor = 'none';
        })
    }
}