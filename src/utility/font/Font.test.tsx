import Font from './Font';
import Point from "../point/Point";
import Color from "../color/Color";

describe('Font', () =>
{
  it('should store font', () =>
  {
    const family: string = 'arial';
    const type: string = 'bold';
    const size: string = '12px';
    const color: Color = new Color('black', 'white');
    const point: Point = new Point(1, 2);
    const font: Font = new Font(
      family,
      type,
      size,
      color,
      point,
    );
    expect(font.family).toEqual(family);
    expect(font.type).toEqual(type);
    expect(font.size).toEqual(size);
    expect(font.color).toEqual(color);
    expect(font.point).toEqual(point);
  });

});
