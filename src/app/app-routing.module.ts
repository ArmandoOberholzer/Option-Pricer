import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{ OptionDetailsComponent } from './option-details/option-details.component';
import {HistoryComponent} from './history/history.component';
import { TradeLegsComponent } from './trade-legs/trade-legs.component'


const routes: Routes = [
  { path: '', redirectTo: '/OptionDetails', pathMatch: 'full' },
  { path: 'history', component: HistoryComponent },
  { path: 'OptionDetails', component: OptionDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
