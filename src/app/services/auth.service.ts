import { JwtDTO } from './../models/jwt-dto';
import { LoginUsuario } from './../models/login-usuario';
import { Observable } from 'rxjs';
import { NuevoUsuario } from './../models/nuevo-usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string;
  auth: string = "auth/";

  constructor(
    private _http: HttpClient,
  ) {
    this.url = environment.url;
    this.url = this.url + this.auth;
    console.log(this.url);
  }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this._http.post(this.url + 'registrarse', nuevoUsuario);
  }

  public login(usuario: LoginUsuario): Observable<JwtDTO> {
    return this._http.post<JwtDTO>(this.url + 'iniciarsesion', usuario);
  }

  public getUser(): Observable<any> {
    return this._http.get(this.url + 'usuario');
  }

  public refresh(dto: JwtDTO): Observable<JwtDTO> {
    return this._http.post<JwtDTO>(this.url + 'refresh', dto);
  }

  public edituser(id: number, data: any, file: any, token: string): Observable<any>{
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    const fd: any = new FormData();
    fd.append('nombre', data.nombre);
    fd.append('apellido', data.apellido);
    fd.append('email', data.email);
    fd.append('nombreUsuario', data.nombreUsuario);
    fd.append('password', data.password);
    fd.append('file', file);
    console.log('Data: ', data);
    console.log('FormData: ', fd);
    return this._http.put(this.url + 'usuario/' + id  + '/editar', fd, { headers: headers })
  }

  public delete(id: number, token: string): Observable<any>{
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this._http.delete(this.url + 'usuario/' + id + '/borrar', { headers: headers })
  }
}
