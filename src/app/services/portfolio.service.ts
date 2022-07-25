import { AcercaDeHomeDTO } from './../models/acerca-de-home-dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { Act } from '../models/act';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  url: string;
  api: string = "api/";

  constructor(
    private _http: HttpClient,
    private tokenService: TokenService
  ) {
    this.url = environment.url;
    this.url = this.url + this.api;
    console.log(this.url);
  }


  contador(payload: any): Observable<any> {
    return this._http.post("http://localhost/contador_visitas_php_avanzado/contador/registrar_visita.php", payload);
  }

  // Datos remotos
  get_home(): Observable<any> {
    return this._http.get(this.url + 'home');
  }

  download_cv_user(id: number, token: string): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this._http.get(this.url + 'downloadCv/user/' + id, { headers: headers });
  }

  header(): Observable<any> {
    return this._http.get(this.url + 'header');
  }

  cv(): Observable<any> {
    return this._http.get(this.url + 'cv');
  }

  dcv_home(id: number, token: string): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this._http.post(this.url + 'downloadCv/' + id, id, { headers: headers });
  }

  acdh(): Observable<any> {
    return this._http.get(this.url + 'acdh');
  }

  del_acdh(id: number, token: string): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this._http.delete(this.url + 'acercadehome/' + id + '/borrar', { headers: headers });
  }

  post_acdh_data(data: any, file: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    const fd: any = new FormData();
    fd.append('titulo', data.titulo);
    fd.append('descripcion', data.descripcion);
    fd.append('descripcion2', data.descripcion2);
    fd.append('file', file);
    fd.append('link', data.link);
    console.log('Data: ', data);
    console.log('FormData: ', fd);
    return this._http.post(this.url + 'create/acdh', fd, { headers: headers });
  }

  post_sub(data: any): Observable<any> {
    return this._http.post(this.url + 'nuevo-suscriptor', data);
  }

  get_acdh(id: number, token: string): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this._http.get(this.url + 'acercadehome/' + id, { headers: headers });
  }

  put_acdh_data(id: number, data: any, file: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    const fd: any = new FormData();
    fd.append('titulo', data.titulo);
    fd.append('descripcion', data.descripcion);
    fd.append('descripcion2', data.descripcion2);
    fd.append('file', file);
    fd.append('link', data.link);
    console.log('Data: ', data);
    console.log('FormData: ', fd);
    return this._http.put(this.url + 'acercadehome/' + id + '/editar', fd, { headers: headers });
  }


  get_header_id(id: number, token: string): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this._http.get(this.url + 'header/' + id, { headers: headers });
  }



  post_head_data(data: any, file: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    const fd: any = new FormData();
    fd.append('nombre', data.nombre);
    fd.append('apellido', data.apellido);
    fd.append('descripcion', data.descripcion);
    fd.append('file', file);
    console.log('Data: ', data);
    console.log('FormData: ', fd);
    return this._http.post(this.url + 'nuevo-header', fd, { headers: headers });
  }

  put_head_data(id: number, data: any, file: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    const fd: any = new FormData();
    fd.append('nombre', data.nombre);
    fd.append('apellido', data.apellido);
    fd.append('descripcion', data.descripcion);
    fd.append('file', file);
    console.log('Data: ', data);
    console.log('FormData: ', fd);
    return this._http.put(this.url + 'header/' + id + '/editar', fd, { headers: headers });
  }

  del_header(id: number, token: string): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this._http.delete(this.url + 'header/' + id + '/borrar', { headers: headers });
  }


  post_cv_data(data: any, file: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    const fd: any = new FormData();
    fd.append('NombreCv', data.NombreCv);
    fd.append('DescripcionCv', data.DescripcionCv);
    fd.append('file', file);
    console.log('Data: ', data);
    console.log('File', file);
    console.log('FormData: ', fd);
    return this._http.post(this.url + 'cargar-cv', fd, { headers: headers });
  }

  del_cv(id: number, token: string): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this._http.delete(this.url + 'cv/' + id + '/eliminar', { headers: headers });
  }


  get_acd_data(): Observable<any> {
    return this._http.get(this.url + 'acd');
  }

  get_acd_data_id(id: number, token: string): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this._http.get(this.url + 'acercade/' + id, { headers: headers });
  }

  post_acd_data(data: any, file: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    const fd: any = new FormData();
    fd.append('titulo', data.titulo);
    fd.append('descripcion', data.descripcion);
    fd.append('email', data.email);
    fd.append('file', file);
    console.log('Data: ', data);
    console.log('FormData: ', fd);
    return this._http.post(this.url + 'acercade', fd, { headers: headers });
  }

  update_acd_data(id: number, data: any, file: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    const fd: any = new FormData();
    fd.append('titulo', data.titulo);
    fd.append('descripcion', data.descripcion);
    fd.append('email', data.email);
    fd.append('file', file);
    console.log('Data: ', data);
    console.log('FormData: ', fd);
    return this._http.put(this.url + 'acercade/' + id + '/editar', fd, { headers: headers });
  }

  delete_acd_data(id: number, token: string): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this._http.delete(this.url + 'acercade/' + id + '/borrar', { headers: headers });
  }

  get_hability_data(): Observable<any> {
    return this._http.get(this.url + 'habilidades');
  }

  post_hability_data(data: any, file: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    const fd: any = new FormData();
    fd.append('titulo', data.titulo);
    fd.append('descripcion', data.descripcion);
    fd.append('file', file);
    console.log('Data: ', data);
    console.log('FormData: ', fd);
    return this._http.post(this.url + 'habilidad', fd, { headers: headers });
  }

  get_hability_data_for_id(id: number, token: string): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this._http.get(this.url + 'habilidad/' + id, { headers: headers });
  }

  put_hability_data(id: number, data: any, file: any, token: string): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    const fd: any = new FormData();
    fd.append('titulo', data.titulo);
    fd.append('descripcion', data.descripcion);
    fd.append('file', file);
    console.log('Data: ', data);
    console.log('FormData: ', fd);
    return this._http.put(this.url + 'habilidad/' + id + '/editar', fd, { headers: headers });
  }

  delete_hability_data(id: number, token: string): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this._http.delete(this.url + 'habilidad/' + id + '/borrar', { headers: headers });
  }

  get_experiencie_data(): Observable<any> {
    return this._http.get(this.url + 'experiencias');
  }

  get_experience_data_id(id: number, token: string): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this._http.get(this.url + 'experiencia/' + id, { headers: headers });
  }

  post_experiencia_data(data: any, token: string): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this._http.post(this.url + 'experiencia', data, { headers: headers });
  }

  put_experiencia_data(id: number, data: any, token: string): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this._http.put(this.url + 'experiencia/' + id + '/editar', data, { headers: headers });
  }

  delete_experiencia_data(id: number, token: string): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this._http.delete(this.url + 'experiencia/' + id + '/eliminar', { headers: headers });
  }

  get_frontend_data(): Observable<any> {
    return this._http.get(this.url + 'frontend');
  }

  get_backend_data(): Observable<any> {
    return this._http.get(this.url + 'backend');
  }

  get_frontend_data_id(id: number, token: string): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this._http.get(this.url + 'frontend/' + id, { headers: headers });
  }

  get_backend_data_id(id: number, token: string): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this._http.get(this.url + 'backend/' + id, { headers: headers });
  }

  post_frontend_data(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this._http.post(this.url + 'frontend', data, { headers: headers });
  }

  post_backend_data(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this._http.post(this.url + 'backend', data, { headers: headers });
  }

  put_frontend_data(id: number, data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this._http.put(this.url + 'frontend/' + id + '/editar', data, { headers: headers });
  }

  put_backend_data(id: number, data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this._http.put(this.url + 'backend/' + id + '/editar', data, { headers: headers });
  }

  delete_frontend_data(id: number, token: string): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this._http.delete(this.url + 'frontend/' + id + '/eliminar', { headers: headers });
  }

  delete_backend_data(id: number, token: string): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this._http.delete(this.url + 'backend/' + id + '/eliminar', { headers: headers });
  }

  get_services_data(): Observable<any> {
    return this._http.get(this.url + 'servicios');
  }

  get_service_data_id(id: number, token: string): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this._http.get(this.url + 'servicio/' + id, { headers: headers });
  }

  post_services_data(data: any, file: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    const fd: any = new FormData();
    fd.append('titulo', data.titulo);
    fd.append('descripcion', data.descripcion);
    fd.append('file', file);
    console.log('Data: ', data);
    console.log('FormData: ', fd);
    return this._http.post(this.url + 'servicio', fd, { headers: headers });
  }

  put_services_data(id: number, data: any, file: any, token: string): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    const fd: any = new FormData();
    fd.append('titulo', data.titulo);
    fd.append('descripcion', data.descripcion);
    fd.append('file', file);
    console.log('Data: ', data);
    console.log('FormData: ', fd);
    return this._http.put(this.url + 'servicio/' + id + '/editar', fd, { headers: headers });
  }

  delete_service_data(id: number, token: string): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this._http.delete(this.url + 'servicio/' + id + '/eliminar', { headers: headers });
  }

  get_proyectos_data(): Observable<any> {
    return this._http.get(this.url + 'proyectos');
  }

  get_proyectos_data_id(id: number, token: string): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this._http.get(this.url + 'proyecto/' + id, { headers: headers });
  }

  post_proyectos_data(data: any, file: any, token: string): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    const fd: any = new FormData();
    fd.append('titulo', data.titulo);
    fd.append('subtitulo', data.subtitulo);
    fd.append('descripcion', data.descripcion);
    fd.append('link_demo', data.link_demo);
    fd.append('link_github', data.link_github);
    fd.append('file', file);
    return this._http.post(this.url + 'proyecto', fd, { headers: headers });
  }

  put_proyectos_data(id: number, data: any, file: any, token: string): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    const fd: any = new FormData();
    fd.append('titulo', data.titulo);
    fd.append('subtitulo', data.subtitulo);
    fd.append('descripcion', data.descripcion);
    fd.append('link_demo', data.link_demo);
    fd.append('link_github', data.link_github);
    fd.append('file', file);
    return this._http.put(this.url + 'proyecto/' + id + '/editar', fd, { headers: headers });
  }

  delete_proyectos_id_data(id: number, token: string): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this._http.delete(this.url + 'proyecto/' + id + '/borrar', { headers: headers });
  }


  send_email(data: any): Observable<any> {
    return this._http.post(this.url + 'contactame', data);

  }

  getidwithtoken(token: string): Observable<any> {
    return this._http.get(this.url + 'getidwithtoken/' + token)
  }

  unsuscribe(id: number): Observable<any> {
    return this._http.delete(this.url + 'suscriptor/' + id + '/borrar')
  }


  // Datos locales

  // users(): Observable<any> {
  //   return this._http.get('../../assets/sql/usuarios.json');
  // }



}
