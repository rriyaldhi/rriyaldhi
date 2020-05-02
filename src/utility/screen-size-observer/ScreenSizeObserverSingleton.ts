import ScreenSizeObserver from "./ScreenSizeObserver";

export class ScreenSizeObserverSingleton
{
  private static _instance: ScreenSizeObserver;

  private constructor() {}

  public static getInstance(): ScreenSizeObserver
  {
    if (this._instance == null)
    {
      this._instance = new ScreenSizeObserver();
    }
    return this._instance;
  }
}
