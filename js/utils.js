import { PLAYER_PROJECTOR } from './constants/constants.js';

/**
  * Summary. Get 2D coordinate from a 3D Coordinate
  *
  * Description. 
  * Uses Intrisic Rotation in order to rotate the world coordinate and translate it w.r.t. viewer position 
  * 
  * @param {Object}   3D Coordinates
  * @return {Object}  2D Coordinates
*/
export function get2dCoordinate (position) {
  let cx = Math.cos(PLAYER_PROJECTOR.cameraOrientation.x);
  let sx = Math.sin(PLAYER_PROJECTOR.cameraOrientation.x);
  let cy = Math.cos(PLAYER_PROJECTOR.cameraOrientation.y);
  let sy = Math.sin(PLAYER_PROJECTOR.cameraOrientation.y);
  let cz = Math.cos(PLAYER_PROJECTOR.cameraOrientation.z);
  let sz = Math.sin(PLAYER_PROJECTOR.cameraOrientation.z);

  let X = (position.x - PLAYER_PROJECTOR.cameraPosition.x);
  let Y = (position.y - PLAYER_PROJECTOR.cameraPosition.y);
  let Z = (position.z - PLAYER_PROJECTOR.cameraPosition.z);

  let xWithRespectToCam = cy * (sz * Y + cz * X) - sy * Z;
  let yWithRespectToCam = sx * (cy * Z + sy * (sz * Y + cz * X)) + cx * (cz * Y - sz * X);
  let zWithRespectToCam = cx * (cy * Z + sy * (sz * Y + cz * X)) - sx * (cz * Y - sz * X);

  let x2d = xWithRespectToCam  * PLAYER_PROJECTOR.viewerPosition.z / zWithRespectToCam + PLAYER_PROJECTOR.viewerPosition.x;
  let y2d = yWithRespectToCam  * PLAYER_PROJECTOR.viewerPosition.z / zWithRespectToCam + PLAYER_PROJECTOR.viewerPosition.y;

  // let x2d = position.x/position.z ;
  // let y2d = position.y/position.z ;

  return {
    x2d: x2d,
    y2d: y2d
  };
}