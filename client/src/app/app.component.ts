import { Component } from '@angular/core';
import {User} from './models/user';
import {UserService} from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService]
})
export class AppComponent {
  title = 'Crea Equipos';
  
  public user: User;
  
  public identity;

  public token;
  
  constructor(private _userService:UserService){
    //asignar un valor por defecto al usuario
    this.user = new User('','','','','','ROLE_USER','');
  }

  ngOnInit(){

  }
  public onSubmit(){
    console.log(this._userService.signUp());
  }
}
