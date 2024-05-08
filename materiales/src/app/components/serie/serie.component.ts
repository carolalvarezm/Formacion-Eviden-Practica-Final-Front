import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { Router } from '@angular/router';
import { serieModel } from '../../models/serie.model';
import { SerieService } from '../../services/serie.service';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrl: './serie.component.scss'
})
export class SerieComponent {
  @Input() serie:serieModel={
    id:null,
    name:"",
    description:"",
    brand:null
  };
  @Output() 
  serieEliminada = new EventEmitter<Number>();
  
  constructor(private router:Router,private serieService:SerieService){
  }
  
  edit(){
    this.router.navigate(['serie-edit'],{queryParams: {id: this.serie.id}})
  }
  delete(){
    this.serieService.deleteSerie(this.serie.id).subscribe(response=>{
      if(this.serie.id!=null){
        this.serieEliminada.emit(this.serie.id as Number);
      }
      
    });
  
  } 
  
  }