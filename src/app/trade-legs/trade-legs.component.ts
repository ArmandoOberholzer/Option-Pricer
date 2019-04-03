import { Component, OnInit , Input} from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material';
import { Legs, Greeks,TradeSummary } from '../price';

@Component({
  selector: 'app-trade-legs',
  templateUrl: './trade-legs.component.html',
  styleUrls: ['./trade-legs.component.css']
})
export class TradeLegsComponent implements OnInit {

  constructor() { }

  @Input() Legs : Legs;
  @Input() displayHeading : boolean = false;
  displayedColumns: string[] = ['spot', 'strike','vol','divYield','time','price'];

  ngOnInit() {
  }


}
