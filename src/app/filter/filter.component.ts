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
      console.log(data['data']);
      this.lists = data['data']; 
      this.showProgressEvent.emit('false');

    });  

  }

  OnChanges(){

  }

  ngDoCheck(){

  }

  selectedItems(item){
    this.listUsers = item;
    console.log('Item: ', item);
  }

  public sendForm(){
    if (this.filterForm.valid) {
      this.showProgressEvent.emit('true');
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

      const filter = Object.assign(filterValues, filterPeriod);

      this.apiService.getConsultantsByPerformance(filter).subscribe((data:  Array<object>) => {
        console.log(data['data']);
        this.apiService.notify(data['data']);
        this.showProgressEvent.emit('false');
      });   

    }    
  }

}