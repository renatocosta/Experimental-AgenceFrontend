import { Component, OnInit, Input } from '@angular/core';
import { APIService } from '../api.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  private showBar: boolean = false;

  showNoSuchResults: boolean = false;
  messageNoSuchResults: string = "Nenhum resultado encontrado!";

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [];

  constructor(private  apiService:  APIService) { 

  }

  ngOnInit() {
    this.apiService.shareDataGraphConsultantSubject.subscribe(receiveddata=>{
      this.showBar = receiveddata.data.length > 0; 
      this.showNoSuchResults = this.showBar === false;
      if(this.showBar) {
        
        const values = receiveddata.data.map(obj =>{ 
          return obj.net_value_invoice;
        });
        this.barChartLabels = receiveddata.data.map(obj =>{ 
          return obj.user;
        });    
        const cost_average = receiveddata.data.map(obj =>{ 
          return receiveddata.cost_average;
        });   
        if(cost_average.length>0){
          cost_average.push(cost_average[0]);
          //cost_average.push(cost_average[0]);
        }

        this.barChartData = [
          {data: values, 
            label: 'Desempenho do consultor'
          },
          {
            type: 'line',
            label: 'Custo Fixo Médio',
            fill: false,
            data: cost_average
          }  
        ];        
        
        console.log('Received: ', values);    
      }
   });    

   //Clients
   this.apiService.shareDataGraphClientSubject.subscribe(receiveddata=>{
    this.showBar = receiveddata.data.length > 0; 
    this.showNoSuchResults = this.showBar === false;
    if(this.showBar) {
      
      const values = receiveddata.data.map(obj =>{ 
        return obj.net_income;
      });
      this.barChartLabels = receiveddata.data.map(obj =>{ 
        return obj.user;
      });    

      this.barChartData = [
        {data: values, 
          label: 'Desempenho do cliente'
        }
      ];        
      
      console.log('Received: ', values);    
    }
 });   
  }

}
