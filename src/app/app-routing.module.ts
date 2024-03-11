import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LugaresComponent } from "./componentes/lugares/lugares.component";
import { LugarComponent } from "./componentes/lugar/lugar.component";
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { TablaComponent } from './componentes/tabla/tabla.component';
import { UserGuardGuard } from './utils/user.guard';
// import { UserGuardGuard } from './utils/user.guard';



const routes: Routes = [
  { path: 'lugares', component: LugaresComponent },
  { path: 'lugares/:lugar', component: LugarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'administrar', component: TablaComponent,  canActivate: [UserGuardGuard] },
  { path: '', redirectTo:'lugares', pathMatch:'full' },
  { path: '**', redirectTo:'lugares', pathMatch:'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
