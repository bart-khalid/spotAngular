import {Login} from './login.model';
import {Spot} from './spot.model';

export class Comment {
  public id: number;
  public reference: string;
  public username: string;
  public commentText: string;
  public login = new Login();
  public spot = new Spot();
}
