import { Injectable } from '@angular/core';
import {Login} from '../model/login.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Toast} from 'primeng';
import {ToastrService} from 'ngx-toastr';
import {UrlConfigService} from './url-config.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _login: Login;
  private url = this.urlGlobal + 'login/';
  private _foundedUser = new Login();
  private _currentUser = new Login();
  private _actionDone;
  constructor(private http: HttpClient, private router: Router, private toast: ToastrService, private urlConfig: UrlConfigService) { }

  public seConnecter(username: string, password: string) {
    this._actionDone = true;
    this.http.get<number>(this.url + 'connect/' + username + '/' + password).subscribe(
      data => {
        if (data === -1) {
          this.toast.warning('your username is invalid');
          this._actionDone = false;
        }
          else if (data === -2) {
            this.toast.warning('your password is incorrect');
            this._actionDone = false;
          }
          else {
            localStorage.setItem('userSmia', username);
            this.toast.success(username + ' !!' , 'Welcome');
            this.router.navigate(['actions/home']);
            this._actionDone = false;
            }
      }, error => {
        console.log('error link not valid');
        this.toast.error('Error on the server please reload the page', 'Connection Failed');
        this._actionDone = false;
      }
    );
  }

  public findByUsername(username: string){
    this._actionDone = true;
    this.http.get<Login>(this.url + 'user/' + username).subscribe(
      data => {
        if (data != null) {
          console.log('user founded: ' + data.username);
          this._currentUser = data;
          this._actionDone = false;
        } else {
          this._actionDone = false;
          this._currentUser = null;
        }
      }, error => {
        console.log('error link not valid');
        this.toast.error('Error on the server please reload the page', 'Connection Failed');
        this._actionDone = false;
      }
    );
  }

  public save(login: Login) {
    this._actionDone = true;
    this.http.post<number>(this.url, login).subscribe(
      data => {
        if (data === -1) {
          this.toast.warning('username already exist', 'Duplicated');
          this._actionDone = false;
        }
        else if (data === -2) {
          this.toast.warning('please enter your password', 'missing info');
          this._actionDone = false;
        }
        else if (data === -3) {
          this.toast.warning('please enter your email', 'missing info');
          this._actionDone = false;
        }
        else {
          localStorage.setItem('userSmia', login.username);
          this.toast.success('You did it!,  ' + login.username, 'success');
          this.router.navigate(['actions/home']);
          this._actionDone = false;
        }
      }, error => {
        console.log('error link not valid');
        this.toast.error('Error on the server please reload the page', 'Connection Failed');
        this._actionDone = false;
      }
    );
  }
  public update(login: Login) {
    this._actionDone = true;
    this.http.put<number>(this.url + 'update', login).subscribe(
      data => {
        if (data === -1) {
          this.toast.warning('Username is Duplicated', 'invalid username');
          this._actionDone = false;
        } else {
          localStorage.setItem('userSmia', login.username);
          this.toast.info(login.username, 'Your new username');
          this.toast.success('Your infos was updated !!', 'success');
          this._actionDone = false;
        }
      }, error => {
        console.log('error link not valid');
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
  get login(): Login {
    if (this._login == null) {
      this._login = new Login();
    }
    return this._login;
  }

  set login(value: Login) {
    this._login = value;
  }
  get urlGlobal(): string {
    return this.urlConfig.url;
  }
}
