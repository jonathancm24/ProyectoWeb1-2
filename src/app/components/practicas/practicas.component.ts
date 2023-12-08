import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LogicaService } from 'src/app/services/logica.service';
import { Observable, map } from 'rxjs';
import { practica } from './practicas';  // Assume you have a Product interface or class






//Para crear componentes comando : ng g c components/nombre-del-Componente
@Component({
  selector: 'app-practicas',
  templateUrl: './practicas.component.html',
  styleUrls: ['./practicas.component.css']
})

export class PracticasComponent implements OnInit {
  doctorForm: FormGroup;
  doctorSeleccionado: any = null;
  UpdatedoctorForm: FormGroup;
  practicas: Observable<practica[]>  = new Observable<practica[]>(); 

  constructor( 
    private formbuilder: FormBuilder,
    private logica: LogicaService,
    private afs: AngularFirestore) 
  { 
    this.doctorForm = this.formbuilder.group({
      id: ['', Validators.required],
      actividad: ['', Validators.required],
      horas: ['', Validators.required],
      observaciones: ['', Validators.required],
    });

    this.UpdatedoctorForm = this.formbuilder.group({
      id: ['', Validators.required],
      actividad: ['', Validators.required],
      horas: ['', Validators.required],
      observaciones: ['', Validators.required],
    });
  }


  ngOnInit(): void {
    this.practicas = this.logica.getpracticas();
  }

  addactividad(){
    if (this.doctorForm.valid) {
      const id = this.doctorForm.value.id;
      const email = this.doctorForm.value.actividad;
      const password = this.doctorForm.value.horas;
      const username = this.doctorForm.value.observaciones;
      this.logica.agregarDatos(id,email,password, username);
      this.doctorForm.reset();
  }
}
ObtenerDatosE(datoO: practica) {
  this.doctorSeleccionado = datoO;
  console.log(this.doctorSeleccionado);
  this.UpdatedoctorForm.patchValue(datoO);
}

eliminarDato(actividad: string) {
  this.afs.collection('Practicas', ref => ref.where("actividad", '==', actividad))
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


UpdateDato() {
  if (this.UpdatedoctorForm.valid && this.doctorSeleccionado) {
    const { id,actividad, horas, observaciones } = this.UpdatedoctorForm.value;

  this.afs.collection('Practicas', ref => ref.where("id", '==', id))
    .get()
    .subscribe(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.update({actividad,horas,observaciones});
      });
      console.log('Datos actualizados correctamente');
    }, error => {
      console.error('Error al eliminar los datos:', error);
    });
  }
}




}