import { PortfolioService } from 'src/app/services/portfolio.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';


declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-subscribe-modal',
  templateUrl: './subscribe-modal.component.html',
  styleUrls: ['./subscribe-modal.component.css']
})
export class SubscribeModalComponent implements OnInit {

  nombre!: any
  email!: any
  subs: any = {};
  load_btn: boolean = false;

  constructor(
    private portfolioService: PortfolioService
  ) { }

  ngOnInit(): void {
  }


  validate(email: string) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  onSubmit(subscribe: any) {

    if(subscribe.valid){
      if (this.validate(this.email)) {
        this.subs = {
          nombre: this.nombre,
          email: this.email
        }
        this.load_btn = true;
        this.portfolioService.post_sub(this.subs).subscribe(
          res => {
            iziToast.success({
              title: 'Gracias por suscribirte 😁',
              message: res.mensaje,
              position: 'topRight'
            });
            this.load_btn = false;
            this.nombre = '';
            this.email = '';
            $('#subscribe').modal('hide');
            $('.modal-backdrop').removeClass('show');
          },
          err => {
            this.load_btn = false;
            iziToast.error({
              title: 'Error',
              message: err.mensaje,
              position: 'topRight'
            });
          }
        );
      } else {
        iziToast.warning({
          title: 'ADVERTENCIA',
          position: 'topRight',
          message: 'El correo electrónico ingresado: ' + this.email + ' no es válido'
        });
      }
    }else{
      iziToast.warning({
        title: 'ADVERTENCIA',
        message: 'Debes llenar todos los campos',
        position: 'topRight',
      });
    }

  }

  resetSus(): void {
    this.nombre = '';
    this.email = '';
  }
}
