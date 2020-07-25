import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../controller/service/login.service';
import {Login} from '../../controller/model/login.model';
import {Router} from '@angular/router';
import {log} from 'util';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  private _currentUser = new Login();
  constructor(private loginService: LoginService, private router: Router, private toast: ToastrService) { }

  ngOnInit(): void {
  }
  public save(login: Login) {
    if (login.password == null && login.email == null && login.password == null) {
      this.toast.warning('please Fill in the information', 'Missing infos');
    } else if (login.username == null || login.username === '') {
      this.toast.warning('please enter your username', 'username is required');
    } else if (login.email == null || login.email === '') {
      this.toast.warning('please enter your Email', 'Email is required');
    } else if (login.password == null || login.password === '') {
      this.toast.warning('please enter your password', 'Password required');
    } else {
      this.loginService.save(login);
    }
  }
  get login(): Login {
    return this.loginService.login;
  }

  get actionDone() {
    return this.loginService.actionDone;
  }

  get currentUser(): Login {
    return this._currentUser;
  }

  set currentUser(value: Login) {
    this._currentUser = value;
  }

}
