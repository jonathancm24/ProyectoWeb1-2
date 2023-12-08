import { group } from '@angular/animations';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import {AngularFireAuth} from '@angular/fire/compat/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

public myForm!:FormGroup;
private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
public showError: boolean = false;
public mensaje_error: any;



  constructor(private fb:FormBuilder,
    private Loginprd:AutenticacionService, 
    private router:Router,
    private afAuth: AngularFireAuth) { }
  ngOnInit(): void {
    this.myForm=this.createMyForms();
  }
  private createMyForms():FormGroup {
    return this.fb.group({
      email:['',[Validators.required,Validators.pattern(this.emailPattern)]],
      password:['',[Validators.required]]

    });

  }

  public submitFormulario() {
    if (this.myForm.invalid) {
       this.showError = true;
       this.mensaje_error="Llena todos los datos correctamente"
    } else {
       this.showError = false;
       const email = this.myForm.value.email;
       const password = this.myForm.value.password;
       this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {
          console.log(user);
          if (user.user?.emailVerified) {
             this.router.navigate(['/Inicio/Home'])
          } else {
             this.router.navigate(['/Inicio/Home'])
          }
 
       }).catch((error) => {
          console.log(this.Loginprd.codeError(error.code));
          this.mensaje_error = this.Loginprd.codeError(error.code); // Usar "this.mensaje_error"
          this.showError = true;

       })
    }
 }
 

}
