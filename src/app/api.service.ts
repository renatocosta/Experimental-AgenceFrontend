import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
import { TransactionConsultant } from './table/table.component';
import * as Rx from "rxjs";

@Injectable({
  providedIn: 'root'
})
export  class  APIService {
  
  baseUrl = environment.baseUrl;
  
  private httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  shareDataSubject = new Subject<any>(); //Decalring new RxJs Subject

  constructor(private  httpClient:  HttpClient) {}

  notify(message: any) {
    this.shareDataSubject.next(message)
  }

  getConsultants(){
    return  this.httpClient.get(`${this.baseUrl}/consultant`);
  }  

  getConsultantsByPerformance(filter: any){

    let body = JSON.stringify(filter);
    console.log('body: ', body);
  
    return  this.httpClient.post(`${this.baseUrl}/consultant/performance`, body, this.httpOptions);
  }  

  getClients(){
    return  this.httpClient.get(`${this.baseUrl}/client`);
  }  

}