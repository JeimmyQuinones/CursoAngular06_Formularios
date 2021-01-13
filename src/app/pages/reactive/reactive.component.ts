import { Component, OnInit } from '@angular/core';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from '../../Services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma:FormGroup;
  constructor( private fb: FormBuilder, private validadores:ValidadoresService) { 
    this.Crearformulario();
    this.Cargardataalformulario();
    this.crearListener();
  }

  ngOnInit(): void {
  }
  get nombreNovalido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }
  get apellidoNovalido(){
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  }
  get correoNovalido(){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }
  get usuarioNovalido(){
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched
  }
  get distritoNovalido(){
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched
  }
  get ciudadNovalido(){
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched
  }
  get listPasatiempos(){
    return this.forma.get('pasatiempos')as FormArray;
  }
  get pass1Novalido(){
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched
  }
  get pass2Novalido(){
    const pass1val= this.forma.get('pass1').value;
    const pass2val= this.forma.get('pass2').value;
    return (pass1val===pass2val)? false:true;
  }
  Crearformulario(){
    this.forma= this.fb.group({
      nombre:['',[Validators.required, Validators.minLength(5)]],
      apellido:['',[Validators.required, Validators.minLength(5),this.validadores.noHerrera]],
      correo:['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario:['',,this.validadores.existeusuario],
      pass1:['', Validators.required],
      pass2:['', Validators.required],
      direccion:this.fb.group({
        distrito:['',Validators.required],
        ciudad:['',Validators.required]
      }),
      pasatiempos:this.fb.array([]),
    },{validators: this.validadores.passwordiguales('pass1','pass2') });
    
  }
  crearListener(){
   /* this.forma.valueChanges.subscribe(valor=>{
      console.log(valor)
    })
    this.forma.statusChanges.subscribe(valor=>{
      console.log(valor);
    })*/
    this.forma.get('nombre').valueChanges.subscribe(val=>{
      console.log(val);
    })

  }
  Cargardataalformulario(){
    //this.forma.setValue({
      this.forma.reset({
        nombre:'Juanco',
        apellido:'Quilones',
        correo:'dd@ff.com',
        direccion:{
          distrito: 'bogota',
          ciudad:'kennedy'
        }
    });


  }
  Agregarpasatiempo(){
    this.listPasatiempos.push(this.fb.control('', Validators.required))
  }
  Borrarpasatiempo(i){
    this.listPasatiempos.removeAt(i);
  }
  Guardar(){
    if(this.forma.invalid){
      Object.values(this.forma.controls).forEach(control=>{
        if(control instanceof FormGroup){
          Object.values(control.controls).forEach(control=>{
            control.markAllAsTouched();
          })
        }else{
          control.markAllAsTouched();
        }
          
      });
    }
    //reset formulario
    this.forma.reset();
  }
  

}
