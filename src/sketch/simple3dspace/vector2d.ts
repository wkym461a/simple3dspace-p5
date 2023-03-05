export type Vector2DParams = { x: number, y: number }

export class Vector2D {

  static zero = new Vector2D({ x: 0, y: 0 });

  static copy = (src: Vector2D) => new Vector2D({
    x: src.x,
    y: src.y,
  })

  private _x: number;
  private _y: number;

  constructor(params: Vector2DParams) {
    this._x = params.x;
    this._y = params.y;
  }

  get x() { return this._x }
  get y() { return this._y }

  get squaredMagunitude() { return this._x ** 2 + this._y ** 2 }
  get magunitude() { return Math.sqrt(this.squaredMagunitude) }

  overwrite = (params: Partial<Vector2DParams>) => {
    this._x = params.x ?? this._x;
    this._y = params.y ?? this._y;
  }

  add = (operand: Vector2D) => {
    this._x += operand.x;
    this._y += operand.y;
  }

  added = (rhs: Vector2D) => {
    const lhs = Vector2D.copy(this);
    lhs.add(rhs);
    return lhs;
  }

  subtract = (operand: Vector2D) => {
    this._x -= operand.x;
    this._y -= operand.y;
  }

  subtracted = (rhs: Vector2D) => {
    const lhs = Vector2D.copy(this);
    lhs.subtract(rhs);
    return lhs;
  }

  scale = (operand: number) => {
    this._x *= operand;
    this._y *= operand;
  }

  scaled = (rhs: number) => {
    const lhs = Vector2D.copy(this);
    lhs.scale(rhs);
    return lhs;
  }

  normalize = () => {
    this.scale(1 / this.magunitude);
  }

  normalized = () => {
    const v = Vector2D.copy(this);
    v.normalize();
    return v;
  }

}
