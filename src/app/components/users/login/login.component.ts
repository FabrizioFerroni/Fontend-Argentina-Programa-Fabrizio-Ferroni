import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { LoginUsuario } from './../../../models/login-usuario';
import { AuthService } from './../../../services/auth.service';
import { TokenService } from './../../../services/token.service';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

declare var jQuery: any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoader: boolean = true;
  isLogged = false;
  isLoginFail = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = []
  username: string = "";
  btn_load: boolean = false;
  isSucced: boolean = false;
  isError: boolean = false;
  mensaje!: string;
  mensaje_btn: string = 'Iniciando sesión...';

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private portfolioService: PortfolioService,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private titleService: Title
  ) {
    titleService.setTitle('Inciar sesión - Fabrizio Dev - Argentina Programa #YoProgramo')
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
    if(this.tokenService.isLogged()){
      this.isLogged = true;
      this.isLoginFail = false;
      // this.roles = this.tokenService.getIsProfesor();
      this.username = this.tokenService.getUserName();
      this.router.navigate(['/']);
    }
    $('.modal-backdrop').removeClass('modal-backdrop');
  }

  cambiarTipo(){
    let elemento :any = document.getElementById('password');
    if ($('#ckb1').is(':checked')) {
      $('#ckb1').prop('checked', true);
      elemento.type = "text";
    } else {
      $('#ckb1').prop('checked', false);
      elemento.type = "password";
    }
  }

  onLogin():void{
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.btn_load = true;
    this.isSucced = false;
    this.authService.login(this.loginUsuario).subscribe(
      (data: any) => {
        this.tokenService.setToken(data.token);
        this.isLogged = true;
        this.isLoginFail = false;
        this.mensaje = data.mensaje;
        this.isSucced = true;
        this.isError = false;
        this.mensaje_btn = 'Redireccionando...';
        setTimeout(() => {
          this.router.navigate(['/']);

          this.btn_load = false;
        }, 5000);
      },
      err => {
        // this.isLoginFail = true;
        this.btn_load = false;
        this.isError = true;
        this.mensaje = err.error.mensaje;
        this.mensaje_btn = "Hubo un error al iniciar sesion"
        this.isSucced = false;

        // setTimeout(() => {
        //   // $(".alert").alert('close')
        //   this.isError = false;

        // }, 5000);
      }
    );
  }

}
