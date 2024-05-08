import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userModel } from '../models/user.model';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';
import { authResponse } from '../models/auth.model';
import { environment } from '../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private httpClient:HttpClient) {
    
    
  }
  currentUserLogin:boolean=false;
  token:string="";
  serverUrl:string=environment.serverUrl;
  login(username:string, password:string){
    const headers=new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.serverUrl+"/auth/login",{"username":username,"password":password},{"headers": headers}).pipe(
      tap((response => {
        const res =  response as authResponse; 
        if(res.token!=undefined){
          sessionStorage.setItem("token",res.token);
          this.token=res.token;
          this.currentUserLogin=true;
        }
       

      })),
      catchError(this.handleError)
    );
    
  }
  logout():void{
    sessionStorage.removeItem("token");
    this.token="";
    this.currentUserLogin=false;

  }
  getToken(){
    return sessionStorage.getItem("token");
  }
  decodeToken(){
      return jwtDecode(this.getToken()||'');
  }
  islogin(){
    return sessionStorage.getItem("token");
  }
  isValid(){
    const expiration:number|undefined=this.decodeToken().exp;
    if(expiration!=undefined && expiration < Date.now()){
      return true;
    }
    else{
      return false;
    }
  }
  register(user:userModel){
    const headers=new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.serverUrl+"/auth/register",user,{"headers": headers})
  }

  handleError(error:HttpErrorResponse) {
    if(error.status===0){
      console.error("Se ha producido un error:",error.error);
    }
    else{
      console.error("Se retornó el código de estado",error.status,error.error);
    }
    return throwError(()=> new Error("Hubo un problema. Inténtelo de nuevo"));
  }
}
