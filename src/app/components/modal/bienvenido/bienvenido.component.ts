import { EmailService } from './../../../services/email.service';
import { Component, OnInit } from '@angular/core';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit {


  constructor(
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    $('#bienvenido').modal('toggle');
    $('.modal-backdrop').addClass('show');
  }


}
