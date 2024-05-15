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
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent {
  name:String='';
  description:String='';
  image:string|ArrayBuffer|null=null;
  imageFile:File|null=null;
  serie:serieModel|null=null;
  categories:categoriaModel[]=[];
  marca:marcaModel|null=null;
  id:Number|null=null;
  allBrands:marcaModel[]=[];
  allCategories:categoriaModel[]=[];
  allSeries:serieModel[]=[];
  series:serieModel[]=[];
  isImageChanged:Boolean=false;
  constructor(private productService:ProductoService,private serieService:SerieService,private brandService:MarcaService,private categoryService:CategoriaService,private route: ActivatedRoute,private router:Router){
  }
  ngOnInit(): void {
      
        const id =this.route.snapshot.queryParamMap.get('id') as number|null;
        
        if(id!=null){
        this.productService.getById(id).subscribe(response=>{
          
          const product=response as productoModel;
          this.name=product.name;
          this.description=product.description;
          this.image = product.image;
          this.id=product.id;
          this.categories=product.categories;
          this.marca=product.brand ;
          this.serie=product.serie;
        });}
        
        this.brandService.getAll().subscribe(response=>{
          this.allBrands=response as marcaModel[];
        });
        this.categoryService.getAll().subscribe(response=>{
          this.allCategories=response as categoriaModel[];
        });
        this.serieService.getAll().subscribe(response=>{
          this.allSeries=response as serieModel[];
          this.onSelect();
        });
  }
  onSelectFile(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.imageFile=event.target.files[0];
      reader.onload = (event) => { // called once readAsDataURL is completed
        if(event.target)
        this.image = event.target?.result;
        this.isImageChanged=true;
        
      }

   }
  }
 onSelect(){
  
  if(this.marca?.id){
    this.series=this.allSeries.filter(item=> item.brand?.id===this.marca?.id);
    if(this.serie?.brand?.id!=this.marca.id){
      this.serie=null;
    }
  }
  else{
    this.series=this.allSeries;
    this.serie=null;
  
  }
  
 }
  save(){
    const producto:productoModel={
      name:this.name,
      description:this.description,
      image:null,
      id:this.id,
      serie:this.serie,
      categories:this.categories,
      brand:this.marca
    }
    if(this.id!=null && this.imageFile){
      this.productService.editProducto(producto,this.imageFile).subscribe(response=>{
        console.log("Se ha guardado con éxito");
        console.log(response);
        this.router.navigate(['producto-edit'],{queryParams: {id: response}})
      });
    }
    else{
      if(this.imageFile)
      this.productService.createProducto(producto,this.imageFile).subscribe(response=>{
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
      image:null,
      id:this.id,
      serie:this.serie,
      categories:this.categories,
      brand:this.marca
    }

    if(this.id!=null && this.imageFile){
      this.productService.editProducto(producto,this.imageFile).subscribe(response=>{
        this.close()
      });
    }
    else{
      if(this.imageFile)
      this.productService.createProducto(producto,this.imageFile).subscribe(response=>{
        this.close()
      });
    }
  }
}