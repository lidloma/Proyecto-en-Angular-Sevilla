import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { LugarModel } from 'src/app/models/lugar.model';
import { SitiosService } from 'src/app/servicios/sitios.service';

@Component({
  selector: 'app-borrar',
  templateUrl: './borrar.component.html',
  styleUrls: ['./borrar.component.css']
})
export class BorrarComponent implements OnInit{
  id: number | undefined;

  constructor(private _sitiosService: SitiosService,@Inject(MAT_DIALOG_DATA) public data: LugarModel) {}

  ngOnInit(): void {
    if (this.data && this.data.id) {
      this.id = this.data.id;
    }
  }
  
  borrarLugar() {
    if (this.id) {
      this._sitiosService.borrarLugar(this.id).subscribe(
        (response: any) => {
          console.log('Sitio editado correctamente', response);
          window.location.reload();
        },
        (error: any) => {
          console.error('Error al editar sitio:', error);
        }
      );
    } else {
      // Manejar el caso cuando no se proporciona un ID
      console.error('ID no proporcionado.');
    }
  }
}
