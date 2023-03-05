import { Vector3D } from "./vector3d";

export type Ray3DParams = {
  origin: Vector3D,    // 始点の位置ベクトル
  direction: Vector3D, // 始点から伸びる方向ベクトル
}

export type Ray3D2PointsParams = {
  begin: Vector3D,
  end: Vector3D,
}

export class Ray3D {

  static copy = (src: Ray3D) => new Ray3D({
    origin: Vector3D.copy(src.origin),
    direction: Vector3D.copy(src.direction),
  });

  static createFrom2Points = (params: Ray3D2PointsParams) => new Ray3D({
    origin: params.begin,
    direction: params.end.subtracted(params.begin),
  });

  private _origin: Vector3D;
  private _direction: Vector3D;

  constructor(params: Ray3DParams) {
    this._origin = params.origin;
    this._direction = params.direction;
  }

  get origin() { return this._origin }
  get direction() { return this._direction }
  get begin() { return this._origin }
  get end() { return this._origin.added(this._direction) }

  overwrite = (params: Partial<Ray3DParams>) => {
    this._origin = params.origin ?? this._origin;
    this._direction = params.direction ?? this._direction;
  }

  // intersection = (rhs: Ray3D) => {
  //   const lhs = Ray3D.copy(this);

  //   if (Math.abs(lhs.direction.x) < 0.01) {
  //     lhs.direction.x = 0.01;
  //   }
  //   if (Math.abs(rhs.direction.x) < 0.01) {
  //     rhs.direction.x = 0.01;
  //   }

  //   let t1 = lhs.direction.y / lhs.direction.x;
  //   let t2 = rhs.direction.y / rhs.direction.x;
  //   let x1 = lhs.origin.x;
  //   let x2 = rhs.origin.x;
  //   let y1 = lhs.origin.y;
  //   let y2 = rhs.origin.y;
  //   let sx = (t1 * x1 - t2 * x2 - y1 + y2) / (t1 - t2);
  //   let sy = t1 * (sx - x1) + y1;

  //   if (
  //     Math.min(lhs.begin.x, lhs.end.x) < sx && sx < Math.max(lhs.begin.x, lhs.end.x) &&
  //     Math.min(rhs.begin.x, rhs.end.x) < sx && sx < Math.max(rhs.begin.x, rhs.end.x)

  //   ) {
  //     return new Vector3D({  })

  //   } else {
  //     return null;
  //   }
  // }

}
