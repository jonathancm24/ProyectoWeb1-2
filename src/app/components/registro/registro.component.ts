import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';




@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  public myForm!:FormGroup;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public showError: boolean = false;
  public mensaje_error: any;
  
  constructor(private fb:FormBuilder,
    private registerprd:AutenticacionService, 
    private router:Router,
    private afAuth:AngularFireAuth,
    private afDatabase: AngularFireDatabase) { }
  ngOnInit(): void {
    this.myForm=this.createMyForms();
  }
  private createMyForms():FormGroup {
    return this.fb.group({
      nombre:['',[Validators.required]],
      email:['',[Validators.required,Validators.pattern(this.emailPattern)]],
      password:['',[Validators.required]],
      password2:['',[Validators.required]]


    });

  }

  
  async onSubmit() {
    const email = this.myForm.value.email;
    const password = this.myForm.value.password;
    const nombre = this.myForm.value.nombre;
    if(this.myForm.valid){
      try {
        const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
        if (result.user) {
          const userId = result.user.uid;
          this.afDatabase.object('users/' + userId).set({
            nombre: nombre
          });
    
          this.afDatabase.object<{nombre: string}>('users/' + userId).valueChanges().subscribe(user => {
            if (user) {
              console.log(user.nombre);
              this.router.navigate(["/Login"]);
            }
          });
        }
      } catch (error: any) { // Cambio aquí para corregir el error
        console.log(this.registerprd.codeError(error.code));
        this.mensaje_error = this.registerprd.codeError(error.code);
        this.showError = true;
      }

    }else
    {
      this.showError = true;
      this.mensaje_error="Completa el formulario"
    }
    
  }
  


  VerificarCorreo() {

    this.afAuth.currentUser.then(user=> user?.sendEmailVerification())
    .then(() => {
      console.log('Registro Exitoso')
      setTimeout(() => {
        this.router.navigate(['/verificacion']);
      }, 3000);
    }) 

    
  }
  
    
  }
