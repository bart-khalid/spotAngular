import { Injectable } from '@angular/core';
import {Spot} from '../model/spot.model';
import {HttpClient} from '@angular/common/http';
import {Login} from '../model/login.model';
import {LoginService} from './login.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {UrlConfigService} from './url-config.service';

@Injectable({
  providedIn: 'root'
})
export class SpotService {

  private _spot: Spot;
  private _url = this.urlGlobal;
  private _spotes = new Array<Spot>();
  private _mySpots = new Array<Spot>();
  private _actionDone;
  constructor(private http: HttpClient, private loginService: LoginService, private toast: ToastrService, private route: Router, private urlConfig: UrlConfigService) { }

  public save(spot: Spot, username: string) {
    this._actionDone = true;
    this.http.post<number>(this._url + username, spot).subscribe(
      data => {
        if (data === -1) {
          this.toast.warning('You are not connected !', 'Unknown Problem !!');
          localStorage.setItem('userSmia', '');
          this.route.navigate(['']);
          this._actionDone = false;
        } else {
          this.toast.success('your spot is published', 'success');
          this.findAll();
          this.findMySpots(localStorage.getItem('userSmia'));
          this._actionDone = false;
        }
      }, error => {
        console.log('url invalid');
        this.toast.error('Error on the server please reload the page', 'Connection Failed');
        this._actionDone = false;
      }
    );
  }
  public findAll(){
    this._actionDone = true;
    this.http.get<Array<Spot>>(this._url).subscribe(
      data => {
          this.spotes = data.reverse();
        this._actionDone = false;
        }, error => {
        console.log('error in the link');
        this.toast.error('Error on the server please reload the page', 'Connection Failed');
        this._actionDone = false;
      }
    );
  }
  public addLike(spot: Spot, username: string) {
    this._actionDone = true;
    this.http.put(this._url + 'addLike/' + username, spot).subscribe(
    data => {
      if (data === -1) {
        this.toast.warning('You are not connected !', 'Unknown Problem !!');
        localStorage.setItem('userSmia', '');
        this.route.navigate(['']);
        this._actionDone = false;
      } else if (data === -2) {
        this.toast.info('you have already liked this spot', 'thx !!');
        this._actionDone = false;
      } else {
        console.log('spot liked');
        this.toast.success('yeaaah coolll  !!!', 'spot liked !!');
        this.findAll();
        this._actionDone = false;
      }

    }, error => {
         console.log('error link like');
         this.toast.error('Error on the server please reload the page', 'Connection Failed');
         this._actionDone = false;
      }
    );
  }

  public findMySpots(username: string) {
    this._actionDone = true;
    this.http.get<Array<Spot>>(this._url + 'mySpots/' + username).subscribe(
      data => {
        if (data != null){
          this._mySpots = data.reverse();
          this._actionDone = false;
        } else {
          this._actionDone = false;
        }
      }, error => {
        console.log('error link like');
        this.toast.error('Error on the server please reload the page', 'Connection Failed');
        this._actionDone = false;
      }
    );
  }
  public deleteSpot(reference: string) {
    this._actionDone = true;
    this.http.delete(this._url + 'delete/' + reference).subscribe(
      data => {
        this.toast.success('Your Spot has been deleted !!!', 'success');
        this.findMySpots(localStorage.getItem('userSmia'));
        this._actionDone = false;
      }, error => {
        console.log('error link like');
        this.toast.error('Error on the server please reload the page', 'Connection Failed');
        this._actionDone = false;
      }
    );
  }

  get actionDone() {
    return this._actionDone;
  }

  set actionDone(value) {
    this._actionDone = value;
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

  get mySpots(): Spot[] {
    return this._mySpots;
  }

  set mySpots(value: Spot[]) {
    this._mySpots = value;
  }
  get urlGlobal(): string {
    return this.urlConfig.url;
  }
}
