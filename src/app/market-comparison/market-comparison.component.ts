import { Component, OnInit, ViewEncapsulation, Input, SimpleChanges } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-market-comparison',
  templateUrl: './market-comparison.component.html',
  styleUrls: ['./market-comparison.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MarketComparisonComponent implements OnInit {


  @Input() vin: any;
  @Input() title: any;
  @Input() condition: any;
  @Input() matchOn: any;
  @Input() country: any;
  @Input() zip: any;
  @Input() radius: any;
  @Input() cardom: any;
  @Input() geopoint: any;
  @Input() carprice: any;
  @Input() carmiles: any;
  constructor(public http: HttpClient) { }
  public data; data2; ititle; apikey; chart = []; nationalset = [];
  locationpoint; dataset = []; public nationalavg;ititleCount=0;
  ngOnInit() {
    this.ititle = this.title;
    this.apikey = document.getElementById("mc").getAttribute('apikey');
    if (!this.condition) {
      this.condition = "used";
    }
    if (!this.matchOn) {
      this.matchOn = "ymm";
    }
    if (!this.country) {
      this.country = "US";
    }
    if (!this.radius) {
      this.radius = 25;
    }
    if (this.zip) {
      this.locationpoint = '&zip=' + this.zip;
    }
    if (this.geopoint) {
      var loc = this.geopoint.split(',');
      this.locationpoint = '&latitude=' + loc[0] + '&longitude=' + loc[1];
    }

    this.http.get('http://marketcheck-prod.apigee.net/v1/search/' + '?api_key=' + this.apikey + '&vins=' + this.vin + '&car_type=' + this.condition + '&match=' + this.matchOn + '&rows=0&stats=price,miles&plot=true').subscribe(
      res => {
        this.data2 = res;
        this.ititleCount=this.data2.listings.length;
        // console.log(this.data2);
        this.manipulateChartdata();
      }, err2 => {
        console.log(err2);
      }
    )
  }
  nationalAvg() {
    this.http.get('http://marketcheck-prod.apigee.net/v1/search/' + '?api_key=' + this.apikey + '&vins=' + this.vin + '&car_type=' + this.condition + '&match=' + this.matchOn + '&stats=price,miles&rows=0').subscribe(
      res => {
        this.nationalavg = res;
        // console.log(this.nationalavg);
        this.nationalset.push({ x: this.nationalavg.stats.miles.mean, y: this.nationalavg.stats.price.mean, r: 5 })
        this.initChart();
      }, err2 => {
        console.log(err2);
      }
    )
  }
  manipulateChartdata() {
    this.nationalAvg();
    this.data2.listings.filter(dta => {
      this.dataset.push({ x: dta.miles, y: dta.price, r: 4 })
    });
  }
  initChart() {
    var that = this;
    this.chart = new Chart('marketComparison', {
      type: 'bubble',
      data: {
        datasets: [
          {
            label: 'Your Car',
            data: [{ x: this.carmiles, y: this.carprice, r: 5 }],
            backgroundColor: '#E51359',
            borderColor: '#E51359',
            hoverBackgroundColor: '#E51359',
            hoverBorderColor: '#E51359',
          },
          {
            label: 'National Average',
            data: this.nationalset,
            backgroundColor: '#13A54E',
            borderColor: '#13A54E',
            hoverBackgroundColor: '#13A54E',
            hoverBorderColor: '#13A54E',
          },
          {
            label: 'Similar Car',
            data: this.dataset,
            backgroundColor: '#337ab7',
            borderColor: '#337ab7',
            hoverBackgroundColor: '#337ab7',
            hoverBorderColor: '#337ab7',
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function (t, d) {
              return ' Price :' + t.yLabel + ', Miles:' + t.xLabel;
            }
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            gridLines: {
              display: false
            }
          }]
        }
      }
    });
  }

}
