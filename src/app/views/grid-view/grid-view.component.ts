import { Component } from '@angular/core';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrl: './grid-view.component.scss'
})
export class GridViewComponent {
  title="Mis productos";
  toolbar=[{name:"hello",action:"console"}];
  content=['hello','bye'];
  
constructor(){
console.log();
}
console(){
  console.log("Hola");
}
}
