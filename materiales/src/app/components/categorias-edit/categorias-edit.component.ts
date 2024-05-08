import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { categoriaModel } from '../../models/categoria.model';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-categorias-edit',
  templateUrl: './categorias-edit.component.html',
  styleUrl: './categorias-edit.component.scss'
})
export class CategoriasEditComponent 
{
  name:String='';
  description:String='';
  id:Number|null=null;
  constructor(private categoriaService:CategoriaService,private route: ActivatedRoute,private router:Router){
  }
  ngOnInit(): void {
      
        const id =this.route.snapshot.queryParamMap.get('id') as number|null;
        console.log(id);
         if(id!=null)
        this.categoriaService.getById(id).subscribe(response=>{
          const categoria=response as categoriaModel;
          this.name=categoria.name;
          this.description=categoria.description;
          this.id=categoria.id;
        });

  }
  save(){
    const categoria:categoriaModel={
      name:this.name,
      description:this.description,
      id:this.id
    }
    if(this.id!=null){
      this.categoriaService.editCategoria(categoria).subscribe(response=>{
        console.log("Se ha guardado con éxito");
      });
    }
    else{
      this.categoriaService.createCategoria(categoria).subscribe(response=>{
        console.log("Se ha guardado con éxito");
      });
    }
    
  }
  close(){
    this.router.navigate(['categorias']);
  }

  saveAndClose(){
    const categoria:categoriaModel={
      name:this.name,
      description:this.description,
      id:this.id
    }
    if(this.id!=null){
      this.categoriaService.editCategoria(categoria).subscribe(response=>{
        this.close()
      });
    }
    else{
      this.categoriaService.createCategoria(categoria).subscribe(response=>{
        this.close()
      });
    }
  }
}
