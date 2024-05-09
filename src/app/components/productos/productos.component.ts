import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { productoModel } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent {
  productos:productoModel[]=[];
  productosFavoritos:productoModel[]=[]
    constructor(private productoService:ProductoService,private authService:AuthService,private router:Router){
      
  }
    ngOnInit(): void {
      this.productoService.getAll().subscribe(response=>{
        this.productos=response as productoModel[];
      });
      const token=this.authService.decodeToken();
      this.productoService.getByUsername(token.sub||'').subscribe(response=>{
        this.productosFavoritos=response as productoModel[];
      });
    }
  compare(prod:productoModel):Boolean{
    if(this.productosFavoritos.find(element=> element.id == prod.id)!=undefined){
      return true;
    }
    else{
      return false;
    }
  }
  create(){
    this.router.navigate(['producto-edit']);
  }
  delete(id:Number){
   this.productos= this.productos.filter((i) =>
    {
      return i.id !== id;
    })
  }
  }
  