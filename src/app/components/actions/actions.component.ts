import { Component, OnInit } from '@angular/core';
import {SpotService} from '../../controller/service/spot.service';
import {Spot} from '../../controller/model/spot.model';
import {Login} from '../../controller/model/login.model';
import {LoginComponent} from '../login/login.component';
import {LoginService} from '../../controller/service/login.service';
import {Route, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {

  public hideShow = false;
  visibleSidebar1;
  visibleSidebar2;
  username: string;
  usernameTest: string;
  spot = new Spot();
  constructor(private spotService: SpotService, private router: Router, private toast: ToastrService) { }

  ngOnInit(): void {
    this.usernameTest = localStorage.getItem('userSmia');
    if (this.usernameTest === '') {
      this.router.navigate(['']);
    } else {
      this.username = localStorage.getItem('userSmia');
      this.spotService.findAll();
    }
  }
  save(spot: Spot){
    if (spot.spotText == null || spot.spotText === '' || spot.spotText.length < 5) {
      this.toast.warning('spot message must contain at least 5 characters');
    } else if (spot.spotText.length > 1000) {
      this.toast.warning('spot message must contain less than 1000 characters');
    } else {
      this.visibleSidebar2 = false;
      this.spotService.save(spot, localStorage.getItem('userSmia'));
      this.spot.spotText = null ;
    }
  }
  public logOut() {
    localStorage.setItem('userSmia', '');
    this.router.navigate(['']);
  }
  get actionDone() {
    return this.spotService.actionDone;
  }
 }
