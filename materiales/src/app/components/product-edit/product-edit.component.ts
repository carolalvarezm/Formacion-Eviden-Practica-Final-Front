import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { productoModel } from '../../models/producto.model';
import { serieModel } from '../../models/serie.model';
import { categoriaModel } from '../../models/categoria.model';
import { marcaModel } from '../../models/marca.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent {
  name:String='';
  description:String='';
  image:String|null=null;
  serie:serieModel|null=null;
  categories:categoriaModel[]=[];
  brand:marcaModel|null=null;
  id:Number|null=null;
  constructor(private productService:ProductoService,private route: ActivatedRoute,private router:Router){
  }
  ngOnInit(): void {
      
        const id =this.route.snapshot.queryParamMap.get('id') as number|null;
        console.log(id);
         if(id!=null)
        this.productService.getById(id).subscribe(response=>{
          const product=response as productoModel;
          this.name=product.name;
          this.description=product.description;
          this.image=product.image;
          this.id=product.id;
        });

  }
  save(){
    const producto:productoModel={
      name:this.name,
      description:this.description,
      image:this.image,
      id:this.id,
      serie:this.serie,
      categories:this.categories,
    }
    if(this.id!=null){
      this.productService.editProducto(producto).subscribe(response=>{
        console.log("Se ha guardado con éxito");
      });
    }
    else{
      this.productService.createProducto(producto).subscribe(response=>{
        console.log("Se ha guardado con éxito");
      });
    }
    
  }
  close(){
    this.router.navigate(['products']);
  }

  saveAndClose(){
    const producto:productoModel={
      name:this.name,
      description:this.description,
      image:this.image,
      id:this.id,
      serie:this.serie,
      categories:this.categories,

    }
    if(this.id!=null){
      this.productService.editProducto(producto).subscribe(response=>{
        this.close()
      });
    }
    else{
      this.productService.createProducto(producto).subscribe(response=>{
        this.close()
      });
    }
  }
}