import { PortfolioService } from 'src/app/services/portfolio.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';


declare var jQuery: any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-baja-suscripcion',
  templateUrl: './baja-suscripcion.component.html',
  styleUrls: ['./baja-suscripcion.component.css']
})
export class BajaSuscripcionComponent implements OnInit {

  tokenId!: string;
  id_tok!: number;
  isLoader: boolean = true;
  isSucced: boolean = false;
  isError: boolean = false;
  error!: string;
  success!: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private portfolioService: PortfolioService
  ) { }

  ngOnInit(): void {
    this.portfolioService.get_home().subscribe(
      res => {
        console.log(res.mensaje);
        setTimeout(() => {
          this.isLoader = false;
        }, 5000);
      },
      err => {
        if (err.error.type == "error") {
          this.router.navigate(['/error']);
        }
      }
    )

    this.activatedRoute.params.subscribe(params => {
      this.tokenId = params['tokenPassword'];
      console.log(this.tokenId);
    }
    );

    this.isSucced = false;
    this.portfolioService.getidwithtoken(this.tokenId).subscribe(
      res => {
        this.portfolioService.unsuscribe(res.id).subscribe(
          res => {
            this.success = res.mensaje

            // this.router.navigate(['/']);
            this.isSucced = true;
          },
          err => {
            console.log(err);

            this.isError = true;

          }
        )
      },
      err => {
        console.log(err);
        this.error = err.error.mensaje;
        this.isError = true;
        // setTimeout(() => {
        //   this.router.navigate(['/']);

        //   }, 10000);
      }
    )
  }

  backtohome(): void{
    this.router.navigate(['/']);
  }

}
