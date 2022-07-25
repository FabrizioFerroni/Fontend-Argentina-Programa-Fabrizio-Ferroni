import { DOCUMENT } from '@angular/common';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { TokenService } from './../../services/token.service';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public is_loged = false;
  public is_open = false;
  token: string = "";
  nombre: string = "";

  constructor(
    private _router: Router,
    private tokenService: TokenService,
    private authService: AuthService,
    private portfolioService: PortfolioService,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  ngOnInit(): void {
    let body = this._document.body;
    let script = this._renderer2.createElement('script');
    script.type = 'application/javascript';
    script.src = 'assets/js/script.js';
    this._renderer2.appendChild(body, script);

  //   this.portfolioService.get_home().subscribe(
  //     res => {
  //       console.log(res);
  //     },
  //     err => {
  //       if(err.error.type == "error"){
  //         this._router.navigate(['/error']);
  //       }
  //     }
  //  )

    this.token = this.tokenService.getToken();


    if (this.tokenService.isLogged()) {
      this.is_loged = true;
      this.authService.getUser().subscribe(
        res => {
          this.nombre = res.nombre;
        },
        err => {
          this.is_loged = false;
          this.nombre = "Usuario";
          console.log(err);
        }
      );
    }




    // $('#rrss').mouseover(function () {
    //   $("#droprrss").addClass("show");
    //   $("#droprrss").addClass("active");
    //   $("#uldrop").addClass("show2");
    // });

    // $('#rrss').mouseout(function () {
    //   $("#droprrss").removeClass("show");
    //   $("#droprrss").removeClass("active");
    //   $("#uldrop").removeClass("show2");
    // })

    $('#rrss').hover(function () {
      $("#droprrss").toggleClass("show");
      $("#uldrop").toggleClass("show2");
      $("#droprrss").toggleClass("active");
    })

    // $('#mrrss').hover(function(){

    //   $("#dmb").toggleClass("mobile-si");

    // })

    // $('#mrrss').hover(function(){
    //   $("#dmb").toggleClass("mobile-si");
    // })

    // $('#mrrss').mouseover(function () {
    //   $("#dmb").addClass("mobile-si");
    // });

    // $('#mrrss').mouseout(function () {
    //   $("#dmb").removeClass("mobile-si");
    // })
  }

  open_menu() {
    if (this.is_open == false) {
      this.is_open = true;
    } else {
      this.is_open = false;
    }
  }

  logout(): void {
    this.tokenService.logOut();
    this._router.navigate(['/']);
    window.location.reload();

  }


}
