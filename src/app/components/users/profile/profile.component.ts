import { DOCUMENT } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TokenService } from './../../../services/token.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Component, ElementRef, OnInit, ViewChild, Renderer2, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert2';


declare var jQuery: any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any = {};
  dcv: any = [];
  isLogged = false;
  isLoginFail = false;
  username: string = "";
  id!: number;
  @ViewChild('myInput') myInputVariable!: ElementRef;

  data: any = {};
  imgSelect: any | ArrayBuffer = 'assets/img/no-image.jpg';

  file: any = undefined;

  isAdmin: boolean = false;
  isProfesor: boolean = false;
  isLoader: boolean = true;
  load_btn: boolean = false;

  isDonwload: boolean = false;

  token!: string;

  nombre!: string;
  apellido!: string;
  email!: string;
  nombreUsuario!: string;
  password!: string;
  rpassword!: string;



  constructor(
    private portfolioService: PortfolioService,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private titleService: Title,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
  ) { }

  ngOnInit(): void {
    let body = this._document.body;
    let script = this._renderer2.createElement('script');
    script.type = 'application/javascript';
    script.src = 'assets/js/script.js';
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
      this.token = this.tokenService.getToken();
      this.user_init();

      this.isAdmin = this.tokenService.IsAdmin();
      this.isProfesor = this.tokenService.IsProfesor();
    } else {
      this.isLogged = false;
      this.router.navigate(['/iniciarsesion']);
    }

  }

  user_init(): void {
    this.authService.getUser().subscribe(
      res => {
        this.profile = res;
        this.id = res.id;
        console.log(res.id);
        this.nombre = res.nombre;
        this.apellido = res.apellido;
        this.email = res.email;
        this.nombreUsuario = res.nombreUsuario;
        this.titleService.setTitle(res.nombre + ' ' + res.apellido + ' - Fabrizio Dev - Argentina Programa #YoProgramo')


        this.download_cv(this.profile.id);
      },
      err => {
        console.log(err);
      }
    );
  }

  fileChangeEvent(event: any): void {
    var file: any;
    if (event.target.files && event.target.files[0]) {
      file = <File>event.target.files[0];


    } else {
      iziToast.error({
        title: 'ERROR',
        position: 'topRight',
        message: 'No hay un imagen de envio'
      });
    }

    if (file.size <= 4000000) {

      if (file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg') {

        const reader = new FileReader();
        reader.onload = e => this.imgSelect = reader.result;
        console.log(this.imgSelect);

        reader.readAsDataURL(file);

        $('#input-portada').text(file.name);
        this.file = file;

      } else {
        iziToast.error({
          title: 'ERROR',
          position: 'topRight',
          message: 'El archivo debe ser una imagen'
        });
        $('#input-portada').text('Seleccionar imagen');
        this.imgSelect = 'assets/img/no-image.jpg';
        this.file = undefined;
      }
    } else {
      iziToast.error({
        title: 'ERROR',
        position: 'topRight',
        message: 'La imagen no puede superar los 4MB'
      });
      $('#input-portada').text('Seleccionar imagen');
      this.imgSelect = 'assets/img/no-image.jpg';
      this.file = undefined;
    }

  }

  download_cv(id: number) {
    this.portfolioService.download_cv_user(this.profile.id, this.token).subscribe(
      response => {
        if(response.length > 0){
          this.dcv = response;
          this.isDonwload = true
        } else{
          this.isDonwload = false

        }
      },
      error => {
        console.log(error);
      }
    );
  }

  onEdit_user(edituser: any) {

    this.data = {
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      nombreUsuario: this.nombreUsuario,
      password: this.password
    }
    if (edituser.valid) {
      if (this.file == undefined) {
        iziToast.warning({
          title: 'ADVERTENCIA',
          message: 'Debes seleccionar una imagen',
          position: 'topRight',
        });
      } else {
        this.load_btn = true;
        // Ver tema contraseña si no quiero cambiar
        if (this.password == this.rpassword) {
          this.authService.edituser(this.id, this.data, this.file, this.token).subscribe(
            res => {
              this.load_btn = false;
              this.onResetedit();
              this.user_init();
              $('#edit-user-' + this.id).modal('hide');
              $('.modal-backdrop').removeClass('show');
              iziToast.success({
                title: 'ÉXITO',
                message: res.mensaje,
                position: 'topRight',
              });
            },
            err => {
              console.log(err);
              this.load_btn = false;
              iziToast.error({
                title: 'ERROR',
                message: err.error.error,
                position: 'topRight',
              });
            }
          )
        } else {
          this.load_btn = false;
          iziToast.warning({
            title: 'Advertencia',
            position: 'topRight',
            message: "Las contraseñas no coinciden"
          });
        }
      }
    }

  }

  borrar_usuario(id: number) {
    console.log("ID: ", id);
    swal.fire({
      title: '¿Estas seguro que quieres eliminar esto?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5c62ec',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borralo!',
      cancelButtonText: 'Cancelar',
      customClass: {
        cancelButton: 'outnone',
        confirmButton: 'outnone',
      }
    }).then((result) => {
      console.log(id);

      if (result.isConfirmed) {
        this.authService.delete(id, this.token).subscribe(
          res => {
            console.log(res);
            // this.about_me = false;
            swal.fire({
              title: 'Eliminado!',
              text: res.mensaje,
              icon: 'success',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#5c62ec',
              customClass: {
                confirmButton: 'outnone'
              }
            }).then((result) => {
              if (result.isConfirmed) {
                this.tokenService.logOut();
                this.router.navigate(['/']);
              }
            })


          },
          err => {
            console.log(err);
            swal.fire({
              title: 'Hubo un error!',
              text: err.error.mensaje,
              icon: 'error',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#5c62ec',
              customClass: {
                confirmButton: 'outnone'
              }
            })
          }
        );
      }
    });
  }

  onResetedit() {
    this.nombre = this.profile.nombre;
    this.apellido = this.profile.apellido;
    this.email = this.profile.email;
    this.nombreUsuario = this.profile.nombreUsuario;
    this.password = '';
    this.rpassword = '';
    this.myInputVariable.nativeElement.value = "";
    $('#flexCheckDefault').prop('checked', false);
    $('#password').prop('disabled', false);
    $('#rpassword').prop('disabled', false);
  }
}
