import { Component, OnInit } from '@angular/core';
import {Empleado} from './empleado';
@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  public titulo='Componente de empleado';

  public empleado:Empleado;
  public trabajadores:Array<Empleado>;
  public trabajador_externo:boolean;
  public color:string;
  public color_seleccionado:string;

  constructor() { 
    this.empleado = new Empleado('Yo',34, 'jefe', true);
    this.trabajadores = [
      new Empleado('el',43, 'vendedor', true),
      new Empleado('ella',23, 'vendedor', true),
      new Empleado('ellos',22, 'pajos', true)
    ];
    this.trabajador_externo = false;
    this.color = 'red';
    this.color_seleccionado='red';
  }

  ngOnInit() {
  }
  cambiarExterno(valor){
    this.trabajador_externo=valor;
  }
}
