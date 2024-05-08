import { Component, OnInit } from '@angular/core';
import { marcaModel } from '../../models/marca.model';
import { MarcaService } from '../../services/marca.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.scss'
})
export class MarcasComponent implements OnInit {
marcas:marcaModel[]=[];
  constructor(private marcaService:MarcaService,private router:Router){
    
}
  ngOnInit(): void {
    this.marcaService.getAll().subscribe(response=>{
      this.marcas=response as marcaModel[];
      console.log(response);
    });
  }

create(){
  this.router.navigate(['marca-edit']);
}
delete(id:Number){
 this.marcas= this.marcas.filter((i) =>
  {
    return i.id !== id;
  })
}
}
