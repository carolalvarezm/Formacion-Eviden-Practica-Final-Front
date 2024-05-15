import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieComponent } from './serie.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';


describe('SerieComponent', () => {
  let component: SerieComponent;
  let fixture: ComponentFixture<SerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SerieComponent],
      imports:[
        HttpClientTestingModule,
        RouterModule.forRoot([]),
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
