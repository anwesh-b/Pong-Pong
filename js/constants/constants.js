// Canvas constant
import { BOARD } from './board.js';

export const CANVAS_HEIGHT = window.innerHeight; 
export const CANVAS_WIDTH = window.innerWidth;

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
      y: 50,
      z: 500
    }
  };

//Balls
export const INITIAL_DX = 1;
export const INITIAL_DY = 0;
export const INITIAL_DZ = 7.8;
export const MAX_BALL_X_DISTANCE = BOARD.WIDTH*5/8 ;
export const MAX_BALL_Y_DISTANCE = BOARD.HEIGHT*2;
export const MAX_BALL_Z_DISTANCE = 20;
export const SPEED_AFTER_BOUNCE = -3.5;
export const ACCELERATION_DUE_TO_GRAVITY = 0.1;

//Player Bat
export const BAT_WIDTH = 30;
export const BAT_HEIGHT = 60;
export const BAT_Y = BOARD.HEIGHT;


// Bot Difficulty (check ball timer)
export const CHECK_BALL_TIMER = 100;