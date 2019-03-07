import {Component, EventEmitter, Output} from '@angular/core';
import { globals } from '../../environments/globals';
import { FormsModule }   from '@angular/forms';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent {

  showProgress = false;

  showTable = false;

  showPieChart = false;

  showBarChart = false;

  filterLabel: string;

  constructor(public global:globals) { 
    this.filterLabel = this.global.labelsTarget[0];
  }

  ngOnInit() {
  }

  selectedTabIndex: number = 0;
  selectedIndexChange(index: number) {
    setTimeout(() => this.selectedTabIndex = index);
  }
  
  tabClick(event: MouseEvent) {

    let el = event.srcElement;
    const attr = el.attributes.getNamedItem('class');
    if (attr.value.indexOf('mat-tab-label-content') >= 0) {
      el = el.parentElement;
    }
    const tabIndex = el.id.substring(el.id.length - 1);
    this.filterLabel = this.global.labelsTarget[tabIndex];    
    
    this.showTable = false;
    this.showPieChart = false;
    this.showBarChart = false;

  }
    
  public getByReport() {
    this.showTable = true;
    this.showPieChart = false;
    this.showBarChart = false;
    this.showProgress = true;
  }

  public renderBarChart() {
    this.showBarChart = true;
    this.showTable = false;
    this.showPieChart = false;
    this.showProgress = true;    
  }

  public renderPieChart() {
    this.showPieChart = true;
    this.showBarChart = false;
    this.showTable = false;    
    this.showProgress = true;    
  }

}
