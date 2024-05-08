import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { productoModel } from '../../models/producto.model';
import { serieModel } from '../../models/serie.model';
import { categoriaModel } from '../../models/categoria.model';
import { marcaModel } from '../../models/marca.model';
import { MarcaService } from '../../services/marca.service';
import { CategoriaService } from '../../services/categoria.service';
import { SerieService } from '../../services/serie.service';

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
  marca:marcaModel|null=null;
  id:Number|null=null;
  allBrands:marcaModel[]=[];
  allCategories:categoriaModel[]=[];
  allSeries:serieModel[]=[];
  allnumbers:Number[]=[1,2,3];
  number:Number|null=1;
  constructor(private productService:ProductoService,private serieService:SerieService,private brandService:MarcaService,private categoryService:CategoriaService,private route: ActivatedRoute,private router:Router){
  }
  ngOnInit(): void {
      
        const id =this.route.snapshot.queryParamMap.get('id') as number|null;
        
        if(id!=null){
        this.productService.getById(id).subscribe(response=>{
          
          const product=response as productoModel;
          this.name=product.name;
          this.description=product.description;
          this.image=product.image;
          this.id=product.id;
          this.categories=product.categories;
          this.marca=product.brand ;
          this.serie=product.serie;
        });}
        console.log(this.marca)
        this.brandService.getAll().subscribe(response=>{
          this.allBrands=response as marcaModel[];
        });
        this.categoryService.getAll().subscribe(response=>{
          this.allCategories=response as categoriaModel[];
        });
        this.serieService.getAll().subscribe(response=>{
          this.allSeries=response as serieModel[];
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
      brand:this.marca
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
  compare(a:any,b:any){
    
    return a&&b?a.id==b.id:a===b;

  }
  close(){
    this.router.navigate(['productos']);
  }

  saveAndClose(){
    const producto:productoModel={
      name:this.name,
      description:this.description,
      image:this.image,
      id:this.id,
      serie:this.serie,
      categories:this.categories,
      brand:this.marca

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