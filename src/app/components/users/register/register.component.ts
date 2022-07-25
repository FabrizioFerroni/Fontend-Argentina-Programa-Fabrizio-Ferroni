import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NuevoUsuario } from './../../../models/nuevo-usuario';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

declare var jQuery: any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  nuevoUsuario!: NuevoUsuario;
  nombre!: string;
  apellido!: string;
  nombreUsuario!: string;
  email!: string;
  password!: string;
  rpassword!: string;
  roles: string[] = []
  username!: string;
  btn_load: boolean = false;
  isLoader: boolean = true;

  isSucced: boolean = false;
  isError: boolean = false;
  isWarning: boolean = false;
  mensaje: string = "";
  mensaje_btn: string = 'Registrando nuevo usuario...';


  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private portfolioService: PortfolioService,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private titleService: Title

  ) {
    titleService.setTitle('Registrarme - Fabrizio Dev - Argentina Programa #YoProgramo')
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

    $('.modal-backdrop').removeClass('modal-backdrop');
  }

  cambiarTipo_reg() {
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
  onRegister(): void {
    if ($('#ckb1').is(':checked')) {
      $('#ckb1').prop('checked', true);
      this.roles = ['profesor'];
      console.log(this.roles);
    } else {
      $('#ckb1').prop('checked', false);
      this.roles = ['user']
    }

    this.nombre = this.nombre.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    this.apellido = this.apellido.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    this.nuevoUsuario = new NuevoUsuario(this.nombre, this.apellido, this.nombreUsuario, this.email, this.password, this.roles);
    this.btn_load = true;
    this.isSucced = false;
    this.isError = false;
    this.isWarning = false;
    if (this.password == this.rpassword) {
      this.authService.nuevo(this.nuevoUsuario).subscribe(
        (data: any) => {
          this.isSucced = true
          console.log(data);
          this.isError = false;
          this.mensaje = data.mensaje;
          this.mensaje_btn = 'Registrando nuevo usuario...';
          setTimeout(() => {
            this.router.navigate(['/iniciarsesion']);

            this.btn_load = false;
          }, 5000);
        },
        error => {
          this.isLoginFail = true;
          this.btn_load = false
          console.log(error);
          this.isError = true;
          this.isSucced = false;
          this.mensaje = error.error.mensaje;
          this.mensaje_btn = "Hubo un error al registrar el usuario"


        }
      );
    } else {
      this.isWarning = true;
      this.isSucced = false;
      this.btn_load = false
      this.isError = false;
      this.mensaje = "Las contraseñas no coinciden";
      this.mensaje_btn = "Las contraseñas no coinciden";
    }
  }

}
