import { Component, OnInit, ViewChild} from '@angular/core';
import { PriceService } from '../price.service';
import { PriceInputs, Greeks, History, TradeHist,GoalSeek,PeriodicElement, TradeSummary} from '../price';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import  { OptionDetailsComponent } from '../option-details/option-details.component';
import { TradeLegsComponent } from '../trade-legs/trade-legs.component'

@Component({
  providers:[OptionDetailsComponent ],
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HistoryComponent implements OnInit {

  PI : PriceInputs;
  Greek: Greeks;
  Hist: History[];
  Toets: TradeHist[];
  Tradeinfo: TradeSummary[];
  dataSource;
  dataSource2;
  clientName : string;
  GoalSeek : GoalSeek;
  PE: PeriodicElement;
  searchKey: string;
  
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['Tradeid','Client','action'];
  displayedColumns2: string[] = ['spot', 'strike','vol','divYield','time','price'];
  expandedElement: TradeHist | null;

  
  constructor(private PriceService: PriceService,private optdetail: OptionDetailsComponent) { }

  ngOnInit() {
    this.getHistory();
  }

  public getTrade(id: number): void {
    setTimeout(() => {
      console.log("**")
      this.optdetail.getTrade(id);
  }, 200);
    
  }

  getHistory(): void{
    this.PriceService.getHistory()
    .subscribe(Toets =>{
    this.Toets = Toets
    console.log(this.Toets)
    this.dataSource2 = this.Toets
    this.dataSource2 =this.dataSource2[0].Tradeinfo.trade
    this.dataSource = new MatTableDataSource(this.Toets);
    // this.dataSource = this.Toets
    console.log(this.dataSource)
    console.log(this.dataSource2)

    this.dataSource.sort = this.sort;
    });
  }

  setDatasource(i): void
  {
    this.dataSource2 = this.dataSource.data[i].Tradeinfo.trade
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }



}


