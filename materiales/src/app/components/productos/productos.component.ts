import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { productoModel } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent {
  productos:productoModel[]=[];
    constructor(private productoService:ProductoService,private router:Router){
      
  }
    ngOnInit(): void {
      this.productoService.getAll().subscribe(response=>{
        this.productos=response as productoModel[];
      });
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
  