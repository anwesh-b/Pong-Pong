import { Player } from "./player.js";
import { get3d } from '../utils.js';
import { BOARD, DISTANCE_TO_BOARD } from '../constants/board.js';
// import {  } from '../constants/constants.js';

export class Human extends Player{
    constructor(ctx,x,y,z){
        super(ctx,x,y,z);
        document.getElementsByTagName('canvas')[0].addEventListener('mousemove',(x)=>{
            this.prevZ = this.batPosition.z;
            this.batPosition = get3d(x.x,x.y);
            // console.log(get3d(x.x,x.y));
            // this.batPosition.x -= 200;
            // this.batPosition.z = 600-2*x.y;
            console.log(this.batPosition);
            if (this.batPosition.z <= DISTANCE_TO_BOARD) this.batPosition.z = DISTANCE_TO_BOARD;
            if (this.batPosition.z >= DISTANCE_TO_BOARD + BOARD.LENTH) this.batPosition.z = DISTANCE_TO_BOARD + BOARD.LENTH;
            document.getElementById('ping-pong-container').style.cursor = 'none';
        })
    }
}