import {
  ActionManager,
  Animation,
  Color3,
  DynamicTexture,
  InterpolateValueAction,
  Mesh,
  MeshBuilder,
  MultiMaterial,
  Scene,
  StandardMaterial,
  SubMesh
} from 'babylonjs';
import {
  ANIMATION_HOVER_DURATION,
  ANIMATION_PROPERTY,
  ANIMATION_TOTAL_FRAME,
  TEXTURE_SIZE
} from './BoxText.constant';
import Font from "../../font/Font";
import Color from "../../color/Color";
import Point from "../../point/Point";
import TextureDecorator from "../texture-decorator/TextureDecorator";
import MaterialFactory from "../material-factory/MaterialFactory";
import {ScreenSizeObserverInterface} from "../../screen-size-observer/ScreenSizeObserver";

export class BoxText implements ScreenSizeObserverInterface
{
  private readonly _scene: Scene;
  private readonly _text: string;
  private readonly _size: number;
  private readonly _color: Color;
  private readonly _fontFamily: string;
  private readonly _fontType: string;
  private _boxMeshes: Mesh[];

  constructor(scene: Scene, text: string, size: number, color: Color, fontFamily: string, fontType: string)
  {
    this._scene = scene;
    this._boxMeshes = [];
    this._text = text;
    this._size = size;
    this._color = color;
    this._fontFamily = fontFamily;
    this._fontType = fontType;
  }

  private static getBoxOption(size: number): any
  {
    const faceColors: Color3[] = new Array(6);
    faceColors[1] = Color3.White();
    faceColors[5] = Color3.White();

    return {
      width: size,
      height: size,
      depth: size,
      faceColors
    };
  }

  private static getBoxSize(screenSize: number, size: number): number
  {
    let fixedSize: number = size;
    if (screenSize <= 480)
    {
      fixedSize = 0.55 * size;
    }
    else if (screenSize <= 960)
    {
      fixedSize = 0.85 * size;
    }
    return fixedSize;
  }

  public static getBoxProperty(
    dynamicTexture: DynamicTexture,
    color: Color,
    text: string,
    fontFamily: string,
    fontType: string,
    screenSize: number
  ): Font
  {
    const width: number = dynamicTexture.getSize().width;
    const height: number = dynamicTexture.getSize().height;
    const textTextureContext: CanvasRenderingContext2D = dynamicTexture.getContext();

    let size: string = (TEXTURE_SIZE * 0.5) + 'pt';
    let y: number = height - (height / 3);

    if (screenSize <= 480)
    {
      size = (TEXTURE_SIZE * 0.8) + 'pt';
      y = height - (height / 5);
    }
    else if (screenSize <= 960)
    {
      size = (TEXTURE_SIZE * 0.6) + 'pt';
      y = height - (height / 4);
    }

    textTextureContext.font = `${size} ${fontFamily}`;
    const textWidth: number = textTextureContext.measureText(text).width;

    return new Font(
      fontFamily,
      fontType,
      size,
      color,
      new Point(
        (width - textWidth) / 2,
        y
      )
    );
  }

  private dispose(): void
  {
    this._boxMeshes.forEach((boxMesh: Mesh) =>
    {
      boxMesh.dispose();
    });
  }

  private build(screenSize: number): void
  {
    let i: number;
    for (i = 0; i < this._text.length; i++)
    {
      const dynamicTextureFront: DynamicTexture = new DynamicTexture('textureFront', {
        width: TEXTURE_SIZE,
        height: TEXTURE_SIZE
      }, this._scene, null);
      const textureDecoratorFront: TextureDecorator = new TextureDecorator(dynamicTextureFront);
      const fontFront: Font = BoxText.getBoxProperty(dynamicTextureFront, this._color, this._text[i], this._fontFamily, this._fontType, screenSize);
      textureDecoratorFront.drawText(
        this._text[i],
        fontFront
      );

      const dynamicTextureBottom: DynamicTexture = new DynamicTexture('textureBottom', {
        width: TEXTURE_SIZE,
        height: TEXTURE_SIZE
      }, this._scene, null);
      const textureDecoratorBottom: TextureDecorator = new TextureDecorator(dynamicTextureBottom);
      const fontBottom: Font = BoxText.getBoxProperty(dynamicTextureBottom, new Color(this._color.back, this._color.fore), this._text[i], this._fontFamily, this._fontType, screenSize);
      textureDecoratorBottom.drawText(
        this._text[i],
        fontBottom
      );
      textureDecoratorBottom.rotate(0, 0, -Math.PI / 2);

      const materialFront: StandardMaterial = MaterialFactory.buildStandardMaterial(
        'materialFront',
        this._scene,
        textureDecoratorFront.dynamicTexture,
        Color3.White()
      );
      const materialBottom: StandardMaterial = MaterialFactory.buildStandardMaterial(
        'materialBottom',
        this._scene,
        textureDecoratorBottom.dynamicTexture,
        Color3.White()
      );

      const multiMaterial: MultiMaterial = new MultiMaterial('multiMaterial', this._scene);
      multiMaterial.subMaterials.push(materialFront);
      multiMaterial.subMaterials.push(materialBottom);

      const size: number = BoxText.getBoxSize(screenSize, this._size);
      const boxMesh: Mesh = MeshBuilder.CreateBox(`mesh${i}`, BoxText.getBoxOption(size), this._scene);
      boxMesh.position.x = (i * size) - ((this._text.length * size) / 2) + (size / 2);
      boxMesh.material = multiMaterial;

      const totalVertices: number = boxMesh.getTotalVertices();
      boxMesh.subMeshes = [];
      boxMesh.subMeshes.push(new SubMesh(0, 0, totalVertices, 7, 6, boxMesh));

      boxMesh.visibility = 0;

      this._boxMeshes.push(boxMesh);
    }
  }

  private animate(): void
  {
    const boxAnimation: Animation = new Animation(
      'boxAnimation',
      'visibility',
      50,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    const keys: any[] = [];
    keys.push({
      frame: 0,
      value: 0
    });
    keys.push({
      frame: ANIMATION_TOTAL_FRAME,
      value: 1
    });
    boxAnimation.setKeys(keys);

    this._boxMeshes.forEach((boxMesh: Mesh) =>
    {
      boxMesh.animations = [];
      boxMesh.animations.push(boxAnimation);
      this._scene.beginAnimation(boxMesh, 0, ANIMATION_TOTAL_FRAME, false, 1, () =>
      {
        this.onAnimateEnd(boxMesh);
      });
    });
  }

  private onAnimateEnd(boxMesh: Mesh): void
  {
    const totalVertices: number = boxMesh.getTotalVertices();
    boxMesh.subMeshes.push(new SubMesh(1, 0, totalVertices, 30, 6, boxMesh));

    boxMesh.actionManager = new ActionManager(this._scene);

    const pointerOverAction: InterpolateValueAction = new InterpolateValueAction(
      ActionManager.OnPointerOverTrigger,
      boxMesh,
      ANIMATION_PROPERTY,
      Math.PI / 2,
      ANIMATION_HOVER_DURATION,
      null,
      true
    );
    boxMesh.actionManager.registerAction(pointerOverAction);

    const pointerOutAction: InterpolateValueAction = new InterpolateValueAction(
      ActionManager.OnPointerOutTrigger,
      boxMesh,
      ANIMATION_PROPERTY,
      0,
      ANIMATION_HOVER_DURATION,
      null,
      true
    );
    boxMesh.actionManager.registerAction(pointerOutAction);
  }

  public initiate(screenSize: number): void
  {
    this.dispose();
    this.build(screenSize);
    this.animate();
  }

  public onScreenSizeUpdate(screenSize: number): void
  {
    this.initiate(screenSize);
  }
}
