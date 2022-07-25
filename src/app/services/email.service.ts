import { ChangePasswordDTO } from './../models/change-password-dto';
import { EmailChangeDTO } from './../models/email-change-dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  url: string;
  api: string = "api/";

  constructor(
    private _http: HttpClient,
  ) {
    this.url = environment.url;
    this.url = this.url + this.api;
    console.log(this.url);
  }

  public sendEmail(dto: EmailChangeDTO): Observable<any> {
    return this._http.post(this.url + 'send-email', dto);
  }

  public getTokenPassword(token: string): Observable<any> {
    return this._http.get(this.url + 'getidwithtoken_user/' + token);
  }

  public invalidtoken(token: string): Observable<any>{
    return this._http.get(this.url + 'borrartoken/' + token);
  }

  public changePassword(dto: ChangePasswordDTO): Observable<any> {
    return this._http.post(this.url + 'change-password', dto);
  }
}
