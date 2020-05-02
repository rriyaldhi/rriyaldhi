import {BaseTexture, Color3, Scene, StandardMaterial} from 'babylonjs';

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
