import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, Component } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { webelementer } from './elementer';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HistoryWidgetComponent } from './history-widget/history-widget.component';
import { TimeOnMarketComponent } from './time-on-market/time-on-market.component';
import { MarketComparisonComponent } from './market-comparison/market-comparison.component';

@NgModule({
  declarations: [
    AppComponent,
    HistoryWidgetComponent,
    TimeOnMarketComponent,
    MarketComparisonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  entryComponents: [
    HistoryWidgetComponent,
    TimeOnMarketComponent,
    MarketComparisonComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  public dynamoSet=[
    {eltitle:webelementer.history,elcomponent:HistoryWidgetComponent},
    {eltitle:webelementer.timeonmarket,elcomponent:TimeOnMarketComponent},
    {eltitle:webelementer.marketcomparison,elcomponent:MarketComparisonComponent}
  ];
  constructor(private injector: Injector) {  }
  ngDoBootstrap() {
    this.dynamoSet.map((res)=>{
      customElements.define(res.eltitle,createCustomElement(res.elcomponent, { injector: this.injector }))
    });
  }
}
