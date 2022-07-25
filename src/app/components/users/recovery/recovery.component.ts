import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { EmailChangeDTO } from './../../../models/email-change-dto';
import { EmailService } from './../../../services/email.service';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

declare var iziToast: any;

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {
  mailTo!: string;
  dto!: EmailChangeDTO;

  isLogged = false;
  isLoginFail = false;
  username!: string;
  isLoader: boolean = true;
  mensaje!: string;
  mensaje_btn!: string;

  isError: boolean = false;
  isSucced: boolean = false;


  btn_load: boolean = false;
  constructor(
    private emailService: EmailService,
    private tokenService: TokenService,
    private router: Router,
    private portfolioService: PortfolioService,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private titleService: Title

  ) {
    titleService.setTitle('Olvide mi contraseña - Fabrizio Dev - Argentina Programa #YoProgramo')
  }

  ngOnInit(): void {
    let body = this._document.body;
    let script = this._renderer2.createElement('script');
    script.type = 'application/javascript';
    script.src = '../../../../assets/js/loginv2.js';
    this._renderer2.appendChild(body, script);

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
    if (this.tokenService.isLogged()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.username = this.tokenService.getUserName();
      this.router.navigate(['/']);
    }
  }

  onSendEmail(): void {
    this.dto = new EmailChangeDTO(this.mailTo);
    this.btn_load = true;
    this.isSucced = false;
    this.isError = false;
    this.mensaje_btn = 'Enviando Correo...'
    // this.mensaje_btn = "";
    this.mensaje = "";
    this.emailService.sendEmail(this.dto).subscribe(
      res => {
        // this.mailTo = '';
        this.isSucced = true
        this.mensaje = res.mensaje
        this.mensaje_btn = 'Enviando Correo...'
        this.btn_load = false;
      },
      err => {
        this.mensaje = err.error.mensaje;
        this.isError = true;
        this.btn_load = false;
        this.mensaje_btn = "Hubo un error..."
      }
    );
  }

}
