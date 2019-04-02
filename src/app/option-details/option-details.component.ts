import { Component, OnInit } from '@angular/core';
import { PriceService } from '../price.service';
import { PriceInputs, Greeks, History, TradeHist, GoalSeek,TradeSummary } from '../price';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { range } from 'rxjs';


@Component({
  selector: 'app-option-details',
  templateUrl: './option-details.component.html',
  styleUrls: ['./option-details.component.css']
})
export class OptionDetailsComponent implements OnInit {

  PI: PriceInputs;
  Greek: Greeks;
  Hist: History[];
  Trade: TradeHist[] = [];
  clientName: string;
  GoalSeek: GoalSeek;
  Tradeinfo: TradeSummary;
  public profileForm: FormGroup;
  items: FormArray;

  constructor(private PriceService: PriceService, private fb: FormBuilder) {

    this.PI = new PriceInputs();
    this.GoalSeek = new GoalSeek();
    this.Tradeinfo = new TradeSummary();

  }

  ngOnInit() {

      this.profileForm = this.fb.group({
      Client: [null],
      Total: [null],
      trade: this.fb.array([this.addTradeGroup()])

    });

    this.onChanges();
  }

  onChanges(): void {
    if (true) {
      this.profileForm.valueChanges.pipe(debounceTime(2000), distinctUntilChanged()).subscribe(() => this.getSolution());
    }
  }

  onSubmit() {
    console.log("Form Submitted!");
    console.warn(this.profileForm.value);
    this.profileForm.reset();
  }

  addTradeGroup() {
    return this.fb.group({
      type: [null],
      strike: [null],
      spot: [null],
      rate: [null],
      time: [null],
      vol: [null],
      divYield: [null],
      price: [null]
    });
  }

  addTrade() {
    this.TradesArray.push(this.addTradeGroup());
  }

  RemoveTrade(index) {
    this.TradesArray.removeAt(index);
    console.log("DELETED trade index:" + index)
  }

  get TradesArray() {
    return <FormArray>this.profileForm.get('trade');
  }


  getPrice(): void {
    this.PriceService.getPrice(this.PI)
      .subscribe(PI => this.PI = PI);
  }

  getSolution(): void {

    this.PriceService.getSolution(this.profileForm.value)
      .subscribe(PI => this.profileForm.patchValue(PI, {emitEvent: false}));
    console.log(this.PI);

  }

  getTrade(id: number): void {

    this.profileForm = this.fb.group({
      Client: ['yughioaks'],
      Total: [8],
      trade: this.fb.array([this.addTradeGroup()])

    });
    this.PriceService.getTrade(id)                                  
      .subscribe(                                                  
        traderequest => {
          this.Tradeinfo = traderequest              
          for (let i = 1; i < this.Tradeinfo.trade.length; i++) {
            this.addTrade()
          }
          console.log(this.Tradeinfo)
          console.log(this.profileForm.value)
          this.profileForm.patchValue(this.Tradeinfo, { emitEvent: true });
          console.log(this.profileForm.value)
        }
      );
  }
  

  getGreeks(): void {
    this.PriceService.getGreeks(this.PI)
      .subscribe(Greek => this.Greek = Greek)
  }

  BookTrade(): void {
    this.PriceService.AddTrade(this.profileForm.value)
      .subscribe(() => {
        this.Trade.push(this.profileForm.value);
      });
  }

  // add(name: string, action: string ): void {
  //   name = name.trim();
  //   if (!name) { return; }
  //   let toets = { name , action } as ToetsHist
  //   this.PriceService.AddToets(toets)
  //     .subscribe(() => {
  //       this.Toets.push(toets);
  //     });
  // }

  // Update(): void {
  //   this.PriceService.updateTrade(this.Toets);
  // }

}
