import { Component } from '@angular/core';
import {User} from './models/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Crea Equipos';
  
  public user: User;
  
  public identity;

  public token;
  
  constructor(){
    //asignar un valor por defecto al usuario
    this.user = new User('','','','','','ROLE_USER','');
  }

  ngOnInit(){

  }
  public onSubmit(){
    console.log(this.user);
  }
