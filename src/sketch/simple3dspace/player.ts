import { Vector2D } from "./vector2d";

export type PlayerParams = {
  position: Vector2D,
  angle_rad: number,
}

export class Player {

  static shared = new Player;

  private _position: Vector2D;
  private _angle_rad: number;

  private constructor() {
    this._position = Vector2D.zero;
    this._angle_rad = 0;
  }

  get position() { return this._position }
  get angle_rad() { return this._angle_rad }

  overwrite = (params: Partial<PlayerParams>) => {
    this._position = params.position ?? this._position;
    this._angle_rad = params.angle_rad ?? this._angle_rad;
  }

}
