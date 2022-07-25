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

  onSubmit(subscribe: any) {
    this.load_btn = true;
    this.subs = {
      nombre: this.nombre,
      email: this.email
    }
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
        // swal.fire({
        //   title: 'Gracias 😁',
        //   text: res.mensaje,
        //   icon: 'success',
        //   showCancelButton: false,
        //   confirmButtonColor: '#5c62ec',
        //   cancelButtonColor: '#d33',
        //   confirmButtonText: 'Aceptar',
        //   cancelButtonText: 'Cancelar',
        //   customClass: {
        //     cancelButton: 'outnone',
        //     confirmButton: 'outnone',
        //   }
        // }).then((result) => {
        //   this.load_btn = false;
        //   $('#subscribe').modal('hide');
        //   $('.modal-backdrop').removeClass('show');
        // })


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

  }

  resetSus():void {
    this.nombre = '';
    this.email = '';
  }
}
