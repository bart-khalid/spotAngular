import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Login} from '../model/login.model';
import {Router} from '@angular/router';
import {Comment} from '../model/comment.model';
import {SpotService} from './spot.service';
import {UrlConfigService} from './url-config.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private url = this.urlGlobal + 'Comment/';
  private text: string;
  private _actionDone;
  constructor(private http: HttpClient, private toast: ToastrService,
              private router: Router,
              private spotService: SpotService,
              private configUrl: UrlConfigService) { }

  public save(comment: Comment, reference: string, username: string) {
    this._actionDone = true;
    this.text = comment.commentText;
    this.http.post<number>(this.url + reference + '/' + username, comment).subscribe(
      data => {
        if (data === -1) {
          this.toast.warning('You are not connected', 'Unknown problem !!');
          localStorage.setItem('userSmia', '');
          this.router.navigate(['']);
          this._actionDone = false;
        } else {
          this.toast.success('' + this.text, 'Comment published');
          this.spotService.findAll();
          this._actionDone = false;
        }
      }, error => {
        console.log('error link not valid');
        this.toast.error('Error on the server please reload the page', 'Connection Failed');
        this._actionDone = false;
      }
    );
  }

  public delete(reference: string) {
    this._actionDone = true;
    this.http.delete<number>(this.url + 'delete/reference/' + reference).subscribe(
      data => {
        if (data === 1) {
          this.toast.info('you can submit new comments again and again !!', 'Comment deleted');
          this.spotService.findAll();
          this._actionDone = false;
        } else {
          console.log('error link not valid');
          this.toast.error('Error on the server please reload the page', 'Connection Failed');
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
  get urlGlobal(): string {
    return this.configUrl.url;
  }
}
