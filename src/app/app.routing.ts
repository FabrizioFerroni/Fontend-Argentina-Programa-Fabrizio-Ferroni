import { BajaSuscripcionComponent } from './components/baja-suscripcion/baja-suscripcion.component';
import { NewPasswordComponent } from './components/users/new-password/new-password.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { RecoveryComponent } from './components/users/recovery/recovery.component';
import { RegisterComponent } from './components/users/register/register.component';
import { LoginComponent } from './components/users/login/login.component';
import { ContactameComponent } from './components/contactame/contactame.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { ErrorComponent } from './components/error/error.component';


const appRoute: Routes = [

  { path: '', component: InicioComponent },
  { path: 'quien-soy', component: AcercaDeComponent },
  { path: 'proyectos', component: ProyectosComponent },
  { path: 'contactame', component: ContactameComponent },
  { path: 'mi-perfil', component: ProfileComponent },
  { path: 'iniciarsesion', component: LoginComponent },
  { path: 'registrarse', component: RegisterComponent },
  { path: 'olvide-mi-contrasena', component: RecoveryComponent },
  { path: 'cambiar-contrasena/:tokenPassword', component: NewPasswordComponent },
  { path: 'darme-de-baja/:tokenPassword', component: BajaSuscripcionComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute, { scrollPositionRestoration: 'enabled' });
