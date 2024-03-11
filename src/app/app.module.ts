import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { LugaresComponent } from './componentes/lugares/lugares.component';
import { LugarComponent } from './componentes/lugar/lugar.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { TablaComponent } from './componentes/tabla/tabla.component';
import { FooterComponent } from './componentes/footer/footer.component';

//Imports de Angular Material
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { OpinionComponent } from './componentes/opinion/opinion.component';
import { EditarComponent } from './componentes/editar/editar.component';
import { AnadirComponent } from './componentes/anadir/anadir.component';
import { BorrarComponent } from './componentes/borrar/borrar.component';
import { ComentariosComponent } from './componentes/comentarios/comentarios.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LugaresComponent,
    LugarComponent,
    FooterComponent,
    LoginComponent,
    RegistroComponent,
    TablaComponent,
    OpinionComponent,
    EditarComponent,
    AnadirComponent,
    BorrarComponent,
    ComentariosComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    HttpClientModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
