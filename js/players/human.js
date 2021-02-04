import { Player } from "./player.js";
import { BOARD } from '../constants/board.js';
import { BAT_HEIGHT, CANVAS_HEIGHT, CANVAS_WIDTH } from '../constants/constants.js';

export class Human extends Player{
    /**
     * @constructs Human
     * @param Array  Array of Canvas Context
     * @param Number Initial x coordinate of Player
     * @param Number Initial x coordinate of Player
     * @param Number Initial x coordinate of Player
     * @param Number Player Id
     * @param String Player Name
     */
    constructor(ctx, x, y, z, id, name, movement, gameMode){
        super(ctx, x, y, z, id, name);
        this.gameMode = gameMode;
        if( movement === 'mouse') this.setMouseMovement();
        else{
            this.setKeyboardMovement();  
            this.steps = 3; 
            this.prevKey = null;
        }
    }

    setMouseMovement(){
        document.querySelector('canvas').addEventListener('mousemove',(x)=>{
            //Traslating x and y coordinate on the basis of mouse movement;
            this.batPosition.x = x.x - CANVAS_WIDTH/(2+(this.gameMode*2));
            this.batPosition.y = (CANVAS_HEIGHT/2 + x.y) * BOARD.HEIGHT / CANVAS_HEIGHT - BOARD.HEIGHT/3 ;   
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