import {ScreenSizeObserverSingleton} from "./ScreenSizeObserverSingleton";

describe('ScreenSizeObserverSingleton', () =>
{
  it('should get the same screen size observer', () =>
  {
    const screenSizeObserver1: ScreenSizeObserverSingleton = ScreenSizeObserverSingleton.getInstance();
    const screenSizeObserver2: ScreenSizeObserverSingleton = ScreenSizeObserverSingleton.getInstance();
    expect(screenSizeObserver1).toEqual(screenSizeObserver2);
  });
});
