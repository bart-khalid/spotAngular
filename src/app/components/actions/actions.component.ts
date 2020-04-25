import { Component, OnInit } from '@angular/core';
import {SpotService} from '../../controller/service/spot.service';
import {Spot} from '../../controller/model/spot.model';
import {Login} from '../../controller/model/login.model';
import {LoginComponent} from '../login/login.component';
import {LoginService} from '../../controller/service/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {
  private list1: Spot[];
  private list2: Spot[];
  constructor(private spotService: SpotService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.spotService.findAll();
    if (this.loginService.currentUser == null) {
      this.router.navigate(['']);
    } else if (this.loginService.currentUser.username == null || this.spotService.spotes.length === 0) {
      this.router.navigate(['']);
    } else {
      console.log('current user : ' + this.loginService.currentUser.username);
      this.spotService.findAll();
      console.log('lets go');
      this.showLiked(this.spotService.spotes);
    }
  }

  get spotes(): Spot[] {
    return this.spotService.spotes;
  }
  get spot(): Spot {
    return this.spotService.spot;
  }
  public save(spot: Spot, username: string) {
    if (username == null) {
      alert('You Have to Sign In');
      this.router.navigate(['']);
    } else if (spot.spotText == null || spot.spotText === '') {
      alert('please enter something in your spotText');
    }
    else {
      this.spotService.save(spot, username);
    }

  }

  get currentUser(): Login {
    return this.loginService.currentUser;
  }
  public addLike(spot: Spot, username: string) {
    if (username == null) {
      alert('You Have to Sign In');
      this.router.navigate(['']);
    } else {
      this.showLiked(this.spotService.spotes);
      this.spotService.addLike(spot, username);
    }

  }

  public logOut() {
    this.loginService.login.password = null;
    this.loginService.connect = 0;
    this.loginService.currentUser = null;
    this.router.navigate(['']);
  }

  private showLiked(alllspots: Array<Spot>){
    this.list2 = this.loginService.currentUser.myLikedSpots;
    console.log('ha 2 : ' + alllspots.length);
    for (let i in alllspots) {
      for (let j in this.list2) {
        if (i === j) {
          console.log('ha homa li deja mlaykyin ' + j);
        }
      }
    }
  }
}
