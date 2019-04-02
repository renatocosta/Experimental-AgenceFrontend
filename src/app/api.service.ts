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

  shareDataConsultantSubject = new Subject<any>(); //Decalring new RxJs Subject

  shareDataGraphConsultantSubject = new Subject<any>(); //Decalring new RxJs Subject

  shareDataGraphPercentageConsultantSubject = new Subject<any>(); //Decalring new RxJs Subject

  shareDataClientSubject = new Subject<any>(); //Decalring new RxJs Subject

  shareDataGraphClientSubject = new Subject<any>(); //Decalring new RxJs Subject

  shareDataGraphPercentageClientSubject = new Subject<any>(); //Decalring new RxJs Subject

  constructor(private  httpClient:  HttpClient) {}

  getConsultants(){
    return  this.httpClient.get(`${this.baseUrl}/consultant`);
  }  

  getConsultantsByPerformance(filter: any){

    let payload = JSON.stringify(filter);
    console.log('payload: ', payload);
  
    return this.httpClient.post(`${this.baseUrl}/consultant/performance`, payload, this.httpOptions);
  }  

  getConsultantsByPerformanceAndAverage(filter: any){

    let payload = JSON.stringify(filter);
    console.log('payload: ', payload);
  
    return this.httpClient.post(`${this.baseUrl}/consultant/performanceandaverage`, payload, this.httpOptions);

  }  

  getConsultantsByPerformanceAndPercentage(filter: any){

    let payload = JSON.stringify(filter);
    console.log('payload: ', payload);
  
    return this.httpClient.post(`${this.baseUrl}/consultant/performanceandpercentage`, payload, this.httpOptions);

  }  

  getClients(){
    return  this.httpClient.get(`${this.baseUrl}/client`);
  }  
  
  getClientsByPerformance(filter: any){

    let payload = JSON.stringify(filter);
    console.log('payload: ', payload);
  
    return this.httpClient.post(`${this.baseUrl}/client/performance`, payload, this.httpOptions);
  }  

  getClientsByPerformanceAndAverage(filter: any){

    let payload = JSON.stringify(filter);
    console.log('payload: ', payload);
  
    return this.httpClient.post(`${this.baseUrl}/client/performanceandaverage`, payload, this.httpOptions);

  }  

  getClientsByPerformanceAndPercentage(filter: any){

    let payload = JSON.stringify(filter);
    console.log('payload: ', payload);
  
    return this.httpClient.post(`${this.baseUrl}/client/performanceandpercentage`, payload, this.httpOptions);

  }  

}