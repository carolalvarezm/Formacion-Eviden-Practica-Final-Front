import { Component, EventEmitter, Input, Output } from '@angular/core';
import { categoriaModel } from '../../models/categoria.model';
import { Router } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {
  @Input() cat:categoriaModel={
    id:null,
    name:"",
    description:""
  };
  @Output() 
  catEliminada = new EventEmitter<Number>();
  constructor(private router:Router,private catService:CategoriaService){
  
  }
  edit(){
    this.router.navigate(['categoria-edit'],{queryParams: {id: this.cat.id}})
  }
  delete(){
    this.catService.deleteCategoria(this.cat.id).subscribe(response=>{
      if(this.cat.id!=null){
        this.catEliminada.emit(this.cat.id as Number);
      }
      
    });
  
  } 
}
