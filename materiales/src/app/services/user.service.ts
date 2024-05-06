import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { userModel } from '../models/user.model';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }
  serverUrl:String=environment.serverUrl;

  getUser(username:String){
    const headers=new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get(this.serverUrl+"/api/v1/users/"+username,{"headers": headers}).pipe(
      tap((response => {
        const res =  response as userModel;
        return res;       
       

      })),
      catchError(this.handleError)
    );
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
