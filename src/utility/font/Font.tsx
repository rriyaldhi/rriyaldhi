import Color from '../color/color';
import Point from '../../point/Point';

export default class Font
{
  private _family: string;
  private _type: string;
  private _size: string;
  private _color: Color;
  private _point: Point;

  get family(): string
  {
    return this._family;
  }

  get type(): string
  {
    return this._type;
  }

  get size(): string
  {
    return this._size;
  }

  get color(): Color
  {
    return this._color;
  }

  get point(): Point
  {
    return this._point;
  }

  constructor(
    family: string,
    type: string,
    size: string,
    color: Color,
    point: Point
  )
  {
    this._family = family;
    this._type = type;
    this._size = size;
    this._color = color;
    this._point = point;
  }
}
