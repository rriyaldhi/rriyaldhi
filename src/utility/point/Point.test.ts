import Point from './Point';

describe('Point', () =>
{
  it('should store point', () =>
  {
    const x: number = 1;
    const y: number = 2;
    const point: Point = new Point(1, 2);
    expect(point.x).toEqual(x);
    expect(point.y).toEqual(y);
  });

});
