import {Login} from './login.model';

export class Spot {
  public id: number;
  public spotText: string;
  public username: string;
  public date: Date;
  public nbrLike: number;
  public login = new Login();
  public nbrSpot: number;
  public email: string;
}
