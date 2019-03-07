import { Component, OnInit, Input } from '@angular/core';
import { globals } from '../../environments/globals';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  filterLabel: string;
  lists: string[] = [];
  consultantList: string[] = ['Carlos Ferreira', 'Cláudio', 'José'];
  clientsList: string[] = ['Gabriela', 'Jos'];
  count: number = 0;

  @Input('filterLabel')
  set _filterLabel(data: string) {

     this.filterLabel = data;
     if(this.filterLabel == this.global.labelsTarget[0]) {
       this.lists = this.consultantList; 
     } else if(this.filterLabel == this.global.labelsTarget[1]) {
      this.lists = this.clientsList; 
    }    

  }

  constructor(public global:globals) {

  }

  ngOnInit() {
  }

}
