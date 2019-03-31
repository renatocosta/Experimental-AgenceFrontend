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

  selectedItems(item){
    this.listUsers = item;
  }

  public sendForm(){
    if (this.filterForm.valid) {
      this.showProgressEvent.emit('true');
      /*const payload = {"startDate": moment(this.filterForm.get("startDate").value).format('YYYY-MM-DD'),
                 "endDate": moment(this.filterForm.get("endDate").value).format('YYYY-MM-DD'),
                 "source_list": this.filterForm.get("items").value };
                 this.apiService.getPosts(payload).subscribe((data:  Array<object>) => {
                  console.log(data);
                  this.showProgressEvent.emit('false');
              });
          
      console.log("FORM::::", payload);*/

    }    
  }

}