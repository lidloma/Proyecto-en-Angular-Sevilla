import { Component, OnInit } from '@angular/core';
import { OpinionService } from 'src/app/servicios/opinion.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { OpinionModel } from 'src/app/models/opinion.model';
import { LugarModel } from 'src/app/models/lugar.model';
import { SitiosService } from 'src/app/servicios/sitios.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  opinion: OpinionModel[] = []; 
  contador: number = 0;


  constructor(private _route: ActivatedRoute, private _sitiosService: SitiosService, private _opinionService:OpinionService) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      const lugarTitulo = params['lugar'];
      this._opinionService.getOpiniones().subscribe(
        (data: OpinionModel[]) => {
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            if (data[i].sitio === lugarTitulo) {
              this.opinion.push(data[i]);
              console.log(this.opinion);

            }
          }
        },
        (error) => {
          console.error('Error al obtener la lista de lugares:', error); 
        }
      );
    });
  }
}
