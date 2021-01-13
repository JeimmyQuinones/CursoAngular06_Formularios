import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../Services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
Usuario={
  Nombre:"Jeimmy",
  Apellido:"Quiñones",
  Correo:"jeimmy@hm.com",
  Pais:"CRI",
  Genero:""
}
selecpais:any[];
  constructor(private pais: PaisService) { }

  ngOnInit(): void {
    this.pais.getpaises().subscribe(paises=>{
      this.selecpais= paises;
      this.selecpais.unshift({
        nombre:'---Seleccione un pais---',
        codigo:''
      })
    });
  }
  Guardar(forma:NgForm){
    if(forma.invalid){
      Object.values(forma.controls).forEach(control=>{
          control.markAllAsTouched();
      });
      return ;
    }
    
    console.log(forma.value);
    console.log(forma.valid);
  }

}
