import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LugarModel } from 'src/app/models/lugar.model';
import { SitiosService } from 'src/app/servicios/sitios.service';
import { RegistroComponent } from '../registro/registro.component';
import { EditarComponent } from '../editar/editar.component';
import { FormGroup } from '@angular/forms';
import { AnadirComponent } from '../anadir/anadir.component';
import { BorrarComponent } from '../borrar/borrar.component';
import { PdfService } from 'src/app/servicios/pdf.service';
import jsPDF from 'jspdf';



@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  displayedColumns:string[] = ['titulo', 'actions'];
  dataSource!: MatTableDataSource<LugarModel>;
  lugares: LugarModel[] = [];

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (private _dialog:MatDialog, private _sitiosService:SitiosService,private pdfService: PdfService){

  }

  ngOnInit(): void {
    this.getLugarList();
  }

  // Editar lugar
  editarLugar(data?: LugarModel){
    let dialogRef;
    console.log(data);

    if(data)
      dialogRef = this._dialog.open(EditarComponent, {data, 
        width: '1000px',
        height: '500px'
      });
    else
      dialogRef = this._dialog.open(EditarComponent);

    dialogRef.afterClosed().subscribe({
      next:(val) =>{
        if(val){
          this.getLugarList();
        }
      }
    })
  }

  borrarLugar(data?: LugarModel){
    let dialogRef;
    console.log(data);
    
    if(data){
      dialogRef = this._dialog.open(BorrarComponent, {data, 
        width: '500px',
        height: '250px'
      });
    }else{
      dialogRef = this._dialog.open(BorrarComponent);
    }
    dialogRef.afterClosed().subscribe({
      next:(val) =>{
        if(val){
          this.getLugarList();
        }
      }
    })
  }

  //Insertar lugar 
  anadirLugar(): void {
    let dialogRef = this._dialog.open(AnadirComponent, {
      width: '1000px',
      height: '500px'

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getLugarList(); 
      }
    });
  }

  getLugarList(){
    this._sitiosService.getLugarList().subscribe({
      next:(res) =>{
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  exportToPdf() {
    this._sitiosService.getLugarList().subscribe({
      next:(res) =>{
        console.log(res);
        this.pdfService.generatePdf(res, "lugares");
      },
      error: console.log
    });
}


  deleteRow(event:Event){
  }
}


