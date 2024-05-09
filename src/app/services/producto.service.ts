import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { productoModel } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

    constructor(private httpClient:HttpClient) { }
    serverUrl:String=environment.serverUrl;
  
    getAll(){
      const headers=new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.httpClient.get(this.serverUrl+"/api/v1/products",{"headers": headers}).pipe(
        catchError(this.handleError)
      );
    }
    getById(id:Number){
      const headers=new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.httpClient.get(this.serverUrl+"/api/v1/products/"+id,{"headers": headers}).pipe(
        catchError(this.handleError)
      );
    }
    getByUsername(username:String){
      const headers=new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.httpClient.get(this.serverUrl+"/api/v1/users/"+username+"/products",{"headers": headers}).pipe(
        catchError(this.handleError)
      );
    }
    addProductToUser(username:string,productId:Number|null){
      const headers=new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.httpClient.post(this.serverUrl+"/api/v1/users/"+username+"/products/"+productId,{},{"headers": headers, responseType:'text'}).pipe(
        catchError(this.handleError)
      );
    }
    removeProductToUser(username:string,productId:Number|null){
      const headers=new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.httpClient.delete(this.serverUrl+"/api/v1/users/"+username+"/products/"+productId,{"headers": headers, responseType:'text'}).pipe(
        catchError(this.handleError)
      );
    }
    deleteProducto(id: Number | null) {
      const headers=new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.httpClient.delete(this.serverUrl+"/api/v1/products/"+id,{"headers": headers,responseType: 'text'}).pipe(
        catchError(this.handleError)
      );
    }
    editProducto(producto:productoModel){
      const headers=new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.httpClient.put(this.serverUrl+"/api/v1/products/"+producto.id,producto,{"headers": headers,responseType: 'text'}).pipe(
        catchError(this.handleError)
      );
    }
    createProducto(producto:productoModel){
      const headers=new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.httpClient.post(this.serverUrl+"/api/v1/products",producto,{"headers": headers,responseType: 'text'}).pipe(
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
  