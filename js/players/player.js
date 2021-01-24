import { get2dCoordinate } from '../utils.js';

export class Player{
    constructor(ctx, x, y, z){
        this.ctx = ctx;
        this.bat = new Image();
        this.bat.src = './assets/bat.png';
        this.batPosition = {x: x, y: y, z: z};
        this.bat2dPosition = get2dCoordinate(this.batPosition);
        window.addEventListener('mousemove',(x)=>{
            this.batPosition.x = x.x-550;
            this.batPosition.y = x.y-130;
            document.getElementById('ping-pong-container').style.cursor = 'none';
        })
    }
    drawBat(){
        this.bat2dPosition = get2dCoordinate(this.batPosition);
        this.ctx.drawImage(this.bat, this.bat2dPosition.x2d, this.bat2dPosition.y2d,40,60);
    }
}