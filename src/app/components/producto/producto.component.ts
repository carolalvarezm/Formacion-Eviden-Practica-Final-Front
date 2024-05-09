import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { productoModel } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent {
  @Input() producto:productoModel={
    id:null,
    name:"",
    description:"",
    image:null,
    serie:null,
    categories:[],
    brand:null
  };
  @Input()
  isFavorite:Boolean=false;
  @Output() 
  productoEliminado = new EventEmitter<Number>();
  constructor(private router:Router,private productoService:ProductoService,private authService:AuthService){
  
  }
  edit(){
    this.router.navigate(['producto-edit'],{queryParams: {id: this.producto.id}})
  }
  delete(){
    this.productoService.deleteProducto(this.producto.id).subscribe(response=>{
      if(this.producto.id!=null){
        this.productoEliminado.emit(this.producto.id as Number);
      }
    
    });}
  addToUser(){
    const token=this.authService.decodeToken()
    if(token.sub!=undefined||this.producto.id!=null){
      this.productoService.addProductToUser(token.sub||'',this.producto.id).subscribe(response=>{
        this.isFavorite=true;
      });
    }

  }
  removeFromUser(){
    const token=this.authService.decodeToken()
    if(token.sub!=undefined||this.producto.id!=null){
      this.productoService.removeProductToUser(token.sub||'',this.producto.id).subscribe(response=>{
        this.isFavorite=false;
      });
    }
  }
}
