import { Component, OnInit, ViewEncapsulation, Input, SimpleChanges } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';

@Component({
  selector: 'app-history-widget',
  templateUrl: './history-widget.component.html',
  styleUrls: ['./history-widget.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HistoryWidgetComponent implements OnInit {

  @Input() vin: any;
  @Input() title: any;
  constructor(public http: HttpClient) { }
  public data; visible = false;ititle;apikey;
  ngOnInit() {
    this.ititle=this.title;
    this.apikey=document.getElementById("mc").getAttribute('apikey');    
    this.http.get('http://marketcheck-prod.apigee.net/v1/history/'+this.vin+'?api_key=' + this.apikey).subscribe(
      res => {
        this.data = res;
        this.visible = true;
      }, err => {
        console.log(err);
      }
    )
  }
}
