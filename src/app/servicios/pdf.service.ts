import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { LugarModel } from '../models/lugar.model';


@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  generatePdf(data: LugarModel[], filename: string) {
    const doc = new jsPDF();

    let y = 15; // Posición vertical inicial

    data.forEach(item => {
      doc.text(`Title: ${item.titulo}`, 10, y);
      doc.text(`Description: ${item.descripcion}`, 10, y + 10);
      doc.text(`Location: ${item.ubicacion}`, 10, y + 20);
      y += 40; // Incremento de la posición vertical para el siguiente elemento
    });

    doc.save(`${filename}.pdf`);
  }
}