import {Login} from './login.model';
import {Comment} from './comment.model';

export class Spot {
  public id: number;
  public reference: string;
  public spotText: string;
  public username: string;
  public date: Date;
  public nbrLike: number;
  public login = new Login();
  public nbrSpot: number;
  public nbrComments: number;
  public email: string;
  public comments = new Array<Comment>();
}
