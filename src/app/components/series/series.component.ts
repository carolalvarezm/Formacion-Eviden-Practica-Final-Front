import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { serieModel } from '../../models/serie.model';
import { SerieService } from '../../services/serie.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrl: './series.component.scss'
})
export class SeriesComponent {
  @Input()
  series:serieModel[]=[];
    constructor(private serieService:SerieService,private router:Router){
      
  }
  delete(id:Number){
   this.series= this.series.filter((i) =>
    {
      return i.id !== id;
    })
  }
  }
  