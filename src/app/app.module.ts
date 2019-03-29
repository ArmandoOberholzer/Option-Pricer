import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OptionDetailsComponent } from './option-details/option-details.component';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import{MaterialModule} from './material';
import { HistoryComponent } from './history/history.component';
import { TradeLegsComponent } from './trade-legs/trade-legs.component'

@NgModule({
  declarations: [
    AppComponent,
    OptionDetailsComponent,
    HistoryComponent,
    TradeLegsComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
    
  ],
  exports:[
    TradeLegsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
