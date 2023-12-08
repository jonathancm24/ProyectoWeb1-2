import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';


@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  isLogged = false;
  isLogin = true;
  nombre: string | undefined;
  email!: string | null;
  dataUser: any;

  constructor(private router:Router,
    private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase){}
  ngOnInit(): void {
    this.actualizarlogin();
  }
  navigateToPage(page: string){
    this.router.navigate([page]);
  }


  actualizarlogin() {
    this.afAuth.onAuthStateChanged((user) => {
      if (user  ) {
        console.log("estas logueado");   
        this.isLogged = true;
        this.isLogin = false;
        
        this.email = user.email;
      this.afDatabase.object<{ nombre: string }>('users/' + user.uid).valueChanges().subscribe(userData => {
        if (userData) {
          this.nombre = userData.nombre; // Asignar el nombre de usuario a la variable username  
          console.log(this.nombre)
        }
      });
  
      } else {
        console.log("no estas logueado");
        this.isLogged = false;
        this.isLogin = true;
        this.nombre ='';
        this.email='';
  
      }
    });
  }

  logout() {
    this.afAuth.signOut();
    this.actualizarlogin();
  }
  iralogin() {
    this.router.navigate(['/Login']);
  }
}
