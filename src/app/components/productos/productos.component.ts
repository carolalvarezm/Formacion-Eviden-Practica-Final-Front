import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  isFavorites:Boolean=false;
  brand:number|null=null;
  serie:number|null=null;
  constructor(private productoService:ProductoService,private authService:AuthService,private router:Router,private route:ActivatedRoute){
      
  }
    ngOnInit(): void {
      const token=this.authService.decodeToken();
      this.isFavorites=this.router.url == '/productos/my';
      this.brand=this.route.snapshot.queryParamMap.get('marca') as number|null;
      this.serie=this.route.snapshot.queryParamMap.get('serie') as number|null;
      this.productoService.getByUsername(token?.sub||'').subscribe(response=>{
        this.productosFavoritos=response as productoModel[];
        if(this.isFavorites){
          this.productos=response as productoModel[];
          
        }
      });
      if(!this.isFavorites ){
        this.productoService.getAll().subscribe(response=>{

          
            this.productos=response as productoModel[];
          }
        );}
      if(this.brand!=null){
        this.productoService.getByBrand(this.brand).subscribe(response=>{

          
          this.productos=response as productoModel[];
        }
      );}
      if(this.serie!=null){
        this.productoService.getBySerie(this.serie).subscribe(response=>{

          
          this.productos=response as productoModel[];
        }
      );}
      

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
  misProductos(){
    if(this.isFavorites){
      this.router.navigate(['productos']);
    }
    else{
      this.router.navigate(['productos','my']);
    }
    
  }
  delete(id:Number){
    console.log(id);
   this.productos= this.productos.filter((i) =>
    {
      return i.id !== id;
    })
  }
  }
  