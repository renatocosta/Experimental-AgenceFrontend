import { Component, OnInit, Input } from '@angular/core';
import { globals } from '../../environments/globals';
import { APIService } from  '../api.service';

export interface TransactionConsultant {
  user: string;
  net_value_invoice: string;
  fixed_cost_consultant: string;
  commisson: string;
  net_income: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  showTableStatusSimple: boolean = false;
  showTableStatusDouble: boolean = false;  
  showNoSuchResults: boolean = false;
  messageNoSuchResults: string = "Nenhum resultado encontrado!";
  displayedColumns = ['user', 'net_value_invoice', 'fixed_cost_consultant', 'commisson', 'net_income'];
  transactions: TransactionConsultant[];

  message:any;
  
  constructor(public global:globals, private  apiService:  APIService) {
  }

  ngOnInit() {
    this.apiService.shareDataConsultantSubject.subscribe(receiveddata=>{
       this.showTableStatusSimple = receiveddata.length > 0; 
       this.showNoSuchResults = this.showTableStatusSimple === false;
       this.transactions = receiveddata;
       console.log('Received: ', receiveddata);    
    });
  }

 /** Gets the total cost of all transactions. */
 getTotal() {
  //return this.transactions.map(t => parseInt(t.total)).reduce((acc, value) => acc + value, 0);
}

}
