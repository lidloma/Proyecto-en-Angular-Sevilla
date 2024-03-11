import { Component, OnInit } from '@angular/core';
import { LugarModel } from 'src/app/models/lugar.model';
import { SitiosService } from 'src/app/servicios/sitios.service'; 

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css']
})
export class LugaresComponent implements OnInit {
  lugares: LugarModel[] = []; 

  constructor(private _sitiosService: SitiosService) {
  } 

  ngOnInit(): void {
    this._sitiosService.getLugarList().subscribe(
      (data: LugarModel[]) => {
        this.lugares = data;
      },
      (error) => {
        console.error('Error al obtener la lista de lugares:', error); 
      }
    );
  }
}
