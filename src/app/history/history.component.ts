import { Component, OnInit, ViewChild, Input, Output, OnChanges, ChangeDetectorRef } from '@angular/core';
import { PriceService } from '../price.service';
import { PriceInputs, Greeks, History, TradeHist, GoalSeek, TradeSummary } from '../price';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { OptionDetailsComponent } from '../option-details/option-details.component';
import { TradeLegsComponent } from '../trade-legs/trade-legs.component'
import { EventEmitter } from 'events';


class Woffle {
  tehData : any;
}


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
  @Input() Item = [];
  @Output() waffle = new EventEmitter()
  PI: PriceInputs;
  Greek: Greeks;
  Hist: History[];
  Toets: TradeHist[];
  Tradeinfo: TradeSummary[];
  TradeById: TradeSummary;
  dataSource;
  dataSource2 : MatTableDataSource<PriceInputs> =  new MatTableDataSource( [ 
    {'type': 'c', 'strike': 1000000 , 'spot': 100, 'rate': 6, 'time': 5, 'vol': 20, 'divYield': 1, 'price': 27.415683485942786},
    {'type': 'c', 'strike': 10000000 , 'spot': 100, 'rate': 6, 'time': 5, 'vol': 20, 'divYield': 1, 'price': 27.415683485942786}
]);

  clientName: string;
  GoalSeek: GoalSeek;
  searchKey: string;


  teachDS: any;
  user: any;

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['Tradeid', 'Client', 'action'];
  displayedColumns2: string[] = ['spot', 'strike', 'vol', 'divYield', 'time', 'price'];
  expandedElement: TradeHist | null;


  constructor(private PriceService: PriceService, public optdetail: OptionDetailsComponent, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.getHistory();
  }


  ngOnChanges() {
    console.log("OnChanges")
  }

  public getTrade(id: number): void {
    setTimeout(() => {
      console.log("**")
      this.optdetail.getTrade(id);
    }, 200);

  }

  getHistory(): void {
    this.PriceService.getHistory()
      .subscribe(Toets => {
        this.Toets = Toets
        console.log(this.Toets)
        
        this.dataSource = new MatTableDataSource(this.Toets);
        this.dataSource.sort = this.sort;

        // this.dataSource2.data = [ 
        //               {'type': 'c', 'strike': 1000000 , 'spot': 100, 'rate': 6, 'time': 5, 'vol': 20, 'divYield': 1, 'price': 27.415683485942786},
        //               {'type': 'c', 'strike': 10000000 , 'spot': 100, 'rate': 6, 'time': 5, 'vol': 20, 'divYield': 1, 'price': 27.415683485942786}
        // ]
      });
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  setDatasource(id: number) {
    //this.dataSource2.data.push( {'type': 'c', 'strike': 100000000 , 'spot': 100, 'rate': 6, 'time': 5, 'vol': 20, 'divYield': 1, 'price': 27.415683485942786});
   // console.log(this.dataSource2)
    console.log('Getting '+id)
     this.PriceService.getTrade(id)
       .subscribe(Toets => {
       console.log(Toets);

    //     this.dataSource2.length = 0;
    //     for(let i = 0; i < Toets.trade.length; i++)
    //       this.dataSource2.push(Toets.trade[i])

    //     //console.log(this.dataSource2)
    //     //this.dataSource2 = this.dataSource2[0]

    //     console.log(this.dataSource2)

    //   });
  }

}


