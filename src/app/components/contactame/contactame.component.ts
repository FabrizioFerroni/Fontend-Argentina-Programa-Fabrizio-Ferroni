import { DOCUMENT } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { isEmpty } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';

declare var jQuery: any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-contactame',
  templateUrl: './contactame.component.html',
  styleUrls: ['./contactame.component.css']
})
export class ContactameComponent implements OnInit {
  isLoader: boolean = true
  load_btn: boolean = false;
  is_loged: boolean = false;
  isAdmin!: boolean;
  isProfesor!: boolean;
  token!: string;
  phone: any;
  subject: any;
  is_open = true;
  tel: any;
  asu: any;
  phone_form: any;
  subject_form: any;
  data: any = {}

  // contacto
  nombre!: string;
  apellido!: string;
  email!: string;
  mensaje!: string;
  telefono!: string;
  asunto!: string

  constructor(
    private _portfolioService: PortfolioService,
    private _router: Router,
    private titleService: Title,
    private tokenService:TokenService,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
  ) {
    titleService.setTitle('Contactame - Fabrizio Dev - Argentina Programa #YoProgramo')
  }

  ngOnInit(): void {
    let body = this._document.body;
    let script = this._renderer2.createElement('script');
    script.type = 'application/javascript';
    script.src = 'assets/js/script.js';
    this._renderer2.appendChild(body, script);

    this._portfolioService.get_home().subscribe(
      res => {
        console.log(res.mensaje);
        setTimeout(() => {
          this.isLoader = false;
        }, 5000);
      },
      err => {
        if (err.error.type == "error") {
          this._router.navigate(['/error']);
        }
      }
    )

    if (this.tokenService.isLogged()) {
      this.is_loged = true;
      this.token = this.tokenService.getToken();
      this.isAdmin = this.tokenService.IsAdmin();
      this.isProfesor = this.tokenService.IsProfesor();
      console.log(this.isAdmin);
      console.log(this.isProfesor);
    }


    this.load_data();
    this.phone_form = '';
    this.subject_form = '';
  }

  load_data() {
    this.tel = localStorage.getItem('phone');
    this.asu = localStorage.getItem('subject');

    if (this.tel == 'Mostrar') {
      this.phone = true;
      this.phone_form = 'si';
    } else {
      this.phone = false;
      this.phone_form = 'no';
    }
    if (this.asu == 'Mostrar') {
      this.subject = true;
      this.subject_form = 'si';
    } else {
      this.subject = false;
      this.subject_form = 'no';
    }
  }


  send_email(sendmail: any) {
    this.nombre = this.nombre.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    this.apellido = this.apellido.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));

    this.tel = localStorage.getItem('phone');
    this.asu = localStorage.getItem('subject');

    if (sendmail.valid) {
      if (this.tel == 'Mostrar' && this.asu == 'Mostrar') {
        if (this.telefono == undefined || this.telefono == '' && this.asunto == undefined || this.asunto == '') {
          iziToast.warning({
            title: 'ADVERTENCIA',
            message: 'Debes llenar los campos faltantes',
            position: 'topRight',
          });

        } else {
          if (this.telefono == undefined || this.telefono == '' || this.asunto == undefined || this.asunto == '') {
            iziToast.warning({
              title: 'ADVERTENCIA',
              message: 'Debes llenar los campos faltantes',
              position: 'topRight',
            });
          } else {
            this.data = {
              nombre: this.nombre,
              apellido: this.apellido,
              email: this.email,
              subject: this.asunto,
              telefono: this.telefono,
              mensaje: this.mensaje
            }
          }

        }
      }

      if (this.tel != "Mostrar" && this.asu == "Mostrar") {
        if (this.asunto == undefined || this.asunto == '') {
          iziToast.warning({
            title: 'ADVERTENCIA',
            message: 'Debes llenar los campos faltantes',
            position: 'topRight',
          });
        } else {
          this.data = {
            nombre: this.nombre,
            apellido: this.apellido,
            email: this.email,
            subject: this.asunto,
            mensaje: this.mensaje
          }
        }

      }

      if (this.tel == "Mostrar" && this.asu != "Mostrar") {
        if (this.telefono == undefined || this.telefono == '') {
          iziToast.warning({
            title: 'ADVERTENCIA',
            message: 'Debes llenar los campos faltantes',
            position: 'topRight',
          });
        } else {
          this.data = {
            nombre: this.nombre,
            apellido: this.apellido,
            email: this.email,
            telefono: this.telefono,
            mensaje: this.mensaje
          }
        }

      }

      if (this.tel != "Mostrar" && this.asu != "Mostrar") {
        if (this.nombre == undefined || this.nombre == '' && this.apellido == undefined || this.apellido == '' && this.email == undefined || this.email == '' && this.mensaje == undefined || this.mensaje == '') {
          iziToast.warning({
            title: 'ADVERTENCIA',
            message: 'Debes llenar todos los campos faltantes',
            position: 'topRight',
          });
        } else {
          this.data = {
            nombre: this.nombre,
            apellido: this.apellido,
            email: this.email,
            mensaje: this.mensaje
          }
        }

      }

      // this.data = {
      //   nombre: this.nombre,
      //   apellido: this.apellido,
      //   email: this.email,
      //   subject: this.asunto,
      //   telefono: this.telefono,
      //   mensaje: this.mensaje
      // }

      this.load_btn = true;
      this._portfolioService.send_email(this.data).subscribe(
        res => {
          console.log(res);
          this.load_btn = false;
          this.resetForm();
          iziToast.success({
            title: 'GRACIAS 😁',
            message: res.mensaje,
            position: 'topRight',
          });

        },
        err => {
          console.log(err);
          this.load_btn = false;
          iziToast.error({
            title: 'LO SIENTO 😣',
            message: err.error.error,
            position: 'topRight',
          });

        }
      )
    } else {
      iziToast.warning({
        title: 'ADVERTENCIA',
        message: 'Debes llenar todos los campos faltantes',
        position: 'topRight',
      });
    }


  }

  resetForm(): void {
    this.nombre = '';
    this.apellido = '';
    this.email = '';
    this.telefono = '';
    this.asunto = '';
    this.mensaje = '';
  }


  editcontact(editcontactForm: any) {
    if (editcontactForm.valid) {
      if (this.phone_form == 'si') {
        this.phone = true;
        localStorage.setItem('phone', 'Mostrar');
        this.phone_form = 'si';

      } else {
        this.phone = false;
        localStorage.setItem('phone', 'No mostrar');
        this.phone_form = 'no';

      }
      if (this.subject_form == 'si') {
        this.subject = true;
        localStorage.setItem('subject', 'Mostrar');
        this.subject_form = 'si';

      } else {
        this.subject = false;
        localStorage.setItem('subject', 'No mostrar');
        this.subject_form = 'no';

      }
      $('#edit-form-contact').modal('hide');
      $('.modal-backdrop').removeClass('show');

      iziToast.success({
        title: 'Correcto',
        position: 'topRight',
        message: 'Se guardaron los datos'
      });
    } else {
      // swal.fire({
      //   title: 'Los campos no pueden estar vacíos',
      //   icon: 'warning',
      //   confirmButtonColor: '#5c62ec',
      //   confirmButtonText: 'Aceptar',
      //   customClass: {
      //     confirmButton: 'outnone',
      //   }
      // })

      iziToast.warning({
        title: 'Advertencia',
        position: 'topRight',
        message: 'Los datos del formulario no tienen que estar vacíos'
      });
    }
  }

  succes_msg() {
    iziToast.success({
      title: 'Correcto',
      position: 'topRight',
      message: 'Se guardaron los datos'
    });
  }

  reset() {
    this.subject_form = '';
    this.phone_form = '';
  }

  borrar_datos() {
    swal.fire({
      title: '¿Estas seguro que quieres limpiar el formulario?',
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
      if (result.isConfirmed) {
        localStorage.removeItem('phone');
        localStorage.removeItem('subject');
        this.subject_form = '';
        this.phone_form = '';
        swal.fire({
          title: 'Eliminado!',
          text: 'El apartado contacto fue limpiado con éxito.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#5c62ec',
          customClass: {
            confirmButton: 'outnone'
          }
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        })
      }
    })

  }


}

