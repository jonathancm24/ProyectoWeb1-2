import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LogicaService } from 'src/app/services/logica.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { estudiante } from './estudiantes';  // Assume you have a Product interface or class
import {MatButtonModule} from '@angular/material/button';



@Component({
  selector: 'app-planilla',
  templateUrl: './planilla.component.html',
  styleUrls: ['./planilla.component.css']
})
export class PlanillaComponent implements OnInit {

  estudiantes: Observable<estudiante[]>  = new Observable<estudiante[]>(); 

  UpdateForm: FormGroup;
  EstudianteForm: FormGroup;
  EstudianteSeleccionado: any = null;
  mostrarAlerta = false;


  constructor(
    private formbuilder: FormBuilder,
    private logica: LogicaService,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase
  ) {
    this.EstudianteForm = this.formbuilder.group({
      id: ['', Validators.required],
      nombre: [null, Validators.required],
      edad: ['', Validators.required],
      nivel: ['', Validators.required],
      campus: ['', Validators.required],
      carrera: ['', Validators.required],
      correo: ['', Validators.required],

    });

    this.UpdateForm = this.formbuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      edad: ['', Validators.required],
      nivel: ['', Validators.required],
      campus: ['', Validators.required],
      carrera: ['', Validators.required],
      correo: ['', Validators.required],

    });
  }

  ngOnInit(): void {
    this.estudiantes = this.logica.getestudiantes();

  }


  agregarEstudiante() {
    if (this.EstudianteForm.invalid){
      
      return console.log("Error")
    }
    else{
      const {id,nombre,edad,nivel,campus,carrera,correo} = this.EstudianteForm.value;
      this.logica.agregarDatosEstudiante(id,nombre,edad,nivel,campus,carrera,correo);
      this.EstudianteForm.reset();
      this.mostrarAlerta = true;
  
    }
    
  }

  eliminarDato(id: string) {
    this.afs.collection('DatosEstudiante', ref => ref.where("id", '==', id))
      .get()
      .subscribe(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.delete();
        });
        console.log('Datos eliminados correctamente');
        
      }, error => {
        console.error('Error al eliminar los datos:', error);
      });
  
  }

  ObtenerDatosE(datoO: estudiante) {
    this.EstudianteSeleccionado = datoO;
    console.log(this.EstudianteSeleccionado);
    this.UpdateForm.patchValue(datoO);
  }

  UpdateDato() {
    if (this.UpdateForm.valid && this.EstudianteSeleccionado) {
      const {id,nombre,edad,nivel,campus,carrera,correo} = this.UpdateForm.value;

  
    this.afs.collection('DatosEstudiante', ref => ref.where("id", '==', id))
      .get()
      .subscribe(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.update({nombre,edad,nivel,campus,carrera,correo});
        });
        console.log('Datos actualizados correctamente');
      }, error => {
        console.error('Error al eliminar los datos:', error);
      });
    }

}
}
