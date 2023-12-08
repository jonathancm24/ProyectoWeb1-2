import { Component } from '@angular/core';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent {
  pdfData: any[] = JSON.parse(localStorage.getItem('pdfData') || '[]'); // Obtener los datos guardados en localStorage

  uploadPDF(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Aquí puedes realizar acciones con el archivo PDF cargado
        console.log('Archivo PDF cargado:', file);
        // Por ejemplo, podrías guardar información relacionada con el PDF en pdfData
        const pdfInfo = {
          nombre: file.name,
          tamano: file.size, // Cambiando el nombre de tamaño a tamano
          tipo: file.type,
          ultimaModificacion: file.lastModifiedDate.toLocaleDateString(),
          fechaSubida: new Date().toLocaleString() // Fecha de subida del PDF
        };
        this.pdfData.push(pdfInfo);
        localStorage.setItem('pdfData', JSON.stringify(this.pdfData)); // Guardar datos en localStorage
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('Por favor, seleccione un archivo PDF.');
      // Puedes manejar de forma adecuada la situación donde se seleccione un archivo incorrecto
    }
  }
  eliminarPDF(index: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este archivo PDF?')) {
      this.pdfData.splice(index, 1); // Eliminar el elemento del array pdfData
      localStorage.setItem('pdfData', JSON.stringify(this.pdfData)); // Actualizar en localStorage
    }
  
}
}