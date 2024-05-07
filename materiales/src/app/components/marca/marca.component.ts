import { Component, Input } from '@angular/core';
import { marcaModel } from '../../models/marca.model';

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
constructor(){

}

}
