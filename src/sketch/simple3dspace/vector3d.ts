export type Vector3DParams = { x: number, y: number, z: number }

export class Vector3D {

  static zero = new Vector3D({ x: 0, y: 0, z: 0 });

  static copy = (src: Vector3D) => new Vector3D({
    x: src.x,
    y: src.y,
    z: src.z,
  })

  private _x: number;
  private _y: number;
  private _z: number;

  constructor(params: Vector3DParams) {
    this._x = params.x;
    this._y = params.y;
    this._z = params.z;
  }

  get x() { return this._x }
  get y() { return this._y }
  get z() { return this._z }

  get squaredMagunitude() { return this._x ** 2 + this._y ** 2 + this._z ** 2 }
  get magunitude() { return Math.sqrt(this.squaredMagunitude) }

  overwrite = (params: Partial<Vector3DParams>) => {
    this._x = params.x ?? this._x;
    this._y = params.y ?? this._y;
    this._z = params.z ?? this._z;
  }

  add = (operand: Vector3D) => {
    this._x += operand.x;
    this._y += operand.y;
    this._z += operand.z;
  }

  added = (rhs: Vector3D) => {
    const lhs = Vector3D.copy(this);
    lhs.add(rhs);
    return lhs;
  }

  subtract = (operand: Vector3D) => {
    this._x -= operand.x;
    this._y -= operand.y;
    this._z -= operand.z;
  }

  subtracted = (rhs: Vector3D) => {
    const lhs = Vector3D.copy(this);
    lhs.subtract(rhs);
    return lhs;
  }

  scale = (operand: number) => {
    this._x *= operand;
    this._y *= operand;
    this._z *= operand;
  }

  scaled = (rhs: number) => {
    const lhs = Vector3D.copy(this);
    lhs.scale(rhs);
    return lhs;
  }

  normalize = () => {
    this.scale(1 / this.magunitude);
  }

  normalized = () => {
    const v = Vector3D.copy(this);
    v.normalize();
    return v;
  }

}
