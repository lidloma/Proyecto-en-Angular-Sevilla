import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AutentificacionService } from 'src/app/servicios/autentificacion.service';
import { UserService } from 'src/app/servicios/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  email: string = '';
  contrasenia: string = '';

  constructor(private autentificacion: AutentificacionService, private userService: UserService, private fb: FormBuilder, private _cookieService: CookieService,  private _router: Router) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasenia: ['', Validators.required]
    });
  }

  login(){

    if(this.loginForm.value.email == '' || this.loginForm.value.contrasenia == ''){       // Comprueba que se hayan rellenado ambos campos, aunque si no lo hace, el botón estará deshabilitado   
      alert('Debe rellenar Usuario y Contraseña.');
      return;
    }  

    let loginEmail: string = this.loginForm.value.email;
    let loginPassword: string = this.loginForm.value.contrasenia;

    let route: string = '/lugares';

    this.autentificacion.login(loginEmail, loginPassword).subscribe({
      next: (result: { role: string, token: string, email:string } | {}) => {
        if ('role' in result && 'token' in result  && 'email' in result) {
                    
          // Guardamos el token en la cookie
          this._cookieService.set('token', result.token);
          this._cookieService.set('role', result.role);
          this._cookieService.set('email', result.email);
          
           // Si es administrador, la ruta por defecto será /users
           if (result.role === 'administrador') 
           route = '/administrar';
          
           this._router.navigate([route]);
        } else {
          // Si no se encontró un usuario válido, muestra un mensaje de error
          alert('Los datos introducidos son incorrectos o no existen');
        }
      },
      error: console.log
    });
  }
}

  
