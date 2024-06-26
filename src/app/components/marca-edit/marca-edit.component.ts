import { Component, OnInit } from '@angular/core';
import { MarcaService } from '../../services/marca.service';
import { ActivatedRoute,  Router } from '@angular/router';
import { marcaModel } from '../../models/marca.model';
import { serieModel } from '../../models/serie.model';

@Component({
  selector: 'app-app-marca-edit',
  templateUrl: './marca-edit.component.html',
  styleUrl: './marca-edit.component.scss'
})
export class MarcaEditComponent implements OnInit{
  name:String='';
  description:String='';
  image:String|null=null;
  id:Number|null=null;
  series:serieModel[]=[];
  constructor(private marcaService:MarcaService,private route: ActivatedRoute,private router:Router){
  }
  ngOnInit(): void {
      
        const id =this.route.snapshot.queryParamMap.get('id') as number|null;
         if(id!=null)
        this.marcaService.getById(id).subscribe(response=>{
          const marca=response as marcaModel;
          this.name=marca.name;
          this.description=marca.description;
          this.image=marca.image;
          this.id=marca.id;
          if(this.id)
            this.marcaService.getAllSeries(this.id).subscribe(response=>{
              this.series=response as serieModel[];
              this.series.forEach(s=>{
                s.brand={
                  id:this.id,
                  name:this.name,
                  description:this.description,
                  image:this.image
                }
              })
            });
        });

  }
  save(){
    const marca:marcaModel={
      name:this.name,
      description:this.description,
      image:this.image,
      id:this.id
    }
    if(this.id!=null){
      this.marcaService.editMarca(marca).subscribe(response=>{
        console.log("Se ha guardado con éxito");
      });
    }
    else{
      this.marcaService.createMarca(marca).subscribe(response=>{
        console.log("Se ha guardado con éxito");
      });
    }
    
  }
  close(){
    this.router.navigate(['marcas']);
  }
  createSerie(){
    this.router.navigate(['serie-edit'],{queryParams: {marca: this.id}})
  }
  saveAndClose(){
    const marca:marcaModel={
      name:this.name,
      description:this.description,
      image:this.image,
      id:this.id
    }
    if(this.id!=null){
      this.marcaService.editMarca(marca).subscribe(response=>{
        this.close()
      });
    }
    else{
      this.marcaService.createMarca(marca).subscribe(response=>{
        this.close()
      });
    }
  }
}
