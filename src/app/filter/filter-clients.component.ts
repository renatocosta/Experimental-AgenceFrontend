import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { globals } from '../../environments/globals';
import { APIService } from  '../api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-filter-clients',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterClientsComponent implements OnInit {

  @Output() showProgressEvent = new EventEmitter<string>();

  filterLabel: string = "Clientes";  
  lists: object[] = [];

  public filterForm: FormGroup;
  key_list: string = "co_cliente";
  value_list: string = "no_razao";
  listUsers: [] = [];

  constructor(public global:globals, private  apiService:  APIService) {

  }

  ngOnInit() {
    this.filterForm = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl(),
      items: new FormControl()
    });
    this.apiService.getClients().subscribe((data:  Array<object>) => {
      this.lists = data['data']; 
      this.showProgressEvent.emit('false');

    });    

  }

  private buildFilter() {

    if (this.filterForm.valid) {

      let startDate = this.filterForm.get("startDate").value;
      let endDate = this.filterForm.get("endDate").value;

      const filterValues: any = {};
      const filterPeriod: any = {};      
      const filterValuesPeriod: any = {"start_date":"", "end_date":""};

      console.log("FILTER:size ", this.listUsers.length);


      if(this.listUsers.length>0) {
        filterValues.username = this.listUsers;
      }

      if(startDate) {
        startDate = moment(startDate).format('YYYY-MM-DD');
        filterValuesPeriod.start_date = startDate;
      }

      if(endDate) {
        endDate = moment(endDate).format('YYYY-MM-DD');
        filterValuesPeriod.end_date = endDate;
      } 

      filterPeriod.period = filterValuesPeriod;
      
      return Object.assign(filterValues, filterPeriod);

   }

   return {};

  }  

  selectedItems(item){
    console.log("FILTER: ", this.listUsers);
    this.listUsers = item;
  }

  public searchClientsByPerformance(){

    this.showProgressEvent.emit('true');
  
    this.apiService.getClientsByPerformance(this.buildFilter()).subscribe((data:  Array<object>) => {
      this.apiService.shareDataClientSubject.next(data['data']);      
      this.showProgressEvent.emit('false');
    });   
  
  }

  public searchClientsByPerformanceAndAverage(){

    this.showProgressEvent.emit('true');

    this.apiService.getClientsByPerformanceAndAverage(this.buildFilter()).subscribe((data:  Array<object>) => {
      this.apiService.shareDataGraphClientSubject.next(data);      
      this.showProgressEvent.emit('false');
    });   

 }  

 public searchClientsByPerformanceAndPercentage(){

  this.showProgressEvent.emit('true');

  this.apiService.getClientsByPerformanceAndPercentage(this.buildFilter()).subscribe((data:  Array<object>) => {
    this.apiService.shareDataGraphPercentageClientSubject.next(data);      
    this.showProgressEvent.emit('false');
  });   

}

}