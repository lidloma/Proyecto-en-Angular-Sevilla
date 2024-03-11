import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  nombreUsuario: string = "";
  rolUsuario: boolean = false;

  constructor (private _cookieService: CookieService, private _router: Router){}

  ngOnInit(){
    this.getLoggedUser();
  }

  // Si hay un token en una cookie, devuelve true y guarda el nombre de usuario y rol. Si no, devuelve false
  getLoggedUser(): boolean {
    let token: string = this._cookieService.get('token');  
    
    if (!token){
      this.rolUsuario = false;
      return false;
    } else {
      let tokenPayload = JSON.parse(atob(token.split('.')[1]));
      this.nombreUsuario = tokenPayload.nombre; 
      this.rolUsuario = false;
      if (tokenPayload.rol === "administrador")
        this.rolUsuario = true;

      return true;
    }
  }

  // Elimina la cookie y redirige a la página de inicio
  logout(){
      this._cookieService.delete('token');   
      this._cookieService.delete('role');   

      console.log('Token eliminado:', this._cookieService.get('token'));
      this._router.navigate(['/lugares']); 

  }
}
