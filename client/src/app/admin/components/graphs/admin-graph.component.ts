import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/dataService/get-data.service';

interface ChartData {
  data: number[],
  label: string,
  type?: string
}

@Component({
  selector: 'app-admin-graph',
  templateUrl: './admin-graph.component.html',
  styleUrls: ['./admin-graph.component.scss']
})
export class AdminGraphComponent implements OnInit {
  
  public chartOptions = {
    responsive: true,
    aspectRatio: .8,
    maintainAspectRatio: false,

    legend: {
      display: true,
      position: 'top',
      fullWidth: true,
      labels: {
          fontColor: 'rgb(35, 99, 132)'
      }
    },
    scales: {
      xAxes: [
        {
          categoryPercentage: 0.9
        }
      ],
      yAxes: [{
        id: 'left-y-axis',
        type: 'linear',
        position: 'left',
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 100
        },
        scaleLabel: {
          labelString: 'Team Strength (100 point scale)',
          display: true
        }
      }, {
        id: 'right-y-axis',
        type: 'linear',
        position: 'right',
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          labelString: '# of Developers',
          display: true
        }
      }]
    },
  };

  public chartData: any = [{data: [1], label: "name"}];
  
  private chartLabels: string[];

  private relativeCompetence(users: any[], rating: string): number {
    let count = 0;
    let total = 0;

    users.forEach(user => {
      total += user.user_skill[rating];
      count++
    });

    let result: number = ((total/4)/count) * 100;
    
    if(!result)
      return 0;

    return result;
  }

  private getQuant(users: any[]): number {
    return users.length;
  }

  constructor(private dataService: GetDataService) {
    
  }

  ngOnInit() {
    this.dataService.getAdminGraph({skill: []}).then(response => {
      console.log(response);
      this.chartLabels = response.map(skill => skill.name);
      this.chartData = [
        { data: response.map(skill => this.getQuant(skill.Users)),
          label: 'Developers',
          type: 'line',
          yAxisID: 'right-y-axis',
          fill: false,
          lineTension: 0,
          borderColor: 'rgba(66, 244, 143,0.2)',
          pointBackgroundColor: 'rgba(13, 173, 82, 0.7)',
          pointHoverBackgroundColor: 'rgba(13, 173, 82, 0.9)',
          backgroundColor: 'rgba(13, 173, 82, 0.9)',
          pointHoverBorderColor: 'rgba(13, 173, 82, 1)'
        },
        { data: response.map(skill => this.relativeCompetence(skill.Users, "self_rating")),
          label: 'Perceived Skill',
          yAxisID: 'left-y-axis'
        },
        { data: response.map(skill => this.relativeCompetence(skill.Users, "employer_rating")),
          label: 'Evaluated Skill',
          yAxisID: 'left-y-axis'
        },
        { data: response.map(skill => this.relativeCompetence(skill.Users, "interest")),
          label: 'Interest',
          yAxisID: 'left-y-axis',
          backgroundColor: 'rgba(255, 120, 100, 0.4)',
          hoverBackgroundColor: 'rgba(255, 120, 100, 0.6)'
        }
      ]

      console.log(this.chartData);
    })
  }

}
