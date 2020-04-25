import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../controller/service/login.service';
import {Login} from '../../controller/model/login.model';
import {Router} from '@angular/router';
import {log} from 'util';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  private _currentUser = new Login();
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }
  public save(login: Login) {
    if (login.password == null && login.email == null && login.password == null) {
      alert('please Fill in the information');
    } else if (login.username == null) {
      alert('please enter your username');
    } else if (login.email == null) {
      alert('please enter your Email');
    } else if (login.password == null) {
      alert('please enter your password');
    } else {
      this.loginService.save(login);
    }
  }
  get login(): Login {
    return this.loginService.login;
  }


  get currentUser(): Login {
    return this._currentUser;
  }

  set currentUser(value: Login) {
    this._currentUser = value;
  }
  get connectWithsignUp(): number {
    return this.loginService.connectWithsignUp;
  }

  private setConnectWithsignUp(value: number) {
    this.loginService.connectWithsignUp = value;
  }
}
