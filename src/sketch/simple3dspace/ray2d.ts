import { Vector2D } from "./vector2D";

export type Ray2DParams = {
  origin: Vector2D,    // 始点の位置ベクトル
  direction: Vector2D, // 始点から伸びる方向ベクトル
}

export type Ray2D2PointsParams = {
  begin: Vector2D,
  end: Vector2D,
}

export class Ray2D {

  static copy = (src: Ray2D) => new Ray2D({
    origin: Vector2D.copy(src.origin),
    direction: Vector2D.copy(src.direction),
  });

  static createFrom2Points = (params: Ray2D2PointsParams) => new Ray2D({
    origin: params.begin,
    direction: params.end.subtracted(params.begin),
  });

  private _origin: Vector2D;
  private _direction: Vector2D;

  constructor(params: Ray2DParams) {
    this._origin = params.origin;
    this._direction = params.direction;
  }

  get origin() { return this._origin }
  get direction() { return this._direction }
  get begin() { return this._origin }
  get end() { return this._origin.added(this._direction) }

  overwrite = (params: Partial<Ray2DParams>) => {
    this._origin = params.origin ?? this._origin;
    this._direction = params.direction ?? this._direction;
  }

  intersection = (rhs: Ray2D) => {
    const lhs = Ray2D.copy(this);

    if (Math.abs(lhs.direction.x) < 0.01) {
      lhs.direction.overwrite({ x: 0.01 });
    }
    if (Math.abs(rhs.direction.x) < 0.01) {
      rhs.direction.overwrite({ x: 0.01 });
    }

    let t1 = lhs.direction.y / lhs.direction.x;
    let t2 = rhs.direction.y / rhs.direction.x;
    let x1 = lhs.origin.x;
    let x2 = rhs.origin.x;
    let y1 = lhs.origin.y;
    let y2 = rhs.origin.y;
    let sx = (t1 * x1 - t2 * x2 - y1 + y2) / (t1 - t2);
    let sy = t1 * (sx - x1) + y1;

    if (
      Math.min(lhs.begin.x, lhs.end.x) < sx && sx < Math.max(lhs.begin.x, lhs.end.x) &&
      Math.min(rhs.begin.x, rhs.end.x) < sx && sx < Math.max(rhs.begin.x, rhs.end.x)

    ) {
      return new Vector2D({ x: sx, y: sy });

    } else {
      return null;
    }
  }

}
