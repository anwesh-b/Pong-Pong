// Canvas constant
import { BOARD } from './board.js';

export const CANVAS_HEIGHT = 700; 
export const CANVAS_WIDTH = 800;

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
      x: 400,
      y: 100,
      z: 500
    }
  };

//Balls
export const MAX_BALL_Z_DISTANCE = 20;
export const MAX_BALL_X_DISTANCE = BOARD.WIDTH*5/8 ;
export const MAX_BALL_Y_DISTANCE = BOARD.HEIGHT*2;
export const ACCELERATION_DUE_TO_GRAVITY = 0.1;
export const SPEED_AFTER_BOUNCE = -3.5;
export const INITIAL_DX = 1;
export const INITIAL_DY = 0;
export const INITIAL_DZ = 7.8;

//Player Bat
export const BAT_Y = BOARD.HEIGHT;
export const BAT_HEIGHT = 60;
export const BAT_WIDTH = 30;