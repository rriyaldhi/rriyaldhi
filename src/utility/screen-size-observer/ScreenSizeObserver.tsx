export interface ScreenSizeObserverInterface
{
  onScreenSizeUpdate(screenSize: number): void;
}

export default class ScreenSizeObserver
{
  private observers: ScreenSizeObserverInterface[];

  public constructor()
  {
    this.observers = [];
  }

  public attach(observer: ScreenSizeObserverInterface): void
  {
    this.observers.push(observer);
  }

  public detach(observer: ScreenSizeObserverInterface): void
  {
    const observerIndex: number = this.observers.indexOf(observer);
    this.observers.splice(observerIndex, 1);
  }

  public notify(screenSize: number): void
  {
    this.observers.forEach((observer: ScreenSizeObserverInterface) =>
    {
      observer.onScreenSizeUpdate(screenSize);
    });
  }

}
