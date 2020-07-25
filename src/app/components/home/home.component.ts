import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {SpotService} from '../../controller/service/spot.service';
import {Spot} from '../../controller/model/spot.model';
import {CommentService} from '../../controller/service/comment.service';
import {Comment} from '../../controller/model/comment.model';
import {ToastrService} from 'ngx-toastr';
import {LoginService} from '../../controller/service/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  comment = new Comment();
  Comments = new Array<Comment>();
  username: string;
  constructor(private spotService: SpotService,
              private router: Router,
              private loginService: LoginService,
              private commentService: CommentService,
              private toast: ToastrService) { }

  visibleSidebar3;
  spotClonned = new Spot();
  ngOnInit(): void {
      this.spotService.findAll();
      this.username = localStorage.getItem('userSmia');
      this.loginService.findByUsername(this.username);
  }
  get AllSpots() {
    return this.spotService.spotes;
  }
  like(spot: Spot) {
    this.spotService.addLike(spot, localStorage.getItem('userSmia'));
  }
  save(comment: Comment, reference: string, username: string) {
    if (comment.commentText == null || comment.commentText === '' || comment.commentText.length <= 2) {
      this.toast.warning('comment message must have at least 3 characters');
    } else if (comment.commentText.length > 1000) {
      this.toast.warning('spot message must have less than 1000 characters');
    } else {
    this.visibleSidebar3 = false;
    this.commentService.save(comment, reference, username);
    this.comment.commentText = null;
    }
  }
  clone(spot: Spot){
    const clonnedSpot = new Spot();
    for (const prop in spot) {
      clonnedSpot[prop] = spot[prop];
    }
    this.spotClonned = clonnedSpot;
    this.Comments = this.spotClonned.comments;
  }

  delete(reference: string){
    this.visibleSidebar3 = false;
    this.commentService.delete(reference);
  }
  get actionDone() {
    return this.spotService.actionDone;
  }
  get actionDone2() {
    return this.commentService.actionDone;
  }
  get currentUser() {
    return this.loginService.currentUser;
  }
}
