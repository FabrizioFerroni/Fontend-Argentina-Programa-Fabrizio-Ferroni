import { TokenService } from './../../../services/token.service';
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

  is_loged: boolean= false;

  constructor(
    private tokenService:TokenService,
  ) { }

  ngOnInit(): void {
    if (this.tokenService.isLogged()) {
      this.is_loged = true;
    }
  }

  ngAfterViewInit() {
    $('#bienvenido').modal('toggle');
    $('.modal-backdrop').addClass('show');
  }


}
