import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LugarModel } from 'src/app/models/lugar.model';
import { SitiosService } from 'src/app/servicios/sitios.service';

@Component({
  selector: 'app-anadir',
  templateUrl: './anadir.component.html',
  styleUrls: ['./anadir.component.css']
})
export class AnadirComponent {
  anadirForm:FormGroup;

  constructor(private fb: FormBuilder, private _sitiosService: SitiosService, @Inject(MAT_DIALOG_DATA) public data: LugarModel) { 
    this.anadirForm = this.fb.group({
      titulo: [''],
      imagen1: [''],
      imagen2: [''],
      imagen3: [''],
      imagen4: [''],
      descripcion: [''],
      ubicacion: [''],
      horario: [''],
      historia: [''],
      precio: ['']
    });
  }

  onSubmit(): void {
    if (this.anadirForm.valid) {
      const lugarData: LugarModel = {
        titulo: this.anadirForm.value.titulo,
        imagen1: this.anadirForm.value.imagen1,
        imagen2: this.anadirForm.value.imagen2,
        imagen3: this.anadirForm.value.imagen3,
        imagen4: this.anadirForm.value.imagen4,
        descripcion: this.anadirForm.value.descripcion,
        ubicacion: this.anadirForm.value.ubicacion,
        horario: this.anadirForm.value.horario,
        historia: this.anadirForm.value.historia,
        precio: this.anadirForm.value.precio,

      };

      this._sitiosService.anadirLugar(lugarData).subscribe(
        (response: any) => {
          console.log('Sitio agregado correctamente', response);
          window.location.reload();
        },
        (error: any) => {
          console.error('Error al agregar sitio:', error);
        }
      );
    }
  }
}