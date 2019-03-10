import { Injectable } from '@angular/core';
import { HttpClient} from  '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export  class  APIService {
  
  baseUrl = environment.baseUrl;
  
  constructor(private  httpClient:  HttpClient) {}

  getConsultants(){
    return  this.httpClient.get(`${this.baseUrl}/consultants`);
  }  

  getClients(){
    return  this.httpClient.get(`${this.baseUrl}/clients`);
  }  

}