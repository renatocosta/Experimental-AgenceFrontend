import {Component, ViewChild} from '@angular/core';
import { globals } from '../../environments/globals';
import { FilterComponent } from '../filter/filter.component';
import { FilterClientsComponent } from '../filter/filter-clients.component';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent {

  @ViewChild(FilterComponent)
  private filter: FilterComponent;

  @ViewChild(FilterClientsComponent)
  private filterClients: FilterClientsComponent;

  showProgress: boolean;

  showTable = false;
  
  showPieChart = false;

  showBarChart = false;

  filterLabel: string;

  constructor(public global:globals) { 
  }

  ngOnInit() {
    this.filterLabel = this.global.labelsTarget[0];
  }

  selectedTabIndex: number = 0;
  selectedIndexChange(index: number) {
    setTimeout(() => this.selectedTabIndex = index);
  }
  
  tabClick(event: MouseEvent) {

    let el = event.srcElement;
    const attr = el.attributes.getNamedItem('class');
    if (attr.value.indexOf('mat-tab-label-content') >= 0) {
      console.log("attr.value: ", attr.value.indexOf('mat-tab-label'));

      el = el.parentElement;

      const tabIndex = el.id.substring(el.id.length - 1);
      this.filterLabel = this.global.labelsTarget[tabIndex];    
      
      this.showTable = false;
      this.showPieChart = false;
      this.showBarChart = false;      
    }

  }
    
  public getByReport(filterLabel: string) {
    this.showTable = true;
    this.showPieChart = false;
    this.showBarChart = false;
    if(filterLabel=="Consultores") {
    this.filter.searchConsultantsByPerformance();
    } else if(filterLabel=="Clientes") {
    //this.filterClients.sendForm();
    }
  }

  public renderBarChart(filterLabel: string) {
    this.filter.searchConsultantsByPerformanceAndAverage();
    this.showBarChart = true;
    this.showTable = false;
    this.showPieChart = false;
  }

  public renderPieChart(filterLabel: string) {
    this.showPieChart = true;
    this.showBarChart = false;
    this.showTable = false;    
  }

  public callProgress(value: any){
    this.showProgress = (value == 'true');
  }

}
