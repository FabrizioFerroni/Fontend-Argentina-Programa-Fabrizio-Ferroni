import { DOCUMENT } from '@angular/common';
import { PortfolioService } from './../../services/portfolio.service';
import { Component, ElementRef, OnInit, ViewChild, Renderer2, Inject } from '@angular/core';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { Title } from '@angular/platform-browser';

declare var jQuery: any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {


  isLoader: boolean = true;
  is_loged = false;
  about_me = false;
  header = false;
  proyectos_cont = true;
  acerca_de: any = [];
  acdh: any = []
  proyectos: any = [];
  img: string = '../../../assets/img/header-body.jpg';
  isAdmin: boolean = false;
  isProfesor: boolean = false;
  nombre: string = "";
  id!: number;
  token!: string;
  titulo!: string;



  // header
  nombre2!: string;
  apellido!: string
  titulo3!: string;
  descripcion_head!: string;
  load_btn_header: boolean = false;
  header_id!: number;
  nombre2_edit!: string;
  apellido_edit!: string;
  descripcion_head_edit!: string;


  // Acerca de mi home
  titulo2!: string;
  file: any = undefined;
  descripcion!: string;
  descripcion2!: string;
  link: string = 'quien-soy';
  load_btn: boolean = false;
  data: any = {};
  imgSelect: any | ArrayBuffer = 'assets/img/no-image.jpg';
  imgNAME!: string;
  rutaImg!: string;
  imagenUrl!: string;


  // cv
  titulo_cv!: string;
  descripcion_cv!: string;
  load_btn_cv: boolean = false;
  file_cv!: File;

  test: string = 'Hola';

  headers: any = [];
  cvs: any = [];

  cvUrl!: string;
  cvnombreDown!: string;
  @ViewChild('myInput') myInputVariable!: ElementRef;

  constructor(
    private _portfolioService: PortfolioService,
    private _router: Router,
    private tokenService: TokenService,
    private authService: AuthService,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private titleService: Title
  ) {
    titleService.setTitle('Inicio - Fabrizio Dev - Argentina Programa #YoProgramo')
  }

  ngOnInit(): void {
    let body = this._document.body;
    let script = this._renderer2.createElement('script');
    script.type = 'application/javascript';
    script.src = 'assets/js/script.js';
    this._renderer2.appendChild(body, script);
    this._portfolioService.get_home().subscribe(
      res => {
        // console.log(res);
        console.log(res.mensaje);

        setTimeout(() => {
          this.isLoader = false;
          $('#bienvenido').modal('show');
          $('.modal-backdrop').addClass('show');
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
      this.authService.getUser().subscribe(
        res => {
          this.nombre = res.nombre;
        },
        err => {
          console.log(err);
        }
      )

      }else{
        console.log('no esta logueado');

      }

    this.isAdmin = this.tokenService.IsAdmin();
    this.isProfesor = this.tokenService.IsProfesor();

    this.header_home();
    this.acerca_de_home();
    this.proyectos_home();
    this.cv_home();
  }

  dcv_home(id: number) {
    console.log(id);
    this._portfolioService.dcv_home(id, this.token).subscribe(
      res => {
        console.log(res);
        iziToast.success({
          title: 'Exito',
          position: 'topRight',
          message: res.mensaje
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  borrar_header(id: number) {
    console.log(id);
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
      if (result.isConfirmed) {
        this._portfolioService.del_header(id, this.token).subscribe(
          res => {
            this.header = false;
            swal.fire({
              title: 'Eliminado!',
              text: 'El apartado Header fue eliminado.',
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
    })
  }

  borrar_cv(id: number) {
    console.log(id);
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
      if (result.isConfirmed) {
        this._portfolioService.del_cv(id, this.token).subscribe(
          res => {

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
            this.cv_home();
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
    })
  }

  borrar_acercade(id: number) {
    console.log(id);

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
      if (result.isConfirmed) {
        this._portfolioService.del_acdh(id, this.token).subscribe(
          res => {
            this.about_me = false;
            swal.fire({
              title: 'Eliminado!',
              text: 'El apartado Acerca de mi fue eliminado.',
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
    })

  }

  header_home() {
    this._portfolioService.header().subscribe(
      res => {
        if (res.length > 0) {
          this.headers = res[0];
          this.header = true;
          this.header_id = res[0].id;
          this.get_header_id(this.header_id);
        }
      },
      err => {
        console.log(err);

      }
    );
  }

  cv_home() {
    this._portfolioService.cv().subscribe(
      res => {
        this.cvs = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  acerca_de_home() {
    this._portfolioService.acdh().subscribe(
      res => {
        if (res.length > 0) {
          this.about_me = true;
          this.acerca_de = res[0];
          this.get_acdh(this.acerca_de.id);
        }

      },
      err => {
        console.log(err);
      }
    )
  }

  proyectos_home() {
    this._portfolioService.get_proyectos_data().subscribe(
      res => {
        this.proyectos = res;
        if (res.length <= 0) {
          console.log("no hay proyectos");
          this.proyectos_cont = false;
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  onSubmit_head(head: any) {
    this.nombre2 = this.nombre2.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    this.apellido = this.apellido.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    this.descripcion_head = this.descripcion_head.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    this.data = {
      nombre: this.nombre2,
      apellido: this.apellido,
      descripcion: this.descripcion_head
    }

    if (head.valid) {
      if (this.file == undefined) {
        iziToast.error({
          title: 'ERROR',
          position: 'topRight',
          message: 'Debe subir una imagen para guardar el apartado Acerca de mi'
        });
      } else {
        this.load_btn_header = true;
        this._portfolioService.post_head_data(this.data, this.file, this.token).subscribe(
          res => {
            console.log(res);
            $('#agr-head-init').modal('hide');
            $('.modal-backdrop').removeClass('show');
            this.header_home();
            this.onResethead();
            iziToast.success({
              title: 'Éxito',
              position: 'topRight',
              message: res.mensaje
            });
            this.load_btn_header = false;
            this.nombre2 = '';
            this.apellido = '';
            this.descripcion_head = '';
            this.myInputVariable.nativeElement.value = "";
          },
          err => {
            console.log(err);
            this.load_btn_header = false;
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

  get_header_id(id: number) {
    this._portfolioService.get_header_id(id, this.token).subscribe(
      res => {
        this.nombre2_edit = res.nombre;
        this.apellido_edit = res.apellido;
        this.descripcion_head_edit = res.descripcion;
      },
      err => {
        console.log(err);
      }
    )
  }

  onEdit_head(head_edit: any) {
    if (head_edit.valid) {
      if (this.file == undefined) {
        iziToast.error({
          title: 'ERROR',
          position: 'topRight',
          message: 'Debe subir una imagen para guardar el apartado Header'
        });
      } else {
        this.nombre2_edit = this.nombre2_edit.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        this.apellido_edit = this.apellido_edit.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        this.descripcion_head_edit = this.descripcion_head_edit.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        this.data = {
          nombre: this.nombre2_edit,
          apellido: this.apellido_edit,
          descripcion: this.descripcion_head_edit
        }

        this.load_btn_header = true;
        this._portfolioService.put_head_data(this.header_id, this.data, this.file, this.token).subscribe(
          res => {
            console.log(res);
            $('#edit-head-init-' + this.header_id).modal('hide');
            $('.modal-backdrop').removeClass('show');
            this.header_home();
            this.onResethead_edit();
            iziToast.success({
              title: 'Éxito',
              position: 'topRight',
              message: res.mensaje
            });
            this.load_btn_header = false;
            // this.nombre2_edit = '';
            // this.apellido_edit = '';
            // this.descripcion_head_edit = '';
            // this.myInputVariable.nativeElement.value = "";
          },
          err => {
            console.log(err);
            this.load_btn_header = false;
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

  onSubmit_acdh(addacdh: any) {
    if (addacdh.valid) {
      if (this.file == undefined) {
        iziToast.error({
          title: 'ERROR',
          position: 'topRight',
          message: 'Debe subir una imagen para guardar el apartado Acerca de mi'
        });
      } else {
        this.data = {
          titulo: this.titulo2,
          descripcion: this.descripcion,
          descripcion2: this.descripcion2,
          link: this.link,
        };
        this.load_btn = true;
        this._portfolioService.post_acdh_data(this.data, this.file, this.token).subscribe(
          res => {
            this.load_btn = false;
            $('#agr-acd-init').modal('hide');
            $('.modal-backdrop').removeClass('show');
            this.acerca_de_home();

            iziToast.success({
              title: 'Exito',
              message: res.mensaje,
              position: 'topRight'
            });
            addacdh.resetForm();
            this.myInputVariable.nativeElement.value = "";


          },
          err => {
            iziToast.error({
              title: 'Error',
              message: err.error.message,
              position: 'topRight'
            });
          }
        );
      }
    }


    // fin onsubmit
  }

  get_acdh(id: number) {
    this._portfolioService.get_acdh(id, this.token).subscribe(
      res => {
        this.id = res.id;
        this.titulo2 = res.titulo;
        this.descripcion = res.descripcion;
        this.descripcion2 = res.descripcion2;
        this.link = res.link;

      },
      err => {
        console.log(err);
      }
    )
  }

  onEdit_acdh(addacdhe: any) {

    if (addacdhe.valid) {

      if (this.file == undefined) {
        iziToast.error({
          title: 'ERROR',
          position: 'topRight',
          message: 'Debe subir una imagen para guardar el apartado Acerca de mi'
        });
      } else {
        this.data = {
          titulo: this.titulo2,
          descripcion: this.descripcion,
          descripcion2: this.descripcion2,
          link: this.link,
        };

        this.load_btn = true;
        this._portfolioService.put_acdh_data(this.id, this.data, this.file, this.token).subscribe(
          res => {
            $('#edit-acd-init-' + this.id).modal('hide');
            $('.modal-backdrop').removeClass('show');
            this.load_btn = false;
            this.acerca_de_home();
            iziToast.success({
              title: 'Exito',
              message: res.mensaje,
              position: 'topRight'
            });
          },
          err => {
            this.load_btn = false;
            console.log(err);

            iziToast.error({
              title: 'Error',
              message: err.error.message,
              position: 'topRight'
            });
          }
        );

      }

    }
  }

  onSubmit_cv(cv: any) {
    this.titulo_cv = this.titulo_cv.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    this.descripcion_cv = this.descripcion_cv.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    if(cv.valid){
      if (this.file == undefined) {
        iziToast.error({
          title: 'ERROR',
          position: 'topRight',
          message: 'Debe subir una imagen para guardar el apartado Acerca de mi'
        });
      } else {
        this.data = {
          NombreCv: this.titulo_cv,
          DescripcionCv: this.descripcion_cv,
        };
        this.load_btn_cv = true;
        this._portfolioService.post_cv_data(this.data, this.file, this.token).subscribe(
          res => {
            this.load_btn_cv = false;
            $('#agr-head-init-cv').modal('hide');
            $('.modal-backdrop').removeClass('show');
            this.cv_home();
            this.titulo_cv = '';
            this.descripcion_cv = '';
            this.myInputVariable.nativeElement.value = "";
            iziToast.success({
              title: 'Exito',
              message: res.mensaje,
              position: 'topRight'
            });
            cv.resetForm();
            this.myInputVariable.nativeElement.value = "";
          },
          err => {
            this.load_btn_cv = false;
            iziToast.error({
              title: 'Error',
              message: err.error.message,
              position: 'topRight'
            });
          }
        );
      }
    }
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

  fileChangeEventPdf(event: any): void {
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

      if (file.type == 'application/pdf') {

        const reader = new FileReader();
        reader.onload = e => this.imgSelect = reader.result;
        console.log(reader);

        reader.readAsDataURL(file);

        $('#input-portada').text(file.name);
        this.file = file;

      } else {
        iziToast.error({
          title: 'ERROR',
          position: 'topRight',
          message: 'El archivo debe ser un documento pdf'
        });
        $('#input-portada').text('Seleccionar PDF');
        // this.imgSelect = 'assets/img/no-image.jpg';
        this.file = undefined;
      }
    } else {
      iziToast.error({
        title: 'ERROR',
        position: 'topRight',
        message: 'El documento no puede superar los 4MB'
      });
      $('#input-portada').text('Seleccionar imagen');
      // this.imgSelect = 'assets/img/no-image.jpg';
      this.file = undefined;
    }

  }

  onResetacdh() {
    this.titulo2 = '';
    this.descripcion = '';
    this.descripcion2 = '';
    this.link = '';
    this.myInputVariable.nativeElement.value = "";
  }

  onResethead() {
    this.nombre2 = '';
    this.apellido = '';
    this.descripcion_head = '';
    this.myInputVariable.nativeElement.value = "";
  }

  onResetcv(){
    this.titulo_cv = '';
    this.descripcion_cv = '';
    this.myInputVariable.nativeElement.value = "";
  }

  onResethead_edit() {
    this.nombre2 = this.headers.nombre;
    this.apellido = this.headers.apellido;
    this.descripcion_head = this.headers.descripcion;
    // this.myInputVariable.nativeElement.value = this.headers.imagenNAME;
  }

  onResetedit() {
    this.titulo2 = this.acerca_de.titulo;
    this.descripcion = this.acerca_de.descripcion;
    this.descripcion2 = this.acerca_de.descripcion2;
    this.link = this.acerca_de.link;
    this.myInputVariable.nativeElement.value = this.acerca_de.imagenNAME;
  }

}
