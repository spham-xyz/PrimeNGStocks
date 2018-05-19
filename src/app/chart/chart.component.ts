import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { debounceTime, distinctUntilChanged, filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { FirestoreService } from '../shared/firestore.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  data: any;
  changedData: any;
  stockLabels: string[];
  stockData: number[];

  symbols: SelectItem[];
  selectedSymbol: string;

  intervals: SelectItem[];
  selectedInterval: string;

  @ViewChild('sym') symbolRef: ElementRef;
  @ViewChild('inr') intervalRef: ElementRef;

  constructor(private http: HttpClient, private fs: FirestoreService) { }

  ngOnInit() {
    this.intervals = [
      { label: 'One day', value: '1d' },
      { label: 'One month', value: '1m' },
      { label: 'Year-to-date', value: 'ytd' },
      { label: 'One year', value: '1y' },
      { label: 'Two years', value: '2y' },
      { label: 'Five years', value: '5y' }
    ];

    // this.symbols = [
    //   { label: 'PFE', value: 'PFE' },
    //   { label: 'GE', value: 'GE' },
    //   { label: 'GM', value: 'GM' }
    // ];

    this.fs.getStocks$(x => x.orderBy('symbol', 'asc'))
      .pipe(
        // tap(data => console.log('FireStore', ' = ', JSON.stringify(data))),           
        map(rows => {
          return rows.map(row => Object.assign({}, { label: row.symbol }, { value: row.symbol }));
        })
      )
      .subscribe(data => {
        this.symbols = data;
      })
  }

  drawChart(symbol: string, interval: string) {
    // let SYMBOL = this.selectedSymbol || this.symbolRef.nativeElement.value;
    // let INTERVAL = this.selectedInterval || this.intervalRef.nativeElement.value;
    // console.log('symbol: interval', ' = ', this.selectedSymbol + ': ' + this.selectedInterval);
    if (symbol != undefined && interval != undefined) this.getChart(symbol, interval);
  }

  getChart(symbol, interval) {
    const URL = `https://api.iextrading.com/1.0/stock/${symbol}/chart/${interval}?filter=date,close`;

    this.http.get(URL).subscribe(
      data => {
        if (data instanceof Array) {
          this.stockLabels = data.map(el => el.date);
          this.stockData = data.map(el => el.close);

          this.data = {
            labels: this.stockLabels,
            datasets: [{
              label: symbol.toUpperCase(),
              data: this.stockData
            }]
          }

        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
      }
    );

  }

}
