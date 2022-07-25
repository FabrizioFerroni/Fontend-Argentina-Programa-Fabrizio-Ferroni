import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  error!: string;

  constructor(
    private portfolioService: PortfolioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.portfolioService.get_home().subscribe(
      res => {
        this.router.navigate(['/']);
        console.log(res);
      },
      err =>{
        console.log(err);

        this.error = err.name;
      }
    )
  }

}
