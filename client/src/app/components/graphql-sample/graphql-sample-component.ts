import {Component, Injectable} from '@angular/core';
import {Response,} from '@angular/http';
import {GraphQLService} from './service/graphql-sample-service';
let style = require('!!raw!sass!./graphql-sample.scss');

@Component({
  selector: 'home',
  template: require('./graphql-sample.html'),
  styles: [style],
  providers: [GraphQLService]
})

export class GraphQLComponent {
  
  public error:any;
  public todos:Array<string>;
  
  constructor(private graphQLService:GraphQLService) {
    this.todos = [];
    this.getTodos();
  }
  
  getTodos():void {
    this.graphQLService.query('{items}').map((res:Response) => res.json())
      .subscribe(
        (res:any) => this.todos = res.data.items,
        (error:any) => this.error = error
      );
  }
  
  addTodo(item:string):void {
    let queryStr = `mutation _ {item: addItem(item:"${item}")}`;
    this.graphQLService.query(queryStr).map((res:Response) => res.json()).subscribe((res:any) => {
      if (res.data.item === item) {
        this.getTodos();
      } else {
        this.error = 'Error adding todo';
      }
    });
  }
}
