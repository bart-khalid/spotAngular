import { Component, OnInit } from '@angular/core';
import {Spot} from '../../controller/model/spot.model';
import {SpotService} from '../../controller/service/spot.service';

@Component({
  selector: 'app-my-spots',
  templateUrl: './my-spots.component.html',
  styleUrls: ['./my-spots.component.css']
})
export class MySpotsComponent implements OnInit {

  cols: any[];
  constructor(private spotService: SpotService) { }

  ngOnInit(): void {
    this.spotService.findMySpots(localStorage.getItem('userSmia'));
    this.cols = [
      { field: 'id', header: 'N°' },
      { field: 'spotText', header: 'Spot Text' }
    ];
  }
  get mySpots() {
    return this.spotService.mySpots;
  }
  deleteSpot(reference: string) {
    this.spotService.deleteSpot(reference);
  }
  get actionDone() {
    return this.spotService.actionDone;
  }
}
