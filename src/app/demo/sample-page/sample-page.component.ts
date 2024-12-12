// angular import
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-sample-page',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './sample-page.component.html',
  styleUrls: ['./sample-page.component.scss']
})
export default class SamplePageComponent {
  isDisabled: boolean = true; // Estado inicial: inputs deshabilitados

  idParam!: string;
  userData: any;

  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      
      this.idParam = params.get('id') || ''; 

      this.firebaseService.getUserById(this.idParam).subscribe(data => {
        this.userData = data;
        console.log('User Data:', this.userData);
      });

    });
  }

  toggleEdit() {
    this.isDisabled = !this.isDisabled; // Cambia el estado de habilitado/deshabilitado
  }



  printData() {
    const printSection = document.getElementById('printSection');
    
    if (printSection) {
      html2canvas(printSection, {
        useCORS: true,
        logging: false,
        allowTaint: true,
        scale: 2 // Incrementa la calidad de la captura
      }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        // Dimensiones del PDF
        const pdfWidth = 210; // Ancho de A4 en mm
        const pdfHeight = 297; // Altura de A4 en mm
  
        // Dimensiones de la imagen generada por html2canvas
        const imgWidth = pdfWidth; // Imagen se ajusta al ancho del PDF
        const imgHeight = (canvas.height * pdfWidth) / canvas.width; // Mantén proporción
  
        let position = 0;
        let heightLeft = imgHeight;
  
        // Agregar la primera imagen
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
  
        // Agregar más páginas si la altura supera la página
        while (heightLeft > 0) {
          position -= pdfHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;
        }
  
        // Abrir el PDF en una nueva ventana
        window.open(pdf.output('bloburl'), '_blank');
      }).catch(error => {
        console.error('Error al generar PDF:', error);
      });
    }
  }
  


  // printData() {
  //   const PRINT_CONTENT = document.getElementById("printSection");
  //   console.log(PRINT_CONTENT);


  //   // if (PRINT_CONTENT) {
  //   //   html2pdf()
  //   //     .from(PRINT_CONTENT)
  //   //     .save('detalles_registro.pdf')
  //   //     .set({
  //   //       margin: 10,
  //   //       filename: 'detalles_registro.pdf',
  //   //       html2canvas: { scale: 2 },
  //   //       jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  //   //     })
  //   //     .save();
  //   // }

  // }

}
