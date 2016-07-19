import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from "rxjs/Rx";

interface Query {
  body: string,
  options: RequestOptions
}

@Injectable()
export class GraphQLService {
  
  constructor(private http:Http) {
    
  }
  
  query(query:string, vars:any = {}):Observable<Response> {
    let {body, options} = GraphQLService.buildQuery(query, vars);
    return this.http.post('http://localhost:8080/graphql', body, options);
  }
  
  static buildQuery(query:string, vars:any): Query {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let body = JSON.stringify({
      query: query,
      vars: vars
    });
    let options = new RequestOptions(({headers: headers}));
    return {body, options};
  }
}