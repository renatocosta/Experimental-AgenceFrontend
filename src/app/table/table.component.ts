import { Component, OnInit, Input } from '@angular/core';

export interface Transaction {
  period: string;
  toyota: string;
  traffic: string;
  unicoba: string;
  webmotors: string;
  tim: string;
  total:string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  displayedColumns = ['period', 'toyota', 'traffic', 'unicoba', 'webmotors', 'tim', 'total'];
  transactions: Transaction[] = [
    {period: 'Janeiro de 2007', toyota: '1.500,00', traffic: '1.500,00', unicoba: '11.350,00', webmotors: '1.500,00', tim: '1.350,00', total: '12.800,00' },
    {period: 'Janeiro de 2007', toyota: '1.500,00', traffic: '1.500,00', unicoba: '11.350,00', webmotors: '1.500,00', tim: '1.350,00', total: '17.200,00'}
  ];

  @Input() showTableStatus: number;

  constructor() { 


  }

  ngOnInit() {

  }

 /** Gets the total cost of all transactions. */
 getTotal() {
  return this.transactions.map(t => parseInt(t.total)).reduce((acc, value) => acc + value, 0);
}

}
