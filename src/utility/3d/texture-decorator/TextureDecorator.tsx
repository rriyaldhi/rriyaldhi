import {DynamicTexture} from 'babylonjs';
import Font from "../../font/Font";

export default class TextureDecorator {

  private _dynamicTexture: DynamicTexture;

  get dynamicTexture(): DynamicTexture {
    return this._dynamicTexture;
  }

  constructor(dynamicTexture: DynamicTexture)
  {
    this._dynamicTexture = dynamicTexture;
  }

  public drawText(
    text: string,
    font: Font
  ): void
  {
    this._dynamicTexture.drawText(
      text,
      font.point.x,
      font.point.y,
      `${font.type} ${font.size} ${font.family}`,
      font.color.fore,
      font.color.back,
      true,
      true
    );
  }

  public rotate(uAng: number, vAng: number, wAng: number): void
  {
    this._dynamicTexture.uAng = uAng;
    this._dynamicTexture.vAng = vAng;
    this._dynamicTexture.wAng = wAng;
  }
}
