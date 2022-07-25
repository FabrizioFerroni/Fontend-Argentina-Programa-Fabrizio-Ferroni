import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { EmailService } from './../../../services/email.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { ChangePasswordDTO } from './../../../models/change-password-dto';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import swal from 'sweetalert2';
import * as moment from 'moment';

declare var jQuery: any;
declare var $: any;
declare var iziToast: any;


@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  btn_load: boolean = false;
  password!: string;
  rpassword!: string;
  dto!: ChangePasswordDTO;
  tokenPassword!: string;
  isLoader: boolean = true;
  isSucced: boolean = false;
  isError: boolean = false;
  isWarning: boolean = false;
  mensaje: string = "";
  mensaje_btn: string = 'Cambiando contraseña...';

  isLogged = false;
  isLoginFail = false;
  username!: string;


  constructor(
    private tokenService: TokenService,
    private emailService: EmailService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private portfolioService: PortfolioService,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private titleService: Title

  ) {  }

  ngOnInit(): void {
    moment.locale('es');
console.log(this.username);

    let body = this._document.body;
    let script = this._renderer2.createElement('script');
    script.type = 'application/javascript';
    script.src = 'assets/js/loginv2.js';
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

    this.activatedRoute.params.subscribe(params => {
      this.tokenPassword = params['tokenPassword'];
    }

    );

    this.emailService.getTokenPassword(this.tokenPassword).subscribe(
      res => {
        this.upd(res.creado);
        this.username = res.username
        this.titleService.setTitle('Cambiar la contraseña del usuario: ' + res.username + ' - Fabrizio Dev - Argentina Programa #YoProgramo')

      },
      err => {
        this.tokennotvalid(err.error.mensaje);
      }
    )

    if (this.tokenService.isLogged()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.username = this.tokenService.getUserName();
      this.router.navigate(['/']);
      console.log('Ya estas logueado');

    }
  }

  upd(creado: any): any {
    var now;
    now = moment();
    var duration = moment.duration(now.diff(creado)).asHours();
    console.log("Tiempo valido del token: ", duration);

    if(duration >= 24){
      this.emailService.invalidtoken(this.tokenPassword).subscribe(
        err => {
          swal.fire({
            title: err.error.text,
            text: 'Por favor vuelve a pedir un cambio de clave',
            icon: 'error',
            showCancelButton: false,
            confirmButtonColor: '#5c62ec',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            customClass: {
              cancelButton: 'outnone',
              confirmButton: 'outnone',
            }
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/']);
            }
          })
        }
      )

    }
  }

  tokennotvalid(mensaje: string): void {
    swal.fire({
      title: mensaje,
      text: "Por favor verifica el token",
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#5c62ec',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      customClass: {
        cancelButton: 'outnone',
        confirmButton: 'outnone',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/']);
      }
    })
  }

  cambiarTipo_np(): void {
    let elemento: any = document.getElementById('password');
    let elemento2: any = document.getElementById('rpassword');
    if ($('#ckb2').is(':checked')) {
      $('#ckb2').prop('checked', true);
      elemento.type = "text";
      elemento2.type = "text";
    } else {
      $('#ckb2').prop('checked', false);
      elemento.type = "password";
      elemento2.type = "password";
    }
  }

  onNewPassword(): void {
    this.dto = new ChangePasswordDTO(this.password, this.rpassword, this.tokenPassword);
    this.btn_load = true;
    this.isSucced = false;
    this.isError = false;
    this.isWarning = false;

    if (this.password === this.rpassword) {
      this.emailService.changePassword(this.dto).subscribe(
        res => {
          this.isSucced = true;
          this.isError = false;
          console.log(res);
          this.mensaje = res.mensaje;

          setTimeout(() => {
            this.router.navigate(['/iniciarsesion']);

            this.btn_load = false;
          }, 5000);

        },
        err => {
          this.isSucced = false;
          this.isError = true;
          this.isWarning = false;
          this.mensaje = err.error.mensaje;
          console.log(err);
          this.btn_load = false;
        }
      );
    } else {
      this.btn_load = false;
      this.isWarning = true;
      this.mensaje = "Las contraseñas no coinciden";
    }
  }

}
