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
  phone: boolean = false;
  subject: boolean = false;
  is_open = true;
  tel: boolean = false;
  asu: boolean = false;
  phone_form!: string;
  subject_form!: string;
  phone_formb!: boolean;
  subject_formb!: boolean;
  data: any = {}

  nombre_campo!: string;
  load_btn_edit: boolean = false;

  // contacto
  nombre!: string;
  apellido!: string;
  email!: string;
  mensaje!: string;
  telefono!: string;
  asunto!: string
  id: number = 1;

  constructor(
    private _portfolioService: PortfolioService,
    private _router: Router,
    private titleService: Title,
    private tokenService: TokenService,
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

    this.get_camps();
  }

  validate(email: string) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  get_camps(): void {
    this._portfolioService.get_fields_contact(this.token).subscribe(
      res => {
        this.nombre_campo = res[0].nameTelsub;
        this.phone_form = res[0].op1;
        if (res[0].op1 == true) {
          this.phone = true;
          this.tel = true;
          this.phone_formb = true;
          this.phone_form = "true";
        } else {
          this.phone = false;
          this.tel = false;
          this.phone_formb = false;
          this.phone_form = "false";
        }
        this.subject_form = res[0].op2;
        if (res[0].op2 == true) {
          this.subject = true;
          this.asu = true;
          this.subject_form = "true";
          this.subject_formb = true;
        } else {
          this.subject = false;
          this.asu = false;
          this.subject_form = "false";
          this.subject_formb = false;
        }
      },
      err => {
        console.log(err);

      }
    )
  }

  send_email(sendmail: any) {
    this.nombre = this.nombre.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    this.apellido = this.apellido.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    if (sendmail.valid) {
      if (this.tel == true && this.asu == true) {
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

      if (this.tel != true && this.asu == true) {
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

      if (this.tel == true && this.asu != true) {
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

      if (this.tel != true && this.asu != true) {
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



      if (this.validate(this.email)) {
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
          position: 'topRight',
          message: 'El correo electrónico ingresado: ' + this.email + ' no es válido'
        });
      }


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
    if (this.phone_form == 'true') {
      this.phone_formb = true;
    } else {
      this.phone_formb = false;
    }

    if (this.subject_form == 'true') {
      this.subject_formb = true;
    } else {
      this.subject_formb = false;
    }

    if (editcontactForm.valid) {
      this.data = {
        nameTelsub: this.nombre_campo,
        op1: this.phone_formb,
        op2: this.subject_formb
      };

      this.load_btn_edit = true;
      this._portfolioService.put_fields_contact(this.id, this.data, this.token).subscribe(
        res => {
          $('#edit-form-contact').modal('hide');
          $('.modal-backdrop').removeClass('show');
          this.load_btn_edit = false;
          console.log(res);
          this.get_camps();
          iziToast.success({
            title: 'Correcto',
            position: 'topRight',
            message: 'Se guardaron los datos'
          });
        },
        err => {
          console.log(err);
          this.load_btn_edit = false;
        }
      )
    } else {
      iziToast.warning({
        title: 'Advertencia',
        position: 'topRight',
        message: 'Los datos del formulario no tienen que estar vacíos'
      });
    }
  }

  reset() {
    this.get_camps();
    $('#edit-form-contact').modal('hide');
    $('.modal-backdrop').removeClass('show');
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
        this.data = {
          nameTelsub: this.nombre_campo,
          op1: false,
          op2: false
        };

        this._portfolioService.put_fields_contact(this.id, this.data, this.token).subscribe(
          res => {
            console.log(res);
            this.get_camps();

            swal.fire({
              title: 'Eliminado!',
              text: 'Se borraron las modificaciones con éxito.',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#5c62ec',
              customClass: {
                confirmButton: 'outnone'
              }
            })
          },
          err => {
            console.log(err);
          }
        )


      }
    })

  }


}

