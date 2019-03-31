import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { globals } from '../../environments/globals';
import { APIService } from  '../api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() showProgressEvent = new EventEmitter<string>();

  filterLabel: string = "Consultores";
  lists: object[] = [];
  listsClient: object[] = [];
  consultantList: string[] = ['Carlos Ferreira', 'Cláudio', 'José'];
  key_list: string = "co_usuario";
  value_list: string = "no_usuario";
  listUsers: [] = [];

  public filterForm: FormGroup;

  constructor(public global:globals, private  apiService:  APIService) {
 
  }

  ngOnInit() {

    this.filterForm = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl(),
      items: new FormControl()
    }); 

    this.apiService.getConsultants().subscribe((data:  Array<object>) => {
      this.lists = data['data']; 
      this.showProgressEvent.emit('false');
   });  

  }

  selectedItems(item){
    this.listUsers = item;
  }

  private buildFilter() {

    if (this.filterForm.valid) {

      let startDate = this.filterForm.get("startDate").value;
      let endDate = this.filterForm.get("endDate").value;

      const filterValues: any = {};
      const filterPeriod: any = {};      
      const filterValuesPeriod: any = {"start_date":"", "end_date":""};

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

  public searchConsultantsByPerformance(){

      this.showProgressEvent.emit('true');

       console.log('filter: ', this.buildFilter());

      this.apiService.getConsultantsByPerformance(this.buildFilter()).subscribe((data:  Array<object>) => {
        console.log(data['data']);
        this.apiService.shareDataConsultantSubject.next(data['data']);      
        this.showProgressEvent.emit('false');
      });   

  }

  public searchConsultantsByPerformanceAndAverage(){

    this.showProgressEvent.emit('true');

    this.apiService.getConsultantsByPerformanceAndAverage(this.buildFilter()).subscribe((data:  Array<object>) => {
      this.apiService.shareDataGraphConsultantSubject.next(data);      
      this.showProgressEvent.emit('false');
    });   

 }  

 public searchConsultantsByPerformanceAndPercentage(){

  this.showProgressEvent.emit('true');

  this.apiService.getConsultantsByPerformanceAndPercentage(this.buildFilter()).subscribe((data:  Array<object>) => {
    this.apiService.shareDataGraphPercentageConsultantSubject.next(data);      
    this.showProgressEvent.emit('false');
  });   

}

}