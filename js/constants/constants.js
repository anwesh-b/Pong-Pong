// Canvas constant
import { BOARD, DISTANCE_TO_BOARD } from './board.js';

export const CANVAS_WIDTH = window.innerWidth;
export const CANVAS_HEIGHT = window.innerHeight; 

export const PLAYER_PROJECTOR = {
    cameraPosition: {
      x: 0,
      y: 0,
      z: -100
    },
    cameraOrientation: {
      x: -Math.PI / 16,
      y: 0,
      z: 0
    },

    viewerPosition: {
      x: CANVAS_WIDTH/2,
      y: 100,
      z: 450
    }
  };


//Game
export const FIRST_SERVE_PLAYER = 0;
//Balls
export const INITIAL_DX =0;
export const INITIAL_DY = 0;
export const INITIAL_DZ = 7.8;
export const MAX_BALL_X_DISTANCE = BOARD.WIDTH*5/8 ;
export const MAX_BALL_Y_DISTANCE = BOARD.HEIGHT*2;
export const MAX_BALL_Z_DISTANCE = 20;
export const SPEED_AFTER_BOUNCE = -3.5;
export const ACCELERATION_DUE_TO_GRAVITY = 0.1;


export const BALL_RESET_POS = [
                                { x: 50, y: 100, z:DISTANCE_TO_BOARD * 4/5},
                                { x: 50, y: 100, z:BOARD.LENGTH + DISTANCE_TO_BOARD * 4.5/5}
                              ];

//Player Bat
export const BAT_WIDTH = 30;
export const BAT_HEIGHT = 60;
export const BAT_Y = BOARD.HEIGHT;


// Bot Difficulty (check ball timer)
export const CHECK_BALL_TIMER = 100;