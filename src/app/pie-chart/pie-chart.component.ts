import { Component, OnInit, Input } from '@angular/core';
import { APIService } from '../api.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  private showBar: boolean = false;

  showNoSuchResults: boolean = false;
  messageNoSuchResults: string = "Nenhum resultado encontrado!";

  public pieChartLabels = [];
  public pieChartData = [];
  public pieChartType = 'pie';

  constructor(private apiService: APIService) {

  }

  ngOnInit() {
    this.apiService.shareDataGraphPercentageConsultantSubject.subscribe(receiveddata => {
      this.showBar = receiveddata.data.length > 0;
      this.showNoSuchResults = this.showBar === false;
      if (this.showBar) {

        this.pieChartLabels = receiveddata.data.map(obj =>{ 
          return obj.user;
        });            
        this.pieChartData = receiveddata.data.map(obj => {
          return obj.percentage;
        });

      }
    });
  }

}
