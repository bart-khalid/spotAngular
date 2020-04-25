import {Spot} from './spot.model';

export class Login {
  public username: string;
  public password: string;
  public email: string;
  public nbrSpot: number;
  public nbrFidelite: number;
  public spots = new Array<Spot>();
  public myLikedSpots = Array<Spot>();

}
