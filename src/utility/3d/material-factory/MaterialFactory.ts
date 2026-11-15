import type { BaseTexture } from '@babylonjs/core/Materials/Textures/baseTexture.js';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial.js';
import type { Color3 } from '@babylonjs/core/Maths/math.color.js';
import type { Scene } from '@babylonjs/core/scene.js';

export default class MaterialFactory
{
  public static buildStandardMaterial(name: string, scene: Scene, texture: BaseTexture, color: Color3): StandardMaterial
  {
    const material: StandardMaterial = new StandardMaterial(name, scene);
    material.diffuseTexture = texture;
    material.emissiveColor = color;
    return material;
  }
}
