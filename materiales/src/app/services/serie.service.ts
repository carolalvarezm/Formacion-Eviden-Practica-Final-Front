import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { serieModel } from '../models/serie.model';

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  constructor(private httpClient:HttpClient) { }
  serverUrl:String=environment.serverUrl;

  getAll(){
    const headers=new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get(this.serverUrl+"/api/v1/series",{"headers": headers}).pipe(
      catchError(this.handleError)
    );
  }
  getById(id:Number){
    const headers=new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get(this.serverUrl+"/api/v1/series/"+id,{"headers": headers}).pipe(
      catchError(this.handleError)
    );
  }
  deleteSerie(id: Number | null) {
    const headers=new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.delete(this.serverUrl+"/api/v1/series/"+id,{"headers": headers,responseType: 'text'}).pipe(
      catchError(this.handleError)
    );
  }
  editSerie(serie:serieModel){
    const headers=new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(this.serverUrl+"/api/v1/series/"+serie.id,serie,{"headers": headers,responseType: 'text'}).pipe(
      catchError(this.handleError)
    );
  }
  createSerie(serie:serieModel){
    const headers=new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.serverUrl+"/api/v1/series",serie,{"headers": headers,responseType: 'text'}).pipe(
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
