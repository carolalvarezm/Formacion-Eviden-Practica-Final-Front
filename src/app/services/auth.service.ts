import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, OnDestroy, OnInit } from '@angular/core';
import { userModel } from '../models/user.model';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';
import { authResponse } from '../models/auth.model';
import { environment } from '../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{


  constructor(private httpClient:HttpClient) {
    
    
  }
  ngOnInit(): void {
    let token=this.getToken();
    if(token!=null){
      this.token=token;
      this.currentUserLogin=true;
    }
    

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
    if(sessionStorage.getItem("token"))
    return sessionStorage.getItem("token");
  else return null;
  }
  decodeToken(){
    try{
      const token=this.getToken()
      if(token!=null)
        return jwtDecode(token);
      return undefined;
    }
    catch(error){
      console.error("Se ha producido un error:",error);
      //this.handleError(error);
      return undefined;

    }

  }
  islogin(){
    return sessionStorage.getItem("token");
  }
  isValid(){
 
    const expiration:number|undefined=this.decodeToken()?.exp;
    if(expiration!=undefined && expiration < Date.now()){
      return true;
    }
    else{
      return false;
    }
  }
  register(user:userModel){
    const headers=new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.serverUrl+"/auth/register",user,{"headers": headers}).pipe(
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

  handleError(error:HttpErrorResponse) {
    if(error.status){
      console.error("Se retornó el código de estado",error.status,error.error);
    }
    else{
      
      console.error("Se ha producido un error:",error.error);
    }
    return throwError(()=>error);
  }
}
