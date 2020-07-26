import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../controller/service/login.service';
import {Login} from '../../controller/model/login.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-my-infos',
  templateUrl: './my-infos.component.html',
  styleUrls: ['./my-infos.component.css']
})
export class MyInfosComponent implements OnInit {


  passwordConfirm: string;
  constructor(private loginService: LoginService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.loginService.findByUsername(localStorage.getItem('userSmia'));
  }
  get currentUser() {
    return this.loginService.currentUser;
  }
  update(login: Login) {
    if (login.username === '' || login.username == null || login.username === undefined) {
      this.toast.warning('Please enter your username', 'Username is required');
    } else if (login.email === '' || login.email == null || login.email === undefined) {
      this.toast.warning('Please enter your Email', 'Email is required');
    } else if (login.password === '' || login.password == null || login.password === undefined) {
      this.toast.warning('Please enter your Password', 'Password is required');
    } else if (login.password !== this.passwordConfirm) {
      this.toast.warning('Please verify your password', 'Passwords not matched');
    } else {
      this.loginService.update(login);
    }
  }
  get actionDone() {
    return this.loginService.actionDone;
  }
}
