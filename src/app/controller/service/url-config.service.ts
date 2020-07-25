import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlConfigService {

  private _url = 'https://spottedback.herokuapp.com/spot/';
  constructor() { }

  get url(): string {
    return this._url;
  }
}
