import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { concatMap } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Component, OnInit, ElementRef, ViewChild, Renderer2, Inject } from '@angular/core';
import swal from 'sweetalert2';
import * as moment from 'moment';

declare var jQuery: any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  // Variables publicas
  isLoader: boolean = true;
  is_loged: boolean = true;
  projects: boolean = true;
  isAdmin: boolean = false;
  isProfesor: boolean = false;
  token!: string;
  proyectos: any = [];
  data: any = {};
  imgSelect: any | ArrayBuffer = '../../../assets/img/no-image.jpg';
  file: any = undefined;
  load_btn: boolean = false;
  @ViewChild('myInput') myInputVariable!: ElementRef;
  regxurl: string = "(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})";
  regxurl2: string = "(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})";

  // Proyectos
  id!: any;
  titulo!: string;
  descripcion!: string;
  subtitulo!: string;
  link_demo!: string;
  link_github!: string;

  titulo_edit!: string;
  descripcion_edit!: string;
  subtitulo_edit!: string;
  link_demo_edit!: string;
  link_github_edit!: string;



  constructor(
    private _portfolioService: PortfolioService,
    private tokenService: TokenService,
    private _router: Router,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private titleService: Title
  ) {
    titleService.setTitle('Mis proyectos - Fabrizio Dev - Argentina Programa #YoProgramo')
   }

  ngOnInit(): void {
    let body = this._document.body;
    let script = this._renderer2.createElement('script');
    script.type = 'application/javascript';
    script.src = 'assets/js/script.js';
    this._renderer2.appendChild(body, script);

    moment.locale('es');
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
      console.log("Es admin?: ", this.isAdmin);
      console.log("Es profesor?: ", this.isProfesor);

    }
    this.proyectos_pry();
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

  proyectos_pry() {
    this._portfolioService.get_proyectos_data().subscribe(
      res => {
        if (res.length > 0) {
          this.proyectos = res
          this.projects = true
        } else {
          this.projects = false;
        }
      },
      err => {
        console.log(err);
        this.projects = false;
      }
    )


  }


  upd(edit: any): string {
    var upd;
    upd = moment(edit, "YYYY-MM-DD hh:mm:ss").fromNow();
    console.log(upd);
    return upd;
  }

  get_proyects_by_id(id: number) {
    this._portfolioService.get_proyectos_data_id(id, this.token).subscribe(
      res => {
        console.log(res);
        this.titulo_edit = res.titulo;
        this.descripcion_edit = res.descripcion,
          this.subtitulo_edit = res.subtitulo,
          this.link_github_edit = res.link_github,
          this.link_demo_edit = res.link_demo
      }
    )
  }

  add_project(addproy: any) {
    this.titulo = this.titulo.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    var regex = new RegExp(this.regxurl);
    if (!this.link_demo.match(regex) && !this.link_github.match(regex)) {
      iziToast.error({
        title: 'ERROR',
        position: 'topRight',
        message: 'La url ingresada de Github: ' + this.link_github + ' no es correcta y la de Demo: ' + this.link_demo + ' tampoco son correctas'
      });
      console.log("Fail en link github: ", this.link_github, " y demo: ", this.link_demo);

    } else {
      if (this.link_demo.match(regex)) {
        if (this.link_github.match(regex)) {
          this.data = {
            titulo: this.titulo,
            subtitulo: this.subtitulo,
            descripcion: this.descripcion,
            link_demo: this.link_demo,
            link_github: this.link_github
          }

          if (addproy.valid) {
            if (this.file == undefined) {
              iziToast.warning({
                title: 'ADVERTENCIA',
                message: 'Debes seleccionar una imagen',
                position: 'topRight',
              });
            } else {
              this.load_btn = true;
              this._portfolioService.post_proyectos_data(this.data, this.file, this.token).subscribe(
                res => {
                  this.proyectos_pry();
                  this.titulo = '';
                  this.descripcion = '';
                  this.link_demo = '';
                  this.link_github = '';
                  this.subtitulo = '';
                  this.myInputVariable.nativeElement.value = "";
                  this.load_btn = false;
                  $('#agr-proy').modal('hide');
                  $('.modal-backdrop').removeClass('show');
                  iziToast.success({
                    title: 'ÉXITO',
                    message: res.mensaje,
                    position: 'topRight',
                  });
                },
                err => {
                  this.load_btn = false;
                  $('#agr-proy').modal('hide');
                  $('.modal-backdrop').removeClass('show');
                  console.log(err);
                  iziToast.error({
                    title: 'ERROR',
                    message: err.error.error,
                    position: 'topRight',
                  });
                }
              )
            }
          } else {
            iziToast.warning({
              title: 'ADVERTENCIA',
              message: 'Debes llenar todos los campos',
              position: 'topRight',
            });
          }
        } else {

          iziToast.error({
            title: 'ERROR',
            position: 'topRight',
            message: 'La url ingresada: ' + this.link_github + ' no es correcta'
          });
          console.log("Fail en link github: ", this.link_github);
        }

      } else {
        console.log("Fail en link demo: ", this.link_demo);
        iziToast.error({
          title: 'ERROR',
          position: 'topRight',
          message: 'La url ingresada: ' + this.link_demo + ' no es correcta'
        });
      }
    }
  }

  onEditProy(id: number): void {
    this.get_proyects_by_id(id);
    this.id = id;
    $('#edit-proy-' + id).modal('show');
    $('.modal-backdrop').addClass('show');
  }

  edit_project(editproy: any) {
    this.titulo_edit = this.titulo_edit.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    var regex2 = new RegExp(this.regxurl2);
    var lg = editproy.form.value.link_github_edit;
    var ld = editproy.form.value.link_demo_edit;
    // console.log(this.link_github_edit.match(regex2));
    // console.log(editproy.form.value);

    if (!ld.match(regex2) && !lg.match(regex2)) {
      iziToast.error({
        title: 'ERROR',
        position: 'topRight',
        message: 'La url ingresada de Github: ' + lg + ' no es correcta y la de Demo: ' + ld + ' tampoco son correctas'
      });
      console.log("Fail en link github: ", lg, " y demo: ", ld);

    } else {
      if (ld.match(regex2)) {
        if (lg.match(regex2)) {
          this.data = {
            titulo: this.titulo_edit,
            subtitulo: this.subtitulo_edit,
            descripcion: this.descripcion_edit,
            link_demo: this.link_demo_edit,
            link_github: this.link_github_edit
          }

          if (editproy.valid) {
            if (this.file == undefined) {
              iziToast.warning({
                title: 'ADVERTENCIA',
                message: 'Debes seleccionar una imagen',
                position: 'topRight',
              });
            } else {
              this.load_btn = true;
              this._portfolioService.put_proyectos_data(this.id, this.data, this.file, this.token).subscribe(
                res => {
                  this.proyectos_pry();
                  this.titulo_edit = this.titulo_edit;
                  this.descripcion_edit = this.descripcion_edit;
                  this.link_demo_edit = this.link_demo_edit;
                  this.link_github_edit = this.link_github_edit;
                  this.subtitulo_edit = this.subtitulo_edit;
                  this.myInputVariable.nativeElement.value = "";
                  this.load_btn = false;
                  $('#edit-proy-' + this.id).modal('hide');
                  $('.modal-backdrop').removeClass('show');
                  iziToast.success({
                    title: 'ÉXITO',
                    message: res.mensaje,
                    position: 'topRight',
                  });
                },
                err => {
                  this.load_btn = false;
                  $('#edit-proy-' + this.id).modal('hide');
                  $('.modal-backdrop').removeClass('show');
                  console.log(err);
                  iziToast.error({
                    title: 'ERROR',
                    message: err.error.error,
                    position: 'topRight',
                  });
                }
              )
            }
          } else {
            iziToast.warning({
              title: 'ADVERTENCIA',
              message: 'Debes llenar todos los campos',
              position: 'topRight',
            });
          }



        } else {

          iziToast.error({
            title: 'ERROR',
            position: 'topRight',
            message: 'La url ingresada: ' + lg + ' no es correcta'
          });
          console.log("Fail en link github: ", lg);
        }

      } else {
        console.log("Fail en link demo: ", ld);
        iziToast.error({
          title: 'ERROR',
          position: 'topRight',
          message: 'La url ingresada: ' + ld + ' no es correcta'
        });
      }
    }
  }

  delete_project(id: number) {
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
        this._portfolioService.delete_proyectos_id_data(id, this.token).subscribe(
          res => {
            this.proyectos_pry();
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
            swal.fire({
              title: 'Hubo un error!',
              text: err.error.error,
              icon: 'error',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#5c62ec',
              customClass: {
                confirmButton: 'outnone'
              }
            })
          }
        )

      }
    })
  }

  onResetproy(): void {
    this.titulo = '';
    this.descripcion = '';
    this.link_demo = '';
    this.link_github = '';
    this.subtitulo = '';
    this.myInputVariable.nativeElement.value = "";
  }

  onResetproy_edit(): void {
    this.titulo_edit = this.titulo_edit,
      this.descripcion_edit = this.descripcion_edit,
      this.link_demo_edit = this.link_demo_edit,
      this.link_github_edit = this.link_github_edit,
      this.subtitulo_edit = this.subtitulo_edit
  }

}
