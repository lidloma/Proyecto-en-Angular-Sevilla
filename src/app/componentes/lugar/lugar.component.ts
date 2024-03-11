import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LugarModel } from 'src/app/models/lugar.model';
import { OpinionModel } from 'src/app/models/opinion.model';

import { OpinionService } from 'src/app/servicios/opinion.service';
import { SitiosService } from 'src/app/servicios/sitios.service';

@Component({
  selector: 'app-lugar',
  templateUrl: './lugar.component.html',
  styleUrls: ['./lugar.component.css']
})
export class LugarComponent implements OnInit {
  lugar: LugarModel | undefined;
  sumaOpiniones: number = 0;
  mediaOpiniones: number = 0;
  cont:number = 0;
  cookie: boolean = true;
  email: String;
  rol: String;

  constructor(private route: ActivatedRoute,private _cookieService: CookieService, private _sitiosService: SitiosService, private _opinionService:OpinionService) { 
    this.email = this._cookieService.get('email');
    console.log(this.email)
    this.rol = this._cookieService.get('role');
    console.log(this.rol)
  
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const lugarTitulo = params['lugar'];
      this._sitiosService.getLugarList().subscribe(
        (data: LugarModel[]) => {
          for (let i = 0; i < data.length; i++) {
            if (data[i].titulo === lugarTitulo) {
              this.lugar = data[i];
              break;
            }
          }
        },
        (error) => {
          console.error('Error al obtener la lista de lugares:', error); 
        }
      );
    });
    this.getMediaPuntuaciones();
  }

  updateMainImage(imageUrl: string) {
    let imagenPrincipal = document.getElementById('imagenPrincipal') as HTMLImageElement;
    if (imagenPrincipal) {
      imagenPrincipal.src = imageUrl;
    }
  }

  getMediaPuntuaciones(){
    this._opinionService.getOpiniones().subscribe({
      next:(res) =>{
        for(let opinion of res){
          console.log(this.lugar?.titulo);
          if(opinion.sitio == this.lugar?.titulo){
            this.sumaOpiniones += parseInt(opinion.puntuacion);
            this.cont++;
          }
        }
        this.mediaOpiniones = this.cont > 0 ? Math.round(this.sumaOpiniones / this.cont) : 0;

        if (this.lugar && this.lugar.id !== undefined) {
          // Actualiza la puntuación en el lugar
          this._sitiosService.actualizarPuntuacion(this.lugar?.id, this.mediaOpiniones).subscribe(
            () => console.log('Puntuación actualizada en el lugar:', this.mediaOpiniones),
            (error) => console.error('Error al actualizar la puntuación en el lugar:', error)
          );
        }
      },
      error: console.error
    });
  }
}


