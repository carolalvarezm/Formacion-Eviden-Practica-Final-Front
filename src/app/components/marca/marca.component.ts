import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { marcaModel } from '../../models/marca.model';
import { Router } from '@angular/router';
import { MarcaService } from '../../services/marca.service';


@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrl: './marca.component.scss'
})
export class MarcaComponent {
@Input() marca:marcaModel={
  id:null,
  name:"",
  description:"",
  image:""
};
@Output() 
marcaEliminada = new EventEmitter<Number>();

constructor(private router:Router,private marcaService:MarcaService){
}

edit(){
  this.router.navigate(['marca-edit'],{queryParams: {id: this.marca.id}})
}
delete(){
  this.marcaService.deleteMarca(this.marca.id).subscribe(response=>{
    if(this.marca.id!=null){
      this.marcaEliminada.emit(this.marca.id as Number);
    }
    
  });

} 

}
