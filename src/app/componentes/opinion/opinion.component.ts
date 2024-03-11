import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { OpinionService } from 'src/app/servicios/opinion.service';
import { ActivatedRoute } from '@angular/router';
import { OpinionModel } from 'src/app/models/opinion.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: ['./opinion.component.css']
})
export class OpinionComponent implements OnInit {
  valoracionForm: FormGroup;
  usuario: string;
  sitio: string = "";
  permitirFormulario: boolean = false;

  constructor(
    private fb: FormBuilder,
    private opinionService: OpinionService,
    private cookiesService: CookieService,
    private route: ActivatedRoute
  ) {
    this.valoracionForm = this.fb.group({
      puntuacion: ['', Validators.required],
      valoracion: ['', Validators.required]
    });
    this.usuario = this.cookiesService.get('email');
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.sitio = params['lugar']; 
      this.comprobarUsuario().subscribe((permitir: boolean) => {
        this.permitirFormulario = permitir;
      });
    });
  }

  onSubmit() {
    if (this.valoracionForm.valid) {
      const puntuacion = this.valoracionForm.value.puntuacion;
      const valoracion = this.valoracionForm.value.valoracion;

      const nuevaOpinion = {
        usuario: this.usuario,
        sitio: this.sitio,
        valoracion: valoracion,
        puntuacion: puntuacion
      };

      this.opinionService.addOpiniones(nuevaOpinion).subscribe({
        next: (response) => {
          console.log('Opinión agregada:', response);
          window.location.reload();
        },
        error: (error) => {
          console.error('Error al agregar opinión:', error);
        }
      });
    }
  }

  comprobarUsuario() {
    return this.opinionService.getOpiniones().pipe(
      map((data: OpinionModel[]) => {
        const lugarTitulo = this.sitio;
        for (let i = 0; i < data.length; i++) {
          if (data[i].sitio === lugarTitulo && data[i].usuario === this.usuario) {
            return false;
          }
        }
        return true;
      })
    );
  }
}
