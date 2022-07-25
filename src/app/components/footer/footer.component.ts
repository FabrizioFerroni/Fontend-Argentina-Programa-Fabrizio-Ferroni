import { DOCUMENT } from '@angular/common';
import { TokenService } from 'src/app/services/token.service';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  is_loged:Boolean = false;
  year!: number;

  constructor(
    private tokenService: TokenService,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) {
    this.year = new Date().getFullYear();
  }

  ngOnInit(): void {
    let body = this._document.body;
    let script = this._renderer2.createElement('script');
    script.type = 'application/javascript';
    script.src = 'assets/js/script.js';
    this._renderer2.appendChild(body, script);
    if (this.tokenService.isLogged()) {
      this.is_loged = true;
    }
  }

}
