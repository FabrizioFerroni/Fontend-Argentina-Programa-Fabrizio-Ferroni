import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { Component, ElementRef, Inject, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import swal from 'sweetalert2';


declare var jQuery: any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  // Variables
  isLoader: boolean = true;
  is_loged: boolean = false;
  token!: string;
  imgSelect: any | ArrayBuffer = '../../../assets/img/no-image.jpg';
  file: any = undefined;
  load_btn: boolean = false;
  data: any = {};
  @ViewChild('myInput') myInputVariable!: ElementRef;
  @ViewChild('myInput2') myInputVariable2!: ElementRef;
  @ViewChild('myInput3') myInputVariable3!: ElementRef;
  isAdmin!: boolean;
  isProfesor!: boolean;


  // Variables ed add o edit
  about_me = false;
  hability = true;
  experience = true;
  lang_frontend: boolean = true;
  lang_backend: boolean = true;

  // experience_1 = true;
  // experience_2 = true;
  experience_lang = true;
  services = true;
  lang_java = true;
  acerca_de: any = {};
  habilidades: any = [];
  experiencia: any = [];
  lenguaje: any = [];
  frontend: any = [];
  backend: any = [];
  servicios: any = [];
  date: any;

  // Acerca de variables
  titulo_acd!: string;
  descripcion_acd!: string;
  email_acd!: string;
  acd_id!: number;
  // Edit
  titulo_acd_edit!: string;
  descripcion_acd_edit!: string;
  email_acd_edit!: string;

  // Habilidades
  titulo_hab!: string;
  descripcion_hab!: string;
  id_hab!: number;
  // Edit
  titulo_hab_edit!: string;
  descripcion_hab_edit!: string;


  // Experiencias
  titulo_exp!: string;
  descripcion_exp!: string;
  id_exp!: number;
  periodo_exp!: string;
  periodo_desde: string = '';
  periodo_hasta: string = '';
  now!: Date;
  // Edit
  titulo_exp_edit!: string;
  descripcion_exp_edit!: string;
  periodo_exp_edit!: string;
  periodo_desde_edit: string = '';
  periodo_hasta_edit: string = '';


  // Lenguajes
  id_front!: number;
  id_back!: number;
  titulo_front!: string;
  titulo_back!: string;
  icono_front!: string;
  icono_back!: string;
  porcentaje_front: number = 0;
  porcentaje_back: number = 0;
  // Edit
  titulo_front_edit!: string;
  titulo_back_edit!: string;
  icono_front_edit!: string;
  icono_back_edit!: string;
  porcentaje_front_edit: number = 0;
  porcentaje_back_edit: number = 0;


  // Services
  id_serv!: number;
  titulo_serv!: string;
  descripcion_serv!: string;
  // Edit
  titulo_serv_edit!: string;
  descripcion_serv_edit!: string;

  // Pruebas
  dias!: string;
  editado!: any;
  update!: string;

  constructor(
    private _portfolioService: PortfolioService,
    private _router: Router,
    private tokenService: TokenService,
    private authService: AuthService,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private titleService: Title
  ) {
    titleService.setTitle('Quien soy - Fabrizio Dev - Argentina Programa #YoProgramo')
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

    this.acerca_de_acd();
    this.habilidades_acd();
    this.experiencia_acd();
    this.lenguaje_acd();
    this.servicios_acd();
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
        this.imgSelect = '../../../assets/img/no-image.jpg';
        this.file = undefined;
      }
    } else {
      iziToast.error({
        title: 'ERROR',
        position: 'topRight',
        message: 'La imagen no puede superar los 4MB'
      });
      $('#input-portada').text('Seleccionar imagen');
      this.imgSelect = '../../../assets/img/no-image.jpg';
      this.file = undefined;
    }

  }

  // ACERCA DE
  acerca_de_acd() {
    this._portfolioService.get_acd_data().subscribe(
      res => {
        if (res <= 0) {
          this.about_me = false;
        }
        if (res.length > 0) {
          this.acerca_de = res[0];
          this.about_me = true;
          this.acd_id = this.acerca_de.id;
          this.get_last_acd(this.acd_id);
          this.acerca_de.descripcion = this.acerca_de.descripcion.split(". ").join(".\n\n");
        }

      },
      err => {
        console.log(err);
      }
    )
  }

  onSubmitacd(addacd: any) {
    this.titulo_acd = this.titulo_acd.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    this.data = {
      titulo: this.titulo_acd,
      descripcion: this.descripcion_acd,
      email: this.email_acd
    }
    if (addacd.valid) {
      if (this.file == undefined) {
        iziToast.error({
          title: 'ERROR',
          position: 'topRight',
          message: 'Debe subir una imagen para guardar el apartado Acerca de mi'
        });
      } else {
        this.load_btn = true;
        this._portfolioService.post_acd_data(this.data, this.file, this.token).subscribe(
          res => {
            console.log(res);
            this.about_me = true;
            $('#agr-acd').modal('hide');
            $('.modal-backdrop').removeClass('show');
            this.onResetacd();
            iziToast.success({
              title: 'ÉXITO',
              position: 'topRight',
              message: res.mensaje
            });
            this.load_btn = false;
            this.titulo_acd = '';
            this.descripcion_acd = '';
            this.email_acd = '';
            this.myInputVariable.nativeElement.value = "";
            this.acerca_de_acd();
          },
          err => {
            console.log(err);
            iziToast.error({
              title: 'ERROR',
              position: 'topRight',
              message: err.error.mensaje
            });
          }
        )
      }
    }
  }

  get_last_acd(id: number): void {
    this._portfolioService.get_acd_data_id(id, this.token).subscribe(
      res => {
        this.titulo_acd_edit = res.titulo;
        this.descripcion_acd_edit = res.descripcion;
        this.descripcion_acd_edit = this.descripcion_acd_edit.split(". ").join(".\n\n");
        this.email_acd_edit = res.email;
      },
      err => {
        console.log(err);
      }
    )
  }

  onEditacd(editacd: any) {
    this.titulo_acd_edit = this.titulo_acd_edit.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    this.data = {
      titulo: this.titulo_acd_edit,
      descripcion: this.descripcion_acd_edit,
      email: this.email_acd_edit
    }
    if (editacd.valid) {
      if (this.file == undefined) {
        iziToast.error({
          title: 'ERROR',
          position: 'topRight',
          message: 'Debe subir una imagen para guardar el apartado Acerca de mi'
        });
      } else {
        this.load_btn = true;
        this._portfolioService.update_acd_data(this.acd_id, this.data, this.file, this.token).subscribe(
          res => {
            console.log(res);
            $('#edit-acd-' + this.acd_id).modal('hide');
            $('.modal-backdrop').removeClass('show');
            this.onResetacd();
            iziToast.success({
              title: 'ÉXITO',
              position: 'topRight',
              message: res.mensaje
            });
            this.load_btn = false;
            this.titulo_acd_edit = '';
            this.descripcion_acd_edit = '';
            this.email_acd_edit = '';
            this.myInputVariable.nativeElement.value = "";
            this.acerca_de_acd();
          },
          err => {
            console.log(err);
            iziToast.error({
              title: 'ERROR',
              position: 'topRight',
              message: err.error.mensaje
            });
          }
        )
      }
    }
  }

  onDeleteacd(id: number) {
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
        this._portfolioService.delete_acd_data(id, this.token).subscribe(
          res => {
            console.log(res);
            this.about_me = false;
            swal.fire({
              title: 'Eliminado!',
              text: res.mensaje,
              icon: 'success',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#5c62ec',
              customClass: {
                confirmButton: 'outnone'
              }
            });
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

  onResetacd() {
    this.titulo_acd = '';
    this.descripcion_acd = '';
    this.email_acd = '';
    this.myInputVariable.nativeElement.value = "";
  }

  onResetacd_edit() {
    this.titulo_acd_edit = this.titulo_acd_edit;
    this.descripcion_acd_edit = this.descripcion_acd_edit;
    this.email_acd_edit = this.email_acd_edit;
    this.myInputVariable.nativeElement.value = "";
  }
  // FIN ACERCA DE

  // HABILIDADES
  habilidades_acd() {
    this._portfolioService.get_hability_data().subscribe(
      res => {
        if (res.length <= 0) {
          this.hability = false;
        }
        if (res.length > 0) {
          this.habilidades = res;
          this.hability = true;
        }
      },
      err => {
        console.log(err);
      }
    );

  }

  add_hability(addhab: any) {
    this.titulo_hab = this.titulo_hab.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    this.data = {
      titulo: this.titulo_hab,
      descripcion: this.descripcion_hab
    }
    this.load_btn = true;
    if (addhab.valid) {
      this._portfolioService.post_hability_data(this.data, this.file, this.token).subscribe(
        res => {
          console.log(res);
          $('#agr-hab').modal('hide');
          $('.modal-backdrop').removeClass('show');
          this.habilidades_acd();
          this.titulo_hab = '';
          this.descripcion_hab = '';
          this.myInputVariable2.nativeElement.value = "";
          this.onResethab();
          this.load_btn = false;
          iziToast.success({
            title: 'ÉXITO',
            position: 'topRight',
            message: res.mensaje
          });
          this.habilidades_acd();
        },
        err => {
          console.log(err);
          iziToast.error({
            title: 'ERROR',
            position: 'topRight',
            message: err.error.mensaje
          });
        }
      )
    }
  }

  get_hability(id: number) {
    this._portfolioService.get_hability_data_for_id(id, this.token).subscribe(
      res => {
        console.log(res);
        this.titulo_hab_edit = res.titulo;
        this.descripcion_hab_edit = res.descripcion;
      }
    )

  }

  onEditHability(id: number) {
    this.get_hability(id);
    $('#edit-hab-' + id).modal('show');
    this.id_hab = id;
  }

  edit_hability(edithab: any) {
    this.titulo_hab_edit = this.titulo_hab_edit.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    this.data = {
      titulo: this.titulo_hab_edit,
      descripcion: this.descripcion_hab_edit
    }
    if (edithab.valid) {
      if (this.file == undefined) {
        iziToast.warning({
          title: 'ADVERTENCIA',
          position: 'topRight',
          message: 'Debe subir una imagen para guardar el apartado Habilidad'
        });
      } else {
        this._portfolioService.put_hability_data(this.id_hab, this.data, this.file, this.token).subscribe(
          res => {
            $('#edit-hab-' + this.id_hab).modal('hide');
            $('.modal-backdrop').removeClass('show');
            this.habilidades_acd();
            this.onResethab();
            iziToast.success({
              title: 'ÉXITO',
              position: 'topRight',
              message: res.mensaje
            });
            this.habilidades_acd();
          },
          err => {
            console.log(err);
            iziToast.error({
              title: 'ERROR',
              position: 'topRight',
              message: err.error.mensaje
            });
          }
        )
      }
    } else {
      iziToast.error({
        title: 'ERROR',
        position: 'topRight',
        message: 'No llenaste los campos requeridos.'
      });
    }

  }

  onResethab() {
    this.titulo_hab = '';
    this.descripcion_hab = '';
    this.myInputVariable2.nativeElement.value = "";
  }

  onResethab_edit() {
    this.titulo_hab_edit = this.titulo_hab_edit;
    this.descripcion_hab_edit = this.descripcion_hab_edit;
    this.myInputVariable2.nativeElement.value = "";
  }

  borrar_hability(id: number) {
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
        this._portfolioService.delete_hability_data(id, this.token).subscribe(
          res => {
            console.log(res);
            // this.about_me = false;
            this.habilidades_acd();
            swal.fire({
              title: 'Eliminado!',
              text: res.mensaje,
              icon: 'success',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#5c62ec',
              customClass: {
                confirmButton: 'outnone'
              }
            });
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
  // FIN HABILIDADES

  // EXPERIENCIAS
  experiencia_acd() {
    this._portfolioService.get_experiencie_data().subscribe(
      res => {
        if (res.length <= 0) {
          this.experience = false;
        } else {
          this.experience = true;
          this.experiencia = res;
        }
      },
      err => {
        console.log(err);
      }
    )

  }

  get_experience(id: number) {
    this._portfolioService.get_experience_data_id(id, this.token).subscribe(
      res => {
        this.titulo_exp_edit = res.titulo;
        this.descripcion_exp_edit = res.descripcion;
        this.periodo_desde_edit = res.periodoDesde;
        if (res.periodoHasta != "Actualidad") {
          this.periodo_hasta_edit = res.periodoHasta;
        } else {
          $('#actual2_' + id).prop('checked', true);
          this.periodo_hasta = "Actualidad";
          this.periodo_hasta_edit = "Actualidad";
          $('#periodo_fin_' + id).prop('disabled', true);
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  actual(): void {
    // comprobar si el input fue checked
    if ($('#flexCheckDefault').is(':checked')) {
      $('#flexCheckDefault').prop('checked', true);
      $('#periodo_hasta').prop('disabled', true);
      this.periodo_hasta = "Actualidad";
    } else {
      $('#flexCheckDefault').prop('checked', false);
      $('#periodo_hasta').prop('disabled', false);
    }
  }

  actual_edit(id: number): void {
    if ($('#actual2_' + id).is(':checked')) {
      $('#actual2' + id).prop('checked', true);
      $('#periodo_fin_' + id).prop('disabled', true);
      this.periodo_hasta_edit = "Actualidad";
    } else {
      $('#actual2_' + id).prop('checked', false);
      $('#periodo_fin_' + id).prop('disabled', false);
    }
  }

  periodo(desde: any, hasta: any): void {
    var format = desde.split('-');
    var nueva = format[1] + '-01-' + format[0];
    desde = new Date(nueva);
    var now;
    const month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    desde = month[desde.getMonth()] + " De " + desde.getFullYear();
    if (hasta != "Actualidad") {
      var format2 = hasta.split('-');
      var nueva2 = format2[1] + '-01-' + format2[0];
      hasta = new Date(nueva2);
      now = new Intl.DateTimeFormat('es-AR', { month: "long", year: "numeric" }).format(now)
      now = now.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
      hasta = month[hasta.getMonth()] + " De " + hasta.getFullYear();
      if (hasta === now) {
        hasta = "Actualidad";
        this.periodo_hasta = "Actualidad";
        this.periodo_hasta_edit = "Actualidad";
      }
      this.periodo_exp = desde + " - " + hasta;
      this.periodo_exp_edit = desde + " - " + hasta;
    }
    this.periodo_exp = desde + " - " + hasta;
    this.periodo_exp_edit = desde + " - " + hasta;
  }

  add_experiencie(addexp: any) {
    this.periodo(this.periodo_desde, this.periodo_hasta);
    this.titulo_exp = this.titulo_exp.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));

    this.data = {
      titulo: this.titulo_exp,
      descripcion: this.descripcion_exp,
      periodo: this.periodo_exp,
      periodoDesde: this.periodo_desde,
      periodoHasta: this.periodo_hasta
    }

    if(addexp.valid){
      this.load_btn = true;
    this._portfolioService.post_experiencia_data(this.data, this.token).subscribe(
      res => {
        console.log(res);
        $('#agr-exp').modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.experiencia_acd();
        this.titulo_exp = '';
        this.descripcion_exp = '';
        this.periodo_desde = '';
        this.periodo_hasta = '';
        this.onResetexp();
        this.load_btn = false;
        iziToast.success({
          title: 'ÉXITO',
          position: 'topRight',
          message: res.mensaje
        });
      },
      err => {
        console.log(err);
        this.load_btn = false;
        iziToast.error({
          title: 'ERROR',
          position: 'topRight',
          message: err.error.mensaje
        });
      }

    )
    }else{
      console.log("El formulario no es valido");

    }

  }

  onEditExperience(id: number) {
    this.get_experience(id);
    $('#edit-exp-' + id).modal('show');
    this.id_exp = id;
  }

  edit_exp(editexp: any) {
    this.titulo_exp_edit = this.titulo_exp_edit.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    this.periodo(this.periodo_desde_edit, this.periodo_hasta_edit);
    this.data = {
      titulo: this.titulo_exp_edit,
      descripcion: this.descripcion_exp_edit,
      periodo: this.periodo_exp_edit,
      periodoDesde: this.periodo_desde_edit,
      periodoHasta: this.periodo_hasta_edit
    }
    console.log(this.data);
    if (editexp.valid) {
      this.load_btn = true;
      this._portfolioService.put_experiencia_data(this.id_exp, this.data, this.token).subscribe(
        res => {
          console.log(res);
          $('#edit-exp-' + this.id_exp).modal('hide');
          $('.modal-backdrop').removeClass('show');
          this.experiencia_acd();
          this.titulo_exp_edit = '';
          this.descripcion_exp_edit = '';
          this.periodo_desde_edit = '';
          this.periodo_hasta_edit = '';
          this.onResetexp();
          this.load_btn = false;
          iziToast.success({
            title: 'ÉXITO',
            position: 'topRight',
            message: res.mensaje
          });
        },
        err => {
          console.log(err);
          this.load_btn = false;
          iziToast.error({
            title: 'ERROR',
            position: 'topRight',
            message: err.error.mensaje
          });
        }
      )
    } else {
      iziToast.error({
        title: 'ERROR',
        position: 'topRight',
        message: 'Complete todos los campos'
      });
    }

  }


  borrar_experience(id: number): void {
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
        this._portfolioService.delete_experiencia_data(id, this.token).subscribe(
          res => {
            this.experiencia_acd();
            swal.fire({
              title: 'Eliminado!',
              text: res.mensaje,
              icon: 'success',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#5c62ec',
              customClass: {
                confirmButton: 'outnone'
              }
            });
          },
          err => {
            console.log(err);
            swal.fire({
              title: 'Hubo un error!',
              text: err.error.error,
              // text: err.error.mensaje,
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

  onResetexp() {
    this.titulo_exp = '';
    this.descripcion_exp = '';
    this.periodo_desde = '';
    this.periodo_hasta = '';
    $('#flexCheckDefault').prop('checked', false);
    $('#periodo_hasta').prop('disabled', false);
  }

  onResetexp_edit(id: number) {
    this.titulo_exp_edit = this.titulo_exp_edit;
    this.descripcion_exp_edit = this.descripcion_exp_edit;
    this.periodo_desde_edit = this.periodo_desde_edit;
    this.periodo_hasta_edit = this.periodo_hasta_edit;
    $('#actual2_' + id).prop('checked', false);
    $('#periodo_fin_' + id).prop('disabled', false);

  }
  // FIN EXPERIENCIAS


  // INICIO LENGUAJE
  lenguaje_acd() {
    this._portfolioService.get_frontend_data().subscribe(
      res => {
        if (res.length > 0) {
          this.frontend = res;
          this.lang_frontend = true;
        } else {
          this.lang_frontend = false;
        }
      },
      err => {
        console.log(err);
      }
    )

    this._portfolioService.get_backend_data().subscribe(
      res => {
        if (res.length > 0) {
          this.backend = res;
          this.lang_backend = true;
        } else {
          this.lang_backend = false;
        }
      },
      err => {
        console.log(err);
      }

    )
  }

  get_frontend(id: number) {
    this._portfolioService.get_frontend_data_id(id, this.token).subscribe(
      res => {
        this.titulo_front_edit = res.nombre;
        this.icono_front_edit = res.classicon;
        this.porcentaje_front_edit = res.porcentaje;
        $('#rangeval1-' + id).html(res.porcentaje);
      },
      err => {
        console.log(err);
      }
    )
  }

  get_backend(id: number) {
    this._portfolioService.get_backend_data_id(id, this.token).subscribe(
      res => {
        this.titulo_back_edit = res.nombre;
        this.icono_back_edit = res.classicon;
        this.porcentaje_back_edit = res.porcentaje;
        $('#rangeval2-' + id).html(res.porcentaje);
      },
      err => {
        console.log(err);
      }
    )
  }

  add_frontend(addfront: any) {
    this.titulo_front = this.titulo_front.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    this.data = {
      nombre: this.titulo_front,
      classicon: this.icono_front,
      porcentaje: this.porcentaje_front
    }
    if (addfront.valid) {
      if (this.porcentaje_front > 0 && this.porcentaje_front <= 100) {
        this.load_btn = true;
        this._portfolioService.post_frontend_data(this.data, this.token).subscribe(
          res => {
            $('#agr-front').modal('hide');
            $('.modal-backdrop').removeClass('show');
            this.lenguaje_acd();
            this.titulo_front = '';
            this.icono_front = '';
            this.porcentaje_front = 0;
            $('#rangeval').html(0);
            this.onResetfront();
            this.load_btn = false;
            iziToast.success({
              title: 'ÉXITO',
              position: 'topRight',
              message: res.mensaje
            });
          },
          err => {
            console.log(err);
            this.load_btn = false;
            iziToast.error({
              title: 'ERROR',
              position: 'topRight',
              message: err.error.mensaje
            });
          }
        )
      } else {
        iziToast.warning({
          title: 'ADVERTENCIA',
          position: 'topRight',
          message: 'El porcentaje debe ser mayor que 0 y menor que 100'
        });
      }

    }

  }

  add_backend(addback: any) {
    this.titulo_back = this.titulo_back.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    this.data = {
      nombre: this.titulo_back,
      classicon: this.icono_back,
      porcentaje: this.porcentaje_back
    }

    if (addback.valid) {
      if (this.porcentaje_back > 0 && this.porcentaje_back <= 100) {
        this.load_btn = true;
        this._portfolioService.post_backend_data(this.data, this.token).subscribe(
          res => {
            $('#agr-back').modal('hide');
            $('.modal-backdrop').removeClass('show');
            this.lenguaje_acd();
            this.titulo_back = '';
            this.icono_back = '';
            this.porcentaje_back = 0;
            $('#rangevalback').html(0);
            this.onResetback();
            this.load_btn = false;
            iziToast.success({
              title: 'ÉXITO',
              position: 'topRight',
              message: res.mensaje
            });
          },
          err => {
            console.log(err);
            this.load_btn = false;
            iziToast.error({
              title: 'ERROR',
              position: 'topRight',
              message: err.error.mensaje
            });
          }
        )
      } else {
        iziToast.warning({
          title: 'ADVERTENCIA',
          position: 'topRight',
          message: 'El porcentaje debe ser mayor que 0 y menor que 100'
        });
      }
    }

  }

  onEditFrontend(id: number) {
    this.get_frontend(id);
    this.id_front = id;
    $('#edit-front-' + id).modal('show');
    $('.modal-backdrop').addClass('show');
    $('#rangeval1-' + id).html(this.porcentaje_front_edit);
  }

  onEditBackend(id: number) {
    this.get_backend(id);
    this.id_back = id;
    $('#edit-back-' + id).modal('show');
    $('.modal-backdrop').addClass('show');
    $('#rangevalback-' + id).html(this.porcentaje_back_edit);
  }

  edit_front(editfront: any) {
    this.data = {
      nombre: this.titulo_front_edit,
      classicon: this.icono_front_edit,
      porcentaje: this.porcentaje_front_edit
    }
    console.log(this.data);

    if (editfront.valid) {
      if (this.porcentaje_front_edit > 0 && this.porcentaje_front_edit <= 100) {
        this.load_btn = true;
        this._portfolioService.put_frontend_data(this.id_front, this.data, this.token).subscribe(
          res => {
            $('#edit-front-' + this.id_front).modal('hide');
            $('.modal-backdrop').removeClass('show');
            this.lenguaje_acd();
            this.titulo_front_edit = this.titulo_front_edit;
            this.icono_front_edit = this.icono_front_edit;
            this.porcentaje_front_edit = this.porcentaje_front_edit;
            $('#rangeval1-' + this.id_front).html(this.porcentaje_front_edit);
            this.onResetfront_edit(this.id_front);
            this.load_btn = false;
            iziToast.success({
              title: 'ÉXITO',
              position: 'topRight',
              message: res.mensaje
            });
          },
          err => {
            console.log(err);
            this.load_btn = false;
            iziToast.error({
              title: 'ERROR',
              position: 'topRight',
              message: err.error.mensaje
            });
          }
        )
      }

    }
  }

  edit_back(editback: any) {
    this.titulo_back_edit = this.titulo_back_edit.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    this.data = {
      nombre: this.titulo_back_edit,
      classicon: this.icono_back_edit,
      porcentaje: this.porcentaje_back_edit
    }
    console.log(this.data);

    if (editback.valid) {
      if (this.porcentaje_back_edit > 0 && this.porcentaje_back_edit <= 100) {
        this.load_btn = true;
        this._portfolioService.put_backend_data(this.id_back, this.data, this.token).subscribe(
          res => {
            $('#edit-back-' + this.id_back).modal('hide');
            $('.modal-backdrop').removeClass('show');
            this.lenguaje_acd();
            this.titulo_back_edit = this.titulo_back_edit;
            this.icono_back_edit = this.icono_back_edit;
            this.porcentaje_back_edit = this.porcentaje_back_edit;
            $('#rangevalback-' + this.id_back).html(this.porcentaje_back_edit);
            this.onResetback_edit(this.id_back);
            this.load_btn = false;
            iziToast.success({
              title: 'ÉXITO',
              position: 'topRight',
              message: res.mensaje
            });
          },
          err => {
            console.log(err);
            this.load_btn = false;
            iziToast.error({
              title: 'ERROR',
              position: 'topRight',
              message: err.error.mensaje
            });
          }
        )
      } else {
        iziToast.warning({
          title: 'ADVERTENCIA',
          position: 'topRight',
          message: 'El porcentaje debe ser mayor que 0 y menor que 100'
        });
      }
    }

  }

  borrar_frontend(id: number): void {
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
        this._portfolioService.delete_frontend_data(id, this.token).subscribe(
          res => {
            this.lenguaje_acd();
            swal.fire({
              title: 'Eliminado!',
              text: res.mensaje,
              icon: 'success',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#5c62ec',
              customClass: {
                confirmButton: 'outnone'
              }
            });
          },
          err => {
            console.log(err);
            swal.fire({
              title: 'Hubo un error!',
              text: err.error.error,
              // text: err.error.mensaje,
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

  borrar_backend(id: number): void {
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
        this._portfolioService.delete_backend_data(id, this.token).subscribe(
          res => {
            this.lenguaje_acd();
            swal.fire({
              title: 'Eliminado!',
              text: res.mensaje,
              icon: 'success',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#5c62ec',
              customClass: {
                confirmButton: 'outnone'
              }
            });
          },
          err => {
            console.log(err);
            swal.fire({
              title: 'Hubo un error!',
              text: err.error.error,
              // text: err.error.mensaje,
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

  onResetfront() {
    this.titulo_front = '';
    this.icono_front = '';
    this.porcentaje_front = 0;
    $('#rangeval').html(this.porcentaje_front);

  }

  onResetback(): void {
    this.titulo_back = '';
    this.icono_back = '';
    this.porcentaje_back = 0;
    $('#rangevalback').html(this.porcentaje_back);

  }

  onResetfront_edit(id: number): void {
    this.titulo_front_edit = this.titulo_front_edit;
    this.icono_front_edit = this.icono_front_edit;
    this.porcentaje_front_edit = this.porcentaje_front_edit;
    $('#rangeval1-' + id).html(this.porcentaje_front_edit);
  }

  onResetback_edit(id: number): void {
    this.titulo_back_edit = this.titulo_back_edit;
    this.icono_back_edit = this.icono_back_edit;
    this.porcentaje_back_edit = this.porcentaje_back_edit;
    $('#rangevalback-' + id).html(this.porcentaje_back_edit);
  }

  // FIN LENGUAJE

  // SERVICIOS
  servicios_acd() {
    this._portfolioService.get_services_data().subscribe(
      res => {
        if (res.length > 0) {
          this.servicios = res;
          this.services = true;
        } else {
          this.services = false;
        }
      },
      err => {
        console.log(err);
      }
    )

  }

  get_servicio(id: number) {
    this._portfolioService.get_service_data_id(id, this.token).subscribe(
      res => {
        this.titulo_serv_edit = res.titulo;
        this.descripcion_serv_edit = res.descripcion;
        // this.imagen_serv_edit = res.imagenName;
        // this.myInputVariable3.nativeElement.value = res.imagenName;
      },
      err => {
        console.log(err);
      }
    )

  }

  add_service(addserv: any): void {
    this.titulo_serv = this.titulo_serv.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    this.data = {
      titulo: this.titulo_serv,
      descripcion: this.descripcion_serv
    }

    if (addserv.valid) {
      if (this.file == undefined) {
        iziToast.warning({
          title: 'ADVERTENCIA',
          message: 'Debes seleccionar una imagen',
          position: 'topRight',
        });
      } else {
        this.load_btn = true;
        this._portfolioService.post_services_data(this.data, this.file, this.token).subscribe(
          res => {
            this.load_btn = false;
            $('#agr-serv').modal('hide');
            $('.modal-backdrop').removeClass('show');
            // this.file = undefined;
            this.myInputVariable3.nativeElement.value = "";
            this.titulo_serv = '';
            this.descripcion_serv = '';
            this.servicios_acd();
            iziToast.success({
              title: 'ÉXITO',
              message: res.mensaje,
              position: 'topRight',
            });
          },
          err => {
            this.load_btn = false;
            console.log(err);
            iziToast.error({
              title: 'ERROR',
              message: err.error.error,
              position: 'topRight',
            });
          }
        );

      }
    } else {
      iziToast.warning({
        title: 'ADVERTENCIA',
        message: 'Debes llenar todos los campos',
        position: 'topRight',
      });
    }



  }


  onEditService(id: number): void {
    this.get_servicio(id);
    $('#edit-serv').modal('show');
    this.id_serv = id;
  }

  edit_service(editserv: any): void {
    this.titulo_serv_edit = this.titulo_serv_edit.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    this.data = {
      titulo: this.titulo_serv_edit,
      descripcion: this.descripcion_serv_edit
    }
    if (editserv.valid) {
      if (this.file == undefined) {
        iziToast.warning({
          title: 'ADVERTENCIA',
          message: 'Debes seleccionar una imagen',
          position: 'topRight',
        });
      } else {
        this.load_btn = true;
        this._portfolioService.put_services_data(this.id_serv, this.data, this.file, this.token).subscribe(
          res => {
            this.load_btn = false;
            $('#edit-serv-'+ this.id_serv).modal('hide');
            $('.modal-backdrop').removeClass('show');
            this.titulo_serv_edit = this.titulo_serv_edit
            this.descripcion_serv_edit = this.descripcion_serv_edit;
            this.servicios_acd();
            this.load_btn = false;
            this.onResetserv_edit();
            iziToast.success({
              title: 'ÉXITO',
              message: res.mensaje,
              position: 'topRight',
            });
          },
          err => {
            this.load_btn = false;
            console.log(err);
            iziToast.error({
              title: 'ERROR',
              message: err.error.error,
              position: 'topRight',
            });
          }
        );
      }
    } else {
      iziToast.warning({
        title: 'ADVERTENCIA',
        message: 'Debes llenar todos los campos',
        position: 'topRight',
      });
    }
  }


  borrar_service(id: number) {
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
        this._portfolioService.delete_service_data(id, this.token).subscribe(
          res => {
            this.servicios_acd();
            swal.fire({
              title: 'Eliminado!',
              text: res.mensaje,
              icon: 'success',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#5c62ec',
              customClass: {
                confirmButton: 'outnone'
              }
            });
          },
          err => {
            console.log(err);
            swal.fire({
              title: 'Hubo un error!',
              text: err.error.error,
              // text: err.error.mensaje,
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

  onResetserv(): void {
    this.titulo_serv = '';
    this.descripcion_serv = '';
    this.myInputVariable3.nativeElement.value = "";
  }

  onResetserv_edit(): void {
    this.titulo_serv_edit = this.titulo_serv_edit;
    this.descripcion_serv_edit = this.descripcion_serv_edit;
  }
}
