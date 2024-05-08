import { Component } from '@angular/core';
import { categoriaModel } from '../../models/categoria.model';
import { CategoriaService } from '../../services/categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss'
})
export class CategoriasComponent {
  categorias:categoriaModel[]=[];
    constructor(private catService:CategoriaService,private router:Router){
      
  }
    ngOnInit(): void {
      this.catService.getAll().subscribe(response=>{
        this.categorias=response as categoriaModel[];
        console.log(response);
      });
    }
  
  create(){
    this.router.navigate(['categoria-edit']);
  }
  delete(id:Number){
   this.categorias= this.categorias.filter((i) =>
    {
      return i.id !== id;
    })
  }
  }
  