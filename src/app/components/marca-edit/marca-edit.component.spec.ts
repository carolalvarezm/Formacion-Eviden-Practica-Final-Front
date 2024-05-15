import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaEditComponent } from './marca-edit.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SeriesComponent } from '../series/series.component';

describe('MarcaEditComponent', () => {
  let component: MarcaEditComponent;
  let fixture: ComponentFixture<MarcaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MarcaEditComponent,
        SeriesComponent
      ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterModule.forRoot([]),
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarcaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
