import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor() { }

  private ingresar:boolean= false;
  

  //Validacion de registro contraseñas deben ser iguales
  public ingresarRegistro(obj:any):boolean {

      this.ingresar=obj.password==obj.password2
    return this.ingresar
  }

  public habilitarRegistro() {
    return this.ingresar

  }

  codeError(code: string ) 
  {
     switch(code) 
     { 
       //El correo ya existe
       case 'auth/email-already-in-use':
        return 'Esta correo ya esta registrado';
        //Contraseña muy debil minimo 6 carac
       case 'auth/weak-password':
        return'Contraseña muy debil';

        //Email invalido
        case 'auth/user-not-found':
          return 'Este correo no esta registrado';
        
        case 'auth/wrong-password':
          return 'Contraseña incorrecta';

         case 'auth/invalid-email':
          return 'Correo Invalido';

       default:
        return 'Error desconocido';

     }
  }

}