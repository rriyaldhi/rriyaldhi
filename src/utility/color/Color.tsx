export default class Color
{
  private _fore: string;
  private _back: string;

  get fore(): string
  {
    return this._fore;
  }

  get back(): string
  {
    return this._back;
  }

  constructor(
    fore?: string,
    back?: string
  )
  {
    this._fore = fore;
    this._back = back;
  }
}
