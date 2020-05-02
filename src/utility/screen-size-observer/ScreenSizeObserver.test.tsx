import ScreenSizeObserver, { ScreenSizeObserverInterface } from './ScreenSizeObserver';

class ScreenSizeObserverTest implements ScreenSizeObserverInterface
{
  public notified: boolean;

  constructor()
  {
    this.notified = false;
  }

  onScreenSizeUpdate(screenSize: number): void
  {
    this.notified = true;
  }
}

describe('ScreenSizeObserver', () =>
{
  it('should be notified', () =>
  {
    const screenSizeObserver: ScreenSizeObserver = new ScreenSizeObserver();
    const screenSizeObserverTest: ScreenSizeObserverTest = new ScreenSizeObserverTest();
    screenSizeObserver.attach(screenSizeObserverTest);
    screenSizeObserver.detach(screenSizeObserverTest);
    screenSizeObserver.attach(screenSizeObserverTest);

    screenSizeObserver.notify(960);

    expect(screenSizeObserverTest.notified).toBeTruthy();
  });
});
