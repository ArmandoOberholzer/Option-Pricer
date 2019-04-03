import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Legs, Greeks, TradeSummary } from './price';
import { NgForm } from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  private priceUrl = 'http://127.0.0.1:5000/';
  private GoalSeekUrl = 'http://127.0.0.1:5000/GoalSeek';
  private GreekUrl = 'http://127.0.0.1:5000/Greeks';
  private DatabaseUrl = 'http://127.0.0.1:5000/Database';
   private greeks_url='http://localhost:5000/GetGreeks';
 

  constructor(private http: HttpClient) { }

  getSolution(PI: Legs): Observable<Legs> {
    const requestUrl2 = this.GoalSeekUrl;
    const requestBody2 = JSON.stringify(PI);
    return this.http.put<Legs>(requestUrl2, requestBody2);
  }

  getGreeks(): Observable<Greeks> {
    return this.http.get<Greeks>(this.greeks_url);
  }

  getHistory(): Observable<TradeSummary[]> {
    return this.http.get<TradeSummary[]>(this.DatabaseUrl+"GetHistory");
  }

  getTrade(id: number): Observable<TradeSummary> {
    const requestUrl = this.DatabaseUrl+ "GetTrade" + '?id='+ id;
    return this.http.get<TradeSummary>(requestUrl);
  }

  getTradeLegs(id: number): Observable<Legs[]> {
    const requestUrl = this.DatabaseUrl+ "GetTradeLegs" + '?id='+ id;
    return this.http.get<Legs[]>(requestUrl);
  }

  AddTrade(Trade: TradeSummary): Observable<void> {
    return this.http.post<void>(this.DatabaseUrl + "AddTrade", Trade, httpOptions);
  }

  updateTrade(Trade: TradeSummary): Observable<any> {
    return this.http.put(this.DatabaseUrl, Trade, httpOptions);
  }

}

