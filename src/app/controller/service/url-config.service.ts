import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlConfigService {

  private _url = 'http://localhost:8090/spot/';
  constructor() { }

  get url(): string {
    return this._url;
  }
}
