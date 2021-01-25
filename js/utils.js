import { PLAYER_PROJECTOR, BAT_Y } from './constants/constants.js';

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

  // let x2d = (( position.x- PLAYER_PROJECTOR.cameraPosition.x)*((position.z-PLAYER_PROJECTOR.cameraPosition.z)/position.z))  + PLAYER_PROJECTOR.cameraPosition.x;
  // let y2d = (( position.y- PLAYER_PROJECTOR.cameraPosition.y)*((position.z-PLAYER_PROJECTOR.cameraPosition.z)/position.z))  + PLAYER_PROJECTOR.cameraPosition.y;

  // let x2d = position.x/position.z ;
  // let y2d = position.y/position.z ;

  return {
    x2d: x2d,
    y2d: y2d
  };
}


export function get3d(x2d, y2d){

  let cx = Math.cos(PLAYER_PROJECTOR.cameraOrientation.x);
  let sx = Math.sin(PLAYER_PROJECTOR.cameraOrientation.x);
  let cy = Math.cos(PLAYER_PROJECTOR.cameraOrientation.y);
  let sy = Math.sin(PLAYER_PROJECTOR.cameraOrientation.y);
  let cz = Math.cos(PLAYER_PROJECTOR.cameraOrientation.z);
  let sz = Math.sin(PLAYER_PROJECTOR.cameraOrientation.z);

  let y =   BAT_Y;


  let Y = (y - PLAYER_PROJECTOR.cameraPosition.y);

  let numeratorZ = Y * -1 * (PLAYER_PROJECTOR.viewerPosition.z * cx * cz + y2d * sx * cz + PLAYER_PROJECTOR.viewerPosition.y * sx * cz)
  let denumeratorZ = cy * (PLAYER_PROJECTOR.viewerPosition.z * sx - y2d * cx - PLAYER_PROJECTOR.viewerPosition.y * cx)
  let Z = numeratorZ / denumeratorZ;


  let numeratorX = (x2d + PLAYER_PROJECTOR.viewerPosition.x) * (cx * cy * Z - sx * cz * Y);
  let denumeratorX = PLAYER_PROJECTOR.viewerPosition.z * cy * cz;

  let X = numeratorX / denumeratorX;

  let x = X + PLAYER_PROJECTOR.cameraPosition.x;
  let z = Z + PLAYER_PROJECTOR.cameraPosition.z;
  return {
    x,y,z
  };

}
