import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../servicios/user.service'; 
import { UserModel } from '../../models/user.model'; 

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;
  usuarios: UserModel[] = []; 

  constructor(private fb: FormBuilder, private userService: UserService) { 
    this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      repetirContrasena: ['', Validators.required],
      fechaNacimiento: [''], 
      genero: [''],
      rol: ["usuario", [Validators.required]],
      comunidadOrigen: ['']
    });
  }

  comprobarContrasenia(){
    //Comprobamos que las dos contraseñas introducidas sean iguales
    if (this.registroForm.value.contrasena == this.registroForm.value.repetirContrasena){
      return true;
    } else {
      alert("Las contraseñas no coinciden");
      return false;
    }
  }

  comprobarEmail(): void {
    //Obtenemos la lista de usuarios y comprobamos que ningún usuario tenga el email pasada por el formulario
    this.userService.getUsersList().subscribe(
      (data: UserModel[]) => {
        console.log(data);
        const emailIngresado = this.registroForm.value.email;
        const usuarioExistente = data.find(usuario => usuario.email === emailIngresado);
        if (usuarioExistente) {
          return; 
        } else {
          this.registrarUsuario();
        }
      },
      (error) => {
        console.error('Error al obtener la lista de usuarios:', error); 
      }
    ); 
  }
  
  registrarUsuario(): void {
    //Registramos al usuario generando un UserModel con los datos del formulario 
    const userData: UserModel = {
      email: this.registroForm.value.email,
      nombre: this.registroForm.value.nombre,
      apellidos: this.registroForm.value.apellidos,
      telefono: this.registroForm.value.telefono,
      contrasena: this.registroForm.value.contrasena,
      fechaNacimiento: this.registroForm.value.fechaNacimiento,
      genero: this.registroForm.value.genero,
      rol: this.registroForm.value.rol,
      comunidadOrigen: this.registroForm.value.comunidadOrigen
    };


    this.userService.addUser(userData).subscribe(
      (response: any) => {
        console.log('Usuario agregado correctamente:', response);
      },
      (error: any) => {
        console.error('Error al agregar usuario:', error);
      }
    );
  }
  
  onSubmit(): void {
    if (this.registroForm.valid) {
      if (this.comprobarContrasenia()) {
        this.comprobarEmail();
      } else {
        console.log("Problema con la contraseña");
      }
    }
  }
}
