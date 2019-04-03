import { Component, OnInit, ViewChild } from '@angular/core';
import { PriceService } from '../price.service';
import { Legs, Greeks, TradeSummary } from '../price';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { OptionDetailsComponent } from '../option-details/option-details.component';

@Component({
  providers: [OptionDetailsComponent],
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class HistoryComponent implements OnInit {

  Tradeinfo: TradeSummary[];
  dataSource;
  clientName: string;


  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['Tradeid', 'Client', 'action'];
  expandedElement: TradeSummary | null;


  constructor(private PriceService: PriceService, public optdetail: OptionDetailsComponent) { }

  ngOnInit() {
    this.getHistory();
  }

  public getTrade(id: number): void {
    setTimeout(() => {
      console.log("**")
      this.optdetail.getTrade(id);
    }, 200);
  }

  getHistory(): void {
    this.PriceService.getHistory()
      .subscribe(Tradeinfo => {
        this.dataSource = new MatTableDataSource(Tradeinfo);
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setDatasource(id: number) {
    this.PriceService.getTradeLegs(id)
      .subscribe(Toets => {
        console.log(Toets);
        this.dataSource.data[id - 1]['TradeLegs'] = Toets;
      });
  }

}


