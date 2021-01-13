import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { rejects } from 'assert';
import { Observable } from 'rxjs';
interface ErrorValidate{
  [s:string]:boolean
}  

@Injectable({
  providedIn: 'root'
})

export class ValidadoresService {

  constructor() { }
  noHerrera(control:FormControl):ErrorValidate {
    if(control.value?.toLowerCase()==="herrera2"){
      return {
        noHerrera:true
      }
    }else{
      return null;
    }
        

  }
  existeusuario(control:FormControl):Promise<ErrorValidate>|Observable<ErrorValidate>{
    if(!control.value){
      return Promise.resolve(null);
    }
    return new Promise(  (resolve,reject)=>{
      setTimeout(() => {
        if( control.value=== 'stride'){
          resolve({
            existe:true
          })
        }else{
          resolve(null);
        }
      }, 3500);
    } );
        

  }
  passwordiguales(pass1val:string,pass2val:string){
      return ( fromGroup: FormGroup)=>{
          const pass1control= fromGroup.controls[pass1val];
          const pass2control= fromGroup.controls[pass2val];
          if(pass1control.value===pass2control.value){
            pass2control.setErrors(null);
          }else{
            pass2control.setErrors({noEsigual:true});
          }

      }
  }
}
