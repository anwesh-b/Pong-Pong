import { PLAYER_PROJECTOR } from './constants.js';

export function get2dCoordinate (x, y, z) {
  let cx = Math.cos(PLAYER_PROJECTOR.cameraOrientation.x);
  let sx = Math.sin(PLAYER_PROJECTOR.cameraOrientation.x);
  let cy = Math.cos(PLAYER_PROJECTOR.cameraOrientation.y);
  let sy = Math.sin(PLAYER_PROJECTOR.cameraOrientation.y);
  let cz = Math.cos(PLAYER_PROJECTOR.cameraOrientation.z);
  let sz = Math.sin(PLAYER_PROJECTOR.cameraOrientation.z);

  let X = (x - PLAYER_PROJECTOR.cameraPosition.x);
  let Y = (y - PLAYER_PROJECTOR.cameraPosition.y);
  let Z = (z - PLAYER_PROJECTOR.cameraPosition.z);

  let xWithRespectToCam = cy * (sz * Y + cz * X) - sy * Z;
  let yWithRespectToCam = sx * (cy * Z + sy * (sz * Y + cz * X)) + cx * (cz * Y - sz * X);
  let zWithRespectToCam = cx * (cy * Z + sy * (sz * Y + cz * X)) - sx * (cz * Y - sz * X);

  let zWithRespectToCamInverse = 1 / zWithRespectToCam;

  let x2d = xWithRespectToCam * (zWithRespectToCamInverse) * PLAYER_PROJECTOR.viewerPosition.z - PLAYER_PROJECTOR.viewerPosition.x;

  let y2d = yWithRespectToCam * zWithRespectToCamInverse * PLAYER_PROJECTOR.viewerPosition.z - PLAYER_PROJECTOR.viewerPosition.y;
  return {
    x2d: x2d,
    y2d: y2d
  };
}