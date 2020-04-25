import { Injectable } from '@angular/core';
import {Login} from '../model/login.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _login: Login;
  private _connect = 0;
  private _connectWithsignUp = 0;
  private url = 'http://localhost:8090/spot/login/';
  private _foundedUser = new Login();
  private _currentUser = new Login();
  constructor(private http: HttpClient, private router: Router) { }

  public seConnecter(username: string, password: string) {
    this.http.get<number>(this.url + 'connect/' + username + '/' + password).subscribe(
      data => {
        if (data === -1) {
          this._connect = 0;
          alert('your username is invalid');
        }
          else if (data === -2) {
            this._connect = 0;
            alert('your password is incorrect');
          }
          else {
            this.connect = 1;
            this._currentUser = this.findByUsername(username);
            if (this.connect === 1) {
              this.router.navigate(['actions']);
              this.connect = 0;
            } else {
              this.router.navigate(['actions']);
              this.connect = 0;
            }
        }
      }, error => {
        this._connect = 0;
        console.log('error link not valid');
      }
    );
  }

  public findByUsername(username: string): Login {
    this.http.get<Login>(this.url + 'user/' + username).subscribe(
      data => {
        this._foundedUser = data;
      }, error => {
        console.log('invalid url');
      }
    );
    return this._foundedUser;
  }

  public save(login: Login) {
    this.http.post<number>(this.url, login).subscribe(
      data => {
        if (data === -1) {
          alert('your username existe alredy');
        }
        else if (data === -2) {
          alert('please enter your password');
        }
        else if (data === -3) {
          alert('please enter your Email');
        }
        else {
          this.login = null;
          this.connectWithsignUp = 1;
          this.currentUser = login;
          if (this.connectWithsignUp === 1){
            this.router.navigate(['actions']);
            this.connectWithsignUp = 0;
          } else {
            this.router.navigate(['']);
          }
        }
      }, error => {
        console.log('error link not valid');
      }
    );
  }


  get connectWithsignUp(): number {
    return this._connectWithsignUp;
  }

  set connectWithsignUp(value: number) {
    this._connectWithsignUp = value;
  }

  get foundedUser(): Login {
    return this._foundedUser;
  }

  set foundedUser(value: Login) {
    this._foundedUser = value;
  }

  get currentUser(): Login {
    return this._currentUser;
  }

  set currentUser(value: Login) {
    this._currentUser = value;
  }

  get connect(): number {
    return this._connect;
  }

  set connect(value: number) {
    this._connect = value;
  }

  get login(): Login {
    if (this._login == null) {
      this._login = new Login();
    }
    return this._login;
  }

  set login(value: Login) {
    this._login = value;
  }
}
