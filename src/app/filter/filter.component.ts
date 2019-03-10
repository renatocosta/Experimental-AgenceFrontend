import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
      console.log(data);
      this.lists = data; 
      this.showProgressEvent.emit('false');

    });    
  }

  OnChanges(){

  }

  ngDoCheck(){

  }

  public sendForm(){
    if (this.filterForm.valid) {
      this.showProgressEvent.emit('true');
     /* const payload = {"startDate": moment(this.filterForm.get("startDate").value).format('YYYY-MM-DD'),
                 "endDate": moment(this.filterForm.get("endDate").value).format('YYYY-MM-DD'),
                 "source_list": this.filterForm.get("items").value };
                 this.apiService.getComments(payload).subscribe((data:  Array<object>) => {
                  console.log(data);
                  this.showProgressEvent.emit('false');
              });*/
    }    
  }

}