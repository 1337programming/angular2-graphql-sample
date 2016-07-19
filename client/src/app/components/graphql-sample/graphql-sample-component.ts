import {Component} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
let style = require('!!raw!sass!./graphql-sample.scss');


@Component({
  selector: 'home',
  template: require('./graphql-sample.html'),
  styles: [style],
})

export class Home {
  
  constructor(private http:Http) {
    this.query();
  }
  
  query() {
    let headers = new Headers();
    headers.append('Content-Type', 'application-json');
    let body = JSON.stringify({
      name,
      email
    });
    console.log('help');
    this.http.post('localhost:3000/query', body, {headers: headers})
      .map((res:Response) => {
        res.json();
      })
      .subscribe((res:any) => {
        console.log(res);
      })
  }
}
