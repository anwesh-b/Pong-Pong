import { Player } from "./player.js";
import { BAT_HEIGHT, CANVAS_HEIGHT, CANVAS_WIDTH } from '../constants/constants.js';
import { BOARD, BOARD_LENGTH, DISTANCE_TO_BOARD } from '../constants/board.js';

export class Human extends Player{
    constructor(ctx, x, y, z, id, name, movement){
        super(ctx, x, y, z, id, name);
        if( movement === 'mouse') this.setMouseMovement();
        else{
            this.setKeyboardMovement();  
            this.steps = 3; 
            this.prevKey = null;
        }
    }

    setMouseMovement(){
        document.querySelector('canvas').addEventListener('mousemove',(x)=>{
            //Traslating x and z coordinate on the basis of mouse movement;
            this.batPosition.x = x.x - CANVAS_WIDTH/2;
            this.batPosition.y = (CANVAS_HEIGHT/2 + x.y) * BOARD.HEIGHT / CANVAS_HEIGHT - BOARD.HEIGHT/3 ;   
            //Limit z movement to half of board length
            if (this.batPosition.z > DISTANCE_TO_BOARD + BOARD_LENGTH/2) this.batPosition.z = DISTANCE_TO_BOARD + BOARD_LENGTH/2;          
            document.getElementById('ping-pong-container').style.cursor = 'none';
        })
    }

    setKeyboardMovement(){
        document.addEventListener('keydown',(x)=>{
            if(x.key == this.prevKey) this.steps*=1.1;
            else this.steps = 3;
            if( x.key === 'w'){
                this.batPosition.y -= this.steps;
            }else if( x.key === 'a'){
                this.batPosition.x += this.steps;
            }else if( x.key === 's'){
                this.batPosition.y += this.steps;
            }else if( x.key === 'd'){
                this.batPosition.x -= this.steps;
            }
            if( this.batPosition.x < -1*CANVAS_WIDTH/6) {
                this.batPosition.x = -1*CANVAS_WIDTH/6;
                this.steps = 1;
            } else if( this.batPosition.x > CANVAS_WIDTH/6){
                this.batPosition.x = CANVAS_WIDTH/6;
                this.steps = 1;
            } else if( this.batPosition.y < BAT_HEIGHT/3 ){
                this.batPosition.y = BAT_HEIGHT/3;
                this.steps = 1;
            } else if( this.batPosition.y > CANVAS_HEIGHT/3){
                this.batPosition.y = CANVAS_HEIGHT/3 ;
                this.steps = 1;
            }
            this.prevKey = x.key;
        })
    }
}