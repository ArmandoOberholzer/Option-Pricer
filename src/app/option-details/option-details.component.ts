import { Component, OnInit } from '@angular/core';
import { PriceService } from '../price.service';
import { Legs, Greeks, TradeSummary } from '../price';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, count } from 'rxjs/operators';
import { Profile } from 'selenium-webdriver/firefox';

@Component({
  selector: 'app-option-details',
  templateUrl: './option-details.component.html',
  styleUrls: ['./option-details.component.css']
})
export class OptionDetailsComponent implements OnInit {

  Legs: Legs;
  Greek: Greeks;
  Trade: TradeSummary[] = [];
  clientName: string;
  Tradeinfo: TradeSummary;
  public profileForm: FormGroup;
  items: FormArray;

  constructor(private PriceService: PriceService, private fb: FormBuilder) {
    this.Legs = new Legs();
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
    this.profileForm.valueChanges.pipe(debounceTime(2000), distinctUntilChanged()).subscribe(() => this.getSolution());
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

  getSolution(): void {
        this.PriceService.getSolution(this.profileForm.value)
        .subscribe(Legs => this.profileForm.patchValue(Legs, { emitEvent: false }));
      console.log(this.Legs);   
  }

  getTrade(id: number): void {

    this.PriceService.getTrade(id)
      .subscribe(
        traderequest => {
          for (let i = 1; i < traderequest.trade.length; i++) {
            this.addTrade()
          }
          console.log(traderequest)
          console.log(this.profileForm.value)
          this.profileForm.patchValue(traderequest, { emitEvent: true });
          console.log(this.profileForm.value)
        }
      );
  }

  getGreeks(): void {
    this.PriceService.getGreeks(this.Legs)
      .subscribe(Greek => this.Greek = Greek)
  }

  BookTrade(): void {
    this.PriceService.AddTrade(this.profileForm.value)
      .subscribe(() => {
        this.Trade.push(this.profileForm.value);
      });
  }

}
