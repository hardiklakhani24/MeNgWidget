import { Component, OnInit, ViewEncapsulation, Input, SimpleChanges } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-time-on-market',
  templateUrl: './time-on-market.component.html',
  styleUrls: ['./time-on-market.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TimeOnMarketComponent implements OnInit {

  @Input() vin: any;
  @Input() title: any;
  @Input() condition: any;
  @Input() matchOn: any;
  @Input() country: any;
  @Input() zip: any;
  @Input() radius: any;
  @Input() cardom: any;
  @Input() geopoint: any;

  constructor(public http: HttpClient) { }
  public data; data2; ititle; apikey; chart = []; chart2 = []; chart3 = [];
  public localAvg; locationpoint;
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
    this.http.get('http://marketcheck-prod.apigee.net/v1/search/' + '?api_key=' + this.apikey + '&vins=' + this.vin + '&car_type=' + this.condition + '&match=' + this.matchOn + '&rows=0&stats=dom').subscribe(
      res => {
        this.data2 = res;
        var that = this;
        this.initChart("This car");
        this.localavg();
      }, err2 => {
        console.log(err2);
      }
    )
  }
  localavg() {
    this.http.get('http://marketcheck-prod.apigee.net/v1/search/' + '?api_key=' + this.apikey + this.locationpoint + '&radius=' + this.radius + '&vins=' + this.vin + '&car_type=' + this.condition + '&match=' + this.matchOn + '&rows=0&stats=dom').subscribe(
      res => {
        this.localAvg = res;
        this.initChart2('Local Average');
        this.initChart3('National Average');
      }, err2 => {
        console.log(err2);
      }
    )
  }
  initChart(dtext) {
    var that = this;
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: ['Days', 'Days'],
        datasets: [
          {
            data: [this.cardom, this.data2.stats.dom.max],
            backgroundColor: ['#337ab7', '#f1f1f1']
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        cutoutPercentage:"66"
      },
      plugins: [
        {
          beforeDraw: function (chart) {
            var width = chart.chart.width,
              height = chart.chart.height,
              ctx = chart.chart.ctx;

            ctx.restore();
            var fontSize = (height / 300).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "middle";

            var text = that.cardom + " days",
              textX = Math.round((width - ctx.measureText(text).width) / 2),
              textY = height / 2;

            var textD = dtext,
              textXD = Math.round((width - ctx.measureText(textD).width) / 2),
              textYD = height / 1.8;

            ctx.fillText(text, textX, textY);
            ctx.fillText(textD, textXD, textYD);
            ctx.save();
          }
        }
      ]
    });
  }
  initChart2(dtext) {
    var those = this;
    this.chart2 = new Chart('canvas2', {
      type: 'doughnut',
      data: {
        labels: ['Days', 'Days'],
        datasets: [
          {
            data: [this.localAvg.stats.dom.mean, this.data2.stats.dom.max],
            backgroundColor: ['#337ab7', '#f1f1f1']
          }
        ],
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        cutoutPercentage:"66"
      },
      plugins: [
        {
          beforeDraw: function (chart) {
            var width = chart.chart.width,
              height = chart.chart.height,
              ctx = chart.chart.ctx;

            ctx.restore();
            var fontSize = (height / 300).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "middle";

            var text = Math.round(those.localAvg.stats.dom.mean) + " days",
              textX = Math.round((width - ctx.measureText(text).width) / 2),
              textY = height / 2;

            var textD = dtext,
              textXD = Math.round((width - ctx.measureText(textD).width) / 2),
              textYD = height / 1.8;

            ctx.fillText(text, textX, textY);
            ctx.fillText(textD, textXD, textYD);
            ctx.save();
          }
        }
      ]
    });
  }
  initChart3(dtext) {
    var those = this;
    this.chart3 = new Chart('canvas3', {
      type: 'doughnut',
      data: {
        labels: ['Days', 'Days'],
        datasets: [
          {
            data: [this.data2.stats.dom.mean, this.data2.stats.dom.max],
            backgroundColor: ['#337ab7', '#f1f1f1']
          }
        ],
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        cutoutPercentage:"66"
      },
      plugins: [
        {
          beforeDraw: function (chart) {
            var width = chart.chart.width,
              height = chart.chart.height,
              ctx = chart.chart.ctx;

            ctx.restore();
            var fontSize = (height / 300).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "middle";

            var text = Math.round(those.data2.stats.dom.mean) + " days",
              textX = Math.round((width - ctx.measureText(text).width) / 2),
              textY = height / 2;

            var textD = dtext,
              textXD = Math.round((width - ctx.measureText(textD).width) / 2),
              textYD = height / 1.8;

            ctx.fillText(text, textX, textY);
            ctx.fillText(textD, textXD, textYD);
            ctx.save();
          }
        }
      ]
    });
  }
}
