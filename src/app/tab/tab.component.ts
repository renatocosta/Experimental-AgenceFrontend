import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent {

  showTable = false;

  showPieChart = false;

  showBarChart = false;

  public getByReport() {
    this.showTable = true;
    this.showPieChart = false;
    this.showBarChart = false;
  }

  public renderBarChart() {
    this.showBarChart = true;
    this.showTable = false;
    this.showPieChart = false;
  }

  public renderPieChart() {
    this.showPieChart = true;
    this.showBarChart = false;
    this.showTable = false;    
  }

}
