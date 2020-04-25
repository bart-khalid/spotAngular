import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../controller/service/login.service';
import {Login} from '../../controller/model/login.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private _currentUser = new Login();
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }
  public seConnecter(username: string, password: string) {
    if (username == null && password == null) {
      alert('please fill in the information');
    } else if (username == null) {
      alert('please enter your username');
    } else if (password == null) {
      alert('please enter your password');
    } else {
      this.loginService.seConnecter(username, password);
    }
  }
  get login(): Login {
    return this.loginService.login;
  }
  get connect(): number {
    return this.loginService.connect;
  }
  private setConnect(value: number) {
    this.loginService.connect = value;
  }

  get currentUser(): Login {
    return this._currentUser;
  }

  set currentUser(value: Login) {
    this._currentUser = value;
  }
}
