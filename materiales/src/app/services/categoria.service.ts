import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { catchError, throwError } from 'rxjs';
import { categoriaModel } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

constructor(private httpClient:HttpClient) { }
serverUrl:String=environment.serverUrl;

getAll(){
  const headers=new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.httpClient.get(this.serverUrl+"/api/v1/categories",{"headers": headers}).pipe(
    catchError(this.handleError)
  );
}
getById(id:Number){
  const headers=new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.httpClient.get(this.serverUrl+"/api/v1/categories/"+id,{"headers": headers}).pipe(
    catchError(this.handleError)
  );
}
deleteCategoria(id: Number | null) {
  const headers=new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.httpClient.delete(this.serverUrl+"/api/v1/categories/"+id,{"headers": headers,responseType: 'text'}).pipe(
    catchError(this.handleError)
  );
}
editCategoria(categoria:categoriaModel){
  const headers=new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.httpClient.put(this.serverUrl+"/api/v1/categories/"+categoria.id,categoria,{"headers": headers,responseType: 'text'}).pipe(
    catchError(this.handleError)
  );
}
createCategoria(categoria:categoriaModel){
  const headers=new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.httpClient.post(this.serverUrl+"/api/v1/categories",categoria,{"headers": headers,responseType: 'text'}).pipe(
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
