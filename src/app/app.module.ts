
import { routing } from './app.routing';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from "@angular/common/http";
// import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// import { ClassicEditorBuild } from '@ckeditor/ckeditor5-build-classic';
import { NgxTinymceModule } from 'ngx-tinymce';
import { CKEditorModule } from "ng2-ckeditor";



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { ContactameComponent } from './components/contactame/contactame.component';
import { SubscribeModalComponent } from './components/modal/subscribe-modal/subscribe-modal.component';
import { ModalComponent } from './components/modal/modal.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { RecoveryComponent } from './components/users/recovery/recovery.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './components/users/profile/profile.component';
import { interceptorProvider } from './interceptors/portfolio-interceptor.service';
import { NewPasswordComponent } from './components/users/new-password/new-password.component';
import { ErrorComponent } from './components/error/error.component';
import { LoaderComponent } from './components/loader/loader.component';
import { BajaSuscripcionComponent } from './components/baja-suscripcion/baja-suscripcion.component';
import { BienvenidoComponent } from './components/modal/bienvenido/bienvenido.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    InicioComponent,
    AcercaDeComponent,
    ContactameComponent,
    SubscribeModalComponent,
    ModalComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryComponent,
    ProyectosComponent,
    ProfileComponent,
    NewPasswordComponent,
    ErrorComponent,
    LoaderComponent,
    BajaSuscripcionComponent,
    BienvenidoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    HttpClientModule,
    FormsModule,
    CKEditorModule,
    NgxTinymceModule.forRoot({
      baseURL: "../assets/tinymce/",
    }),
    // ClassicEditorBuild
  ],
  providers: [interceptorProvider],
  // providers: [
  //   // {provide: HTTP_INTERCEPTORS, useClass: interceptorProvider, multi: true},
  //   {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true},
  // ],
  bootstrap: [AppComponent]
})
export class AppModule { }
