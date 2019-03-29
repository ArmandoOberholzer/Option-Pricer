import { Component, OnInit , Input} from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material';
import { PriceInputs, Greeks, History, TradeHist, GoalSeek,TradeSummary } from '../price';

@Component({
  selector: 'app-trade-legs',
  templateUrl: './trade-legs.component.html',
  styleUrls: ['./trade-legs.component.css']
})
export class TradeLegsComponent implements OnInit {

  constructor() { }

  @Input() teachers : TradeSummary[];
  @Input() displayHeading : boolean = false;
  displayedColumns: string[] = ['spot', 'strike','vol','divYield','time','price'];
  dataSource : MatTableDataSource<TradeSummary>;

  ngOnInit() {
      this.dataSource = new MatTableDataSource(this.teachers);
  }


}