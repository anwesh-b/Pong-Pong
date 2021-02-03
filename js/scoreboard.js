import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants/constants.js';

export class Scoreboard{
    constructor(ctx, player1, player2){
        this.ctx = ctx;
        this.player1 = player1;
        this.player2 = player2;
        this.left = CANVAS_WIDTH/10;
        this.top = CANVAS_HEIGHT/3;
        this.width = 100;
        this.height = 50;
    }

    displayScores(){
        this.ctx.forEach(( x, index) => {
            x.font = "16px Comic Sans MS";
            x.fillStyle = "red";
            x.textAlign = "center";
            x.fillText(this.player2.name, this.left, this.top-100 + index*150);
            x.font = "30px Comic Sans MS";
            x.fillText(this.player2.score, this.left, this.top-50 + index*50);
            x.fillText(this.player1.score, this.left, this.top - index*50);
            x.font = "10px Comic Sans MS";
            x.fillText(this.player2.games, this.left, this.top -80 + index*95 );
            x.fillText(this.player1.games, this.left, this.top +15 - index*95 );
            x.font = "16px Comic Sans MS";
            x.fillText(this.player1.name, this.left, this.top+50 - index*150);                
        });      
    }
}