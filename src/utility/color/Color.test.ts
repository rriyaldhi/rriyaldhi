import Color from './Color';

describe('Color', () =>
{
  it('should store color', () =>
  {
    const fore: string = 'black';
    const back: string = 'white';
    const color: Color = new Color(fore, back);
    expect(color.fore).toEqual(fore);
    expect(color.back).toEqual(back);
  });

});
