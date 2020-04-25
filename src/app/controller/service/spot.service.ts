import { Injectable } from '@angular/core';
import {Spot} from '../model/spot.model';
import {HttpClient} from '@angular/common/http';
import {Login} from '../model/login.model';
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root'
})
export class SpotService {

  private _spot: Spot;
  private _url = 'http://localhost:8090/spot/';
  private _spotes = new Array<Spot>();
  constructor(private http: HttpClient, private loginService: LoginService) { }

  public save(spot: Spot, username: string) {
    this.http.post<number>(this._url + username, spot).subscribe(
      data => {
        alert('success');
        this.loginService.currentUser = this.loginService.findByUsername(username);
        this.spot.spotText = '';
        this.findAll();

      }, error => {
        console.log('url invalid');
      }
    );
  }
  public findAll(){
    this.http.get<Array<Spot>>(this._url).subscribe(
      data => {
          this.spotes = data.reverse();
        }, error => {
        console.log('error in the link');
      }
    );
  }
  public addLike(spot: Spot, username: string) {
    this.http.put(this._url + 'addLike/' + username, spot).subscribe(
    data => {
      if (data === -1) {
        alert('you are already liked this  spot');
      } else {
        console.log('spot liked');

        this.findAll();
      }

    }, error => {
      alert('you are already liked this  spot');
      console.log('error link like');
      }
    );
  }

  get spot(): Spot {
    if ( this._spot == null) {
      this._spot = new Spot();
    }
    return this._spot;
  }

  set spot(value: Spot) {
    this._spot = value;
  }

  get spotes(): Spot[] {
    if (this._spotes == null){
      this._spotes = new Array<Spot>();
    }
    return this._spotes;
  }

  set spotes(value: Spot[]) {
    this._spotes = value;
  }
}
