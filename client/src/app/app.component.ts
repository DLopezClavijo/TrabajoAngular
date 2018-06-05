import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Trabajo Angular';
  
  public nombre:string;
  public edad:number;
  public mayorEdad:boolean;
  public trabajos:Array<any>=['profesor', true, 450000 ,'conductor'];
  public aux:any;


  constructor(){
    this.nombre = 'Daniel';
    this.edad = 89;
    this.mayorEdad = true;
    this.aux = 'Cadena';
  }

  ngOnInit(){
    this.cambiarNombre();
    this.cambiarEdad(55);

    var uno =6;
    if(uno==6){
      let uno = 9;
      console.log(uno);
    }
    console.log(uno);

  }

  cambiarNombre(){
    this.nombre = 'Juan';
  }
  cambiarEdad(edad){
   this.edad=edad;
  }
}
