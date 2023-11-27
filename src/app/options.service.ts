import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OptionsService
{
  private readonly hcKey = 'high_contrast';
  private readonly fontSizeKey = 'font_size';

  constructor() { }

  set highContrast(hc: boolean)
  {
    localStorage.setItem(this.hcKey, String(hc));
  }

  get highContrast(): boolean
  {
    const hcStr = localStorage.getItem(this.hcKey);
    return hcStr === 'true';
  }

  set fontSize(size: number)
  {
    localStorage.setItem(this.fontSizeKey, String(size));
  }

  get fontSize(): number
  {
    return parseInt(localStorage.getItem(this.fontSizeKey), 10);
  }


}
