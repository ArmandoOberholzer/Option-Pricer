import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PriceInputs, Greeks, History, TradeHist, GoalSeek, TradeSummary } from './price';
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
 

  constructor(private http: HttpClient) { }

  /** GET price from the server */
  getPrice(PI: PriceInputs): Observable<PriceInputs> {
    const requestUrl = this.priceUrl;
    const requestBody = JSON.stringify(PI);
    return this.http.put<PriceInputs>(requestUrl, requestBody);
  }

  getSolution(PI: PriceInputs): Observable<PriceInputs> {
    const requestUrl2 = this.GoalSeekUrl;
    const requestBody2 = JSON.stringify(PI);
    return this.http.put<PriceInputs>(requestUrl2, requestBody2);
  }

  getGreeks(PI: PriceInputs): Observable<Greeks> {
    const requestUrl2 = this.GreekUrl;
    const requestBody2 = JSON.stringify(PI);
    return this.http.put<Greeks>(requestUrl2, requestBody2);
  }

  getHistory(): Observable<TradeHist[]> {
    return this.http.get<TradeHist[]>(this.DatabaseUrl+"GetHistory");
  }

  getTrade(id: number): Observable<TradeSummary> {
    const requestUrl = this.DatabaseUrl+ "GetTrade" + '?id='+ id;
    return this.http.get<TradeSummary>(requestUrl);
  }

  AddTrade(Trade: TradeHist): Observable<void> {
    return this.http.post<void>(this.DatabaseUrl + "AddTrade", Trade, httpOptions);
  }

  updateTrade(Trade: TradeHist): Observable<any> {
    return this.http.put(this.DatabaseUrl, Trade, httpOptions);
  }

}

