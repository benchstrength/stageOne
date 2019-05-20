import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/dataService/get-data.service';

@Component({
  selector: 'app-admin-graph',
  templateUrl: './admin-graph.component.html',
  styleUrls: ['./admin-graph.component.scss']
})
export class AdminGraphComponent implements OnInit {
  
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

  constructor(private dataService: GetDataService) {
    
  }

  ngOnInit() {
    this.dataService.getAdminGraph({skill: []}).then(response => {
      console.log(response);
      this.chartLabels = response.map(skill => skill.name);
      this.chartData = [
        { data: response.map(skill => this.relativeCompetence(skill.Users, "self_rating")),
          label: 'Perceived Skill'
        },
        { data: response.map(skill => this.relativeCompetence(skill.Users, "employer_rating")),
          label: 'Evaluated Skill'
        },
        { data: response.map(skill => this.relativeCompetence(skill.Users, "interest")),
          label: 'Interest'
        }
      ]

      console.log(this.chartData);
    })
  }

  public chartOptions = {
    responsive: true,
    aspectRatio: 1.25,
    maintainAspectRatio: false,


    legend: {
      display: true,
      position: 'top',
      fullWidth: true,
      labels: {
          fontColor: 'rgb(35, 99, 132)'
      }
    },
  };
  public chartData = [
    { data: [73, 89, 71, 43, 22, 47, 45, 56, 67, 80], label: 'Percieved Skill' },
    { data: [32, 21, 53, 63, 62, 34, 24, 35, 73, 100], label: 'Actual Skill' },
    { data: [71, 43, 22, 34, 45, 17, 67, 78, 89, 10], label: 'Interest' }
  ];
}
