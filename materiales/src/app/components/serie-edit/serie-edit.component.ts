import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { categoriaModel } from '../../models/categoria.model';
import { marcaModel } from '../../models/marca.model';
import { serieModel } from '../../models/serie.model';
import { CategoriaService } from '../../services/categoria.service';
import { MarcaService } from '../../services/marca.service';
import { SerieService } from '../../services/serie.service';


@Component({
  selector: 'app-serie-edit',
  templateUrl: './serie-edit.component.html',
  styleUrl: './serie-edit.component.scss'
})
export class SerieEditComponent {
  name:String='';
  description:String='';
  brand:marcaModel|null=null;
  id:Number|null=null;
  allBrands:marcaModel[]=[];

  constructor(private serieService:SerieService ,private brandService:MarcaService,private route: ActivatedRoute,private router:Router){
  }
  ngOnInit(): void {
      
        const id =this.route.snapshot.queryParamMap.get('id') as number|null;
        const brand =this.route.snapshot.queryParamMap.get('marca') as number|null;
         if(id!=null){
            this.serieService.getById(id).subscribe(response=>{
              const serie=response as serieModel;
              this.name=serie.name;
              this.description=serie.description;
              this.id=serie.id;
              this.brand=serie.brand;
            })
          }
          if(brand!=null){
            this.brandService.getById(brand).subscribe(response=>{
              this.brand=response as marcaModel;
            })
          }
          this.brandService.getAll().subscribe(response=>{
          this.allBrands=response as marcaModel[];
        });
  }
  
  save(){
    const serie:serieModel={
      id:this.id,
      name:this.name,
      description:this.description,
      brand:this.brand
    }

    if(this.id!=null){
      this.serieService.editSerie(serie).subscribe(response=>{
        console.log("Se ha guardado con éxito");
      });
    }
    else{
      this.serieService.createSerie(serie).subscribe(response=>{
        console.log("Se ha guardado con éxito");
      });
    }
    
  }
  close(){
    this.router.navigate(['marca-edit'],{queryParams: {id: this.brand?.id}});
  }
  compare(a:any,b:any){
    
    return a&&b?a.id==b.id:a===b;

  }
  saveAndClose(){
    const serie:serieModel={
      name:this.name,
      description:this.description,
      id:this.id,
      brand:this.brand

    }
    if(this.id!=null){
      this.serieService.editSerie(serie).subscribe(response=>{
        this.close()
      });
    }
    else{
      this.serieService.createSerie(serie).subscribe(response=>{
        this.close()
      });
    }
  }
}
