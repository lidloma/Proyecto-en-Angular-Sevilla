import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LugarModel } from 'src/app/models/lugar.model';
import { SitiosService } from 'src/app/servicios/sitios.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  anadirForm: FormGroup;
  id: number | undefined;

  constructor(private fb: FormBuilder, private _sitiosService: SitiosService, @Inject(MAT_DIALOG_DATA) public data: LugarModel) {
    this.anadirForm = this.fb.group({
      titulo: [this.data.titulo],
      imagen1: [this.data.imagen1],
      imagen2: [this.data.imagen2],
      imagen3: [this.data.imagen3],
      imagen4: [this.data.imagen4],
      descripcion: [this.data.descripcion],
      ubicacion: [this.data.ubicacion],
      horario: [this.data.horario],
      historia: [this.data.descripcion],
      precio: [this.data.precio],
      puntuacion: [this.data.puntuacion],
  
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.id) {
      this.id = this.data.id;
    }
  }

  onSubmit(): void {
    if (this.anadirForm.valid && this.id) {
      let lugarData: LugarModel = {
        id:this.id,
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
        puntuacion: this.data.puntuacion
      };

      this._sitiosService.editLugar(this.id, lugarData).subscribe(
        (response: any) => {
          console.log('Sitio editado correctamente', response);
          window.location.reload();

        },
        (error: any) => {
          console.error('Error al editar sitio:', error);
        }
      );
    } else {
      // Manejar el caso cuando el formulario no es válido o no hay ID
      console.error('Formulario no válido o ID no proporcionado.');
    }
  }
}
