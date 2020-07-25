import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../controller/service/login.service';
import {Login} from '../../controller/model/login.model';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private _currentUser = new Login();
  constructor(private loginService: LoginService, private router: Router, private toast: ToastrService) { }

  ngOnInit(): void {
    // if (localStorage.getItem('userSmia') !== '') {
      // this.router.navigate(['actions/home']);
     // }
  }
  public seConnecter(username: string, password: string) {
    if ((username == null || username === '') && (password == null || password === '')) {
      this.toast.warning('please fill in the information', 'missing infos');
    } else if (username == null || username === '') {
      this.toast.warning('please enter your username', 'missing info');
    } else if (password == null || password === '') {
      this.toast.warning('please enter your password', 'missing info');
    } else {
      this.loginService.seConnecter(username, password);
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
