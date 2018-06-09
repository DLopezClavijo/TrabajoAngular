import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/observable';
import { GLOBAL } from './global';

@Injectable()
    export class UserService {
        public url:string;
	    public identity;
        public token;
        
        constructor(private _http: Http) {
            this.url = GLOBAL.url;
        }


        public signUp(user_to_login, gethash = null){
            if (gethash != null) {
                user_to_login.gethash = gethash;
            }
        }
    
